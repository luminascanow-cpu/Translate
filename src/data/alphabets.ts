export interface AlphabetItem {
  letter: string;
  transliteration: string;
}

export interface AlphabetSection {
  title: string;
  description: string;
  letters: AlphabetItem[];
}

export interface LanguageAlphabet {
  summary: {
    total: number;
    breakdown: string;
  };
  sections: AlphabetSection[];
}

export const EXTENDED_ALPHABETS: Record<string, LanguageAlphabet> = {
  "Tamil": {
    "summary": {
      "total": 247,
      "breakdown": "Vowels (Uyireluthu): 12, Consonants (Meyyeluthu): 18, Combined (Uyirmeyyeluthu): 216, Special (Aydha eluthu): 1"
    },
    "sections": [
      {
        "title": "Vowels (Uyireluthu)",
        "description": "12 independent vowels",
        "letters": [
          {
            "letter": "அ",
            "transliteration": ""
          },
          {
            "letter": "ஆ",
            "transliteration": ""
          },
          {
            "letter": "இ",
            "transliteration": ""
          },
          {
            "letter": "ஈ",
            "transliteration": ""
          },
          {
            "letter": "உ",
            "transliteration": ""
          },
          {
            "letter": "ஊ",
            "transliteration": ""
          },
          {
            "letter": "எ",
            "transliteration": ""
          },
          {
            "letter": "ஏ",
            "transliteration": ""
          },
          {
            "letter": "ஐ",
            "transliteration": ""
          },
          {
            "letter": "ஒ",
            "transliteration": ""
          },
          {
            "letter": "ஓ",
            "transliteration": ""
          },
          {
            "letter": "ஔ",
            "transliteration": ""
          }
        ]
      },
      {
        "title": "Consonants (Meyyeluthu)",
        "description": "18 pure consonants (with dot)",
        "letters": [
          {
            "letter": "க்",
            "transliteration": ""
          },
          {
            "letter": "ங்",
            "transliteration": ""
          },
          {
            "letter": "ச்",
            "transliteration": ""
          },
          {
            "letter": "ஞ்",
            "transliteration": ""
          },
          {
            "letter": "ட்",
            "transliteration": ""
          },
          {
            "letter": "ண்",
            "transliteration": ""
          },
          {
            "letter": "த்",
            "transliteration": ""
          },
          {
            "letter": "ந்",
            "transliteration": ""
          },
          {
            "letter": "ப்",
            "transliteration": ""
          },
          {
            "letter": "ம்",
            "transliteration": ""
          },
          {
            "letter": "ய்",
            "transliteration": ""
          },
          {
            "letter": "ர்",
            "transliteration": ""
          },
          {
            "letter": "ல்",
            "transliteration": ""
          },
          {
            "letter": "வ்",
            "transliteration": ""
          },
          {
            "letter": "ழ்",
            "transliteration": ""
          },
          {
            "letter": "ள்",
            "transliteration": ""
          },
          {
            "letter": "ற்",
            "transliteration": ""
          },
          {
            "letter": "ன்",
            "transliteration": ""
          }
        ]
      },
      {
        "title": "Special (Aydha eluthu)",
        "description": "1 special letter",
        "letters": [
          {
            "letter": "ஃ",
            "transliteration": "ak"
          }
        ]
      },
      {
        "title": "Combined (Uyirmeyyeluthu)",
        "description": "216 consonant-vowel combinations",
        "letters": [
          {
            "letter": "க",
            "transliteration": ""
          },
          {
            "letter": "கா",
            "transliteration": ""
          },
          {
            "letter": "கி",
            "transliteration": ""
          },
          {
            "letter": "கீ",
            "transliteration": ""
          },
          {
            "letter": "கு",
            "transliteration": ""
          },
          {
            "letter": "கூ",
            "transliteration": ""
          },
          {
            "letter": "கெ",
            "transliteration": ""
          },
          {
            "letter": "கே",
            "transliteration": ""
          },
          {
            "letter": "கை",
            "transliteration": ""
          },
          {
            "letter": "கொ",
            "transliteration": ""
          },
          {
            "letter": "கோ",
            "transliteration": ""
          },
          {
            "letter": "கௌ",
            "transliteration": ""
          },
          {
            "letter": "ங",
            "transliteration": ""
          },
          {
            "letter": "ஙா",
            "transliteration": ""
          },
          {
            "letter": "ஙி",
            "transliteration": ""
          },
          {
            "letter": "ஙீ",
            "transliteration": ""
          },
          {
            "letter": "ஙு",
            "transliteration": ""
          },
          {
            "letter": "ஙூ",
            "transliteration": ""
          },
          {
            "letter": "ஙெ",
            "transliteration": ""
          },
          {
            "letter": "ஙே",
            "transliteration": ""
          },
          {
            "letter": "ஙை",
            "transliteration": ""
          },
          {
            "letter": "ஙொ",
            "transliteration": ""
          },
          {
            "letter": "ஙோ",
            "transliteration": ""
          },
          {
            "letter": "ஙௌ",
            "transliteration": ""
          },
          {
            "letter": "ச",
            "transliteration": ""
          },
          {
            "letter": "சா",
            "transliteration": ""
          },
          {
            "letter": "சி",
            "transliteration": ""
          },
          {
            "letter": "சீ",
            "transliteration": ""
          },
          {
            "letter": "சு",
            "transliteration": ""
          },
          {
            "letter": "சூ",
            "transliteration": ""
          },
          {
            "letter": "செ",
            "transliteration": ""
          },
          {
            "letter": "சே",
            "transliteration": ""
          },
          {
            "letter": "சை",
            "transliteration": ""
          },
          {
            "letter": "சொ",
            "transliteration": ""
          },
          {
            "letter": "சோ",
            "transliteration": ""
          },
          {
            "letter": "சௌ",
            "transliteration": ""
          },
          {
            "letter": "ஞ",
            "transliteration": ""
          },
          {
            "letter": "ஞா",
            "transliteration": ""
          },
          {
            "letter": "ஞி",
            "transliteration": ""
          },
          {
            "letter": "ஞீ",
            "transliteration": ""
          },
          {
            "letter": "ஞு",
            "transliteration": ""
          },
          {
            "letter": "ஞூ",
            "transliteration": ""
          },
          {
            "letter": "ஞெ",
            "transliteration": ""
          },
          {
            "letter": "ஞே",
            "transliteration": ""
          },
          {
            "letter": "ஞை",
            "transliteration": ""
          },
          {
            "letter": "ஞொ",
            "transliteration": ""
          },
          {
            "letter": "ஞோ",
            "transliteration": ""
          },
          {
            "letter": "ஞௌ",
            "transliteration": ""
          },
          {
            "letter": "ட",
            "transliteration": ""
          },
          {
            "letter": "டா",
            "transliteration": ""
          },
          {
            "letter": "டி",
            "transliteration": ""
          },
          {
            "letter": "டீ",
            "transliteration": ""
          },
          {
            "letter": "டு",
            "transliteration": ""
          },
          {
            "letter": "டூ",
            "transliteration": ""
          },
          {
            "letter": "டெ",
            "transliteration": ""
          },
          {
            "letter": "டே",
            "transliteration": ""
          },
          {
            "letter": "டை",
            "transliteration": ""
          },
          {
            "letter": "டொ",
            "transliteration": ""
          },
          {
            "letter": "டோ",
            "transliteration": ""
          },
          {
            "letter": "டௌ",
            "transliteration": ""
          },
          {
            "letter": "ண",
            "transliteration": ""
          },
          {
            "letter": "ணா",
            "transliteration": ""
          },
          {
            "letter": "ணி",
            "transliteration": ""
          },
          {
            "letter": "ணீ",
            "transliteration": ""
          },
          {
            "letter": "ணு",
            "transliteration": ""
          },
          {
            "letter": "ணூ",
            "transliteration": ""
          },
          {
            "letter": "ணெ",
            "transliteration": ""
          },
          {
            "letter": "ணே",
            "transliteration": ""
          },
          {
            "letter": "ணை",
            "transliteration": ""
          },
          {
            "letter": "ணொ",
            "transliteration": ""
          },
          {
            "letter": "ணோ",
            "transliteration": ""
          },
          {
            "letter": "ணௌ",
            "transliteration": ""
          },
          {
            "letter": "த",
            "transliteration": ""
          },
          {
            "letter": "தா",
            "transliteration": ""
          },
          {
            "letter": "தி",
            "transliteration": ""
          },
          {
            "letter": "தீ",
            "transliteration": ""
          },
          {
            "letter": "து",
            "transliteration": ""
          },
          {
            "letter": "தூ",
            "transliteration": ""
          },
          {
            "letter": "தெ",
            "transliteration": ""
          },
          {
            "letter": "தே",
            "transliteration": ""
          },
          {
            "letter": "தை",
            "transliteration": ""
          },
          {
            "letter": "தொ",
            "transliteration": ""
          },
          {
            "letter": "தோ",
            "transliteration": ""
          },
          {
            "letter": "தௌ",
            "transliteration": ""
          },
          {
            "letter": "ந",
            "transliteration": ""
          },
          {
            "letter": "நா",
            "transliteration": ""
          },
          {
            "letter": "நி",
            "transliteration": ""
          },
          {
            "letter": "நீ",
            "transliteration": ""
          },
          {
            "letter": "நு",
            "transliteration": ""
          },
          {
            "letter": "நூ",
            "transliteration": ""
          },
          {
            "letter": "நெ",
            "transliteration": ""
          },
          {
            "letter": "நே",
            "transliteration": ""
          },
          {
            "letter": "நை",
            "transliteration": ""
          },
          {
            "letter": "நொ",
            "transliteration": ""
          },
          {
            "letter": "நோ",
            "transliteration": ""
          },
          {
            "letter": "நௌ",
            "transliteration": ""
          },
          {
            "letter": "ப",
            "transliteration": ""
          },
          {
            "letter": "பா",
            "transliteration": ""
          },
          {
            "letter": "பி",
            "transliteration": ""
          },
          {
            "letter": "பீ",
            "transliteration": ""
          },
          {
            "letter": "பு",
            "transliteration": ""
          },
          {
            "letter": "பூ",
            "transliteration": ""
          },
          {
            "letter": "பெ",
            "transliteration": ""
          },
          {
            "letter": "பே",
            "transliteration": ""
          },
          {
            "letter": "பை",
            "transliteration": ""
          },
          {
            "letter": "பொ",
            "transliteration": ""
          },
          {
            "letter": "போ",
            "transliteration": ""
          },
          {
            "letter": "பௌ",
            "transliteration": ""
          },
          {
            "letter": "ம",
            "transliteration": ""
          },
          {
            "letter": "மா",
            "transliteration": ""
          },
          {
            "letter": "மி",
            "transliteration": ""
          },
          {
            "letter": "மீ",
            "transliteration": ""
          },
          {
            "letter": "மு",
            "transliteration": ""
          },
          {
            "letter": "மூ",
            "transliteration": ""
          },
          {
            "letter": "மெ",
            "transliteration": ""
          },
          {
            "letter": "மே",
            "transliteration": ""
          },
          {
            "letter": "மை",
            "transliteration": ""
          },
          {
            "letter": "மொ",
            "transliteration": ""
          },
          {
            "letter": "மோ",
            "transliteration": ""
          },
          {
            "letter": "மௌ",
            "transliteration": ""
          },
          {
            "letter": "ய",
            "transliteration": ""
          },
          {
            "letter": "யா",
            "transliteration": ""
          },
          {
            "letter": "யி",
            "transliteration": ""
          },
          {
            "letter": "யீ",
            "transliteration": ""
          },
          {
            "letter": "யு",
            "transliteration": ""
          },
          {
            "letter": "யூ",
            "transliteration": ""
          },
          {
            "letter": "யெ",
            "transliteration": ""
          },
          {
            "letter": "யே",
            "transliteration": ""
          },
          {
            "letter": "யை",
            "transliteration": ""
          },
          {
            "letter": "யொ",
            "transliteration": ""
          },
          {
            "letter": "யோ",
            "transliteration": ""
          },
          {
            "letter": "யௌ",
            "transliteration": ""
          },
          {
            "letter": "ர",
            "transliteration": ""
          },
          {
            "letter": "ரா",
            "transliteration": ""
          },
          {
            "letter": "ரி",
            "transliteration": ""
          },
          {
            "letter": "ரீ",
            "transliteration": ""
          },
          {
            "letter": "ரு",
            "transliteration": ""
          },
          {
            "letter": "ரூ",
            "transliteration": ""
          },
          {
            "letter": "ரெ",
            "transliteration": ""
          },
          {
            "letter": "ரே",
            "transliteration": ""
          },
          {
            "letter": "ரை",
            "transliteration": ""
          },
          {
            "letter": "ரொ",
            "transliteration": ""
          },
          {
            "letter": "ரோ",
            "transliteration": ""
          },
          {
            "letter": "ரௌ",
            "transliteration": ""
          },
          {
            "letter": "ல",
            "transliteration": ""
          },
          {
            "letter": "லா",
            "transliteration": ""
          },
          {
            "letter": "லி",
            "transliteration": ""
          },
          {
            "letter": "லீ",
            "transliteration": ""
          },
          {
            "letter": "லு",
            "transliteration": ""
          },
          {
            "letter": "லூ",
            "transliteration": ""
          },
          {
            "letter": "லெ",
            "transliteration": ""
          },
          {
            "letter": "லே",
            "transliteration": ""
          },
          {
            "letter": "லை",
            "transliteration": ""
          },
          {
            "letter": "லொ",
            "transliteration": ""
          },
          {
            "letter": "லோ",
            "transliteration": ""
          },
          {
            "letter": "லௌ",
            "transliteration": ""
          },
          {
            "letter": "வ",
            "transliteration": ""
          },
          {
            "letter": "வா",
            "transliteration": ""
          },
          {
            "letter": "வி",
            "transliteration": ""
          },
          {
            "letter": "வீ",
            "transliteration": ""
          },
          {
            "letter": "வு",
            "transliteration": ""
          },
          {
            "letter": "வூ",
            "transliteration": ""
          },
          {
            "letter": "வெ",
            "transliteration": ""
          },
          {
            "letter": "வே",
            "transliteration": ""
          },
          {
            "letter": "வை",
            "transliteration": ""
          },
          {
            "letter": "வொ",
            "transliteration": ""
          },
          {
            "letter": "வோ",
            "transliteration": ""
          },
          {
            "letter": "வௌ",
            "transliteration": ""
          },
          {
            "letter": "ழ",
            "transliteration": ""
          },
          {
            "letter": "ழா",
            "transliteration": ""
          },
          {
            "letter": "ழி",
            "transliteration": ""
          },
          {
            "letter": "ழீ",
            "transliteration": ""
          },
          {
            "letter": "ழு",
            "transliteration": ""
          },
          {
            "letter": "ழூ",
            "transliteration": ""
          },
          {
            "letter": "ழெ",
            "transliteration": ""
          },
          {
            "letter": "ழே",
            "transliteration": ""
          },
          {
            "letter": "ழை",
            "transliteration": ""
          },
          {
            "letter": "ழொ",
            "transliteration": ""
          },
          {
            "letter": "ழோ",
            "transliteration": ""
          },
          {
            "letter": "ழௌ",
            "transliteration": ""
          },
          {
            "letter": "ள",
            "transliteration": ""
          },
          {
            "letter": "ளா",
            "transliteration": ""
          },
          {
            "letter": "ளி",
            "transliteration": ""
          },
          {
            "letter": "ளீ",
            "transliteration": ""
          },
          {
            "letter": "ளு",
            "transliteration": ""
          },
          {
            "letter": "ளூ",
            "transliteration": ""
          },
          {
            "letter": "ளெ",
            "transliteration": ""
          },
          {
            "letter": "ளே",
            "transliteration": ""
          },
          {
            "letter": "ளை",
            "transliteration": ""
          },
          {
            "letter": "ளொ",
            "transliteration": ""
          },
          {
            "letter": "ளோ",
            "transliteration": ""
          },
          {
            "letter": "ளௌ",
            "transliteration": ""
          },
          {
            "letter": "ற",
            "transliteration": ""
          },
          {
            "letter": "றா",
            "transliteration": ""
          },
          {
            "letter": "றி",
            "transliteration": ""
          },
          {
            "letter": "றீ",
            "transliteration": ""
          },
          {
            "letter": "று",
            "transliteration": ""
          },
          {
            "letter": "றூ",
            "transliteration": ""
          },
          {
            "letter": "றெ",
            "transliteration": ""
          },
          {
            "letter": "றே",
            "transliteration": ""
          },
          {
            "letter": "றை",
            "transliteration": ""
          },
          {
            "letter": "றொ",
            "transliteration": ""
          },
          {
            "letter": "றோ",
            "transliteration": ""
          },
          {
            "letter": "றௌ",
            "transliteration": ""
          },
          {
            "letter": "ன",
            "transliteration": ""
          },
          {
            "letter": "னா",
            "transliteration": ""
          },
          {
            "letter": "னி",
            "transliteration": ""
          },
          {
            "letter": "னீ",
            "transliteration": ""
          },
          {
            "letter": "னு",
            "transliteration": ""
          },
          {
            "letter": "னூ",
            "transliteration": ""
          },
          {
            "letter": "னெ",
            "transliteration": ""
          },
          {
            "letter": "னே",
            "transliteration": ""
          },
          {
            "letter": "னை",
            "transliteration": ""
          },
          {
            "letter": "னொ",
            "transliteration": ""
          },
          {
            "letter": "னோ",
            "transliteration": ""
          },
          {
            "letter": "னௌ",
            "transliteration": ""
          }
        ]
      }
    ]
  },
  "Hindi": {
    "summary": {
      "total": 47,
      "breakdown": "Vowels (Swar): 11, Consonants (Vyanjan): 36"
    },
    "sections": [
      {
        "title": "Vowels (Swar)",
        "description": "11 vowels",
        "letters": [
          {
            "letter": "अ",
            "transliteration": ""
          },
          {
            "letter": "आ",
            "transliteration": ""
          },
          {
            "letter": "इ",
            "transliteration": ""
          },
          {
            "letter": "ई",
            "transliteration": ""
          },
          {
            "letter": "उ",
            "transliteration": ""
          },
          {
            "letter": "ऊ",
            "transliteration": ""
          },
          {
            "letter": "ऋ",
            "transliteration": ""
          },
          {
            "letter": "ए",
            "transliteration": ""
          },
          {
            "letter": "ऐ",
            "transliteration": ""
          },
          {
            "letter": "ओ",
            "transliteration": ""
          },
          {
            "letter": "औ",
            "transliteration": ""
          }
        ]
      },
      {
        "title": "Consonants (Vyanjan)",
        "description": "36 consonants",
        "letters": [
          {
            "letter": "क",
            "transliteration": ""
          },
          {
            "letter": "ख",
            "transliteration": ""
          },
          {
            "letter": "ग",
            "transliteration": ""
          },
          {
            "letter": "घ",
            "transliteration": ""
          },
          {
            "letter": "ङ",
            "transliteration": ""
          },
          {
            "letter": "च",
            "transliteration": ""
          },
          {
            "letter": "छ",
            "transliteration": ""
          },
          {
            "letter": "ज",
            "transliteration": ""
          },
          {
            "letter": "झ",
            "transliteration": ""
          },
          {
            "letter": "ञ",
            "transliteration": ""
          },
          {
            "letter": "ट",
            "transliteration": ""
          },
          {
            "letter": "ठ",
            "transliteration": ""
          },
          {
            "letter": "ड",
            "transliteration": ""
          },
          {
            "letter": "ढ",
            "transliteration": ""
          },
          {
            "letter": "ण",
            "transliteration": ""
          },
          {
            "letter": "त",
            "transliteration": ""
          },
          {
            "letter": "थ",
            "transliteration": ""
          },
          {
            "letter": "द",
            "transliteration": ""
          },
          {
            "letter": "ध",
            "transliteration": ""
          },
          {
            "letter": "न",
            "transliteration": ""
          },
          {
            "letter": "प",
            "transliteration": ""
          },
          {
            "letter": "फ",
            "transliteration": ""
          },
          {
            "letter": "ब",
            "transliteration": ""
          },
          {
            "letter": "भ",
            "transliteration": ""
          },
          {
            "letter": "म",
            "transliteration": ""
          },
          {
            "letter": "य",
            "transliteration": ""
          },
          {
            "letter": "र",
            "transliteration": ""
          },
          {
            "letter": "ल",
            "transliteration": ""
          },
          {
            "letter": "व",
            "transliteration": ""
          },
          {
            "letter": "श",
            "transliteration": ""
          },
          {
            "letter": "ष",
            "transliteration": ""
          },
          {
            "letter": "स",
            "transliteration": ""
          },
          {
            "letter": "ह",
            "transliteration": ""
          },
          {
            "letter": "क्ष",
            "transliteration": ""
          },
          {
            "letter": "त्र",
            "transliteration": ""
          },
          {
            "letter": "ज्ञ",
            "transliteration": ""
          }
        ]
      }
    ]
  },
  "Bengali": {
    "summary": {
      "total": 50,
      "breakdown": "Vowels (Sworoborno): 11, Consonants (Banjonborno): 39"
    },
    "sections": [
      {
        "title": "Vowels (Sworoborno)",
        "description": "11 vowels",
        "letters": [
          {
            "letter": "অ",
            "transliteration": ""
          },
          {
            "letter": "আ",
            "transliteration": ""
          },
          {
            "letter": "ই",
            "transliteration": ""
          },
          {
            "letter": "ঈ",
            "transliteration": ""
          },
          {
            "letter": "উ",
            "transliteration": ""
          },
          {
            "letter": "ঊ",
            "transliteration": ""
          },
          {
            "letter": "ঋ",
            "transliteration": ""
          },
          {
            "letter": "এ",
            "transliteration": ""
          },
          {
            "letter": "ঐ",
            "transliteration": ""
          },
          {
            "letter": "ও",
            "transliteration": ""
          },
          {
            "letter": "ঔ",
            "transliteration": ""
          }
        ]
      },
      {
        "title": "Consonants (Banjonborno)",
        "description": "39 consonants",
        "letters": [
          {
            "letter": "ক",
            "transliteration": ""
          },
          {
            "letter": "খ",
            "transliteration": ""
          },
          {
            "letter": "গ",
            "transliteration": ""
          },
          {
            "letter": "ঘ",
            "transliteration": ""
          },
          {
            "letter": "ঙ",
            "transliteration": ""
          },
          {
            "letter": "চ",
            "transliteration": ""
          },
          {
            "letter": "ছ",
            "transliteration": ""
          },
          {
            "letter": "জ",
            "transliteration": ""
          },
          {
            "letter": "ঝ",
            "transliteration": ""
          },
          {
            "letter": "ঞ",
            "transliteration": ""
          },
          {
            "letter": "ট",
            "transliteration": ""
          },
          {
            "letter": "ঠ",
            "transliteration": ""
          },
          {
            "letter": "ড",
            "transliteration": ""
          },
          {
            "letter": "ঢ",
            "transliteration": ""
          },
          {
            "letter": "ণ",
            "transliteration": ""
          },
          {
            "letter": "ত",
            "transliteration": ""
          },
          {
            "letter": "থ",
            "transliteration": ""
          },
          {
            "letter": "দ",
            "transliteration": ""
          },
          {
            "letter": "ধ",
            "transliteration": ""
          },
          {
            "letter": "ন",
            "transliteration": ""
          },
          {
            "letter": "প",
            "transliteration": ""
          },
          {
            "letter": "ফ",
            "transliteration": ""
          },
          {
            "letter": "ব",
            "transliteration": ""
          },
          {
            "letter": "ভ",
            "transliteration": ""
          },
          {
            "letter": "ম",
            "transliteration": ""
          },
          {
            "letter": "য",
            "transliteration": ""
          },
          {
            "letter": "র",
            "transliteration": ""
          },
          {
            "letter": "ল",
            "transliteration": ""
          },
          {
            "letter": "শ",
            "transliteration": ""
          },
          {
            "letter": "ষ",
            "transliteration": ""
          },
          {
            "letter": "স",
            "transliteration": ""
          },
          {
            "letter": "হ",
            "transliteration": ""
          },
          {
            "letter": "ড়",
            "transliteration": ""
          },
          {
            "letter": "ঢ়",
            "transliteration": ""
          },
          {
            "letter": "য়",
            "transliteration": ""
          },
          {
            "letter": "ৎ",
            "transliteration": ""
          },
          {
            "letter": "ং",
            "transliteration": ""
          },
          {
            "letter": "ঃ",
            "transliteration": ""
          },
          {
            "letter": "ঁ",
            "transliteration": ""
          }
        ]
      }
    ]
  },
  "Telugu": {
    "summary": {
      "total": 52,
      "breakdown": "Vowels (Achchulu): 16, Consonants (Hallulu): 36"
    },
    "sections": [
      {
        "title": "Vowels (Achchulu)",
        "description": "16 vowels",
        "letters": [
          {
            "letter": "అ",
            "transliteration": ""
          },
          {
            "letter": "ఆ",
            "transliteration": ""
          },
          {
            "letter": "ఇ",
            "transliteration": ""
          },
          {
            "letter": "ఈ",
            "transliteration": ""
          },
          {
            "letter": "ఉ",
            "transliteration": ""
          },
          {
            "letter": "ఊ",
            "transliteration": ""
          },
          {
            "letter": "ఋ",
            "transliteration": ""
          },
          {
            "letter": "ౠ",
            "transliteration": ""
          },
          {
            "letter": "ఎ",
            "transliteration": ""
          },
          {
            "letter": "ఏ",
            "transliteration": ""
          },
          {
            "letter": "ఐ",
            "transliteration": ""
          },
          {
            "letter": "ఒ",
            "transliteration": ""
          },
          {
            "letter": "ఓ",
            "transliteration": ""
          },
          {
            "letter": "ఔ",
            "transliteration": ""
          },
          {
            "letter": "అం",
            "transliteration": ""
          },
          {
            "letter": "అః",
            "transliteration": ""
          }
        ]
      },
      {
        "title": "Consonants (Hallulu)",
        "description": "36 consonants",
        "letters": [
          {
            "letter": "క",
            "transliteration": ""
          },
          {
            "letter": "ఖ",
            "transliteration": ""
          },
          {
            "letter": "గ",
            "transliteration": ""
          },
          {
            "letter": "ఘ",
            "transliteration": ""
          },
          {
            "letter": "ఙ",
            "transliteration": ""
          },
          {
            "letter": "చ",
            "transliteration": ""
          },
          {
            "letter": "ఛ",
            "transliteration": ""
          },
          {
            "letter": "జ",
            "transliteration": ""
          },
          {
            "letter": "ఝ",
            "transliteration": ""
          },
          {
            "letter": "ఞ",
            "transliteration": ""
          },
          {
            "letter": "ట",
            "transliteration": ""
          },
          {
            "letter": "ठ",
            "transliteration": ""
          },
          {
            "letter": "డ",
            "transliteration": ""
          },
          {
            "letter": "ఢ",
            "transliteration": ""
          },
          {
            "letter": "ణ",
            "transliteration": ""
          },
          {
            "letter": "త",
            "transliteration": ""
          },
          {
            "letter": "థ",
            "transliteration": ""
          },
          {
            "letter": "ద",
            "transliteration": ""
          },
          {
            "letter": "ధ",
            "transliteration": ""
          },
          {
            "letter": "న",
            "transliteration": ""
          },
          {
            "letter": "ప",
            "transliteration": ""
          },
          {
            "letter": "ఫ",
            "transliteration": ""
          },
          {
            "letter": "బ",
            "transliteration": ""
          },
          {
            "letter": "భ",
            "transliteration": ""
          },
          {
            "letter": "మ",
            "transliteration": ""
          },
          {
            "letter": "య",
            "transliteration": ""
          },
          {
            "letter": "ర",
            "transliteration": ""
          },
          {
            "letter": "ల",
            "transliteration": ""
          },
          {
            "letter": "వ",
            "transliteration": ""
          },
          {
            "letter": "శ",
            "transliteration": ""
          },
          {
            "letter": "ష",
            "transliteration": ""
          },
          {
            "letter": "స",
            "transliteration": ""
          },
          {
            "letter": "హ",
            "transliteration": ""
          },
          {
            "letter": "ళ",
            "transliteration": ""
          },
          {
            "letter": "క్ష",
            "transliteration": ""
          },
          {
            "letter": "ఱ",
            "transliteration": ""
          }
        ]
      }
    ]
  },
  "Marathi": {
    "summary": {
      "total": 51,
      "breakdown": "Vowels (Swar): 15, Consonants (Vyanjan): 36"
    },
    "sections": [
      {
        "title": "Vowels (Swar)",
        "description": "15 vowels",
        "letters": [
          {
            "letter": "अ",
            "transliteration": ""
          },
          {
            "letter": "आ",
            "transliteration": ""
          },
          {
            "letter": "इ",
            "transliteration": ""
          },
          {
            "letter": "ई",
            "transliteration": ""
          },
          {
            "letter": "उ",
            "transliteration": ""
          },
          {
            "letter": "ऊ",
            "transliteration": ""
          },
          {
            "letter": "ऋ",
            "transliteration": ""
          },
          {
            "letter": "ए",
            "transliteration": ""
          },
          {
            "letter": "ऐ",
            "transliteration": ""
          },
          {
            "letter": "ओ",
            "transliteration": ""
          },
          {
            "letter": "औ",
            "transliteration": ""
          },
          {
            "letter": "अं",
            "transliteration": ""
          },
          {
            "letter": "अः",
            "transliteration": ""
          },
          {
            "letter": "ॲ",
            "transliteration": ""
          },
          {
            "letter": "ऑ",
            "transliteration": ""
          }
        ]
      },
      {
        "title": "Consonants (Vyanjan)",
        "description": "36 consonants",
        "letters": [
          {
            "letter": "क",
            "transliteration": ""
          },
          {
            "letter": "ख",
            "transliteration": ""
          },
          {
            "letter": "ग",
            "transliteration": ""
          },
          {
            "letter": "घ",
            "transliteration": ""
          },
          {
            "letter": "ङ",
            "transliteration": ""
          },
          {
            "letter": "च",
            "transliteration": ""
          },
          {
            "letter": "छ",
            "transliteration": ""
          },
          {
            "letter": "ज",
            "transliteration": ""
          },
          {
            "letter": "झ",
            "transliteration": ""
          },
          {
            "letter": "ञ",
            "transliteration": ""
          },
          {
            "letter": "ट",
            "transliteration": ""
          },
          {
            "letter": "ठ",
            "transliteration": ""
          },
          {
            "letter": "ड",
            "transliteration": ""
          },
          {
            "letter": "ढ",
            "transliteration": ""
          },
          {
            "letter": "ण",
            "transliteration": ""
          },
          {
            "letter": "त",
            "transliteration": ""
          },
          {
            "letter": "थ",
            "transliteration": ""
          },
          {
            "letter": "द",
            "transliteration": ""
          },
          {
            "letter": "ध",
            "transliteration": ""
          },
          {
            "letter": "न",
            "transliteration": ""
          },
          {
            "letter": "प",
            "transliteration": ""
          },
          {
            "letter": "फ",
            "transliteration": ""
          },
          {
            "letter": "ब",
            "transliteration": ""
          },
          {
            "letter": "भ",
            "transliteration": ""
          },
          {
            "letter": "म",
            "transliteration": ""
          },
          {
            "letter": "य",
            "transliteration": ""
          },
          {
            "letter": "र",
            "transliteration": ""
          },
          {
            "letter": "ल",
            "transliteration": ""
          },
          {
            "letter": "व",
            "transliteration": ""
          },
          {
            "letter": "श",
            "transliteration": ""
          },
          {
            "letter": "ष",
            "transliteration": ""
          },
          {
            "letter": "स",
            "transliteration": ""
          },
          {
            "letter": "ह",
            "transliteration": ""
          },
          {
            "letter": "ळ",
            "transliteration": ""
          },
          {
            "letter": "क्ष",
            "transliteration": ""
          },
          {
            "letter": "ज्ञ",
            "transliteration": ""
          }
        ]
      }
    ]
  }
};

