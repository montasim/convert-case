
export const toSentenceCase = (text: string) => {
    return text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
};

export const toLowerCase = (text: string) => {
    return text.toLowerCase();
};

export const toUpperCase = (text: string) => {
    return text.toUpperCase();
};

export const toCapitalizedCase = (text: string) => {
    return text.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
};

export const toAlternatingCase = (text: string) => {
    return text.split('').map((char, index) => {
        return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
    }).join('');
};

export const toTitleCase = (text: string) => {
    // Simple title case for now
    const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i;

    return text.toLowerCase().split(' ').map((word, index, array) => {
        if (index > 0 && index < array.length - 1 && word.match(smallWords)) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
};

export const toInverseCase = (text: string) => {
    return text.split('').map(char =>
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
    ).join('');
};
