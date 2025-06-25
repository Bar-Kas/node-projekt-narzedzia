const apiUrl = '/users';
const tableBody = document.getElementById('users-table');
const form = document.getElementById('add-form');

async function fetchUsers() {
  const res = await fetch(apiUrl);
  const users = await res.json();
  tableBody.innerHTML = users.map(u => `
    <tr>
      <td>${u.id}</td>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td><button onclick="deleteUser(${u.id})">Usuń</button></td>
    </tr>
  `).join('');
}

async function addUser(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!name || !email) return;
  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });
  form.reset();
  fetchUsers();
}

async function deleteUser(id) {
  if (!confirm('Usunąć użytkownika o ID ' + id + '?')) return;
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchUsers();
}

form.addEventListener('submit', addUser);
window.addEventListener('load', fetchUsers);

