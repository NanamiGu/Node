import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/${id}`
        );

        if (!response.ok) {
          throw new Error("User not found");
        }

        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to fetch user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // UI هنا
  if (loading) {
    return <main className="min-h-screen bg-slate-100 p-8 text-slate-600">Loading...</main>;
  }

  if (error) {
    return <main className="min-h-screen bg-slate-100 p-8 text-red-700">{error}</main>;
  }

  if (!user) {
    return <main className="min-h-screen bg-slate-100 p-8 text-slate-600">User not found.</main>;
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <Link className="text-sm font-semibold text-blue-600 hover:text-blue-800" to="/users">&larr; Back to users</Link>
        <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-blue-600">Profile</p>
        <h1 className="mt-1 text-3xl font-bold">{user.name}</h1>
        <dl className="mt-6 space-y-4 border-t border-slate-100 pt-5">
          <div><dt className="text-sm text-slate-500">Email</dt><dd className="font-medium">{user.email}</dd></div>
          <div><dt className="text-sm text-slate-500">Age</dt><dd className="font-medium">{user.age}</dd></div>
        </dl>
      </div>
    </main>
  );
}

export default UserDetails;