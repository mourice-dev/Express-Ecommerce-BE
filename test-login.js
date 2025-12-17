/** @format */

import fetch from "node-fetch";

async function testLogin() {
  try {
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "nshuti", password: "wrongpassword" }),
    });

    const text = await response.text();
    console.log("Status:", response.status);
    console.log("Raw Response:", text);

    try {
      const json = JSON.parse(text);
      console.log("Parsed JSON:", json);
    } catch (e) {
      console.log("Response is not JSON");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

testLogin();
