"use client";

import { useState } from "react";
import Image from "next/image";
import { Amplify } from "aws-amplify";
import { Auth } from "aws-amplify";
import awsExports from "../../../aws-exports"; // Make sure this file is correctly set up

Amplify.configure(awsExports);

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await Auth.signUp({
        username: formData.email,
        password: formData.password,
        attributes: {
          email: formData.email,
          phone_number: formData.phone, // Must be in E.164 format (+1234567890)
        },
      });

      // Redirect to the checkout page after successful signup
      window.location.href = "/checkout";
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
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
      backgroundColor: "#000", // Dark theme background
    }}>
      <div style={{
        width: "350px",
        padding: "30px",
        backgroundColor: "#111", // Slightly lighter black for contrast
        borderRadius: "10px",
        border: "2px solid #a970ff", // Light purple border for sleek look
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

        <h1 style={{ marginBottom: "10px", fontSize: "24px" }}>Sign Up for StageX</h1>
        <p style={{ marginBottom: "20px", fontSize: "14px", color: "#aaa" }}>
          Create an account to watch exclusive content.
        </p>

        {/* Error Message */}
        {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

        {/* Signup Form */}
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
            backgroundColor: loading ? "#888" : "#a970ff", // Disabled state when loading
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

        {/* "Get the App" Section */}
        <div style={{
          marginTop: "30px",
          textAlign: "center"
        }}>
          <p style={{ fontSize: "14px", color: "#aaa" }}>Get the app</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image 
              src="/Download_on_the_App_Store_Badge.png" 
              alt="Download on the App Store" 
              width={150} 
              height={50} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}