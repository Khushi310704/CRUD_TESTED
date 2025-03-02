import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import UserDetails from "./components/UserDetails";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
