import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SecurityHOC = ({ children }: any) => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token)navigate('/ingreso');
    }, [])

    return (
        <div>{children}</div>
    )
}

export default SecurityHOC;

