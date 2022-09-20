console.log(222, chrome)
chrome.action.onClicked.addListener((tab) => {
  console.log(1111111)
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: [
      'src/content.js'
    ]
  })
})
