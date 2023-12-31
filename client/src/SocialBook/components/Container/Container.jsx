import "./Container.css";
import Header from "../Header/Header";
import Feed from "../../pages/Feed";

const Container = () => {
  return (
    <div className="container_box">
      <Header />
      <Feed />
    </div>
  );
};

export default Container;
