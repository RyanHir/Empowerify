function setColors(ahh) {
    var colors = tinycolor(ahh).tetrad().map(function(t) { return t.toHexString(); });
    window.document.getElementById("one").style.background = colors[0];
    window.document.getElementById("two").style.background = colors[1];
    window.document.getElementById("three").style.background = colors[2]
    window.document.getElementById("four").style.background = colors[3];
}
var colorPicker = window.document.getElementById("color");
colorPicker.addEventListener("change", function() {
    setColors(colorPicker.value);
});

function save() {
    chrome.storage.local.set({
        colorA: window.document.getElementById("one").style.background,
        colorB: window.document.getElementById("two").style.background,
        colorC: window.document.getElementById("three").style.background,
        colorD: window.document.getElementById("four").style.background
    },function() {
        console.log("saved");
    });
}
function restore() {
    var dehColor = "";
    chrome.storage.local.get({
        colorA: "rgb (0, 0, 0)"
    },
    function(items) {
        setColors(items.colorA);
    })
}
document.getElementById('save').addEventListener('click',
    save);
document.addEventListener('DOMContentLoaded', restore);
