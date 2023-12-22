import os
import sys

APRABET_TO_IPA = {
    "AA": "ɑ", # ɑ or ɒ
    "AE": "æ",
    "AH": "ʌ",
    "AO": "ɔ",
    "AW": "aʊ",
    "AX": "əɹ", # ɚ
    "AXR": "ə",
    "AY": "aɪ",
    "EH": "ɛ",
    "ER": "ɛɹ", # ɝ
    "EY": "eɪ",
    "IH": "ɪ",
    "IX": "ɨ",
    "IY": "i",
    "OW": "oʊ",
    "OY": "ɔɪ",
    "UH": "ʊ",
    "UW": "u",
    "UX": "ʉ",
    "B": "b",
    "CH": "tʃ",
    "D": "d",
    "DH": "ð",
    "DX": "ɾ",
    "EL": "l̩",
    "EM": "m̩",
    "EN": "n̩",
    "F": "f",
    "G": "ɡ",
    "HH": "h",
    "H": "h",
    "JH": "dʒ",
    "K": "k",
    "L": "l",
    "M": "m",
    "N": "n",
    "NG": "ŋ",
    "NX": "ɾ̃",
    "P": "p",
    "Q": "ʔ",
    "R": "ɹ",
    "S": "s",
    "SH": "ʃ",
    "T": "t",
    "TH": "θ",
    "V": "v",
    "W": "w",
    "WH": "ʍ",
    "Y": "j",
    "Z": "z",
    "ZH": "ʒ",
}

def main():
    with open(os.path.join(sys.path[0], 'words.txt'), "r", encoding="utf-8") as f:
        words = f.read().strip().splitlines()
    words = words[:60000]
    wordSet = set(words)
    print("Total words:", len(wordSet))
    
    with open(os.path.join(sys.path[0], 'cmusphinx-voxforg-de.dic'), "r", encoding="utf-8") as f:
        cmu_words = f.read().strip().splitlines()
    print(f"Converting {len(cmu_words)} words...")
    
    for i, word in enumerate(cmu_words):
        word = word.strip()
        if word == "":
            continue
        wordUpper, sounds = word.split(None, 1)
        syllabels = sounds.split()

if __name__ == "__main__":
    main()
