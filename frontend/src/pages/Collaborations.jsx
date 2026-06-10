import { useEffect, useState } from 'react'
import api from '../services/api'

function Collaborations() {
    const [collaborations, setCollaborations] = useState([])

    useEffect(() => {
        api.get('/collaborations').then(({ data }) => setCollaborations(data))
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Colaboraciones</h1>
            <table className="w-full bg-white rounded-lg shadow text-sm">
                <thead className="bg-black text-white">
                    <tr>
                        <th className="px-4 py-3 text-left">Marca</th>
                        <th className="px-4 py-3 text-left">Categoria</th>
                        <th className="px-4 py-3 text-left">Contacto</th>
                        <th className="px-4 py-3 text-left">Estado</th>
                        <th className="px-4 py-3 text-left">Responsable</th>
                        <th className="px-4 py-3 text-left">Notas</th>
                    </tr>
                </thead>
                <tbody>
                    {collaborations.map((collaboration) => (
                        <tr key={collaboration.id} className="border-t">
                            <td className="px-4 py-3">{collaboration.brand_name}</td>
                            <td className="px-4 py-3">{collaboration.category}</td>
                            <td className="px-4 py-3">{collaboration.contact}</td>
                            <td className="px-4 py-3">{collaboration.status}</td>
                            <td className="px-4 py-3">{collaboration.responsible}</td>
                            <td className="px-4 py-3">{collaboration.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Collaborations
