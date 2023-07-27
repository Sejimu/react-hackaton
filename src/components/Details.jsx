import { Typography } from "@mui/material";
import React from "react";
import { useProductContext } from "../contexts/ProductContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const Details = ({ item }) => {
  const { isAdmin } = useAuthContext();
  const { deleteProduct } = useProductContext();
  const navigate = useNavigate();

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
          <div></div>
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
        <div className="comments_input">
          <div className="comments_input_box">
            <div className="comments_input_first">
              <img width="80" src="" alt="" />
              <p>krasavachic@gmail.com</p>
            </div>
            <div className="comments_input_second">
              <textarea rows="10" cols="50"></textarea>
            </div>
            <button>Comment</button>
          </div>
        </div>
        <div className="comments_comment">
          <div>
            <img width="80" src="" alt="" />
            <h3>krasavachic@gmail.com</h3>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam
            libero aut repellendus quis corporis voluptatem aspernatur.
            Reprehenderit explicabo assumenda voluptas, dolor repellendus
            tenetur consequatur et laborum voluptatibus hic sint necessitatibus
            facere consequuntur ut magnam nam sed neque aspernatur ex alias.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
