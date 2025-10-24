# CareHub Medical Center - Hospital Management System

A comprehensive, modern hospital website and management system built with React, TypeScript, Vite, and Supabase. This full-stack application provides a complete digital solution for healthcare facilities, featuring both public-facing pages and a robust administrative dashboard.

## Overview

CareHub Medical Center is a professional-grade hospital management platform that combines an informative public website with powerful backend management capabilities. The system enables hospitals to showcase their services, manage patient records, handle appointments, and streamline administrative operations.

## Key Features

### Public Website
- **Multi-page responsive website** with modern UI/UX design
- **Department showcase** with detailed service information
- **Doctor profiles** with qualifications and availability
- **Online appointment booking** system with real-time availability
- **Service catalog** highlighting hospital capabilities
- **Patient testimonials** and success stories
- **Contact information** with location details

### Admin Dashboard
- **Patient Management** - Complete CRUD operations for patient records
- **Appointment Management** - View, schedule, and manage appointments
- **Department Management** - Organize and track departmental operations
- **Doctor Management** - Maintain doctor profiles and schedules
- **Service Management** - Update hospital services and offerings
- **Authentication System** - Secure admin login with Supabase Auth
- **Real-time Updates** - Live data synchronization across the platform

### User Portal
- **Personal Dashboard** - Patients can view their appointments
- **Appointment Booking** - Self-service appointment scheduling
- **Appointment Receipts** - Downloadable confirmation records
- **Profile Management** - Update personal information

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives for accessibility
- **Routing**: React Router DOM
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Form Management**: React Hook Form
- **State Management**: React Context API
- **Icons**: Lucide React
- **Notifications**: Sonner toast system

## Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── admin/          # Admin-specific components
│   │   ├── ui/             # Base UI components (buttons, forms, etc.)
│   │   └── user/           # User portal components
│   ├── pages/              # Page components for routing
│   ├── contexts/           # React Context providers (Auth)
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API and database services
│   ├── utils/              # Helper functions and utilities
│   ├── config/             # Configuration files
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles and CSS
├── supabase/
│   └── functions/          # Supabase Edge Functions
└── public/                 # Static assets
```

## Features in Detail

### Patient Management
- Add, edit, and delete patient records
- Search and filter patients by multiple criteria
- Track patient status (Active, Under Treatment, Discharged)
- Store comprehensive medical history
- Emergency contact information
- Department and doctor assignments

### Appointment System
- Online booking with department selection
- Doctor availability tracking
- Time slot management
- Appointment confirmation and receipts
- Status tracking (Scheduled, Completed, Cancelled)
- Admin approval workflow

### Department Organization
- 8 specialized departments (Cardiology, Neurology, Orthopedics, Pediatrics, Emergency, Radiology, General Medicine, Surgery)
- Service listings per department
- Facility information
- Patient count tracking
- Department-specific statistics

### Doctor Profiles
- Detailed professional information
- Qualifications and certifications
- Years of experience
- Language capabilities
- Availability schedules
- Specialty and department associations

### Security & Authentication
- Supabase Auth integration
- Secure admin login
- Protected routes for administrative functions
- Row Level Security (RLS) policies
- Environment variable management

## Database Schema

The application uses Supabase with the following main tables:
- `patients` - Patient records with medical history
- `appointments` - Appointment bookings and scheduling
- `doctors` - Doctor profiles and information
- `departments` - Department details and services
- `services` - Hospital service offerings

## Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm or yarn package manager
- Supabase account (database is pre-configured)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment variables are pre-configured in `.env`

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Configuration

The application is highly configurable through `/src/config/hospital.ts`:
- Hospital information (name, tagline, mission, vision)
- Department details and services
- Doctor profiles
- Service offerings
- Testimonials
- Accreditations and awards

## Admin Access

Default admin credentials for testing:
- Email: admin@carehub.com
- Password: (configured in Supabase Auth)

## Design System

The application follows modern healthcare design principles:
- Clean, professional aesthetic
- High contrast for readability
- Responsive breakpoints for all devices
- Accessibility-first approach
- Consistent spacing system (8px grid)
- Healthcare-appropriate color palette

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This project follows standard React and TypeScript best practices. Key guidelines:
- Single Responsibility Principle for components
- TypeScript strict mode enabled
- Modular file organization
- Comprehensive type definitions

## License

This is a code bundle for Hospital Website Design. The original project is available at https://www.figma.com/design/PvLW1X20d0SD16pCXknapZ/Hospital-Website-Design.

## Support

For technical support or questions about implementation, refer to the documentation in `/src/guidelines/` or contact your development team.

---

**Note**: This application is designed for demonstration and development purposes. For production use with real patient data, ensure compliance with healthcare regulations (HIPAA, GDPR, etc.) and implement additional security measures.
