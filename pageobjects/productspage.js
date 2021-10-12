const { By } = require("selenium-webdriver");
const BasePage = require("../util/basepage");
const { assert } = require("chai");
var chai = require("chai"),
	expect = chai.expect;
chai.use(require("chai-sorted"));

let title_products_page;
let price_list;
let price_text;
let price_array = [];
let basket_badge;
let products_to_basket_array = [];
let remove_buttons_count = 0;

class ProductsPage extends BasePage {
	async verify_productspage_title(products_page_title) {
		title_products_page = await driver
			.findElement(By.xpath("//span[@class='title']"))
			.getText();
		assert.equal(
			title_products_page,
			products_page_title,
			"Login unsuccessful"
		);
	}
	async sort_products_by_price(sortBy) {
		await driver
			.findElement(By.xpath("//select[@class='product_sort_container']"))
			.click();
		await driver
			.findElement(
				By.xpath(
					"//select[@class='product_sort_container']//option[contains(text(),'" +
						sortBy +
						"')]"
				)
			)
			.click();
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
		}
		switch (sortBy) {
			case "Price (high to low)":
				expect(price_array).to.be.descending;
				break;
			case "Price (low to high)":
				expect(price_array).to.be.ascending;
				break;
			default:
				assert.fail("Products are not sorted by price");
		}
	}
	async pick_least_product_to_add(count) {
		for (let i = 1; i <= count; i++) {
			products_to_basket_array.push(price_array[price_array.length - i]);
		}
	}
	async add_picked_products_to_basket() {
		for (let i = 0; i < price_array.length; i++) {
			if (products_to_basket_array.includes(price_array[i])) {
				await driver
					.findElement(
						By.xpath(
							"(//div[@class='inventory_item_price'])[" +
								(i + 1) +
								"]//following-sibling::button"
						)
					)
					.click();
				remove_buttons_count++;
			}
		}
		assert.equal(remove_buttons_count, products_to_basket_array.length);
		basket_badge = await driver
			.findElement(By.xpath("//span[@class='shopping_cart_badge']"))
			.getText();
		assert.equal(
			basket_badge,
			products_to_basket_array.length,
			"Adding products to basket is unsuccessful"
		);
	}
	async open_basket() {
		await driver
			.findElement(By.xpath("//a[@class='shopping_cart_link']"))
			.click();
	}
}

module.exports = new ProductsPage();
