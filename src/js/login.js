var redirect	= false;
var dark	= false;

function getData(){
	chrome.storage.local.get({
		redirect: true,
		dark:     false,
	}, function(items) {
		redirect = items.redirect;
		dark     = items.dark;
	});
}

function checkIfNewEmpower(){
	getData();
	if (redirect == true) {
		if (window.location.search == "?iCtrl=STUDENT_BASE_HOME_CONTROL") {
			window.stop();
			window.location.search = "?iCtrl=PLAYLIST_HOME_CLASS";
		}
	}
}
function darkMode(){
	getData();

	var background1 = "#33383b"; //background
	var background2 = "#596167"; //foreground

	var color1 = "#33383b"; //background
	var color2 = "#E0E0E0"; //foreground

	if (dark == true) {
		$('html').css('background',				background1);
		$('.main_top_outer').css('background',			background1);
		$('.main_outer').css('background',			background1);
		$('.inner_outer').css('background',			background2);
		
		$('.username_forget *').css('color',			color2);
		$('.cloneSSO2 *').css('color',				color2);
		
		$('.right_top_green').css('display',			"none");
		$('.logo img').css('display',				"none");
	}
}
function theOnLoad(){
	getData();
	checkIfNewEmpower();
	darkMode();
}
window.onload =	theOnLoad;
window.onchange = theOnLoad;
$( document ).ready(theOnLoad);
$('html').bind('DOMSubtreeModified',theOnLoad);
