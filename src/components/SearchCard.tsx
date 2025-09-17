import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FiSearch } from "react-icons/fi";

interface SearchCardProps {
  label: string;
  placeholder?: string;
  onSearch: (query: string) => void;
  loading?: boolean; // new prop
  error?: string | null; // new prop
}

const SearchCard: React.FC<SearchCardProps> = ({
  label,
  placeholder = "Enter search term",
  onSearch,
  loading = false,
  error = null,
}) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    onSearch(search);
  };

  return (
    <Card className="bg-white rounded-2xl p-6 max-w-4xl mx-auto shadow-lg border-custom-yellow">
      <CardContent>
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-gray-800">
          {label}
        </h2>
        <form
          className="flex flex-col md:flex-row gap-4"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <Button
            className="w-full md:w-auto flex items-center justify-center gap-2"
            type="submit"
            disabled={loading} // disable while loading
          >
            {loading ? (
              "Searching..."
            ) : (
              <>
                <FiSearch /> Search
              </>
            )}
          </Button>
        </form>
        {error && (
          <p className="mt-2 text-red-600 text-sm font-medium text-center">
            {error}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchCard;
