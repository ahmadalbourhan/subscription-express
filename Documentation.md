# Subscription Backend Documentation

## Overview
This project is a backend service for managing user subscriptions. It includes features such as user authentication, subscription management, email reminders, and workflow automation. The backend is built using Node.js and Express, with MongoDB as the database.

---

## Dependencies

### Core Dependencies
1. **[express](https://expressjs.com/)**: A web framework for building RESTful APIs.
2. **[mongoose](https://mongoosejs.com/)**: An ODM (Object Data Modeling) library for MongoDB.
3. **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)**: For generating and verifying JWT tokens for authentication.
4. **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)**: For hashing and verifying passwords.
5. **[dotenv](https://github.com/motdotla/dotenv)**: For managing environment variables.
6. **[nodemailer](https://nodemailer.com/)**: For sending emails.
7. **[dayjs](https://day.js.org/)**: For date manipulation.
8. **[@upstash/workflow](https://github.com/upstash/workflow-js)**: For managing workflows and scheduling tasks.
9. **[@arcjet/node](https://arcjet.io/)**: For bot detection, rate limiting, and security features.

### Development Dependencies
1. **[eslint](https://eslint.org/)**: For linting JavaScript code.
2. **[@eslint/js](https://eslint.org/docs/latest/use/configure/)**: ESLint's JavaScript configuration.
3. **[globals](https://github.com/sindresorhus/globals)**: Provides a list of global variables for ESLint.

---

## Project Structure

```
subscription-backend/
├── app.js                  # Entry point of the application
├── config/                 # Configuration files
│   ├── arcjet.js           # Arcjet configuration
│   ├── env.js              # Environment variable loader
│   ├── nodemailer.js       # Nodemailer configuration
│   └── upstash.js          # Upstash workflow client
├── controllers/            # Controllers for handling business logic
│   ├── auth.controller.js  # Authentication logic
│   ├── subscription.controller.js # Subscription logic
│   ├── user.controller.js  # User logic
│   └── workflow.controller.js # Workflow logic
├── database/               # Database connection
│   └── mongodb.js          # MongoDB connection setup
├── middlewares/            # Middleware functions
│   ├── arcjet.middleware.js # Arcjet middleware
│   ├── auth.middleware.js  # Authentication middleware
│   └── error.middleware.js # Error handling middleware
├── models/                 # Mongoose models
│   ├── subscription.model.js # Subscription schema
│   └── user.model.js       # User schema
├── routes/                 # API routes
│   ├── auth.routes.js      # Authentication routes
│   ├── subscription.routes.js # Subscription routes
│   ├── user.routes.js      # User routes
│   └── workflow.routes.js  # Workflow routes
├── utils/                  # Utility functions
│   ├── email-template.js   # Email templates
│   └── send-email.js       # Email sending logic
├── .env.*.local            # Environment-specific variables
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

---

## Key Features

1. **User Authentication**:
   - Sign-up, sign-in, and sign-out functionality.
   - Password hashing using `bcryptjs`.
   - JWT-based authentication.

2. **Subscription Management**:
   - CRUD operations for subscriptions.
   - Auto-calculation of renewal dates.
   - Integration with Upstash workflows for reminders.

3. **Email Notifications**:
   - Reminder emails for subscription renewals.
   - Dynamic email templates using `nodemailer`.

4. **Workflow Automation**:
   - Scheduled reminders using Upstash workflows.
   - Customizable reminder intervals.

5. **Security**:
   - Bot detection and rate limiting using Arcjet.
   - Error handling middleware for robust API responses.

---

## Step-by-Step Implementation

### 1. Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env.development.local` or `.env.production.local`.

### 2. Run the Application
Start the development server:
```bash
npm run dev
```

### 3. Database Connection
Ensure MongoDB is running locally or provide a remote connection string in the `DB_URI` environment variable.

### 4. API Endpoints
- **Authentication**:
  - `POST /api/v1/auth/sign-up`: Register a new user.
  - `POST /api/v1/auth/sign-in`: Log in a user.
- **Subscriptions**:
  - `POST /api/v1/subscriptions`: Create a new subscription.
  - `GET /api/v1/subscriptions`: List all subscriptions.
- **Workflows**:
  - `POST /api/v1/workflows/subscription/reminder`: Trigger subscription reminders.

### 5. Email Configuration
Set up `EMAIL_ACCOUNT` and `EMAIL_PASSWORD` in the environment variables for sending emails.

---

## Creating an App Password for Email Configuration

To send emails using `nodemailer`, you may need to create an App Password if your email provider requires it. Follow these steps for common providers:

### Gmail
1. Go to your Google Account settings.
2. Navigate to **Security**.
3. Enable **2-Step Verification** if not already enabled.
4. Under **Signing in to Google**, select **App Passwords**.
5. Choose the app (e.g., Mail) and device (e.g., Windows Computer) for which you want to generate the password.
6. Click **Generate** and copy the App Password.
7. Use this password in the `EMAIL_PASSWORD` environment variable.

### Outlook
1. Sign in to your Microsoft account.
2. Go to **Security** > **Advanced security options**.
3. Enable **Two-step verification** if not already enabled.
4. Under **App passwords**, select **Create a new app password**.
5. Copy the generated password and use it in the `EMAIL_PASSWORD` environment variable.

### Yahoo
1. Sign in to your Yahoo account.
2. Go to **Account Security**.
3. Enable **Two-step verification** if not already enabled.
4. Click **Generate app password**.
5. Select the app and device, then click **Generate**.
6. Copy the password and use it in the `EMAIL_PASSWORD` environment variable.

Ensure you store the App Password securely and update your `.env` file accordingly.

---

## Workflow Automation
Upstash workflows are triggered for subscription reminders. Ensure `QSTASH_TOKEN` and `QSTASH_URL` are configured.

---

## Technologies Used

1. **Node.js**: Backend runtime environment.
2. **Express**: Web framework for building APIs.
3. **MongoDB**: NoSQL database for storing user and subscription data.
4. **Upstash**: Workflow automation and scheduling.
5. **Arcjet**: Security and bot detection.
6. **Nodemailer**: Email sending service.

---

## Environment Variables

| Variable                  | Description                              |
|---------------------------|------------------------------------------|
| `PORT`                    | Port number for the server.             |
| `DB_URI`                  | MongoDB connection string.              |
| `JWT_SECRET`              | Secret key for JWT tokens.              |
| `JWT_EXPIRES_IN`          | Expiration time for JWT tokens.         |
| `EMAIL_ACCOUNT`           | Email account for sending emails.       |
| `EMAIL_PASSWORD`          | Password for the email account.         |
| `QSTASH_URL`              | Upstash QSt URL.                        |
| `QSTASH_TOKEN`            | Token for Upstash QStash.               |
| `ARCJET_KEY`              | API key for Arcjet.                     |

---

## Error Handling
Errors are handled using a centralized middleware (`error.middleware.js`). Common errors include:
- Validation errors.
- Authentication errors.
- Database connection errors.

---

## Testing
To test the application:
1. Use tools like Postman or cURL to interact with the API.
2. Verify database changes using MongoDB Compass or CLI.

---

## Future Enhancements
1. Add unit and integration tests.
2. Implement role-based access control.
3. Enhance subscription analytics and reporting.

---



