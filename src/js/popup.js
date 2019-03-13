// Saves options to chrome.storage
function save_options() {
  var redirect = document.getElementById('redirect').checked;
  var goBack =   document.getElementById('goBack').checked;
  var dark =     document.getElementById('dark').checked;

  chrome.storage.local.set({
    redirect: redirect,
    goBack:   goBack,
    dark:     dark,
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
  }, function(items) {
    document.getElementById('redirect').checked		= items.redirect;
    document.getElementById('goBack').checked		= items.goBack;
    document.getElementById('dark').checked		= items.dark;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
