# BizDash API Documentation

This document provides a comprehensive guide to the BizDash Backend APIs to help frontend developers seamlessly integrate the backend services.

## Base URL
All endpoints are relative to the server's base URL (e.g., `http://localhost:5000` or your production domain).

---

## 1. Create a New User & Booking (Form Submission)

This endpoint is used for form submissions when a user creates an enquiry or booking. If a user with the provided email already exists, it will attach the new booking to their existing account's history.

- **URL:** `/api/users`
- **Method:** `POST`
- **Access:** Public (No authentication required)

### Request Structure
The backend expects the request payload as `application/json`.

```json
{
  "name": "John Doe",         // Required (String)
  "email": "john@example.com",// Required (String)
  "phone": 1234567890,        // Required (Number)
  "projectType": "Web Dev",   // Optional (String)
  "budget": "$1000 - $5000",  // Optional (String)
  "enquiry": "I need a site.",// Optional (String)
  "type": "enquiry",          // Optional (String: "booking" or "enquiry". Default is "enquiry")
  "date": "2026-10-01",       // Optional (Date string)
  "time": "10:00 AM"          // Optional (String)
}
```

### Response Structure

**Success Response (HTTP 201 Created):**
The response returns the created `user` object and the associated `booking` object.
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "64f9b8c9e4b0a1a2b3c4d5e6",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": 1234567890,
      "bookings": [
        "64f9b8c9e4b0a1a2b3c4d5e7"
      ],
      "createdAt": "2026-09-01T12:00:00.000Z",
      "updatedAt": "2026-09-01T12:00:00.000Z",
      "__v": 0
    },
    "booking": {
      "_id": "64f9b8c9e4b0a1a2b3c4d5e7",
      "user": "64f9b8c9e4b0a1a2b3c4d5e6",
      "projectType": "Web Dev",
      "budget": "$1000 - $5000",
      "enquiry": "I need a site.",
      "type": "enquiry",
      "createdAt": "2026-09-01T12:00:00.000Z",
      "updatedAt": "2026-09-01T12:00:00.000Z",
      "__v": 0
    }
  }
}
```

**Error Response (HTTP 400 Bad Request) - Missing Required Fields:**
```json
{
  "success": false,
  "message": "Please provide name, email, and phone"
}
```

---

## 2. Get All Users and Their Booking History (Admin View)

This endpoint retrieves a list of all users, sorted by the newest first. It automatically populates the nested `bookings` array with full booking details.

- **URL:** `/api/users`
- **Method:** `GET`
- **Access:** Private

### Security Flags Required

This route is protected. The frontend **MUST** include an API key in the request headers.

- **Header Name:** `x-api-key`
- **Value:** The API key shared by the backend team.

Example `fetch` call:
```javascript
fetch('/api/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY_HERE'
  }
})
```

### Request Structure
No request body is required.

### Response Structure

**Success Response (HTTP 200 OK):**
Note how the `bookings` array is populated with the complete booking schema properties.
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "64f9b8c9e4b0a1a2b3c4d5e6",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": 1234567890,
      "createdAt": "2026-09-01T12:00:00.000Z",
      "updatedAt": "2026-09-01T12:00:00.000Z",
      "bookings": [
        {
          "_id": "64f9b8c9e4b0a1a2b3c4d5e7",
          "user": "64f9b8c9e4b0a1a2b3c4d5e6",
          "projectType": "Web Dev",
          "budget": "$1000 - $5000",
          "enquiry": "I need a site.",
          "type": "enquiry",
          "createdAt": "2026-09-01T12:00:00.000Z",
          "updatedAt": "2026-09-01T12:00:00.000Z"
        }
      ]
    }
  ]
}
```

**Error Response (HTTP 401 Unauthorized) - Missing/Invalid API Key:**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

---

## Global Backend Configurations (Frontend Context)

> [!IMPORTANT]
> **CORS Configurations**
> The backend explicitly allows requests from the origins specified in its environment variables. It accepts standard HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`) and specific headers (`Content-Type`, `Authorization`, `x-api-key`). 

> [!TIP]
> **Rate Limiting**
> Be mindful of rate-limiting. A maximum of **100 requests per 15 minutes** is allowed per IP address across all `/api/*` routes to prevent DDoS and brute-force attacks. Exceeding this limit will result in a standard Rate Limit response error.

> [!NOTE]
> **Security Features**
> The backend automatically sanitizes inputs against XSS and NoSQL injections. Frontend validation should still be robust, but it's good to know the backend acts as a strict secondary defense layer. Payload sizes for JSON and URL Encoded data are limited to `10kb`.
