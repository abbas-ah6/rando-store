# RandoStore Frontend

This is the frontend application for RandoStore, a simple e-commerce platform where users can browse, add, and purchase products.

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Axios
- Context API for cart management

## Project Structure

src/
├── app/ # App routes (Home, Products, Checkout, etc.)
├── components/ # Reusable components (Header, CartSidebar, etc.)
├── lib/ # Utility functions (e.g., fetch, formatting)
├── context/ # Cart provider
├── styles/ # Global styles
├── public/ # Static assets (e.g., favicon, images)


## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev


Visit: http://localhost:3000

Environment Variables
Create a .env.local file with the following values:

ADMIN_EMAIL=your@gmail.com
GMAIL_USER=your@gmail.com
GMAIL_PASS=your_app_password

Features

Add and remove products from the cart

Checkout and submit orders

Send email notifications to both user and admin

Responsive product display

Form to add new products

Notes

Backend must be running separately for API integration

External image domains must be configured in next.config.js


---

Let me know if you also need a backend `README.md`.


