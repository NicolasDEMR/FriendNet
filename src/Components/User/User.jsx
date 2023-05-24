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
      <div className="menuWrapper">
        <Menu />
      </div>
      <div>
        <p>{user.firstname}</p>
        <p>{user.lastname}</p>
        <p>{user.email}</p>
        <p>{user.age}</p>
        <p>{user.occupation}</p>
      </div>
      <div className="footerWrapper">
        <Footer />
      </div>
    </div>
  );
}

export default User;
