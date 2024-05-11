import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export default function Achecker() {
  const router = useRouter();

  const results = useSelector(
    (state: RootState) => state.acheckerSlice.results
  );

  const violations = results?.report.results.filter(
    item => item.level === "violation"
  );
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.back();
  };

  return (
    <div className="mx-auto px-10 py-8">
      <h1 className="text-3xl font-bold mb-4">Achecker Violation Details</h1>
      <Button
        onClick={handleClick}
        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
      >
        Back
      </Button>
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
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.ruleId}</TableCell>
                <TableCell>{item.reasonId}</TableCell>
                <TableCell>{item.message}</TableCell>
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
