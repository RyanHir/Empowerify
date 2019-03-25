var dark	= false;
var theme	= "dark";
var redirect = false;
var cssDir	= "/src/css";
var currentpath = "";
var colorA = "";
var colorB = "";
var colorC = "";
var colorD = "";

function getData(){
	chrome.storage.local.get({
		dark:	false,
		theme:	"dark",
		redirect: true,
		font:   "system",
		colorA: "#000",
		colorB: "#000",
		colorC: "#000",
		colorD: "#000"
	}, function(items) {
		dark   = items.dark;
		theme  = items.theme;
		redirect = items.redirect;
		colorA = items.colorA;
		colorB = items.colorB;
		colorC = items.colorC;
		colorD = items.colorD;
	});
}

function cssImport(site) {
	if (dark == true) {
		if (theme == "dark") {
			chrome.tabs.insertCSS({file: cssDir+'/template/theme/dark.css', runAt: "document_start", cssOrigin: "user"});
		} else if (theme == "salmon") {
			chrome.tabs.insertCSS({file: cssDir+'/template/theme/salmon.css', runAt: "document_start", cssOrigin: "user"});
		} else if (theme == "mint") {
			chrome.tabs.insertCSS({file: cssDir+'/template/theme/mint.css', runAt: "document_start", cssOrigin: "user"});
		} else if (theme == "navy") {
			chrome.tabs.insertCSS({file: cssDir+'/template/theme/navy.css', runAt: "document_start", cssOrigin: "user"});
		} else if (theme == "custom") {
			chrome.tabs.insertCSS({code:
				":root {" +
				"--backgroundOne: " + colorA + ";" +
				"--backgroundTwo: " + colorB + ";" +
				"--colorOne: " + colorC + ";" +
				"--colorTwo: " + colorD + ";" +
				"}", runAt: "document_start", cssOrigin: "user"
			});
		}
		chrome.tabs.insertCSS({file: cssDir+'/template/site/'+site+'.css', runAt: "document_start", cssOrigin: "user"});
	}
}

chrome.tabs.onUpdated.addListener(function(tab) {
	getData();

	chrome.tabs.query({ currentWindow: true, lastFocusedWindow: true, active:true }, function (tabs) {
		try {
			var temp = new URL(tabs[0].url);
		} catch {
			var temp = "";
		}

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

chrome.webRequest.onBeforeRequest.addListener(interceptRequest,
	{urls: ['*://*.empowerlearning.net/iFrame.aspx?iCtrl=STUDENT_BASE_HOME_CONTROL']},
	['blocking']);
