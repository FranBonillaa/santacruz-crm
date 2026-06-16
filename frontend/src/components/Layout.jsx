import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
    // Navbar no acepta children, main debe ir fuera como hermano
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout