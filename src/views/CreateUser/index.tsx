//Los valores que deberá tener la propiedad “data-testid” en los elementos HTML son:
//h1 de título="create__title"
// Input de nombre=“create__name”
// Input de trabajo=“create__job”
// Span que alerta con notificaciones=“alert__text”
// Botón para crear= “create__btn”
import { useEffect, useState } from "react";
import { useReqres } from "../../network/hooks/useReqres";
import './styles.scss';

const CreateUser = () => {
  const [alert, setAlert] = useState("");
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const { error, createUser, userCreated } = useReqres();

  const handleClick = (e: any) => {
    e.preventDefault();
    setAlert("");
    if (name === "") {
      setAlert("Nombre requerido");
      return;
    } else if (job === "") {
      setAlert("Trabajo requerido");
      return;
    }

    const data = { route: "users", data: { name, job } };
    createUser(data);
  };

  useEffect(() => {
    if (userCreated) setAlert("Se creó el usuario correctamente");
  }, [userCreated]);

  useEffect(() => {
    if (error) setAlert("Ocurrió un error");
  }, [error]);

  return (
    <section>
      <div className="create__container">
        <form className="create__form">
          <h1 className="create__title" data-testid="create__title">Crear usuario</h1>
          <input
            data-testid="create__name"
            className="create__input"
            type="text"
            placeholder="Nombre"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            data-testid="create__job"
            className="create__input"
            type="text"
            placeholder="Trabajo"
            onChange={(e) => setJob(e.target.value)}
          />
          <button className="create__btn" onClick={handleClick} data-testid="create__btn">
            Crear
          </button>
          <span data-testid="alert__text">{alert}</span>
        </form>
      </div>
    </section>
  );
};

export default CreateUser;
