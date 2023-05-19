import "./User.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";

function User() {
  return (
    <div>
      <div className="menuWrapper">
        <Menu />
      </div>
      <div className="footerWrapper">
        <Footer />
      </div>
    </div>
  );
}

export default User;
