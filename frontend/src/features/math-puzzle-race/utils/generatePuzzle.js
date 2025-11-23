export const generatePuzzle = (score = 0) => {
  let maxRange = 20;

  if (score > 15) maxRange = 100;
  else if (score > 5) maxRange = 50;

  const operators = ["+", "-", "*"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  const num1 = Math.floor(Math.random() * maxRange) + 1;
  const num2 = Math.floor(Math.random() * maxRange) + 1;

  let question = `${num1} ${operator} ${num2}`;
  let answer;

  switch (operator) {
    case "+":
      answer = num1 + num2;
      break;
    case "-":
      answer = num1 - num2;
      break;
    case "*":
      answer = num1 * num2;
      break;
  }

  // Generate wrong answers
  const wrong1 = answer + (Math.floor(Math.random() * 5) + 1);
  const wrong2 = answer - (Math.floor(Math.random() * 5) + 1);

  // Shuffle options
  const options = [answer, wrong1, wrong2].sort(() => Math.random() - 0.5);

  return { question, answer, options };
};
