var redirect	= false;
var goBack	= false;
var dark	= false;

function getData(){
	chrome.storage.local.get({
		redirect: true,
		goBack:   true,
		dark:     false,
	}, function(items) {
		redirect = items.redirect;
		goBack   = items.goBack;
		dark     = items.dark;
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
	var color1 = "#33383b";
	var color2 = "#596167";
	var color3 = "#E0E0E0";
	var color4 = "#596167";
	var color5 = "#7f868a";

	if (dark == true) {
		$('.drag_out td').css('background', color1);
		$('div').css('color', color3);
		$('.totalMessages').css('color', color1);
		$('.ph_class_img_txt').css('color', color1);
		$('.ph_main_out').css('background', color1);
		$('.loading_popup').css('background', color4);
		$('.loading_popup').css('border', '2px solidi' + color5);
		$('.ph_round_right').css('color', color4);
		$('.ph_class_name').css('color', color3);
		$('.ph_class_img_outer2').css('background', color2);
		$('.ph_class_img_outer:last-child').css('background', color2);
		$('.ph_title').css('color', '#898b8e');
		$('#PlaylistMainarea').css('background', color1);
		$('html').css('background', color1);
		$('.bgrep').css('background', color1);
		$('.edu_popup').css('background', color1);
	}
}
function theOnLoad(){
	checkIfNewEmpower();
	darkMode();
}
window.onbeforeunload = closingCode;
$( document ).ready(theOnLoad);
//$('*').on('load change click dblclick  hover keydown keypress keyup load mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup resize scroll select', theOnLoad);
