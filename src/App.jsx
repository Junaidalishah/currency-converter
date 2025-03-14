import React, { useEffect } from "react";
import { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [base, setBase] = useState("");
  const [rates, setRates] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(
    function () {
      if (!amount || !base || !rates) return;
      async function fetchCurrency() {
        try {
          setLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${base}&to=${rates}`
          );
          if (!res.ok) throw new Error("Some thing went wrong");
          const data = await res.json();

          if (data.rates && data.rates[rates]) {
            setConvertedAmount(data.rates[rates]);
          } else {
            alert("invalid currency");
          }
          console.log(data);
        } catch (err) {
          console.log(err.message);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchCurrency();
    },
    [amount, base, rates]
  );
  function ErrorMessage({ message }) {
    return <p>{message}</p>;
  }
  function Loading() {
    return <p>Loading</p>;
  }

  return (
    <div>
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!error && !loading && (
        <>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select value={base} onChange={(e) => setBase(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
          <select value={rates} onChange={(e) => setRates(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
            <option value="INR">INR</option>
          </select>
          <p>{convertedAmount}</p>
        </>
      )}
    </div>
  );
}

export default App;
