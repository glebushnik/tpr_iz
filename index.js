import { capacity, weights, values } from "./data.js";
function knapsack(capacity, weights, values, n) {
  // Создаем таблицу для хранения промежуточных результатов
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(capacity + 1).fill(0));

  // Заполняем таблицу dp
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= capacity; w++) {
      // Если вес текущего предмета меньше или равен текущему весу
      if (weights[i - 1] <= w) {
        // Выбираем максимум между:
        // 1. Значением без текущего предмета
        // 2. Значением с текущим предметом + лучшим значением для оставшегося веса
        dp[i][w] = Math.max(
          dp[i - 1][w],
          values[i - 1] + dp[i - 1][w - weights[i - 1]]
        );
      } else {
        // Если предмет не помещается, берем значение без него
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Теперь находим какие предметы вошли в решение
  let res = dp[n][capacity];
  let w = capacity;
  const items = [];

  for (let i = n; i > 0 && res > 0; i--) {
    if (res !== dp[i - 1][w]) {
      items.push(i - 1); // Добавляем индекс предмета
      res -= values[i - 1];
      w -= weights[i - 1];
    }
  }

  return {
    maxValue: dp[n][capacity],
    items: items.reverse(), // Индексы предметов, которые нужно взять
  };
}

// Пример использования
const n = values.length; // Количество предметов

const result = knapsack(capacity, weights, values, n);
console.log(`Максимальная ценность: ${result.maxValue}`);
console.log(`Индексы выбранных предметов: ${result.items.join(", ")}`);
console.log(
  `Выбранные веса: ${result.items.map((i) => weights[i]).join(", ")}`
);
console.log(
  `Выбранные ценности: ${result.items.map((i) => values[i]).join(", ")}`
);
