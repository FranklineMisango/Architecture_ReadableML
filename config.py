import yaml

yaml_data = """
- color: '#000000'
  name: __background__
- color: '#00ff00'
  name: C1
- color: '#c061cb'
  name: C2
- color: '#ffbe6f'
  name: F1
- color: '#e66100'
  name: F3
- color: '#c01c28'
  name: F4
- color: '#1a5fb4'
  name: W1
- color: '#63452c'
  name: W2
- color: '#c0bfbc'
  name: F2
- color: '#26a269'
  name: W3
- color: '#e5a50a'
  name: W4
- color: '#7c8386'
  name: W1_0
- color: '#d241a1'
  name: W1_30
- color: '#7a9cd4'
  name: W1_60
- color: '#d8b1ac'
  name: W1_90
- color: '#f29748'
  name: W2_0
- color: '#27d43d'
  name: W2_30
- color: '#38c073'
  name: W2_60
- color: '#6e4099'
  name: W2_90
- color: '#53b354'
  name: W3_0
- color: '#d3773c'
  name: W3_30
- color: '#b16e44'
  name: W3_60
- color: '#54c1b4'
  name: W3_90
- color: '#55a1e6'
  name: W4_0
- color: '#b1d5ef'
  name: W4_30
- color: '#e4ad58'
  name: W4_60
- color: '#7b5f97'
  name: W4_90
- color: '#ff2b9a'
  name: F7
- color: '#49b5e7'
  name: F8
- color: '#f4e33e'
  name: F9
- color: '#72c6e1'
  name: F10
- color: '#f78fbb'
  name: F11
- color: '#e09344'
  name: F12
- color: '#6ce050'
  name: F13
- color: '#8e5f8d'
  name: F14
- color: '#cf1a35'
  name: F15
- color: '#4ea267'
  name: F16
- color: '#3d4499'
  name: F17
- color: '#8bcf8a'
  name: F18
- color: '#acbb45'
  name: F19
- color: '#ae1a8d'
  name: F20
- color: '#6d4ba3'
  name: F21
- color: '#8f4994'
  name: F23
- color: '#ad5b2e'
  name: F24
- color: '#449c52'
  name: F25
- color: '#a7e888'
  name: F26
- color: '#977c3b'
  name: F27
- color: '#db8957'
  name: F28
- color: '#4c57e4'
  name: F29
- color: '#7ca174'
  name: F30
- color: '#dc77a8'
  name: F31
- color: '#f6886a'
  name: F32
- color: '#e187cb'
  name: F33
- color: '#0c1bb8'
  name: F6
- color: '#000000'
  name: F5
- color: '#d22885'
  name: F22
"""

data = yaml.safe_load(yaml_data)

ALL_CLASSES = ['background'] + [item['name'].lower() for item in data if item['name'] != '__background__']
LABEL_COLORS_LIST = [(0, 0, 0)] + [tuple(int(item['color'][i:i+2], 16) for i in (1, 3, 5)) for item in data if item['name'] != '__background__']
