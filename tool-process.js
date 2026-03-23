const urlParams = new URLSearchParams(window.location.search);
const tool = urlParams.get('tool');

if (tool === 'timer') {
    window.location.href = 'timer.html';
} else if (tool === 'tier-list') {
    window.location.href = 'tier-list.html';
} else if (tool === 'random-generator') {
    window.location.href = 'ramdom-num-gen.html';
} else if (tool === 'stopwatch') {
    window.location.href = 'stopwatch.html';
} else if (tool === 'calculator') {
    window.location.href = 'calculator.html';
} else {
    document.getElementById('tool-content').innerHTML = '<h1>Tool not found</h1>';
}

// Deprecated: inline tool loading via fetch was removed due file:// CORS restrictions.
function loadTool(file) {
    console.log('loadTool is not used in this mode:', file);
}