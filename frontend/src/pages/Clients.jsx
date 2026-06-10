import { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function Clients() {
    const [clients, setClients] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/clients').then(({ data }) => setClients(data))
    }, [])

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold mb-6">Clientes</h1>
                <button onClick={() => navigate('/clients/new')} className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800">
                    + Nuevo Cliente
                </button>
            </div >
            <table className="w-full bg-white rounded-lg shadow text-sm">
                <thead className="bg-black text-white">
                    <tr>
                        <th className="px-4 py-3 text-left">Nombre</th>
                        <th className="px-4 py-3 text-left">Contacto</th>
                        <th className="px-4 py-3 text-left">Modalidad</th>
                        <th className="px-4 py-3 text-left">Estado</th>
                        <th className="px-4 py-3 text-left">Responsable</th>
                        <th className="px-4 py-3 text-left">Importe</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id} className="border-t">
                            <td className="px-4 py-3">{client.name}</td>
                            <td className="px-4 py-3">{client.contact}</td>
                            <td className="px-4 py-3">{client.modality}</td>
                            <td className="px-4 py-3">{client.status}</td>
                            <td className="px-4 py-3">{client.responsible}</td>
                            <td className="px-4 py-3">{client.amount ?? '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default Clients
