import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDevNoteCategories } from "@/services/devnote/queries";

type CategoryFilterProps = {
  onSelectCategory: (value: string) => void;
  category: string;
};
const CategoryFilter = ({
  onSelectCategory,
  category,
}: CategoryFilterProps) => {
  const { data: categoriesData } = useGetDevNoteCategories(true);

  return (
    <div>
      <Label>Filter by category</Label>
      <Select onValueChange={onSelectCategory} value={category}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categoriesData?.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