EXTENDED_ALPHABETS["English"] = {
  summary: {
    total: 26,
    breakdown: "Vowels: 5, Consonants: 21"
  },
  sections: [
    {
      title: "Vowels",
      description: "5 vowels",
      letters: [
        { letter: "A", transliteration: "" },
        { letter: "E", transliteration: "" },
        { letter: "I", transliteration: "" },
        { letter: "O", transliteration: "" },
        { letter: "U", transliteration: "" }
      ]
    },
    {
      title: "Consonants",
      description: "21 consonants",
      letters: [
        { letter: "B", transliteration: "" },
        { letter: "C", transliteration: "" },
        { letter: "D", transliteration: "" },
        { letter: "F", transliteration: "" },
        { letter: "G", transliteration: "" },
        { letter: "H", transliteration: "" },
        { letter: "J", transliteration: "" },
        { letter: "K", transliteration: "" },
        { letter: "L", transliteration: "" },
        { letter: "M", transliteration: "" },
        { letter: "N", transliteration: "" },
        { letter: "P", transliteration: "" },
        { letter: "Q", transliteration: "" },
        { letter: "R", transliteration: "" },
        { letter: "S", transliteration: "" },
        { letter: "T", transliteration: "" },
        { letter: "V", transliteration: "" },
        { letter: "W", transliteration: "" },
        { letter: "X", transliteration: "" },
        { letter: "Y", transliteration: "" },
        { letter: "Z", transliteration: "" }
      ]
    }
  ]
};

