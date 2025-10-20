# Hospital Management System - Development Guide

## 🎯 Overview

This guide provides detailed information for developers working on the Hospital Management System.

## 📂 Project Architecture

### Frontend Structure

```
/components           # Reusable UI components
  /ui                 # Shadcn UI components (pre-built)
  Navigation.tsx      # Main site navigation
  PatientTable.tsx    # Patient data grid
  PatientFormDialog.tsx # Patient create/edit form
  AppointmentForm.tsx # Appointment booking form
  ...                 # Other feature components

/pages                # Route-based page components
  HomePage.tsx        # Landing page
  PatientManagementPage.tsx # Patient CRUD interface
  AppointmentPage.tsx # Appointment booking page
  ...                 # Other pages

/config               # Configuration management
  env.ts              # Environment & app settings
  hospital.ts         # Hospital-specific data

/services             # API client layer
  database.ts         # Database operations wrapper

/hooks                # Custom React hooks
  usePatients.ts      # Patient data hooks
  useAppointments.ts  # Appointment data hooks

/types                # TypeScript type definitions
  index.ts            # Shared interfaces and types

/utils                # Utility functions
  api.ts              # API helper functions
  /supabase           # Supabase configuration
```

### Backend Structure

```
/supabase/functions/server
  index.tsx           # Main API server with routes
  kv_store.tsx        # Database utility (PROTECTED)
```

## 🔧 Configuration Management

### Environment Variables

All configuration is centralized in `/config/env.ts`:

```typescript
import { ENV } from '../config/env';

// Access configuration
ENV.HOSPITAL_NAME
ENV.CONTACT.EMERGENCY_PHONE
ENV.API_BASE_URL
ENV.DEPARTMENTS
```

### Hospital Settings

Hospital-specific data is in `/config/hospital.ts`:

```typescript
import { HOSPITAL_CONFIG, DEPARTMENTS, DOCTORS } from '../config/hospital';

// Access hospital data
HOSPITAL_CONFIG.name
DEPARTMENTS // Array of department objects
DOCTORS // Array of doctor profiles
```

## 🔌 API Integration

### Using the Database Service

```typescript
import { patientDB, appointmentDB } from '../services/database';

// Fetch all patients
const patients = await patientDB.getAll();

// Create a new patient
const newPatient = await patientDB.create({
  firstName: 'John',
  lastName: 'Doe',
  // ... other fields
});

// Update patient
const updated = await patientDB.update(patientId, {
  status: 'Discharged',
});

// Delete patient
const success = await patientDB.delete(patientId);
```

### Direct API Calls

```typescript
import { api } from '../utils/api';

// GET request
const response = await api.get('/patients');

// POST request
const newPatient = await api.post('/patients', patientData);

// PUT request
const updated = await api.put(`/patients/${id}`, updates);

// DELETE request
await api.delete(`/patients/${id}`);
```

## 🪝 Using Custom Hooks

### Patient Hooks

```typescript
import { usePatients, usePatient, usePatientsByDepartment } from '../hooks/usePatients';

// Get all patients
function PatientList() {
  const { patients, loading, error, refetch } = usePatients();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* Render patients */}</div>;
}

// Get single patient
function PatientDetail({ patientId }) {
  const { patient, loading, error } = usePatient(patientId);
  // ...
}

// Filter by department
function DepartmentPatients({ department }) {
  const { patients, loading, error } = usePatientsByDepartment(department);
  // ...
}
```

### Appointment Hooks

```typescript
import { useAppointments, useTodaysAppointments } from '../hooks/useAppointments';

// Get all appointments
function AppointmentList() {
  const { appointments, loading, error, refetch } = useAppointments();
  // ...
}

// Get today's appointments
function TodaySchedule() {
  const { appointments, loading, error } = useTodaysAppointments();
  // ...
}
```

## 🎨 Styling Guidelines

### Tailwind CSS v4

This project uses Tailwind CSS v4. Key points:

1. **DO NOT** override default typography with Tailwind classes unless specifically requested
2. Typography is configured in `/styles/globals.css`
3. Use semantic color tokens from the design system

```typescript
// ✅ Good - Using design system colors
<div className="bg-blue-50 text-blue-900">

// ❌ Avoid - Overriding typography
<h1 className="text-4xl font-bold">

// ✅ Good - Using typography without overrides
<h1 className="text-blue-900">
```

### Color System

Primary colors are defined in `globals.css`:
- `bg-background` - Main background
- `text-foreground` - Main text
- `bg-primary` / `text-primary-foreground` - Primary actions
- `bg-secondary` / `text-secondary-foreground` - Secondary actions
- `bg-muted` / `text-muted-foreground` - Muted elements

## 📝 TypeScript Types

### Using Type Definitions

```typescript
import type { Patient, Appointment, ApiResponse } from '../types';

// Type a patient variable
const patient: Patient = {
  id: '1',
  firstName: 'John',
  // ... all required fields
};

// Type an API response
const response: ApiResponse<Patient> = {
  success: true,
  data: patient,
};
```

