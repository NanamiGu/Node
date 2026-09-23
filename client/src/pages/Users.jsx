import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
        
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`,
            {
                method: "DELETE",
                
            }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
         setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
        console.error("Error deleting user:", error);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">Directory</p>
            <h1 className="mt-1 text-3xl font-bold">Users</h1>
          </div>
          <Link
            to="/create-user"
            className="w-fit rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700"
          >
            Add user
          </Link>
        </div>
      {loading ? (
        <p className="rounded-xl bg-white p-6 text-slate-600 shadow-sm">Loading...</p>
      ) : error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</p>
      ) : users.length === 0 ? (
        <p className="rounded-xl bg-white p-6 text-slate-600 shadow-sm">No users found.</p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li key={user._id} className="flex flex-col justify-between gap-4 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center">
              <Link className="hover:text-blue-600" to={`/users/${user._id}`}>
                <span className="font-semibold">{user.name}</span>
                <span className="ml-2 text-slate-500">{user.email} · {user.age}</span>
              </Link>
              <div className="flex gap-3 text-sm font-semibold">
                <Link className="text-blue-600 hover:text-blue-800" to={`/users/${user._id}/edit`}>
                  Edit
                </Link>
                <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(user._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      </div>
    </main>
  );
}

export default User;