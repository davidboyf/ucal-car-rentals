export interface Vehicle {
  id: string;
  name: string;
  category: "economy" | "compact" | "suv" | "luxury" | "van" | "pickup";
  image: string;
  pricePerDay: number;
  seats: number;
  luggage: number;
  transmission: "automatic" | "manual";
  fuelType: "gasoline" | "diesel" | "hybrid" | "electric";
  ac: boolean;
  features: string[];
  available: boolean;
  description: string;
}

export interface BookingFormData {
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  pickupTime: string;
  returnTime: string;
  vehicleId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  driverLicense: string;
  specialRequests?: string;
}

export interface CharterBooking {
  serviceType: "airport-transfer" | "wedding" | "corporate" | "tour" | "special-event";
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  vehiclePreference: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}
