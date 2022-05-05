//Los valores que deberá tener la propiedad “data-testid” en los elementos HTML son:

// elemento de redirección a ingreso data-testid="header__link-login"
// elemento de redirección a usuarios data-testid="header__link-users"
// elemento de redirección a Crear data-testid="header__link-create"
// elemento para cerrar sesión data-testid="header__link-signout"


import "./styles.scss";

import { Link } from "react-router-dom";
import { useReqres } from '../../network/hooks/useReqres';

const Header = () => {
    const { logout } = useReqres();
    const handleClick = () => {
        logout();
    }

    return(
        <header className="header__conatiner">
            <nav className='header__nav' >
                 <Link data-testid="header__link-login" className=" link" to="/ingreso">Ingreso</Link>
                 <Link data-testid="header__link-users" className=" link" to="/usuarios">Usuarios</Link>
                 <Link data-testid="header__link-create" className=" link" to="/crear">Crear</Link>
                 <a data-testid="header__link-signout" className=" link link__a" onClick={handleClick}>Cerrar sesión</a>
            </nav>
        </header>
    )
}

export default Header;