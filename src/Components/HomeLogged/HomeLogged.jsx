import "./HomeLogged.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";
import Post from "../../Layouts/Post/Post";
function HomeLogged() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [user, setUser] = useState({});
  const [post, setPost] = useState([]);
  const [like, setLike] = useState([{}]);

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
    setComment(e.target.value);
  };

  const updateComment = (key) => {
    sendCommentAPI(user);
    setPost([...post], (post[key].comment += comment));
  };

  const updateLike = (key) => {
    console.log("key du post : ", post[key]._id);
    sendLikeAPI(post[key]._id);
    // setPost([...post[key].likes], post[key].like);
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
        content: comment,
      }),
    };
    const response = await fetch(
      "https://social-network-api.osc-fr1.scalingo.io/friend-net/post/comment",
      options
    );
    const data = await response.json();
    console.log("data sendCommentAPI : ", data);
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

  const displayLike = () => {
    return like.map((e, key) => {
      return (
        <div key={key}>
          <p>
            👍 {e.firstname} {e.lastname}
          </p>
        </div>
      );
    });
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
            like={() => displayLike(key)}
            comment={e.comments}
            handleClick={() => updateLike(key)}
            getComment={() => getComment(e.value)}
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
