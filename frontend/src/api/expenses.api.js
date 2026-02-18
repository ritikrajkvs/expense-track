const BASE_URL = 'https://expense-track-bk7p.onrender.com';

// Helper to get or create a unique User ID for this browser
function getUserId() {
  let id = localStorage.getItem('expense_tracker_user_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('expense_tracker_user_id', id);
  }
  return id;
}

export async function fetchExpenses({ category, sort }) {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (sort) params.append('sort', sort);

  // Send the User ID in the headers
  const res = await fetch(`${BASE_URL}/expenses?${params.toString()}`, {
    headers: {
      'x-user-id': getUserId(),
    },
  });

  if (!res.ok) throw new Error('Failed to fetch expenses');
  return res.json();
}

export async function createExpense(payload) {
  const res = await fetch(`${BASE_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': crypto.randomUUID(),
      'x-user-id': getUserId(), // Send User ID when creating
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create expense');
  }

  return res.json();
}
