import React, { useEffect, useState } from "react";
import { useProductContext } from "../contexts/ProductContext";
import { useParams } from "react-router-dom";
import Details from "../components/Details";

function DetailsPage() {
  const { getOneDetails, details } = useProductContext();
  const [item, setItem] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    getOneDetails(id);
  }, []);

  useEffect(() => {
    if (details) {
      setItem(details);
      console.log(details);
    }
  }, [details]);

  return (
    <div
      className="detailsHolder"
      style={{
        marginTop: "100px",
        width: "100vw",
        backgroundColor: "#001c30",
      }}
    >
      {!item ? (
        <div className="cube-container">
          <div className="cube">
            <div className="face front">Front</div>
            <div className="face back">Back</div>
            <div className="face right">Right</div>
            <div className="face left">Left</div>
            <div className="face top">Top</div>
            <div className="face bottom">Bottom</div>
          </div>
        </div>
      ) : (
        <Details item={item} />
      )}
    </div>
  );
}

export default DetailsPage;
