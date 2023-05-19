import "./Register.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { Link, Router } from "react-router-dom";

function Register() {
  return (
    <div>
      <div className="menuWrapper">
        <Menu />
      </div>
      <div className="register">
        <form>
          <h3>Sign Up</h3>
          <div className="Inscription">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="form-control"
            ></input>
          </div>
          <div className="Inscription">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="form-control"
            ></input>
          </div>
          <div className="Inscription">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
            ></input>
          </div>
          <div className="Inscription">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              placeholder="Enter Password"
              className="form-control"
            ></input>
          </div>
          <div className="Inscription">
            <input
              type="checkbox"
              className="custom control custom-checkbox"
              id="check"
            />
            <label htmlFor="check" className="custom-input-label ms2">
              Remember me
            </label>
          </div>
          <div className="d-grid">
            <button className="btn btn primary">Sign in</button>
          </div>
          <p className="text-end mt-2">
            <a href=""> Forgot Password?</a>
            <Link to="/signup" className="ms-2">
              Sign up
            </Link>
          </p>
        </form>
      </div>
      <div className="footerWrapper">
        <Footer />
      </div>
    </div>
  );
}

export default Register;
