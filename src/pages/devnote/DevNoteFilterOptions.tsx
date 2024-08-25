import CategoryFilter from "./filterOptions/CategoryFilter";
import SortFilter from "./filterOptions/SortFilter";

const DevNoteFilterOptions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <CategoryFilter />
      <SortFilter />
    </div>
  );
};

export default DevNoteFilterOptions;
