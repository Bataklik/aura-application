import {
  AcheckerResultsType,
  AxeIncompeleteType,
  AxeViolationType,
  PA11YIssueType,
} from "@/lib/types";

export const countAxeResultProblems = (
  violations: AxeViolationType | undefined,
  incomplete: AxeIncompeleteType | undefined
) => {
  if (!violations || !incomplete) return undefined;
  let totalProblemsCount = 0;
  violations.forEach(violation => {
    totalProblemsCount += violation.nodes.length;
  });
  incomplete.forEach(incomplete => {
    totalProblemsCount += incomplete.nodes.length;
  });
  return totalProblemsCount;
};

export const countPa11yResultProblems = (
  results: PA11YIssueType[] | undefined
) => {
  if (!results) return undefined;
  return results.length;
};

export const countAccheckerResultProblems = (
  result: AcheckerResultsType | undefined
) => {
  if (!result || !result.report) return undefined;
  return result.report.results.filter(item => item.level === "violation")
    .length;
};
