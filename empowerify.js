window.onbeforeunload = closingCode;
function closingCode(){
   var message = "Are you sure you want to navigate away from this page?\n\nYou have started writing or editing a post.\n\nPress OK to continue or Cancel to stay on the current page.";
	if (confirm(message)) return true;
	else return false;
}