EXTENDED_ALPHABETS["Malayalam"] = {
  "summary": {
    "total": 53,
    "breakdown": "Vowels (Swarangal): 15, Consonants (Vyanjanangal): 38"
  },
  "sections": [
    {
      "title": "Vowels (Swarangal)",
      "description": "15 vowels",
      "letters": [
        {
          "letter": "\u0d05",
          "transliteration": "a"
        },
        {
          "letter": "\u0d06",
          "transliteration": "aa"
        },
        {
          "letter": "\u0d07",
          "transliteration": "i"
        },
        {
          "letter": "\u0d08",
          "transliteration": "ii"
        },
        {
          "letter": "\u0d09",
          "transliteration": "u"
        },
        {
          "letter": "\u0d0a",
          "transliteration": "uu"
        },
        {
          "letter": "\u0d0b",
          "transliteration": "ru"
        },
        {
          "letter": "\u0d0e",
          "transliteration": "e"
        },
        {
          "letter": "\u0d0f",
          "transliteration": "ee"
        },
        {
          "letter": "\u0d10",
          "transliteration": "ai"
        },
        {
          "letter": "\u0d12",
          "transliteration": "o"
        },
        {
          "letter": "\u0d13",
          "transliteration": "oo"
        },
        {
          "letter": "\u0d14",
          "transliteration": "au"
        },
        {
          "letter": "\u0d05\u0d02",
          "transliteration": "am"
        },
        {
          "letter": "\u0d05\u0d03",
          "transliteration": "ah"
        }
      ]
    },
    {
      "title": "Consonants (Vyanjanangal)",
      "description": "38 consonants",
      "letters": [
        {
          "letter": "\u0d15",
          "transliteration": "ka"
        },
        {
          "letter": "\u0d16",
          "transliteration": "kha"
        },
        {
          "letter": "\u0d17",
          "transliteration": "ga"
        },
        {
          "letter": "\u0d18",
          "transliteration": "gha"
        },
        {
          "letter": "\u0d19",
          "transliteration": "nga"
        },
        {
          "letter": "\u0d1a",
          "transliteration": "cha"
        },
        {
          "letter": "\u0d1b",
          "transliteration": "chha"
        },
        {
          "letter": "\u0d1c",
          "transliteration": "ja"
        },
        {
          "letter": "\u0d1d",
          "transliteration": "jha"
        },
        {
          "letter": "\u0d1e",
          "transliteration": "nya"
        },
        {
          "letter": "\u0d1f",
          "transliteration": "ta"
        },
        {
          "letter": "\u0d20",
          "transliteration": "tha"
        },
        {
          "letter": "\u0d21",
          "transliteration": "da"
        },
        {
          "letter": "\u0d22",
          "transliteration": "dha"
        },
        {
          "letter": "\u0d23",
          "transliteration": "na"
        },
        {
          "letter": "\u0d24",
          "transliteration": "ta"
        },
        {
          "letter": "\u0d25",
          "transliteration": "tha"
        },
        {
          "letter": "\u0d26",
          "transliteration": "da"
        },
        {
          "letter": "\u0d27",
          "transliteration": "dha"
        },
        {
          "letter": "\u0d28",
          "transliteration": "na"
        },
        {
          "letter": "\u0d2a",
          "transliteration": "pa"
        },
        {
          "letter": "\u0d2b",
          "transliteration": "pha"
        },
        {
          "letter": "\u0d2c",
          "transliteration": "ba"
        },
        {
          "letter": "\u0d2d",
          "transliteration": "bha"
        },
        {
          "letter": "\u0d2e",
          "transliteration": "ma"
        },
        {
          "letter": "\u0d2f",
          "transliteration": "ya"
        },
        {
          "letter": "\u0d30",
          "transliteration": "ra"
        },
        {
          "letter": "\u0d32",
          "transliteration": "la"
        },
        {
          "letter": "\u0d35",
          "transliteration": "va"
        },
        {
          "letter": "\u0d36",
          "transliteration": "sha"
        },
        {
          "letter": "\u0d37",
          "transliteration": "sha"
        },
        {
          "letter": "\u0d38",
          "transliteration": "sa"
        },
        {
          "letter": "\u0d39",
          "transliteration": "ha"
        },
        {
          "letter": "\u0d33",
          "transliteration": "la"
        },
        {
          "letter": "\u0d34",
          "transliteration": "zha"
        },
        {
          "letter": "\u0d31",
          "transliteration": "ra"
        }
      ]
    }
  ]
};

