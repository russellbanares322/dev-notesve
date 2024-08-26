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
};
const CategoryFilter = ({ onSelectCategory }: CategoryFilterProps) => {
  const { data: categoriesData } = useGetDevNoteCategories();

  return (
    <div>
      <Label>Filter by category</Label>
      <Select onValueChange={onSelectCategory}>
        <SelectTrigger className="w-[180px]">
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
