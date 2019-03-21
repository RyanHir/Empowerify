var dark	= false;
var theme	= "dark";
var redirect = false;
var cssDir	= "/src/css";
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

function cssImport(site) {
	if (dark == true) {
		if (theme == "dark") {
			chrome.tabs.insertCSS({file: cssDir+'/template/theme/dark.css'});
		} else if (theme == "salmon") {
			chrome.tabs.insertCSS({file: cssDir+'/template/theme/salmon.css'});
		} else if (theme == "mint") {
			chrome.tabs.insertCSS({file: cssDir+'/template/theme/mint.css'});
		} else if (theme == "navy") {
			chrome.tabs.insertCSS({file: cssDir+'/template/theme/navy.css'});
		}
		chrome.tabs.insertCSS({file: cssDir+'/template/site/'+site+'.css'});
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
		cssImport("old");
	} else if (currentpath == "/iFrame.aspx?iCtrl=STUDENT_BASE_HOME_CONTROL") {
		cssImport("new");
	} else if (currentpath == "/default.aspx?LOAD_PAGE=true") {
		cssImport("login");
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