EXTENDED_ALPHABETS["Kannada"] = {
  "summary": {
    "total": 49,
    "breakdown": "Vowels (Swaragalu): 15, Consonants (Vyanjanagalu): 34"
  },
  "sections": [
    {
      "title": "Vowels (Swaragalu)",
      "description": "15 vowels",
      "letters": [
        {
          "letter": "\u0c85",
          "transliteration": "a"
        },
        {
          "letter": "\u0c86",
          "transliteration": "aa"
        },
        {
          "letter": "\u0c87",
          "transliteration": "i"
        },
        {
          "letter": "\u0c88",
          "transliteration": "ii"
        },
        {
          "letter": "\u0c89",
          "transliteration": "u"
        },
        {
          "letter": "\u0c8a",
          "transliteration": "uu"
        },
        {
          "letter": "\u0c8b",
          "transliteration": "ru"
        },
        {
          "letter": "\u0c8e",
          "transliteration": "e"
        },
        {
          "letter": "\u0c8f",
          "transliteration": "ee"
        },
        {
          "letter": "\u0c90",
          "transliteration": "ai"
        },
        {
          "letter": "\u0c92",
          "transliteration": "o"
        },
        {
          "letter": "\u0c93",
          "transliteration": "oo"
        },
        {
          "letter": "\u0c94",
          "transliteration": "au"
        },
        {
          "letter": "\u0c85\u0c82",
          "transliteration": "am"
        },
        {
          "letter": "\u0c85\u0c83",
          "transliteration": "ah"
        }
      ]
    },
    {
      "title": "Consonants (Vyanjanagalu)",
      "description": "34 consonants",
      "letters": [
        {
          "letter": "\u0c95",
          "transliteration": "ka"
        },
        {
          "letter": "\u0c96",
          "transliteration": "kha"
        },
        {
          "letter": "\u0c97",
          "transliteration": "ga"
        },
        {
          "letter": "\u0c98",
          "transliteration": "gha"
        },
        {
          "letter": "\u0c99",
          "transliteration": "nga"
        },
        {
          "letter": "\u0c9a",
          "transliteration": "cha"
        },
        {
          "letter": "\u0c9b",
          "transliteration": "chha"
        },
        {
          "letter": "\u0c9c",
          "transliteration": "ja"
        },
        {
          "letter": "\u0c9d",
          "transliteration": "jha"
        },
        {
          "letter": "\u0c9e",
          "transliteration": "nya"
        },
        {
          "letter": "\u0c9f",
          "transliteration": "ta"
        },
        {
          "letter": "\u0ca0",
          "transliteration": "tha"
        },
        {
          "letter": "\u0ca1",
          "transliteration": "da"
        },
        {
          "letter": "\u0ca2",
          "transliteration": "dha"
        },
        {
          "letter": "\u0ca3",
          "transliteration": "na"
        },
        {
          "letter": "\u0ca4",
          "transliteration": "ta"
        },
        {
          "letter": "\u0ca5",
          "transliteration": "tha"
        },
        {
          "letter": "\u0ca6",
          "transliteration": "da"
        },
        {
          "letter": "\u0ca7",
          "transliteration": "dha"
        },
        {
          "letter": "\u0ca8",
          "transliteration": "na"
        },
        {
          "letter": "\u0caa",
          "transliteration": "pa"
        },
        {
          "letter": "\u0cab",
          "transliteration": "pha"
        },
        {
          "letter": "\u0cac",
          "transliteration": "ba"
        },
        {
          "letter": "\u0cad",
          "transliteration": "bha"
        },
        {
          "letter": "\u0cae",
          "transliteration": "ma"
        },
        {
          "letter": "\u0caf",
          "transliteration": "ya"
        },
        {
          "letter": "\u0cb0",
          "transliteration": "ra"
        },
        {
          "letter": "\u0cb2",
          "transliteration": "la"
        },
        {
          "letter": "\u0cb5",
          "transliteration": "va"
        },
        {
          "letter": "\u0cb6",
          "transliteration": "sha"
        },
        {
          "letter": "\u0cb7",
          "transliteration": "sha"
        },
        {
          "letter": "\u0cb8",
          "transliteration": "sa"
        },
        {
          "letter": "\u0cb9",
          "transliteration": "ha"
        },
        {
          "letter": "\u0cb3",
          "transliteration": "la"
        }
      ]
    }
  ]
};

