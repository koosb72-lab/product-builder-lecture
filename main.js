// Theme switching logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Apply saved theme on initial load
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
        themeToggle.textContent = savedTheme === 'dark' ? '라이트 모드' : '다크 모드';
    }


    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                html.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '다크 모드';
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '라이트 모드';
            }
        });
    }
});


class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'lotto-container');

        const title = document.createElement('h1');
        title.textContent = '로또 번호 추천';

        const numbersContainer = document.createElement('div');
        numbersContainer.setAttribute('class', 'numbers-container');

        const button = document.createElement('button');
        button.textContent = '번호 생성';

        shadow.appendChild(wrapper);
        wrapper.appendChild(title);
        wrapper.appendChild(numbersContainer);
        wrapper.appendChild(button);

        button.addEventListener('click', () => {
            this.generateNumbers(numbersContainer);
        });

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
            }
            .lotto-container {
                background: var(--lotto-container-bg);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                border: 1px solid var(--lotto-container-border);
                text-align: center;
                transition: background 0.3s ease, border 0.3s ease;
            }
            h1 {
                color: var(--lotto-text-color);
                font-size: 2.5em;
                margin-bottom: 30px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
                transition: color 0.3s ease;
            }
            .numbers-container {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin-bottom: 40px;
            }
            .number {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                font-size: 1.8em;
                font-weight: bold;
                color: white;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                transition: transform 0.3s ease, background-color 0.3s ease;
                animation: fadeIn 0.5s ease-in-out;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: scale(0.5);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            .number:hover {
                transform: translateY(-5px);
            }

            button {
                background: linear-gradient(45deg, #ff6b6b, #feca57);
                border: none;
                border-radius: 50px;
                color: #fff;
                padding: 15px 35px;
                font-size: 1.2em;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(0,0,0,0.25);
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            button:hover {
                transform: translateY(-3px);
                box-shadow: 0 6px 25px rgba(0,0,0,0.3);
            }
            button:active {
                transform: translateY(-1px);
                box-shadow: 0 3px 15px rgba(0,0,0,0.2);
            }
        `;
        shadow.appendChild(style);
        this.generateNumbers(numbersContainer); // 초기 로딩 시 번호 생성
    }

    generateNumbers(container) {
        container.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        sortedNumbers.forEach((number, index) => {
            const numberDiv = document.createElement('div');
            numberDiv.setAttribute('class', 'number');
            numberDiv.textContent = number;
            numberDiv.style.animationDelay = `${index * 0.1}s`; // Stagger animation

            // Set color based on number range
            if (number <= 10) {
                numberDiv.style.backgroundColor = '#fbc531'; // Yellow
            } else if (number <= 20) {
                numberDiv.style.backgroundColor = '#487eb0'; // Blue
            } else if (number <= 30) {
                numberDiv.style.backgroundColor = '#e84118'; // Red
            } else if (number <= 40) {
                numberDiv.style.backgroundColor = '#8c7ae6'; // Purple
            } else {
                numberDiv.style.backgroundColor = '#27ae60'; // Green
            }

            container.appendChild(numberDiv);
        });
    }
}

customElements.define('lotto-generator', LottoGenerator);
