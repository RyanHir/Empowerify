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
function darkMode(){
	getData();

	var background1 = "#33383b"; //background
	var background2 = "#596167"; //foreground

	var color1 = "#33383b"; //background
	var color2 = "#E0E0E0"; //foreground

	if (dark == true) {
		$('.drag_out td').css('background',			background1);
		$('#PlaylistMainarea').css('background',		background1);
		$('html').css('background',				background1);
		$('.bgrep').css('background',				background1);
		$('.edu_popup').css('background',			background1);
		$('.ph_main_out').css('background',			background1);
		$('.loading_popup').css('background',			background2);
		$('.hybrid_inn_bp').css('background',			background2);
		$('.ph_class_img_outer2').css('background',		background2);
		$('.ph_class_img_outer:last-child').css('background',	background2);
		
		$('.ph_class_img_txt').css('color',			color1);
		$('.ph_round_right').css('color',			color1);
		$('.totalMessages').css('color',			color1);
		$('.white_content').css('color',			color1);
		$('.loading_popup').css('color',			color2);
		$('.ph_class_name').css('color',			color2);
		$('.ph_title').css('color',				color2);
		$('.ph_class_img_txt span').css('color',		color2);
		$('.ph_class_name span').css('color',			color2);
		$('.redactor_editor').css('color',			color2);

		$('.loading_popup').css('border',			'2px solid '+ color1);
		$('.content').css('height',				"100%");
		$('.left_column').css('box-shadow',			"none");
	}
}
function theOnLoad(){
	getData();
	checkIfNewEmpower();
	darkMode();
}
window.onbeforeunload = closingCode;
window.onload =	theOnLoad;
window.onchange = theOnLoad;
$( document ).ready(theOnLoad);
$('html').bind('DOMSubtreeModified',theOnLoad);
