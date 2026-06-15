import React, { useState } from "react";
import Header from "../src/components/layouts/Header";

export default function App() {
  // Fake state just to test our header component views
  const [testUser, setTestUser] = useState(null);

  const handleFakeLogin = () => {
    setTestUser({ username: "Lutendo" });
  };

  const handleFakeLogout = () => {
    setTestUser(null);
  };

  return (
    <div>
      {/* Our single completed feature */}
      <Header user={testUser} onLogout={handleFakeLogout} />

      {/* Temporary switch at the bottom of the page just to test both views */}
      <div style={{ marginTop: "100px", textAlign: "center" }}>
        <p>Current View: <b>{testUser ? "Admin View (Logged In)" : "Guest View (Logged Out)"}</b></p>
        
        {!testUser ? (
          <button onClick={handleFakeLogin} style={{ padding: "10px 20px", cursor: "pointer" }}>
            Switch to Admin View
          </button>
        ) : (
          <p>Click "Log Out" inside the header menu dropdown to switch back!</p>
        )}
      </div>
    </div>
  );
}