import { useParams } from "react-router-dom";
import './trailer.css';
import React from "react";

const Trailer = () => {
    let params = useParams();
    let key = params.ytTrailerId;
    console.log('ytTrailerId:', key); // Debug: log the trailer ID

    return (
    <div className="react-player-container">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${key}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
)}

export default Trailer;