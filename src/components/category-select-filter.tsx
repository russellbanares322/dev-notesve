import { useMonaco } from "@monaco-editor/react";
import { SelectItem } from "./ui/select";

type CategorySelectFilterProps = {
  forFilter?: boolean;
};
type MonacoLanguagesOption = {
  label: string;
  value: string;
};

const CategorySelectFilter = ({
  forFilter = false,
}: CategorySelectFilterProps) => {
  const monacoEditorOptions = useMonaco();

  const formattedMonacoEditorLanguages = monacoEditorOptions?.languages
    ?.getLanguages()
    ?.map((item) => ({
      label: item?.id?.toUpperCase(),
      value: item?.id?.toUpperCase(),
    }))
    .filter((data) => !data.label.includes("FREEMARKER2"));

  const modifiedOption = forFilter
    ? [
        {
          label: "ALL",
          value: "ALL",
        },
        ...(formattedMonacoEditorLanguages as MonacoLanguagesOption[]),
      ]
    : formattedMonacoEditorLanguages;

  return modifiedOption?.map((item) => (
    <SelectItem key={item.value} value={item.value}>
      {item.label}
    </SelectItem>
  ));
};

export default CategorySelectFilter;
