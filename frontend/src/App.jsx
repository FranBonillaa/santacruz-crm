import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/Layout';
import Clients from './pages/Clients';
import Collaborations from './pages/Collaborations';
import ClientForm from './pages/ClientForm';
import CollaborationForm from './pages/CollaborationForm';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<Layout />}>
          <Route path='/' element={<div>Dashboard</div>} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/clients/new' element={<ClientForm />} />
          <Route path='/collaborations' element={<Collaborations />} />
          <Route path='/collaborations/new' element={<CollaborationForm />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App