EXTENDED_ALPHABETS["Gujarati"] = {
  "summary": {
    "total": 47,
    "breakdown": "Vowels (Swar): 13, Consonants (Vyanjan): 34"
  },
  "sections": [
    {
      "title": "Vowels (Swar)",
      "description": "13 vowels",
      "letters": [
        {
          "letter": "\u0a85",
          "transliteration": "a"
        },
        {
          "letter": "\u0a86",
          "transliteration": "aa"
        },
        {
          "letter": "\u0a87",
          "transliteration": "i"
        },
        {
          "letter": "\u0a88",
          "transliteration": "ii"
        },
        {
          "letter": "\u0a89",
          "transliteration": "u"
        },
        {
          "letter": "\u0a8a",
          "transliteration": "uu"
        },
        {
          "letter": "\u0a8b",
          "transliteration": "ru"
        },
        {
          "letter": "\u0a8f",
          "transliteration": "e"
        },
        {
          "letter": "\u0a90",
          "transliteration": "ai"
        },
        {
          "letter": "\u0a93",
          "transliteration": "o"
        },
        {
          "letter": "\u0a94",
          "transliteration": "au"
        },
        {
          "letter": "\u0a85\u0a82",
          "transliteration": "am"
        },
        {
          "letter": "\u0a85\u0a83",
          "transliteration": "ah"
        }
      ]
    },
    {
      "title": "Consonants (Vyanjan)",
      "description": "34 consonants",
      "letters": [
        {
          "letter": "\u0a95",
          "transliteration": "ka"
        },
        {
          "letter": "\u0a96",
          "transliteration": "kha"
        },
        {
          "letter": "\u0a97",
          "transliteration": "ga"
        },
        {
          "letter": "\u0a98",
          "transliteration": "gha"
        },
        {
          "letter": "\u0a9a",
          "transliteration": "cha"
        },
        {
          "letter": "\u0a9b",
          "transliteration": "chha"
        },
        {
          "letter": "\u0a9c",
          "transliteration": "ja"
        },
        {
          "letter": "\u0a9d",
          "transliteration": "zha"
        },
        {
          "letter": "\u0a9f",
          "transliteration": "ta"
        },
        {
          "letter": "\u0aa0",
          "transliteration": "tha"
        },
        {
          "letter": "\u0aa1",
          "transliteration": "da"
        },
        {
          "letter": "\u0aa2",
          "transliteration": "dha"
        },
        {
          "letter": "\u0aa3",
          "transliteration": "na"
        },
        {
          "letter": "\u0aa4",
          "transliteration": "ta"
        },
        {
          "letter": "\u0aa5",
          "transliteration": "tha"
        },
        {
          "letter": "\u0aa6",
          "transliteration": "da"
        },
        {
          "letter": "\u0aa7",
          "transliteration": "dha"
        },
        {
          "letter": "\u0aa8",
          "transliteration": "na"
        },
        {
          "letter": "\u0aaa",
          "transliteration": "pa"
        },
        {
          "letter": "\u0aab",
          "transliteration": "pha"
        },
        {
          "letter": "\u0aac",
          "transliteration": "ba"
        },
        {
          "letter": "\u0aad",
          "transliteration": "bha"
        },
        {
          "letter": "\u0aae",
          "transliteration": "ma"
        },
        {
          "letter": "\u0aaf",
          "transliteration": "ya"
        },
        {
          "letter": "\u0ab0",
          "transliteration": "ra"
        },
        {
          "letter": "\u0ab2",
          "transliteration": "la"
        },
        {
          "letter": "\u0ab5",
          "transliteration": "va"
        },
        {
          "letter": "\u0ab6",
          "transliteration": "sha"
        },
        {
          "letter": "\u0ab7",
          "transliteration": "sha"
        },
        {
          "letter": "\u0ab8",
          "transliteration": "sa"
        },
        {
          "letter": "\u0ab9",
          "transliteration": "ha"
        },
        {
          "letter": "\u0ab3",
          "transliteration": "la"
        },
        {
          "letter": "\u0a95\u0acd\u0ab7",
          "transliteration": "ksha"
        },
        {
          "letter": "\u0a9c\u0acd\u0a9e",
          "transliteration": "gna"
        }
      ]
    }
  ]
};

