import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useCommentContexts } from "../contexts/CommentsContext";

const Details = ({ item }) => {
  const { isAdmin, user } = useAuthContext();
  const { deleteProduct } = useProductContext();
  const { comments, getComments, addComment } = useCommentContexts();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [commentVal, setCommentVal] = useState("");
  const [userka, setUserka] = useState(false);

  useEffect(() => {
    if (user) {
      if (typeof user === "boolean") {
        console.log("huinia");
        setUserka(false);
      } else {
        console.log("works");
        setUserka(user.email);
        setUserInfo(user);
      }
    }
  }, [user]);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    getComments();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!commentVal.trim()) {
      return;
    }
    const newComment = {
      productId: id,
      comment: commentVal,
      userEmail: userInfo.email,
      userPhoto: userInfo.photo,
    };
    addComment(newComment);
    console.log(newComment);
    setCommentVal("");
  }
  function handleChange(e) {
    setCommentVal(e.target.value);
  }

  const dollars = item.price * 89;
  return (
    <div className="details" style={{ backgroundColor: "#D8D9DA" }}>
      <div className="first_block">
        <div className="first_block_item_first">
          <img src={item.photo} alt="" />
        </div>
        <div className="first_block_item_second">
          <div
            style={{ color: "#61677A" }}
            className="first_block_item_second_div"
          >
            <p>{dollars} kgs </p>
            <p>{item.price} $ </p>
          </div>

          <div>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>{item.user}</p>
            </div>
          </div>
          {userka ? (
            item.user === userka || isAdmin() ? (
              <div className="buttonsholder">
                <button
                  className="DeleteDetails"
                  onClick={() => {
                    const a = window.confirm("Are you sure?");
                    if (a) {
                      deleteProduct(item.id);
                      navigate(-1);
                    }
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/edit/${item.id}`)}
                  className="EditDetails"
                >
                  Edit
                </button>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="second_block" style={{ padding: "20px" }}>
        <Typography sx={{ color: "white" }} variant="h4">
          {item.title}
        </Typography>
        <Typography variant="h6" sx={{ color: "white" }}>
          {item.description}
        </Typography>
        <Typography variant="h5" sx={{ color: "white" }}>
          Category: {item.category}
        </Typography>
      </div>
      {userka && (
        <div className="app-container">
          <form className="message_form" onSubmit={handleSubmit}>
            <textarea
              className="message_input"
              value={commentVal}
              onChange={handleChange}
              placeholder="Type your Comment"
              required
            />
            <button type="submit" className="send_button">
              Отправить
            </button>
          </form>

          {comments
            .filter((commentItem) => id === commentItem.productId)
            .map((commentItem, index) => (
              <div
                key={index}
                className="user_info"
                style={{
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTop: "2px solid white",
                }}
              >
                <img
                  src={commentItem.userPhoto} // Add user photo here
                  alt="Аватар пользователя"
                  className="avatar"
                  style={{ marginBottom: "30px" }}
                />
                <div
                  className="user_details"
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    justifyContent: "center",
                    textAlign: "left",
                    color: "white",
                  }}
                >
                  <span className="user_name">{commentItem.userEmail}</span>
                  <p style={{ fontSize: "13px" }}>{commentItem.comment}</p>
                  <span className="timestamp">123132</span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Details;
