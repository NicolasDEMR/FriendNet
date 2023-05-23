import "./HomeLogged.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";
import Post from "../../Layouts/Post/Post";
function HomeLogged() {
  const [content, setContent] = useState("");
  const [post, setPost] = useState([{}]);

  const getPosts = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/friend-net/posts?page=0&limit=10",
      options
    );
    const data = await response.json();
    if (data.success == false) {
      alert(data.message);
    } else {
      console.log("data getPost : ", data);
    }
  };

  const updateComment = (key) => {
    setPost([...post], (post[key].comment += key.target.value));
  };

  const updateLike = (key) => {
    setPost([...post], (post[key].likes += 1));
  };

  const displayPost = () => {
    return post.map((e, key) => {
      return (
        <Post
          key={key}
          content={e.content}
          author={e.author}
          like={e.likes}
          comment={e.comment}
          handleClick={() => updateLike(key)}
          handleComment={() => updateComment(key)}
        />
      );
    });
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
    if (data.success == false) {
      alert(data.message);
    } else {
      console.log("data getUser : ", data);
      addPost(data);
    }
  };

  const getContent = (e) => {
    setContent(e.target.value);
  };

  const addPost = (dataUser) => {
    setPost([
      ...post,
      {
        title: "",
        content: content,
        author: `${dataUser.firstname} ${dataUser.lastname}`,
        likes: 0,
        comment: "",
      },
    ]);
    sendInAPI();
  };

  const sendInAPI = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        title: post.title,
        content: post.content,
      }),
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/friend-net/post",
      options
    );
    const data = await response.json();
    if (data.success == false) {
      alert(data.message);
    } else {
      console.log("data sendInAPI : ", data);
    }
  };

  useEffect(() => {
    console.log("tableau post : ", post);
  }, [post]);

  return (
    <div>
      <div className="menuWrapper">
        <Menu />
      </div>
      <div className="p-3 mb-2 bg-dark text-white d-grid gap-2 col-6 mx-auto">
        Post
        <div className="input-group mb-3 d-flex gap-2">
          <input
            type="text"
            name="content"
            className="form-control rounded-pill"
            id="inputText01"
            onChange={getContent}
          />
          <input
            type="submit"
            className="btn btn-light btn-outline-dark rounded-pill"
            onClick={getUser}
          />
        </div>
      </div>
      <div className="containerApp">
        {getPosts}
        {displayPost()}
      </div>
      <div className="footerWrapper">
        <Footer />
      </div>
    </div>
  );
}

export default HomeLogged;
