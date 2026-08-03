import json

alphabets = {
    "Malayalam": {
        "summary": {
            "total": 53,
            "breakdown": "Vowels (Swarangal): 15, Consonants (Vyanjanangal): 38"
        },
        "sections": [
            {
                "title": "Vowels (Swarangal)",
                "description": "15 vowels",
                "letters": [
                    {"letter": "അ", "transliteration": "a"},
                    {"letter": "ആ", "transliteration": "aa"},
                    {"letter": "ഇ", "transliteration": "i"},
                    {"letter": "ഈ", "transliteration": "ii"},
                    {"letter": "ഉ", "transliteration": "u"},
                    {"letter": "ഊ", "transliteration": "uu"},
                    {"letter": "ഋ", "transliteration": "ru"},
                    {"letter": "എ", "transliteration": "e"},
                    {"letter": "ഏ", "transliteration": "ee"},
                    {"letter": "ഐ", "transliteration": "ai"},
                    {"letter": "ഒ", "transliteration": "o"},
                    {"letter": "ഓ", "transliteration": "oo"},
                    {"letter": "ഔ", "transliteration": "au"},
                    {"letter": "അം", "transliteration": "am"},
                    {"letter": "അഃ", "transliteration": "ah"}
                ]
            },
            {
                "title": "Consonants (Vyanjanangal)",
                "description": "38 consonants",
                "letters": [
                    {"letter": "ക", "transliteration": "ka"},
                    {"letter": "ഖ", "transliteration": "kha"},
                    {"letter": "ഗ", "transliteration": "ga"},
                    {"letter": "ഘ", "transliteration": "gha"},
                    {"letter": "ങ", "transliteration": "nga"},
                    {"letter": "ച", "transliteration": "cha"},
                    {"letter": "ഛ", "transliteration": "chha"},
                    {"letter": "ജ", "transliteration": "ja"},
                    {"letter": "ഝ", "transliteration": "jha"},
                    {"letter": "ഞ", "transliteration": "nya"},
                    {"letter": "ട", "transliteration": "ta"},
                    {"letter": "ഠ", "transliteration": "tha"},
                    {"letter": "ഡ", "transliteration": "da"},
                    {"letter": "ഢ", "transliteration": "dha"},
                    {"letter": "ണ", "transliteration": "na"},
                    {"letter": "ത", "transliteration": "ta"},
                    {"letter": "ഥ", "transliteration": "tha"},
                    {"letter": "ദ", "transliteration": "da"},
                    {"letter": "ധ", "transliteration": "dha"},
                    {"letter": "ന", "transliteration": "na"},
                    {"letter": "പ", "transliteration": "pa"},
                    {"letter": "ഫ", "transliteration": "pha"},
                    {"letter": "ബ", "transliteration": "ba"},
                    {"letter": "ഭ", "transliteration": "bha"},
                    {"letter": "മ", "transliteration": "ma"},
                    {"letter": "യ", "transliteration": "ya"},
                    {"letter": "ര", "transliteration": "ra"},
                    {"letter": "ല", "transliteration": "la"},
                    {"letter": "വ", "transliteration": "va"},
                    {"letter": "ശ", "transliteration": "sha"},
                    {"letter": "ഷ", "transliteration": "sha"},
                    {"letter": "സ", "transliteration": "sa"},
                    {"letter": "ഹ", "transliteration": "ha"},
                    {"letter": "ള", "transliteration": "la"},
                    {"letter": "ഴ", "transliteration": "zha"},
                    {"letter": "റ", "transliteration": "ra"}
                ]
            }
        ]
    },
    "Kannada": {
        "summary": {
            "total": 49,
            "breakdown": "Vowels (Swaragalu): 15, Consonants (Vyanjanagalu): 34"
        },
        "sections": [
            {
                "title": "Vowels (Swaragalu)",
                "description": "15 vowels",
                "letters": [
                    {"letter": "ಅ", "transliteration": "a"},
                    {"letter": "ಆ", "transliteration": "aa"},
                    {"letter": "ಇ", "transliteration": "i"},
                    {"letter": "ಈ", "transliteration": "ii"},
                    {"letter": "ಉ", "transliteration": "u"},
                    {"letter": "ಊ", "transliteration": "uu"},
                    {"letter": "ಋ", "transliteration": "ru"},
                    {"letter": "ಎ", "transliteration": "e"},
                    {"letter": "ಏ", "transliteration": "ee"},
                    {"letter": "ಐ", "transliteration": "ai"},
                    {"letter": "ಒ", "transliteration": "o"},
                    {"letter": "ಓ", "transliteration": "oo"},
                    {"letter": "ಔ", "transliteration": "au"},
                    {"letter": "ಅಂ", "transliteration": "am"},
                    {"letter": "ಅಃ", "transliteration": "ah"}
                ]
            },
            {
                "title": "Consonants (Vyanjanagalu)",
                "description": "34 consonants",
                "letters": [
                    {"letter": "ಕ", "transliteration": "ka"},
                    {"letter": "ಖ", "transliteration": "kha"},
                    {"letter": "ಗ", "transliteration": "ga"},
                    {"letter": "ಘ", "transliteration": "gha"},
                    {"letter": "ಙ", "transliteration": "nga"},
                    {"letter": "ಚ", "transliteration": "cha"},
                    {"letter": "ಛ", "transliteration": "chha"},
                    {"letter": "ಜ", "transliteration": "ja"},
                    {"letter": "ಝ", "transliteration": "jha"},
                    {"letter": "ಞ", "transliteration": "nya"},
                    {"letter": "ಟ", "transliteration": "ta"},
                    {"letter": "ಠ", "transliteration": "tha"},
                    {"letter": "ಡ", "transliteration": "da"},
                    {"letter": "ಢ", "transliteration": "dha"},
                    {"letter": "ಣ", "transliteration": "na"},
                    {"letter": "ತ", "transliteration": "ta"},
                    {"letter": "ಥ", "transliteration": "tha"},
                    {"letter": "ದ", "transliteration": "da"},
                    {"letter": "ಧ", "transliteration": "dha"},
                    {"letter": "ನ", "transliteration": "na"},
                    {"letter": "ಪ", "transliteration": "pa"},
                    {"letter": "ಫ", "transliteration": "pha"},
                    {"letter": "ಬ", "transliteration": "ba"},
                    {"letter": "ಭ", "transliteration": "bha"},
                    {"letter": "ಮ", "transliteration": "ma"},
                    {"letter": "ಯ", "transliteration": "ya"},
                    {"letter": "ರ", "transliteration": "ra"},
                    {"letter": "ಲ", "transliteration": "la"},
                    {"letter": "ವ", "transliteration": "va"},
                    {"letter": "ಶ", "transliteration": "sha"},
                    {"letter": "ಷ", "transliteration": "sha"},
                    {"letter": "ಸ", "transliteration": "sa"},
                    {"letter": "ಹ", "transliteration": "ha"},
                    {"letter": "ಳ", "transliteration": "la"}
                ]
            }
        ]
    },
    "Gujarati": {
        "summary": {
            "total": 47,
            "breakdown": "Vowels (Swar): 13, Consonants (Vyanjan): 34"
        },
        "sections": [
            {
                "title": "Vowels (Swar)",
                "description": "13 vowels",
                "letters": [
                    {"letter": "અ", "transliteration": "a"},
                    {"letter": "આ", "transliteration": "aa"},
                    {"letter": "ઇ", "transliteration": "i"},
                    {"letter": "ઈ", "transliteration": "ii"},
                    {"letter": "ઉ", "transliteration": "u"},
                    {"letter": "ઊ", "transliteration": "uu"},
                    {"letter": "ઋ", "transliteration": "ru"},
                    {"letter": "એ", "transliteration": "e"},
                    {"letter": "ઐ", "transliteration": "ai"},
                    {"letter": "ઓ", "transliteration": "o"},
                    {"letter": "ઔ", "transliteration": "au"},
                    {"letter": "અં", "transliteration": "am"},
                    {"letter": "અઃ", "transliteration": "ah"}
                ]
            },
            {
                "title": "Consonants (Vyanjan)",
                "description": "34 consonants",
                "letters": [
                    {"letter": "ક", "transliteration": "ka"},
                    {"letter": "ખ", "transliteration": "kha"},
                    {"letter": "ગ", "transliteration": "ga"},
                    {"letter": "ઘ", "transliteration": "gha"},
                    {"letter": "ચ", "transliteration": "cha"},
                    {"letter": "છ", "transliteration": "chha"},
                    {"letter": "જ", "transliteration": "ja"},
                    {"letter": "ઝ", "transliteration": "zha"},
                    {"letter": "ટ", "transliteration": "ta"},
                    {"letter": "ઠ", "transliteration": "tha"},
                    {"letter": "ડ", "transliteration": "da"},
                    {"letter": "ઢ", "transliteration": "dha"},
                    {"letter": "ણ", "transliteration": "na"},
                    {"letter": "ત", "transliteration": "ta"},
                    {"letter": "થ", "transliteration": "tha"},
                    {"letter": "દ", "transliteration": "da"},
                    {"letter": "ધ", "transliteration": "dha"},
                    {"letter": "ન", "transliteration": "na"},
                    {"letter": "પ", "transliteration": "pa"},
                    {"letter": "ફ", "transliteration": "pha"},
                    {"letter": "બ", "transliteration": "ba"},
                    {"letter": "ભ", "transliteration": "bha"},
                    {"letter": "મ", "transliteration": "ma"},
                    {"letter": "ય", "transliteration": "ya"},
                    {"letter": "ર", "transliteration": "ra"},
                    {"letter": "લ", "transliteration": "la"},
                    {"letter": "વ", "transliteration": "va"},
                    {"letter": "શ", "transliteration": "sha"},
                    {"letter": "ષ", "transliteration": "sha"},
                    {"letter": "સ", "transliteration": "sa"},
                    {"letter": "હ", "transliteration": "ha"},
                    {"letter": "ળ", "transliteration": "la"},
                    {"letter": "ક્ષ", "transliteration": "ksha"},
                    {"letter": "જ્ઞ", "transliteration": "gna"}
                ]
            }
        ]
    },
    "Punjabi": {
        "summary": {
            "total": 41,
            "breakdown": "Vowels (Swar): 10, Consonants (Vyanjan): 31"
        },
        "sections": [
            {
                "title": "Vowels (Swar)",
                "description": "10 vowels",
                "letters": [
                    {"letter": "ਅ", "transliteration": "a"},
                    {"letter": "ਆ", "transliteration": "aa"},
                    {"letter": "ਇ", "transliteration": "i"},
                    {"letter": "ਈ", "transliteration": "ii"},
                    {"letter": "ਉ", "transliteration": "u"},
                    {"letter": "ਊ", "transliteration": "uu"},
                    {"letter": "ਏ", "transliteration": "e"},
                    {"letter": "ਐ", "transliteration": "ai"},
                    {"letter": "ਓ", "transliteration": "o"},
                    {"letter": "ਔ", "transliteration": "au"}
                ]
            },
            {
                "title": "Consonants (Vyanjan)",
                "description": "31 consonants",
                "letters": [
                    {"letter": "ਕ", "transliteration": "ka"},
                    {"letter": "ਖ", "transliteration": "kha"},
                    {"letter": "ਗ", "transliteration": "ga"},
                    {"letter": "ਘ", "transliteration": "gha"},
                    {"letter": "ਙ", "transliteration": "nga"},
                    {"letter": "ਚ", "transliteration": "cha"},
                    {"letter": "ਛ", "transliteration": "chha"},
                    {"letter": "ਜ", "transliteration": "ja"},
                    {"letter": "ਝ", "transliteration": "jha"},
                    {"letter": "ਞ", "transliteration": "nya"},
                    {"letter": "ਟ", "transliteration": "ta"},
                    {"letter": "ਠ", "transliteration": "tha"},
                    {"letter": "ਡ", "transliteration": "da"},
                    {"letter": "ਢ", "transliteration": "dha"},
                    {"letter": "ਣ", "transliteration": "na"},
                    {"letter": "ਤ", "transliteration": "ta"},
                    {"letter": "ਥ", "transliteration": "tha"},
                    {"letter": "ਦ", "transliteration": "da"},
                    {"letter": "ਧ", "transliteration": "dha"},
                    {"letter": "ਨ", "transliteration": "na"},
                    {"letter": "ਪ", "transliteration": "pa"},
                    {"letter": "ਫ", "transliteration": "pha"},
                    {"letter": "ਬ", "transliteration": "ba"},
                    {"letter": "ਭ", "transliteration": "bha"},
                    {"letter": "ਮ", "transliteration": "ma"},
                    {"letter": "ਯ", "transliteration": "ya"},
                    {"letter": "ਰ", "transliteration": "ra"},
                    {"letter": "ਲ", "transliteration": "la"},
                    {"letter": "ਵ", "transliteration": "va"},
                    {"letter": "ੜ", "transliteration": "rha"},
                    {"letter": "ਸ", "transliteration": "sa"},
                    {"letter": "ਹ", "transliteration": "ha"}
                ]
            }
        ]
    },
    "Odia": {
        "summary": {
            "total": 51,
            "breakdown": "Vowels (Swara): 12, Consonants (Byanjana): 39"
        },
        "sections": [
            {
                "title": "Vowels (Swara)",
                "description": "12 vowels",
                "letters": [
                    {"letter": "ଅ", "transliteration": "a"},
                    {"letter": "ଆ", "transliteration": "aa"},
                    {"letter": "ଇ", "transliteration": "i"},
                    {"letter": "ଈ", "transliteration": "ii"},
                    {"letter": "ଉ", "transliteration": "u"},
                    {"letter": "ଊ", "transliteration": "uu"},
                    {"letter": "ଋ", "transliteration": "ru"},
                    {"letter": "ଏ", "transliteration": "e"},
                    {"letter": "ଐ", "transliteration": "ai"},
                    {"letter": "ଓ", "transliteration": "o"},
                    {"letter": "ଔ", "transliteration": "au"},
                    {"letter": "ଅଂ", "transliteration": "am"},
                    {"letter": "ଅଃ", "transliteration": "ah"}
                ]
            },
            {
                "title": "Consonants (Byanjana)",
                "description": "39 consonants",
                "letters": [
                    {"letter": "କ", "transliteration": "ka"},
                    {"letter": "ଖ", "transliteration": "kha"},
                    {"letter": "ଗ", "transliteration": "ga"},
                    {"letter": "ଘ", "transliteration": "gha"},
                    {"letter": "ଙ", "transliteration": "nga"},
                    {"letter": "ଚ", "transliteration": "cha"},
                    {"letter": "ଛ", "transliteration": "chha"},
                    {"letter": "ଜ", "transliteration": "ja"},
                    {"letter": "ଝ", "transliteration": "jha"},
                    {"letter": "ଞ", "transliteration": "nya"},
                    {"letter": "ଟ", "transliteration": "ta"},
                    {"letter": "ଠ", "transliteration": "tha"},
                    {"letter": "ଡ", "transliteration": "da"},
                    {"letter": "ଢ", "transliteration": "dha"},
                    {"letter": "ଣ", "transliteration": "na"},
                    {"letter": "ତ", "transliteration": "ta"},
                    {"letter": "ଥ", "transliteration": "tha"},
                    {"letter": "ଦ", "transliteration": "da"},
                    {"letter": "ଧ", "transliteration": "dha"},
                    {"letter": "ନ", "transliteration": "na"},
                    {"letter": "ପ", "transliteration": "pa"},
                    {"letter": "ଫ", "transliteration": "pha"},
                    {"letter": "ବ", "transliteration": "ba"},
                    {"letter": "ଭ", "transliteration": "bha"},
                    {"letter": "ମ", "transliteration": "ma"},
                    {"letter": "ଯ", "transliteration": "ya"},
                    {"letter": "ର", "transliteration": "ra"},
                    {"letter": "ଲ", "transliteration": "la"},
                    {"letter": "ଳ", "transliteration": "la"},
                    {"letter": "ୱ", "transliteration": "wa"},
                    {"letter": "ଶ", "transliteration": "sha"},
                    {"letter": "ଷ", "transliteration": "sha"},
                    {"letter": "ସ", "transliteration": "sa"},
                    {"letter": "ହ", "transliteration": "ha"},
                    {"letter": "କ୍ଷ", "transliteration": "ksha"}
                ]
            }
        ]
    }
}

import pprint
out_lines = []
for lang, data in alphabets.items():
    out_lines.append(f'  "{lang}": {json.dumps(data, indent=4)},')

with open('scratch/additional_alphabets.txt', 'w') as f:
    f.write('\n'.join(out_lines))
