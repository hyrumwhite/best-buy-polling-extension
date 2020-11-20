const defaultSku = 6429440;
const defaultPollRate = 5; //min

chrome.storage.local.get(
  { sku: defaultSku, pollRate: defaultPollRate, bbOutput: "", pollTime: "" },
  ({ sku, pollRate, bbOutput, pollTime }) => {
    skuInput.value = sku;
    rateInput.value = pollRate;
    output.value =
      (pollTime ? new Date(pollTime).toLocaleTimeString() : "") +
      " " +
      bbOutput;
  }
);

startChecking.addEventListener("click", () => {
  chrome.storage.local.set(
    { sku: skuInput.value, pollRate: rateInput.value },
    () => {
      chrome.tabs.query({ url: "https://*.bestbuy.com/*" }, (tabs) => {
        for (let tab of tabs) {
          chrome.tabs.reload(tab.id);
        }
        if (!tabs || !tabs.length) {
          window.open("https://bestbuy.com");
        }
      });
    }
  );
});

stopChecking.addEventListener("click", () => {
  chrome.storage.local.set({ stopPolling: Date.now() });
});
