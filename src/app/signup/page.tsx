"use client";

import { useState } from "react";
import Image from "next/image";
import { Amplify } from "aws-amplify";
import { signUp, confirmSignUp } from "aws-amplify/auth";
import awsExports from "../../aws-exports";

Amplify.configure(awsExports);

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    code: "", // Added for verification step
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState("signup"); // "signup", "verification", "payment"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signUp({
        username: formData.email,
        password: formData.password,
        attributes: {
          email: formData.email,
          phone_number: formData.phone,
        },
      });

      console.log("Signup successful, proceed to verification.");
      setStep("verification"); // Move to verification step
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await confirmSignUp({
        username: formData.email,
        confirmationCode: formData.code,
      });

      console.log("Verification successful, proceed to payment.");
      window.location.href = "/checkout"; // Redirect to payment
    } catch (err: any) {
      console.error("Verification error:", err);
      setError(err.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#000",
    }}>
      <div style={{
        width: "350px",
        padding: "30px",
        backgroundColor: "#111",
        borderRadius: "10px",
        border: "2px solid #a970ff",
        textAlign: "center",
        color: "#fff"
      }}>
        {/* StageX Logo */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image 
            src="/StageX X Logo.PNG" 
            alt="StageX Logo" 
            width={80} 
            height={80} 
            style={{ marginBottom: "20px" }}
          />
        </div>

        <h1 style={{ marginBottom: "10px", fontSize: "24px" }}>
          {step === "signup" ? "Sign Up for StageX" : "Verify Your Account"}
        </h1>
        <p style={{ marginBottom: "20px", fontSize: "14px", color: "#aaa" }}>
          {step === "signup"
            ? "Create an account to watch exclusive content."
            : "Enter the verification code sent to your email."}
        </p>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            color: "red",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "10px",
            fontSize: "14px",
          }}>
            {error}
          </div>
        )}

        {/* Signup Form */}
        {step === "signup" && (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #a970ff",
                backgroundColor: "#222",
                color: "#fff",
                fontSize: "16px"
              }}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (+1234567890)"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #a970ff",
                backgroundColor: "#222",
                color: "#fff",
                fontSize: "16px"
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                marginBottom: "20px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #a970ff",
                backgroundColor: "#222",
                color: "#fff",
                fontSize: "16px"
              }}
            />
            <button type="submit" disabled={loading} style={{
              marginTop: "10px",
              padding: "12px",
              backgroundColor: loading ? "#888" : "#a970ff",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer"
            }}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        )}

        {/* Verification Form */}
        {step === "verification" && (
          <form onSubmit={handleVerification} style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              name="code"
              placeholder="Enter Verification Code"
              value={formData.code}
              onChange={handleChange}
              required
              style={{
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #a970ff",
                backgroundColor: "#222",
                color: "#fff",
                fontSize: "16px"
              }}
            />
            <button type="submit" disabled={loading} style={{
              marginTop: "10px",
              padding: "12px",
              backgroundColor: loading ? "#888" : "#a970ff",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer"
            }}>
              {loading ? "Verifying..." : "Verify Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}