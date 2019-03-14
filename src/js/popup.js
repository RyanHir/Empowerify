// Saves options to chrome.storage
function save_options() {
	var redirect =		document.getElementById('redirect').checked;
	var goBack =		document.getElementById('goBack').checked;
	var dark =		document.getElementById('dark').checked;
	var selection =		document.getElementById('themeSelect').value;
	chrome.storage.local.set({
		redirect:	redirect,
		goBack:		goBack,
		dark:		dark,
		theme:		selection
	}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById('save');
		var oldClass = status.className;
		status.textContent = 'Options saved.';
		status.className = "btn btn-success center";
		setTimeout(function() {
			status.textContent = 'Save';
			status.className = oldClass;
		}, 750);
	});
}
function disableStuff() {
	if (document.getElementById("redirect").checked == false) {
		document.getElementById("dark").disabled = true;
		document.getElementById("themeSelect").disabled = true;
	}
	else {
		document.getElementById("dark").disabled = false;
		document.getElementById("themeSelect").disabled = false;
	}

	if (document.getElementById("dark").checked == false) {	
		document.getElementById("themeSelect").disabled = true;
	} else {
		document.getElementById("themeSelect").disabled = false;
	}
}
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
	chrome.storage.local.get({
		redirect: true,
		goBack:	  true,
		dark:	  false,
		theme:	  "dark"
	}, function(items) {
		document.getElementById('redirect').checked		= items.redirect;
		document.getElementById('goBack').checked		= items.goBack;
		document.getElementById('dark').checked			= items.dark;
		document.getElementById('themeSelect').value		= items.theme;
		disableStuff();
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById("redirect").addEventListener( 'click',
	disableStuff);
document.getElementById("dark").addEventListener( 'click',
	disableStuff);
document.getElementById('save').addEventListener('click',
	save_options);
