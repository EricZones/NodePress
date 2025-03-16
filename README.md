# NodePress

NodePress is a web application using Node.js and Express with the EJS view engine implementing blogposts and users. It is accessible by browser and REST API. The focus is on the implementation of functionalities, neither on the frontend design nor the protection against data loss while writing.

## Features
- **Frontend:**
    - Main page with navigation to other pages
    - Blog page displaying all saved blogposts
    - Blogpost creation page with optional file-upload
    - Page for detailed view on individual blogposts
    - Registration page for users
- **Backend:**
    - Dynamic form used for registration and blogpost creation
    - Uniform header and footer
    - Post view includes both post creation form and detailed post view by dynamically toggling visible elements
    - Dynamic blogposts view with buttons to render detailed post view
    - Asynchronous user/blog methods and API access
    - Asynchronous JSON file reading/writing

## Installation & Execution
### Requirements
- Node.js
- npm
- Express 4.21.2
- EJS 3.1.10

### Execution
```bash
  npm run start
  ```

## Runtime information
### REST API endpoints
| **Method** | **Endpoint**     | **Description**              |
|------------|------------------|------------------------------|
| GET        | `/api/blog`      | Get all saved blogposts      |
| POST       | `/api/blog`      | Create a new blogpost        |
| GET        | `/api/blog/:id`  | Get saved blogpost by id     |
| PUT        | `/api/blog/:id`  | Update saved blogpost by id  |
| DELETE     | `/api/blog/:id`  | Delete saved blogpost by id  |
| GET        | `/api/users`     | Get all registered users     |
| POST       | `/api/users`     | Create a new user            |
| GET        | `/api/users/:id` | Get registered user by id    |
| PUT        | `/api/users/:id` | Update registered user by id |
| DELETE     | `/api/users/:id` | Delete registered user by id |

## Purpose
The project combines technologies for web applications like Node.js and Fetch by providing accessibility for browsers and API requests.
It was originally created for an evaluation at the university in 2024.