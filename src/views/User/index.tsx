//Los valores que deberá tener la propiedad “data-testid” en los elementos HTML son:

// h1 de título  data-testid="users__title"
// table con el contenido de la lista de usuarios   data-testid="users__table"
// Etiquetas de imagen con el avatar de cada usuario  data-testid=“user__img-" concatenado con el id de cada usuario.
// botón que redirecciona a la vista de crear nuevo usuario  data-testid="users__btn-create"
// un botón por cada página con el número de la página como texto data-testid="users__btn-page-" concatenado con el número de la página
import { useReqres } from "../../network/hooks/useReqres";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const User = () => {
  const { getUsers, deleteUser, data } = useReqres();
  const [userList, setUserList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [isMounted, setIsMounted] = useState<boolean>(true);
  
  useEffect(() => {
    setIsMounted(true);
    getUsers(`/users?page=${page}`);
  }, [page]);

  const paginationButtons = (totalPage: any) => { 
    const buttons = [];
    for (let i = 1; i <= totalPage; i++) {
      buttons.push(
        <button
          key={i}
          className="btn__page btn__page--number"
          data-testid={`users__btn-page-${i}`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  }

  useEffect(() => {
    if (data && isMounted) {  
      const {data: users, total_pages} = data;
      setUserList(users);
      setTotalPage(total_pages);
    }
    return () => {
      setIsMounted(false);
    }
  }, [data]);

  return (
    <section>
      <h1 className="users__title" data-testid="users__title">Lista de usuarios</h1>
      <button className="users__btn-create" data-testid="users__btn-create" onClick={() => navigate('/crear')}> Crear </button>
      <div className="users__container">
      <table className="users__table" data-testid="users__table">
        <tr className="users__tr">
          <td className="table__title">Id</td>
          <td className="table__title">Nombre</td>
          <td className="table__title">Email</td>
          <td className="table__title">Avatar</td>
          <td className="table__title">Acción</td>
        </tr>
        {userList.map((user: any) => (
            <tr key={user.id}>
                <td className="table__text">{user.id}</td>
                <td className="table__text">{`${user.first_name} ${user.last_name} `}</td>
                <td className="table__text">{user.email}</td>
                <td><img className="table__img" data-testid={`user__img-${user.id}`} src={user.avatar} /></td>
                <td><button className="table__btn" onClick={() => deleteUser(`/users/${user.id}`, user.first_name)}> Eliminar </button></td>
            </tr>
        ))}
      </table>
      </div>
      <div className="btn__page--container">
      <button className="btn__page" onClick={() => setPage(page > 1 ? page - 1 : 1)}> Anterior </button>
      {userList && paginationButtons(totalPage)}
      <button className="btn__page" onClick={() => setPage(page < totalPage ? page + 1 : totalPage)}> Siguiente </button>
      </div>
    </section>
  );
};

export default User;
