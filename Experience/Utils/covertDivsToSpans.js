export default function (element) {
    // Check if element has already been converted
    if (element.dataset.converted === 'true') {
        return element;
    }
    
    // Store original text before conversion
    const originalText = element.innerText;
    element.dataset.originalText = originalText;
    element.dataset.converted = 'true';
    
    element.style.overflow = "hidden";
    element.innerHTML = originalText
        .split("")
        .map((char) => {
            if (char === " ") {
                return `<span>&nbsp;</span>`;
            }
            return `<span class="animatedis">${char}</span>`;
        })
        .join("");

    return element;
}
