// This page will get depricated, and that is a promise
var dark	= false;

function getData(){
	chrome.storage.local.get({
		dark:     false,
	}, function(items) {
		dark     = items.dark;
	});
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
window.onload =	darkMode;
window.onchange = darkMode;
$( document ).ready(darkMode);
$('html').bind('DOMSubtreeModified',darkMode);
