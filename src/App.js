import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import MainRoute from "./routes/MainRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "#001C30" }}>
      <MainRoute />
    </div>
  );
}

export default App;
