import "./Home.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";
import Post from "../../Layouts/Post/Post";

function Home() {
  const [post, setPost] = useState([]);

  // Récupération des posts avec une requête HTML GET
  const getPosts = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/friend-net/posts?page=0&limit=20",
      options
    );
    const data = await response.json();
    // Sauvegarde dans le state post la réponse de l'API
    setPost(data.posts);
  };

  // Informe l'utilisateur qu'il doit se connecter pour commenter
  const updateComment = () => {
    alert("Please log in to comment");
  };

  // Informe l'utilisateur qu'il doit se connecter pour like
  const updateLike = () => {
    alert("Please log in to like a post");
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

  // Utilisation du hook useEffect pour rafraichir les posts
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <div className="menuWrapper">
        <Menu />
      </div>
      <div className="containerApp">{displayPost()}</div>
      <div className="footerWrapper">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
