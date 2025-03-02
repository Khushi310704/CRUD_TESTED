import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRequest } from "../redux/userSlice";
import { Link } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">
                <Link to={`/user/${user.id}`} className="text-blue-500 mr-2">
                  View
                </Link>
                <Link to={`/edit/${user.id}`} className="text-green-500 mr-2">
                  Edit
                </Link>
                <button
                  onClick={() => dispatch({ type: "users/deleteUserRequest", payload: user.id })}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/add" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2">
        Add User
      </Link>
    </div>
  );
};

export default UserList;
