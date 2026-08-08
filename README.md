# FilePro - Backend File Processing System

FilePro is a backend-focused file management and processing system built to handle file uploads, storage, sharing, and asynchronous file processing workflows.

The main focus of this project was designing a scalable backend architecture with proper separation of concerns, background processing, and production-style workflows.

---

# Features

## Authentication

- JWT based authentication
- Secure cookie-based authentication
- Protected API routes
- User-based file ownership
- User access validation

---

## File Management

- Upload files
- Store files using Cloudinary
- Manage user files
- Delete files securely
- Generate shareable file links
- Store file metadata in PostgreSQL

---

# Image Processing

Image processing is implemented using Sharp.

Supported operations:

- Resize images
- Crop images
- Blur images
- Rotate images
- Convert images to grayscale

Image processing follows a service-based architecture where processing logic is separated from controllers.

---

# PDF Processing

PDF operations are implemented using PDF-Lib.

Supported operations:

- Merge multiple PDFs
- Create PDFs
- Split PDFs

Large PDF operations are handled asynchronously using background workers.

---

# Background Job Processing

FilePro uses Redis and BullMQ for handling long-running tasks.

Instead of keeping users waiting while heavy operations run, the system creates processing jobs and workers handle them separately.

Workflow:

```
API Request
      |
      ↓
Create Processing Job
      |
      ↓
Redis Queue
      |
      ↓
BullMQ Worker
      |
      ↓
Process File
      |
      ↓
Update Job Status
```

This improves scalability and prevents heavy processing tasks from blocking the main API server.

---

# Job Management System

Processing jobs are tracked in PostgreSQL.

Each job contains:

- User information
- Processing type
- Current status
- Result file
- Error message
- Created and updated timestamps

Job states:

```
PENDING
PROCESSING
COMPLETED
FAILED
```

---

# Architecture

```
                 Client
                    |
                    |
              Express API
                    |
        ------------------------
        |                      |
 Controllers              BullMQ Queue
        |                      |
 Services                  Redis
        |                      |
 Cloudinary              Worker Process
        |                      |
        -------- PostgreSQL -----
```

---

# Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Storage

- Cloudinary

## Processing Libraries

- Sharp
- PDF-Lib

## Background Processing

- Redis
- BullMQ

---

# Project Structure

```
src
|
├── config
│
├── controllers
│
├── routes
│
├── services
│
├── workers
│
├── queues
│
├── middleware
│
├── utils
│
└── prisma
```

---

# Database Design

Main models:

## User

Stores user authentication information.

## File

Stores uploaded file metadata:

- File name
- Original name
- URL
- Cloudinary ID
- Size
- MIME type
- Owner

## ProcessingJob

Tracks background processing tasks:

- Job type
- Status
- Result file
- Errors

## ShareLink

Handles secure file sharing.

---

# Environment Variables

Create a `.env` file:

```env
DATABASE_URL=

PORT=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

REDIS_URL=
```

---

# Installation

Clone repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

---

# Running Application

Start backend:

```bash
npm run dev
```

Start BullMQ worker:

```bash
npm run worker
```

---

# Key Backend Concepts Implemented

Through this project, I worked on:

- Building scalable backend architecture
- Designing REST APIs
- Database relationship design
- Prisma ORM usage
- Authentication systems
- Cloud storage integration
- File processing pipelines
- Background workers
- Queue-based architecture
- Asynchronous programming

---

# Future Improvements

Planned improvements:

- Email notifications after processing completion
- File compression
- Rate limiting
- Docker support
- Better monitoring and logging
- More file processing features
- Cloud storage optimization

---

# Author

Samar

Backend Developer
