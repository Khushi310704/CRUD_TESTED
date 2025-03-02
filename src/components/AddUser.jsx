import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserRequest } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUserRequest(user)); // Ensure full user object is dispatched
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Add User</h2>
      <form onSubmit={handleSubmit} data-testid="user-form" >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={user.phone}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="text"
          name="website"
          placeholder="Website"
          value={user.website}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
