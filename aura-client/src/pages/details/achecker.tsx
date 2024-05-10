import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

import { AcheckerResultsType } from "@/lib/types";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Achecker() {
  const results = useSelector(
    (state: RootState) => state.acheckerSlice.results
  );

  const violations = results?.report.results.filter(
    item => item.level === "violation"
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Achecker Violation Details</h1>
      {violations && violations.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Violation</TableHead>
              <TableHead>Rule ID</TableHead>
              <TableHead>Reason ID</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {violations.map((item, index) => (
              <TableRow key={index}>
                <TableHead>{index + 1}</TableHead>
                <TableHead>{item.ruleId}</TableHead>
                <TableHead>{item.reasonId}</TableHead>
                <TableHead>{item.message}</TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-gray-500">No violations found.</p>
      )}
    </div>
  );
}
