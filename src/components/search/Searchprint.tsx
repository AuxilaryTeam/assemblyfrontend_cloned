import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchCard from "../SearchCard";
import { Card } from "@/components/ui/card";
import GenericTable, { Column } from "../GenericTable";
import { toast } from "@/hooks/use-toast";

interface Shareholder {
  id: number;
  nameamh: string;
  nameeng: string;
  shareholderid: string;
  phone: string;
  attendance: number;
  votingsubscription: number;
  totalcapital: number;
  devidend: number;
}

const SearchPrint = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<Shareholder[]>([]);
  const [loading, setLoading] = useState(false); // new
  const [error, setError] = useState<string | null>(null); // new

  const token = localStorage.getItem("token");
  const apiBase = import.meta.env.VITE_API_BASE_URL;

  const handleSearch = async (query: string) => {
    setSearch(query);
    setError(null);
    if (!query.trim()) {
      setResult([]);
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    try {
      let response;
      if (query.startsWith("9")) {
        response = await axios.get(
          `${apiBase}admin/phone/${encodeURIComponent(query)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else if (isNaN(Number(query))) {
        response = await axios.get(
          `${apiBase}admin/name/${encodeURIComponent(query)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        response = await axios.get(
          `${apiBase}admin/shareid/${encodeURIComponent(query)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      const data: Shareholder[] = Array.isArray(response.data)
        ? response.data
        : [response.data];

      if (data.length === 0) {
        setError("No results found");
        toast({ title: "No results found", variant: "destructive" });
      } else {
        toast({ title: `Found ${data.length} result(s)`, variant: "success" });
      }

      setResult(data);
    } catch (err: any) {
      console.error("Error fetching shareholders:", err);
      setError(err.message || "Network error");
      setResult([]);
      toast({ title: "Error fetching data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (s: Shareholder) => {
    navigate("/assemblynah/print", { state: { person: s } });
  };

  const columns: Column[] = [
    { header: "SR No.", accessor: "id", width: "w-12", align: "center" },
    {
      header: "Remark",
      accessor: "remark",
      renderCell: (_, row) =>
        row.votingsubscription === 0 && row.totalcapital === 0
          ? "Only print"
          : row.votingsubscription > 0 && row.totalcapital > 0
          ? ""
          : "To Legal",
    },
    { header: "Name (Amh)", accessor: "nameamh", width: "w-48" },
    { header: "Name (Eng)", accessor: "nameeng", width: "w-48" },
    { header: "Shareholder ID", accessor: "shareholderid", align: "center" },
    { header: "Phone", accessor: "phone", align: "center" },
    {
      header: "Attendance",
      accessor: "attendance",
      align: "center",
      renderCell: (val) => (val === 1 ? "Checked In" : ""),
    },
  ];

  return (
    <div className="space-y-6 p-4">
      <SearchCard
        label="Search For Printing"
        placeholder="Enter ID, Name, or Phone"
        onSearch={handleSearch}
        loading={loading}
        error={error}
      />

      {result.length > 0 && (
        <Card className="bg-white shadow-xl rounded-2xl max-w-7xl mx-auto overflow-x-auto">
          <GenericTable
            data={result}
            columns={columns}
            title="Search Results"
            onRowClick={handleRowClick}
            rowClassName={(row) => (row.attendance === 1 ? "bg-green-50" : "")}
            defaultItemsPerPage={5}
            itemsPerPageOptions={[5, 10, 20]}
            showPagination
          />
        </Card>
      )}
    </div>
  );
};

export default SearchPrint;
