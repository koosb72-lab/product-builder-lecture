const nameInput = document.getElementById('name-input');
const birthDateInput = document.getElementById('birth-date');
const birthTimeInput = document.getElementById('birth-time');
const genderSelect = document.getElementById('gender-select');
const sajuBtn = document.getElementById('saju-btn');
const resultBox = document.getElementById('saju-result');

const resultSummary = document.getElementById('result-summary');
const resultZodiac = document.getElementById('result-zodiac');
const resultElement = document.getElementById('result-element');
const resultAdvice = document.getElementById('result-advice');
const resultLucky = document.getElementById('result-lucky');
const themeToggleBtn = document.getElementById('theme-toggle-btn');

const THEME_KEY = 'theme';

const zodiacList = ['원숭이', '닭', '개', '돼지', '쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양'];
const elementMap = {
  0: '금(金)',
  1: '금(金)',
  2: '수(水)',
  3: '수(水)',
  4: '목(木)',
  5: '목(木)',
  6: '화(火)',
  7: '화(火)',
  8: '토(土)',
  9: '토(土)'
};

const advicePool = [
  '오늘은 결정 전에 한 번 더 점검하면 좋은 결과가 나옵니다.',
  '사소한 약속을 잘 지키면 신뢰가 크게 올라갑니다.',
  '무리한 확장보다 현재 루틴을 다듬는 것이 유리합니다.',
  '대화 운이 좋으니 먼저 연락해 보면 흐름이 열립니다.',
  '집중력이 좋은 날이라 짧은 몰입 시간을 여러 번 가져가세요.'
];

const colors = ['파랑', '초록', '노랑', '하늘색', '흰색', '주황'];

const hashText = (text) => {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return hash;
};

const getSajuResult = (dateText, timeText, name, gender) => {
  const [yearText, monthText, dayText] = dateText.split('-');
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const timeSeed = timeText || '12:00';

  const zodiac = zodiacList[year % 12];
  const element = elementMap[year % 10];
  const seed = hashText(`${dateText}-${timeSeed}-${name}-${gender}`);

  const advice = advicePool[seed % advicePool.length];
  const luckyNumber = (seed % 9) + 1;
  const luckyColor = colors[(seed + month + day) % colors.length];

  return { zodiac, element, advice, luckyNumber, luckyColor };
};

const setTheme = (theme) => {
  document.body.dataset.theme = theme;
  themeToggleBtn.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
};

const initTheme = () => {
  const storedTheme = localStorage.getItem(THEME_KEY);
  if (storedTheme === 'dark' || storedTheme === 'light') {
    setTheme(storedTheme);
    return;
  }

  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(systemDark ? 'dark' : 'light');
};

themeToggleBtn.addEventListener('click', () => {
  const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  localStorage.setItem(THEME_KEY, nextTheme);
});

sajuBtn.addEventListener('click', () => {
  const dateText = birthDateInput.value;
  if (!dateText) {
    alert('생년월일을 입력해 주세요.');
    return;
  }

  const name = nameInput.value.trim() || '당신';
  const gender = genderSelect.value;
  const timeText = birthTimeInput.value;
  const result = getSajuResult(dateText, timeText, name, gender);

  resultSummary.textContent = `${name}님의 오늘 운세는 차분히 쌓아가는 상승 흐름입니다.`;
  resultZodiac.textContent = `띠: ${result.zodiac}띠`;
  resultElement.textContent = `오행 성향: ${result.element}`;
  resultAdvice.textContent = `조언: ${result.advice}`;
  resultLucky.textContent = `행운 포인트: 숫자 ${result.luckyNumber}, 색상 ${result.luckyColor}`;

  resultBox.classList.remove('hidden');
});

initTheme();
