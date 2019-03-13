var redirect	= false;
var goBack	= false;

function getData(){
	chrome.storage.local.get({
		redirect: true,
		goBack:   true,
	}, function(items) {
		redirect = items.redirect;
		goBack   = items.goBack;
	});
}
function checkIfNewEmpower(){
	getData();
	if (redirect == true) {
		if (window.location.search == "?iCtrl=STUDENT_BASE_HOME_CONTROL") {
			$('html *').remove()
			window.stop();
			window.location.search = "?iCtrl=PLAYLIST_HOME_CLASS";
		}
	}
}
function closingCode(){
	getData();
	var message = "Are you sure you want to navigate away from this page?\n\nPress OK to continue or Cancel to stay on the current page.";
	
	if (goBack == true) {
		if (confirm(message)) return true;
		return false;
	}
}
window.onbeforeunload	= closingCode;
window.onload		= checkIfNewEmpower;
$( document ).ready(checkIfNewEmpower);
$('html').bind('DOMSubtreeModified', checkIfNewEmpower);