EXTENDED_ALPHABETS["Punjabi"] = {
  "summary": {
    "total": 41,
    "breakdown": "Vowels (Swar): 10, Consonants (Vyanjan): 31"
  },
  "sections": [
    {
      "title": "Vowels (Swar)",
      "description": "10 vowels",
      "letters": [
        {
          "letter": "\u0a05",
          "transliteration": "a"
        },
        {
          "letter": "\u0a06",
          "transliteration": "aa"
        },
        {
          "letter": "\u0a07",
          "transliteration": "i"
        },
        {
          "letter": "\u0a08",
          "transliteration": "ii"
        },
        {
          "letter": "\u0a09",
          "transliteration": "u"
        },
        {
          "letter": "\u0a0a",
          "transliteration": "uu"
        },
        {
          "letter": "\u0a0f",
          "transliteration": "e"
        },
        {
          "letter": "\u0a10",
          "transliteration": "ai"
        },
        {
          "letter": "\u0a13",
          "transliteration": "o"
        },
        {
          "letter": "\u0a14",
          "transliteration": "au"
        }
      ]
    },
    {
      "title": "Consonants (Vyanjan)",
      "description": "31 consonants",
      "letters": [
        {
          "letter": "\u0a15",
          "transliteration": "ka"
        },
        {
          "letter": "\u0a16",
          "transliteration": "kha"
        },
        {
          "letter": "\u0a17",
          "transliteration": "ga"
        },
        {
          "letter": "\u0a18",
          "transliteration": "gha"
        },
        {
          "letter": "\u0a19",
          "transliteration": "nga"
        },
        {
          "letter": "\u0a1a",
          "transliteration": "cha"
        },
        {
          "letter": "\u0a1b",
          "transliteration": "chha"
        },
        {
          "letter": "\u0a1c",
          "transliteration": "ja"
        },
        {
          "letter": "\u0a1d",
          "transliteration": "jha"
        },
        {
          "letter": "\u0a1e",
          "transliteration": "nya"
        },
        {
          "letter": "\u0a1f",
          "transliteration": "ta"
        },
        {
          "letter": "\u0a20",
          "transliteration": "tha"
        },
        {
          "letter": "\u0a21",
          "transliteration": "da"
        },
        {
          "letter": "\u0a22",
          "transliteration": "dha"
        },
        {
          "letter": "\u0a23",
          "transliteration": "na"
        },
        {
          "letter": "\u0a24",
          "transliteration": "ta"
        },
        {
          "letter": "\u0a25",
          "transliteration": "tha"
        },
        {
          "letter": "\u0a26",
          "transliteration": "da"
        },
        {
          "letter": "\u0a27",
          "transliteration": "dha"
        },
        {
          "letter": "\u0a28",
          "transliteration": "na"
        },
        {
          "letter": "\u0a2a",
          "transliteration": "pa"
        },
        {
          "letter": "\u0a2b",
          "transliteration": "pha"
        },
        {
          "letter": "\u0a2c",
          "transliteration": "ba"
        },
        {
          "letter": "\u0a2d",
          "transliteration": "bha"
        },
        {
          "letter": "\u0a2e",
          "transliteration": "ma"
        },
        {
          "letter": "\u0a2f",
          "transliteration": "ya"
        },
        {
          "letter": "\u0a30",
          "transliteration": "ra"
        },
        {
          "letter": "\u0a32",
          "transliteration": "la"
        },
        {
          "letter": "\u0a35",
          "transliteration": "va"
        },
        {
          "letter": "\u0a5c",
          "transliteration": "rha"
        },
        {
          "letter": "\u0a38",
          "transliteration": "sa"
        },
        {
          "letter": "\u0a39",
          "transliteration": "ha"
        }
      ]
    }
  ]
};

