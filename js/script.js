
// Exponer ipcRenderer para los botones
window.ipcRenderer = require('electron').ipcRenderer;
let actualTheme = "blur";
function changeTheme() {
    if (actualTheme == "blur") {
        actualTheme = "notblur"
        document.body.style.backgroundColor = "#252525"
    } else {
        actualTheme = "blur"
        document.body.style.backgroundColor = "transparent"
    }
    window.ipcRenderer.send('changeTheme')
}
