function checkIfNewEmpower(){
	if (window.location.search == "?iCtrl=STUDENT_BASE_HOME_CONTROL") {
		window.location.replace('https://plano.empowerlearning.net/iFrame.aspx?iCtrl=PLAYLIST_HOME_CLASS');
	}
}
function closingCode(){
   var message = "Are you sure you want to navigate away from this page?\n\nYou have started writing or editing a post.\n\nPress OK to continue or Cancel to stay on the current page.";
	if (confirm(message)) return true;
	else return false;
}
window.onbeforeunload = closingCode;
window.onload = checkIfNewEmpower;
