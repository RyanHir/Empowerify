// Saves options to chrome.storage
function save_options(option) {
	var redirect =		document.getElementById('redirect').checked;
	var dark =		document.getElementById('dark').checked;
	var selection =		document.getElementById('themeSelect').value;
	chrome.storage.local.set({
		redirect:	redirect,
		dark:		dark,
		theme:		selection,
	}, function() {
		if (option != false) {
			// Update status to let user know options were saved.
			var status = document.getElementById('save');
			var oldClass = status.className;
			status.textContent = 'Options saved.';
			status.className = "btn btn-success center";
			setTimeout(function() {
				status.textContent = 'Save';
				status.className = oldClass;
			}, 750);
		}
	});
}
function disableStuff() {
	var custom	= document.getElementById("dark");
	var theme	= document.getElementById("themeSelect");
	var btnPicker   = document.getElementById("picker");
	if (custom.checked) {
		theme.disabled = false;
		if (theme.value == "custom") {
			btnPicker.style.display = "inline-block";
		} else {
			btnPicker.style.display = "none";
		}
	}
	else {
		theme.disabled = true;
		btnPicker.style.display = "none";

	}
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function onLoad() {
	const start = Date.now();
	
	console.group("popup");

	var browser = navigator.userAgent.match(/(chrome|firefox|edge|chromium|brave(?=\/))\/?\s*(\d+)/i);
	document.getElementById("version").innerHTML = "Version " + chrome.runtime.getManifest()["version"] + " | " + browser[1] + " " + browser[2];

	chrome.storage.local.get({
		redirect: true,
		goBack:	  true,
		dark:	  false,
		theme:	  "dark",
	}, function(items) {
		document.getElementById('redirect').checked		= items.redirect;
		document.getElementById('dark').checked			= items.dark;
		document.getElementById('themeSelect').value	= items.theme;
		disableStuff();
	});
	console.log('Took ' + (Date.now() - start) + ' millis to load');
	console.groupEnd();
}
document.addEventListener('DOMContentLoaded', onLoad);
document.getElementById("redirect").addEventListener( 'click',
	disableStuff);
document.getElementById("dark").addEventListener( 'click',
	disableStuff);
document.getElementById("themeSelect").addEventListener( 'change',
	disableStuff);
document.getElementById('save').addEventListener('click',
	save_options);
document.getElementById('picker').addEventListener('click',
	function() {
		save_options(false);
		window.open('/src/html/picker.html', '_blank');
	});
