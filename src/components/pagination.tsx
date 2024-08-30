import { Button } from "./ui/button";

const Pagination = () => {
  const customArray = new Array(5);

  return (
    <div className="flex items-center gap-1">
      {customArray.fill("").map((_, index) => (
        <Button key={index} className="mt-4" variant="outline">
          {index + 1}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