### Creating New Types

Add new types to `/types/index.ts`:

```typescript
export interface NewType {
  id: string;
  name: string;
  // ... fields
}
```

## 🔄 State Management

This project uses React hooks for state management:

### Local Component State

```typescript
const [data, setData] = useState<Patient[]>([]);
const [loading, setLoading] = useState(false);
```

### Shared State (Context)

If you need shared state across multiple components:

```typescript
// Create a context
const PatientContext = createContext<PatientContextType | null>(null);

// Provide at top level
<PatientContext.Provider value={value}>
  {children}
</PatientContext.Provider>

// Consume in components
const context = useContext(PatientContext);
```

## 🧪 Testing API Endpoints

### Using Browser DevTools

```javascript
// Open browser console and test:

// Get all patients
fetch('https://wkbxjsnjhrhnhcsnkfsr.supabase.co/functions/v1/make-server-471cd30a/patients', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  }
})
.then(r => r.json())
.then(console.log)
```

### Using cURL

```bash
# Health check
curl https://wkbxjsnjhrhnhcsnkfsr.supabase.co/functions/v1/make-server-471cd30a/health

# Get patients
curl -H "Authorization: Bearer YOUR_KEY" \
  https://wkbxjsnjhrhnhcsnkfsr.supabase.co/functions/v1/make-server-471cd30a/patients
```

## 🐛 Debugging

### Frontend Debugging

1. **Check Browser Console**: Look for error messages and network requests
2. **React DevTools**: Inspect component state and props
3. **Network Tab**: Monitor API calls and responses

### Backend Debugging

1. **Server Logs**: Check Supabase function logs
2. **Console Logs**: The server uses `console.log` for debugging
3. **API Responses**: Check error messages in response bodies

### Common Issues

**Problem**: API calls failing
- Check network tab for actual error
- Verify API_BASE_URL is correct
- Ensure Authorization header is included

**Problem**: Data not updating
- Call refetch() after mutations
- Check if success callback is being called
- Verify database operation returns success

**Problem**: TypeScript errors
- Ensure all types are imported correctly
- Check that data matches interface definitions
- Use type assertions carefully

## 🔒 Security Best Practices

### Frontend Security

1. **Never expose service role key** in frontend code
2. **Always use SUPABASE_ANON_KEY** for client-side calls
3. **Validate all user input** before sending to API
4. **Sanitize displayed data** to prevent XSS

### Backend Security

1. **Validate all incoming data** on the server
2. **Use appropriate HTTP status codes**
3. **Log security-relevant events**
4. **Rate limit sensitive endpoints** (future enhancement)

## 📊 Data Flow

```
User Action (Click, Submit)
  ↓
Component Event Handler
  ↓
Database Service Function
  ↓
API Call (fetch)
  ↓
Backend Server (Hono)
  ↓
KV Store (Database)
  ↓
Response
  ↓
Update Component State
  ↓
Re-render UI
```

## 🚀 Adding New Features

### Adding a New Page

1. Create page component in `/pages/NewPage.tsx`
2. Add route in `/App.tsx`:
```typescript
<Route path="/new-page" element={<NewPage />} />
```
3. Add navigation link in `/components/Navigation.tsx`

### Adding a New API Endpoint

1. Open `/supabase/functions/server/index.tsx`
2. Add new route:
```typescript
app.get("/make-server-471cd30a/new-endpoint", async (c) => {
  // Implementation
  return c.json({ success: true, data: result });
});
```
3. Add corresponding function in `/services/database.ts`

### Adding a New Database Entity

1. Define type in `/types/index.ts`
2. Add CRUD operations in `/services/database.ts`
3. Create API routes in server
4. Create custom hooks in `/hooks/`
5. Build UI components

## 📦 Dependencies

### Core Dependencies
- `react` - UI framework
- `react-router-dom` - Routing
- `@supabase/supabase-js` - Supabase client

### UI Dependencies
- `lucide-react` - Icons
- `sonner@2.0.3` - Toast notifications
- Shadcn UI components (in `/components/ui`)

### Backend Dependencies
- `npm:hono` - Web framework
- `npm:hono/cors` - CORS middleware
- `npm:hono/logger` - Logging middleware

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Hono Documentation](https://hono.dev)

## 💡 Best Practices

1. **Use TypeScript strictly** - Enable all type checks
2. **Write reusable components** - Extract common patterns
3. **Handle loading states** - Show loading indicators
4. **Handle errors gracefully** - Show user-friendly messages
5. **Use semantic HTML** - Improve accessibility
6. **Keep components small** - Single responsibility principle
7. **Document complex logic** - Add comments for clarity
8. **Test edge cases** - Empty states, error states, etc.

## 🔄 Deployment

The application is deployed automatically when you make changes. There's no separate build or deployment step required in this environment.

---

**Questions?** Refer to the API documentation in `/guidelines/API-DOCUMENTATION.md` or the main README.
