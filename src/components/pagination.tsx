import { Button } from "./ui/button";

const Pagination = () => {
  const customArray = new Array(5);

  return customArray.fill("").map((_, index) => <Button>{index + 1}</Button>);
};

export default Pagination;
