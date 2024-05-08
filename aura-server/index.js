require("dotenv").config();
const { AxeBuilder } = require("@axe-core/webdriverjs");
const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const compression = require("compression");
const pa11y = require("pa11y");
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

app.get("/api/axe-results", async (req, res) => {
  const url = req.query.url;

  if (!url || typeof url !== "string") {
    return res
      .status(400)
      .json({ error: "'url' query parameter is missing or invalid" });
  }

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

app.get("/api/pa11y-results", async (req, res) => {
  const url = req.query.url;
  if (!url || typeof url !== "string") {
    return res
      .status(400)
      .json({ error: "'url' query parameter is missing or invalid" });
  }
  pa11y(url)
    .then(results => {
      res.json(results);
    })
    .catch(error => {
      res.json({ error: error.message });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
