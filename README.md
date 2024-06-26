# Job Platform Backend API

This repository contains the backend API for a job platform built using Node.js, Express, PostgreSQL, and Prisma.

## Table of Contents

- [Authentication Routes](#authentication-routes)
- [Candidate Routes](#candidate-routes)
- [Interviewer/Recruiter Routes](#interviewerrecruiter-routes)
- [General Routes](#general-routes)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Authentication Routes

1. **POST /api/auth/register**: Register a new user.
2. **POST /api/auth/login**: Log in an existing user.
3. **GET /api/auth/logout**: Log out the currently authenticated user.

## Candidate Routes

1. **GET /api/candidates/:id**: Get candidate profile information.
2. **PUT /api/candidates/:id**: Update candidate profile information.
3. **GET /api/candidates/:id/interviews**: Get interviews scheduled for the candidate.
4. **POST /api/candidates/:id/interviews**: Schedule a new interview for the candidate.
5. **DELETE /api/candidates/:id/interviews/:interviewId**: Cancel an existing interview for the candidate.

## Interviewer/Recruiter Routes

1. **GET /api/interviewers/:id**: Get interviewer profile information.
2. **PUT /api/interviewers/:id**: Update interviewer profile information.
3. **GET /api/interviewers/:id/interviews**: Get interviews conducted by the interviewer.
4. **POST /api/interviewers/:id/interviews**: Schedule a new interview conducted by the interviewer.
5. **PUT /api/interviewers/:id/interviews/:interviewId**: Update details of an existing interview conducted by the interviewer.

## General Routes

1. **GET /api/resources**: Get a list of resources available for candidates.
2. **POST /api/feedback**: Submit feedback after an interview session.
3. **GET /api/matching/:id**: Get a list of matched candidates for a specific job posting or criteria.
4. **GET /api/jobs**: Get a list of available job postings.
5. **GET /api/jobs/:id**: Get details of a specific job posting.
6. **POST /api/jobs**: Create a new job posting.
7. **PUT /api/jobs/:id**: Update details of an existing job posting.
8. **DELETE /api/jobs/:id**: Delete a job posting.
9. **POST /api/search**: Search for jobs or candidates based on specified criteria.
10. **GET /api/stats**: Get statistics and analytics data related to the platform usage.
11. **POST /api/contact**: Contact support or administration for assistance.

## Setup

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Set up your PostgreSQL database and update the connection details in the `.env` file.
4. Run the migrations using `npx prisma migrate dev`.
5. Start the server using `npm start`.

## Usage

- Ensure the server is running by executing `npm start`.
- Use an API client like Postman or Insomnia to send requests to the defined routes.

## Contributing

Contributions are welcome! Please follow the standard GitHub flow: fork, branch, commit, pull request.

## License

This project is licensed under the [MIT License](LICENSE).

