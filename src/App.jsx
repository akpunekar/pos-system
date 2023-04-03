import "./App.scss";
import Cart from "./components/Cart";
import ItemList from "./components/ItemList/ItemList";

function App() {
  return (
    <div className="App">
      <div className="left-side">
        <Cart />
      </div>
      <div className="right-side">
        <ItemList />
      </div>
    </div>
  );
}

export default App;
