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



https://github.com/user-attachments/assets/9d680545-5f48-43af-ae59-575e1e948abf



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

        ### 5. **Questions API**

        #### **POST `/questions/createQuestion`** _(Protected)_
        - **Purpose:** Create a new question.
        - **Body Parameters:**
          - `title`, `description`, `tags` (array)
        - **Response:** Success message and created question object.

        #### **GET `/questions/getQuestions`**
        - **Purpose:** Get all questions.
        - **Response:** Array of question objects.

        #### **GET `/questions/getQuestions/:id`**
        - **Purpose:** Get a specific question by ID.
        - **Response:** Question object.

        #### **POST `/questions/deleteQuestions/:id`** _(Protected)_
        - **Purpose:** Delete a question by ID.
        - **Response:** Success message.

        #### **POST `/questions/upvoteQuestions/:id`** _(Protected)_
        - **Purpose:** Upvote a question.
        - **Response:** Updated question object.

        #### **POST `/questions/downvoteQuestions/:id`** _(Protected)_
        - **Purpose:** Downvote a question.
        - **Response:** Updated question object.

        ---

        ### 6. **Answers API**

        #### **POST `/answers/addAnswer`** _(Protected)_
        - **Purpose:** Add an answer to a question.
        - **Body Parameters:**
          - `questionId`, `answer`
        - **Response:** Success message and created answer object.

        #### **POST `/answers/updateAnswer/:answerId`** _(Protected)_
        - **Purpose:** Update an answer.
        - **Body Parameters:**
          - `answer`
        - **Response:** Success message and updated answer object.

        #### **GET `/answers/getAnswers/:questionId`**
        - **Purpose:** Get all answers for a question.
        - **Response:** Array of answer objects.

        #### **POST `/answers/deleteAnswer/:answerId`** _(Protected)_
        - **Purpose:** Delete an answer.
        - **Response:** Success message.

        #### **POST `/answers/upvoteAnswer/:answerId`** _(Protected)_
        - **Purpose:** Upvote an answer.
        - **Response:** Updated answer object.

        #### **POST `/answers/downvoteAnswer/:answerId`** _(Protected)_
        - **Purpose:** Downvote an answer.
        - **Response:** Updated answer object.

        ---

        ### 7. **Profile API**

        #### **GET `/profile/getProfile/:id`**
        - **Purpose:** Get user profile by ID.
        - **Response:** User profile object.

        #### **POST `/profile/updateProfile/:id`** _(Protected)_
        - **Purpose:** Update user profile.
        - **Body Parameters:**
          - `firstName`, `lastName`, `gender`, `role`, `avatar`, etc.
        - **Response:** Success message and updated profile object.

        ---

        ### 8. **Notifications API**

        #### **GET `/notifications/getNotifications`** _(Protected)_
        - **Purpose:** Get all notifications for the authenticated user.
        - **Response:** Array of notification objects.

        #### **POST `/notifications/markAsRead/:notificationId`** _(Protected)_
        - **Purpose:** Mark a notification as read.
        - **Response:** Success message.

        ---

        ### 9. **AI Features API**

        #### **POST `/ai/moderate`** _(Protected, Admin Only)_
        - **Purpose:** Moderate content (questions/answers) using AI.
        - **Body Parameters:**
          - `content`, `type` (question/answer), `id`
        - **Response:** Moderation result and flagged status.

        #### **POST `/ai/generate-answer`** _(Protected)_
        - **Purpose:** Generate an AI-powered answer for a question.
        - **Body Parameters:**
          - `question`
        - **Response:** Generated answer.

        #### **POST `/ai/summarize`** _(Protected)_
        - **Purpose:** Summarize a question using AI.
        - **Body Parameters:**
          - `question`
        - **Response:** Summary text.

        #### **POST `/ai/suggest-tags`** _(Protected)_
        - **Purpose:** Suggest tags for a question using AI.
        - **Body Parameters:**
          - `question`
        - **Response:** Array of suggested tags.

        ---

        ### 🔒 Authentication
        Protected routes require a valid JWT token, managed via secure cookies. The `authMiddleware` ensures only authenticated users can access sensitive endpoints.
