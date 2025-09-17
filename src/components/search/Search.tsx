import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import SearchCard from "../SearchCard";
import { Checkbox } from "../ui/checkbox";
import GenericTable, { Column } from "../GenericTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogOverlay,
} from "@/components/ui/dialog";

interface Shareholder {
  id: number;
  nameamh: string;
  nameeng: string;
  shareholderid: string;
  phone: string;
  attendance: number;
  attendanceTime: string | null;
  votingsubscription: number;
  sharesubsription: number;
  paidcapital: number;
  totalcapital: number;
  devidend: number;
}

const Search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<Shareholder[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedShareholder, setSelectedShareholder] =
    useState<Shareholder | null>(null);
  const [isMarking, setIsMarking] = useState(true);

  const token = localStorage.getItem("token");
  const apiBase = import.meta.env.VITE_API_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (type: "name" | "phone" | "shareid") => {
    setResult([]);
    setError(null);
    setLoading(true);
    try {
      let response;
      if (type === "phone") {
        response = await axios.get(
          `${apiBase}admin/phone/${encodeURIComponent(search)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else if (type === "name") {
        response = await axios.get(
          `${apiBase}admin/name/${encodeURIComponent(search)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        response = await axios.get(
          `${apiBase}admin/shareid/${encodeURIComponent(search)}`,
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
      setCurrentPage(1);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Network error");
      toast({ title: "Error fetching data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) {
      toast({ title: "Please enter a search term", variant: "destructive" });
      return;
    }
    if (search.startsWith("9")) fetchData("phone");
    else if (isNaN(Number(search))) fetchData("name");
    else fetchData("shareid");
  };

  const handleRowClick = (person: Shareholder) => {
    if (person.votingsubscription > 0 && person.sharesubsription > 0) {
      navigate("/assemblynah/print", { state: { person } });
    }
  };

  const handleAttendanceClick = (shareholder: Shareholder) => {
    setSelectedShareholder(shareholder);
    setIsMarking(shareholder.attendance === 0);
    setModalOpen(true);
  };

  const handleConfirmAttendance = async () => {
    if (!selectedShareholder) return;
    const now = new Date().toLocaleString();
    try {
      await axios.post(
        `${apiBase}admin/attendance0/${selectedShareholder.id}`,
        { attendance: isMarking ? 1 : 0 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setResult((prev) =>
        prev.map((s) =>
          s.id === selectedShareholder.id
            ? {
                ...s,
                attendance: isMarking ? 1 : 0,
                attendanceTime: isMarking ? now : null,
              }
            : s
        )
      );

      setModalOpen(false);

      toast({
        title: `Attendance ${isMarking ? "marked" : "unmarked"} successfully!`,
        variant: "success",
      });

      if (isMarking) {
        navigate("/assemblynah/print", {
          state: {
            person: {
              ...selectedShareholder,
              attendance: 1,
              attendanceTime: now,
            },
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error updating attendance", variant: "destructive" });
    }
  };

  const columns: Column[] = [
    {
      header: "SR No.",
      accessor: "id",
      align: "center",
      width: "w-12",
      sortable: true,
    },
    {
      header: "Remark",
      accessor: "remark",
      align: "center",
      width: "w-32",
      renderCell: (value, row) =>
        row.votingsubscription === 0 && row.sharesubsription === 0
          ? "Only Dividend"
          : row.votingsubscription > 0 && row.sharesubsription > 0
          ? ""
          : "To Legal",
    },
    {
      header: "Name (Amh)",
      accessor: "nameamh",
      width: "w-48",
      sortable: true,
    },
    {
      header: "Name (Eng)",
      accessor: "nameeng",
      width: "w-48",
      sortable: true,
    },
    {
      header: "Shareholder ID",
      accessor: "shareholderid",
      align: "center",
      width: "w-32",
      sortable: true,
    },
    {
      header: "Phone",
      accessor: "phone",
      align: "center",
      width: "w-36",
      sortable: true,
    },
    {
      header: "Attendance",
      accessor: "attendance",
      align: "center",
      width: "w-24",
      renderCell: (value, row) => (
        <Checkbox
          checked={value === 1}
          onCheckedChange={() => handleAttendanceClick(row)}
        />
      ),
    },
    {
      header: "Attendance Time",
      accessor: "attendanceTime",
      align: "center",
      width: "w-48",
      renderCell: (value) => value || "-",
    },
  ];

  const rowClassName = (row: Shareholder) =>
    row.attendance === 1 ? "bg-green-50" : "";

  return (
    <div className="space-y-6 p-4">
      <SearchCard
        label="Search For Attendance"
        placeholder="Enter ID, Name, or Phone"
        onSearch={(query) => {
          setSearch(query);
          if (!query.trim()) {
            setError("Please enter a search term");
            return;
          }
          setError(null);
          if (query.startsWith("9")) fetchData("phone");
          else if (isNaN(Number(query))) fetchData("name");
          else fetchData("shareid");
        }}
        loading={loading}
        error={error}
      />

      {result.length > 0 && (
        <Card className="bg-white shadow-xl rounded-2xl max-w-7xl mx-auto overflow-x-auto">
          <GenericTable
            data={result}
            columns={columns}
            title="Search Results"
            defaultItemsPerPage={itemsPerPage}
            itemsPerPageOptions={[5, 10, 20]}
            rowClassName={rowClassName}
            emptyMessage="No data available"
            showPagination
            sortable
          />
        </Card>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogOverlay style={{ backgroundColor: "#F4AC15", opacity: 0.2 }} />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              {isMarking ? "Mark Attendance?" : "Unmark Attendance?"}
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-gray-700">
              Confirm attendance action for:
              <div className="mt-2 space-y-1">
                <p>
                  <strong>Name:</strong> {selectedShareholder?.nameeng}
                </p>
                <p>
                  <strong>Shareholder ID:</strong>{" "}
                  {selectedShareholder?.shareholderid}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedShareholder?.phone}
                </p>
                <p>
                  <strong>Current Attendance:</strong>{" "}
                  {selectedShareholder?.attendance === 1
                    ? "Marked"
                    : "Not marked"}
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-brand-yellow hover:bg-yellow-500 text-black"
              onClick={handleConfirmAttendance}
            >
              {isMarking ? "Mark & Print" : "Unmark"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Search;
