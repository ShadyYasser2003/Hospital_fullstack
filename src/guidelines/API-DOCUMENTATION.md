# Hospital Management System - API Documentation

## Base URL

```
https://wkbxjsnjhrhnhcsnkfsr.supabase.co/functions/v1/make-server-471cd30a
```

## Authentication

All API requests require an Authorization header with the Supabase anonymous key:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Common Headers

```
Content-Type: application/json
Authorization: Bearer {SUPABASE_ANON_KEY}
```

---

## Patient Endpoints

### Get All Patients

**Endpoint**: `GET /patients`

**Description**: Retrieves all patient records from the database.

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@email.com",
      "phone": "+1 (555) 123-4567",
      "dateOfBirth": "1985-03-15",
      "gender": "Male",
      "address": "123 Main St, New York, NY 10001",
      "department": "Cardiology",
      "assignedDoctor": "Dr. Sarah Johnson",
      "admissionDate": "2025-10-10",
      "status": "Under Treatment",
      "medicalHistory": "Hypertension, previous heart surgery",
      "emergencyContact": "Jane Doe",
      "emergencyPhone": "+1 (555) 123-4568",
      "createdAt": "2025-10-19T10:00:00.000Z",
      "updatedAt": "2025-10-19T10:00:00.000Z"
    }
  ],
  "total": 5
}
```

---

### Get Patient by ID

**Endpoint**: `GET /patients/:id`

**Parameters**:
- `id` (path) - Patient ID

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "1",
    "firstName": "John",
    "lastName": "Doe",
    ...
  }
}
```

**Error Response** (404):
```json
{
  "success": false,
  "error": "Patient not found"
}
```

---

### Get Patients by Department

**Endpoint**: `GET /patients/department/:department`

**Parameters**:
- `department` (path) - Department name (e.g., "Cardiology")

**Response**:
```json
{
  "success": true,
  "data": [...],
  "total": 3
}
```

---

### Create Patient

**Endpoint**: `POST /patients`

**Request Body**:
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@email.com",
  "phone": "+1 (555) 987-6543",
  "dateOfBirth": "1992-06-20",
  "gender": "Female",
  "address": "456 Oak Ave, Brooklyn, NY 11201",
  "department": "Neurology",
  "assignedDoctor": "Dr. Michael Chen",
  "admissionDate": "2025-10-19",
  "status": "Active",
  "medicalHistory": "None",
  "emergencyContact": "John Smith",
  "emergencyPhone": "+1 (555) 987-6544"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "id": "1729345678901",
    "firstName": "Jane",
    "lastName": "Smith",
    ...
    "createdAt": "2025-10-19T10:00:00.000Z",
    "updatedAt": "2025-10-19T10:00:00.000Z"
  }
}
```

---

### Update Patient

**Endpoint**: `PUT /patients/:id`

**Parameters**:
- `id` (path) - Patient ID

**Request Body** (partial update):
```json
{
  "status": "Discharged",
  "medicalHistory": "Treatment completed successfully"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "1",
    ...
    "updatedAt": "2025-10-19T11:00:00.000Z"
  }
}
```

**Error Response** (404):
```json
{
  "success": false,
  "error": "Patient not found"
}
```

---

### Delete Patient

**Endpoint**: `DELETE /patients/:id`

**Parameters**:
- `id` (path) - Patient ID

**Response**:
```json
{
  "success": true,
  "message": "Patient deleted successfully"
}
```

**Error Response** (404):
```json
{
  "success": false,
  "error": "Patient not found"
}
```

---

## Appointment Endpoints

### Get All Appointments

**Endpoint**: `GET /appointments`

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "1729345678901",
      "name": "John Doe",
      "email": "john@email.com",
      "phone": "+1 (555) 123-4567",
      "department": "Cardiology",
      "doctor": "Dr. Sarah Johnson",
      "date": "2025-10-25",
      "time": "10:00 AM",
      "message": "Regular checkup",
      "status": "Scheduled",
      "createdAt": "2025-10-19T10:00:00.000Z",
      "updatedAt": "2025-10-19T10:00:00.000Z"
    }
  ],
  "total": 10
}
```

---

### Get Appointment by ID

**Endpoint**: `GET /appointments/:id`

