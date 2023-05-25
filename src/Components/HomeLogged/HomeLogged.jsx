import "./HomeLogged.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";
import Post from "../../Layouts/Post/Post";
function HomeLogged() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [user, setUser] = useState({});
  const [inputComment, setInputComment] = useState("");
  const [post, setPost] = useState([]);

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

  const getTitle = (e) => {
    setTitle(e.target.value);
  };

  const getContent = (e) => {
    setContent(e.target.value);
  };

  const getComment = (e) => {
    setInputComment(e.target.value);
  };

  const updateComment = (key) => {
    sendCommentAPI(post[key]._id);
    console.log("Array inputComment : ", inputComment);
  };

  const updateLike = (key) => {
    sendLikeAPI(post[key]._id);
  };

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
    getUser();
    getPosts();
  };

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
      return null;
    }
  };

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
      return null;
    }
  };

  const getPosts = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/friend-net/posts?page=0&limit=40",
      options
    );
    const data = await response.json();
    setPost(data.posts);
  };

  const displayPost = () => {
    return post.map((e, key) => {
      if (key == 0) {
        return null;
      }
      return (
        <div key={key}>
          <Post
            date={new Date().toDateString(e.date)}
            title={e.title}
            content={e.content}
            author={`${e.firstname} ${e.lastname}`}
            like={e.likes.length}
            comment={e.comments[key]}
            handleClick={() => updateLike(key)}
            getComment={() => getComment(e)}
            handleComment={() => updateComment(key)}
          />
        </div>
      );
    });
  };

  useEffect(() => {
    sendPostAPI;
    // console.log("Array post : ", post);
  }, []);
  useEffect(() => {
    getPosts();
  }, []);
  useEffect(() => {
    displayPost();
  }, []);
  useEffect(() => {
    getUser();
  }, [user]);

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
