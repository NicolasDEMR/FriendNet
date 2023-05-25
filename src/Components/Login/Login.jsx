import "./Login.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({});

  const getData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setData(Object.fromEntries(formData));
  };

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
      redirectProfile();
      getToken(donnees.token);
    }
  };

  let navigate = useNavigate();
  const redirectProfile = () => {
    let path = "/user";
    navigate(path);
  };

  const getToken = (token) => {
    localStorage.setItem("token", token);
  };

  // useEffect(() => {
  //   console.log("data : ", data);
  // }, []);

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
