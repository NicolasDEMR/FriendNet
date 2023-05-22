import "./Post.css";

function Post(props) {
  return (
    <div className="containerPost">
      <h3>{props.title}</h3>
      <p>{props.content}</p>
      <p>
        <i>{props.author}</i>
      </p>
      <button onClick={props.handleClick}>👍{props.like}</button>
    </div>
  );
}

export default Post;
