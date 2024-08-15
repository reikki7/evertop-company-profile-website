import { Link, useNavigate } from "react-router-dom";
import logoAdmin from "../assets/logoAdmin.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login-admin");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-20 lg:hidden text-white bg-[#0d923a] p-2 rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 transition duration-200 ease-in-out lg:block z-10 w-64 bg-[#0d923a] text-white p-6 flex flex-col justify-between overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          <div>
            <div className="flex flex-col items-center">
              <Link to="/admin" className="flex flex-col items-center">
                <img src={logoAdmin} alt="Evertop Logo" className="w-28 mb-6" />
                <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
              </Link>
            </div>
            <nav>
              <ul className="space-y-2">
                <li className="bg-green-700 rounded">
                  <Link to="/admin" className="block py-2 px-4">
                    Produk
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex flex-col h-full justify-end">
            <div className="mt-auto">
              <button
                onClick={handleLogout}
                className="bg-red-500 duration-150 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-6"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
