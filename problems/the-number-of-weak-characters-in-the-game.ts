/**
 * You are playing a game that contains multiple characters, and each of the characters has two main properties: attack and defense. You are given a 2D integer array properties where properties[i] = [attacki, defensei] represents the properties of the ith character in the game.
 *
 * A character is said to be weak if any other character has both attack and defense levels strictly greater than this character's attack and defense levels. More formally, a character i is said to be weak if there exists another character j where attackj > attacki and defensej > defensei.
 *
 * Return the number of weak characters.
 *
 *
 *
 * Example 1:
 *
 * Input: properties = [[5,5],[6,3],[3,6]]
 * Output: 0
 * Explanation: No character has strictly greater attack and defense than the other.
 * Example 2:
 *
 * Input: properties = [[2,2],[3,3]]
 * Output: 1
 * Explanation: The first character is weak because the second character has a strictly greater attack and defense.
 * Example 3:
 *
 * Input: properties = [[1,5],[10,4],[4,3]]
 * Output: 1
 * Explanation: The third character is weak because the second character has a strictly greater attack and defense.
 *
 *
 * Constraints:
 *
 * 2 <= properties.length <= 105
 * properties[i].length == 2
 * 1 <= attacki, defensei <= 10^5
 */

function numberOfWeakCharacters(properties: number[][]): number {
    let weakCharacters = 0;

    const sortedByAttack = properties.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : b[0] - a[0]);
    const attackMap = new Map<number, number[]>();

    sortedByAttack.forEach((attack) => {
        if(!attackMap.get(attack[0])){
            attackMap.set(attack[0], []);
        }
        attackMap.get(attack[0])!.push(attack[1]);
    })

    let strongestCharacter: [number, number] | null = null;

    attackMap.forEach((defences, attack, map) => {
        if(strongestCharacter === null) {
            strongestCharacter = [attack, defences[0]];
        } else {
            defences.forEach((defence) => {
                if(strongestCharacter![0] > attack && strongestCharacter![1] > defence) {
                    weakCharacters++;
                }
            })
            if(defences[0] > strongestCharacter[1]) {
                strongestCharacter = [attack, defences[0]];
            }

        }
    })

    return weakCharacters
}

