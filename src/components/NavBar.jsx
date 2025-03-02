import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto">
        <Link to="/" className="text-lg font-bold">
          User Management
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
