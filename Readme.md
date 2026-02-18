# Expense Track – Full Stack Expense Tracker

A minimal, production-lean full-stack expense tracker built to demonstrate correctness under real-world conditions (retries, refreshes, slow/failing networks), data integrity for money handling, and sound engineering judgment.

---

## ✨ Features

- Add expenses with amount, category, description, and date  
- List expenses with filtering by category  
- Sort expenses by date (newest first)  
- Display total of currently visible expenses  
- Retry-safe expense creation (idempotent POST)  
- Backend validation and centralized error handling  
- Simple, responsive UI with loading and error states  

---

## 🛠️ Tech Stack

**Backend**
- Node.js, Express  
- MongoDB with Mongoose  
- Joi for request validation  
- Jest + Supertest for basic API tests  

**Frontend**
- React (Vite)  
- Tailwind CSS  
- Fetch API for backend communication  

---

## 🧠 Key Design Decisions

- **Idempotent POST `/expenses`:**  
  Implemented support for idempotent writes using an `Idempotency-Key` header to prevent duplicate expense creation when users retry requests due to network issues, double submissions, or page refreshes.

- **Money Handling as Integers:**  
  Expense amounts are stored as integers (paise) instead of floating-point numbers to avoid precision and rounding errors common in monetary calculations.

- **Separation of Concerns in Backend:**  
  The backend is structured using routes, controllers, models, and middleware to keep request handling, business logic, validation, and error handling cleanly separated and maintainable over time.

- **Minimal, Production-Like UI:**  
  The frontend focuses on correctness, clarity, and handling loading/error states rather than heavy styling or animations, reflecting how small production features are often shipped.

---

## ⚖️ Trade-offs Due to Timebox

- **No Authentication / Multi-User Support:**  
  The application assumes a single-user context. User accounts and authentication were intentionally excluded to keep the scope focused on core expense tracking and API correctness.

- **Simple Persistence and Query Model:**  
  MongoDB is used without pagination, advanced indexing, or performance optimizations. This keeps the implementation simple while remaining realistic for a small production feature.

- **Limited Automated Test Coverage:**  
  Only a small set of backend tests are included to validate core API behavior. Comprehensive test coverage (frontend tests, edge-case scenarios, performance tests) was deprioritized due to time constraints.

---

## 🚫 What Was Intentionally Not Done

- Authentication and authorization  
- Pagination or infinite scrolling for expense lists  
- Advanced analytics or visualizations (e.g., category-wise charts, monthly trends)  
- Offline-first support or client-side caching  
- CI/CD pipeline or production deployment configuration  

These were intentionally excluded to keep the solution focused on the assignment’s core goals: correctness, reliability under retries, and clear engineering decisions.

---

## ▶️ Running Locally

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
