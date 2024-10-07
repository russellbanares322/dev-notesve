import { SortDirectionValue } from "@/services/devnote/types";
import CategoryFilter from "./filterOptions/CategoryFilter";
import SortFilter from "./filterOptions/SortFilter";
import SearchFilter from "./filterOptions/SearchFilter";
import { Button } from "@/components";
import { ListFilter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DevNoteFilterOptionsProps = {
  onSelectSortDirection: (value: SortDirectionValue) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentSelectedSortDirection: SortDirectionValue;
  onSelectCategory: (value: string) => void;
  category: string;
  search: string;
};

const DevNoteFilterOptions = ({
  onSelectSortDirection,
  onSearchChange,
  currentSelectedSortDirection,
  onSelectCategory,
  category,
  search,
}: DevNoteFilterOptionsProps) => {
  const filterComponents = [
    {
      element: <SearchFilter onSearchChange={onSearchChange} search={search} />,
    },
    {
      element: (
        <CategoryFilter
          onSelectCategory={onSelectCategory}
          category={category}
        />
      ),
    },
    {
      element: (
        <SortFilter
          onSelectSortDirection={onSelectSortDirection}
          currentSelectedSortDirection={currentSelectedSortDirection}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="hidden md:grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-10">
        {filterComponents.map((item) => item.element)}
      </div>
      <div className="block md:hidden">
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" variant="outline">
              <ListFilter />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {filterComponents.map((item, index) => (
              <div key={index}>{item.element}</div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DevNoteFilterOptions;
