from typing import Tuple, Dict
from . import sets

Inputs = Dict[str, float]

def _and(*vals: float) -> float:
    return min(vals) if vals else 0.0

def rule_low_short_low(inputs: Inputs): 
    return _and(sets.energy["low"](inputs["energy"]),
                sets.time["short"](inputs["time"]),
                sets.urgency["low"](inputs["urgency"])), "short"

def rule_low_short_med(inputs: Inputs): 
    return _and(sets.energy["low"](inputs["energy"]),
                sets.time["short"](inputs["time"]),
                sets.urgency["medium"](inputs["urgency"])), "short"

def rule_low_short_high(inputs: Inputs): 
    return _and(sets.energy["low"](inputs["energy"]),
                sets.time["short"](inputs["time"]),
                sets.urgency["high"](inputs["urgency"])), "moderate"

def rule_low_mod_low(inputs: Inputs): 
    return _and(sets.energy["low"](inputs["energy"]),
                sets.time["moderate"](inputs["time"]),
                sets.urgency["low"](inputs["urgency"])), "short"

def rule_low_mod_med(inputs: Inputs): 
    return _and(sets.energy["low"](inputs["energy"]),
                sets.time["moderate"](inputs["time"]),
                sets.urgency["medium"](inputs["urgency"])), "moderate"

def rule_low_mod_high(inputs: Inputs): 
    return _and(sets.energy["low"](inputs["energy"]),
                sets.time["moderate"](inputs["time"]),
                sets.urgency["high"](inputs["urgency"])), "moderate"

def rule_low_long_low(inputs: Inputs): 
    return _and(sets.energy["low"](inputs["energy"]),
                sets.time["long"](inputs["time"]),
                sets.urgency["low"](inputs["urgency"])), "moderate"

def rule_low_long_med(inputs: Inputs): 
    return _and(sets.energy["low"](inputs["energy"]),
                sets.time["long"](inputs["time"]),
                sets.urgency["medium"](inputs["urgency"])), "moderate"

def rule_low_long_high(inputs: Inputs): 
    return _and(sets.energy["low"](inputs["energy"]),
                sets.time["long"](inputs["time"]),
                sets.urgency["high"](inputs["urgency"])), "long"

# --- Medium energy rules ---
def rule_med_short_low(inputs: Inputs): 
    return _and(sets.energy["medium"](inputs["energy"]),
                sets.time["short"](inputs["time"]),
                sets.urgency["low"](inputs["urgency"])), "short"

def rule_med_short_med(inputs: Inputs): 
    return _and(sets.energy["medium"](inputs["energy"]),
                sets.time["short"](inputs["time"]),
                sets.urgency["medium"](inputs["urgency"])), "moderate"

def rule_med_short_high(inputs: Inputs): 
    return _and(sets.energy["medium"](inputs["energy"]),
                sets.time["short"](inputs["time"]),
                sets.urgency["high"](inputs["urgency"])), "moderate"

def rule_med_mod_low(inputs: Inputs): 
    return _and(sets.energy["medium"](inputs["energy"]),
                sets.time["moderate"](inputs["time"]),
                sets.urgency["low"](inputs["urgency"])), "moderate"

def rule_med_mod_med(inputs: Inputs): 
    return _and(sets.energy["medium"](inputs["energy"]),
                sets.time["moderate"](inputs["time"]),
                sets.urgency["medium"](inputs["urgency"])), "moderate"

def rule_med_mod_high(inputs: Inputs): 
    return _and(sets.energy["medium"](inputs["energy"]),
                sets.time["moderate"](inputs["time"]),
                sets.urgency["high"](inputs["urgency"])), "long"

def rule_med_long_low(inputs: Inputs): 
    return _and(sets.energy["medium"](inputs["energy"]),
                sets.time["long"](inputs["time"]),
                sets.urgency["low"](inputs["urgency"])), "moderate"

def rule_med_long_med(inputs: Inputs): 
    return _and(sets.energy["medium"](inputs["energy"]),
                sets.time["long"](inputs["time"]),
                sets.urgency["medium"](inputs["urgency"])), "long"

def rule_med_long_high(inputs: Inputs): 
    return _and(sets.energy["medium"](inputs["energy"]),
                sets.time["long"](inputs["time"]),
                sets.urgency["high"](inputs["urgency"])), "long"

# --- High energy rules ---
def rule_high_short_low(inputs: Inputs): 
    return _and(sets.energy["high"](inputs["energy"]),
                sets.time["short"](inputs["time"]),
                sets.urgency["low"](inputs["urgency"])), "moderate"

def rule_high_short_med(inputs: Inputs): 
    return _and(sets.energy["high"](inputs["energy"]),
                sets.time["short"](inputs["time"]),
                sets.urgency["medium"](inputs["urgency"])), "moderate"

def rule_high_short_high(inputs: Inputs): 
    return _and(sets.energy["high"](inputs["energy"]),
                sets.time["short"](inputs["time"]),
                sets.urgency["high"](inputs["urgency"])), "long"

def rule_high_mod_low(inputs: Inputs): 
    return _and(sets.energy["high"](inputs["energy"]),
                sets.time["moderate"](inputs["time"]),
                sets.urgency["low"](inputs["urgency"])), "moderate"

def rule_high_mod_med(inputs: Inputs): 
    return _and(sets.energy["high"](inputs["energy"]),
                sets.time["moderate"](inputs["time"]),
                sets.urgency["medium"](inputs["urgency"])), "long"

def rule_high_mod_high(inputs: Inputs): 
    return _and(sets.energy["high"](inputs["energy"]),
                sets.time["moderate"](inputs["time"]),
                sets.urgency["high"](inputs["urgency"])), "long"

def rule_high_long_low(inputs: Inputs): 
    return _and(sets.energy["high"](inputs["energy"]),
                sets.time["long"](inputs["time"]),
                sets.urgency["low"](inputs["urgency"])), "long"

def rule_high_long_med(inputs: Inputs): 
    return _and(sets.energy["high"](inputs["energy"]),
                sets.time["long"](inputs["time"]),
                sets.urgency["medium"](inputs["urgency"])), "long"

def rule_high_long_high(inputs: Inputs): 
    return _and(sets.energy["high"](inputs["energy"]),
                sets.time["long"](inputs["time"]),
                sets.urgency["high"](inputs["urgency"])), "long"

# Collect all rules
rules = [
    rule_low_short_low, rule_low_short_med, rule_low_short_high,
    rule_low_mod_low, rule_low_mod_med, rule_low_mod_high,
    rule_low_long_low, rule_low_long_med, rule_low_long_high,
    rule_med_short_low, rule_med_short_med, rule_med_short_high,
    rule_med_mod_low, rule_med_mod_med, rule_med_mod_high,
    rule_med_long_low, rule_med_long_med, rule_med_long_high,
    rule_high_short_low, rule_high_short_med, rule_high_short_high,
    rule_high_mod_low, rule_high_mod_med, rule_high_mod_high,
    rule_high_long_low, rule_high_long_med, rule_high_long_high,
]
