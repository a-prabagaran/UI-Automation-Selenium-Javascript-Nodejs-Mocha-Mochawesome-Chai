const config = require("config");
const loginpage = require("../pageobjects/loginpage");
const productspage = require("../pageobjects/productspage");
const yourcartpage = require("../pageobjects/yourcartpage");
const checkoutpage = require("../pageobjects/checkoutpage");

describe("tray.io- SDET Take Home Task", function () {
	this.timeout(20000);
	before(async function () {
		await loginpage.launch_url(config.get("url"));
	});
	it("#1 Login to https://www.saucedemo.com/ using the 'standard_user' account", async function () {
		await loginpage.enter_login_details(config.get("users.standard_user"));
		await loginpage.click_login();
	});
	it("#2 Sort the products by Price (high to low)", async function () {
		await productspage.verify_productspage_title(
			config.get("products_page.title")
		);
		await productspage.sort_products_by_price(
			config.get("products_page.sort_by_price_HightoLow")
		);
	});
	it("#3 Add the two cheapest products to your basket", async function () {
		await productspage.pick_least_product_to_add(
			config.get("products_page.count_to_add_to_cart")
		);
		await productspage.add_picked_products_to_basket();
	});
	it("#4 Open the basket", async function () {
		await productspage.open_basket();
	});
	it("#5 Remove the cheapest product from your basket", async function () {
		await yourcartpage.verify_yourcartpage_title(
			config.get("your_cart_page.title")
		);
		await yourcartpage.pick_type_of_product_to_remove(
			config.get("your_cart_page.count_to_remove_from_cart"),
			config.get("your_cart_page.remove_product_type")
		);
		await yourcartpage.remove_picked_products_from_basket();
	});
	it("#6 Checkout", async function () {
		await yourcartpage.click_checkout();
	});
	it("#7 Finish on the page where you need to enter your name and postal code (you do not need to fill in this form)", async function () {
		await checkoutpage.verify_checkoutpage_title(
			config.get("checkout_page.title")
		);
	});
	after(async function () {
		await loginpage.quit_browser();
	});
});
