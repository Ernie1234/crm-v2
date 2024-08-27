"use client";

import { usePaystackPayment } from "react-paystack";

interface Props {
  onSuccess: (reference: string) => void;
  onClose: () => void;
  email: string;
  amount: number;
  reference: string;
  publicKey: string;
}

const Payment = ({
  onClose,
  onSuccess,
  email,
  amount,
  reference,
  publicKey,
}: Props) => {
  const config = {
    reference,
    email,
    amount,
    publicKey,
  };
  const initializePayment = usePaystackPayment(config);
  return (
    <div>
      <button
        className="p-4 disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition-all duration-500 w-full bg-green-700 hover:bg-green-600 rounded-full border-green-700 text-white"
        onClick={() => {
          initializePayment({ onSuccess, onClose });
        }}
      >
        Buy now
      </button>
    </div>
  );
};

export default Payment;
