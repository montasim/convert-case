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

export type BranchPrefix = "none" | "feature" | "bug" | "custom";

export interface BranchNameGeneratorState {
    taskName: string;
    setTaskName: (name: string) => void;
    prefix: BranchPrefix;
    setPrefix: (prefix: BranchPrefix) => void;
    customPrefix: string;
    setCustomPrefix: (prefix: string) => void;
    divider: "-" | "_";
    setDivider: (divider: "-" | "_") => void;
    branchName: string;
    copied: boolean;
    handleCopy: () => Promise<void>;
    handleClear: () => void;
}

function slugify(text: string, divider: "-" | "_"): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, divider)
        .replace(/^-+|-+$/g, "");
}

export function useBranchNameGenerator(): BranchNameGeneratorState {
    const [taskName, setTaskName] = useState("");
    const [prefix, setPrefix] = useState<BranchPrefix>("none");
    const [customPrefix, setCustomPrefix] = useState("");
    const [divider, setDivider] = useState<"-" | "_">("-");
    const [copied, setCopied] = useState(false);

    const branchName = useMemo(() => {
        if (!taskName.trim()) return "";

        const slugifiedTask = slugify(taskName, divider);

        if (prefix === "none") {
            return slugifiedTask;
        }

        const prefixValue = prefix === "custom" ? customPrefix.toLowerCase() : prefix;

        if (!prefixValue) {
            return slugifiedTask;
        }

        return `${prefixValue}/${slugifiedTask}`;
    }, [taskName, prefix, customPrefix, divider]);

    const handleCopy = useCallback(async () => {
        if (!branchName) return;
        try {
            await navigator.clipboard.writeText(branchName);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy branch name: ", err);
        }
    }, [branchName]);

    const handleClear = useCallback(() => {
        setTaskName("");
        setPrefix("feature");
        setCustomPrefix("");
        setDivider("-");
    }, []);

    return {
        taskName,
        setTaskName,
        prefix,
        setPrefix,
        customPrefix,
        setCustomPrefix,
        divider,
        setDivider,
        branchName,
        copied,
        handleCopy,
        handleClear,
    };
}
