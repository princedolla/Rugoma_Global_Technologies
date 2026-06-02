import React, { useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PurchasedStock from "./pages/PurchasedStock";
import SoldStock from "./pages/SoldStock";
import Reports from "./pages/Reports";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="flex-1">
        <Navbar setOpen={setOpen} />
        <div className="p-6"> {children} </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/dashboard" element={ <ProtectedRoute><Layout> <Dashboard /> </Layout> </ProtectedRoute> }/>
        <Route path="/purchased" element={ <ProtectedRoute> <Layout><PurchasedStock /> </Layout> </ProtectedRoute>}/>
        <Route path="/sold" element={<ProtectedRoute> <Layout> <SoldStock /> </Layout> </ProtectedRoute> }/>
        <Route path="/reports" element={ <ProtectedRoute> <Layout> <Reports /> </Layout> </ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;