import "./User.css";
import Menu from "../../Layouts/Menu/Menu";
import Footer from "../../Layouts/Footer/Footer";
import { useEffect, useState } from "react";
import Post from "../../Layouts/Post/Post";

function User() {
  const [user, setUser] = useState({});
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
    console.log("data getPost : ", data);
    setPost(data.posts);
  };

  const updateComment = () => {
    alert("You can only comment from home page");
  };

  const updateLike = () => {
    alert("You can only like from home page");
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
            comment={e.comments.map((e, key) => {
              return (
                <ul className="liste" key={key}>
                  <li>
                    {e.firstname} {e.lastname} : {e.content}
                  </li>
                </ul>
              );
            })}
            handleClick={() => updateLike(key)}
            getComment={(e) => getComment(e)}
            handleComment={() => updateComment(key)}
          />
        </div>
      );
    });
  };

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
        <p>firstname: {user.firstname}</p>
        <p>lastname: {user.lastname}</p>
        <p>email: {user.email}</p>
        <p>age: {user.age}</p>
        <p>occupation: {user.occupation}</p>
      </div>
      <div className="mt-5">{displayPost()}</div>
      <div className="footerWrapper">
        <Footer />
      </div>
    </div>
  );
}

export default User;
