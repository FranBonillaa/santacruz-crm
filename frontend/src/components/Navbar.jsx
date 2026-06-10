import { NavLink, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav className="bg-black text-white px-6 py-4 flex items-center justify-between">
            <span className="font-bold text-lg tracking-widest">SANTACRUZ</span>
            <div className="flex gap-6 text-sm">
                <NavLink
                    to="/clients"
                    className={({ isActive }) => isActive ? 'underline' : 'hover:underline'}
                >
                    Clientes
                </NavLink>
                <NavLink
                    to="/collaborations"
                    className={({ isActive }) => isActive ? 'underline' : 'hover:underline'}
                >
                    Colaboraciones
                </NavLink>
            </div>
            <button onClick={handleLogout} className="text-sm hover:underline">
                Cerrar sesión
            </button>
        </nav>
    )
}

export default Navbar