EXTENDED_ALPHABETS["Odia"] = {
  "summary": {
    "total": 51,
    "breakdown": "Vowels (Swara): 12, Consonants (Byanjana): 39"
  },
  "sections": [
    {
      "title": "Vowels (Swara)",
      "description": "12 vowels",
      "letters": [
        {
          "letter": "\u0b05",
          "transliteration": "a"
        },
        {
          "letter": "\u0b06",
          "transliteration": "aa"
        },
        {
          "letter": "\u0b07",
          "transliteration": "i"
        },
        {
          "letter": "\u0b08",
          "transliteration": "ii"
        },
        {
          "letter": "\u0b09",
          "transliteration": "u"
        },
        {
          "letter": "\u0b0a",
          "transliteration": "uu"
        },
        {
          "letter": "\u0b0b",
          "transliteration": "ru"
        },
        {
          "letter": "\u0b0f",
          "transliteration": "e"
        },
        {
          "letter": "\u0b10",
          "transliteration": "ai"
        },
        {
          "letter": "\u0b13",
          "transliteration": "o"
        },
        {
          "letter": "\u0b14",
          "transliteration": "au"
        },
        {
          "letter": "\u0b05\u0b02",
          "transliteration": "am"
        },
        {
          "letter": "\u0b05\u0b03",
          "transliteration": "ah"
        }
      ]
    },
    {
      "title": "Consonants (Byanjana)",
      "description": "39 consonants",
      "letters": [
        {
          "letter": "\u0b15",
          "transliteration": "ka"
        },
        {
          "letter": "\u0b16",
          "transliteration": "kha"
        },
        {
          "letter": "\u0b17",
          "transliteration": "ga"
        },
        {
          "letter": "\u0b18",
          "transliteration": "gha"
        },
        {
          "letter": "\u0b19",
          "transliteration": "nga"
        },
        {
          "letter": "\u0b1a",
          "transliteration": "cha"
        },
        {
          "letter": "\u0b1b",
          "transliteration": "chha"
        },
        {
          "letter": "\u0b1c",
          "transliteration": "ja"
        },
        {
          "letter": "\u0b1d",
          "transliteration": "jha"
        },
        {
          "letter": "\u0b1e",
          "transliteration": "nya"
        },
        {
          "letter": "\u0b1f",
          "transliteration": "ta"
        },
        {
          "letter": "\u0b20",
          "transliteration": "tha"
        },
        {
          "letter": "\u0b21",
          "transliteration": "da"
        },
        {
          "letter": "\u0b22",
          "transliteration": "dha"
        },
        {
          "letter": "\u0b23",
          "transliteration": "na"
        },
        {
          "letter": "\u0b24",
          "transliteration": "ta"
        },
        {
          "letter": "\u0b25",
          "transliteration": "tha"
        },
        {
          "letter": "\u0b26",
          "transliteration": "da"
        },
        {
          "letter": "\u0b27",
          "transliteration": "dha"
        },
        {
          "letter": "\u0b28",
          "transliteration": "na"
        },
        {
          "letter": "\u0b2a",
          "transliteration": "pa"
        },
        {
          "letter": "\u0b2b",
          "transliteration": "pha"
        },
        {
          "letter": "\u0b2c",
          "transliteration": "ba"
        },
        {
          "letter": "\u0b2d",
          "transliteration": "bha"
        },
        {
          "letter": "\u0b2e",
          "transliteration": "ma"
        },
        {
          "letter": "\u0b2f",
          "transliteration": "ya"
        },
        {
          "letter": "\u0b30",
          "transliteration": "ra"
        },
        {
          "letter": "\u0b32",
          "transliteration": "la"
        },
        {
          "letter": "\u0b33",
          "transliteration": "la"
        },
        {
          "letter": "\u0b71",
          "transliteration": "wa"
        },
        {
          "letter": "\u0b36",
          "transliteration": "sha"
        },
        {
          "letter": "\u0b37",
          "transliteration": "sha"
        },
        {
          "letter": "\u0b38",
          "transliteration": "sa"
        },
        {
          "letter": "\u0b39",
          "transliteration": "ha"
        },
        {
          "letter": "\u0b15\u0b4d\u0b37",
          "transliteration": "ksha"
        }
      ]
    }
  ]
};
