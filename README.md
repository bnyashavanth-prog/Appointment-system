# eDoc - Modern Doctor Appointment System

A full-stack, role-based web application for managing doctor appointments, modernised from a legacy PHP architecture to a high-performance **Next.js 15** stack.

## ✨ Features

- **Multi-Role Authentication:** Secure, JWT-based login system protecting routes via Edge Middleware.
- **Admin Portal:** Manage doctors (create, update, delete) and view system-wide appointments.
- **Doctor Portal:** Manage available appointment sessions/schedules, view booked patients, and monitor daily schedules.
- **Patient Portal:** Browse registered doctors, view available slots, book appointments, and cancel existing bookings.
- **Smart Booking Logic:** Automated capacity checks to ensure sessions never exceed maximum patient limits.
- **Blazing Fast UI (Suspense Streaming):** Heavy database queries are wrapped in React `<Suspense>`, allowing page layouts to load instantly while data streams seamlessly into sleek loading skeletons, eliminating SSR waterfalls.
- **Responsive UI:** Clean, mobile-friendly interface built with Tailwind CSS.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router, Server Actions, Server Components)
- **Language:** TypeScript
- **Database:** PostgreSQL (Hosted on [Supabase](https://supabase.com/))
- **ORM:** [Prisma v5](https://www.prisma.io/)
- **Authentication:** [Auth.js (NextAuth v5)](https://authjs.dev/) with bcrypt password hashing
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Validation:** Zod

## 🛠️ Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bnyashavanth-prog/Appointment-system.git
   cd Appointment-system/edoc-next
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the `edoc-next` directory and add your connection strings:
   ```env
   # Your Transactional Supabase URL
   DATABASE_URL="postgresql://postgres.[YOUR-PROJECT]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
   # Your Direct Supabase URL
   DIRECT_URL="postgresql://postgres.[YOUR-PROJECT]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"
   
   # Required for Auth.js in production (generate via `npx auth secret`)
   AUTH_SECRET="your-secret-key"
   ```

4. **Initialize Database:**
   ```bash
   npx prisma db push
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 👥 Default Test Accounts (If Seeded)

If you run the Prisma seed script (`npx prisma db seed`), the following accounts will be created:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@edoc.com` | `123` |
| **Doctor** | `doctor@edoc.com` | `123` |
| **Patient**| `patient@edoc.com` | `123` |

## 📦 Deployment

This project is optimized for deployment on **Vercel**.
Ensure you add `DATABASE_URL`, `DIRECT_URL`, and `AUTH_SECRET` to your Vercel Environment Variables before building.

1. Connect your GitHub repository to Vercel.
2. Set the Root Directory to `edoc-next`.
3. Vercel will automatically detect Next.js and build the project. The Prisma schema will be generated via the `postinstall` script defined in `package.json`.
