import React, { useState } from "react";

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("http://localhost:5173/payement/callback");

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    const params = JSON.stringify({
      email,
      amount,
      currency: "XAF", // You can make this dynamic if needed
      description,
      reference,
      callback: callbackUrl,
    });

    const options = {
      method: "POST",
      headers: {
        "Authorization": "",
        "Content-Type": "application/json",
      },
      body: params,
    };

    fetch("https://api.notchpay.co/payments/initialize", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);

        // Redirect to the payment URL
        if (data && data.authorization_url) {
          window.location.href = data.authorization_url;
        } else {
          console.error("Payment URL not found in the response.");
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Payment Form</h2>
        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 font-semibold">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-600 font-semibold">Amount (XAF)</label>
            <input
              type="number"
              id="amount"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-600 font-semibold">Description</label>
            <input
              type="text"
              id="description"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a brief description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="reference" className="block text-gray-600 font-semibold">Reference</label>
            <input
              type="text"
              id="reference"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="callback" className="block text-gray-600 font-semibold">Callback URL</label>
            <input
              type="url"
              id="callback"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter callback URL"
              value={callbackUrl}
              onChange={(e) => setCallbackUrl(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Processing..." : "Make Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
