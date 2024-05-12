import { DetailHead } from "./../../components/detail-head";
import { useRouter } from "next/router";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

export default function Pa11y() {
  const router = useRouter();
  const results = useSelector((state: RootState) => state.pa11ySlice.issues);
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.back();
  };
  return (
    <div className="mx-auto px-10 py-8">
      <DetailHead toolName="Pa11y" handleClick={handleClick} />
      {results && results.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Selector</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((issue, index) => (
              <TableRow key={index}>
                <TableCell>{issue.code}</TableCell>
                <TableCell>{issue.type}</TableCell>
                <TableCell>{issue.message}</TableCell>
                <TableCell>{issue.selector}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-gray-500">No issues found.</p>
      )}
    </div>
  );
}
