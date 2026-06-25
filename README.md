# ShopVault - Product Management Application

A modern, responsive web application built with Next.js (App Router) for managing and browsing products with secure Firebase authentication.

## Project Description

ShopVault is a feature-rich product management platform designed to provide a seamless user experience for browsing, managing, and adding products. It features a clean UI, responsive grid layouts, and protected routes to ensure secure administration.

## Key Features

- **Secure Authentication:** User login/registration powered by Firebase Authentication.
- **Responsive Design:** Built with Tailwind CSS for consistent layouts across desktop, tablet, and mobile devices.
- **Dynamic Routing:** Product details rendered dynamically using Next.js App Router.
- **Protected Routes:** Restricted access to 'Add' and 'Manage' pages for authenticated users.
- **Filtering & Search:** Real-time search and category filtering for a better shopping experience.
- **CRUD Functionality:** Users can add and manage their product listings.

## Technologies Used

- **Framework:** Next.js (App Router)
- **Language:** JavaScript
- **Styling:** Tailwind CSS
- **Authentication:** Firebase Auth
- **Database:** MongoDB (via API Routes)

## Setup & Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/shopvault.git](https://github.com/your-username/shopvault.git)
    cd shopvault
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add your keys:
    `env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCVDjlLUK_vwnPHzgApyghNF_mhk0LhQMQ
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=shopvault-9b1f3.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=shopvault-9b1f3
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=shopvault-9b1f3.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=859105125891
NEXT_PUBLIC_FIREBASE_APP_ID=1:859105125891:web:9877681cd2b94701f89036
    `

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Route Summary

- `/` : Landing Page (Hero, Features, Footer)
- `/items` : Items listing with search and filter
- `/items/[id]` : Dynamic product details page
- `/items/add` : Protected page to add new products
- `/items/manage` : Protected page to view/delete products
- `/about` : Information about the application
- `/login` : User authentication page
