import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: ""
    });
    const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
useEffect(() => {
    const fetchUser = async () => {
        try{
            const response = await fetch(`http://localhost:5000/api/users/${id}`);
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setFormData(data);
        } catch (error) {
            console.error("Error fetching user:", error);
            setError("Failed to fetch user. Please try again later.");
        } finally {
            setLoading(false);
        }
    }
    fetchUser();
}, [id]);
const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message ||"Network response was not ok");
        }
         console.log(data);
        navigate("/users");
    } catch (error) {
        console.error("Error updating user:", error);
        setError(error.message);
    }
};

if (loading) return <p>Loading...</p>;

return (
        <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
            <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h1 className="text-2xl font-bold">Edit user</h1>
                <label className="block text-sm font-medium">Name<input className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" name="name" value={formData.name} onChange={handleChange} required /></label>
                <label className="block text-sm font-medium">Email<input className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" name="email" type="email" value={formData.email} onChange={handleChange} required /></label>
                <label className="block text-sm font-medium">Age<input className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100" name="age" type="number" value={formData.age} onChange={handleChange} required /></label>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700" type="submit">Update user</button>
            </form>
        </main>
);
}

export default EditUser;
