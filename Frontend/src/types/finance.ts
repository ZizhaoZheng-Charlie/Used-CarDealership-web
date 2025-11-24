import * as z from "zod";

// Co-Borrower schema (reusable)
const coBorrowerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[\d\s\-\(\)]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits"),
  fax: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || /^[\d\s\-\(\)]+$/.test(val),
      "Please enter a valid fax number"
    ),
  ssn: z
    .string()
    .min(1, "SSN is required")
    .regex(/^\d{3}-\d{2}-\d{4}$/, "SSN must be in format XXX-XX-XXXX"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
  driversLicenseNumber: z.string().optional().or(z.literal("")),
  driversLicenseState: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || val.length === 2,
      "State must be a 2-letter abbreviation"
    )
    .refine(
      (val) => !val || /^[A-Z]{2}$/i.test(val),
      "State must be a 2-letter abbreviation (e.g., CA, NY)"
    ),
  driversLicenseExpDate: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || /^\d{2}\/\d{2}\/\d{4}$/.test(val),
      "Date must be in format MM/DD/YYYY"
    ),
  residenceType: z.enum(["own", "rent", "other"], {
    required_error: "Please select your residence type",
  }),
  timeAtResidence: z
    .string()
    .min(1, "Time at residence is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Time at residence must be a valid number"
    ),
  mortgageRentPayment: z
    .string()
    .min(1, "Mortgage/rent payment is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Mortgage/rent payment must be a valid number"
    ),
  priorAddress: z.string().optional(),
  accountsInName: z
    .array(z.enum(["utilities", "savings", "checking", "phone"]))
    .optional()
    .default([]),
  employerName: z.string().min(1, "Employer name is required"),
  employerAddress: z.string().min(5, "Employer address is required"),
  employerCity: z.string().min(2, "Employer city is required"),
  employerState: z.string().min(1, "Please select employer state"),
  employerZip: z
    .string()
    .min(1, "Employer ZIP code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
  businessPhone: z
    .string()
    .min(1, "Business phone is required")
    .regex(/^[\d\s\-\(\)]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits"),
  employmentStatus: z.enum(
    ["employed", "self-employed", "unemployed", "retired", "student"],
    {
      required_error: "Please select your employment status",
    }
  ),
  occupation: z.string().min(1, "Occupation is required"),
  timeOnJob: z
    .string()
    .min(1, "Time on job is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Time on job must be a valid number"
    ),
  payFrequency: z.enum(["weekly", "bi-weekly", "semi-monthly", "monthly"], {
    required_error: "Please select pay frequency",
  }),
  paycheckAmount: z
    .string()
    .min(1, "Paycheck amount is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Paycheck amount must be a positive number"
    ),
  monthlyIncome: z
    .string()
    .min(1, "Monthly income is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Monthly income must be a positive number"
    ),
  otherIncome: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || (!isNaN(Number(val)) && Number(val) >= 0),
      "Other income must be a valid number"
    ),
  additionalNotes: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || val.length <= 1000,
      "Notes must be less than 1000 characters"
    ),
});

