import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Characters from "./Pages/Characters";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Characters" element={<Characters/>} />
    </Routes>
  );
}

export default App;
 