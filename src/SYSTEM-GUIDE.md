# Hospital Management System - User Guide

## Overview

This is a comprehensive hospital management system with separate portals for **Administrators** and **Users (Patients)**.

## System Architecture

The system is built as a 3-tier fullstack application:
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Supabase Edge Functions (Hono server)
- **Database**: Supabase (PostgreSQL with KV store)

## Two Portals

### 1. User Portal (`/user-portal`)
**For Patients - Public Access**

Features:
- View all hospital services
- Browse departments and doctors
- Book appointments online
- Receive appointment confirmation receipt
- Download/Print receipt with all appointment details

**How to Use:**
1. Visit the User Portal from the main navigation
2. Browse available services
3. Click "Book Appointment" on any service
4. Fill in your details (name, email, phone, etc.)
5. Select department, doctor, date, and time
6. Submit the form
7. You'll be redirected to your appointment receipt
8. Download or print the receipt for your records

### 2. Admin Portal (`/admin/dashboard`)
**For Hospital Administrators - Protected Access**

Features:
- Secure authentication (login/signup)
- Manage Patients (CRUD operations)
- Manage Appointments (view, delete)
- Manage Doctors (view, add, edit, delete)
- Manage Departments (view, add, edit, delete)
- Manage Services (view, add, edit, delete)

**How to Use:**
1. Click "Admin Login" in the navigation
2. Sign up for a new admin account OR login with existing credentials
3. Access the admin dashboard with full management capabilities
4. Use tabs to switch between different management sections

## Database Tables

The system uses separate tables for each entity:

1. **admins** - Admin user accounts with authentication
2. **patients** - Patient records and medical information
3. **appointments** - Appointment bookings from users
4. **doctors** - Doctor profiles and information
5. **departments** - Hospital departments and services
6. **services** - Hospital services and offerings

## Authentication

- **Admin authentication** is powered by Supabase Auth
- Admins must login to access the dashboard
- Session management with JWT tokens
- Automatic session checking on page load

## API Endpoints

### Public Endpoints (No Auth Required)
- `GET /services` - Get all services
- `GET /departments` - Get all departments
- `GET /doctors` - Get all doctors
- `POST /appointments` - Create new appointment (user booking)
- `GET /appointments/:id` - Get appointment by ID (for receipt)

### Protected Endpoints (Admin Auth Required)
- `POST /auth/signup` - Admin signup
- `POST /auth/login` - Admin login
- `GET /auth/session` - Check session
- `POST /auth/logout` - Logout
- `GET /patients` - Get all patients
- `POST /patients` - Create patient
- `PUT /patients/:id` - Update patient
- `DELETE /patients/:id` - Delete patient
- `GET /appointments` - Get all appointments (admin view)
- `PUT /appointments/:id` - Update appointment
- `DELETE /appointments/:id` - Delete appointment
- CRUD operations for doctors, departments, and services

## Getting Started

### For Users:
1. Visit the homepage
2. Click "Book Appointment" or visit `/user-portal`
3. Choose a service and fill in your details
4. Get your appointment receipt instantly

### For Administrators:
1. Visit `/admin/login`
2. Create an admin account (first time)
3. Login and access the dashboard
4. Manage all hospital data from one place

## Key Features

✅ Separate user and admin interfaces  
✅ Full authentication and authorization  
✅ Separate database tables for each entity  
✅ Real-time data updates  
✅ Appointment receipt generation  
✅ Print/Download functionality  
✅ Responsive design  
✅ Error handling and loading states  
✅ Toast notifications for user feedback  

## Security

- Admin routes are protected with authentication middleware
- JWT tokens for session management
- Passwords are hashed (handled by Supabase Auth)
- CORS enabled for API security
- Environment variables for sensitive data

## Technical Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Supabase** - Backend & Database
- **Hono** - Web framework for Edge Functions
- **Shadcn/ui** - UI components
- **Sonner** - Toast notifications
