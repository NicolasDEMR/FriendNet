import "./Settings.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useState, useEffect } from "react";

function Settings() {
  const [data, setData] = useState({});
  const [user, setUser] = useState({});

  const getData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setData(Object.fromEntries(formData));
    console.log("state data : ", data);
  };

  const editDataAPI = async () => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        firstname: data.firstname,
        lastname: data.name,
        email: data.email,
        age: data.age,
        occupation: data.occupation,
      }),
    };
    const response = await fetch(
      `https://social-network-api.osc-fr1.scalingo.io/friend-net/user`,
      options
    );
    const donnees = await response.json();
    console.log("API Response", donnees);
    if (donnees.success == false) {
      return null;
    } else {
      console.log("Changed profile successfuly");
    }
  };

  const getUser = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/friend-net/user",
      options
    );
    const data = await response.json();
    setUser(data);
    // console.log("data getUser", data);
  };

  useEffect(() => {
    getUser();
  }, [data]);

  useEffect(() => {
    editDataAPI();
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
              placeholder={user.firstname}
            />
            <input
              type="text"
              name="name"
              className="form-control border border-dark"
              id="exampleInputName1"
              aria-describedby="Name"
              placeholder={user.lastname}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control border border-dark"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder={user.email}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              name="age"
              className="form-control border border-dark"
              id="exampleInputAge1"
              aria-describedby="ageHelp"
              placeholder={user.age}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="occupation"
              className="form-control border border-dark"
              id="exampleInputOccupation1"
              aria-describedby="occupationHelp"
              placeholder={user.occupation}
            />
          </div>
          <div className="mb-3"></div>
          <button type="submit" className="btn btn-dark">
            Edit
          </button>
        </form>
      </div>
      <div className="footerWrapper">
        <Footer />
      </div>
    </div>
  );
}

export default Settings;
