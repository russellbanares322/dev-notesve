import Footer from "../footer";
import Navbar from "../navbar";

type ContentWrapperProps = {
  children: React.ReactNode;
};

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  return (
    <div className="flex flex-col min-h-screen h-full md:max-w-[1600px] mx-auto py-5 px-3 md:px-10 mt-2">
      <Navbar />
      {/* Content */}
      <div className="flex flex-col w-full">
        <div className="p-5">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default ContentWrapper;
