import { useState, useMemo, useCallback } from "react";

export interface TextStats {
    characters: number;
    words: number;
    sentences: number;
    lines: number;
}

export function useCaseConverter() {
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    const stats: TextStats = useMemo(() => {
        const trimmedText = text.trim();
        return {
            characters: text.length,
            words: trimmedText === "" ? 0 : trimmedText.split(/\s+/).length,
            sentences: trimmedText === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length,
            lines: trimmedText === "" ? 0 : text.split(/\n/).length,
        };
    }, [text]);

    const handleCopy = useCallback(async () => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    }, [text]);

    const handleDownload = useCallback(() => {
        if (!text) return;
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "converted-text.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [text]);

    const handleClear = useCallback(() => {
        setText("");
    }, []);

    const applyConversion = useCallback((conversionFn: (t: string) => string) => {
        if (!text) return;
        setText(prev => conversionFn(prev));
    }, [text]);

    return {
        text,
        setText,
        stats,
        copied,
        handleCopy,
        handleDownload,
        handleClear,
        applyConversion,
    };
}
