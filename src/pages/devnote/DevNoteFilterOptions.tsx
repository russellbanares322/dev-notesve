import { SortDirectionValue } from "@/services/devnote/types";
import CategoryFilter from "./filterOptions/CategoryFilter";
import SortFilter from "./filterOptions/SortFilter";
import SearchFilter from "./filterOptions/SearchFilter";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-10">
      <SearchFilter onSearchChange={onSearchChange} search={search} />
      <CategoryFilter onSelectCategory={onSelectCategory} category={category} />
      <SortFilter
        onSelectSortDirection={onSelectSortDirection}
        currentSelectedSortDirection={currentSelectedSortDirection}
      />
    </div>
  );
};

export default DevNoteFilterOptions;
