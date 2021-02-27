import React from "react";

const Landing = () => {
  return (
    <div style={landingText}>
      <h1>Echo messenger</h1>
      <h5>Collect feedback from your customers</h5>
    </div>
  );
};

// styling of div
const landingText = {
  textAlign: "center",
};

export default Landing;
