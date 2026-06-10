import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar>
                <main className="p-6">
                    <Outlet />
                </main>
            </Navbar>
        </div>
    )
}

export default Layout