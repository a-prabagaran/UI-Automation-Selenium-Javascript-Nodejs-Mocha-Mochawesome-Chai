const { By } = require("selenium-webdriver");
const BasePage = require("../util/basepage");
const { assert } = require("chai");

let title_your_cart_page;
let price_list;
let price_text;
let price_array = [];
let price_array_to_splice = [];
let products_to_remove_array = [];

class YourcartPage extends BasePage {
	async verify_yourcartpage_title(your_cart_page_title) {
		title_your_cart_page = await driver
			.findElement(By.xpath("//span[@class='title']"))
			.getText();
		assert.equal(
			title_your_cart_page,
			your_cart_page_title,
			"Navigation to Your Cart page is unsuccessful"
		);
	}
	async pick_type_of_product_to_remove(count, type) {
		price_list = await driver.findElements(
			By.xpath("//div[@class='inventory_item_price']")
		);
		for (let i = 1; i <= price_list.length; i++) {
			price_text = await driver
				.findElement(
					By.xpath("(//div[@class='inventory_item_price'])[" + i + "]")
				)
				.getText();
			price_text = price_text.split("$");
			price_array.push(parseFloat(price_text.slice(1, 2)));
			price_array_to_splice.push(parseFloat(price_text[1]));
		}
		switch (type) {
			case "cheap":
				for (let i = 1; i <= count; i++) {
					let min = Math.min(...price_array_to_splice);
					products_to_remove_array.push(min);
					price_array_to_splice.splice(price_array_to_splice.indexOf(min), 1);
				}
				break;
			case "expensive":
				for (let i = 1; i <= count; i++) {
					let max = Math.max(...price_array_to_splice);
					products_to_remove_array.push(max);
					price_array_to_splice.splice(price_array_to_splice.indexOf(max), 1);
				}
				break;
			default:
				assert.fail("No valid product type is mentioned to remove");
		}
	}
	async remove_picked_products_from_basket() {
		for (let i = 0; i < price_array.length; i++) {
			if (products_to_remove_array.includes(price_array[i])) {
				await driver
					.findElement(
						By.xpath(
							"(//div[@class='inventory_item_price'])[" +
								(i + 1) +
								"]//following-sibling::button"
						)
					)
					.click();
			}
		}
		price_list = await driver.findElements(
			By.xpath("//div[@class='inventory_item_price']")
		);
		assert.equal(
			price_list.length,
			price_array.length - products_to_remove_array.length
		);
		for (let i = 1; i <= price_list.length; i++) {
			price_text = await driver
				.findElement(
					By.xpath("(//div[@class='inventory_item_price'])[" + i + "]")
				)
				.getText();
			price_text = price_text.split("$");
			if (products_to_remove_array.includes(price_text.slice(1, 2))) {
				assert.fail("Removing products from basket is unsuccessful");
			}
		}
	}
	async click_checkout() {
		await driver.findElement(By.xpath("//button[@id='checkout']")).click();
	}
}

module.exports = new YourcartPage();
