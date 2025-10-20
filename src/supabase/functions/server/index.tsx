import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger for debugging
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Create Supabase clients
const getSupabaseAdmin = () => createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

const getSupabaseClient = () => createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!,
);

// Middleware to check admin authentication
const requireAuth = async (c: any, next: any) => {
  const accessToken = c.req.header('Authorization')?.split(' ')[1];
  
  if (!accessToken || accessToken === Deno.env.get('SUPABASE_ANON_KEY')) {
    return c.json({ success: false, error: 'Unauthorized - Admin login required' }, 401);
  }

  const supabase = getSupabaseAdmin();
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  
  if (error || !user?.id) {
    console.error('[Auth] Error verifying user:', error);
    return c.json({ success: false, error: 'Unauthorized - Invalid token' }, 401);
  }

  // Store user in context for later use
  c.set('userId', user.id);
  c.set('userEmail', user.email);
  
  await next();
};

// Health check endpoint
app.get("/make-server-471cd30a/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ============================================================================
// ADMIN AUTHENTICATION ENDPOINTS
// ============================================================================

// Admin signup
app.post("/make-server-471cd30a/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({
        success: false,
        error: 'Email, password, and name are required'
      }, 400);
    }

    const supabase = getSupabaseAdmin();
    
    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error('[Signup] Error creating admin user:', error);
      return c.json({
        success: false,
        error: `Admin signup error: ${error.message}`
      }, 400);
    }

    // Store admin data in KV store
    const adminData = {
      id: data.user.id,
      email,
      name,
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`admin:${data.user.id}`, adminData);
    console.log(`[Signup] Created admin user: ${email}`);

    return c.json({
      success: true,
      message: 'Admin account created successfully',
      data: {
        id: data.user.id,
        email,
        name,
      }
    }, 201);
  } catch (error) {
    console.error('[Signup] Error during admin signup:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Admin signup failed'
    }, 500);
  }
});

// Admin login
app.post("/make-server-471cd30a/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({
        success: false,
        error: 'Email and password are required'
      }, 400);
    }

    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('[Login] Error during admin login:', error);
      return c.json({
        success: false,
        error: `Login error: ${error.message}`
      }, 401);
    }

    // Get admin data from KV store
    const adminData = await kv.get(`admin:${data.user.id}`);

    console.log(`[Login] Admin logged in: ${email}`);

    return c.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: adminData?.name || data.user.user_metadata?.name,
        },
        accessToken: data.session.access_token,
      }
    });
  } catch (error) {
    console.error('[Login] Error during admin login:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Login failed'
    }, 500);
  }
});

// Check session
app.get("/make-server-471cd30a/auth/session", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken || accessToken === Deno.env.get('SUPABASE_ANON_KEY')) {
      return c.json({ success: false, error: 'No active session' }, 401);
    }

    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return c.json({ success: false, error: 'Invalid session' }, 401);
    }

    const adminData = await kv.get(`admin:${user.id}`);

    return c.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: adminData?.name || user.user_metadata?.name,
      }
    });
  } catch (error) {
    console.error('[Session] Error checking session:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Session check failed'
    }, 500);
  }
});

// Logout
app.post("/make-server-471cd30a/auth/logout", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ success: true, message: 'Already logged out' });
    }

    const supabase = getSupabaseAdmin();
    await supabase.auth.admin.signOut(accessToken);

    return c.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('[Logout] Error during logout:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Logout failed'
    }, 500);
  }
});

// ============================================================================
// PATIENTS API ENDPOINTS (Admin Protected)
// ============================================================================

// Get all patients
app.get("/make-server-471cd30a/patients", requireAuth, async (c) => {
  try {
    const patients = await kv.getByPrefix("patient:");
    console.log(`[Patients GET] Retrieved ${patients.length} patients`);
    return c.json({
      success: true,
      data: patients,
      total: patients.length,
    });
  } catch (error) {
    console.error("[Patients GET] Error fetching patients:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch patients",
      },
      500
    );
  }
});

