import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginStudent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Réinitialiser l'erreur

    const response = await fetch("http://localhost/folioreact/eschool/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      navigate("/dashboard"); // Redirection vers Dashboard si succès
    } else {
      setError(data.message); // Afficher l'erreur en cas d'échec
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900">Let's Sign in</h2>
        <p className="text-gray-500">Welcome Back, You've been missed!</p>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="student@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="student123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full mt-6 bg-[#1E4D6B] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#23658A] transition">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginStudent;
