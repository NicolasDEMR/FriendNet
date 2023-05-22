import "./Register.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";

function Register() {
  const [data, setData] = useState();

  const getData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setData(formData);
  };

  useEffect(() => {
    console.log("data : ", data);
  }, [data]);

  return (
    <div>
      <div className="menuWrapper">
        <Menu />
      </div>
      <div className="d-flex justify-content-center mt-5">
        <form
          className="d-flex flex-column w-50 justify-content-center"
          onSubmit={getData}
        >
          <div className="mb-2 d-flex gap-1">
            <input
              type="text"
              name="firstname"
              className="form-control border border-dark"
              id="exampleInputName2"
              aria-describedby="First Name"
              placeholder="First Name"
            />
            <input
              type="text"
              name="name"
              className="form-control border border-dark"
              id="exampleInputName1"
              aria-describedby="Name"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control border border-dark"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-1 ">
            <input
              type="password"
              name="password"
              className="form-control border border-dark"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            <label htmlFor="exampleInputEmail1" className="form-label ">
              Birthday
            </label>
            <input
              type="date"
              name="birthday"
              className="form-control border border-dark"
              id="exampleInputDate"
              aria-describedby="dateHelp"
            />
            <p>Gender</p>
          </div>
          <div className=" mb-3 ">
            <div className="form-check form-check-inline mb-0 me-4">
              <input
                className="form-check-input border border-dark"
                type="radio"
                name="gender"
                id="femaleGender"
                value="option1"
              />
              <label className="form-check-label" htmlFor="femaleGender">
                Female
              </label>
            </div>

            <div className="form-check form-check-inline mb-0 me-4">
              <input
                className="form-check-input border border-dark"
                type="radio"
                name="gender"
                id="maleGender"
                value="option2"
              />
              <label className="form-check-label" htmlFor="maleGender">
                Male
              </label>
            </div>

            <div className="form-check form-check-inline mb-0">
              <input
                className="form-check-input border border-dark"
                type="radio"
                name="gender"
                id="otherGender"
                value="option3"
              />
              <label className="form-check-label" htmlFor="otherGender">
                Other
              </label>
            </div>
          </div>
          <div className="mb-3"></div>
          <button type="submit" className="btn btn-dark">
            Register
          </button>
        </form>
      </div>
      <div className="footerWrapper">
        <Footer />
      </div>
    </div>
  );
}

export default Register;
