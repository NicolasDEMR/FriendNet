import "./Register.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";

function Register() {
  const [data, setData] = useState({});
  const [arrayData, setArrayData] = useState([]);

  const getData = (e) => {
    e.preventDefault();
    setData(new FormData());
    setArrayData([...arrayData, data]);
  };

  useEffect(() => {
    console.log("Données du formulaire : ", data);
  }, [data]);
  useEffect(() => {
    console.log("Objets dans le tableau : ", arrayData);
  }, [arrayData]);

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
              className="form-control"
              id="exampleInputName2"
              aria-describedby="First Name"
              placeholder="First Name"
            />
            <input
              type="text"
              className="form-control"
              id="exampleInputName1"
              aria-describedby="Name"
              placeholder="Name"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-1">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            <label htmlFor="exampleInputEmail1" className="form-label">
              Birthday
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputDate"
              aria-describedby="dateHelp"
            />
            <p>Gender</p>
          </div>
          <div className=" mb-3">
            <div className="form-check form-check-inline mb-0 me-4">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="femaleGender"
                value="option1"
              />
              <label className="form-check-label" htmlFor="femaleGender">
                Female
              </label>
            </div>

            <div className="form-check form-check-inline mb-0 me-4">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="maleGender"
                value="option2"
              />
              <label className="form-check-label" htmlFor="maleGender">
                Male
              </label>
            </div>

            <div className="form-check form-check-inline mb-0">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
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
