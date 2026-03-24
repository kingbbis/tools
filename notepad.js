// Get elements
const editor = document.getElementById('editor');
const fontSizeSelect = document.getElementById('fontSize');
const fontFamilySelect = document.getElementById('fontFamily');
const textColorInput = document.getElementById('textColor');
const highlightColorInput = document.getElementById('highlightColor');
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const underlineBtn = document.getElementById('underlineBtn');
const strikethroughBtn = document.getElementById('strikethroughBtn');
const linkBtn = document.getElementById('linkBtn');
const imageInput = document.getElementById('imageInput');
const imageBtn = document.getElementById('imageBtn');
const pageBreakBtn = document.getElementById('pageBreakBtn');
const newPageBtn = document.getElementById('newPageBtn');
const prevPageBtn = document.getElementById('prevPageBtn');
const pageIndicator = document.getElementById('pageIndicator');
const nextPageBtn = document.getElementById('nextPageBtn');
const lockBtn = document.getElementById('lockBtn');
const unlockBtn = document.getElementById('unlockBtn');
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const alignLeftBtn = document.getElementById('alignLeft');
const alignCenterBtn = document.getElementById('alignCenter');
const alignRightBtn = document.getElementById('alignRight');
const exportTxtBtn = document.getElementById('exportTxt');
const exportPdfBtn = document.getElementById('exportPdf');

// Page management
let pages = [document.querySelector('.page')];
let currentPageIndex = 0;

function getCurrentPage() {
    return pages[currentPageIndex];
}

function updatePageIndicator() {
    pageIndicator.textContent = `Page ${currentPageIndex + 1} of ${pages.length}`;
}

function switchPage(index) {
    pages.forEach((page, i) => {
        page.classList.toggle('active', i === index);
    });
    currentPageIndex = index;
    updatePageIndicator();
}

// Event listeners for formatting
function applyCommand(command, value = null) {
    const page = getCurrentPage();
    page.focus();
    document.execCommand(command, false, value);
}

fontSizeSelect.addEventListener('change', () => {
    applyCommand('fontSize', fontSizeSelect.value);
});

fontFamilySelect.addEventListener('change', () => {
    applyCommand('fontName', fontFamilySelect.value);
});

textColorInput.addEventListener('input', () => {
    applyCommand('foreColor', textColorInput.value);
});

highlightColorInput.addEventListener('input', () => {
    applyCommand('backColor', highlightColorInput.value);
});

boldBtn.addEventListener('click', () => {
    applyCommand('bold');
});

italicBtn.addEventListener('click', () => {
    applyCommand('italic');
});

underlineBtn.addEventListener('click', () => {
    applyCommand('underline');
});

strikethroughBtn.addEventListener('click', () => {
    applyCommand('strikeThrough');
});

linkBtn.addEventListener('click', () => {
    const url = prompt('Enter the URL:');
    if (url) {
        const text = prompt('Enter the link text:');
        if (text) {
            applyCommand('insertHTML', `<a href="${url}">${text}</a>`);
        }
    }
});

imageBtn.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = `<img src="${event.target.result}" style="max-width: 100%; height: auto;">`;
            applyCommand('insertHTML', img);
        };
        reader.readAsDataURL(file);
    }
});

pageBreakBtn.addEventListener('click', () => {
    applyCommand('insertHTML', '<div style="page-break-after: always;"></div>');
});

newPageBtn.addEventListener('click', () => {
    const newPage = document.createElement('div');
    newPage.className = 'page';
    newPage.contentEditable = true;
    editor.appendChild(newPage);
    pages.push(newPage);
    switchPage(pages.length - 1);
});

prevPageBtn.addEventListener('click', () => {
    if (currentPageIndex > 0) {
        switchPage(currentPageIndex - 1);
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPageIndex < pages.length - 1) {
        switchPage(currentPageIndex + 1);
    }
});

lockBtn.addEventListener('click', () => {
    pages.forEach(page => {
        page.contentEditable = 'false';
    });
});

unlockBtn.addEventListener('click', () => {
    pages.forEach(page => {
        page.contentEditable = 'true';
    });
});

saveBtn.addEventListener('click', () => {
    const content = pages.map(page => page.innerHTML);
    localStorage.setItem('notepadPages', JSON.stringify(content));
    alert('Notes saved!');
});

loadBtn.addEventListener('click', () => {
    const saved = localStorage.getItem('notepadPages');
    if (saved) {
        const content = JSON.parse(saved);
        // Clear existing pages
        pages.forEach(page => page.remove());
        pages = [];
        content.forEach((html, index) => {
            const page = document.createElement('div');
            page.className = 'page';
            page.contentEditable = 'true';
            page.innerHTML = html;
            editor.appendChild(page);
            pages.push(page);
        });
        if (pages.length === 0) {
            const page = document.createElement('div');
            page.className = 'page active';
            page.contentEditable = 'true';
            editor.appendChild(page);
            pages.push(page);
        } else {
            pages[0].classList.add('active');
        }
        currentPageIndex = 0;
        updatePageIndicator();
        alert('Notes loaded!');
    } else {
        alert('No saved notes found.');
    }
});

alignLeftBtn.addEventListener('click', () => {
    getCurrentPage().style.textAlign = 'left';
});

alignCenterBtn.addEventListener('click', () => {
    getCurrentPage().style.textAlign = 'center';
});

alignRightBtn.addEventListener('click', () => {
    getCurrentPage().style.textAlign = 'right';
});

// Export functions
exportTxtBtn.addEventListener('click', () => {
    const text = pages.map(page => page.textContent).join('\n\n--- Page Break ---\n\n');
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

// Initialize
updatePageIndicator();

// Auto-load saved notes on start
const saved = localStorage.getItem('notepadPages');
if (saved) {
    const content = JSON.parse(saved);
    pages[0].innerHTML = content[0] || '';
    if (content.length > 1) {
        for (let i = 1; i < content.length; i++) {
            const page = document.createElement('div');
            page.className = 'page';
            page.contentEditable = 'true';
            page.innerHTML = content[i];
            editor.appendChild(page);
            pages.push(page);
        }
        updatePageIndicator();
    }
}
