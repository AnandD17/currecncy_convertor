"use client";
import IconsCrissCross from "@/assets/IconsCrissCross";
import Dropdown from "@/components/Dropdown";
import useDebounce from "@/hooks/useDebounce";
import { getCoinPrice } from "@/services/common";
import { CRYPTO_CURRENCIES, FIAAT_CURRENCIES } from "@/utils/data";
import { DropdownOption } from "@/utils/types";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [cryptoCurrency, setCryptoCurrency] = useState<DropdownOption>(
    CRYPTO_CURRENCIES[0]
  );
  const [fiatCurrency, setFiatCurrency] = useState<DropdownOption>(
    FIAAT_CURRENCIES[0]
  );

  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<number>(0);

  const intervalRef = useRef<number | null>(null);

  const getData = async (val: number, fiaat: string, crypto: string) => {
    if (!val) return;

    setLoading(true);
    try {
      const res = await getCoinPrice(crypto, fiaat);
      if (res.length > 0) {
        setResult(val / res[0].current_price);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fiatCurrencyRef = useRef(fiatCurrency.value);
  const cryptoCurrencyRef = useRef(cryptoCurrency.value);

  useEffect(() => {
    fiatCurrencyRef.current = fiatCurrency.value;
    cryptoCurrencyRef.current = cryptoCurrency.value;
  }, [fiatCurrency, cryptoCurrency]);

  useDebounce({
    callback: () => {
      getData(amount, fiatCurrency.value, cryptoCurrency.value);
    },
    delay: 1000,
    dependency: [cryptoCurrency, fiatCurrency, amount],
  });

  useEffect(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      getData(amount, fiatCurrencyRef.current, cryptoCurrencyRef.current);
    }, 30000);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [amount]); // Include amount in the dependency array

  return (
    <main className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="flex flex-col col gap-4 justify-center items-center">
        <h2 className="text-4xl font-semibold">
          Crypto <span className="text-purple-600">Convertor</span>
        </h2>
        <div className="flex gap-4 items-center">
          <div className="w-[100px]">
            <Dropdown
              options={FIAAT_CURRENCIES}
              selected={fiatCurrency}
              onChange={(value: DropdownOption) => setFiatCurrency(value)}
            />
          </div>
          <IconsCrissCross color="white" />
          <div className="w-[100px]">
            <Dropdown
              options={CRYPTO_CURRENCIES}
              selected={cryptoCurrency}
              onChange={(value: DropdownOption) => setCryptoCurrency(value)}
            />
          </div>
        </div>
        <input
          value={amount || 0}
          onChange={(e) => {
            setAmount(parseFloat(e.target.value));
          }}
          type="text"
          className="px-4 py-2 bg-transparent border border-gray-300 rounded-lg focus-visible:outline-none w-[500px]"
          placeholder="Enter amount to convert to USD into EUR"
        />
        {loading ? (
          <p className="mt-3">Loading...</p>
        ) : (
          <p className={`mt-3 ${amount ? "visible" : "invisible"}`}>
            Your {fiatCurrency.label} {amount} is worth{" "}
            <span className="text-purple-600">
              {result} {cryptoCurrency.label}
            </span>
          </p>
        )}
      </div>
    </main>
  );
}
