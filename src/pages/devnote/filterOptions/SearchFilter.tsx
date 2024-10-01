import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SearchFilter = () => {
  return (
    <div>
      <Label>Search</Label>
      <Input type="text" placeholder="Search here" />
    </div>
  );
};

export default SearchFilter;
