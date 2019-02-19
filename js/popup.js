// Saves options to chrome.storage
function save_options() {
  var redirect = document.getElementById('redirect').checked;
  var goBack =   document.getElementById('goBack').checked;

  chrome.storage.local.set({
    redirect: redirect,
    goBack:   goBack,
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
  }, function(items) {
    document.getElementById('redirect').checked		= items.redirect;
    document.getElementById('goBack').checked		= items.goBack;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
