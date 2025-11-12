// Triangular membership function
function trimf(a: number, b: number, c: number): (x: number) => number {
  return (x: number) => {
    if (x <= a || x >= c) return 0.0;
    if (x === b) return 1.0;
    if (x < b) return b !== a ? (x - a) / (b - a) : 0.0;
    return c !== b ? (c - x) / (c - b) : 0.0;
  };
}

// Expanded ranges for taskComplexity, focusLevel, and taskPriority to ensure proper coverage
export const taskComplexity = {
  low: trimf(0, 3, 6), // Expanded range for low complexity
  medium: trimf(5, 7, 9), // Expanded range for medium complexity
  high: trimf(8, 10, 12), // Expanded range for high complexity
};

// Adjusted focusLevel membership function ranges to align with expected input values
export const energyLevel = {
  low: trimf(0, 25, 50), // Adjusted range for low focus
  medium: trimf(40, 60, 80), // Adjusted range for medium focus
  high: trimf(70, 90, 110), // Expanded range for high focus
};

export const taskPriority = {
  low: trimf(0, 3, 6), // Expanded range for low priority
  medium: trimf(5, 7, 9), // Expanded range for medium priority
  high: trimf(8, 10, 12), // Expanded range for high priority
};

// Output representative crisp values
export const duration_values = {
  short: 0.0,
  moderate: 35.0,
  long: 300.0,
};
