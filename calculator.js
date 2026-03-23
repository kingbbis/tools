const displayEl = document.getElementById('display');

function setDisplay(value) {
    displayEl.value = value;
}

function append(value) {
    if (displayEl.value === '0') { displayEl.value = value; return; }
    displayEl.value += value;
}

function clearDisplay() {
    displayEl.value = '0';
}

function calculate() {
    try {
        const sanitized = displayEl.value.replace(/÷/g, '/').replace(/×/g, '*');
        const result = Function('return ' + sanitized)();
        setDisplay(String(result));
    } catch (e) {
        setDisplay('Error');
    }
}

function applyPercent() {
    try {
        const val = parseFloat(displayEl.value);
        if (!isNaN(val)) setDisplay(String(val / 100));
    } catch (e) { setDisplay('Error'); }
}

function applySqrt() {
    try {
        const val = parseFloat(displayEl.value);
        if (val < 0) { setDisplay('NaN'); return; }
        setDisplay(String(Math.sqrt(val)));
    } catch (e) { setDisplay('Error'); }
}

function applyPow() {
    try {
        const val = parseFloat(displayEl.value);
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

function solveQuadratic() {
    const a = parseFloat(document.getElementById('poly-a').value);
    const b = parseFloat(document.getElementById('poly-b').value);
    const c = parseFloat(document.getElementById('poly-c').value);
    if (a === 0) { document.getElementById('poly-result').textContent = 'a must not be 0'; return; }
    const d = b * b - 4 * a * c;
    if (d < 0) {
        const real = (-b / (2 * a)).toFixed(6);
        const imag = (Math.sqrt(-d) / (2 * a)).toFixed(6);
        document.getElementById('poly-result').textContent = `x = ${real} ± ${imag}i`;
    } else {
        const x1 = ((-b + Math.sqrt(d)) / (2 * a)).toFixed(6);
        const x2 = ((-b - Math.sqrt(d)) / (2 * a)).toFixed(6);
        document.getElementById('poly-result').textContent = `x1 = ${x1}, x2 = ${x2}`;
    }
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