// Get patient by ID
app.get("/make-server-471cd30a/patients/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param("id");
    const patient = await kv.get(`patient:${id}`);
    
    if (!patient) {
      console.log(`[Patient GET] Patient not found: ${id}`);
      return c.json({ success: false, error: "Patient not found" }, 404);
    }

    console.log(`[Patient GET] Retrieved patient: ${id}`);
    return c.json({ success: true, data: patient });
  } catch (error) {
    console.error("[Patient GET] Error fetching patient:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch patient",
      },
      500
    );
  }
});

// Create new patient
app.post("/make-server-471cd30a/patients", requireAuth, async (c) => {
  try {
    const body = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newPatient = {
      id,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`patient:${id}`, newPatient);
    console.log(`[Patient POST] Created new patient: ${id}`);
    
    return c.json({
      success: true,
      data: newPatient,
      message: "Patient created successfully",
    }, 201);
  } catch (error) {
    console.error("[Patient POST] Error creating patient:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create patient",
      },
      500
    );
  }
});

// Update patient
app.put("/make-server-471cd30a/patients/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const existingPatient = await kv.get(`patient:${id}`);
    if (!existingPatient) {
      console.log(`[Patient PUT] Patient not found: ${id}`);
      return c.json({ success: false, error: "Patient not found" }, 404);
    }

    const updatedPatient = {
      ...existingPatient,
      ...body,
      id,
      createdAt: existingPatient.createdAt,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`patient:${id}`, updatedPatient);
    console.log(`[Patient PUT] Updated patient: ${id}`);
    
    return c.json({
      success: true,
      data: updatedPatient,
      message: "Patient updated successfully",
    });
  } catch (error) {
    console.error("[Patient PUT] Error updating patient:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update patient",
      },
      500
    );
  }
});

// Delete patient
app.delete("/make-server-471cd30a/patients/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param("id");
    
    const existingPatient = await kv.get(`patient:${id}`);
    if (!existingPatient) {
      console.log(`[Patient DELETE] Patient not found: ${id}`);
      return c.json({ success: false, error: "Patient not found" }, 404);
    }

    await kv.del(`patient:${id}`);
    console.log(`[Patient DELETE] Deleted patient: ${id}`);
    
    return c.json({
      success: true,
      message: "Patient deleted successfully",
    });
  } catch (error) {
    console.error("[Patient DELETE] Error deleting patient:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete patient",
      },
      500
    );
  }
});

// ============================================================================
// APPOINTMENTS API ENDPOINTS
// ============================================================================

// Get all appointments (Admin only)
app.get("/make-server-471cd30a/appointments", requireAuth, async (c) => {
  try {
    const appointments = await kv.getByPrefix("appointment:");
    console.log(`[Appointments GET] Retrieved ${appointments.length} appointments`);
    return c.json({
      success: true,
      data: appointments,
      total: appointments.length,
    });
  } catch (error) {
    console.error("[Appointments GET] Error fetching appointments:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch appointments",
      },
      500
    );
  }
});

// Get appointment by ID (Public - for users to view their receipt)
app.get("/make-server-471cd30a/appointments/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const appointment = await kv.get(`appointment:${id}`);
    
    if (!appointment) {
      console.log(`[Appointment GET] Appointment not found: ${id}`);
      return c.json({ success: false, error: "Appointment not found" }, 404);
    }

    console.log(`[Appointment GET] Retrieved appointment: ${id}`);
    return c.json({ success: true, data: appointment });
  } catch (error) {
    console.error("[Appointment GET] Error fetching appointment:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch appointment",
      },
      500
    );
  }
});

// Create new appointment (Public - for users to book)
app.post("/make-server-471cd30a/appointments", async (c) => {
  try {
    const body = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newAppointment = {
      id,
      ...body,
      status: body.status || 'Scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`appointment:${id}`, newAppointment);
    console.log(`[Appointment POST] Created new appointment: ${id}`);
    
    return c.json({
      success: true,
      data: newAppointment,
      message: "Appointment booked successfully",
    }, 201);
  } catch (error) {
    console.error("[Appointment POST] Error creating appointment:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create appointment",
      },
      500
    );
  }
});

