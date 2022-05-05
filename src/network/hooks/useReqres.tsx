import { useState } from 'react';
import { useFetch } from 'use-http';
import { urlBase } from '../../config/constants';
import { ILoginRequest, ILoginResponse, ICreateUser } from './interface';
import { useNavigate } from 'react-router-dom';

export const useReqres = () => {    
    const { data, response, loading, 
        error, get, post, del } = useFetch(urlBase);
    const [token, setToken] = useState<ILoginResponse>();
    const [users, setUsers] = useState<any>();
    const [userCreated, setUserCreated] = useState<boolean>(false);
    const navigate = useNavigate();

    const login = async ({route, data: dataRequest}: ILoginRequest) => {  
        const result = await post(route, dataRequest);
        if(response.ok)setToken(result.token);
    }

    const getUsers = async (route: string) => {
        await get(route);
    }

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/ingreso');   
    }

    const deleteUser = async (route: string, nombre: string) => {
        const confirmation = confirm(`¿Está seguro que desea eliminar al usuario ${nombre}?`);
        if(confirmation)await del(route);
    }

    const createUser = async ({route, data}: ICreateUser) => {    
        await post(route, data);
        if(response.ok)setUserCreated(true);
    }

    return {
        login,
        loading,
        error,
        data,
        token,
        logout,
        getUsers,
        users,
        setUsers,
        deleteUser,
        createUser,
        userCreated
    }
}