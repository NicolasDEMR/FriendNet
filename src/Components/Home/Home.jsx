import "./Home.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";
import Post from "../../Layouts/Post/Post";
function Home() {
  const [comment, setComment] = useState("");
  const [post, setPost] = useState([
    {
      content: "https://storage.googleapis.com/pod_public/1300/150288.jpg",
      author: "Elon Musk",
      likes: 0,
      comment: 0,
    },
    {
      content:
        "https://i.pinimg.com/736x/91/f1/52/91f152382ff471e36bbe95625d682801.jpg",
      author: "Elon Musk",
      likes: 0,
      comment: 0,
    },
    {
      content:
        "https://image.winudf.com/v2/image1/Y29tLkFlc3RoZXRpYy5HaXJseS53YWxscGFwZXJfc2NyZWVuXzFfMTYyNTk1MzAzMF8wMTY/screen-1.webp?fakeurl=1&type=.webp",
      author: "",
      likes: 0,
      comment: 0,
    },
  ]);

  const updateComment = (key) => {
    setComment([...comment], (comment[key].comment += ""));
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
