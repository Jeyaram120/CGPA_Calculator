// Function to get a random CSS file
function getRandomCSS() {
    const cssFiles = ['1main.css', '2main.css','3main.css','4main.css'];
    const randomIndex = Math.floor(Math.random() * cssFiles.length);
    return cssFiles[randomIndex];
}

// Apply the selected CSS file
document.addEventListener('DOMContentLoaded', () => {
    const cssFile = getRandomCSS();
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = cssFile;
    document.head.appendChild(linkElement);}
)

