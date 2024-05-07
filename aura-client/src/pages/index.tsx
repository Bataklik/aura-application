import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { TablerowLink } from "../components/tablerow-link";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "../components/ui/table";
import { getAxeResults } from "../services/axeServices";

export default function Home() {
  const [results, setResults] = useState("Loading");
  const handleClick = () => {
    getAxeResults("https://www.hogent.be")
      .then(result => {
        console.log("Result:", result);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-2xl mx-auto">
        <p className="text-gray-600 mb-8">
          AURA is een tool die websites automatisch controleert op
          toegankelijkheid. Voer de URL van uw website in en klik op
          &apos;Controleer Toegankelijkheid&apos; om een gedetailleerd rapport
          te ontvangen. results: {results}
        </p>
        <div className="flex items-center mb-8">
          <Input
            className="flex-1 mr-4"
            placeholder="Voer de URL van uw website in"
            type="text"
          />
          <Button onClick={() => handleClick()}>
            Controleer Toegankelijkheid
          </Button>
        </div>
        <div
          className="border rounded-md p-6 bg-gray-100 dark:bg-gray-800"
          id="results"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool</TableHead>
                <TableHead>Resultaat</TableHead>
                <TableHead>Problemen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TablerowLink
                href={"/pa11y"}
                name={"PA11Y"}
                status={"Successful"}
                problems={0}
              />

              <TablerowLink
                href={"/axe"}
                name={"aXe"}
                status={"Warning"}
                problems={1}
              />
              <TablerowLink
                href={"/axe"}
                name={"aXe"}
                status={"Warning"}
                problems={1}
              />

              <TablerowLink
                href={"/Lighthouse"}
                name={"Lighthouse"}
                status={"Danger"}
                problems={3}
              />
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
}
