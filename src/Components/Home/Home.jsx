import "./Home.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";
import Post from "../../Layouts/Post/Post";
function Home() {
  const [post, setPost] = useState([
    {
      title: "My rocket",
      content: "Look, I built a new rocket",
      author: "Elon Musk",
      likes: 0,
    },
    {
      title: "My rocket",
      content: "Look, I built a new rocket",
      author: "Elon Musk",
      likes: 0,
    },
    {
      title: "My rocket",
      content: "Look, I built a new rocket",
      author: "Elon Musk",
      likes: 0,
    },
  ]);

  const updateLike = (key) => {
    setPost([...post], (post[key].likes += 1));
  };

  const displayPost = () => {
    return post.map((e, key) => {
      return (
        <Post
          key={key}
          title={e.title}
          content={e.content}
          author={e.author}
          like={e.likes}
          handleClick={() => updateLike(key)}
        />
      );
    });
  };

  return (
    <div>
      <div className="menuWrapper">
        <Menu />
      </div>
      <div className="containerApp">{displayPost()}</div>;
      <div className="footerWrapper">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
