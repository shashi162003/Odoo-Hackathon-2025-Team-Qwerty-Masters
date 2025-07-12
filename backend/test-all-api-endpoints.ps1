# PowerShell script to test all API endpoints
# NOTE: You may need to update tokens, IDs, and payloads for real tests.

# Auth endpoints
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/auth/signup" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{ "username": "testuser", "email": "test@example.com", "password": "Test123!" }'
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/auth/login" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{ "email": "test@example.com", "password": "Test123!" }'

# Question endpoints
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/question/createQuestion" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{ "title": "Test Question", "description": "Test Description", "tags": ["<tagId>"] }'
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/question/getQuestions" -Method GET
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/question/getQuestions/<id>" -Method GET
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/question/deleteQuestions/<id>" -Method POST
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/question/upvoteQuestions/<id>" -Method POST
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/question/downvoteQuestions/<id>" -Method POST

# Answer endpoints
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/answer/addAnswer" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{ "questionId": "<questionId>", "answer": "Test Answer" }'
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/answer/updateAnswer/<answerId>" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{ "answer": "Updated Answer" }'
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/answer/getAnswers/<questionId>" -Method GET
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/answer/deleteAnswer/<answerId>" -Method POST
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/answer/upvoteAnswer/<answerId>" -Method POST
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/answer/downvoteAnswer/<answerId>" -Method POST

# Profile endpoints
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/profile/getProfile/<id>" -Method GET
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/profile/updateProfile/<id>" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{ "bio": "Updated bio" }'

# Notification endpoints
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/notification/getNotifications" -Method GET
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/notification/markAsRead/<notificationId>" -Method POST

# AI endpoints
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/ai/generate-answer" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{ "question": "What is Node.js?" }'
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/ai/summarize" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{ "question": "Explain the event loop in Node.js." }'
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/ai/suggest-tags" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{ "question": "How do I use MongoDB with Node.js?" }'
Invoke-WebRequest -Uri "http://localhost:4000/api/v1/ai/moderate" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{ "content": "Some inappropriate text", "type": "question", "id": "<id>" }'
