import "./User.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";

function User() {
  const [user, setUser] = useState({});

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
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div className="menuWrapper ">
        <Menu />
      </div>
      <div className="border border-dark text-light bg-dark mt-5">
        <p className="">firstname: {user.firstname}</p>
        <p>lastname: {user.lastname}</p>
        <p>email: {user.email}</p>
        <p>age: {user.age}</p>
        <p>occupation: {user.occupation}</p>
      </div>
      <div>les post les plus recents</div>
      <div className="footerWrapper">
        <Footer />
      </div>
    </div>
  );
}

export default User;
