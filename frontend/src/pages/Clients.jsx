import { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function Clients() {
    const [clients, setClients] = useState([])
    const [filterStatus, setFilterStatus] = useState('');
    const [filterModality, setFilterModality] = useState('');
    const [filterResponsible, setFilterResponsible] = useState('');

    const STATUSES = ['Contactado', 'Interesado', 'Presupuesto enviado', 'En seguimiento', 'Cerrado', 'Perdido'];
    const MODALITIES = ['Boda', 'Marca personal', 'Pareja', 'Bautizo', 'Comunión', 'Eventos', 'Discotecas y Ocio', 'Negocios y empresas', 'Otros']
    const RESPONSIBLES = ['Alicia', 'Marta', 'Alejandro']

    const navigate = useNavigate();

    // Filtra por estado dependiendo si hay uno seleccionado, si no muestra todos
    const filtered = clients.filter(c => {
        if (filterStatus && c.status !== filterStatus) return false;
        if (filterModality && c.modality !== filterModality) return false;
        if (filterResponsible && c.responsible !== filterResponsible) return false;
        return true
    });

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
            <div className="flex gap-3 mb-4">
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border rounded px-3 py-2 text-sm"
                >
                    <option value="">Todos los estados</option>
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}

                </select>
                <select
                    value={filterModality}
                    onChange={(e) => setFilterModality(e.target.value)}
                    className="border rounded px-3 py-2 text-sm"
                >
                    <option value="">Todas las modalidades</option>
                    {MODALITIES.map(s => <option key={s} value={s}>{s}</option>)}

                </select>
                <select
                    value={filterResponsible}
                    onChange={(e) => setFilterResponsible(e.target.value)}
                    className="border rounded px-3 py-2 text-sm"
                >
                    <option value="">Todas las responsabilidades</option>
                    {RESPONSIBLES.map(s => <option key={s} value={s}>{s}</option>)}

                </select>
            </div>
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
                    {filtered.map((client) => (
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
