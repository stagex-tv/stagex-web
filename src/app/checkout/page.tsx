"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const router = useRouter();

  const handleNext = async () => {
    if (!selectedPlan) {
      alert("Please select a plan.");
      return;
    }

    const lookupKeys = {
      "StageX Membership": "stagex_membership_monthly",
      "StageX Full Access Pass": "stagex_full_access_monthly"
    };

    const lookupKey = lookupKeys[selectedPlan];

    if (!lookupKey) {
      alert("Invalid plan selection.");
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lookup_key: lookupKey }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create Stripe session");
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Error processing payment.");
    }
  };

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
        width: "90%",
        padding: "30px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        border: "2px solid #a970ff",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "10px"
        }}>
          <Image 
            src="/StageX Logo Word Transparent.png" 
            alt="StageX Logo" 
            width={350} 
            height={75} 
            style={{ marginTop: "-250px", marginBottom: "-100px" }} 
          />
        </div>
        <h1 style={{ fontSize: "30px", marginBottom: "20px", textAlign: "left" }}>Choose The Plan That's Right For You.</h1>

        {/* Plan Options */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
          {[
            { title: "Free Plan With Ads", price: "Free", quality: "Standard", resolution: "720p (HD)", ads: "Yes", devices: "Mobile Phone", offline: "No" },
            { title: "StageX Membership", price: "$9.99/month", quality: "Good", resolution: "1080p (Full HD)", ads: "No", devices: "TV, Computer, Mobile Phone, Tablet", offline: "No" },
            { title: "StageX Full Access Pass", price: "$19.99/month", quality: "Best", resolution: "4K (Ultra HD)", ads: "No", devices: "TV, Computer, Mobile Phone, Tablet", offline: "Yes", live: "Yes", exclusive: "Yes" }
          ].map((plan, index) => (
            <div 
              key={index}
              onClick={() => setSelectedPlan(plan.title)}
              style={{
                width: "30%",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                cursor: "pointer",
                padding: "15px",
                color: "#000",
                backgroundColor: "#fff",
                border: selectedPlan === plan.title ? "3px solid #a970ff" : "2px solid #ccc",
                position: "relative"
              }}
            >
              {selectedPlan === plan.title && (
                <div style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "#a970ff",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "bold"
                }}>
                  ✓
                </div>
              )}
              <div style={{
                width: "100%",
                padding: "10px",
                background: "linear-gradient(to bottom, #a970ff, #6f2c91)",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center"
              }}>
                {plan.title}
              </div>

              <p style={{ fontWeight: "bold", textAlign: "left", marginTop: "20px" }}>Price:</p>
              <p style={{ marginBottom: "10px", textAlign: "left" }}>{plan.price}</p>
              <p style={{ fontWeight: "bold", textAlign: "left" }}>Video Quality:</p>
              <p style={{ marginBottom: "10px", textAlign: "left" }}>{plan.quality}</p>
              <p style={{ fontWeight: "bold", textAlign: "left" }}>Resolution:</p>
              <p style={{ marginBottom: "10px", textAlign: "left" }}>{plan.resolution}</p>
              <p style={{ fontWeight: "bold", textAlign: "left" }}>Ads:</p>
              <p style={{ marginBottom: "10px", textAlign: "left" }}>{plan.ads}</p>
              <p style={{ fontWeight: "bold", textAlign: "left" }}>Supported Devices:</p>
              <p style={{ marginBottom: "10px", textAlign: "left" }}>{plan.devices}</p>
              <p style={{ fontWeight: "bold", textAlign: "left" }}>Offline Viewing:</p>
              <p style={{ marginBottom: "10px", textAlign: "left" }}>{plan.offline}</p>
              {plan.live && (
                <>
                  <p style={{ fontWeight: "bold", textAlign: "left" }}>Live Event Access:</p>
                  <p style={{ marginBottom: "10px", textAlign: "left" }}>Yes</p>
                </>
              )}
              {plan.exclusive && (
                <>
                  <p style={{ fontWeight: "bold", textAlign: "left" }}>Exclusive Content:</p>
                  <p style={{ marginBottom: "10px", textAlign: "left" }}>Yes</p>
                </>
              )}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={handleNext}
            disabled={!selectedPlan}
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: selectedPlan ? "#a970ff" : "#ccc",
              border: "none",
              borderRadius: "8px",
              cursor: selectedPlan ? "pointer" : "not-allowed",
              transition: "background-color 0.3s"
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}