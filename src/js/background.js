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
