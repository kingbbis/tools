const displayEl = document.getElementById('display');

function setDisplay(value) {
    displayEl.textContent = value;
}

function append(value) {
    if (displayEl.textContent === '0') { displayEl.textContent = value; return; }
    displayEl.textContent += value;
}

function clearDisplay() {
    displayEl.textContent = '0';
}

function calculate() {
    try {
        const sanitized = displayEl.textContent.replace(/÷/g, '/').replace(/×/g, '*');
        const result = Function('return ' + sanitized)();
        setDisplay(String(result));
    } catch (e) {
        setDisplay('Error');
    }
}

function applyPercent() {
    try {
        const val = parseFloat(displayEl.textContent);
        if (!isNaN(val)) setDisplay(String(val / 100));
    } catch (e) { setDisplay('Error'); }
}

function applySqrt() {
    try {
        const val = parseFloat(displayEl.textContent);
        if (val < 0) { setDisplay('NaN'); return; }
        setDisplay(String(Math.sqrt(val)));
    } catch (e) { setDisplay('Error'); }
}

function applyPow() {
    try {
        const val = parseFloat(displayEl.textContent);
        setDisplay(String(Math.pow(val, 2)));
    } catch (e) { setDisplay('Error'); }
}

function solveLinear() {
    const a = parseFloat(document.getElementById('alg-a').value);
    const b = parseFloat(document.getElementById('alg-b').value);
    let text;
    if (a === 0) text = b === 0 ? 'Infinite solutions' : 'No solution';
    else text = 'x = ' + (-b / a).toFixed(6);
    document.getElementById('alg-result').textContent = text;
}

function processCoordinates() {
    const text = document.getElementById('coord-input').value;
    const parts = text.split(';').map(s => s.trim());
    if (parts.length !== 2) { document.getElementById('coord-result').textContent = 'Enter two points'; return; }

    const p1 = parts[0].split(',').map(v => parseFloat(v.trim()));
    const p2 = parts[1].split(',').map(v => parseFloat(v.trim()));

    if (p1.length !== 2 || p2.length !== 2 || p1.some(isNaN) || p2.some(isNaN)) {
        document.getElementById('coord-result').textContent = 'Invalid coordinates';
        return;
    }

    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const distance = Math.sqrt(dx * dx + dy * dy).toFixed(6);
    const midpoint = `(${((p1[0] + p2[0]) / 2).toFixed(6)}, ${((p1[1] + p2[1]) / 2).toFixed(6)})`;
    document.getElementById('coord-result').textContent = `Distance = ${distance}, Midpoint = ${midpoint}`;
}
