var dark	= false;
var theme	= "dark";
var cssDir	= "/src/css/inject/";
var currentpath = "";

function getData(){
	chrome.storage.local.get({
		dark:	false,
		theme:	"dark"
	}, function(items) {
		dark	= items.dark;
		theme	= items.theme;
	});
}

function oldTheme() {
	if (dark == true) {
		if (theme == "dark") {
			chrome.tabs.insertCSS({
				file: cssDir+'old/dark.css',
			});
		} else if (theme == "salmon") {
			chrome.tabs.insertCSS({
				file: cssDir+'old/salmon.css',
			});
		}
	}
}

function newTheme() {
	if (dark == true) {
		if (theme == "dark") {
			chrome.tabs.insertCSS({
				file: cssDir+'new/dark.css',
			});
		} else if (theme == "salmon") {
			chrome.tabs.insertCSS({
				file: cssDir+'new/salmon.css',
			});
		}
	}
}

chrome.tabs.onUpdated.addListener(function(tab) {
	getData();

	chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		var temp = new URL(tabs[0].url);
		
		currentpath = temp.search;
	});

	if (currentpath == "?iCtrl=PLAYLIST_HOME_CLASS") {
		oldTheme();
	} else if (currentpath == "?iCtrl=STUDENT_BASE_HOME_CONTROL") {
		newTheme();
	}
});
