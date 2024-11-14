# Password Manager

A simple **Password Manager** built with **React.js** for the frontend and **Node.js** (with **Express**) for the backend. This application allows users to store, edit, delete, and view passwords securely. It uses **MongoDB** to persist data and **localStorage** for quick access to saved passwords.

## Table of Contents

- Project Overview
- Features
- Tech Stack
- Installation
- Usage
- Challenges Faced
- Contributing
- License

## Project Overview

This Password Manager application was created as a learning project to understand the concepts of full-stack development, including **React.js** for the frontend and **Node.js** with **MongoDB** for the backend.

The goal was to build a secure, simple password manager that allows users to store their passwords, edit them, and delete them as needed. The app communicates with the backend using **REST API** calls and stores the passwords both in **MongoDB** for persistent storage and **localStorage** for faster access.

## Features

- **Add Passwords**: Allows users to add passwords for different websites and services.
- **Edit Passwords**: Edit the details (website, username, password) of existing entries.
- **Delete Passwords**: Permanently delete saved passwords from the list.
- **Toggle Password Visibility**: Show or hide the password when needed.
- **Copy to Clipboard**: Copy website URL, username, or password with a single click.
- **Sync Frontend and Backend**: Changes made in the frontend are synced with the backend and saved in MongoDB.
- **Persistent Storage**: Passwords are saved both in **localStorage** (for quick access) and **MongoDB** (for long-term storage).
- **Responsive UI**: Built using **Tailwind CSS** to make it responsive and mobile-friendly.

## Tech Stack

- **Frontend**:
    - **React.js** for building the user interface
    - **React Toastify** for notifications
    - **Tailwind CSS** for responsive design and styling
    - **UUID** for generating unique IDs for password entries
- **Backend**:
    - **Node.js** with **Express.js** for creating the REST API
    - **MongoDB** (via **Mongoose**) for storing passwords securely
    - **CORS** to handle cross-origin resource sharing between the frontend and backend
- **Database**:
    - **MongoDB** for persistent storage of passwords.

## Installation

### Prerequisites

Before you can run this application, make sure you have the following tools installed on your local machine:

- **Node.js** (with npm)
- **MongoDB** (locally or use a cloud-based MongoDB provider like MongoDB Atlas)

### Backend Setup

1. Clone the repository:

```bash
bash
Copy code
git clone https://github.com/your-username/password-manager.git
cd password-manager

```

1. Navigate to the backend folder and install dependencies:

```bash
bash
Copy code
cd backend
npm install

```

1. Create a `.env` file in the `backend` directory and add your MongoDB connection string:

```bash
bash
Copy code
MONGO_URI=mongodb://localhost:27017/password-manager

```

1. Run the backend server:

```bash
bash
Copy code
npm start

```

By default, the backend will run on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend folder:

```bash
bash
Copy code
cd frontend

```

1. Install the frontend dependencies:

```bash
bash
Copy code
npm install

```

1. Run the frontend server:

```bash
bash
Copy code
npm start

```

The frontend should now be running on `http://localhost:3001`.

The app should now be live and ready to use at `http://localhost:3001` for the frontend and `http://localhost:3000` for the backend.

## Usage

Once the app is running:

1. **Add a new password**: Enter the website name, username, and password, then click "Save".
2. **Edit a password**: Click the edit icon beside a password entry, make the changes, and save them.
3. **Delete a password**: Click the delete icon beside a password entry to remove it.
4. **Toggle password visibility**: Click the eye icon to reveal or hide the password.
5. **Copy credentials**: Click on the copy icon next to the website URL, username, or password to copy it to your clipboard.

## Challenges Faced

1. **Syncing Frontend and Backend**: Ensuring the frontend and backend communicated correctly for password creation, updates, and deletions was a challenge. I used REST API calls to synchronize data between the two.
2. **MongoDB Integration**: Setting up MongoDB and ensuring that data persisted between page reloads was an important learning experience. I used **Mongoose** for MongoDB interaction and learned how to structure my database properly.
3. **Data Persistence**: Managing passwords in both **localStorage** (for quick access) and **MongoDB** (for long-term storage) was tricky. The challenge was making sure the data was synchronized between the two.
4. **Security Concerns**: Although this is a basic app, ensuring the security of password storage and encryption was a challenge. I learned about how password managers typically store and encrypt sensitive information.
5. **UI/UX Design**: Building a user-friendly interface while keeping the app simple and clean, as well as handling edge cases (such as no saved passwords), required lots of iterations.

## Contributing

Feel free to fork this repository, submit issues, or contribute by opening a pull request. Contributions are always welcome!
