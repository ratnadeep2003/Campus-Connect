# Campus Connect

A full-stack web application to manage student and course information.

## Features

- Add and store student details (name, surname, email, mobile)
- Add and store course details (title, description, duration)
- Data persisted in MongoDB

## Tech Stack

**Frontend:** React.js, Vite  
**Backend:** Node.js, Express.js  
**Database:** MongoDB, Mongoose

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account

### Installation

**Backend**
```bash
cd backend
npm install
node index.js
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

## Project Structure
```
Campus-Connect/
├── backend/
│   ├── models/
│   │   ├── StudentSchema.js
│   │   └── CourseSchema.js
│   ├── routes/
│   │   ├── studentRoutes.js
│   │   ├── courseRoutes.js
│   │   └── courseAssignRoutes.js
│   └── index.js
└── frontend/
    └── src/
```