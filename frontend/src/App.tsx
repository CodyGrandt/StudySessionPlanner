import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  Button,
  CircularProgress,
  Container,
} from "@mui/material";
import { evaluate } from "./fuzzy/engine";

function App() {
  const [energy, setEnergy] = useState(50);
  const [time, setTime] = useState(60);
  const [urgency, setUrgency] = useState(5);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEnergy = (_: Event, val: number | number[]) =>
    setEnergy(val as number);
  const handleTime = (_: Event, val: number | number[]) =>
    setTime(val as number);
  const handleUrgency = (_: Event, val: number | number[]) =>
    setUrgency(val as number);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const recommendation = evaluate({ energy, time, urgency });
      setResult(recommendation);
    } catch (err) {
      console.error("Error evaluating recommendation:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default", // uses theme background
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{ borderRadius: 2, boxShadow: 3, bgcolor: "background.paper" }}
        >
          <CardContent>
            <Typography
              variant="h4"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
            >
              Study Session Planner
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              color="text.secondary"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Adjust your energy, available time, and urgency to get a
              personalized recommendation.
            </Typography>

            <Typography gutterBottom>Energy: {energy}</Typography>
            <Slider
              value={energy}
              onChange={handleEnergy}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              sx={{ mb: 3 }}
            />

            <Typography gutterBottom>Available Time: {time} min</Typography>
            <Slider
              value={time}
              onChange={handleTime}
              min={0}
              max={120}
              valueLabelDisplay="auto"
              sx={{ mb: 3 }}
            />

            <Typography gutterBottom>Urgency: {urgency}</Typography>
            <Slider
              value={urgency}
              onChange={handleUrgency}
              min={0}
              max={10}
              valueLabelDisplay="auto"
              sx={{ mb: 4 }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={loading}
              sx={{ py: 1.25, fontWeight: 600 }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Get Recommendation"
              )}
            </Button>

            {result !== null && !loading && (
              <Typography
                variant="h6"
                sx={{
                  mt: 4,
                  textAlign: "center",
                  color: "primary.main",
                  fontWeight: "bold",
                }}
              >
                Recommended Duration: {result.toFixed(1)} minutes
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default App;
