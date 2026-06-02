import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Purchased Stock", path: "/purchased" },
    { name: "Sold Stock", path: "/sold" },
    { name: "Reports", path: "/reports" },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* Background overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden"  onClick={() => setOpen(false)}/>)}

      {/* Sidebar */}
      <div className={`fixed md:static top-0 left-0 z-50 h-screen w-64 bg-blue-900 text-white p-5 transition-transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`} >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Rugoma</h2>

          <button className="md:hidden text-2xl" onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* Menu */}
        <div className="space-y-3">
          {menu.map((item) => (
            <Link key={item.name} to={item.path} onClick={() => setOpen(false)}className={`block p-3 rounded-lg hover:bg-blue-700 ${  location.pathname === item.path ? "bg-blue-700" : "" }`} > {item.name}</Link> ))}
        </div>

        {/* Logout */}
        <button onClick={logout} className="bg-red-500 hover:bg-red-600 p-3 rounded-lg w-full mt-10"> Logout </button>
      </div>
    </>
  );
}

export default Sidebar;
