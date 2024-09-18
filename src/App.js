import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
    return <Converter />;
}

function Converter() {
    const [amount, setAmount] = useState(1);
    const [baseCurr, setBaseCurr] = useState("USD");
    const [quotedCurr, setQuotedCurr] = useState("EUR");
    const [converted, setConverted] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(
        function () {
            async function fetchData() {
                if (baseCurr === quotedCurr) return setConverted(amount);

                try {
                    setIsLoading(true);
                    const response = await fetch(
                        `https://api.frankfurter.app/latest?amount=${amount}&from=${baseCurr}&to=${quotedCurr}`
                    );

                    if (!response.ok) throw new Error("Conversion failed");

                    const data = await response.json();

                    setConverted(data.rates[quotedCurr]);
                } catch (err) {
                    console.error(err.message);
                } finally {
                    setIsLoading(false);
                }
            }

            fetchData();
        },
        [amount, baseCurr, quotedCurr]
    );

    return (
        <div className="converter">
            <form className="form">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    disabled={isLoading}
                />
                <select
                    value={baseCurr}
                    onChange={(e) => setBaseCurr(e.target.value)}
                    disabled={isLoading}
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CAD">CAD</option>
                    {/* <option value="KES">KES</option>//does not offer KES
                    conversion */}
                </select>
                <select
                    value={quotedCurr}
                    onChange={(e) => setQuotedCurr(e.target.value)}
                    disabled={isLoading}
                >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CAD">CAD</option>
                    {/* <option value="KES">KES</option>//does not offer Kes
                    conversion */}
                </select>
            </form>
            <p>
                {converted} {quotedCurr}
            </p>
        </div>
    );
}
