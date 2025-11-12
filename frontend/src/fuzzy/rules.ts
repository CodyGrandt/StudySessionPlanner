import * as sets from "./sets";

export interface Inputs {
  taskComplexity: number;
  energyLevel: number;
  taskPriority: number;
}

// Updated rules to use weighted contributions instead of strict _and conditions
function _weightedAnd(...vals: number[]): number {
  return vals.reduce((acc, val) => acc + val, 0) / vals.length; // Average of memberships
}

// --- LOW FOCUS LEVEL ---
const rule_low_focus_simple_task = (inputs: Inputs) =>
  [
    _weightedAnd(
      sets.energyLevel.low(inputs.energyLevel),
      sets.taskComplexity.low(inputs.taskComplexity),
      sets.taskPriority.low(inputs.taskPriority)
    ),
    "short",
  ] as const;

const rule_low_focus_moderate_task = (inputs: Inputs) =>
  [
    _weightedAnd(
      sets.energyLevel.low(inputs.energyLevel),
      sets.taskComplexity.medium(inputs.taskComplexity),
      sets.taskPriority.medium(inputs.taskPriority)
    ),
    "moderate",
  ] as const;

const rule_low_focus_complex_task = (inputs: Inputs) =>
  [
    _weightedAnd(
      sets.energyLevel.low(inputs.energyLevel),
      sets.taskComplexity.high(inputs.taskComplexity),
      sets.taskPriority.high(inputs.taskPriority)
    ),
    "moderate",
  ] as const;

// --- MEDIUM FOCUS LEVEL ---
const rule_medium_focus_simple_task = (inputs: Inputs) =>
  [
    _weightedAnd(
      sets.energyLevel.medium(inputs.energyLevel),
      sets.taskComplexity.low(inputs.taskComplexity),
      sets.taskPriority.low(inputs.taskPriority)
    ),
    "moderate",
  ] as const;

const rule_medium_focus_moderate_task = (inputs: Inputs) =>
  [
    _weightedAnd(
      sets.energyLevel.medium(inputs.energyLevel),
      sets.taskComplexity.medium(inputs.taskComplexity),
      sets.taskPriority.medium(inputs.taskPriority)
    ),
    "moderate",
  ] as const;

const rule_medium_focus_complex_task = (inputs: Inputs) =>
  [
    _weightedAnd(
      sets.energyLevel.medium(inputs.energyLevel),
      sets.taskComplexity.high(inputs.taskComplexity),
      sets.taskPriority.high(inputs.taskPriority)
    ),
    "long",
  ] as const;

// --- HIGH FOCUS LEVEL ---
const rule_high_focus_simple_task = (inputs: Inputs) =>
  [
    _weightedAnd(
      sets.energyLevel.high(inputs.energyLevel),
      sets.taskComplexity.low(inputs.taskComplexity),
      sets.taskPriority.low(inputs.taskPriority)
    ),
    "moderate",
  ] as const;

const rule_high_focus_moderate_task = (inputs: Inputs) =>
  [
    _weightedAnd(
      sets.energyLevel.high(inputs.energyLevel),
      sets.taskComplexity.medium(inputs.taskComplexity),
      sets.taskPriority.medium(inputs.taskPriority)
    ),
    "long",
  ] as const;

const rule_high_focus_complex_task = (inputs: Inputs) =>
  [
    _weightedAnd(
      sets.energyLevel.high(inputs.energyLevel),
      sets.taskComplexity.high(inputs.taskComplexity),
      sets.taskPriority.high(inputs.taskPriority)
    ),
    "long",
  ] as const;

// Add medium and high focus level rules to the exported rules
export const rules = [
  rule_low_focus_simple_task,
  rule_low_focus_moderate_task,
  rule_low_focus_complex_task,
  rule_medium_focus_simple_task,
  rule_medium_focus_moderate_task,
  rule_medium_focus_complex_task,
  rule_high_focus_simple_task,
  rule_high_focus_moderate_task,
  rule_high_focus_complex_task,
];
