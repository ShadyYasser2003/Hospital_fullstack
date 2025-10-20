# Hospital Management System

A comprehensive hospital website and patient management system built with React, TypeScript, and Tailwind CSS.

## Features

- 🏥 **Multi-page Website** - Home, Services, Departments, Doctors, Appointments, Contact
- 👥 **Patient Management** - Full CRUD operations for patient records
- 🏢 **Department Management** - View patients by department
- 📅 **Appointment Booking** - Online appointment scheduling system
- 📊 **Dashboard & Analytics** - Patient statistics and status tracking
- 🔍 **Search & Filter** - Advanced patient search functionality
- 📱 **Responsive Design** - Mobile-friendly interface

## Project Structure

```
├── App.tsx                      # Main application with routing
├── config/
│   └── env.ts                   # Environment configuration
├── components/
│   ├── Navigation.tsx           # Main navigation header
│   ├── FooterNav.tsx            # Footer with links
│   ├── PatientTable.tsx         # Patient data table
│   ├── PatientFormDialog.tsx    # Add/Edit patient form
│   └── ui/                      # Reusable UI components
├── pages/
│   ├── HomePage.tsx             # Landing page
│   ├── ServicesPage.tsx         # Services overview
│   ├── DepartmentsPage.tsx      # All departments
│   ├── DepartmentDetailPage.tsx # Department with patients
│   ├── DoctorsPage.tsx          # Doctor profiles
│   ├── AppointmentPage.tsx      # Appointment booking
│   ├── ContactPage.tsx          # Contact information
│   └── PatientManagementPage.tsx # Patient management
├── services/
│   └── database.ts              # Database service (localStorage)
└── styles/
    └── globals.css              # Global styles
```

## Configuration

All hospital-specific settings are centralized in `/config/env.ts`. To customize the application for your hospital:

### 1. Hospital Information

```typescript
HOSPITAL_NAME: 'HealthCare Plus',
HOSPITAL_SHORT_NAME: 'H+',
HOSPITAL_TAGLINE: 'Your Health, Our Priority',
HOSPITAL_ESTABLISHED: '1985',
```

### 2. Contact Information

```typescript
CONTACT: {
  EMERGENCY_PHONE: '+1 (555) 123-4567',
  GENERAL_PHONE: '+1 (555) 123-4568',
  EMAIL_INFO: 'info@healthcareplus.com',
  EMAIL_SUPPORT: 'support@healthcareplus.com',
  ADDRESS_LINE1: '123 Medical Center Drive',
  ADDRESS_LINE2: 'New York, NY 10001',
},
```

### 3. Operating Hours

```typescript
HOURS: {
  EMERGENCY: '24/7',
  OUTPATIENT: 'Mon-Fri: 8:00 AM - 8:00 PM',
  WEEKEND: 'Sat-Sun: 9:00 AM - 5:00 PM',
},
```

### 4. Social Media

```typescript
SOCIAL: {
  FACEBOOK: 'https://facebook.com/healthcareplus',
  TWITTER: 'https://twitter.com/healthcareplus',
  INSTAGRAM: 'https://instagram.com/healthcareplus',
  LINKEDIN: 'https://linkedin.com/company/healthcareplus',
},
```

### 5. Statistics

```typescript
STATS: {
  TOTAL_DOCTORS: '500+',
  HAPPY_PATIENTS: '50K+',
  DEPARTMENTS: '20+',
  YEARS_EXPERIENCE: '40+',
},
```

### 6. Departments

```typescript
DEPARTMENTS: [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'General Medicine',
  'Emergency Medicine',
  'Laboratory Services',
  'Surgical Services',
],
```

### 7. Appointment Times

```typescript
APPOINTMENT: {
  AVAILABLE_TIMES: [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ],
},
```

## Database

The application currently uses **localStorage** as a mock database for demonstration purposes. Patient and appointment data is stored locally in the browser.

### Upgrading to Supabase

To connect to a real database:

1. Set up a Supabase project at https://supabase.com
2. Add your credentials to `/config/env.ts`:

```typescript
API: {
  SUPABASE_URL: 'your-project-url',
  SUPABASE_ANON_KEY: 'your-anon-key',
}
```

3. Update `/services/database.ts` to use Supabase client instead of localStorage

## Pages

### Home (`/`)
Landing page with hero section, features, services overview, departments, doctors, and testimonials.

### Services (`/services`)
Detailed view of all medical services offered by the hospital.

### Departments (`/departments`)
Grid view of all departments with patient counts and descriptions.

### Department Detail (`/departments/:id`)
Individual department page showing:
- Department statistics
- List of patients in the department
- Add/Edit patient functionality

### Doctors (`/doctors`)
Profiles of all doctors with specialties, experience, and availability.

### Appointments (`/appointment`)
Online appointment booking form with department and time selection.

### Contact (`/contact`)
Contact information, address, phone numbers, and map placeholder.

### Patient Management (`/patients`)
Complete patient management system with:
- Patient table with search and filters
- Add/Edit/Delete patient records
- Status tracking (Active, Under Treatment, Discharged)
- Tabbed view by patient status

## Patient Data Structure

```typescript
interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  department: string;
  assignedDoctor: string;
  admissionDate: string;
  status: 'Active' | 'Discharged' | 'Under Treatment';
  medicalHistory: string;
  emergencyContact: string;
  emergencyPhone: string;
}
```

## Customization Tips

1. **Colors**: Update the color scheme in `/styles/globals.css`
2. **Logo**: Replace the logo in Navigation and Footer components
3. **Images**: Update image URLs throughout the components
4. **Content**: Modify text content in each page component
5. **Features**: Enable/disable features in `/config/env.ts`

## Future Enhancements

- Integration with real backend (Supabase)
- User authentication and roles
- Medical records management
- Billing and payments
- Telemedicine functionality
- Email notifications
- PDF report generation
- Analytics dashboard

## Support

For questions or support, please contact your development team.

---

**Note**: This is a demonstration application. Do not use for storing real patient data without proper security measures and compliance with healthcare regulations (HIPAA, etc.).
