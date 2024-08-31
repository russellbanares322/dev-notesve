import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const Pagination = () => {
  const customArray = new Array(5);

  return (
    <div className="flex items-center gap-1 justify-center mt-4">
      <Button variant="outline">
        <ChevronLeft />
      </Button>
      {customArray.fill("").map((_, index) => (
        <Button key={index} variant="outline">
          {index + 1}
        </Button>
      ))}
      <Button variant="outline">
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
