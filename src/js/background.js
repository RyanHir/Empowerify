var dark	= false;
var theme	= "dark";
var redirect = false;
var cssDir	= "/src/css/template";
var currentpath = "";
var color = {};

function getData(){
	const start = Date.now();
	chrome.storage.local.get({
		dark:	false,
		theme:	"dark",
		redirect: true,
		font:   "system",
		colorA: "#000000",
		colorB: "#FFFFFF",
		colorC: "#000000",
		colorD: "#FFFFFF"
	}, function(items) {
		dark   = items.dark;
		theme  = items.theme;
		redirect = items.redirect;
		color  = {
			A: items.colorA,
			B: items.colorB,
			C: items.colorC,
			D: items.colorD};
	});
	return (Date.now() - start);
}

function cssImport(site) {
	const start = Date.now();
	if (dark == true) {
		if (theme != "custom") {
			chrome.tabs.insertCSS({file: cssDir+'/theme/'+theme+'.css', runAt: "document_start", cssOrigin: "user"});
		} else if (theme == "custom") {
			chrome.tabs.insertCSS({code:
				":root {" +
				"--backgroundOne: " + color.A + ";" +
				"--backgroundTwo: " + color.B + ";" +
				"--colorOne: " + color.C + ";" +
				"--colorTwo: " + color.D + ";" +
				"}", runAt: "document_start", cssOrigin: "user"
			});
		}
		chrome.tabs.insertCSS({file: cssDir+'/site/'+site+'.css', runAt: "document_start", cssOrigin: "user"});
	}
	return (Date.now() - start);
}

chrome.tabs.onUpdated.addListener(function(tab) {
	var timeToGetData = getData();

	chrome.tabs.query({ currentWindow: true, lastFocusedWindow: true, active:true }, function (tabs) {
		try {
			var temp = new URL(tabs[0].url);
		} catch {
			var temp = "";
		}

		currentpath = temp.pathname + temp.search;
	});


	console.group("Background");
	if (currentpath == "/iFrame.aspx?iCtrl=PLAYLIST_HOME_CLASS") {
		var timeToSetCss = cssImport("old");
		console.log("Took " + timeToSetCss + " Milisecconds to set User Theme");
	} else if (currentpath == "/iFrame.aspx?iCtrl=STUDENT_BASE_HOME_CONTROL") {
		var timeToSetCss = cssImport("new");
		console.log("Took " + timeToSetCss + " Milisecconds to set User Theme");
	} else if (currentpath == "/default.aspx?LOAD_PAGE=true") {
		var timeToSetCss = cssImport("login");
		console.log("Took " + timeToSetCss + " Milisecconds to set User Theme");
	}
	console.log("Took " + timeToGetData + " Miliseconds to get User Data");
	console.groupEnd();
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
