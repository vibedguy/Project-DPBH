chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'alertUser') {
    alert(request.message);
  }
});
