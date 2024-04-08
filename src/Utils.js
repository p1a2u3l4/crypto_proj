export function percentDiff(a, b) {
    return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
}

export function toUpperCaseCurrency(currName) {
    const result = currName.charAt(0).toUpperCase() + currName.slice(1);
    return result;
}
