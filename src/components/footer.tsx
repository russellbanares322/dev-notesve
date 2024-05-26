const Footer = () => {
  const currentDate = new Date(Date.now()).getFullYear();
  return (
    <footer className="border-t py-2 flex items-center justify-center mt-10">
      <p>{`All Rights Reserved ${currentDate}`}</p>
    </footer>
  );
};

export default Footer;
