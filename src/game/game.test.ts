import { wordleScore } from "./game";

describe("Wordle score", () => {
  it("Throws error for empty string as guess", () => {
    expect(() => wordleScore("", "actual")).toThrow();
  });

  it("Throws error for empty string as actual", () => {
    expect(() => wordleScore("guess", "")).toThrow();
  });

  it("Returns array full of correctGuess for exact match (using all unique characters)", () => {
    // Arrange
    const guess = "abcde";
    const actual = guess;

    // Act
    const score = wordleScore(guess, actual);

    // Assert
    expect(score).toHaveLength(actual.length);
    expect(score.every((result) => result === "correctGuess")).toBeTruthy();
  });

  it("Returns array full of incorrectGuess for completely wrong guess", () => {
    // Arrange
    const guess = "abcde";
    const actual = "uwxyz";

    // Act
    const score = wordleScore(guess, actual);

    // Assert
    expect(score).toHaveLength(actual.length);
    expect(score.every((result) => result === "incorrectGuess")).toBeTruthy();
  });

  it("Returns array full of wrongPosition for right characters, all unique, all off-position by one", () => {
    // Arrange
    const guess = "abcde";
    const actual = "eabcd";

    // Act
    const score = wordleScore(guess, actual);

    // Assert
    expect(score).toHaveLength(actual.length);
    expect(score.every((result) => result === "wrongPosition")).toBeTruthy();
  });

  it("Returns array full of correctGuess for exact match (using repeated characters)", () => {
    // Arrange
    const guess = "aabbc";
    const actual = guess;

    // Act
    const score = wordleScore(guess, actual);

    // Assert
    expect(score).toHaveLength(actual.length);
    expect(score.every((result) => result === "correctGuess")).toBeTruthy();
  });

  it("Returns incorrect letter for extra instance of character used once in actual", () => {
    // Arrange
    const guess = "abcda";
    const actual = "abcde";

    // Act
    const score = wordleScore(guess, actual);

    // Assert
    expect(score).toHaveLength(actual.length);
    expect(score[4]).toBe("incorrectGuess");
  });

  it("Returns wrongPosition for repeated character where one instance is out of position", () => {
    // Arrange
    const guess = "abcda";
    const actual = "aaxyz";

    // Act
    const score = wordleScore(guess, actual);

    // Assert
    expect(score).toHaveLength(actual.length);
    expect(score[4]).toBe("wrongPosition");
  });
});
