import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  Button,
  Container,
  CircularProgress,
  CssBaseline,
} from "@mui/material";

function App() {
  const [energy, setEnergy] = useState(50);
  const [time, setTime] = useState(60);
  const [urgency, setUrgency] = useState(5);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Study Session Planner
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Use your current energy, available time, and urgency to get a recommended study duration.
          </Typography>

          <Card variant="outlined" sx={{ mt: 4, p: 2, borderRadius: 3 }}>
            <CardContent>
              {/* ENERGY SLIDER */}
              <Typography gutterBottom>Energy: {energy}</Typography>
              <Slider
                value={energy}
                onChange={(e, val) => setEnergy(val as number)}
                step={1}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{ mb: 3 }}
              />

              {/* TIME SLIDER */}
              <Typography gutterBottom>Available Time: {time} min</Typography>
              <Slider
                value={time}
                onChange={(e, val) => setTime(val as number)}
                step={1}
                min={0}
                max={120}
                valueLabelDisplay="auto"
                sx={{ mb: 3 }}
              />

              {/* URGENCY SLIDER */}
              <Typography gutterBottom>Urgency: {urgency}</Typography>
              <Slider
                value={urgency}
                onChange={(e, val) => setUrgency(val as number)}
                step={1}
                min={0}
                max={10}
                valueLabelDisplay="auto"
                sx={{ mb: 4 }}
              />

              {/* SUBMIT BUTTON */}
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                disabled={loading}
                fullWidth
                sx={{ py: 1.2, fontSize: "1rem", borderRadius: 2 }}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Get Recommendation"}
              </Button>

              {/* RESULT DISPLAY */}
              {result !== null && !loading && (
                <Typography
                  variant="h6"
                  sx={{
                    mt: 4,
                    textAlign: "center",
                    color: "success.main",
                    fontWeight: "bold",
                  }}
                >
                  Recommended Duration: {result.toFixed(1)} minutes
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}

export default App;
