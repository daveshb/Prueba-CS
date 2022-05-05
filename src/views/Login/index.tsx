//Los valores que deberá tener la propiedad “data-testid” en los elementos HTML son:

// h1 de título  data-testid="login__title"
// Input de email  data-testid=“login__email”
// Input de contraseña  data-testid=“login__password”
// Botón para ingresar data-testid=“login__btn-login”
// Span que alerta con notificaciones  data-testid==“alert__text”
import { useEffect, useState } from "react";
import { useReqres } from "../../network/hooks/useReqres";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { login, token } = useReqres();
  const navigate = useNavigate();

  const handleClick = (e: any) => {
    e.preventDefault();
    if (email === "") {
      setError("Email es requerido");
      return;
    } else if (password === "") {
      setError("Contraseña es requerida");
      return;
    }

    const data = { route: "login", data: { email, password } };
    setError("Datos inválidos");
    login(data);
  };

  useEffect(() => {
    if (token) {
      setError("");
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/usuarios");
    }
  }, [token]);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) navigate("/usuarios");
  }, []);

  return (
    <div className="login__container">
      <form className="loguin__form">
        <h1 className="login__title" data-testid="login__title">
          Ingreso
        </h1>
        <input
          type="email"
          className="login__email"
          data-testid="login__email"
          placeholder="Ingrese su email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login__password"
          data-testid="login__password"
          placeholder="Ingrese su contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="login__btn-login"
          data-testid="login__btn-login"
        >
          Ingresar
        </button>
        <span data-testid="alert__text" className={error && "login__alert"}>
          {error}
        </span>
      </form>
    </div>
  );
};

export default Login;
