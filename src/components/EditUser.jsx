import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRequest } from "../redux/userSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);
  
  const existingUser = users.find((user) => user.id === parseInt(id));

  const [user, setUser] = useState(existingUser || { name: "", email: "", phone: "", website: "" });

  useEffect(() => {
    if (existingUser) setUser(existingUser);
  }, [existingUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserRequest(user));
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md mt-20">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="name" 
        name="name" 
        value={user.name} 
        onChange={handleChange} 
        className="w-full p-2 border mb-2" 
        required 
      />
      <input 
        type="email" 
        placeholder="email" 
        name="email"
        value={user.email} 
        onChange={handleChange} 
        className="w-full p-2 border mb-2" 
        required 
      />
      <input 
        type="text" 
        placeholder="phone" 
        name="phone" 
        value={user.phone} 
        onChange={handleChange} 
        className="w-full p-2 border mb-2" 
        required 
      />
      <input 
        type="text" 
        placeholder="website" 
        name="website" 
        value={user.website} 
        onChange={handleChange} 
        className="w-full p-2 border mb-2" 
        required 
      />
      <button 
        type="submit" 
        className="w-full bg-green-500 text-white p-2"
      >Update User</button>
    </form>
    </div>
  );
};

export default EditUser;
