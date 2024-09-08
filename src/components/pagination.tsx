import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

type PaginationProps = {
  pageNumber: number;
  onPageNumberChange: (selectedPageNumber: number) => void;
};

const Pagination = ({
  pageNumber = 1,
  onPageNumberChange,
}: PaginationProps) => {
  const customArray = new Array(5);

  return (
    <div className="flex items-center gap-1 justify-center pt-10">
      <Button variant="outline">
        <ChevronLeft />
      </Button>
      {customArray.fill("").map((_, index) => {
        const buttonIndex = index + 1;
        return (
          <Button
            key={index}
            onClick={() => onPageNumberChange(buttonIndex)}
            variant={pageNumber === buttonIndex ? "default" : "outline"}
          >
            {buttonIndex}
          </Button>
        );
      })}
      <Button variant="outline">
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
