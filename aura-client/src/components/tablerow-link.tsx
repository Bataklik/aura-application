"use client";
import React from "react";
import { TableRow, TableCell } from "./ui/table";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";

type tablerowLinkProps = {
  href: string;
  name: string;
  status: string;
  problems: number;
};

export function TablerowLink({
  name,
  href,
  problems,
  status,
}: tablerowLinkProps) {
  const router = useRouter();

  return (
    <TableRow
      onClick={() => {
        router.push(href);
      }}
      className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <TableCell>{name}</TableCell>
      <TableCell>
        <Badge>{status}</Badge>
      </TableCell>
      <TableCell>
        {problems == 1 ? "1 problem" : `${problems} problems`} gevonden
      </TableCell>
    </TableRow>
  );
}
