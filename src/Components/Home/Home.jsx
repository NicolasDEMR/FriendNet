import "./Home.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";
import Post from "../../Layouts/Post/Post";

function Home() {
  const [post, setPost] = useState([]);

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
          date={new Date().toDateString(e.date)}
          title={e.title}
          content={e.content}
          author={`${e.firstname} ${e.lastname}`}
          like={e.likes}
          comment={e.comments}
          handleClick={() => updateLike(key)}
          handleComment={() => updateComment(key)}
        />
      );
    });
  };

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
