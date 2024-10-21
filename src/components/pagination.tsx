import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

type PaginationProps = {
  pageNumber: number;
  onPageNumberChange: (selectedPageNumber: number) => void;
  pageSize: number;
  totalPages: number;
};

const Pagination = ({
  pageNumber = 1,
  onPageNumberChange,
  totalPages,
  pageSize,
}: PaginationProps) => {
  const paginationButtonNumberCount = new Array(
    Math?.ceil(totalPages / pageSize)
  )?.fill("");

  const handleChangePageNumber = (selectedPageNumber: number) => {
    window.scroll(0, 0);
    onPageNumberChange(selectedPageNumber);
  };

  return (
    <div className="flex items-center gap-1 justify-center pt-10">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleChangePageNumber(pageNumber - 1)}
        variant="outline"
      >
        <ChevronLeft />
      </Button>
      {paginationButtonNumberCount?.map((_, index) => {
        const buttonIndex = index + 1;
        return (
          <Button
            key={index}
            onClick={() => handleChangePageNumber(buttonIndex)}
            variant={pageNumber === buttonIndex ? "default" : "outline"}
          >
            {buttonIndex}
          </Button>
        );
      })}
      <Button
        onClick={() => handleChangePageNumber(pageNumber + 1)}
        variant="outline"
        disabled={paginationButtonNumberCount.length === pageNumber}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
