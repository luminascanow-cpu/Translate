import json
import os

os.system('git checkout HEAD~1 -- src/data/alphabets.ts')

with open('scratch/additional_alphabets.txt', 'r') as f:
    text = f.read()

# Make it valid JSON by wrapping in {}
if text.strip().endswith(','):
    text = text.strip()[:-1]

json_text = "{" + text + "}"
try:
    data = json.loads(json_text)
except Exception as e:
    print("Error parsing JSON:", e)
    # manual parse
    pass

output = ""
for lang, obj in data.items():
    output += f'\nEXTENDED_ALPHABETS["{lang}"] = ' + json.dumps(obj, indent=2) + ';\n'

with open('src/data/alphabets.ts', 'a') as f:
    f.write(output)
