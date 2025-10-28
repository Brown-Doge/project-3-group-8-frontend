# project-3-group-8-frontend

CST 438 Project 3 Frontend
Overview
This repository contains the frontend for CST 438 Project 3, developed as part of a team-based software engineering course project. The goal is to build a fully functional web application with a professional and polished UI, implementing key features and demonstrating robust engineering practices.

Features
Modern web application using React or similar technology​

OAuth2 authentication via Spring Security (Google, GitHub SSO)​

Role-based access control for student/staff/admin users​

CRUD operations for resources/entities

Booking and scheduling features

Notifications and analytics dashboards

Unit and automation testing integrated into the workflow

Project Structure
Hosted on Heroku, AWS, Google Cloud Platform, or a similar platform​

Frontend connects to a backend API (Spring Boot) hosted separately

Consistent UI across platforms

Getting Started
Prerequisites
Node.js and npm installed

Access to the backend API (Spring Boot with OAuth2 enabled)

Cloud platform credentials for deployment (Heroku/AWS/GCP)

Installation
bash
git clone https://github.com/your-org/cst438-project3-frontend.git
cd cst438-project3-frontend
npm install
Development
To run the app locally:

bash
npm start
Make sure your backend API is running and accessible. Update environment variables or .env files if needed for API endpoints and OAuth2 providers.

Testing
Unit tests: Run with Jest

E2E/Automation tests: Run with Playwright

To execute all tests:

bash
npm test
See documentation or relevant subfolders for details on arranging, acting, asserting, setup, and teardown for tests.​

Deployment
The app can be deployed to Heroku, AWS, or GCP

Connect your deployment to the GitHub repo for automatic updates on branch changes

Ensure all tests pass before merging changes

Use GitHub Actions or similar for CI

Contribution Guidelines
Use GitHub Issues for tasks; include enough detail for outsiders to contribute​

Pull Requests must not be merged directly to main; use review and approval processes

Write robust code documentation for all classes and components

Follow the Red-Green-Refactor methodology for development​

Documentation
Maintain a Product Requirement Document (PRD)

Update the README and in-code documentation regularly

Other teams will review your code and documentation as part of the project milestone assessments

License
This project is for academic purposes as part of CST 438.
