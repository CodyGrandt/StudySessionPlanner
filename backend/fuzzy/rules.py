from typing import Tuple, Dict
from . import sets

Inputs = Dict[str, float]

def _and(*vals: float) -> float:
    return min(vals) if vals else 0.0

# --- Low energy rules ---
def rule_low_short_low(i: Inputs): return _and(sets.energy["low"](i["energy"]), sets.time["short"](i["time"]), sets.urgency["low"](i["urgency"])), "short"
def rule_low_short_med(i: Inputs): return _and(sets.energy["low"](i["energy"]), sets.time["short"](i["time"]), sets.urgency["medium"](i["urgency"])), "short"
def rule_low_short_high(i: Inputs): return _and(sets.energy["low"](i["energy"]), sets.time["short"](i["time"]), sets.urgency["high"](i["urgency"])), "moderate"

def rule_low_mod_low(i: Inputs): return _and(sets.energy["low"](i["energy"]), sets.time["moderate"](i["time"]), sets.urgency["low"](i["urgency"])), "short"
def rule_low_mod_med(i: Inputs): return _and(sets.energy["low"](i["energy"]), sets.time["moderate"](i["time"]), sets.urgency["medium"](i["urgency"])), "moderate"
def rule_low_mod_high(i: Inputs): return _and(sets.energy["low"](i["energy"]), sets.time["moderate"](i["time"]), sets.urgency["high"](i["urgency"])), "moderate"

def rule_low_long_low(i: Inputs): return _and(sets.energy["low"](i["energy"]), sets.time["long"](i["time"]), sets.urgency["low"](i["urgency"])), "moderate"
def rule_low_long_med(i: Inputs): return _and(sets.energy["low"](i["energy"]), sets.time["long"](i["time"]), sets.urgency["medium"](i["urgency"])), "moderate"
def rule_low_long_high(i: Inputs): return _and(sets.energy["low"](i["energy"]), sets.time["long"](i["time"]), sets.urgency["high"](i["urgency"])), "long"

# --- Medium energy rules ---
def rule_med_short_low(i: Inputs): return _and(sets.energy["medium"](i["energy"]), sets.time["short"](i["time"]), sets.urgency["low"](i["urgency"])), "short"
def rule_med_short_med(i: Inputs): return _and(sets.energy["medium"](i["energy"]), sets.time["short"](i["time"]), sets.urgency["medium"](i["urgency"])), "moderate"
def rule_med_short_high(i: Inputs): return _and(sets.energy["medium"](i["energy"]), sets.time["short"](i["time"]), sets.urgency["high"](i["urgency"])), "moderate"

def rule_med_mod_low(i: Inputs): return _and(sets.energy["medium"](i["energy"]), sets.time["moderate"](i["time"]), sets.urgency["low"](i["urgency"])), "moderate"
def rule_med_mod_med(i: Inputs): return _and(sets.energy["medium"](i["energy"]), sets.time["moderate"](i["time"]), sets.urgency["medium"](i["urgency"])), "moderate"
def rule_med_mod_high(i: Inputs): return _and(sets.energy["medium"](i["energy"]), sets.time["moderate"](i["time"]), sets.urgency["high"](i["urgency"])), "long"

def rule_med_long_low(i: Inputs): return _and(sets.energy["medium"](i["energy"]), sets.time["long"](i["time"]), sets.urgency["low"](i["urgency"])), "moderate"
def rule_med_long_med(i: Inputs): return _and(sets.energy["medium"](i["energy"]), sets.time["long"](i["time"]), sets.urgency["medium"](i["urgency"])), "long"
def rule_med_long_high(i: Inputs): return _and(sets.energy["medium"](i["energy"]), sets.time["long"](i["time"]), sets.urgency["high"](i["urgency"])), "long"

# --- High energy rules ---
def rule_high_short_low(i: Inputs): return _and(sets.energy["high"](i["energy"]), sets.time["short"](i["time"]), sets.urgency["low"](i["urgency"])), "moderate"
def rule_high_short_med(i: Inputs): return _and(sets.energy["high"](i["energy"]), sets.time["short"](i["time"]), sets.urgency["medium"](i["urgency"])), "moderate"
def rule_high_short_high(i: Inputs): return _and(sets.energy["high"](i["energy"]), sets.time["short"](i["time"]), sets.urgency["high"](i["urgency"])), "long"

def rule_high_mod_low(i: Inputs): return _and(sets.energy["high"](i["energy"]), sets.time["moderate"](i["time"]), sets.urgency["low"](i["urgency"])), "moderate"
def rule_high_mod_med(i: Inputs): return _and(sets.energy["high"](i["energy"]), sets.time["moderate"](i["time"]), sets.urgency["medium"](i["urgency"])), "long"
def rule_high_mod_high(i: Inputs): return _and(sets.energy["high"](i["energy"]), sets.time["moderate"](i["time"]), sets.urgency["high"](i["urgency"])), "long"

def rule_high_long_low(i: Inputs): return _and(sets.energy["high"](i["energy"]), sets.time["long"](i["time"]), sets.urgency["low"](i["urgency"])), "long"
def rule_high_long_med(i: Inputs): return _and(sets.energy["high"](i["energy"]), sets.time["long"](i["time"]), sets.urgency["medium"](i["urgency"])), "long"
def rule_high_long_high(i: Inputs): return _and(sets.energy["high"](i["energy"]), sets.time["long"](i["time"]), sets.urgency["high"](i["urgency"])), "long"

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
