function setColors(a, b, c, d) {
    window.document.getElementById("colorA").value = a;
    window.document.getElementById("colorB").value = b;
    window.document.getElementById("colorC").value = c;
    window.document.getElementById("colorD").value = d;
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
function restore() {
    chrome.storage.local.get({
        colorA: "#000",
        colorB: "#000",
        colorC: "#000",
        colorD: "#000"
    },
    function(items) {
        setColors(
		items.colorA,
		items.colorB,
		items.colorC,
		items.colorD
	);
    })
}
document.getElementById('save').addEventListener('click',
    save);
document.addEventListener('DOMContentLoaded', restore);