**Parameters**:
- `id` (path) - Appointment ID

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "1729345678901",
    "name": "John Doe",
    ...
  }
}
```

---

### Create Appointment

**Endpoint**: `POST /appointments`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@email.com",
  "phone": "+1 (555) 123-4567",
  "department": "Cardiology",
  "doctor": "Dr. Sarah Johnson",
  "date": "2025-10-25",
  "time": "10:00 AM",
  "message": "Regular checkup"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "id": "1729345678901",
    "name": "John Doe",
    ...
    "status": "Scheduled",
    "createdAt": "2025-10-19T10:00:00.000Z",
    "updatedAt": "2025-10-19T10:00:00.000Z"
  }
}
```

---

### Update Appointment

**Endpoint**: `PUT /appointments/:id`

**Parameters**:
- `id` (path) - Appointment ID

**Request Body**:
```json
{
  "status": "Completed",
  "time": "11:00 AM"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "1729345678901",
    ...
    "updatedAt": "2025-10-19T11:00:00.000Z"
  }
}
```

---

### Delete Appointment

**Endpoint**: `DELETE /appointments/:id`

**Parameters**:
- `id` (path) - Appointment ID

**Response**:
```json
{
  "success": true,
  "message": "Appointment deleted successfully"
}
```

---

## Statistics Endpoint

### Get Dashboard Statistics

**Endpoint**: `GET /stats`

**Description**: Retrieves aggregated statistics for the dashboard.

**Response**:
```json
{
  "success": true,
  "data": {
    "totalPatients": 25,
    "activePatients": 15,
    "totalAppointments": 50,
    "scheduledAppointments": 20,
    "departmentStats": {
      "Cardiology": 8,
      "Neurology": 5,
      "Orthopedics": 4,
      "Pediatrics": 3,
      "General Medicine": 5
    }
  }
}
```

---

## Health Check

### Health Check Endpoint

**Endpoint**: `GET /health`

**Description**: Checks if the server is running.

**Response**:
```json
{
  "status": "ok",
  "timestamp": "2025-10-19T10:00:00.000Z"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "error": "Invalid request data"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Failed to process request"
}
```

---

## Data Models

### Patient Status Values
- `Active` - Patient is currently registered
- `Under Treatment` - Patient is receiving treatment
- `Discharged` - Patient has been discharged

### Appointment Status Values
- `Scheduled` - Appointment is scheduled
- `Completed` - Appointment was completed
- `Cancelled` - Appointment was cancelled

### Department Values
- Cardiology
- Neurology
- Pediatrics
- Orthopedics
- General Medicine
- Emergency Medicine
- Laboratory Services
- Surgical Services

### Available Appointment Times
- 09:00 AM
- 10:00 AM
- 11:00 AM
- 02:00 PM
- 03:00 PM
- 04:00 PM

---

## Rate Limiting

Currently, there are no rate limits imposed on the API. For production use, implement appropriate rate limiting based on your requirements.

---

## CORS

The API supports CORS for all origins (`*`). All standard HTTP methods are allowed.

---

## Usage Examples

### JavaScript/TypeScript

```typescript
// Fetch all patients
const response = await fetch('https://wkbxjsnjhrhnhcsnkfsr.supabase.co/functions/v1/make-server-471cd30a/patients', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ANON_KEY',
  },
});
const data = await response.json();

// Create a new patient
const newPatient = await fetch('https://wkbxjsnjhrhnhcsnkfsr.supabase.co/functions/v1/make-server-471cd30a/patients', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ANON_KEY',
  },
  body: JSON.stringify({
    firstName: 'Jane',
    lastName: 'Doe',
    // ... other fields
  }),
});
```

### cURL

```bash
# Get all patients
curl -X GET \
  https://wkbxjsnjhrhnhcsnkfsr.supabase.co/functions/v1/make-server-471cd30a/patients \
  -H 'Authorization: Bearer YOUR_ANON_KEY'

# Create appointment
curl -X POST \
  https://wkbxjsnjhrhnhcsnkfsr.supabase.co/functions/v1/make-server-471cd30a/appointments \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -d '{
    "name": "John Doe",
    "email": "john@email.com",
    "phone": "+1 (555) 123-4567",
    "department": "Cardiology",
    "date": "2025-10-25",
    "time": "10:00 AM",
    "message": "Regular checkup"
  }'
```

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- Patient IDs are generated using timestamps
- The database uses Supabase KV Store backed by PostgreSQL
- Sample data is automatically initialized on first server start
