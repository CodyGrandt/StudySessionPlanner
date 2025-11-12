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
  const u_low = sets.urgency.low(inputs.urgency);
  const u_med = sets.urgency.medium(inputs.urgency);
  const u_high = sets.urgency.high(inputs.urgency);

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
    const mod = label_mod[label as keyof typeof label_mod];
    for (const s of strengths) {
      const w = s * mod;
      numerator +=
        sets.duration_values[label as keyof typeof sets.duration_values] * w;
      denominator += w;
    }
  }

  if (denominator === 0.0) {
    return sets.duration_values.moderate;
  }

  let result = numerator / denominator;

  // --- Feasibility cap ---
  result = Math.min(result, inputs.time);

  return Math.round(result * 100) / 100;
}
