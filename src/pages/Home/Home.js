import React, { useEffect, useState } from "react";
import Featured from "../../components/Featured/Featured";
import Navbar from "../../components/Navbar/Navbar";
import List from "../../components/List/List";
import "./Home.scss";
import axios from "axios";
const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/list${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`
        );
        setLists(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => {
        return <List list={list} />;
      })}
    </div>
  );
};
export default Home;
