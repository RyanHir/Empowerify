var dark	= false;
var theme	= "dark";
var redirect = false;
var cssDir	= "/src/css/inject/";
var currentpath = "";

function getData(){
	chrome.storage.local.get({
		dark:	false,
		theme:	"dark",
		redirect: true
	}, function(items) {
		dark	= items.dark;
		theme	= items.theme;
		redirect = items.redirect;
	});
}

function oldTheme() {
	if (dark == true) {
		if (theme == "dark") {
			chrome.tabs.insertCSS({file: cssDir+'old/dark.css'});
		} else if (theme == "salmon") {
			chrome.tabs.insertCSS({file: cssDir+'old/salmon.css'});
		}
	}
}

function newTheme() {
	if (dark == true) {
		if (theme == "dark") {
			chrome.tabs.insertCSS({file: cssDir+'new/dark.css'});
		} else if (theme == "salmon") {
			chrome.tabs.insertCSS({file: cssDir+'new/salmon.css'});
		}
	}
}

function loginTheme() {
	if (dark == true) {
		if (theme == "dark") {
			chrome.tabs.insertCSS({file: cssDir+'login/dark.css'});
		} else if (theme == "salmon") {
			chrome.tabs.insertCSS({file: cssDir+'login/salmon.css'});
		}
	}
}

chrome.tabs.onUpdated.addListener(function(tab) {
	getData();

	chrome.tabs.query({ currentWindow: true, lastFocusedWindow: true, active:true }, function (tabs) {
		var temp = new URL(tabs[0].url);
		
		currentpath = temp.pathname + temp.search;
		console.log(temp);
	});

	if (currentpath == "/iFrame.aspx?iCtrl=PLAYLIST_HOME_CLASS") {
		oldTheme();
	} else if (currentpath == "/iFrame.aspx?iCtrl=STUDENT_BASE_HOME_CONTROL") {
		newTheme();
	} else if (currentpath == "/default.aspx?LOAD_PAGE=true") {
		loginTheme();
	}
});

function interceptRequest(request) {
	getData();
	var newURL = new URL(request.url);
	if (redirect == false) {
		return {
			cancel: false
		};
	} else {
		return {
			redirectUrl: newURL.origin + '/iFrame.aspx?iCtrl=PLAYLIST_HOME_CLASS'
		}
	}
}

chrome.webRequest.onBeforeRequest.addListener(interceptRequest, { urls: ['*://*.empowerlearning.net/iFrame.aspx?iCtrl=STUDENT_BASE_HOME_CONTROL'] }, ['blocking']);
