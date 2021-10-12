# UI-Automation-Selenium-Javascript-Nodejs-Mocha-Mochawesome-Chai
A Test Project using Selenium Webdriver coded in JavaScript language (runs on Node.js) using Mocha framework and Chai assertions (from NPM package manager) based on Page Object Pattern and OOPS concepts with Mochawesome reporting.

## How to run:

* Clone the github repository which has '**geckodriver**' to run on Firefox browser inside 'drivers' folder (latest downloaded from https://github.com/mozilla/geckodriver/releases/)
* Set the driver path in '**Environment Variables-> User Variables-> Path**'.
* From the project's root directory, run the command '**npm install**' which will install dependencies mentioned in package.json.
* The command to then run the code as a Node.js application is '**npm run qa**' for *cross-env NODE_ENV=qa*.

## Highlights of the project:

> Supports cross-browser testing.

> Able to run in different environments as set in package.json.

> Dependencies used from NPM package manager.

> Developed with resuable functions in Page Object Pattern with more modern syntax.

> Chai assertions are used to validate check points in scenarios.

> Launch.json file to debug is created to do in various environments.

> Test results after run can be viewed in Mochawesome report in a customised folder.