export const financeFormSchema = z
  .object({
    // Personal Information
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .regex(/^[\d\s\-\(\)]+$/, "Please enter a valid phone number")
      .min(10, "Phone number must be at least 10 digits"),
    fax: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || /^[\d\s\-\(\)]+$/.test(val),
        "Please enter a valid fax number"
      ),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    ssn: z
      .string()
      .min(1, "SSN is required")
      .regex(/^\d{3}-\d{2}-\d{4}$/, "SSN must be in format XXX-XX-XXXX"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    zipCode: z
      .string()
      .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),

    // Driver's License Information
    driversLicenseNumber: z.string().optional().or(z.literal("")),
    driversLicenseState: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || val.length === 2,
        "State must be a 2-letter abbreviation"
      )
      .refine(
        (val) => !val || /^[A-Z]{2}$/i.test(val),
        "State must be a 2-letter abbreviation (e.g., CA, NY)"
      ),
    driversLicenseExpDate: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || /^\d{2}\/\d{2}\/\d{4}$/.test(val),
        "Date must be in format MM/DD/YYYY"
      ),

    // Residence Information
    residenceType: z.enum(["own", "rent", "other"], {
      required_error: "Please select your residence type",
    }),
    timeAtResidence: z
      .string()
      .min(1, "Time at residence is required")
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) >= 0,
        "Time at residence must be a valid number"
      ),
    mortgageRentPayment: z
      .string()
      .min(1, "Mortgage/rent payment is required")
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) >= 0,
        "Mortgage/rent payment must be a valid number"
      ),
    priorAddress: z.string().optional(),
    accountsInName: z
      .array(z.enum(["utilities", "savings", "checking", "phone"]))
      .optional()
      .default([]),

    // Employment Information
    employerName: z.string().min(1, "Employer name is required"),
    employerAddress: z.string().min(5, "Employer address is required"),
    employerCity: z.string().min(2, "Employer city is required"),
    employerState: z.string().min(1, "Please select employer state"),
    employerZip: z
      .string()
      .min(1, "Employer ZIP code is required")
      .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
    businessPhone: z
      .string()
      .min(1, "Business phone is required")
      .regex(/^[\d\s\-\(\)]+$/, "Please enter a valid phone number")
      .min(10, "Phone number must be at least 10 digits"),
    employmentStatus: z.enum(
      ["employed", "self-employed", "unemployed", "retired", "student"],
      {
        required_error: "Please select your employment status",
      }
    ),
    occupation: z.string().min(1, "Occupation is required"),
    timeOnJob: z
      .string()
      .min(1, "Time on job is required")
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) >= 0,
        "Time on job must be a valid number"
      ),
    payFrequency: z.enum(["weekly", "bi-weekly", "semi-monthly", "monthly"], {
      required_error: "Please select pay frequency",
    }),
    paycheckAmount: z
      .string()
      .min(1, "Paycheck amount is required")
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0,
        "Paycheck amount must be a positive number"
      ),
    jobTitle: z.string().optional(),
    workPhone: z
      .string()
      .regex(/^[\d\s\-\(\)]+$/, "Please enter a valid phone number")
      .optional()
      .or(z.literal("")),
    yearsAtJob: z
      .string()
      .optional()
      .refine(
        (val) => !val || (!isNaN(Number(val)) && Number(val) >= 0),
        "Years must be a valid number"
      ),

    // Financial Information
    monthlyIncome: z
      .string()
      .min(1, "Monthly income is required")
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0,
        "Monthly income must be a positive number"
      ),
    downPayment: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || (!isNaN(Number(val)) && Number(val) >= 0),
        "Down payment must be a valid number"
      ),
    loanAmount: z
      .string()
      .min(1, "Loan amount is required")
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0,
        "Loan amount must be a positive number"
      ),

    // Vehicle Information
    vehicleYear: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val ||
          (!isNaN(Number(val)) &&
            Number(val) >= 1900 &&
            Number(val) <= new Date().getFullYear() + 1),
        "Please enter a valid year"
      ),
    vehicleMake: z.string().optional(),
    vehicleModel: z.string().optional(),
    vehiclePrice: z
      .string()
      .optional()
      .refine(
        (val) => !val || (!isNaN(Number(val)) && Number(val) > 0),
        "Vehicle price must be a positive number"
      ),

    // Additional Information
    additionalNotes: z
      .string()
      .max(1000, "Notes must be less than 1000 characters")
      .optional(),

    // Trade-In Details
    tradeInMake: z.string().optional(),
    tradeInModel: z.string().optional(),
    tradeInYear: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val ||
          (!isNaN(Number(val)) &&
            Number(val) >= 1900 &&
            Number(val) <= new Date().getFullYear() + 1),
        "Please enter a valid year"
      ),
    tradeInMileage: z
      .string()
      .optional()
      .refine(
        (val) => !val || (!isNaN(Number(val)) && Number(val) >= 0),
        "Mileage must be a valid number"
      ),
    tradeInComments: z
      .string()
      .max(1000, "Comments must be less than 1000 characters")
      .optional(),

    // Other Income
    otherIncome: z
      .string()
      .optional()
      .or(z.literal(""))
      .refine(
        (val) => !val || (!isNaN(Number(val)) && Number(val) >= 0),
        "Other income must be a valid number"
      ),

    // Co-Borrowers Information (array)
    coBorrowers: z.array(coBorrowerSchema).optional().default([]),

    // Terms and Conditions
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .superRefine((data, ctx) => {
    // Validate prior address is required if time at residence < 5 years
    const timeAtResidence = Number(data.timeAtResidence);
    if (
      timeAtResidence < 5 &&
      (!data.priorAddress || data.priorAddress.trim() === "")
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Prior address is required if you have lived at your current residence less than 5 years",
        path: ["priorAddress"],
      });
    }

    // Validate co-borrower fields
    data.coBorrowers?.forEach((coBorrower, index) => {
      const hasCoBorrowerData = Object.values(coBorrower).some(
        (value) =>
          value !== undefined &&
          value !== "" &&
          value !== null &&
          (Array.isArray(value) ? value.length > 0 : true)
      );

      if (hasCoBorrowerData) {
        // Personal Information
        if (
          !coBorrower.firstName ||
          (typeof coBorrower.firstName === "string" &&
            coBorrower.firstName.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} first name is required`,
            path: [`coBorrowers.${index}.firstName`],
          });
        }
        if (
          !coBorrower.lastName ||
          (typeof coBorrower.lastName === "string" &&
            coBorrower.lastName.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} last name is required`,
            path: [`coBorrowers.${index}.lastName`],
          });
        }
        if (
          !coBorrower.email ||
          (typeof coBorrower.email === "string" &&
            coBorrower.email.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} email is required`,
            path: [`coBorrowers.${index}.email`],
          });
        }
        if (
          !coBorrower.phone ||
          (typeof coBorrower.phone === "string" &&
            coBorrower.phone.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} phone is required`,
            path: [`coBorrowers.${index}.phone`],
          });
        }
        if (
          !coBorrower.ssn ||
          (typeof coBorrower.ssn === "string" && coBorrower.ssn.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} SSN is required`,
            path: [`coBorrowers.${index}.ssn`],
          });
        }
        if (
          !coBorrower.dateOfBirth ||
          (typeof coBorrower.dateOfBirth === "string" &&
            coBorrower.dateOfBirth.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} date of birth is required`,
            path: [`coBorrowers.${index}.dateOfBirth`],
          });
        }
        if (
          !coBorrower.address ||
          (typeof coBorrower.address === "string" &&
            coBorrower.address.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} address is required`,
            path: [`coBorrowers.${index}.address`],
          });
        }
        if (
          !coBorrower.city ||
          (typeof coBorrower.city === "string" && coBorrower.city.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} city is required`,
            path: [`coBorrowers.${index}.city`],
          });
        }
        if (
          !coBorrower.state ||
          (typeof coBorrower.state === "string" &&
            coBorrower.state.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} state is required`,
            path: [`coBorrowers.${index}.state`],
          });
        }
        if (
          !coBorrower.zipCode ||
          (typeof coBorrower.zipCode === "string" &&
            coBorrower.zipCode.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} ZIP code is required`,
            path: [`coBorrowers.${index}.zipCode`],
          });
        }
        // Residence Information
        if (!coBorrower.residenceType) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} residence type is required`,
            path: [`coBorrowers.${index}.residenceType`],
          });
        }
        if (
          !coBorrower.timeAtResidence ||
          (typeof coBorrower.timeAtResidence === "string" &&
            coBorrower.timeAtResidence.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} time at residence is required`,
            path: [`coBorrowers.${index}.timeAtResidence`],
          });
        }
        if (
          !coBorrower.mortgageRentPayment ||
          (typeof coBorrower.mortgageRentPayment === "string" &&
            coBorrower.mortgageRentPayment.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${
              index + 1
            } mortgage/rent payment is required`,
            path: [`coBorrowers.${index}.mortgageRentPayment`],
          });
        }
        // Validate co-borrower prior address if time at residence < 5 years
        const coBorrowerTimeAtResidence = Number(coBorrower.timeAtResidence);
        if (
          coBorrowerTimeAtResidence < 5 &&
          (!coBorrower.priorAddress ||
            (typeof coBorrower.priorAddress === "string" &&
              coBorrower.priorAddress.trim() === ""))
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${
              index + 1
            } prior address is required if they have lived at their current residence less than 5 years`,
            path: [`coBorrowers.${index}.priorAddress`],
          });
        }
        // Employment Information
        if (
          !coBorrower.employerName ||
          (typeof coBorrower.employerName === "string" &&
            coBorrower.employerName.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} employer name is required`,
            path: [`coBorrowers.${index}.employerName`],
          });
        }
        if (
          !coBorrower.employerAddress ||
          (typeof coBorrower.employerAddress === "string" &&
            coBorrower.employerAddress.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} employer address is required`,
            path: [`coBorrowers.${index}.employerAddress`],
          });
        }
        if (
          !coBorrower.employerCity ||
          (typeof coBorrower.employerCity === "string" &&
            coBorrower.employerCity.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} employer city is required`,
            path: [`coBorrowers.${index}.employerCity`],
          });
        }
        if (
          !coBorrower.employerState ||
          (typeof coBorrower.employerState === "string" &&
            coBorrower.employerState.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} employer state is required`,
            path: [`coBorrowers.${index}.employerState`],
          });
        }
        if (
          !coBorrower.employerZip ||
          (typeof coBorrower.employerZip === "string" &&
            coBorrower.employerZip.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} employer ZIP code is required`,
            path: [`coBorrowers.${index}.employerZip`],
          });
        }
        if (
          !coBorrower.businessPhone ||
          (typeof coBorrower.businessPhone === "string" &&
            coBorrower.businessPhone.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} business phone is required`,
            path: [`coBorrowers.${index}.businessPhone`],
          });
        }
        if (!coBorrower.employmentStatus) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} employment status is required`,
            path: [`coBorrowers.${index}.employmentStatus`],
          });
        }
        if (
          !coBorrower.occupation ||
          (typeof coBorrower.occupation === "string" &&
            coBorrower.occupation.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} occupation is required`,
            path: [`coBorrowers.${index}.occupation`],
          });
        }
        if (
          !coBorrower.timeOnJob ||
          (typeof coBorrower.timeOnJob === "string" &&
            coBorrower.timeOnJob.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} time on job is required`,
            path: [`coBorrowers.${index}.timeOnJob`],
          });
        }
        if (!coBorrower.payFrequency) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} pay frequency is required`,
            path: [`coBorrowers.${index}.payFrequency`],
          });
        }
        if (
          !coBorrower.paycheckAmount ||
          (typeof coBorrower.paycheckAmount === "string" &&
            coBorrower.paycheckAmount.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} paycheck amount is required`,
            path: [`coBorrowers.${index}.paycheckAmount`],
          });
        }
        // Financial Information
        if (
          !coBorrower.monthlyIncome ||
          (typeof coBorrower.monthlyIncome === "string" &&
            coBorrower.monthlyIncome.trim() === "")
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Co-borrower ${index + 1} monthly income is required`,
            path: [`coBorrowers.${index}.monthlyIncome`],
          });
        }
      }
    });
  });

