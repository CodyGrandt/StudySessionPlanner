from typing import Callable, Dict

def trimf(a: float, b: float, c: float) -> Callable[[float], float]:
    """Triangular membership function."""
    def mf(x: float) -> float:
        if x <= a or x >= c:
            return 0.0
        if x == b:
            return 1.0
        if x < b:
            return (x - a) / (b - a) if b != a else 0.0
        return (c - x) / (c - b) if c != b else 0.0
    return mf

# Input fuzzy sets with broader overlap
energy: Dict[str, Callable[[float], float]] = {
    "low":    trimf(0, 0, 60),
    "medium": trimf(30, 50, 80),
    "high":   trimf(60, 100, 100),
}

time: Dict[str, Callable[[float], float]] = {
    "short":    trimf(0, 0, 60),
    "moderate": trimf(30, 60, 90),
    "long":     trimf(60, 120, 120),
}

urgency: Dict[str, Callable[[float], float]] = {
    "low":    trimf(0, 0, 5),
    "medium": trimf(2, 5, 8),
    "high":   trimf(5, 10, 10),
}

# Output representative crisp values
duration_values: Dict[str, float] = {
    "short":    20.0,
    "moderate": 45.0,
    "long":     70.0,
}
