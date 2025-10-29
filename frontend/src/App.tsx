import React, { useState } from "react";

function App() {
  const [energy, setEnergy] = useState(50);
  const [time, setTime] = useState(60);
  const [urgency, setUrgency] = useState(5);
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ energy, time, urgency }),
      });
      const data = await response.json();
      setResult(data.recommended_duration);
    } catch (err) {
      console.error("Error calling backend:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Study Session Planner</h1>

      <label>Energy: {energy}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={energy}
        onChange={(e) => setEnergy(Number(e.target.value))}
      />
      <br />

      <label>Time: {time} minutes</label>
      <input
        type="range"
        min="0"
        max="120"
        value={time}
        onChange={(e) => setTime(Number(e.target.value))}
      />
      <br />

      <label>Urgency: {urgency}</label>
      <input
        type="range"
        min="0"
        max="10"
        value={urgency}
        onChange={(e) => setUrgency(Number(e.target.value))}
      />
      <br />

      <button onClick={handleSubmit}>Get Recommendation</button>

      {result !== null && (
        <h2>Recommended Duration: {result.toFixed(1)} minutes</h2>
      )}
    </div>
  );
}

export default App;
