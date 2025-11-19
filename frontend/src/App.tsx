import { useState, useMemo, useEffect } from "react";
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
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline,
  LinearProgress,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  PlayArrow,
  Pause,
  Stop,
} from "@mui/icons-material";
import { evaluate } from "./fuzzy/engine";

function App() {
  const [taskComplexity, setTaskComplexity] = useState(5);
  const [energyLevel, setEnergyLevel] = useState(50);
  const [taskPriority, setTaskPriority] = useState(5);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  // Timer states
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          background: darkMode
            ? {
                default: "#121212",
                paper: "#1e1e1e",
              }
            : {
                default: "#f5f7fa",
                paper: "#ffffff",
              },
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#9c27b0",
          },
        },
        typography: {
          fontFamily: "system-ui, -apple-system, Helvetica, Arial, sans-serif",
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  // Timer countdown effect
  useEffect(() => {
    if (isRunning && !isPaused && timeRemaining !== null && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 1) {
            setIsRunning(false);
            setIsPaused(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, isPaused, timeRemaining]);

  const handleTaskComplexity = (_: Event, val: number | number[]) =>
    setTaskComplexity(val as number);
  const handleEnergyLevel = (_: Event, val: number | number[]) =>
    setEnergyLevel(val as number);
  const handleTaskPriority = (_: Event, val: number | number[]) =>
    setTaskPriority(val as number);

  const handleSubmit = async () => {
    setLoading(true);
    // Reset timer when getting new recommendation
    setTimeRemaining(null);
    setIsRunning(false);
    setIsPaused(false);
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

  const startTimer = () => {
    if (result !== null) {
      setTimeRemaining(Math.round(result * 60)); // Convert minutes to seconds
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const stopTimer = () => {
    setTimeRemaining(null);
    setIsRunning(false);
    setIsPaused(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          p: 2,
        }}
      >
        <Container maxWidth="sm">
          <Card
            sx={{ borderRadius: 2, boxShadow: 3, bgcolor: "background.paper" }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textAlign="center"
                  sx={{ flex: 1 }}
                >
                  Study Session Planner
                </Typography>
                <IconButton onClick={toggleDarkMode} color="inherit">
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Box>
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

              <Typography gutterBottom>
                Task Priority: {taskPriority}
              </Typography>
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
                <>
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

                  {/* Timer Section */}
                  {timeRemaining !== null ? (
                    <Box
                      sx={{
                        mt: 3,
                        p: 3,
                        bgcolor: "background.default",
                        borderRadius: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "monospace",
                          color:
                            timeRemaining === 0
                              ? "success.main"
                              : "text.primary",
                        }}
                      >
                        {formatTime(timeRemaining)}
                      </Typography>
                      {timeRemaining > 0 && (
                        <LinearProgress
                          variant="determinate"
                          value={
                            ((result * 60 - timeRemaining) / (result * 60)) *
                            100
                          }
                          sx={{ mt: 2, mb: 2, height: 8, borderRadius: 1 }}
                        />
                      )}
                      {timeRemaining === 0 ? (
                        <Typography
                          variant="h6"
                          sx={{ mt: 2, color: "success.main" }}
                        >
                          Session Complete! 🎉
                        </Typography>
                      ) : (
                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            gap: 1,
                            justifyContent: "center",
                          }}
                        >
                          {isPaused ? (
                            <Button
                              variant="contained"
                              color="success"
                              startIcon={<PlayArrow />}
                              onClick={resumeTimer}
                            >
                              Resume
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="warning"
                              startIcon={<Pause />}
                              onClick={pauseTimer}
                            >
                              Pause
                            </Button>
                          )}
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<Stop />}
                            onClick={stopTimer}
                          >
                            Stop
                          </Button>
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      onClick={startTimer}
                      startIcon={<PlayArrow />}
                      sx={{ mt: 3, py: 1.25, fontWeight: 600 }}
                    >
                      Start Session Timer
                    </Button>
                  )}
                </>
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
    </ThemeProvider>
  );
}

export default App;
