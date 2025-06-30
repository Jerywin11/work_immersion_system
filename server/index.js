const mysql = require("mysql2/promise");

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: "192.168.1.14",
      port: 3307,
      user: "root",
      password: "dost_programmer@2024",
      database: "dev_db",
    });

    console.log("Connected to MySQL successfully!");
    const [rows] = await connection.query("SELECT NOW() AS now");
    console.log("Current time from MySQL:", rows[0].now);

    await connection.end();
  } catch (error) {
    console.error("MySQL connection error:", error);
  }
}

testConnection();
