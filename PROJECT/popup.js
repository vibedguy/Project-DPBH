document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('scanButton').addEventListener('click', function () {
      var url = document.getElementById('urlInput').value;
      chrome.runtime.sendMessage({ action: 'scanProduct', url: url }, function (response) {
          if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError.message);
          } else if (response && response.message) {
              console.log(response.message);
          } else {
              console.error("Error: Invalid response received.");
          }
      });
  });
});
