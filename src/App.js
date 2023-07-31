import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import MainRoute from "./routes/MainRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "#D8D9DA" }}>
      <MainRoute />
    </div>
  );
}

export default App;
