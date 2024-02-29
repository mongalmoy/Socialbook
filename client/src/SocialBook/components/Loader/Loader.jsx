import "./Loader.css";

const Loader = () => {
  return (
    <div
      className="loader_container"
    >
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
