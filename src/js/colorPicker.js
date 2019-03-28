function setColors(a, b, c, d) {
    window.document.getElementById("colorA").value = a;
    window.document.getElementById("colorB").value = b;
    window.document.getElementById("colorC").value = c;
    window.document.getElementById("colorD").value = d;
    preview();
}
function save() {
    chrome.storage.local.set({
        colorA: window.document.getElementById("colorA").value,
        colorB: window.document.getElementById("colorB").value,
        colorC: window.document.getElementById("colorC").value,
        colorD: window.document.getElementById("colorD").value
    },function() {
        console.log("saved");
    });
}
function preview() {
    var a = document.getElementById('colorA').value;
    var b = document.getElementById('colorB').value; 
    var c = document.getElementById('colorC').value; 
    var d = document.getElementById('colorD').value; 
    document.getElementById('previewNavbar').style.background = a;
    document.getElementById('previewBody').style.background = a;
    document.getElementById('class').style.background = b;
    document.getElementById('className').style.color = d;
    document.getElementById('class').style.color = d;
    document.getElementById('msg').style.color = c;

}
function restore() {
    var defaultColorA = "#000000";
    var defaultColorB = "#000000";
    chrome.storage.local.get({
        colorA: defaultColorA,
        colorB: defaultColorB,
        colorC: defaultColorA,
        colorD: defaultColorB
    },
    function(items) {
        setColors(
            items.colorA,
            items.colorB,
            items.colorC,
            items.colorD);
    });
}
document.getElementById('save').addEventListener('click',
    save);
document.addEventListener('DOMContentLoaded', restore);
document.addEventListener('change', preview);
