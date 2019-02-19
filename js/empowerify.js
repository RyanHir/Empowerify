var redirect = true;
var goBack   = true;

chrome.storage.local.get({
    redirect: true,
    goBack:   true,
}, function(items) {
    redirect = items.redirect;
    goBack   = items.goBack;
});


function checkIfNewEmpower(){
	chrome.storage.local.get({
	    redirect: true,
	    goBack: true,
	}, function(items) {
	    redirect = items.redirect;
	    goBack   = items.goBack;
	});
	if (redirect == true) {
		if (window.location.search == "?iCtrl=STUDENT_BASE_HOME_CONTROL") {
			window.location.search = "?iCtrl=PLAYLIST_HOME_CLASS";
		}
	}
}
function closingCode(){
	chrome.storage.local.get({
	    redirect: true,
	    goBack: true,
	}, function(items) {
	    redirect = items.redirect;
	    goBack   = items.goBack;
	});
	var message = "Are you sure you want to navigate away from this page?\n\nYou have started writing or editing a post.\n\nPress OK to continue or Cancel to stay on the current page.";
	
	if (goBack == true) {
		if (confirm(message)) return true;
		return false;
	}
}
window.onbeforeunload = closingCode;
window.onload = checkIfNewEmpower;
