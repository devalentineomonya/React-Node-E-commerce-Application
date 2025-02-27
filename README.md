# Next.js E-commerce Application

This is a modern e-commerce application built using **Next.js**, **hono**, **hono RPC**, **Supabase**, and **TypeScript**. The application is designed for scalability, performance, and developer-friendly workflows.

---

## Features

- Server-side rendering (SSR) with **Next.js** for optimized SEO and fast load times.
- API development using **hono** and **hono RPC** for lightweight and efficient routing.
- Database and authentication powered by **Supabase**.
- Real-time database triggers integrated with Supabase.
- Fully typed with **TypeScript** for robust and error-free development.
- Modular and reusable components.

---

## Table of Contents

1. [Prerequisites](#prerequisites)  
2. [Installation and Setup](#installation-and-setup)  
3. [Running the Application](#running-the-application)  
4. [Setting Up Supabase Triggers](#setting-up-supabase-triggers)  
5. [Submitting a Pull Request (PR)](#submitting-a-pull-request-pr)  
6. [To-Do](#to-do)  
7. [Contributing](#contributing)

---

## Prerequisites

Before you begin, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Supabase CLI](https://supabase.com/docs/guides/cli) (optional for local database management)

---

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-ecommerce-app.git
   cd your-ecommerce-app

2. Install dependencies:

npm install
# or
yarn install


3. Create a .env file:
Copy the .env.example file and configure it with your environment variables:

cp .env.example .env

Add your Supabase project credentials:

NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>



4. Set up Supabase database and triggers:
Navigate to your Supabase project and access the SQL Editor. Copy the SQL files located in @/lib/Supabase/triggers into the editor and execute them.




---

Running the Application

1. Start the development server:

npm run dev
# or
yarn dev

The application will run on http://localhost:3000.


2. Build for production:

npm run build
npm start


3. Run API server with hono:

npm run hono




---

Setting Up Supabase Triggers

To ensure real-time functionality, you need to set up database triggers in Supabase:

1. Navigate to the Supabase Dashboard.


2. Open the SQL Editor.


3. Copy the SQL files from @/lib/Supabase/triggers and paste them into the SQL Editor.


4. Execute the SQL to create the necessary database triggers.



For example:

-- Sample trigger to log new user registrations
CREATE OR REPLACE FUNCTION log_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_logs (user_id, action, timestamp)
  VALUES (NEW.id, 'registered', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION log_new_user();


---

Submitting a Pull Request (PR)

To contribute to this project:

1. Fork the repository.


2. Create a new branch:

git checkout -b feature/your-feature-name


3. Make your changes and commit them:

git commit -m "Add your meaningful commit message here"


4. Push to your branch:

git push origin feature/your-feature-name


5. Create a Pull Request:
Go to the original repository and create a PR with a clear description of your changes.




---

To-Do

Here are some upcoming features and tasks for the project:

[ ] Integrate payment gateway (e.g., Stripe or PayPal).

[ ] Add product search functionality.

[ ] Implement admin panel for product and order management.

[ ] Enhance responsive design for mobile and tablet views.

[ ] Write comprehensive tests for API and UI.



---

Contributing

We welcome contributions from the community! Please follow the Submitting a PR guidelines. If you have any questions, feel free to open an issue.


---

License

This project is licensed under the MIT License. See the LICENSE file for details.

