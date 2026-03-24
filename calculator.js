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

// Enhanced calculate: handles ÷, ×, brackets [], {}, and exponentiation ^
function calculate() {
    try {
        let expr = displayEl.textContent;
        // Replace display symbols with JavaScript operators
        expr = expr.replace(/÷/g, '/').replace(/×/g, '*');
        // Convert square brackets and curly braces to parentheses
        expr = expr.replace(/\[/g, '(').replace(/\]/g, ')');
        expr = expr.replace(/\{/g, '(').replace(/\}/g, ')');
        // Convert exponentiation symbol ^ to ** (JavaScript exponentiation)
        expr = expr.replace(/\^/g, '**');
        const result = Function('return ' + expr)();
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

function calculateFraction() {
    const f1 = document.getElementById('frac1').value.trim();
    const f2 = document.getElementById('frac2').value.trim();
    const op = document.getElementById('frac-op').value;

    const parseFrac = (s) => {
        const parts = s.split('/');
        if (parts.length !== 2) return null;
        const num = parseInt(parts[0].trim());
        const den = parseInt(parts[1].trim());
        if (isNaN(num) || isNaN(den) || den === 0) return null;
        return { num, den };
    };

    const f1p = parseFrac(f1);
    const f2p = parseFrac(f2);
    if (!f1p || !f2p) {
        document.getElementById('frac-result').textContent = 'Invalid fractions';
        return;
    }

    let result;
    if (op === '+') {
        const num = f1p.num * f2p.den + f2p.num * f1p.den;
        const den = f1p.den * f2p.den;
        result = { num, den };
    } else if (op === '-') {
        const num = f1p.num * f2p.den - f2p.num * f1p.den;
        const den = f1p.den * f2p.den;
        result = { num, den };
    } else if (op === '*') {
        const num = f1p.num * f2p.num;
        const den = f1p.den * f2p.den;
        result = { num, den };
    } else if (op === '/') {
        const num = f1p.num * f2p.den;
        const den = f1p.den * f2p.num;
        result = { num, den };
    }

    // Simplify
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const g = Math.abs(gcd(result.num, result.den));
    result.num /= g;
    result.den /= g;
    if (result.den < 0) { result.num = -result.num; result.den = -result.den; }

    document.getElementById('frac-result').textContent = `${result.num}/${result.den}`;
}