// Update appointment (Admin only)
app.put("/make-server-471cd30a/appointments/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const existingAppointment = await kv.get(`appointment:${id}`);
    if (!existingAppointment) {
      console.log(`[Appointment PUT] Appointment not found: ${id}`);
      return c.json({ success: false, error: "Appointment not found" }, 404);
    }

    const updatedAppointment = {
      ...existingAppointment,
      ...body,
      id,
      createdAt: existingAppointment.createdAt,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`appointment:${id}`, updatedAppointment);
    console.log(`[Appointment PUT] Updated appointment: ${id}`);
    
    return c.json({
      success: true,
      data: updatedAppointment,
      message: "Appointment updated successfully",
    });
  } catch (error) {
    console.error("[Appointment PUT] Error updating appointment:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update appointment",
      },
      500
    );
  }
});

// Delete appointment (Admin only)
app.delete("/make-server-471cd30a/appointments/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param("id");
    
    const existingAppointment = await kv.get(`appointment:${id}`);
    if (!existingAppointment) {
      console.log(`[Appointment DELETE] Appointment not found: ${id}`);
      return c.json({ success: false, error: "Appointment not found" }, 404);
    }

    await kv.del(`appointment:${id}`);
    console.log(`[Appointment DELETE] Deleted appointment: ${id}`);
    
    return c.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("[Appointment DELETE] Error deleting appointment:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete appointment",
      },
      500
    );
  }
});

// ============================================================================
// DOCTORS API ENDPOINTS (Admin Protected)
// ============================================================================

// Get all doctors (Public for viewing)
app.get("/make-server-471cd30a/doctors", async (c) => {
  try {
    const doctors = await kv.getByPrefix("doctor:");
    console.log(`[Doctors GET] Retrieved ${doctors.length} doctors`);
    return c.json({
      success: true,
      data: doctors,
      total: doctors.length,
    });
  } catch (error) {
    console.error("[Doctors GET] Error fetching doctors:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch doctors",
      },
      500
    );
  }
});

// Create doctor (Admin only)
app.post("/make-server-471cd30a/doctors", requireAuth, async (c) => {
  try {
    const body = await c.req.json();
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newDoctor = {
      id,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`doctor:${id}`, newDoctor);
    console.log(`[Doctor POST] Created new doctor: ${id}`);
    
    return c.json({
      success: true,
      data: newDoctor,
      message: "Doctor created successfully",
    }, 201);
  } catch (error) {
    console.error("[Doctor POST] Error creating doctor:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create doctor",
      },
      500
    );
  }
});

// Update doctor (Admin only)
app.put("/make-server-471cd30a/doctors/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const existingDoctor = await kv.get(`doctor:${id}`);
    if (!existingDoctor) {
      return c.json({ success: false, error: "Doctor not found" }, 404);
    }

    const updatedDoctor = {
      ...existingDoctor,
      ...body,
      id,
      createdAt: existingDoctor.createdAt,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`doctor:${id}`, updatedDoctor);
    console.log(`[Doctor PUT] Updated doctor: ${id}`);
    
    return c.json({
      success: true,
      data: updatedDoctor,
      message: "Doctor updated successfully",
    });
  } catch (error) {
    console.error("[Doctor PUT] Error updating doctor:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update doctor",
      },
      500
    );
  }
});

// Delete doctor (Admin only)
app.delete("/make-server-471cd30a/doctors/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param("id");
    
    const existingDoctor = await kv.get(`doctor:${id}`);
    if (!existingDoctor) {
      return c.json({ success: false, error: "Doctor not found" }, 404);
    }

    await kv.del(`doctor:${id}`);
    console.log(`[Doctor DELETE] Deleted doctor: ${id}`);
    
    return c.json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.error("[Doctor DELETE] Error deleting doctor:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete doctor",
      },
      500
    );
  }
});

// ============================================================================
// DEPARTMENTS API ENDPOINTS (Admin Protected)
// ============================================================================

// Get all departments (Public for viewing)
app.get("/make-server-471cd30a/departments", async (c) => {
  try {
    const departments = await kv.getByPrefix("department:");
    console.log(`[Departments GET] Retrieved ${departments.length} departments`);
    return c.json({
      success: true,
      data: departments,
      total: departments.length,
    });
  } catch (error) {
    console.error("[Departments GET] Error fetching departments:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch departments",
      },
      500
    );
  }
});

