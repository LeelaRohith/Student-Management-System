import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import Forgotpassword from "./Forgotpassword";
import Updatepassword from "./Updatepassword";
import Homepage from "./Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/updatepassword" element={<Updatepassword />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
