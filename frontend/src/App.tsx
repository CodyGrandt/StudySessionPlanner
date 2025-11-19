import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  Button,
  CircularProgress,
  Container,
  Link,
} from "@mui/material";
import { evaluate } from "./fuzzy/engine";

function App() {
  const [taskComplexity, setTaskComplexity] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(50);
  const [taskPriority, setTaskPriority] = useState(5);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTaskComplexity = (_: Event, val: number | number[]) =>
    setTaskComplexity(val as number);
  const handleEnergyLevel = (_: Event, val: number | number[]) =>
    setEnergyLevel(val as number);
  const handleTaskPriority = (_: Event, val: number | number[]) =>
    setTaskPriority(val as number);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const recommendation = evaluate({
        taskComplexity,
        energyLevel: energyLevel,
        taskPriority,
      });
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
              Adjust your task complexity, energy level, and task priority to
              get a personalized recommendation.
            </Typography>

            <Typography gutterBottom>
              Task Complexity: {taskComplexity}
            </Typography>
            <Slider
              value={taskComplexity}
              onChange={handleTaskComplexity}
              min={0}
              max={10}
              valueLabelDisplay="auto"
              sx={{ mb: 3 }}
            />

            <Typography gutterBottom>Energy Level: {energyLevel}</Typography>
            <Slider
              value={energyLevel}
              onChange={handleEnergyLevel}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              sx={{ mb: 3 }}
            />

            <Typography gutterBottom>Task Priority: {taskPriority}</Typography>
            <Slider
              value={taskPriority}
              onChange={handleTaskPriority}
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

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Have feedback?{" "}
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfki1-8ayWcOCHzUlXwT20-H-Weiv5HxBk3jPV-ABvkv_ENUA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Let us know!
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default App;
