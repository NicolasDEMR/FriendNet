import "./Login.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({});

  // Récupération des données saisies dans les inputs
  const getData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setData(Object.fromEntries(formData));
  };

  // Envoi des données dans l'API avec une requête HTML POST
  const sendDataAPI = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    };
    const response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/friend-net/login`,
      options
    );
    const donnees = await response.json();
    console.log("API Response", donnees);

    if (donnees.success == false) {
      return null;
    } else {
      // Si la requête est un succès, connecte l'utilisateur et le redirige vers la page de profil, puis récupère le token
      redirectProfile();
      getToken(donnees.token);
    }
  };

  // Fonction utilisé pour rediriger l'utilisateur vers sa page de profil
  let navigate = useNavigate();
  const redirectProfile = () => {
    let path = "/user";
    navigate(path);
  };

  // Récupère le token et le stocke dans le localStorage
  const getToken = (token) => {
    localStorage.setItem("token", token);
  };

  return (
    <div>
      <div className="menuWrapper">
        <Menu />
      </div>
      <div className="d-flex justify-content-center mt-5">
        <form
          className="d-flex flex-column w-50 justify-content-center"
          onSubmit={getData}
          {...sendDataAPI()}
        >
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control border border-dark"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
            />
            <div id="emailHelp" className="form-text ">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control border border-dark"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Log In
          </button>
        </form>
      </div>
      <div className="footerWrapper">
        <Footer />
      </div>
    </div>
  );
}

export default Login;
