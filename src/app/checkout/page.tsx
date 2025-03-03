"use client";

import Image from "next/image";

export default function Checkout() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#fff",
      color: "#000",
    }}>
      <div style={{
        width: "400px",
        padding: "30px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        border: "2px solid #a970ff",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
      }}>
        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Choose Your Subscription</h1>

        <p style={{ fontSize: "14px", color: "#333", marginBottom: "20px" }}>
          Secure and flexible payment options. Cancel anytime.
        </p>

        {/* Payment Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <button style={{
            padding: "12px",
            backgroundColor: "#fff",
            border: "1px solid #a970ff",
            borderRadius: "5px",
            color: "#a970ff",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            Credit/Debit Card
          </button>

          <button style={{
            padding: "12px",
            backgroundColor: "#fff",
            border: "1px solid #a970ff",
            borderRadius: "5px",
            color: "#a970ff",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            PayPal
          </button>

          <button style={{
            padding: "12px",
            backgroundColor: "#fff",
            border: "1px solid #a970ff",
            borderRadius: "5px",
            color: "#a970ff",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            Gift Code
          </button>
        </div>
      </div>
    </div>
  );
}