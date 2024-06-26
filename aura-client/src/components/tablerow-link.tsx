"use client";
import React from "react";
import { TableRow, TableCell } from "./ui/table";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";

type tablerowLinkProps = {
  href: string;
  name: string;
  status: string;
  problems: number | undefined;
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
        <Badge
          className="capitalize text-center"
          variant={
            status == "Api Error"
              ? "destructive"
              : status == "Api Waiting"
              ? "outline"
              : status == "Api Loading..."
              ? "secondary"
              : "default"
          }
        >
          {status}
        </Badge>
      </TableCell>
      <TableCell>
        {typeof problems !== "undefined"
          ? problems === 1
            ? "1 problem"
            : `${problems} problems`
          : "No problems found"}
      </TableCell>
    </TableRow>
  );
}
