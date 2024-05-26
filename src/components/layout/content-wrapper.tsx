import Sidebar from "./sidebar";

type ContentWrapperProps = {
  children: React.ReactNode;
};
const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <div className="flex items-start h-full gap-1 mt-10 container">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default ContentWrapper;
