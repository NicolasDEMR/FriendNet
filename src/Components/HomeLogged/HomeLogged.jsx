import "./HomeLogged.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";
import Post from "../../Layouts/Post/Post";

function HomeLogged() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [inputComment, setInputComment] = useState("");
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

  // Récupération des valeurs des inputs
  const getTitle = (e) => {
    setTitle(e.target.value);
  };

  const getContent = (e) => {
    setContent(e.target.value);
  };

  const getComment = (e) => {
    setInputComment(e.target.value);
  };

  // Fonction qui gère les commentaires
  const updateComment = (key) => {
    sendCommentAPI(post[key]._id);
    // console.log("Array inputComment : ", inputComment);
  };

  // Fonction qui gère les likes
  const updateLike = (key) => {
    sendLikeAPI(post[key]._id);
  };

  // Envoi des données dans l'API avec une requête HTML POST
  const sendPostAPI = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/friend-net/post",
      options
    );
    const data = await response.json();
    console.log("sendPostAPI data : ", data);
    if (data.success == false) {
      alert(data.message);
    } else {
      // Si la requête est un succès, réactualise les posts
      getPosts();
    }
  };

  // Envoi des données dans l'API avec une requête HTML POST
  const sendLikeAPI = async (postID) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        postId: postID,
      }),
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/friend-net/post/like",
      options
    );
    const data = await response.json();
    console.log("data sendLikeAPI : ", data);
    if (data.success == false) {
      alert(data.message);
    } else {
      // Si la requête est un succès, réactualise les posts
      getPosts();
    }
  };

  // Envoi des données dans l'API avec une requête HTML POST
  const sendCommentAPI = async (postID) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        postId: postID,
        content: inputComment,
      }),
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/friend-net/post/comment",
      options
    );
    const data = await response.json();
    console.log("data sendCommentAPI : ", data);
    if (data.success == false) {
      alert(data.message);
    } else {
      // Si la requête est un succès, réactualise les posts
      getPosts();
    }
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
    // console.log("Array post : ", post);
  }, []);

  useEffect(() => {
    // console.log("Array post : ", post);
  }, [setPost]);

  return (
    <div>
      <div className="menuWrapper">
        <Menu />
      </div>
      <div className="p-3 mb-2 bg-dark text-white d-grid gap-2 col-6 mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-quote"
          viewBox="0 0 16 16"
        >
          <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
        </svg>
        <div className="input-group mb-3 d-flex gap-2">
          <input
            type="text"
            name="title"
            className="form-control rounded-pill"
            id="inputText01"
            placeholder="Title"
            onChange={getTitle}
          />
          <input
            type="text"
            name="content"
            className="form-control rounded-pill"
            id="inputText01"
            placeholder="Content"
            onChange={getContent}
          />
          <input
            type="submit"
            className="btn btn-light btn-outline-dark rounded-pill"
            onClick={sendPostAPI}
          />
        </div>
      </div>
      <div className="containerApp">{displayPost()}</div>
      <div className="footerWrapper">
        <Footer />
      </div>
    </div>
  );
}

export default HomeLogged;
