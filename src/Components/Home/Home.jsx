import "./Home.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";
import Post from "../../Layouts/Post/Post";
import { Link } from "react-router-dom";
function Home() {
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
      displayPost();
    }
  };

  const updateComment = () => {
    alert("Please log in to comment");
  };

  const updateLike = () => {
    alert("Please log in to like a post");
  };

  const displayPost = () => {
    return post.map((e, key) => {
      if (key == 0) {
        return null;
      }
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

  return (
    <div>
      <div className="menuWrapper">
        <Menu />
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

export default Home;
