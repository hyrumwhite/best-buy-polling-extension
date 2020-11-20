chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.checkResult === "success") {
    chrome.tabs.update(sender.tab.id, { highlighted: true });
    chrome.notifications.create("available", {
      type: "basic",
      iconUrl: "./best-buy-128.png",
      title: "Potential item available",
      message: "The item you're checking for may be available",
    });
  }
});
