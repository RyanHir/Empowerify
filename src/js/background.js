var dark	= false;
var theme	= "dark";

function getData(){
	chrome.storage.local.get({
		dark:	false,
		theme:	"dark"
	}, function(items) {
		dark	= items.dark;
		theme	= items.theme;
	});
}

chrome.tabs.onUpdated.addListener(function(tab) {
	getData();
	if (dark == true) {
		if (theme == "dark") {
			chrome.tabs.insertCSS({
				file: '/src/css/inject/dark.css',
			});
		} else if (theme == "salmon") {
			chrome.tabs.insertCSS({
				file: '/src/css/inject/salmon.css',
			});
		}
	}
});
