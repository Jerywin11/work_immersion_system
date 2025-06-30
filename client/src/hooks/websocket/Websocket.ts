import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthWebSocket() {
    const ws = useRef<WebSocket | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Connect to WS (adjust URL as needed)
        ws.current = new WebSocket("ws://localhost:3000");

        ws.current.onopen = () => {
            console.log("WebSocket connected");
            // No need to send token manually because it’s in httpOnly cookie and sent on handshake
        };

        ws.current.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);

                if (message.type === "logout") {

                    // Redirect to login page
                    navigate("/");

                }

                if (message.type === "error") {
                    console.error("WebSocket error:", message.message);
                }
            } catch (e) {
                console.error("Failed to parse WS message:", e);
            }
        };

        ws.current.onclose = () => {
            console.log("WebSocket disconnected");
        };

        return () => {
            ws.current?.close();
        };
    }, [navigate]);

    return ws.current;
}
