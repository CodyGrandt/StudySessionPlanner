import * as sets from "./sets";
import * as rules from "./rules";
import type { Inputs } from "./rules";

export function evaluate(inputs: Inputs): number {
  // Collect rule activations
  const buckets: Record<string, number[]> = {
    short: [],
    moderate: [],
    long: [],
  };

  for (const rule of rules.rules) {
    const [strength, label] = rule(inputs);
    if (strength > 0) {
      buckets[label].push(strength);
    }
  }

  // --- Urgency memberships ---
  const u_low = sets.taskPriority.low(inputs.taskPriority);
  const u_med = sets.taskPriority.medium(inputs.taskPriority);
  const u_high = sets.taskPriority.high(inputs.taskPriority);

  // --- Urgency modifiers ---
  // Enforce monotonicity: low urgency → shorter, high urgency → longer
  const short_mod = 1.0 + 0.6 * u_low - 0.6 * u_high;
  const moderate_mod = 1.0 + 0.2 * u_med;
  const long_mod = 1.0 + 1.0 * u_high - 0.3 * u_low;

  const label_mod = {
    short: short_mod,
    moderate: moderate_mod,
    long: long_mod,
  };

  // --- Defuzzification ---
  let numerator = 0.0;
  let denominator = 0.0;

  for (const [label, strengths] of Object.entries(buckets)) {
    const crispValue =
      sets.duration_values[label as keyof typeof sets.duration_values];
    for (const strength of strengths) {
      numerator += strength * crispValue; // Weighted contribution
      denominator += strength; // Total weight
    }
  }

  // Debugging: Log buckets and label_mod to verify calculations
  console.log("Buckets:", buckets);
  console.log("Label Modifiers:", label_mod);

  // Debugging: Log inputs and membership function outputs
  console.log("Inputs:", inputs);
  console.log("Task Complexity Memberships:", {
    low: sets.taskComplexity.low(inputs.taskComplexity),
    medium: sets.taskComplexity.medium(inputs.taskComplexity),
    high: sets.taskComplexity.high(inputs.taskComplexity),
  });
  console.log("Energy Level Memberships:", {
    low: sets.energyLevel.low(inputs.energyLevel),
    medium: sets.energyLevel.medium(inputs.energyLevel),
    high: sets.energyLevel.high(inputs.energyLevel),
  });
  console.log("Task Priority Memberships:", {
    low: sets.taskPriority.low(inputs.taskPriority),
    medium: sets.taskPriority.medium(inputs.taskPriority),
    high: sets.taskPriority.high(inputs.taskPriority),
  });

  if (denominator === 0.0) {
    console.warn("No rules activated. Returning default value.");
    return sets.duration_values.moderate; // Default value
  }

  const result = numerator / denominator; // Weighted average
  return Math.round(result * 100) / 100;
}
