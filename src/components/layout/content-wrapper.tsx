import Footer from "../footer";
import Navbar from "../navbar";
import Sidebar from "./sidebar";

type ContentWrapperProps = {
  children: React.ReactNode;
};

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <div className="flex flex-col min-h-screen h-full">
      <div className="flex w-full">
        {/* Sidebar */}
        <Sidebar />
        {/* Content */}
        <div className="flex flex-col w-full">
          <Navbar />
          <div className="p-5">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContentWrapper;
