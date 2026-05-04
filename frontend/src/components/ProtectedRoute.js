import React from "react";

function ProtectedRoute({ children }) {
  const password = prompt("Enter admin password");

  if (password !== "Victus@2025$") {
    return <h1 style={{ color: "white" }}>Access Denied</h1>;
  }

  return children;
}

export default ProtectedRoute;