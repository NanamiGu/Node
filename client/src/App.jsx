import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import EditUser from "./pages/EditUser";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<UserDetails />} />
      <Route path="/users/:id/edit" element={<EditUser />} />
    </Routes>
  );
}

export default App;