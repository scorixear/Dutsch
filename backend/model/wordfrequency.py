import os
import sys
import json

def main():
    with open(os.path.join(sys.path[0], "most_common_words.json"), "r", encoding="utf-8") as f:
        most_common_words = json.load(f)
    with open(os.path.join(sys.path[0], "words.txt"), "w", encoding="utf-8") as f:
        for word in most_common_words:
            f.write(f"{word['word']} {word['freq']}\n")
    

if __name__ == "__main__":
    main()
