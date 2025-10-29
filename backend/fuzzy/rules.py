from typing import Tuple, Dict
from . import sets

Inputs = Dict[str, float]

def _and(*vals: float) -> float:
    return min(vals) if vals else 0.0

# Expanded ruleset
def rule_low_energy_low_urgency(inputs: Inputs) -> Tuple[float, str]:
    return _and(sets.energy["low"](inputs["energy"]),
                sets.urgency["low"](inputs["urgency"])), "short"

def rule_low_energy_high_urgency(inputs: Inputs) -> Tuple[float, str]:
    return _and(sets.energy["low"](inputs["energy"]),
                sets.urgency["high"](inputs["urgency"])), "moderate"

def rule_medium_energy_medium_urgency(inputs: Inputs) -> Tuple[float, str]:
    return _and(sets.energy["medium"](inputs["energy"]),
                sets.urgency["medium"](inputs["urgency"])), "moderate"

def rule_high_energy_low_time(inputs: Inputs) -> Tuple[float, str]:
    return _and(sets.energy["high"](inputs["energy"]),
                sets.time["short"](inputs["time"])), "moderate"

def rule_high_energy_high_urgency(inputs: Inputs) -> Tuple[float, str]:
    return _and(sets.energy["high"](inputs["energy"]),
                sets.urgency["high"](inputs["urgency"])), "long"

def rule_long_time_low_urgency(inputs: Inputs) -> Tuple[float, str]:
    return _and(sets.time["long"](inputs["time"]),
                sets.urgency["low"](inputs["urgency"])), "moderate"

def rule_high_energy_long_time(inputs: Inputs) -> Tuple[float, str]:
    return _and(sets.energy["high"](inputs["energy"]),
                sets.time["long"](inputs["time"])), "long"

rules = [
    rule_low_energy_low_urgency,
    rule_low_energy_high_urgency,
    rule_medium_energy_medium_urgency,
    rule_high_energy_low_time,
    rule_high_energy_high_urgency,
    rule_long_time_low_urgency,
    rule_high_energy_long_time,
]
