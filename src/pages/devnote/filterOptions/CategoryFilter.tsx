import { DropdownSearchInput } from "@/components";
import { Label } from "@/components/ui/label";
import { useGetDevNoteCategories } from "@/services/devnote/queries";
import { DataSource } from "@/types/types";

type CategoryFilterProps = {
  onSelectCategory: (value: string) => void;
  category: string;
};
const CategoryFilter = ({
  onSelectCategory,
  category,
}: CategoryFilterProps) => {
  const { data: categoriesData } = useGetDevNoteCategories(true);

  const categoriesDataSource = categoriesData?.map((category) => ({
    label: category,
    value: category as string,
  })) as DataSource[];

  return (
    <div className="flex flex-col gap-2">
      <Label>Filter by category</Label>
      <DropdownSearchInput
        dataSource={categoriesDataSource}
        onSelectValue={(value) => onSelectCategory(value as string)}
        selectedValue={category}
        placeholder="Select or search category"
      />
    </div>
  );
};

export default CategoryFilter;
