# DevsFusion API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Auth Endpoints

### Register Admin
```http
POST /api/auth/register
```
**Body:**
```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "yourpassword"
}
```

### Login
```http
POST /api/auth/login
```
**Body:**
```json
{
  "email": "admin@example.com",
  "password": "yourpassword"
}
```
**Response:**
```json
{
  "status": "success",
  "data": {
    "admin": { "id": "...", "name": "...", "email": "..." },
    "token": "jwt-token-here"
  }
}
```

### Get Current Admin Profile
```http
GET /api/auth/me
```
🔒 **Protected**

### Update Password
```http
PUT /api/auth/update-password
```
🔒 **Protected**
**Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

---

## Projects Endpoints

### Get All Projects
```http
GET /api/projects
```
**Query Parameters:**
- `featured` (boolean) - Filter by featured projects
- `limit` (number) - Limit results
- `sort` (string) - Sort field (default: `-createdAt`)

**Example:** `GET /api/projects?featured=true&limit=6`

### Get Single Project
```http
GET /api/projects/:id
```

### Create Project
```http
POST /api/projects
```
🔒 **Protected**
**Body:**
```json
{
  "title": "Project Name",
  "description": "Project description...",
  "imageLink": "https://example.com/image.jpg",
  "techStack": ["React", "Node.js", "MongoDB"],
  "liveLink": "https://project-live.com",
  "githubLink": "https://github.com/user/repo",
  "featured": true,
  "order": 1
}
```

### Update Project
```http
PUT /api/projects/:id
```
🔒 **Protected**

### Delete Project
```http
DELETE /api/projects/:id
```
🔒 **Protected**

---

## Testimonials Endpoints

### Get All Testimonials
```http
GET /api/testimonials
```
**Query Parameters:**
- `featured` (boolean) - Filter by featured testimonials
- `limit` (number) - Limit results
- `sort` (string) - Sort field (default: `-createdAt`)

### Get Single Testimonial
```http
GET /api/testimonials/:id
```

### Create Testimonial
```http
POST /api/testimonials
```
🔒 **Protected**
**Body:**
```json
{
  "name": "John Doe",
  "designation": "CEO",
  "company": "Tech Corp",
  "message": "Amazing work! Highly recommended.",
  "avatar": "https://example.com/avatar.jpg",
  "rating": 5,
  "featured": true,
  "order": 1
}
```

### Update Testimonial
```http
PUT /api/testimonials/:id
```
🔒 **Protected**

### Delete Testimonial
```http
DELETE /api/testimonials/:id
```
🔒 **Protected**

---

## Contact Endpoints

### Submit Contact Form (Public)
```http
POST /api/contact
```
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I would like to discuss a project...",
  "phone": "+91 62834 21968"
}
```
✉️ Sends email notification to admin and auto-reply to user.

### Get All Contact Submissions
```http
GET /api/contact
```
🔒 **Protected**
**Query Parameters:**
- `status` (string) - Filter by status: `unread`, `read`, `replied`, `archived`
- `limit` (number) - Limit results (default: 20)
- `page` (number) - Page number
- `sort` (string) - Sort field (default: `-createdAt`)

### Get Contact Stats
```http
GET /api/contact/stats
```
🔒 **Protected**

### Get Single Contact
```http
GET /api/contact/:id
```
🔒 **Protected**

### Update Contact Status
```http
PATCH /api/contact/:id/status
```
🔒 **Protected**
**Body:**
```json
{
  "status": "read"
}
```
Valid statuses: `unread`, `read`, `replied`, `archived`

### Delete Contact
```http
DELETE /api/contact/:id
```
🔒 **Protected**

---

## Environment Variables

Add these to your `.env` file:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
EMAIL_USER=contact.devsfusion@gmail.com
EMAIL_PASS=your-gmail-app-password
```

### Gmail App Password Setup:
1. Enable 2-Factor Authentication on your Google Account
2. Go to: Google Account > Security > App passwords
3. Generate a new app password for "Mail"
4. Use that 16-character password as `EMAIL_PASS`

---

## Project Structure

```
devsfusion-api/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── contactController.js
│   ├── projectController.js
│   └── testimonialController.js
├── middleware/
│   └── auth.js
├── models/
│   ├── Admin.js
│   ├── Contact.js
│   ├── Project.js
│   └── Testimonial.js
├── routes/
│   ├── authRoutes.js
│   ├── contactRoutes.js
│   ├── projectRoutes.js
│   └── testimonialRoutes.js
├── utils/
│   └── emailService.js
├── .env
├── .env.example
├── .gitignore
├── package.json
└── server.js
```
