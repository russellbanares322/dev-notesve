import Navbar from "../navbar";
import Sidebar from "./sidebar";

type ContentWrapperProps = {
  children: React.ReactNode;
};

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <div className="flex w-full min-h-screen h-full">
      {/* Sidebar */}
      <Sidebar />
      {/* Content */}
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default ContentWrapper;
