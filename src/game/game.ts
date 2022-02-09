type CharResult = "correctGuess" | "wrongPosition" | "incorrectGuess";

const WORD_LENGTH = 5;

export function wordleScore(guess: string, actual: string): Array<CharResult> {
  if (guess.length !== WORD_LENGTH) {
    throw new Error("Guess is incorrect length");
  }

  if (actual.length !== WORD_LENGTH) {
    throw new Error("Actual word is incorrect length");
  }

  const results: Array<CharResult> = [];
  const correctCharacters = Array<boolean>(WORD_LENGTH).fill(false);

  for (let i = 0; i < WORD_LENGTH; i++) {
    const actualWithoutCorrects = actual
      .split("")
      .filter((_, j) => !correctCharacters[j]);

    if (guess[i] === actual[i]) {
      results.push("correctGuess");
      correctCharacters[i] = true;
    } else if (actualWithoutCorrects.includes(guess[i])) {
      results.push("wrongPosition");
    } else {
      results.push("incorrectGuess");
    }
  }
  return results;
}
