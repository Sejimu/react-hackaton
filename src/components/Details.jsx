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

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

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
    <div className="details" style={{ backgroundColor: "#001c30" }}>
      <div className="first_block">
        <div className="first_block_item_first">
          <img src={item.photo} alt="" />
        </div>
        <div className="first_block_item_second">
          <div className="first_block_item_second_div">
            <p>{dollars} kgs </p>
            <p>{item.price} $ </p>
          </div>
          {user ? <div>{userInfo.email}</div> : <div></div>}
          {isAdmin() ? (
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
          )}
        </div>
      </div>

      <div className="second_block" style={{ padding: "20px" }}>
        <Typography sx={{ color: "black" }} variant="h4">
          {item.title}
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }}>
          {item.description}
        </Typography>
        <Typography variant="h5" sx={{ color: "black" }}>
          Category: {item.category}
        </Typography>
      </div>
      <div className="comments">
        <form onSubmit={handleSubmit}>
          <div className="comments_input">
            <div className="comments_input_box">
              <div className="comments_input_first">
                <img width="80" src="" alt="" />
                <h4>Оставьте свой отзыв</h4>
              </div>
              <div className="comments_input_second">
                <textarea
                  rows="5"
                  cols="100"
                  value={commentVal}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button>Comment</button>
            </div>
          </div>
        </form>
        {comments
          .filter((item) => id === item.productId)
          .map((item, index) => (
            <div className="comments_comment" key={index}>
              <div>
                <img width="80" src="" alt="" />
                <h3>{item.userEmail}</h3>
              </div>
              <p>{item.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Details;
