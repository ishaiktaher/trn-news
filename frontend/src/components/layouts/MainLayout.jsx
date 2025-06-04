import NavBar from "../NavBar";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
