// Use proxy in development, or explicit URL in production
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "" : "http://localhost:3001");

export interface VariableData {
  name: string;
  value: any;
  type: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  url?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
  errors?: Array<{ path: string; message: string }>;
}

/**
 * Fetch logo from backend
 */
export async function getLogo(): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/variables/logo/url`);
    const result: ApiResponse<VariableData> = await response.json();

    if (result.success && result.data) {
      // If URL is provided, use it; otherwise construct it from value
      if (result.data.url) {
        return result.data.url;
      }
      if (
        result.data.type === "image" &&
        typeof result.data.value === "string"
      ) {
        return `${API_BASE_URL}/api/variables/files/${result.data.value}`;
      }
    }

    return null;
  } catch (error) {
    console.error("Failed to fetch logo:", error);
    return null;
  }
}

/**
 * Get a variable by name
 */
export async function getVariable(name: string): Promise<VariableData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/variables/${name}`);
    const result: ApiResponse<VariableData> = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch variable ${name}:`, error);
    return null;
  }
}

/**
 * Get all variables
 */
export async function getAllVariables(): Promise<VariableData[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/variables`);
    const result: ApiResponse<VariableData[]> = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch variables:", error);
    return [];
  }
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Send contact form email
 */
export async function sendContactEmail(
  data: ContactFormData
): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: ApiResponse<void> = await response.json();
    return {
      ...result,
      statusCode: response.status,
    };
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
      error: error instanceof Error ? error.message : "Unknown error",
      statusCode: 500,
    };
  }
}

// Finance form types
export interface FinanceFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fax?: string;
  dateOfBirth: string;
  ssn: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  driversLicenseNumber?: string;
  driversLicenseState?: string;
  driversLicenseExpDate?: string;
  // Residence Information
  residenceType: "own" | "rent" | "other";
  timeAtResidence: string;
  mortgageRentPayment: string;
  priorAddress?: string;
  accountsInName?: ("utilities" | "savings" | "checking" | "phone")[];
  // Employment Information
  employerName: string;
  employerAddress: string;
  employerCity: string;
  employerState: string;
  employerZip: string;
  businessPhone: string;
  employmentStatus:
    | "employed"
    | "self-employed"
    | "unemployed"
    | "retired"
    | "student";
  occupation: string;
  timeOnJob: string;
  payFrequency: "weekly" | "bi-weekly" | "semi-monthly" | "monthly";
  paycheckAmount: string;
  // Financial Information
  monthlyIncome: string;
  downPayment?: string;
  loanAmount: string;
  otherIncome?: string;
  // Vehicle Information
  vehicleYear?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehiclePrice?: string;
  // Trade-In Details
  tradeInMake?: string;
  tradeInModel?: string;
  tradeInYear?: string;
  tradeInMileage?: string;
  tradeInComments?: string;
  // Additional Information
  additionalNotes?: string;
  // Co-Borrowers
  coBorrowers?: any[];
  // Terms
  acceptTerms: boolean;
}

/**
 * Submit finance application
 */
export async function submitFinanceApplication(
  data: FinanceFormData
): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/finance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: ApiResponse<void> = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to submit finance application:", error);
    return {
      success: false,
      message: "Failed to submit application. Please try again later.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Vehicle types
export interface Vehicle {
  id: number;
  name: string;
  price: string;
  image: string;
  images?: string[];
  mileage: string;
  transmission: string;
  fuel: string;
  year: string;
  badge: string;
  condition: string;
  location?: string;
  store?: string;
}

/**
 * Get all vehicles
 */
export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const url = `${API_BASE_URL}/api/vehicles`;
    console.log("Fetching vehicles from:", url);
    const response = await fetch(url);

    if (!response.ok) {
      console.error(
        `Failed to fetch vehicles: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const result: ApiResponse<Vehicle[]> = await response.json();
    console.log("API response:", result);

    if (result.success && result.data) {
      console.log(`Successfully fetched ${result.data.length} vehicles`);
      return result.data;
    }

    console.warn("API returned unsuccessful response:", result);
    return [];
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    return [];
  }
}

/**
 * Get vehicle by ID
 */
export async function getVehicle(id: number): Promise<Vehicle | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/vehicles/${id}`);
    const result: ApiResponse<Vehicle> = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch vehicle ${id}:`, error);
    return null;
  }
}

// Testimonial types
export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  vehicle?: string;
  date: string;
  sortOrder: number;
}

/**
 * Get all testimonials
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/testimonials`);
    const result: ApiResponse<Testimonial[]> = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return [];
  }
}

// Staff types
export interface StaffMember {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  cellPhone?: string;
  image?: string;
  bio?: string;
}

/**
 * Get all staff members
 */
export async function getStaffMembers(): Promise<StaffMember[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/staff`);
    const result: ApiResponse<StaffMember[]> = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch staff members:", error);
    return [];
  }
}

// Popular item types
export interface PopularItem {
  name: string;
  count: number;
}

export interface PopularItems {
  body_style: PopularItem[];
  make: PopularItem[];
  model: PopularItem[];
}

/**
 * Get all popular items
 */
export async function getPopularItems(): Promise<PopularItems> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/popular-items`);
    const result: ApiResponse<PopularItems> = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return { body_style: [], make: [], model: [] };
  } catch (error) {
    console.error("Failed to fetch popular items:", error);
    return { body_style: [], make: [], model: [] };
  }
}

/**
 * Get popular items by category
 */
export async function getPopularItemsByCategory(
  category: "body_style" | "make" | "model"
): Promise<PopularItem[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/popular-items/${category}`
    );
    const result: ApiResponse<PopularItem[]> = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return [];
  } catch (error) {
    console.error(`Failed to fetch popular items for ${category}:`, error);
    return [];
  }
}

/**
 * Get all background images
 */
export async function getBackgroundImages(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/background-images`);
    const result: ApiResponse<string[]> = await response.json();

    if (result.success && result.data) {
      return result.data;
    }

    return [];
  } catch (error) {
    console.error("Failed to fetch background images:", error);
    return [];
  }
}
