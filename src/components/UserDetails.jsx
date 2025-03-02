import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest } from "../redux/userSlice";
import { useParams, Link } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedUser, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserRequest(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!selectedUser) {
    return <p className="text-gray-500">User not found</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md mt-20">
      <h2 className="text-xl font-bold mb-4">{selectedUser.name}</h2>
      <p><strong>Email:</strong> {selectedUser.email}</p>
      <p><strong>Phone:</strong> {selectedUser.phone}</p>
      <p><strong>Website:</strong> {selectedUser.website}</p>
      <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2">
        Back to Users
      </Link>
    </div>
  );
};

export default UserDetails;
