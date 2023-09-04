const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator_buttons');
const display = document.querySelector('.calculator_display');

let firstOperand = '';
let operator = '';
let waitingForSecondOperand = false;

keys.addEventListener('click', (e) => {
	const key = e.target;
	const keyValue = key.textContent;
	//casistiche per i bottoni premuti
	if (key.tagName === 'BUTTON') {
		if (keyValue === '+' || keyValue === '-' || keyValue === '*' || keyValue === '/') {
			if (operator) {
				return;
			}
			operator = keyValue;
			firstOperand = display.textContent;
			waitingForSecondOperand = true;
		} else if (keyValue === '=') {
			if (!operator) {
				return;
			}
			if (waitingForSecondOperand) {
				return;
			}
			const secondOperand = display.textContent;
			firstOperand = calculate(firstOperand, operator, secondOperand);
			operator = '';
			waitingForSecondOperand = false;
			display.textContent = firstOperand;
		} else if (keyValue === 'AC') {
			firstOperand = '';
			operator = '';
			waitingForSecondOperand = false;
			display.textContent = '';
		} else if (keyValue === '.') {
			if (waitingForSecondOperand) {
				return;
			}
			if (!firstOperand.includes('.')) {
				firstOperand += '.';
			}
		} else {
			if (waitingForSecondOperand) {
				waitingForSecondOperand = false;
				display.textContent = keyValue;
			} else {
				display.textContent = display.textContent === '0' ? keyValue : display.textContent + keyValue;
			}
		}
	}
});

function calculate(firstOperand, operator, secondOperand) {
	firstOperand = parseFloat(firstOperand.replace(',', '.'));
	secondOperand = parseFloat(secondOperand.replace(',', '.'));

	switch (operator) {
		case '+':
			return (firstOperand + secondOperand).toString().replace('.', ','); // Reimposta la virgola come separatore decimale
		case '-':
			return (firstOperand - secondOperand).toString().replace('.', ',');
		case '*':
			return (firstOperand * secondOperand).toString().replace('.', ',');
		case '/':
			if (secondOperand === 0) {
				return 'Errore';
			}
			return (firstOperand / secondOperand).toString().replace('.', ',');
		default:
			return secondOperand.toString().replace('.', ',');
	}
}
