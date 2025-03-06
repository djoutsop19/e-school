import React, { useEffect, useState } from "react";

const Buy = () => {
  const [cinetPayLoaded, setCinetPayLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const detectAdBlocker = () => {
    const testAd = document.createElement("div");
    testAd.innerHTML = "&nbsp;";
    testAd.className = "adsbox";
    document.body.appendChild(testAd);
    const isBlocked = testAd.offsetHeight === 0;
    document.body.removeChild(testAd);
    return isBlocked;
  };

  useEffect(() => {
    let script;

    if (process.env.NODE_ENV === "production" && !detectAdBlocker()) {
      script = document.createElement("script");
      script.src = "https://cdn.cinetpay.com/seamless/main.js";
      script.async = true;

      script.onload = () => {
        console.log("CinetPay script chargé avec succès");
        setCinetPayLoaded(true);
      };

      script.onerror = () => {
        console.error("Erreur lors du chargement du script CinetPay");
      };

      document.body.appendChild(script);
    } else {
      console.warn("Un bloqueur d'annonces a été détecté ou l'environnement n'est pas en production");
    }

    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const checkout = () => {
    if (!cinetPayLoaded) {
      alert("CinetPay n'est pas encore chargé, veuillez patienter...");
      return;
    }

    setIsLoading(true);

    window.CinetPay.setConfig({
      apikey: "67036590965f9bc1bebf766.75064654",
      site_id: "5879942",
      notify_url: "http://localhost:5173/buy",
      mode: "PRODUCTION",
    });

    window.CinetPay.getCheckout({
      transaction_id: Math.floor(Math.random() * 100000000).toString(),
      amount: 100,
      currency: "XAF",
      channels: "ALL",
      description: "Test de paiement",
      customer_name: "Joe",
      customer_surname: "Down",
      customer_email: "down@test.com",
      customer_phone_number: "088767611",
      customer_address: "BP 0024",
      customer_city: "Antananarivo",
      customer_country: "CM",
      customer_state: "CM",
      customer_zip_code: "06510",
    });

    window.CinetPay.waitResponse((data) => {
      setIsLoading(false);
      if (data.status === "REFUSED") {
        alert("Votre paiement a échoué : " + data.message);
        window.location.reload();
      } else if (data.status === "ACCEPTED") {
        alert("Votre paiement a été effectué avec succès");
        window.location.reload();
      } else {
        alert("Statut de paiement inconnu : " + data.status);
      }
    });

    window.CinetPay.onError((data) => {
      setIsLoading(false);
      console.error("Erreur de paiement :", data);
      alert("Une erreur s'est produite lors du paiement : " + data.message);
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.getElementById('inputField')?.focus();
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">SDK SEAMLESS</h1>
      <button
        onClick={checkout}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg"
        disabled={isLoading}
      >
        {isLoading ? "Chargement..." : "100 XAF"}
      </button>
    </div>
  );
};

export default Buy;
