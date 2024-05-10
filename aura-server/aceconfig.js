module.exports = {
  ruleArchive: "latest",
  policies: ["IBM_Accessibility"],
  failLevels: ["violation", "potentialviolation"],
  reportLevels: [
    "violation",
    "potentialviolation",
    "recommendation",
    "potentialrecommendation",
    "manual",
    "pass",
  ],
  outputFormat: ["json"],
  outputFilenameTimestamp: true,
  label: ["master"],
  outputFolder: "results",
  baselineFolder: "test/baselines",
  cacheFolder: "/tmp/accessibility-checker",
};
