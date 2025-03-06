import { Link } from "react-router-dom";

const LoginParent = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {/* Formulaire */}
      <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900">Let's Sign in</h2>
        <p className="text-gray-500">Welcome Back, You've been missed!</p>

        {/* Input Email */}
        <div className="mt-6">
          <label className="block text-gray-700">Email</label>
          <div className="relative flex items-center">
            <input
              type="email"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="parent@gmail.com"
            />
            <span className="absolute right-3 text-gray-400">@</span>
          </div>
        </div>

        {/* Input Password */}
        <div className="mt-4">
          <label className="block text-gray-700">Password</label>
          <div className="relative flex items-center">
            <input
              type="password"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="parent123"
            />
            <span className="absolute right-3 text-gray-400">🔒</span>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right mt-2">
          <a href="#" className="text-blue-500 text-sm">Forgot password?</a>
        </div>

        {/* Bouton Sign in */}
        <button className="w-full mt-6 bg-[#1E4D6B] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#23658A] transition">
          Sign in
        </button>

        {/* Lien pour Login as Student */}
        <div className="mt-4 text-center">
          <Link to="/" className="text-gray-700">
            Login as <span className="font-bold">Student</span>?
          </Link>
        </div>

        {/* Terms & Conditions */}
        <p className="text-xs text-gray-500 text-center mt-4">
          By logging in, you agree to our
          <a href="#" className="text-blue-500"> Terms & Condition</a> & 
          <a href="#" className="text-blue-500"> Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default LoginParent;
