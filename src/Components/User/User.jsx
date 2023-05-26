import "./User.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";
import Post from "../../Layouts/Post/Post";

function User() {
  const [user, setUser] = useState({});
  const [post, setPost] = useState([]);

  // Récupère les données dans l'API avec une requête HTML GET
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
    // Récupère les données dans le state user
    setUser(data);
  };

  // Récupération des posts avec une requête HTML GET
  const getPosts = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/friend-net/posts?page=0&limit=4",
      options
    );
    const data = await response.json();
    // Récupère les données dans le state post
    setPost(data.posts);
  };

  // Informe l'utilisateur qu'il doit être sur la page Home pour commenter
  const updateComment = () => {
    alert("You can only comment from home page");
  };

  // Informe l'utilisateur qu'il doit être sur la page Home pour like
  const updateLike = () => {
    alert("You can only like from home page");
  };

  // Affiche le tableau stocké dans le state post avec la méthode map
  const displayPost = () => {
    return post.map((e, key) => {
      return (
        <div key={key}>
          <Post
            date={new Date().toDateString(e.date)}
            title={e.title}
            content={e.content}
            author={`${e.firstname} ${e.lastname}`}
            like={e.likes.length}
            // Affiche le tableau comments stocké dans le tableau post avec la méthode map
            comment={e.comments.map((e, key) => {
              return (
                <ul className="liste" key={key}>
                  <li>
                    {e.firstname} {e.lastname} : {e.content}
                  </li>
                </ul>
              );
            })}
            // Appelle les fonctions qui se chargent de l'intéraction avec les boutons & inputs
            handleClick={() => updateLike(key)}
            getComment={(e) => getComment(e)}
            handleComment={() => updateComment(key)}
          />
        </div>
      );
    });
  };

  // Utilisation du hook useEffect pour rafraichir les posts et les données de l'utilisateur
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="menuWrapper ">
        <Menu />
      </div>
      <div className="border border-dark text-light bg-dark mt-5">
        <p>{user.firstname}</p>
        <p>{user.lastname}</p>
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-envelope"
            viewBox="0 0 16 16"
          >
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
          </svg>{" "}
          : {user.email}
        </p>
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-vcard"
            viewBox="0 0 16 16"
          >
            <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z" />
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z" />
          </svg>{" "}
          : {user.age}
        </p>
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-person-workspace"
            viewBox="0 0 16 16"
          >
            <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z" />
          </svg>{" "}
          : {user.occupation}
        </p>
      </div>
      <div className="mt-5">{displayPost()}</div>
      <div className="footerWrapper">
        <Footer />
      </div>
    </div>
  );
}

export default User;
