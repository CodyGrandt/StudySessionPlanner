from typing import Dict, List
from . import sets, rules

def evaluate(inputs: Dict[str, float]) -> float:
    """
    Apply rules, aggregate outputs, and defuzzify
    via weighted average of all activations.
    """
    buckets: Dict[str, List[float]] = {"short": [], "moderate": [], "long": []}

    # Fire rules
    for rule in rules.rules:
        strength, label = rule(inputs)
        if strength > 0:
            buckets[label].append(strength)

    # Weighted average of all activations
    numerator = 0.0
    denominator = 0.0
    for label, strengths in buckets.items():
        for s in strengths:
            numerator += sets.duration_values[label] * s
            denominator += s

    if denominator == 0.0:
        return 0.0

    result = numerator / denominator
    return round(result, 2)
