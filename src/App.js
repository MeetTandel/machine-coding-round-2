import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Archive } from "./pages/Archive/Archive";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
      </Routes>
    </div>
  );
}

export default App;
