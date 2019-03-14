var dark     = false;

function getData(){
	chrome.storage.local.get({
		dark:     false,
	}, function(items) {
		dark     = items.dark;
	});
}

chrome.tabs.onUpdated.addListener(function(tab) {
	getData();
	if (dark == true) {
		chrome.tabs.insertCSS({
			file: '/src/css/inject/darkOld.css',
		}); 
	}
});
