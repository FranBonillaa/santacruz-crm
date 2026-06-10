import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const MODALITIES = ['Boda', 'Marca personal', 'Pareja', 'Bautizo', 'Comunión', 'Eventos', 'Discotecas y Ocio', 'Negocios y empresas', 'Otros'];
const STATUSES = ['Contactado', 'Interesado', 'Presupuesto enviado', 'En seguimiento', 'Cerrado', 'Perdido'];
const RESPONSIBLES = ['Alicia', 'Marta', 'Alejandro'];

function ClientForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        date: '', name: '', contact: '', modality: '', status: '', responsible: '', source: '', amount: ''
    });

    // Se ejecuta cada vez que se cambia algun campo del formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    //Se ejecuta al guardar
    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/clients', form);
        navigate('/clients');
    }

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-6">Nuevo cliente</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input name="date" type="date" onChange={handleChange} className="border rounded px-3 py-2 text-sm" required />
                <input name="name" placeholder="Nombre" onChange={handleChange} className="border rounded px-3 py-2 text-sm" required />
                <input name="contact" placeholder="Contacto" onChange={handleChange} className="border rounded px-3 py-2 text-sm" required />
                <select name="modality" onChange={handleChange} className="border rounded px-3 py-2 text-sm" required>
                    <option value="">Modalidad</option>
                    {MODALITIES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select name="status" onChange={handleChange} className="border rounded px-3 py-2 text-sm" required>
                    <option value="">Estado</option>
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select name="responsible" onChange={handleChange} className="border rounded px-3 py-2 text-sm" required>
                    <option value="">Responsable</option>
                    {RESPONSIBLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <input name="source" placeholder="Origen" onChange={handleChange} className="border rounded px-3 py-2 text-sm" />
                <input name="amount" type="number" placeholder="Importe" onChange={handleChange} className="border rounded px-3 py-2 text-sm" />
                <button type="submit" className="bg-black text-white py-2 rounded text-sm font-medium hover:bg-gray-800">
                    Guardar
                </button>
            </form>
        </div>
    )
}

export default ClientForm
