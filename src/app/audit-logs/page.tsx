"use client"
import LoaderComponent from "@/components/LoaderComponent";
import Pagination from "@/components/Pagination";
import { IAxiosError } from "@/interface/IAxiosErrRes";
import { Messages } from "@/lib/messages";
import { notifyError } from "@/lib/utils";
import { makeRequest } from "@/middleware/axios-helper";
import { API_ENDPOINTS } from "@/services/hooks/apiEndPoints";
import { useEffect, useState } from "react";

interface AuditLog {
  id: string;
  userId: number;
  action: string;
  isMobile?: string;
  platform?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [selectedPage, setSelectPage] = useState<number>(1);


  useEffect(() => {
    const fetchLogs = async () => {
          const url = API_ENDPOINTS.logs.auditLogs;
          const config = {
            method: 'get',
            url: url,
            params: {
              pageNumber: selectedPage,
              pageSize: 20,
            },
          };
          try {
            setIsLoading(true);
            const responseData = await makeRequest(config);
            if (responseData) {
                setLogs(responseData.logs);
                setCount(responseData.totalRecords);
            }
          } catch (err) {
            const error = err as IAxiosError;
            notifyError(
              error.response?.data.exceptionMessage ?? Messages.somethingWentWrong
            );
          } finally {
            setIsLoading(false);
          }
    };

    fetchLogs();
  }, [selectedPage]);

    const selectPage = (pageNumber: number) => {
        setSelectPage(pageNumber);
    };

  return (
    <div className="container mx-auto p-2">
        {isLoading && <LoaderComponent />}
      <h2 className="text-xl font-bold mb-4">Audit Logs</h2>
      <table className="w-full border border-t border-b">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-2">User ID</th>
            <th className="border p-2">Action</th>
            <th className="border p-2">IsMobile</th>
            <th className="border p-2">Platform</th>
            <th className="border p-2">IP Address</th>
            <th className="border p-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b">
              <td className="border-none p-2">{log.userId}</td>
              <td className="border-none p-2">{log.action}</td>
              <td className="border-none p-2">{log.isMobile || "N/A"}</td>
              <td className="border-none p-2">{log.platform || "N/A"}</td>
              <td className="border-none p-2">{log.ipAddress || "N/A"}</td>
              <td className="border-none p-2">{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={Math.ceil(count / 20)} totalRecords={count} selectedPage={selectedPage} selectPage={selectPage}/>
    </div>
  );
}
