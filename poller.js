console.log("Best Buy Checker is running");

let intervalId = null;

const messageBackgroundScript = (params) =>
  chrome.runtime.sendMessage(params, (response) => {});

const checkCart = async (sku) => {
  console.log("BB extension: checking cart");
  let res = await fetch("https://www.bestbuy.com/cart/api/v1/addToCart", {
    headers: {
      accept: "application/json",
      "accept-language": "en-US,en;q=0.9,zh-TW;q=0.8,zh;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/json; charset=UTF-8",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    referrerPolicy: "strict-origin-when-cross-origin",
    body: `{"items":[{"skuId":"${sku}"}]}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
  let message = "";
  let json = await res.json();
  if (res.ok) {
    if (json.errorSummary) {
      message = json.errorSummary.message;
    } else {
      chrome.runtime.sendMessage({ checkResult: "success" }, (response) => {});
    }
  } else {
		if (json.errorSummary) {
			message = json.errorSummary.message;
			if (
				message !==
				"This item is currently unavailable for online purchase. The item was not added to your cart."
				&& message !== "Sorry, there was a problem adding the item to your cart. Please try again."
      ) {
        chrome.runtime.sendMessage(
          { checkResult: "success" },
          (response) => {}
        );
      }
    } else {
      message =
        "Something went wrong during the check. Verify your sku number is correct.";
    }
  }
  chrome.storage.local.set({ bbOutput: message, pollTime: Date.now() });
};

const startPolling = () => {
  window.clearInterval(intervalId);
  chrome.storage.local.get({ sku: "", pollRate: 5 }, ({ sku, pollRate }) => {
    checkCart(sku);
    let ms = pollRate * 60000;
    intervalId = window.setInterval(() => checkCart(sku), ms);
  });
};

const stopPolling = () => {
  console.log("stopped polling");
  window.clearInterval(intervalId);
};

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (
    changes.stopPolling &&
    changes.stopPolling.oldValue !== changes.stopPolling.newValue
  ) {
    stopPolling();
  }
});

startPolling();
