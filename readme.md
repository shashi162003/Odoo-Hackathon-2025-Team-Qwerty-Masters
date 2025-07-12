# Odoo Hackathon Submission 🚀

## 🧠 Problem Statement

> StackIt – A Minimal Q&A Forum Platform

---

## 👥 Team Name

> Qwerty Masters (Team 1773)

---

## 📧 Contact Email

> shashikumargupta443@gmail.com

---



## 🚦 Backend API Routes

All backend routes are prefixed with `/api/auth`. Below is a detailed explanation of each endpoint:

        ### 1. **POST `/signup`**
        **Purpose:** Register a new user.
        **Body Parameters:**
        - `firstName`, `lastName`, `role`, `gender`, `email`, `password`, `confirmPassword`
        **Response:** Success message, user details, and authentication token.
        **Notes:** Passwords must match. Avatar is auto-generated.

        ---

        ### 2. **POST `/login`**
        **Purpose:** Authenticate an existing user.
        **Body Parameters:**
        - `email`, `password`
        **Response:** Success message, user details, and authentication token.
        **Notes:** Sets a secure HTTP-only cookie for session management.

        ---

        ### 3. **POST `/generate-otp`** _(Protected)_
        **Purpose:** Generate a One-Time Password (OTP) for the authenticated user.
        **Body Parameters:**
        - `email`
        **Response:** Success message and the generated OTP.
        **Notes:** Requires a valid authentication token.

        ---

        ### 4. **POST `/verify-otp`** _(Protected)_
        **Purpose:** Verify the OTP for the authenticated user.
        **Body Parameters:**
        - `otp`
        **Response:** Success message if OTP is valid and not expired.
        **Notes:** OTP expires after 5 minutes. Requires a valid authentication token.

        ---

        ### 🔒 Authentication
        Protected routes require a valid JWT token, managed via secure cookies. The `authMiddleware` ensures only authenticated users can access sensitive endpoints.
