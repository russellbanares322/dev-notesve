const Footer = () => {
  const currentDate = new Date(Date.now()).getFullYear();
  return (
    <footer className="border-t py-2 flex items-center justify-center">
      <p>
        {`DevnoteSVE`} &copy; {currentDate}
      </p>
    </footer>
  );
};

export default Footer;
