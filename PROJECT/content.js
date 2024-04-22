chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'scanWebsite') {
    // Fetch the list of words from the dataset.tsv file
    fetch(chrome.extension.getURL('dataset.tsv'))
      .then(response => response.text())
      .then(data => {
        const wordsToScan = data.split('\n').map(word => word.trim()).filter(Boolean);

        // Get all text content on the page
        const pageText = document.body.innerText.toLowerCase();

        // Check if any word in the dataset is present on the page
        const foundWords = wordsToScan.filter(word => pageText.includes(word.toLowerCase()));

        if (foundWords.length > 0) {
          chrome.runtime.sendMessage({ action: 'alertUser', message: `Found words: ${foundWords.join(', ')}` });
        } else {
          chrome.runtime.sendMessage({ action: 'alertUser', message: 'No matching words found.' });
        }
      })
      .catch(error => console.error('Error fetching dataset.tsv:', error));
  }
});
