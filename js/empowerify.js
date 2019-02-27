var redirect	= false;
var goBack	= false;
var dark	= false;
var custom 	= false;
var colorOne 	= "#ffffff";
var colorTwo 	= "#ffffff";
    
    
function getData(){
	chrome.storage.local.get({
		redirect: true,
		goBack:   true,
		dark:     false,
		custom:   false,
		colorOne: "#ffffff",
		colorTwo: "#ffffff",
	}, function(items) {
		redirect = items.redirect;
		goBack   = items.goBack;
		dark     = items.dark;
		custom	 = items.custom;
		colorOne = items.colorOne;
		colorTwo = items.colorTwo;
		
	});
}

function checkIfNewEmpower(){
	getData();
	if (redirect == true) {
		if (window.location.search == "?iCtrl=STUDENT_BASE_HOME_CONTROL") {
			window.location.search = "?iCtrl=PLAYLIST_HOME_CLASS";
		}
	}
}
function closingCode(){
	getData();
	var message = "Are you sure you want to navigate away from this page?\n\nYou have started writing or editing a post.\n\nPress OK to continue or Cancel to stay on the current page.";
	
	if (goBack == true) {
		if (confirm(message)) return true;
		return false;
	}
}
function darkMode(){
	getData();
	if (dark == true) {
		$('.drag_out td').css('background', '#33383b');
		$('div').css('color', '#E0E0E0');
		$('.totalMessages').css('color', '#33383b');
		$('.ph_class_img_txt').css('color', '#33383b');
		$('.ph_main_out').css('background', '#33383b');
		$('.loading_popup').css('background', '#596167');
		$('.loading_popup').css('border', '2px solid #7f868a');
		$('.ph_round_right').css('color', '#596167');
		$('.ph_class_name').css('color', '#E0E0E0');
		$('.ph_class_img_outer2').css('background', '#596167');
		$('.ph_class_img_outer:last-child').css('background', '#596167');
		$('.ph_title').css('color', '#898b8e');
		$('#PlaylistMainarea').css('background', '#33383b');
		$('html').css('background', '#33383b');
		$('.bgrep').css('background', '#33383b');
		$('.edu_popup').css('background', '#33383b');
	}
}
function theOnLoad(){
	checkIfNewEmpower();
	darkMode();
}
window.onbeforeunload = closingCode;
$( document ).ready(theOnLoad);
$('*').on('load change click dblclick  hover keydown keypress keyup load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup resize scroll select', theOnLoad);
