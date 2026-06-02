import React from "react";
import { Menu } from "lucide-react";

function Navbar({ setOpen }) {
  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between">
      <button className="md:hidden" onClick={() => setOpen(true)} > <Menu />
      </button>

      <h1 className="text-2xl font-bold text-blue-600">
        Rugoma Global Technologies Ltd
      </h1>
    </div>
  );
}

export default Navbar;