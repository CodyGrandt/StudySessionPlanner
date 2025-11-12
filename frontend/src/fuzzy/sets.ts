// Triangular membership function
function trimf(a: number, b: number, c: number): (x: number) => number {
  return (x: number) => {
    if (x <= a || x >= c) return 0.0;
    if (x === b) return 1.0;
    if (x < b) return b !== a ? (x - a) / (b - a) : 0.0;
    return c !== b ? (c - x) / (c - b) : 0.0;
  };
}

// Input fuzzy sets with broader overlap
export const energy = {
  low: trimf(0, 0, 60),
  medium: trimf(30, 50, 80),
  high: trimf(60, 100, 100),
};

export const time = {
  short: trimf(0, 0, 60),
  moderate: trimf(30, 60, 90),
  long: trimf(60, 120, 120),
};

export const urgency = {
  low: trimf(0, 0, 5),
  medium: trimf(2, 5, 8),
  high: trimf(5, 10, 10),
};

// Output representative crisp values
export const duration_values = {
  short: 20.0,
  moderate: 45.0,
  long: 70.0,
};
