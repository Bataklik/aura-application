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
import { DetailHead } from "@/components/detail-head";

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
      <DetailHead toolName="Achecker" handleClick={handleClick} />
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
