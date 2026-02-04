const form = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const list = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total-amount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function saveToLocalStorage() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function updateTotal() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalDisplay.textContent = total.toFixed(2);
}

function renderExpenses() {
  list.innerHTML = '';
  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.name} - ₹${expense.amount.toFixed(2)}
      <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
  updateTotal();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveToLocalStorage();
  renderExpenses();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!name || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid expense name and amount.");
    return;
  }

  const newExpense = { name, amount };
  expenses.push(newExpense);
  saveToLocalStorage();
  renderExpenses();

  nameInput.value = '';
  amountInput.value = '';
});

// Initial render
renderExpenses();