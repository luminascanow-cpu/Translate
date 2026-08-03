import os

with open('src/data/alphabets.ts', 'r') as f:
    content = f.read()

with open('scratch/additional_alphabets.txt', 'r') as f:
    new_alphabets = f.read()

content = content.replace("    }\n  ]\n};\n", "    }\n  ],\n" + new_alphabets + "\n};\n")

with open('src/data/alphabets.ts', 'w') as f:
    f.write(content)
