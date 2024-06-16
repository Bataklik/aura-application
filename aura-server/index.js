require("dotenv").config();
const { AxeBuilder } = require("@axe-core/webdriverjs");
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const compression = require("compression");
const pa11y = require("pa11y");
const aChecker = require("accessibility-checker");
var timeout = require("connect-timeout");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(timeout("240s"));
app.use(compression());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
const urlCheck = (res, url) => {
  if (!url || typeof url !== "string") {
    return res
      .status(400)
      .json({ error: "'url' query parameter is missing or invalid" });
  }
};

app.get("/api/axe", async (req, res) => {
  const url = req.query.url;
  urlCheck(res, url);
  try {
    const driver = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new chrome.Options().addArguments("--headless"))
      .build();
    await driver.get(url);
    const results = await new AxeBuilder(driver).analyze();
    await driver.quit();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/pa11y", async (req, res) => {
  const url = req.query.url;
  urlCheck(res, url);
  pa11y(url)
    .then(results => {
      res.status(200).json(results);
    })
    .catch(error => {
      res.json({ error: error.message });
    });
});

app.get("/api/achecker", async (req, res) => {
  const url = req.query.url;
  urlCheck(res, url);
  try {
    const results = await aChecker.getCompliance(url, "/");
    const report = results.report;
    res.status(200).json({ report });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  } finally {
    await aChecker.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
