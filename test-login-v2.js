/** @format */

async function testLogin() {
  console.log("Testing login on http://localhost:8000/api/auth/login...");
  try {
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "nshuti", password: "wrongpassword" }),
    });

    const text = await response.text();
    console.log("Status:", response.status);
    console.log("Raw Response:", text);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

testLogin();
