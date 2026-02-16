const lottoNumbersContainer = document.getElementById('lotto-numbers');
const generateBtn = document.getElementById('generate-btn');

const generateLottoNumbers = () => {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return Array.from(numbers).sort((a, b) => a - b);
};

const getColorForNumber = (number) => {
  if (number <= 10) return '#fbc400';
  if (number <= 20) return '#69c8f2';
  if (number <= 30) return '#ff7272';
  if (number <= 40) return '#aaaaaa';
  return '#b0d840';
};

const displayNumbers = (numbers) => {
  lottoNumbersContainer.innerHTML = '';
  numbers.forEach(number => {
    const numberElement = document.createElement('div');
    numberElement.className = 'lotto-number';
    numberElement.textContent = number;
    numberElement.style.backgroundColor = getColorForNumber(number);
    lottoNumbersContainer.appendChild(numberElement);
  });
};

generateBtn.addEventListener('click', () => {
  const numbers = generateLottoNumbers();
  displayNumbers(numbers);
});

// Initial generation
displayNumbers(generateLottoNumbers());
