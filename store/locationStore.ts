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

// Mock function to simulate Reverse Geocoding (Coords -> Address)
// In a real app, this would call Google Maps Geocoding API
const mockReverseGeocode = async (lat: number, lng: number) => {
  return new Promise<{address: string, city: string, pincode: string}>((resolve) => {
    setTimeout(() => {
      resolve({
        address: 'Gayatri Estate, Near Park Road',
        city: 'Kurnool',
        pincode: '518002'
      });
    }, 1500); // Simulate network delay
  });
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      latitude: null,
      longitude: null,
      address: 'Select Location',
      city: 'Kurnool',
      pincode: '',
      isDetecting: false,
      error: null,

      detectLocation: async () => {
        set({ isDetecting: true, error: null });

        if (!navigator.geolocation) {
          set({ isDetecting: false, error: 'Geolocation is not supported by your browser.' });
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              // Simulate API call
              const data = await mockReverseGeocode(latitude, longitude);
              set({
                latitude,
                longitude,
                address: data.address,
                city: data.city,
                pincode: data.pincode,
                isDetecting: false
              });
            } catch (err) {
              set({ isDetecting: false, error: 'Failed to fetch address details.' });
            }
          },
          (error) => {
            let errorMessage = 'Unable to retrieve your location.';
            if (error.code === error.PERMISSION_DENIED) {
              errorMessage = 'Location permission denied. Please enable it in settings.';
            }
            set({ isDetecting: false, error: errorMessage });
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      },

      setManualLocation: (city, address) => {
        set({ city, address, error: null });
      }
    }),
    {
      name: 'one-medi-location',
      partialize: (state) => ({ 
        city: state.city, 
        address: state.address,
        pincode: state.pincode 
      }), // Only persist these fields
    }
  )
);