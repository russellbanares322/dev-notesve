const Navbar = () => {
  return (
    <nav>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <div>
          <h1>Logo</h1>
        </div>
        {/* Nav Items */}
        <ul className="flex items-center gap-3">
          <li>Home</li>
          <li>About</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
