// Initialize Sample Data Utility
// Call this once to populate the database with sample data

import { DEPARTMENTS, SERVICES, DOCTORS } from '../config/hospital';
import { projectId, publicAnonKey } from './supabase/info';

/**
 * Initialize departments, services, and doctors from hospital config
 */
async function initializeHospitalData() {
  try {
    console.log('[InitializeData] Initializing hospital data...');

    // Check if data already exists
    try {
      const checkResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-471cd30a/departments`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      const checkData = await checkResponse.json();
      if (checkData.data && checkData.data.length > 0) {
        console.log('[InitializeData] Hospital data already exists, skipping initialization');
        return;
      }
    } catch (error) {
      console.log('[InitializeData] No existing data found, proceeding with initialization');
    }

    // Initialize Departments
    for (const dept of DEPARTMENTS) {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-471cd30a/departments`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              id: dept.id,
              name: dept.name,
              description: dept.description,
              icon: dept.icon,
              color: dept.color,
              services: dept.services,
              facilities: dept.facilities,
            }),
          }
        );
        
        if (response.ok) {
          console.log(`[InitializeData] Created department: ${dept.name}`);
        }
      } catch (error) {
        console.log(`[InitializeData] Department ${dept.name} may already exist`);
      }
    }

    // Initialize Services
    for (const service of SERVICES) {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-471cd30a/services`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              id: service.id,
              title: service.title,
              description: service.description,
              icon: service.icon,
              features: service.features,
            }),
          }
        );
        
        if (response.ok) {
          console.log(`[InitializeData] Created service: ${service.title}`);
        }
      } catch (error) {
        console.log(`[InitializeData] Service ${service.title} may already exist`);
      }
    }

    // Initialize Doctors
    for (const doctor of DOCTORS) {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-471cd30a/doctors`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              id: doctor.id,
              name: doctor.name,
              specialty: doctor.specialty,
              department: doctor.department,
              experience: doctor.experience,
              education: doctor.education,
              qualifications: doctor.qualifications,
              languages: doctor.languages,
              bio: doctor.bio,
              availability: doctor.availability,
            }),
          }
        );
        
        if (response.ok) {
          console.log(`[InitializeData] Created doctor: ${doctor.name}`);
        }
      } catch (error) {
        console.log(`[InitializeData] Doctor ${doctor.name} may already exist`);
      }
    }

    console.log('[InitializeData] Hospital data initialization complete');
  } catch (error) {
    console.error('[InitializeData] Error initializing hospital data:', error);
  }
}

/**
 * Initialize sample data in the database
 * This function checks if data exists and only initializes if needed
 */
export async function initializeAppData(): Promise<void> {
  try {
    console.log('[InitializeData] Starting initialization...');
    
    // Initialize hospital data (departments, services, doctors)
    await initializeHospitalData();
    
    console.log('[InitializeData] Initialization complete');
  } catch (error) {
    console.error('[InitializeData] Error during initialization:', error);
  }
}

/**
 * Call this function on app startup to ensure sample data exists
 */
export function setupInitialData() {
  // Initialize data after a short delay to ensure the app is mounted
  setTimeout(() => {
    initializeAppData();
  }, 1500);
}
