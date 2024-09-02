import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

type PaginationProps = {
  pageNumber: number;
};

const Pagination = ({ pageNumber = 1 }: PaginationProps) => {
  const customArray = new Array(5);

  return (
    <div className="flex items-center gap-1 justify-center pt-10">
      <Button variant="outline">
        <ChevronLeft />
      </Button>
      {customArray.fill("").map((_, index) => (
        <Button
          key={index}
          variant={pageNumber === index + 1 ? "default" : "outline"}
        >
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
