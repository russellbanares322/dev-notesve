import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortDirectionValue } from "@/services/devnote/types";

type SortFilterProps = {
  onSelectSortDirection: (value: SortDirectionValue) => void;
  currentSelectedSortDirection: SortDirectionValue;
};

const SortFilter = ({
  onSelectSortDirection,
  currentSelectedSortDirection,
}: SortFilterProps) => {
  return (
    <div>
      <Label>Sort Direction</Label>
      <Select
        value={currentSelectedSortDirection}
        onValueChange={(value) =>
          onSelectSortDirection(value as SortDirectionValue)
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="0">Oldest</SelectItem>
            <SelectItem value="1">Newest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortFilter;
