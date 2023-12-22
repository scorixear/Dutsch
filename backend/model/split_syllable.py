import os
import sys
import json

def clear():
    if os.name == 'nt':
        _ = os.system('cls')
    else:
        _ = os.system('clear')

def main():
    with open(os.path.join(sys.path[0], "cmusphinx-voxforge-de.dic"), "r", encoding="utf-8") as f:
        cmu_words = f.read().strip().splitlines()
    
    already_counted = set()
    if os.path.isfile(os.path.join(sys.path[0], "aprabet.txt")):
        print("Loading aprabet.txt...")
        with open(os.path.join(sys.path[0], "aprabet.txt"), "r", encoding="utf-8") as f:
            aprabet = f.read().strip().splitlines()
        for word in aprabet:
            word = word.split()[0]
            already_counted.add(word)
    else:
        with open(os.path.join(sys.path[0], "aprabet.txt"), "w", encoding="utf-8") as f:
            pass
    w = -1
    while w < len(cmu_words):
        w += 1
        word = cmu_words[w]
        word, *aprabet = word.split()
        if word in already_counted:
            continue
        syllabels = []
        curr_syllabel = []
        aprabet = [char for char in aprabet if char != "Q"]
        reset = False
        for i, char in enumerate(aprabet):
            clear()
            print(word)
            if i == 0:
                print(f"\033[4m{char}\033[0m {' '.join(aprabet[i+1:])}")
            elif i == len(aprabet) - 1:
                print(f"{' '.join(aprabet[:i])} \033[4m{char}\033[0m")
            else:
                print(f"{' '.join(aprabet[:i])} \033[4m{char}\033[0m {' '.join(aprabet[i+1:])}")
            action = input("ENTER(next) \",\"(syllable) 0(skip) r(retry) q(QUIT):")
            if action == ",":
                curr_syllabel.append(char)
                syllabels.append(" ".join(curr_syllabel))
                curr_syllabel = []
            elif action == "0":
                syllabels = syllabels + [" ".join(aprabet[i:])]
                break
            elif action == "r":
                w -= 1
                reset = True
                break
            elif action == "q":
                return
            else:
                curr_syllabel.append(char)
        if reset:
            continue
        if curr_syllabel != []:
            syllabels.append(" ".join(curr_syllabel))
        with open(os.path.join(sys.path[0], "aprabet.txt"), "a", encoding="utf-8") as f:
            f.write(f"{word} {' . '.join(syllabels)}\n")
            

                
        

if __name__ == "__main__":
    main()
