import { Input } from "../components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { TablerowLink } from "../components/tablerow-link";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "../components/ui/table";
import {
  getAcheckerResults,
  getAxeResults,
  getPA11YResults,
} from "../services/apiService";
import { useState } from "react";
import {
  AcheckerResultsType,
  AxeResultsType,
  Pa11yResultsType,
} from "@/lib/types";

export default function Home() {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [axeResults, setAxeResults] = useState<AxeResultsType | null>(null);
  const [axeStatus, setAxeStatus] = useState<string>("Api Waiting");

  const [pa11yResults, setPa11yResults] = useState<Pa11yResultsType | null>(
    null
  );
  const [pa11yStatus, setPa11yStatus] = useState<string>("Api Waiting");

  const [acheckerResults, setAcheckerResults] =
    useState<AcheckerResultsType | null>(null);
  const [acheckerStatus, setAcheckerStatus] = useState<string>("Api Waiting");

  const countAxeResultProblems = (result: AxeResultsType | undefined) => {
    if (result === undefined) return undefined;
    let totalProblemsCount = 0;
    //? Violations value
    if (result.violations) {
      result.violations.forEach(violation => {
        totalProblemsCount += violation.nodes.length;
      });
    }
    //? Incompete value
    if (result.incomplete) {
      result.incomplete.forEach(incomplete => {
        totalProblemsCount += incomplete.nodes.length;
      });
    }

    return totalProblemsCount;
  };

  const countPa11yResultProblems = (result: Pa11yResultsType | undefined) => {
    if (result === undefined) return undefined;
    let totalProblemsCount = 0;
    result.issues.forEach(issue => {
      totalProblemsCount += 1;
    });
    return totalProblemsCount;
  };
  const countAccheckerResultProblems = (
    result: AcheckerResultsType | undefined
  ) => {
    if (result === undefined) return undefined;
    let totalProblemsCount = 0;
    result.report.results.forEach(item => {
      if (item && item.level === "violation") {
        totalProblemsCount++;
      }
    });
    console.log("Achecker problems:", totalProblemsCount);
    return totalProblemsCount;
  };

  const handleClick = () => {
    setButtonDisabled(true);
    setAxeStatus("Api Loading...");
    setPa11yStatus("Api Loading...");

    getAxeResults("https://www.hogent.be")
      .then(result => {
        console.log("Result axe:", result);
        setAxeStatus("Api Success");
        setAxeResults(result);
      })
      .catch(error => {
        setAxeStatus("Api Error");
        console.error("Error:", error);
      });

    getPA11YResults("https://www.hogent.be")
      .then(result => {
        console.log("Result pa11y:", result);
        setPa11yStatus("Api Success");
        setPa11yResults(result);
      })
      .catch(error => {
        setPa11yStatus("Api Error");
        console.error("Error:", error);
      });
    getAcheckerResults("https://www.hogent.be")
      .then(result => {
        console.log("Result Achecker:", result);
        setAcheckerStatus("Api Success");
        setAcheckerResults(result);
      })
      .catch(error => {
        setAcheckerStatus("Api Error");
        console.error("Error:", error);
      });

    setButtonDisabled(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-600 mb-8">
          AURA is een tool die websites automatisch controleert op
          toegankelijkheid. Voer de URL van uw website in en klik op
          &apos;Controleer Toegankelijkheid&apos; om een gedetailleerd rapport
          te ontvangen.
        </p>
        <div className="flex items-center mb-8">
          <Input
            className="flex-1 mr-4"
            placeholder="Voer de URL van uw website in"
            type="text"
          />
          {buttonDisabled ? (
            <Button disabled={true} onClick={() => handleClick()}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Controleer Toegankelijkheid
            </Button>
          ) : (
            <Button disabled={false} onClick={() => handleClick()}>
              Controleer Toegankelijkheid
            </Button>
          )}
        </div>
        <div
          className="border rounded-md p-6 bg-gray-100 dark:bg-gray-800"
          id="results"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Problemen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TablerowLink
                href={"/pa11y"}
                name={"PA11Y"}
                status={pa11yStatus}
                problems={countPa11yResultProblems(pa11yResults || undefined)}
              />

              <TablerowLink
                href={"/axe"}
                name={"aXe"}
                status={axeStatus}
                problems={countAxeResultProblems(axeResults || undefined)}
              />

              <TablerowLink
                href={"/achecker"}
                name={"Achecker"}
                status={acheckerStatus}
                problems={countAccheckerResultProblems(
                  acheckerResults || undefined
                )}
              />
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
