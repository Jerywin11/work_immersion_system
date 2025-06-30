const express = require("express");
const http = require("http");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const WebSocket = require("ws");

const app = express();
const PORT = 3000;
const JWT_SECRET = "dost_programmer@2024";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

const dbConfig = {
  host: "192.168.1.14",
  port: 3307,
  user: "root",
  password: "dost_programmer@2024",
  database: "dev_db",
};

// REGISTER
app.post("/register", async (req, res) => {
  const { email, password, role = "student" } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [existing] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.execute(
      `INSERT INTO users (email, password, role, status) VALUES (?, ?, ?, 'pending')`,
      [email, hashedPassword, role]
    );

    await connection.end();

    res.status(201).json({ message: "User registered", id: result.insertId });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error during registration", error: err.message });
  }
});

// LOGIN + JWT
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [users] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];

    if (user.status !== "approved") {
      return res.status(403).json({
        message: `Account status is '${user.status}', login not allowed.`,
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "10000s" }
    );

    // Set token in httpOnly cookie, expires in 1 minute for testing
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // only HTTPS in prod
      sameSite: "lax",
      maxAge: 10000 * 1000, // 1 minute
    });

    res.json({
      message: "Login successful",
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
    });

    await connection.end();
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "lax",
  });
  res.json({ message: "Logged out successfully" });
});

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Access token missing" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Protected route example
app.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "Secure profile info", user: req.user });
});

// Create HTTP server wrapping Express app
const server = http.createServer(app);

// WebSocket server attached to same HTTP server
const wss = new WebSocket.Server({ server });

// Function to parse cookies from WS upgrade request headers
const parseCookies = (cookieHeader) => {
  const list = {};
  if (!cookieHeader) return list;

  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    const value = rest.join("=");
    list[name] = decodeURIComponent(value);
  });
  return list;
};

// Handle WS connections
wss.on("connection", (ws, req) => {
  // Parse cookies from upgrade request headers to get token
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token;

  if (!token) {
    ws.send(JSON.stringify({ type: "error", message: "No token provided" }));
    ws.close();
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    ws.send(JSON.stringify({ type: "error", message: "Invalid token" }));
    ws.close();
    return;
  }

  // Calculate milliseconds until token expiration
  const nowSeconds = Math.floor(Date.now() / 1000);
  const msUntilExpiry = (payload.exp - nowSeconds) * 1000;

  // Send welcome message
  ws.send(JSON.stringify({ type: "info", message: `Hello ${payload.email}!` }));

  // Setup timer to notify client on token expiry
  const expiryTimeout = setTimeout(() => {
    ws.send(JSON.stringify({ type: "logout", reason: "Session expired" }));
    ws.close();
  }, msUntilExpiry);

  ws.on("close", () => {
    clearTimeout(expiryTimeout);
  });

  ws.on("message", (message) => {
    // Optional: handle messages from client here
    console.log("Received from client:", message);
  });
});

server.listen(PORT, () => {
  console.log(`Auth API + WS running at http://localhost:${PORT}`);
});
