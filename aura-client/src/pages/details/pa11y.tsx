// pages/details/pa11y.tsx

import { DetailHead } from "@/components/detail-head";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchPa11y } from "@/utils/api"; // Zorg ervoor dat je de fetchPa11y functie hebt geïmporteerd

export default function Pa11y() {
  const router = useRouter();
  const { data, status } = useQuery({
    queryKey: ["pa11y", router.query.url],
    queryFn: () => fetchPa11y(router.query.url as string),
    enabled: !!router.query.url,
  });

  const handleClick = (e: any) => {
    e.preventDefault();
    router.back();
  };
  console.log(router.query.url);
  console.log(router);

  console.log(data);

  return (
    <div className="mx-auto px-10 py-8">
      <DetailHead toolName="Pa11y" handleClick={handleClick} />
      {status === "pending" && <p>Loading...</p>}
      {status === "error" && <p>Error loading data.</p>}
      {data && data.issues.length > 0 ? (
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
            {data.issues.map((issue, index) => (
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