export type FinanceFormValues = z.infer<typeof financeFormSchema>;

// Helper function to get default form values
export const getDefaultFinanceFormValues = (): Partial<FinanceFormValues> => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  fax: "",
  dateOfBirth: "",
  ssn: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  driversLicenseNumber: "",
  driversLicenseState: "",
  driversLicenseExpDate: "",
  residenceType: undefined,
  timeAtResidence: "",
  mortgageRentPayment: "",
  priorAddress: "",
  accountsInName: [],
  employerName: "",
  employerAddress: "",
  employerCity: "",
  employerState: "",
  employerZip: "",
  businessPhone: "",
  employmentStatus: undefined,
  occupation: "",
  timeOnJob: "",
  payFrequency: undefined,
  paycheckAmount: "",
  jobTitle: "",
  workPhone: "",
  yearsAtJob: "",
  monthlyIncome: "",
  downPayment: "",
  loanAmount: "",
  vehicleYear: "",
  vehicleMake: "",
  vehicleModel: "",
  vehiclePrice: "",
  tradeInMake: "",
  tradeInModel: "",
  tradeInYear: "",
  tradeInMileage: "",
  tradeInComments: "",
  additionalNotes: "",
  otherIncome: "",
  coBorrowers: [],
  acceptTerms: false,
});

// Helper function to create default co-borrower object
export const getDefaultCoBorrower = () => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  fax: "",
  ssn: "",
  dateOfBirth: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  driversLicenseNumber: "",
  driversLicenseState: "",
  driversLicenseExpDate: "",
  residenceType: undefined as "own" | "rent" | "other" | undefined,
  timeAtResidence: "",
  mortgageRentPayment: "",
  priorAddress: "",
  accountsInName: [] as ("utilities" | "savings" | "checking" | "phone")[],
  employerName: "",
  employerAddress: "",
  employerCity: "",
  employerState: "",
  employerZip: "",
  businessPhone: "",
  employmentStatus: undefined as
    | "employed"
    | "self-employed"
    | "unemployed"
    | "retired"
    | "student"
    | undefined,
  occupation: "",
  timeOnJob: "",
  payFrequency: undefined as
    | "weekly"
    | "bi-weekly"
    | "semi-monthly"
    | "monthly"
    | undefined,
  paycheckAmount: "",
  monthlyIncome: "",
  otherIncome: "",
  additionalNotes: "",
});
