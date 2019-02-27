// Saves options to chrome.storage
function save_options() {
  var redirect = document.getElementById('redirect').checked;
  var goBack =   document.getElementById('goBack').checked;
  var dark =     document.getElementById('dark').checked;
  var custom =   document.getElementById('custom').checked;
  var colorOne = document.getElementById('colorPicker1').value;
  var colorTwo = document.getElementById('colorPicker2').value;

  chrome.storage.local.set({
    redirect: redirect,
    goBack:   goBack,
    dark:     dark,
    custom:   custom,
    colorOne: colorOne,
    colorTwo: colorTwo,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = 'Click Save';
    }, 750);
  });
}
 
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.local.get({
    redirect: true,
    goBack:   true,
    dark:     false,
    custom:   false,
    colorOne: "#ffffff",
    colorTwo: "#ffffff",
  }, function(items) {
    document.getElementById('redirect').checked =   items.redirect;
    document.getElementById('goBack').checked	=     items.goBack;
    document.getElementById('dark').checked	=       items.dark;
    document.getElementById('custom').checked =     items.custom;
    document.getElementById('colorPicker1').value = items.colorOne;
    document.getElementById('colorPicker2').value = items.colorTwo;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
