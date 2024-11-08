import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SearchFilterProps = {
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
};

const SearchFilter = ({ onSearchChange, search }: SearchFilterProps) => {
  return (
    <div>
      <Label>Search</Label>
      <Input
        onChange={onSearchChange}
        value={search}
        type="text"
        placeholder="Search here..."
      />
    </div>
  );
};

export default SearchFilter;
