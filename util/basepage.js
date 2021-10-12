var webdriver = require("selenium-webdriver");
const config = require("config");
var driver = new webdriver.Builder()
	.forBrowser(config.get("browsers.firefox"))
	.build();
driver.manage().setTimeouts({ implicit: 10000 });

class BasePage {
	constructor() {
		global.driver = driver;
	}
	async launch_url(url) {
		await driver.get(url);
	}
	async quit_browser() {
		await driver.quit();
	}
}

module.exports = BasePage;
