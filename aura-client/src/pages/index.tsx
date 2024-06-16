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

import { fetchAxe, fetchPa11y, fetchAchecker } from "../utils/api";
import {
  countAxeResultProblems,
  countPa11yResultProblems,
  countAccheckerResultProblems,
} from "../utils/helpers";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const [url, setUrl] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const {
    data: axeData,
    status: axeStatus,
    refetch: refetchAxe,
  } = useQuery({
    queryKey: ["axe", url],
    queryFn: () => fetchAxe(url),
    enabled: false,
  });

  const {
    data: pa11yData,
    status: pa11yStatus,
    refetch: refetchPa11y,
  } = useQuery({
    queryKey: ["pa11y", url],
    queryFn: () => fetchPa11y(url),
    enabled: false,
  });

  const {
    data: acheckerData,
    status: acheckerStatus,
    refetch: refetchAchecker,
  } = useQuery({
    queryKey: ["achecker", url],
    queryFn: () => fetchAchecker(url),
    enabled: false,
  });

  const handleClick = () => {
    setIsFetching(true);
    refetchAxe();
    refetchPa11y();
    refetchAchecker();
    setIsFetching(false);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "loading":
        return "Api Loading...";
      case "error":
        return "Api Error";
      case "success":
        return "Api Success";
      default:
        return "Api Waiting";
    }
  };

  return (
    <div className=" ">
      <div className="flex items-center mb-8">
        <Input
          className="flex-1 mr-4"
          placeholder="Voer de URL van uw website in"
          type="text"
          value={url}
          pattern="https://.*"
          onChange={e => setUrl(e.target.value)}
        />
        <Button disabled={!url} onClick={handleClick}>
          Controleer Toegankelijkheid
        </Button>
      </div>
      <div className="border rounded-md p-6 w-full bg-gray-200 dark:bg-gray-800 overflow-x-auto">
        <Table className="w-full">
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
              targetUrl={url}
              name={"PA11Y"}
              status={getStatusText(pa11yStatus)}
              problems={countPa11yResultProblems(pa11yData?.issues)}
            />
            <TablerowLink
              href={"details/axe"}
              targetUrl={url}
              name={"aXe"}
              status={getStatusText(axeStatus)}
              problems={countAxeResultProblems(
                axeData?.violations,
                axeData?.incomplete
              )}
            />
            <TablerowLink
              href={"details/achecker"}
              targetUrl={url}
              name={"Achecker"}
              status={getStatusText(acheckerStatus)}
              problems={countAccheckerResultProblems(acheckerData)}
            />
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
