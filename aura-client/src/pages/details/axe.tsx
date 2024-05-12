import React from "react";
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

export default function Axe() {
  const { violations, incomplete } = useSelector(
    (state: RootState) => state.axeSlice
  );
  const router = useRouter();

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.back();
  };

  return (
    <div className="mx-auto px-10 py-8">
      <DetailHead toolName="Axe" handleClick={handleClick} />
      {/* Violations Table */}
      <h2 className="text-xl font-bold my-4">Violations</h2>
      {violations ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Help</TableHead>
              <TableHead>Help URL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {violations.map((violation, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>{violation.id}</TableCell>
                  <TableCell>{violation.impact}</TableCell>
                  <TableCell>{violation.tags.join(", ")}</TableCell>
                  <TableCell>{violation.description}</TableCell>
                  <TableCell>{violation.help}</TableCell>
                  <TableCell>{violation.helpUrl}</TableCell>
                </TableRow>
                {/* Nodes for the violation */}
                {violation.nodes.map((node, nodeIndex) => (
                  <TableRow
                    key={`${index}-${nodeIndex}`}
                    className="bg-gray-100"
                  >
                    <TableCell colSpan={6}>
                      <p>HTML: {node.html}</p>
                      <p>Target: {node.target.join(", ")}</p>
                      <p>Failure Summary: {node.failureSummary}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-gray-500">No violations found.</p>
      )}

      {/* Incomplete Table */}
      <h2 className="text-xl font-bold my-4">Incomplete</h2>
      {incomplete ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Help</TableHead>
              <TableHead>Help URL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incomplete.map((incompleteItem, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell>{incompleteItem.id}</TableCell>
                  <TableCell>{incompleteItem.impact}</TableCell>
                  <TableCell>{incompleteItem.tags.join(", ")}</TableCell>
                  <TableCell>{incompleteItem.description}</TableCell>
                  <TableCell>{incompleteItem.help}</TableCell>
                  <TableCell>{incompleteItem.helpUrl}</TableCell>
                </TableRow>
                {/* Nodes for the incomplete item */}
                {incompleteItem.nodes.map((node, nodeIndex) => (
                  <TableRow
                    key={`${index}-${nodeIndex}`}
                    className="bg-gray-100"
                  >
                    <TableCell colSpan={6}>
                      <p>HTML: {node.html}</p>
                      <p>Target: {node.target.join(", ")}</p>
                      <p>Failure Summary: {node.failureSummary}</p>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-gray-500">No incomplete items found.</p>
      )}
    </div>
  );
}
