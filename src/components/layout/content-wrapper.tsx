import Footer from "../footer";

type ContentWrapperProps = {
  children: React.ReactNode;
};

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <div className="flex flex-col min-h-screen h-full">
      {/* Content */}
      <div className="flex flex-col w-full">
        <div className="p-5">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default ContentWrapper;
