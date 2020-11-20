# Installation

1. clone this repo
2. go to chrome://extensions
3. enable the developer mode toggle
4. drag this entire directory onto the chrome://extensions page
5. click the best buy logo in your extension list
6. pick your polling rate, and your desired SKU (it defaults to the RTX 3080 FE)and hit 'start checking'

# Note

- This will only work if the best buy page stays open. It only does desktop notifications, you're not going to magically get phone notifications.
- You can check the last time the extension checked availability by clicking the extension icon.
- I got 403s if I set the rate too high. I ended up getting a card with a 5 minute polling rate
- USE AT YOUR OWN RISK: I have no idea how long this will be a viable way to check for product availability. Best Buy may change the api response or issue bans at any time for using this.
- I have no plans to update this repo. Feel free to dive in, make changes, whatever you want to this code. Just don't monetize it, in dev culture we consider this a jerk move.
