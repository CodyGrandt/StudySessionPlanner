import * as sets from "./sets";

export interface Inputs {
  energy: number;
  time: number;
  urgency: number;
}

function _and(...vals: number[]): number {
  return vals.length > 0 ? Math.min(...vals) : 0.0;
}

// --- LOW ENERGY ---
const rule_low_energy_short_low_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.low(inputs.energy),
      sets.time.short(inputs.time),
      sets.urgency.low(inputs.urgency)
    ),
    "short",
  ] as const;

const rule_low_energy_short_medium_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.low(inputs.energy),
      sets.time.short(inputs.time),
      sets.urgency.medium(inputs.urgency)
    ),
    "short",
  ] as const;

const rule_low_energy_short_high_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.low(inputs.energy),
      sets.time.short(inputs.time),
      sets.urgency.high(inputs.urgency)
    ),
    "moderate",
  ] as const;

const rule_low_energy_moderate_low_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.low(inputs.energy),
      sets.time.moderate(inputs.time),
      sets.urgency.low(inputs.urgency)
    ),
    "short",
  ] as const;

const rule_low_energy_moderate_medium_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.low(inputs.energy),
      sets.time.moderate(inputs.time),
      sets.urgency.medium(inputs.urgency)
    ),
    "moderate",
  ] as const;

const rule_low_energy_moderate_high_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.low(inputs.energy),
      sets.time.moderate(inputs.time),
      sets.urgency.high(inputs.urgency)
    ),
    "moderate",
  ] as const;

const rule_low_energy_long_low_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.low(inputs.energy),
      sets.time.long(inputs.time),
      sets.urgency.low(inputs.urgency)
    ),
    "moderate",
  ] as const;

const rule_low_energy_long_medium_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.low(inputs.energy),
      sets.time.long(inputs.time),
      sets.urgency.medium(inputs.urgency)
    ),
    "moderate",
  ] as const;

const rule_low_energy_long_high_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.low(inputs.energy),
      sets.time.long(inputs.time),
      sets.urgency.high(inputs.urgency)
    ),
    "moderate",
  ] as const;

// --- MEDIUM ENERGY ---
const rule_medium_energy_short_low_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.medium(inputs.energy),
      sets.time.short(inputs.time),
      sets.urgency.low(inputs.urgency)
    ),
    "short",
  ] as const;

const rule_medium_energy_short_medium_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.medium(inputs.energy),
      sets.time.short(inputs.time),
      sets.urgency.medium(inputs.urgency)
    ),
    "moderate",
  ] as const;

const rule_medium_energy_short_high_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.medium(inputs.energy),
      sets.time.short(inputs.time),
      sets.urgency.high(inputs.urgency)
    ),
    "moderate",
  ] as const;

const rule_medium_energy_moderate_low_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.medium(inputs.energy),
      sets.time.moderate(inputs.time),
      sets.urgency.low(inputs.urgency)
    ),
    "moderate",
  ] as const;

const rule_medium_energy_moderate_medium_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.medium(inputs.energy),
      sets.time.moderate(inputs.time),
      sets.urgency.medium(inputs.urgency)
    ),
    "moderate",
  ] as const;

const rule_medium_energy_moderate_high_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.medium(inputs.energy),
      sets.time.moderate(inputs.time),
      sets.urgency.high(inputs.urgency)
    ),
    "long",
  ] as const;

const rule_medium_energy_long_low_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.medium(inputs.energy),
      sets.time.long(inputs.time),
      sets.urgency.low(inputs.urgency)
    ),
    "moderate",
  ] as const;

const rule_medium_energy_long_medium_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.medium(inputs.energy),
      sets.time.long(inputs.time),
      sets.urgency.medium(inputs.urgency)
    ),
    "long",
  ] as const;

const rule_medium_energy_long_high_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.medium(inputs.energy),
      sets.time.long(inputs.time),
      sets.urgency.high(inputs.urgency)
    ),
    "long",
  ] as const;

// --- HIGH ENERGY ---
const rule_high_energy_short_low_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.high(inputs.energy),
      sets.time.short(inputs.time),
      sets.urgency.low(inputs.urgency)
    ),
    "moderate",
  ] as const;

const rule_high_energy_short_medium_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.high(inputs.energy),
      sets.time.short(inputs.time),
      sets.urgency.medium(inputs.urgency)
    ),
    "moderate",
  ] as const;

const rule_high_energy_short_high_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.high(inputs.energy),
      sets.time.short(inputs.time),
      sets.urgency.high(inputs.urgency)
    ),
    "moderate",
  ] as const;

const rule_high_energy_moderate_low_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.high(inputs.energy),
      sets.time.moderate(inputs.time),
      sets.urgency.low(inputs.urgency)
    ),
    "moderate",
  ] as const;

const rule_high_energy_moderate_medium_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.high(inputs.energy),
      sets.time.moderate(inputs.time),
      sets.urgency.medium(inputs.urgency)
    ),
    "long",
  ] as const;

const rule_high_energy_moderate_high_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.high(inputs.energy),
      sets.time.moderate(inputs.time),
      sets.urgency.high(inputs.urgency)
    ),
    "long",
  ] as const;

const rule_high_energy_long_low_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.high(inputs.energy),
      sets.time.long(inputs.time),
      sets.urgency.low(inputs.urgency)
    ),
    "long",
  ] as const;

const rule_high_energy_long_medium_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.high(inputs.energy),
      sets.time.long(inputs.time),
      sets.urgency.medium(inputs.urgency)
    ),
    "long",
  ] as const;

const rule_high_energy_long_high_urgency = (inputs: Inputs) =>
  [
    _and(
      sets.energy.high(inputs.energy),
      sets.time.long(inputs.time),
      sets.urgency.high(inputs.urgency)
    ),
    "long",
  ] as const;

// --- Collect all rules ---
export const rules = [
  // Low energy
  rule_low_energy_short_low_urgency,
  rule_low_energy_short_medium_urgency,
  rule_low_energy_short_high_urgency,
  rule_low_energy_moderate_low_urgency,
  rule_low_energy_moderate_medium_urgency,
  rule_low_energy_moderate_high_urgency,
  rule_low_energy_long_low_urgency,
  rule_low_energy_long_medium_urgency,
  rule_low_energy_long_high_urgency,

  // Medium energy
  rule_medium_energy_short_low_urgency,
  rule_medium_energy_short_medium_urgency,
  rule_medium_energy_short_high_urgency,
  rule_medium_energy_moderate_low_urgency,
  rule_medium_energy_moderate_medium_urgency,
  rule_medium_energy_moderate_high_urgency,
  rule_medium_energy_long_low_urgency,
  rule_medium_energy_long_medium_urgency,
  rule_medium_energy_long_high_urgency,

  // High energy
  rule_high_energy_short_low_urgency,
  rule_high_energy_short_medium_urgency,
  rule_high_energy_short_high_urgency,
  rule_high_energy_moderate_low_urgency,
  rule_high_energy_moderate_medium_urgency,
  rule_high_energy_moderate_high_urgency,
  rule_high_energy_long_low_urgency,
  rule_high_energy_long_medium_urgency,
  rule_high_energy_long_high_urgency,
];
