const { By } = require("selenium-webdriver");
const BasePage = require("../util/basepage");
const config = require("config");

const username_standard_user = config.get(
	"login_details.username_standard_user"
);
const username_locked_out_user = config.get(
	"login_details.username_locked_out_user"
);
const username_problem_user = config.get("login_details.username_problem_user");
const username_performance_glitch_user = config.get(
	"login_details.username_performance_glitch_user"
);
const password_all_users = config.get("login_details.password_all_users");

class LoginPage extends BasePage {
	async enter_login_details(user) {
		let username_textbox = driver.findElement(
			By.xpath("//input[@id='user-name']")
		);
		let password_textbox = driver.findElement(
			By.xpath("//input[@id='password']")
		);
		switch (user) {
			case "locked_out_user":
				await username_textbox.sendKeys(username_locked_out_user);
				await password_textbox.sendKeys(password_all_users);
				break;
			case "problem_user":
				await username_textbox.sendKeys(username_problem_user);
				await password_textbox.sendKeys(password_all_users);
				break;
			case "performance_glitch_user":
				await username_textbox.sendKeys(username_performance_glitch_user);
				await password_textbox.sendKeys(password_all_users);
				break;
			default:
				await username_textbox.sendKeys(username_standard_user);
				await password_textbox.sendKeys(password_all_users);
		}
	}
	async click_login() {
		await driver.findElement(By.xpath("//input[@id='login-button']")).click();
	}
}

module.exports = new LoginPage();
