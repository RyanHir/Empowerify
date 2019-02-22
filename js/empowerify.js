var redirect = true;
var goBack   = true;
var dark     = true;
chrome.storage.local.get({
    redirect: true,
    goBack:   true,
    dark:     false,
}, function(items) {
    redirect = items.redirect;
    goBack   = items.goBack;
    dark     = items.dark;
});


function checkIfNewEmpower(){
	chrome.storage.local.get({
	    redirect: true,
	    goBack: true,
	    dark: false,
	}, function(items) {
	    redirect = items.redirect;
	    goBack   = items.goBack;
	    darl     = items.dark;
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
	    dark: false,
	}, function(items) {
	    redirect = items.redirect;
	    goBack   = items.goBack;
	    dark     = items.dark;
	});
	var message = "Are you sure you want to navigate away from this page?\n\nYou have started writing or editing a post.\n\nPress OK to continue or Cancel to stay on the current page.";
	
	if (goBack == true) {
		if (confirm(message)) return true;
		return false;
	}
}
function darkMode(){
	chrome.storage.local.get({
	    redirect: true,
	    goBack: true,
	    dark: false,
	}, function(items) {
	    redirect = items.redirect;
	    goBack   = items.goBack;
	    dark     = items.dark;
	});
	if (dark == true) {
		$('.drag_out td').css('background', '#33383b');
		$('div').css('color', '#E0E0E0');
		$('.totalMessages').css('color', '#33383b');
		$('.ph_class_img_txt').css('color', '#33383b');
		$('.ph_class_name').css('color', '#E0E0E0');
		$('.ph_main_out').css('background', '#33383b');
    $('.loading_popup').css('background', '#596167');
		$('.loading_popup').css('border', '2px solid #7f868a');
	}
}
function theOnLoad(){
	checkIfNewEmpower();
	darkMode();
}
window.onbeforeunload = closingCode;
window.onload = theOnLoad;
