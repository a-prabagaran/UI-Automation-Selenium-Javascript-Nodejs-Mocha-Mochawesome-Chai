const { By } = require("selenium-webdriver");
const BasePage = require("../util/basepage");
const { assert } = require("chai");

let title_checkout_page;

class CheckoutPage extends BasePage {
	async verify_checkoutpage_title(checkout_page_title) {
		title_checkout_page = await driver
			.findElement(By.xpath("//span[@class='title']"))
			.getText();
		assert.equal(
			title_checkout_page,
			checkout_page_title,
			"Navigation to Checkout page is unsuccessful"
		);
	}
}

module.exports = new CheckoutPage();
