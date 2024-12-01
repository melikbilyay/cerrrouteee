// vapiai.tsx
import { useState, useEffect, useCallback } from "react";
import Vapi from "@vapi-ai/web";

const vapi = new Vapi("a5484106-42f0-4988-bb8b-03bb3a33b059");

export function useVapi() {
    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);

    const handleCallStart = useCallback(() => {
        setConnecting(false);
        setConnected(true);
    }, []);

    const handleCallEnd = useCallback(() => {
        setConnecting(false);
        setConnected(false);
    }, []);

    const handleError = useCallback((error: unknown) => {
        console.error(error instanceof Error ? error.message : "An unknown error occurred:", error);
        setConnecting(false);
    }, []);

    const assistantOverrides = {
        transcriber: {
            provider: "deepgram" as const,
            model: "nova-2",
            language: "en-US" as const,
        },
        recordingEnabled: false,
        variableValues: {
            name: "melik",
        },
    };

    const startCall = () => {
        setConnecting(true);
        vapi.start("f4377779-ee2a-40f7-9d4d-d505a5fb08d2", assistantOverrides);
    };

    const endCall = () => {
        vapi.stop();
    };

    useEffect(() => {
        vapi.on("call-start", handleCallStart);
        vapi.on("call-end", handleCallEnd);
        vapi.on("error", handleError);

        return () => {
            vapi.off("call-start", handleCallStart);
            vapi.off("call-end", handleCallEnd);
            vapi.off("error", handleError);
        };
    }, [handleCallStart, handleCallEnd, handleError]);

    return { connecting, connected, startCall, endCall };
}
