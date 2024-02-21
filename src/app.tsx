import Item from "./components/Item";
const App = () => {
  const hello = () => {
    console.log("hello");
  };
  return (
    <ul>
      <Item text={"순서1"} />
      <Item text={"순서2"} />
    </ul>
  );
};

export default App;
