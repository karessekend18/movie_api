import React from "react";
import axios from "../../api/axiosConfig";
import Hero from "../hero/hero";

const Home = ({ movies }) => {
  return (
    <div>
      <Hero movies={movies} />
    </div>
  );
};

export default Home;
