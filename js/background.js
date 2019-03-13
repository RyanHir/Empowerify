var redirect = false;
var goBack   = false;
var dark     = false;


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

chrome.tabs.onUpdated.addListener(function(tab) {
	getData();
	if (dark == true) {
		chrome.tabs.insertCSS({
			file: '/css/inject/darkOld.css',
			allFrames: true
		}); 
	}
});

chrome.tabs.onRemoved.addListener(function() {
	getData();
	var message = "Are you sure you want to navigate away from this page?\n\nPress OK to continue or Cancel to stay on the current page.";
	
	if (goBack == true) {
		if (confirm(message)) return true;
		return false;
	}
});
