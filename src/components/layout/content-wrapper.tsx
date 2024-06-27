import { useState } from "react";
import Navbar from "../navbar";
import Sidebar from "./sidebar";

type ContentWrapperProps = {
  children: React.ReactNode;
};

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };
  return (
    <div className="flex w-full min-h-screen h-full">
      {/* Sidebar */}
      <Sidebar isSidebarCollapsed={isSidebarCollapsed} />
      {/* Content */}
      <div className="flex flex-col w-full">
        <Navbar
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default ContentWrapper;
