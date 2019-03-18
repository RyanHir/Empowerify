window.onbeforeunload = function() {
	var goBack	= false;

	chrome.storage.local.get({
		goBack:   true,
	}, function(items) {
		goBack   = items.goBack;
	});

	var message = "Are you sure you want to navigate away from this page?\n\nPress OK to continue or Cancel to stay on the current page.";
	
	if (goBack == true) {
		if (confirm(message)) return true;
		return false;
	}
};