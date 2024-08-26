import { SortDirectionValue } from "@/services/devnote/types";
import CategoryFilter from "./filterOptions/CategoryFilter";
import SortFilter from "./filterOptions/SortFilter";

type DevNoteFilterOptionsProps = {
  onSelectSortDirection: (value: SortDirectionValue) => void;
  currentSelectedSortDirection: SortDirectionValue;
  onSelectCategory: (value: string) => void;
};

const DevNoteFilterOptions = ({
  onSelectSortDirection,
  currentSelectedSortDirection,
  onSelectCategory,
}: DevNoteFilterOptionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <CategoryFilter onSelectCategory={onSelectCategory} />
      <SortFilter
        onSelectSortDirection={onSelectSortDirection}
        currentSelectedSortDirection={currentSelectedSortDirection}
      />
    </div>
  );
};

export default DevNoteFilterOptions;
