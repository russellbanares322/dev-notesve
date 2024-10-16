import { SortDirectionValue } from "@/services/devnote/types";
import CategoryFilter from "./filterOptions/CategoryFilter";
import SortFilter from "./filterOptions/SortFilter";
import SearchFilter from "./filterOptions/SearchFilter";
import { Button } from "@/components";
import { ListFilter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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

  const alignedFilterComponents = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-10">
        {filterComponents.map((item) => item.element)}
      </div>
    );
  };

  return (
    <div>
      <div className="hidden lg:block">{alignedFilterComponents()}</div>
      <div className="block lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <ListFilter />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">{alignedFilterComponents()}</SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default DevNoteFilterOptions;
