# Web4U

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Dependencies](#Dependencies)
- [Configuration](#configuration)
- [Deployment](#deployment)

## Introduction
Web4U is a web application designed to provide a seamless user experience for managing user profiles, including authentication, profile updates, and file uploads using Firebase. The application is built with a modern stack of technologies including React, Redux, Node.js, Express, and Firebase.

## Features
- User authentication with JWT
- Profile management
- File upload with Firebase
- State management with Redux
- Responsive design

## Technologies
- Frontend: React, Redux, Firebase
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Storage: Firebase Storage

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running
- Firebase project set up with authentication and storage

### Clone the Repository
```
git clone https://github.com/jkchinnu-525/Web4U.git
cd Web4U 
```
## Dependencies
```
cd api --> npm install
cd client --> npm install
```
## Configuration

In [.env]() file
```
Mongo_Url = "your_mongo_url"
jwt_secret = 'your_jwt_secret'
VITE_FIREBASE_API_KEY = "your_api_key"
```
## Deployment
The application can be deployed using services like:
- Render
- Vercel
- Netlify