// Create department (Admin only)
app.post("/make-server-471cd30a/departments", requireAuth, async (c) => {
  try {
    const body = await c.req.json();
    const id = body.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newDepartment = {
      id,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`department:${id}`, newDepartment);
    console.log(`[Department POST] Created new department: ${id}`);
    
    return c.json({
      success: true,
      data: newDepartment,
      message: "Department created successfully",
    }, 201);
  } catch (error) {
    console.error("[Department POST] Error creating department:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create department",
      },
      500
    );
  }
});

// Update department (Admin only)
app.put("/make-server-471cd30a/departments/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const existingDepartment = await kv.get(`department:${id}`);
    if (!existingDepartment) {
      return c.json({ success: false, error: "Department not found" }, 404);
    }

    const updatedDepartment = {
      ...existingDepartment,
      ...body,
      id,
      createdAt: existingDepartment.createdAt,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`department:${id}`, updatedDepartment);
    console.log(`[Department PUT] Updated department: ${id}`);
    
    return c.json({
      success: true,
      data: updatedDepartment,
      message: "Department updated successfully",
    });
  } catch (error) {
    console.error("[Department PUT] Error updating department:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update department",
      },
      500
    );
  }
});

// Delete department (Admin only)
app.delete("/make-server-471cd30a/departments/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param("id");
    
    const existingDepartment = await kv.get(`department:${id}`);
    if (!existingDepartment) {
      return c.json({ success: false, error: "Department not found" }, 404);
    }

    await kv.del(`department:${id}`);
    console.log(`[Department DELETE] Deleted department: ${id}`);
    
    return c.json({
      success: true,
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error("[Department DELETE] Error deleting department:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete department",
      },
      500
    );
  }
});

// ============================================================================
// SERVICES API ENDPOINTS (Admin Protected)
// ============================================================================

// Get all services (Public for viewing)
app.get("/make-server-471cd30a/services", async (c) => {
  try {
    const services = await kv.getByPrefix("service:");
    console.log(`[Services GET] Retrieved ${services.length} services`);
    return c.json({
      success: true,
      data: services,
      total: services.length,
    });
  } catch (error) {
    console.error("[Services GET] Error fetching services:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch services",
      },
      500
    );
  }
});

// Create service (Admin only)
app.post("/make-server-471cd30a/services", requireAuth, async (c) => {
  try {
    const body = await c.req.json();
    const id = body.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newService = {
      id,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`service:${id}`, newService);
    console.log(`[Service POST] Created new service: ${id}`);
    
    return c.json({
      success: true,
      data: newService,
      message: "Service created successfully",
    }, 201);
  } catch (error) {
    console.error("[Service POST] Error creating service:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create service",
      },
      500
    );
  }
});

// Update service (Admin only)
app.put("/make-server-471cd30a/services/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const existingService = await kv.get(`service:${id}`);
    if (!existingService) {
      return c.json({ success: false, error: "Service not found" }, 404);
    }

    const updatedService = {
      ...existingService,
      ...body,
      id,
      createdAt: existingService.createdAt,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`service:${id}`, updatedService);
    console.log(`[Service PUT] Updated service: ${id}`);
    
    return c.json({
      success: true,
      data: updatedService,
      message: "Service updated successfully",
    });
  } catch (error) {
    console.error("[Service PUT] Error updating service:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update service",
      },
      500
    );
  }
});

// Delete service (Admin only)
app.delete("/make-server-471cd30a/services/:id", requireAuth, async (c) => {
  try {
    const id = c.req.param("id");
    
    const existingService = await kv.get(`service:${id}`);
    if (!existingService) {
      return c.json({ success: false, error: "Service not found" }, 404);
    }

    await kv.del(`service:${id}`);
    console.log(`[Service DELETE] Deleted service: ${id}`);
    
    return c.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("[Service DELETE] Error deleting service:", error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete service",
      },
      500
    );
  }
});

// Start the server
Deno.serve(app.fetch);
