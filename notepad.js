// Get elements
const editor = document.getElementById('editor');
const fontSizeSelect = document.getElementById('fontSize');
const fontFamilySelect = document.getElementById('fontFamily');
const textColorInput = document.getElementById('textColor');
const highlightColorInput = document.getElementById('highlightColor');
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const underlineBtn = document.getElementById('underlineBtn');
const alignLeftBtn = document.getElementById('alignLeft');
const alignCenterBtn = document.getElementById('alignCenter');
const alignRightBtn = document.getElementById('alignRight');
const exportTxtBtn = document.getElementById('exportTxt');
const exportPdfBtn = document.getElementById('exportPdf');

// Event listeners for formatting
fontSizeSelect.addEventListener('change', () => {
    document.execCommand('fontSize', false, fontSizeSelect.value);
});

fontFamilySelect.addEventListener('change', () => {
    document.execCommand('fontName', false, fontFamilySelect.value);
});

textColorInput.addEventListener('input', () => {
    document.execCommand('foreColor', false, textColorInput.value);
});

highlightColorInput.addEventListener('input', () => {
    document.execCommand('backColor', false, highlightColorInput.value);
});

boldBtn.addEventListener('click', () => {
    document.execCommand('bold');
});

italicBtn.addEventListener('click', () => {
    document.execCommand('italic');
});

underlineBtn.addEventListener('click', () => {
    document.execCommand('underline');
});

alignLeftBtn.addEventListener('click', () => {
    editor.style.textAlign = 'left';
});

alignCenterBtn.addEventListener('click', () => {
    editor.style.textAlign = 'center';
});

alignRightBtn.addEventListener('click', () => {
    editor.style.textAlign = 'right';
});

// Export functions
exportTxtBtn.addEventListener('click', () => {
    const text = editor.textContent;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'note.txt';
    a.click();
    URL.revokeObjectURL(url);
});

exportPdfBtn.addEventListener('click', () => {
    const element = editor;
    const opt = {
        margin: 1,
        filename: 'note.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
});
