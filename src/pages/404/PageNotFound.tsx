import pageNotFound from "@/assets/page-not-found.svg";
import { Button } from "@/components";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen h-full flex items-center justify-center">
      <div className="flex flex-wrap items-center justify-center gap-7 md:gap-12">
        <img
          className=" max-h-60 md:max-h-96"
          src={pageNotFound}
          alt="Page not found"
        />
        <div className="flex flex-col items-center md:items-start gap-5 md:gap-3">
          <p className="text-4xl md:text-6xl font-semibold">Oops!</p>
          <p className="text-base md:text-lg font-medium text-gray-400 max-w-full tracking-tight md:max-w-64 md:tracking-wide">
            We couldn't find the page you're looking for
          </p>
          <Button className="w-fit" onClick={() => navigate("/")}>
            <MoveLeft className="mr-2" /> Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
