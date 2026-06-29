# Social Media Frontend

A React + Vite + Typescript frontend application for a social media platform that allows users to create communities, posts, and comments with voting functionality.

## Tech Stack

- **Frontend**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Linting**: ESLint

## Features

- **Authentication**: User registration, login, and logout with JWT token persistence
- **Communities**: Create, read, update, and delete communities; join/leave communities
- **Posts**: Create, read, update, and delete posts; vote (up/down) on posts
- **Comments**: Create, read, and delete comments; reply to comments
- **User Profiles**: View, update, and delete your user account; manage community memberships
- **Protected Routes**: Authentication-required routes with automatic redirect
- **Navigation**: Responsive navbar with easy access to all features

## Web API Consumed

This frontend consumes the Social Media Web API:

[https://github.com/marcs-sus/webapi-socialmedia](https://github.com/marcs-sus/webapi-socialmedia)

The API is expected to run at `http://localhost:5066/api` by default.
