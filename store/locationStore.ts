import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LocationState {
  latitude: number | null;
  longitude: number | null;
  address: string;
  city: string;
  pincode: string;
  isDetecting: boolean;
  error: string | null;

  detectLocation: () => Promise<void>;
  setManualLocation: (city: string, address: string) => void;
}

// Real Reverse Geocoding using OpenStreetMap Nominatim API (free, no API key required)
const reverseGeocode = async (lat: number, lng: number): Promise<{ address: string, city: string, pincode: string }> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'ONE-MEDI-App/1.0' // Required by Nominatim usage policy
        }
      }
    );

    if (!response.ok) {
      throw new Error('Geocoding API request failed');
    }

    const data = await response.json();

    // Extract address components from response
    const addressDetails = data.address || {};

    // Build readable address
    const addressParts = [
      addressDetails.road,
      addressDetails.neighbourhood || addressDetails.suburb,
      addressDetails.city_district
    ].filter(Boolean);

    const address = addressParts.length > 0
      ? addressParts.join(', ')
      : data.display_name?.split(',').slice(0, 2).join(', ') || 'Location detected';

    // Get city - try multiple fields as OSM naming varies by region
    const city = addressDetails.city
      || addressDetails.town
      || addressDetails.village
      || addressDetails.state_district
      || addressDetails.county
      || 'Kurnool'; // Fallback for Kurnool area

    // Get pincode
    const pincode = addressDetails.postcode || '518002';

    return { address, city, pincode };
  } catch (error) {
    console.error('Reverse geocoding failed:', error);
    // Fallback to Kurnool defaults if geocoding fails
    return {
      address: 'Location detected',
      city: 'Kurnool',
      pincode: '518002'
    };
  }
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      latitude: null,
      longitude: null,
      address: 'Detecting location...',
      city: 'Kurnool',
      pincode: '518002',
      isDetecting: false,
      error: null,

      detectLocation: async () => {
        set({ isDetecting: true, error: null });

        if (!navigator.geolocation) {
          set({ isDetecting: false, error: 'Geolocation not supported by your browser' });
          return;
        }

        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 60000 // Cache for 1 minute
            });
          });

          const { latitude, longitude } = position.coords;

          // Get address from coordinates using real geocoding
          const { address, city, pincode } = await reverseGeocode(latitude, longitude);

          set({
            latitude,
            longitude,
            address,
            city,
            pincode,
            isDetecting: false,
            error: null
          });
        } catch (geoError: any) {
          let errorMessage = 'Unable to detect location';

          if (geoError.code === 1) {
            errorMessage = 'Location access denied. Please enable in settings.';
          } else if (geoError.code === 2) {
            errorMessage = 'Location unavailable. Please try again.';
          } else if (geoError.code === 3) {
            errorMessage = 'Location request timed out. Please try again.';
          }

          set({
            isDetecting: false,
            error: errorMessage,
            // Keep existing location data on error
          });
        }
      },

      setManualLocation: (city, address) => set({
        city,
        address,
        latitude: null,
        longitude: null,
        error: null
      }),
    }),
    {
      name: 'one-medi-location', // localStorage key
      partialize: (state) => ({
        // Only persist these fields, not detecting state or errors
        latitude: state.latitude,
        longitude: state.longitude,
        address: state.address,
        city: state.city,
        pincode: state.pincode,
      }),
    }
  )
);