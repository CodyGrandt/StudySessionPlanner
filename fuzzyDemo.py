import numpy as np
import skfuzzy as fuzz
import skfuzzy.control as ctrl
import matplotlib.pyplot as plot

# Define fuzzy variables
temperature = ctrl.Antecedent(np.arange(0, 41, 1), 'temperature') # Antecedent: input variables
fan_speed = ctrl.Consequent(np.arange(0, 101, 1), 'fan_speed') # Consequent: output variables

# Membership functions for temperature (defining a traingular membership function)
temperature['cold'] = fuzz.trimf(temperature.universe, [0, 0, 20])
temperature['warm'] = fuzz.trimf(temperature.universe, [10, 20, 30])
temperature['hot']  = fuzz.trimf(temperature.universe, [20, 40, 40])

# Membership functions for fan speed (defining a traingular membership function)
fan_speed['low']    = fuzz.trimf(fan_speed.universe, [0, 0, 50])
fan_speed['medium'] = fuzz.trimf(fan_speed.universe, [25, 50, 75])
fan_speed['high']   = fuzz.trimf(fan_speed.universe, [50, 100, 100])

# Define rules
rule1 = ctrl.Rule(temperature['cold'], fan_speed['low']) # If temp is cold, fan speed is low
rule2 = ctrl.Rule(temperature['warm'], fan_speed['medium']) # If temp is warm, fan speed is medium
rule3 = ctrl.Rule(temperature['hot'], fan_speed['high']) # If temp is hot, fan speed is high

# Build control system
fan_ctrl = ctrl.ControlSystem([rule1, rule2, rule3]) # bundles rules into one fuzzy inference system
fan_sim = ctrl.ControlSystemSimulation(fan_ctrl) # Allows user to provide inputs and receive outputs

# Test input
fan_sim.input['temperature'] = 28
fan_sim.compute()

print("Input temperature:", 28)
print("Output fan speed:", fan_sim.output['fan_speed'])

# Plot membership functions
temperature.view()
fan_speed.view()
plot.show()
