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
  AxeIncompeleteType,
  AxeResultsType,
  AxeViolationType,
  PA11YIssueType,
  Pa11yResultsType,
} from "@/lib/types";
import { useDispatch, useSelector } from "react-redux";
import { updateAcheckerResults } from "@/redux/slices/acheckerSlice";
import { updatePa11yResults } from "@/redux/slices/pa11ySlice";
import { setViolations, setIncomplete } from "@/redux/slices/axeSlice";
import { RootState } from "@/redux/store";

export default function Home() {
  const dispatch = useDispatch();
  const axeSelector = useSelector((state: RootState) => state.axeSlice);
  const pa11ySelector = useSelector((state: RootState) => state.pa11ySlice);
  const acheckerSelector = useSelector(
    (state: RootState) => state.acheckerSlice
  );
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  // const [axeResults, setAxeResults] = useState<AxeResultsType | null>(null);
  const [axeStatus, setAxeStatus] = useState<string>("Api Waiting");

  // const [pa11yResults, setPa11yResults] = useState<Pa11yResultsType | null>(
  //   null
  // );
  const [pa11yStatus, setPa11yStatus] = useState<string>("Api Waiting");

  // const [acheckerResults, setAcheckerResults] =
  //   useState<AcheckerResultsType | null>(null);
  const [acheckerStatus, setAcheckerStatus] = useState<string>("Api Waiting");

  const countAxeResultProblems = (
    violations: AxeViolationType | undefined,
    incomplete: AxeIncompeleteType | undefined
  ) => {
    if (violations === undefined) return undefined;
    if (incomplete === undefined) return undefined;
    let totalProblemsCount = 0;
    //? Violations value
    if (violations) {
      violations.forEach(violation => {
        totalProblemsCount += violation.nodes.length;
      });
    }
    //? Incompete value
    if (incomplete) {
      incomplete.forEach(incomplete => {
        totalProblemsCount += incomplete.nodes.length;
      });
    }

    return totalProblemsCount;
  };

  const countPa11yResultProblems = (results: PA11YIssueType[] | undefined) => {
    if (results === undefined) return undefined;
    let totalProblemsCount = 0;
    results.forEach(() => {
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
    return totalProblemsCount;
  };

  const handleClick = () => {
    setButtonDisabled(true);
    setAxeStatus("Api Loading...");
    setPa11yStatus("Api Loading...");
    setAcheckerStatus("Api Loading...");
    getAxeResults("https://www.hogent.be")
      .then((result: AxeResultsType) => {
        console.log("Result axe:", result);
        setAxeStatus("Api Success");
        //setAxeResults(result);
        dispatch(setViolations(result.violations));
        dispatch(setIncomplete(result.incomplete));
      })
      .catch(error => {
        setAxeStatus("Api Error");
        console.error("Error:", error);
      });

    getPA11YResults("https://www.hogent.be")
      .then((result: Pa11yResultsType) => {
        //console.log("Result pa11y:", result);
        setPa11yStatus("Api Success");
        //setPa11yResults(result);
        dispatch(updatePa11yResults(result.issues));
      })
      .catch(error => {
        setPa11yStatus("Api Error");
        console.error("Error:", error);
      });
    getAcheckerResults("https://www.hogent.be")
      .then(result => {
        // console.log("Result Achecker:", result);
        setAcheckerStatus("Api Success");
        //setAcheckerResults(result);
        dispatch(updateAcheckerResults(result));
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
                href={"details/pa11y"}
                name={"PA11Y"}
                status={pa11yStatus}
                problems={countPa11yResultProblems(
                  pa11ySelector.issues || undefined
                )}
              />

              <TablerowLink
                href={"details/axe"}
                name={"aXe"}
                status={axeStatus}
                problems={countAxeResultProblems(
                  axeSelector.violations || undefined,
                  axeSelector.incomplete || undefined
                )}
              />

              <TablerowLink
                href={"details/achecker"}
                name={"Achecker"}
                status={acheckerStatus}
                problems={countAccheckerResultProblems(
                  acheckerSelector.results || undefined
                )}
              />
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
