import { Routes, Route } from 'react-router-dom';
import Header from './componentes/header';
import Login from './views/Login';
import User from './views/User';
import CreateUser from './views/CreateUser';
import NotFound from './views/NotFound';

function App() {
	return (
	  <>
      <Header />
      <Routes>
        <Route path="/ingreso" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/usuarios" element={<User />} />
        <Route path="/crear" element={<CreateUser />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
	);
}

export default App;
