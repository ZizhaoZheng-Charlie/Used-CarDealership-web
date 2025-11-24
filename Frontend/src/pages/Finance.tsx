import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import {
  financeFormSchema,
  type FinanceFormValues,
  getDefaultCoBorrower,
  getDefaultFinanceFormValues,
} from "@/types/finance";
import { US_STATES } from "@/lib/constants";
import { submitFinanceApplication } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export function Finance() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<FinanceFormValues>({
    resolver: zodResolver(financeFormSchema),
    defaultValues: getDefaultFinanceFormValues(),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "coBorrowers",
  });

  const onSubmit = async (data: FinanceFormValues) => {
    setIsSubmitting(true);

    try {
      const result = await submitFinanceApplication(data);

      if (result.success) {
        toast({
          title: "Application Submitted",
          description:
            "Thank you! Your finance application has been submitted successfully. We'll contact you soon.",
          variant: "default",
        });
        form.reset();
      } else {
        toast({
          title: "Submission Failed",
          description:
            result.message ||
            "An error occurred while submitting your application. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description:
          "An error occurred while submitting your application. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <DollarSign className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Finance Application
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Get pre-approved for your next vehicle. Fill out the form below
              and we'll get back to you with the best financing options.
            </p>
          </div>
        </div>
      </section>

      {/* Finance Form Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 md:p-8 border-border">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Finance Application Form
              </h2>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <Accordion type="multiple" className="w-full space-y-4">
                    {/* Personal Information Section */}
                    <AccordionItem
                      value="personal-info"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-xl font-semibold text-foreground hover:no-underline">
                        <span>
                          Personal Information
                          <span className="text-destructive">*</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-6 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    First Name{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="John" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Last Name{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Email{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="email"
                                      placeholder="john.doe@example.com"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Phone{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="tel"
                                      placeholder="(210) 123-4567"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="dateOfBirth"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Date of Birth{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input type="date" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="fax"
                              render={({ field }) => {
                                // Split fax into three parts for display
                                const faxParts = field.value
                                  ? field.value.split("-")
                                  : ["", "", ""];
                                const [area, prefix, number] = faxParts;

                                const handleFaxChange = (
                                  part: "area" | "prefix" | "number",
                                  value: string
                                ) => {
                                  // Only allow digits
                                  const digitsOnly = value.replace(/\D/g, "");
                                  let newArea = area;
                                  let newPrefix = prefix;
                                  let newNumber = number;

                                  if (part === "area") {
                                    newArea = digitsOnly.slice(0, 3);
                                  } else if (part === "prefix") {
                                    newPrefix = digitsOnly.slice(0, 3);
                                  } else if (part === "number") {
                                    newNumber = digitsOnly.slice(0, 4);
                                  }

                                  // Combine into single string
                                  const combined = [
                                    newArea,
                                    newPrefix,
                                    newNumber,
                                  ]
                                    .filter((p) => p)
                                    .join("-");
                                  field.onChange(combined || "");
                                };

                                return (
                                  <FormItem>
                                    <FormLabel>Fax Number</FormLabel>
                                    <FormControl>
                                      <div className="flex items-center gap-2">
                                        <Input
                                          type="tel"
                                          placeholder="210"
                                          value={area}
                                          onChange={(e) =>
                                            handleFaxChange(
                                              "area",
                                              e.target.value
                                            )
                                          }
                                          maxLength={3}
                                          className="w-20"
                                        />
                                        <span className="text-muted-foreground">
                                          -
                                        </span>
                                        <Input
                                          type="tel"
                                          placeholder="123"
                                          value={prefix}
                                          onChange={(e) =>
                                            handleFaxChange(
                                              "prefix",
                                              e.target.value
                                            )
                                          }
                                          maxLength={3}
                                          className="w-20"
                                        />
                                        <span className="text-muted-foreground">
                                          -
                                        </span>
                                        <Input
                                          type="tel"
                                          placeholder="4567"
                                          value={number}
                                          onChange={(e) =>
                                            handleFaxChange(
                                              "number",
                                              e.target.value
                                            )
                                          }
                                          maxLength={4}
                                          className="w-24"
                                        />
                                      </div>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="ssn"
                            render={({ field }) => {
                              // Split SSN into three parts for display (XXX-XX-XXXX)
                              const ssnParts = field.value
                                ? field.value.split("-")
                                : ["", "", ""];
                              const [first, second, third] = ssnParts;

                              const handleSSNChange = (
                                part: "first" | "second" | "third",
                                value: string
                              ) => {
                                // Only allow digits
                                const digitsOnly = value.replace(/\D/g, "");
                                let newFirst = first;
                                let newSecond = second;
                                let newThird = third;

                                if (part === "first") {
                                  newFirst = digitsOnly.slice(0, 3);
                                } else if (part === "second") {
                                  newSecond = digitsOnly.slice(0, 2);
                                } else if (part === "third") {
                                  newThird = digitsOnly.slice(0, 4);
                                }

                                // Combine into single string
                                const combined = [newFirst, newSecond, newThird]
                                  .filter((p) => p)
                                  .join("-");
                                field.onChange(combined || "");
                              };

                              return (
                                <FormItem>
                                  <FormLabel>
                                    Social Security Number{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <div className="flex items-center gap-2">
                                      <Input
                                        type="tel"
                                        placeholder="XXX"
                                        value={first}
                                        onChange={(e) =>
                                          handleSSNChange(
                                            "first",
                                            e.target.value
                                          )
                                        }
                                        maxLength={3}
                                        className="w-20"
                                      />
                                      <span className="text-muted-foreground">
                                        -
                                      </span>
                                      <Input
                                        type="tel"
                                        placeholder="XX"
                                        value={second}
                                        onChange={(e) =>
                                          handleSSNChange(
                                            "second",
                                            e.target.value
                                          )
                                        }
                                        maxLength={2}
                                        className="w-16"
                                      />
                                      <span className="text-muted-foreground">
                                        -
                                      </span>
                                      <Input
                                        type="tel"
                                        placeholder="XXXX"
                                        value={third}
                                        onChange={(e) =>
                                          handleSSNChange(
                                            "third",
                                            e.target.value
                                          )
                                        }
                                        maxLength={4}
                                        className="w-24"
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />

                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Street Address{" "}
                                  <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="123 Main Street"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={form.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    City{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="San Antonio"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    State{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="TX" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="zipCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    ZIP Code{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="78251" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Driver's License Information */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={form.control}
                              name="driversLicenseNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Drivers Lic. #</FormLabel>
                                  <FormControl>
                                    <Input placeholder="D1234567" {...field} />
                                  </FormControl>
                                  <FormDescription className="text-xs text-muted-foreground invisible">
                                    &nbsp;
                                  </FormDescription>
                                  <div className="min-h-[1.25rem]">
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="driversLicenseState"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Drivers Lic. State</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="CA"
                                      maxLength={2}
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(
                                          e.target.value.toUpperCase()
                                        );
                                      }}
                                    />
                                  </FormControl>
                                  <FormDescription className="text-xs text-muted-foreground">
                                    (CA, NY, etc.)
                                  </FormDescription>
                                  <div className="min-h-[1.25rem]">
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="driversLicenseExpDate"
                              render={({ field }) => {
                                // Format date as MM/DD/YYYY
                                const formatDate = (value: string) => {
                                  const digitsOnly = value.replace(/\D/g, "");
                                  if (digitsOnly.length <= 2) {
                                    return digitsOnly;
                                  } else if (digitsOnly.length <= 4) {
                                    return `${digitsOnly.slice(
                                      0,
                                      2
                                    )}/${digitsOnly.slice(2)}`;
                                  } else {
                                    return `${digitsOnly.slice(
                                      0,
                                      2
                                    )}/${digitsOnly.slice(
                                      2,
                                      4
                                    )}/${digitsOnly.slice(4, 8)}`;
                                  }
                                };

                                const handleChange = (
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  const formatted = formatDate(e.target.value);
                                  field.onChange(formatted);
                                };

                                return (
                                  <FormItem>
                                    <FormLabel>Driver Lic. Exp. Date</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="MM/DD/YYYY"
                                        maxLength={10}
                                        {...field}
                                        onChange={handleChange}
                                      />
                                    </FormControl>
                                    <FormDescription className="text-xs text-muted-foreground">
                                      (MM/DD/YYYY)
                                    </FormDescription>
                                    <div className="min-h-[1.25rem]">
                                      <FormMessage />
                                    </div>
                                  </FormItem>
                                );
                              }}
                            />
                          </div>
                        </div>

                        {/* Residence Information Section */}
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-semibold text-foreground mb-4">
                              Residence Information
                            </h3>
                            <div className="w-16 h-1 bg-primary mb-4"></div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="residenceType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Residence Type{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select residence type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="own">Own</SelectItem>
                                      <SelectItem value="rent">Rent</SelectItem>
                                      <SelectItem value="other">
                                        Other
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="timeAtResidence"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Time at Residence (Years){" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="5"
                                      min="0"
                                      step="0.1"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="mortgageRentPayment"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Monthly Mortgage/Rent Payment{" "}
                                  <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="1500"
                                    min="0"
                                    step="0.01"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Your monthly mortgage or rent payment amount
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {form.watch("timeAtResidence") &&
                            Number(form.watch("timeAtResidence")) < 5 && (
                              <FormField
                                control={form.control}
                                name="priorAddress"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-base font-medium">
                                      If you have lived at your current
                                      residence less than 5 years, please enter
                                      your prior address:
                                    </FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Enter your prior address"
                                        rows={4}
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}

                          <FormField
                            control={form.control}
                            name="accountsInName"
                            render={() => (
                              <FormItem>
                                <div className="mb-4">
                                  <FormLabel className="text-base font-medium">
                                    Which accounts are in your name:
                                  </FormLabel>
                                </div>
                                <div className="space-y-3">
                                  {[
                                    { value: "utilities", label: "Utilities" },
                                    { value: "savings", label: "Savings" },
                                    { value: "checking", label: "Checking" },
                                    { value: "phone", label: "Phone" },
                                  ].map((account) => (
                                    <FormField
                                      key={account.value}
                                      control={form.control}
                                      name="accountsInName"
                                      render={({ field }) => {
                                        return (
                                          <FormItem
                                            key={account.value}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                          >
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.includes(
                                                  account.value as
                                                    | "utilities"
                                                    | "savings"
                                                    | "checking"
                                                    | "phone"
                                                )}
                                                onCheckedChange={(checked) => {
                                                  return checked
                                                    ? field.onChange([
                                                        ...(field.value || []),
                                                        account.value as
                                                          | "utilities"
                                                          | "savings"
                                                          | "checking"
                                                          | "phone",
                                                      ])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                          (
                                                            value:
                                                              | "utilities"
                                                              | "savings"
                                                              | "checking"
                                                              | "phone"
                                                          ) =>
                                                            value !==
                                                            account.value
                                                        ) || []
                                                      );
                                                }}
                                              />
                                            </FormControl>
                                            <FormLabel className="font-normal cursor-pointer">
                                              {account.label}
                                            </FormLabel>
                                          </FormItem>
                                        );
                                      }}
                                    />
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Co-Borrower Section */}
                    {fields.map((field, index) => (
                      <AccordionItem
                        key={field.id}
                        value={`co-borrower-${index}`}
                        className="border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-xl font-semibold text-foreground hover:no-underline">
                          <span>
                            Co-Borrower {index + 1} Information
                            <span className="text-destructive">*</span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-8 pt-4">
                            <div className="flex justify-end">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => remove(index)}
                                className="flex items-center gap-2"
                              >
                                <X className="h-4 w-4" />
                                Remove Co-Borrower
                              </Button>
                            </div>

                            <Accordion
                              type="multiple"
                              className="w-full space-y-4"
                            >
                              {/* Co-Borrower Personal Information */}
                              <AccordionItem
                                value="co-borrower-personal-info"
                                className="border rounded-lg px-4"
                              >
                                <AccordionTrigger className="text-xl font-semibold text-foreground hover:no-underline">
                                  <span>
                                    Personal Information{" "}
                                    <span className="text-destructive">*</span>
                                  </span>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-6 pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.firstName`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              First Name{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="Jane"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.lastName`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Last Name{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="Doe"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.email`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Email{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                type="email"
                                                placeholder="jane.doe@example.com"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.phone`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Phone{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                type="tel"
                                                placeholder="(210) 123-4567"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.dateOfBirth`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Date of Birth{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <FormControl>
                                              <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.fax`}
                                        render={({ field }) => {
                                          const faxParts = field.value
                                            ? field.value.split("-")
                                            : ["", "", ""];
                                          const [area, prefix, number] =
                                            faxParts;

                                          const handleFaxChange = (
                                            part: "area" | "prefix" | "number",
                                            value: string
                                          ) => {
                                            const digitsOnly = value.replace(
                                              /\D/g,
                                              ""
                                            );
                                            let newArea = area;
                                            let newPrefix = prefix;
                                            let newNumber = number;

                                            if (part === "area") {
                                              newArea = digitsOnly.slice(0, 3);
                                            } else if (part === "prefix") {
                                              newPrefix = digitsOnly.slice(
                                                0,
                                                3
                                              );
                                            } else if (part === "number") {
                                              newNumber = digitsOnly.slice(
                                                0,
                                                4
                                              );
                                            }

                                            const combined = [
                                              newArea,
                                              newPrefix,
                                              newNumber,
                                            ]
                                              .filter((p) => p)
                                              .join("-");
                                            field.onChange(combined || "");
                                          };

                                          return (
                                            <FormItem>
                                              <FormLabel>Fax</FormLabel>
                                              <FormControl>
                                                <div className="flex items-center gap-2">
                                                  <Input
                                                    type="tel"
                                                    placeholder="210"
                                                    value={area}
                                                    onChange={(e) =>
                                                      handleFaxChange(
                                                        "area",
                                                        e.target.value
                                                      )
                                                    }
                                                    maxLength={3}
                                                    className="w-20"
                                                  />
                                                  <span className="text-muted-foreground">
                                                    -
                                                  </span>
                                                  <Input
                                                    type="tel"
                                                    placeholder="123"
                                                    value={prefix}
                                                    onChange={(e) =>
                                                      handleFaxChange(
                                                        "prefix",
                                                        e.target.value
                                                      )
                                                    }
                                                    maxLength={3}
                                                    className="w-20"
                                                  />
                                                  <span className="text-muted-foreground">
                                                    -
                                                  </span>
                                                  <Input
                                                    type="tel"
                                                    placeholder="4567"
                                                    value={number}
                                                    onChange={(e) =>
                                                      handleFaxChange(
                                                        "number",
                                                        e.target.value
                                                      )
                                                    }
                                                    maxLength={4}
                                                    className="w-24"
                                                  />
                                                </div>
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          );
                                        }}
                                      />
                                    </div>

                                    <FormField
                                      control={form.control}
                                      name={`coBorrowers.${index}.ssn`}
                                      render={({ field }) => {
                                        const ssnParts = field.value
                                          ? field.value.split("-")
                                          : ["", "", ""];
                                        const [first, second, third] = ssnParts;

                                        const handleSSNChange = (
                                          part: "first" | "second" | "third",
                                          value: string
                                        ) => {
                                          const digitsOnly = value.replace(
                                            /\D/g,
                                            ""
                                          );
                                          let newFirst = first;
                                          let newSecond = second;
                                          let newThird = third;

                                          if (part === "first") {
                                            newFirst = digitsOnly.slice(0, 3);
                                          } else if (part === "second") {
                                            newSecond = digitsOnly.slice(0, 2);
                                          } else if (part === "third") {
                                            newThird = digitsOnly.slice(0, 4);
                                          }

                                          const combined = [
                                            newFirst,
                                            newSecond,
                                            newThird,
                                          ]
                                            .filter((p) => p)
                                            .join("-");
                                          field.onChange(combined || "");
                                        };

                                        return (
                                          <FormItem>
                                            <FormLabel>
                                              Social Security Number{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <FormControl>
                                              <div className="flex items-center gap-2">
                                                <Input
                                                  type="tel"
                                                  placeholder="XXX"
                                                  value={first}
                                                  onChange={(e) =>
                                                    handleSSNChange(
                                                      "first",
                                                      e.target.value
                                                    )
                                                  }
                                                  maxLength={3}
                                                  className="w-20"
                                                />
                                                <span className="text-muted-foreground">
                                                  -
                                                </span>
                                                <Input
                                                  type="tel"
                                                  placeholder="XX"
                                                  value={second}
                                                  onChange={(e) =>
                                                    handleSSNChange(
                                                      "second",
                                                      e.target.value
                                                    )
                                                  }
                                                  maxLength={2}
                                                  className="w-16"
                                                />
                                                <span className="text-muted-foreground">
                                                  -
                                                </span>
                                                <Input
                                                  type="tel"
                                                  placeholder="XXXX"
                                                  value={third}
                                                  onChange={(e) =>
                                                    handleSSNChange(
                                                      "third",
                                                      e.target.value
                                                    )
                                                  }
                                                  maxLength={4}
                                                  className="w-24"
                                                />
                                              </div>
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        );
                                      }}
                                    />

                                    <FormField
                                      control={form.control}
                                      name={`coBorrowers.${index}.address`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>
                                            Street Address{" "}
                                            <span className="text-destructive">
                                              *
                                            </span>
                                          </FormLabel>
                                          <FormControl>
                                            <Input
                                              placeholder="123 Main Street"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.city`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              City{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="San Antonio"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.state`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              State{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="TX"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.zipCode`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              ZIP Code{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="78251"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>

                                    {/* Driver's License Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.driversLicenseNumber`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Drivers Lic. #
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="D1234567"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormDescription className="text-xs text-muted-foreground invisible">
                                              &nbsp;
                                            </FormDescription>
                                            <div className="min-h-[1.25rem]">
                                              <FormMessage />
                                            </div>
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.driversLicenseState`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Drivers Lic. State
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="CA"
                                                maxLength={2}
                                                {...field}
                                                onChange={(e) => {
                                                  field.onChange(
                                                    e.target.value.toUpperCase()
                                                  );
                                                }}
                                              />
                                            </FormControl>
                                            <FormDescription className="text-xs text-muted-foreground">
                                              (CA, NY, etc.)
                                            </FormDescription>
                                            <div className="min-h-[1.25rem]">
                                              <FormMessage />
                                            </div>
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.driversLicenseExpDate`}
                                        render={({ field }) => {
                                          const formatDate = (
                                            value: string
                                          ) => {
                                            const digitsOnly = value.replace(
                                              /\D/g,
                                              ""
                                            );
                                            if (digitsOnly.length <= 2) {
                                              return digitsOnly;
                                            } else if (digitsOnly.length <= 4) {
                                              return `${digitsOnly.slice(
                                                0,
                                                2
                                              )}/${digitsOnly.slice(2)}`;
                                            } else {
                                              return `${digitsOnly.slice(
                                                0,
                                                2
                                              )}/${digitsOnly.slice(
                                                2,
                                                4
                                              )}/${digitsOnly.slice(4, 8)}`;
                                            }
                                          };

                                          const handleChange = (
                                            e: React.ChangeEvent<HTMLInputElement>
                                          ) => {
                                            const formatted = formatDate(
                                              e.target.value
                                            );
                                            field.onChange(formatted);
                                          };

                                          return (
                                            <FormItem>
                                              <FormLabel>
                                                Driver Lic. Exp. Date
                                              </FormLabel>
                                              <FormControl>
                                                <Input
                                                  placeholder="MM/DD/YYYY"
                                                  maxLength={10}
                                                  {...field}
                                                  onChange={handleChange}
                                                />
                                              </FormControl>
                                              <FormDescription className="text-xs text-muted-foreground">
                                                (MM/DD/YYYY)
                                              </FormDescription>
                                              <div className="min-h-[1.25rem]">
                                                <FormMessage />
                                              </div>
                                            </FormItem>
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>

                                  {/* Residence Information */}
                                  <div className="space-y-6 mt-6">
                                    <div>
                                      <h3 className="text-xl font-semibold text-foreground mb-4">
                                        Residence Information
                                      </h3>
                                      <div className="w-16 h-1 bg-primary mb-4"></div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.residenceType`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Residence Type{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <Select
                                              onValueChange={field.onChange}
                                              defaultValue={field.value}
                                            >
                                              <FormControl>
                                                <SelectTrigger>
                                                  <SelectValue placeholder="Select residence type" />
                                                </SelectTrigger>
                                              </FormControl>
                                              <SelectContent>
                                                <SelectItem value="own">
                                                  Own
                                                </SelectItem>
                                                <SelectItem value="rent">
                                                  Rent
                                                </SelectItem>
                                                <SelectItem value="other">
                                                  Other
                                                </SelectItem>
                                              </SelectContent>
                                            </Select>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.timeAtResidence`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Time at Residence (Years){" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                type="number"
                                                placeholder="5"
                                                min="0"
                                                step="0.1"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>

                                    <FormField
                                      control={form.control}
                                      name={`coBorrowers.${index}.mortgageRentPayment`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>
                                            Monthly Mortgage/Rent Payment{" "}
                                            <span className="text-destructive">
                                              *
                                            </span>
                                          </FormLabel>
                                          <FormControl>
                                            <Input
                                              type="number"
                                              placeholder="1500"
                                              min="0"
                                              step="0.01"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormDescription>
                                            Your monthly mortgage or rent
                                            payment amount
                                          </FormDescription>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />

                                    {form.watch(
                                      `coBorrowers.${index}.timeAtResidence`
                                    ) &&
                                      Number(
                                        form.watch(
                                          `coBorrowers.${index}.timeAtResidence`
                                        )
                                      ) < 5 && (
                                        <FormField
                                          control={form.control}
                                          name={`coBorrowers.${index}.priorAddress`}
                                          render={({ field }) => (
                                            <FormItem>
                                              <FormLabel className="text-base font-medium">
                                                If you have lived at your
                                                current residence less than 5
                                                years, please enter your prior
                                                address:
                                              </FormLabel>
                                              <FormControl>
                                                <Textarea
                                                  placeholder="Enter your prior address"
                                                  rows={4}
                                                  {...field}
                                                />
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      )}

                                    <FormField
                                      control={form.control}
                                      name={`coBorrowers.${index}.accountsInName`}
                                      render={() => (
                                        <FormItem>
                                          <div className="mb-4">
                                            <FormLabel className="text-base font-medium">
                                              Which accounts are in your name:
                                            </FormLabel>
                                          </div>
                                          <div className="space-y-3">
                                            {[
                                              {
                                                value: "utilities",
                                                label: "Utilities",
                                              },
                                              {
                                                value: "savings",
                                                label: "Savings",
                                              },
                                              {
                                                value: "checking",
                                                label: "Checking",
                                              },
                                              {
                                                value: "phone",
                                                label: "Phone",
                                              },
                                            ].map((account) => (
                                              <FormField
                                                key={account.value}
                                                control={form.control}
                                                name={`coBorrowers.${index}.accountsInName`}
                                                render={({ field }) => {
                                                  return (
                                                    <FormItem
                                                      key={account.value}
                                                      className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                      <FormControl>
                                                        <Checkbox
                                                          checked={field.value?.includes(
                                                            account.value as
                                                              | "utilities"
                                                              | "savings"
                                                              | "checking"
                                                              | "phone"
                                                          )}
                                                          onCheckedChange={(
                                                            checked
                                                          ) => {
                                                            return checked
                                                              ? field.onChange([
                                                                  ...(field.value ||
                                                                    []),
                                                                  account.value as
                                                                    | "utilities"
                                                                    | "savings"
                                                                    | "checking"
                                                                    | "phone",
                                                                ])
                                                              : field.onChange(
                                                                  field.value?.filter(
                                                                    (
                                                                      value:
                                                                        | "utilities"
                                                                        | "savings"
                                                                        | "checking"
                                                                        | "phone"
                                                                    ) =>
                                                                      value !==
                                                                      account.value
                                                                  ) || []
                                                                );
                                                          }}
                                                        />
                                                      </FormControl>
                                                      <FormLabel className="font-normal cursor-pointer">
                                                        {account.label}
                                                      </FormLabel>
                                                    </FormItem>
                                                  );
                                                }}
                                              />
                                            ))}
                                          </div>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              {/* Co-Borrower Employer Information */}
                              <AccordionItem
                                value="co-borrower-employment-info"
                                className="border rounded-lg px-4"
                              >
                                <AccordionTrigger className="text-xl font-semibold text-foreground hover:no-underline">
                                  <span>
                                    Employer Information{" "}
                                    <span className="text-destructive">*</span>
                                  </span>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-6 pt-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.employerName`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Employer Name{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="Company Name"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.businessPhone`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Business Phone{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                type="tel"
                                                placeholder="(210) 123-4567"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>

                                    <FormField
                                      control={form.control}
                                      name={`coBorrowers.${index}.employerAddress`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>
                                            Employer Address{" "}
                                            <span className="text-destructive">
                                              *
                                            </span>
                                          </FormLabel>
                                          <FormControl>
                                            <Input
                                              placeholder="123 Business St"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.employerCity`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Employer City{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="San Antonio"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.employerState`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Employer State{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <Select
                                              onValueChange={field.onChange}
                                              defaultValue={field.value}
                                            >
                                              <FormControl>
                                                <SelectTrigger>
                                                  <SelectValue placeholder="--Select State--" />
                                                </SelectTrigger>
                                              </FormControl>
                                              <SelectContent>
                                                {US_STATES.map((state) => (
                                                  <SelectItem
                                                    key={state.value}
                                                    value={state.value}
                                                  >
                                                    {state.label}
                                                  </SelectItem>
                                                ))}
                                              </SelectContent>
                                            </Select>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.employerZip`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Employer Zip{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="78251"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.employmentStatus`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Employment Status{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <Select
                                              onValueChange={field.onChange}
                                              defaultValue={field.value}
                                            >
                                              <FormControl>
                                                <SelectTrigger>
                                                  <SelectValue placeholder="--Select--" />
                                                </SelectTrigger>
                                              </FormControl>
                                              <SelectContent>
                                                <SelectItem value="employed">
                                                  Employed
                                                </SelectItem>
                                                <SelectItem value="self-employed">
                                                  Self-Employed
                                                </SelectItem>
                                                <SelectItem value="unemployed">
                                                  Unemployed
                                                </SelectItem>
                                                <SelectItem value="retired">
                                                  Retired
                                                </SelectItem>
                                                <SelectItem value="student">
                                                  Student
                                                </SelectItem>
                                              </SelectContent>
                                            </Select>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.occupation`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Occupation{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                placeholder="Software Engineer"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.timeOnJob`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Time On Job{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                type="number"
                                                placeholder="5"
                                                min="0"
                                                step="0.1"
                                                {...field}
                                              />
                                            </FormControl>
                                            <FormDescription className="text-sm text-muted-foreground">
                                              Years
                                            </FormDescription>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        control={form.control}
                                        name={`coBorrowers.${index}.payFrequency`}
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              How often are you paid{" "}
                                              <span className="text-destructive">
                                                *
                                              </span>
                                            </FormLabel>
                                            <Select
                                              onValueChange={field.onChange}
                                              defaultValue={field.value}
                                            >
                                              <FormControl>
                                                <SelectTrigger>
                                                  <SelectValue placeholder="--Select--" />
                                                </SelectTrigger>
                                              </FormControl>
                                              <SelectContent>
                                                <SelectItem value="weekly">
                                                  Weekly
                                                </SelectItem>
                                                <SelectItem value="bi-weekly">
                                                  Bi-Weekly
                                                </SelectItem>
                                                <SelectItem value="semi-monthly">
                                                  Semi-Monthly
                                                </SelectItem>
                                                <SelectItem value="monthly">
                                                  Monthly
                                                </SelectItem>
                                              </SelectContent>
                                            </Select>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </div>

                                    <FormField
                                      control={form.control}
                                      name={`coBorrowers.${index}.paycheckAmount`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>
                                            How much per paycheck{" "}
                                            <span className="text-destructive">
                                              *
                                            </span>
                                          </FormLabel>
                                          <FormControl>
                                            <Input
                                              type="number"
                                              placeholder="2500"
                                              min="0"
                                              step="0.01"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormDescription className="text-sm text-muted-foreground">
                                            (numbers only)
                                          </FormDescription>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              {/* Co-Borrower Financial Information */}
                              <AccordionItem
                                value="co-borrower-financial-info"
                                className="border rounded-lg px-4"
                              >
                                <AccordionTrigger className="text-xl font-semibold text-foreground hover:no-underline">
                                  <span>
                                    Financial Information{" "}
                                    <span className="text-destructive">*</span>
                                  </span>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-6 pt-4">
                                    <FormField
                                      control={form.control}
                                      name={`coBorrowers.${index}.monthlyIncome`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>
                                            Monthly Income{" "}
                                            <span className="text-destructive">
                                              *
                                            </span>
                                          </FormLabel>
                                          <FormControl>
                                            <Input
                                              type="number"
                                              placeholder="5000"
                                              min="0"
                                              step="0.01"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormDescription>
                                            Your gross monthly income before
                                            taxes
                                          </FormDescription>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />

                                    <FormField
                                      control={form.control}
                                      name={`coBorrowers.${index}.otherIncome`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>
                                            Other Income:{" "}
                                            <span className="text-destructive">
                                              *
                                            </span>
                                          </FormLabel>
                                          <FormControl>
                                            <Input
                                              type="number"
                                              placeholder="0"
                                              min="0"
                                              step="0.01"
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormDescription className="text-sm text-muted-foreground">
                                            per month
                                          </FormDescription>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />

                                    <p className="text-sm text-muted-foreground">
                                      *Alimony, child support, or separate
                                      maintenance income need not be revealed if
                                      you do not wish to have it considered as a
                                      basis for repaying this obligation.
                                    </p>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              {/* Co-Borrower Additional Information */}
                              <AccordionItem
                                value="co-borrower-additional-info"
                                className="border rounded-lg px-4"
                              >
                                <AccordionTrigger className="text-xl font-semibold text-foreground hover:no-underline">
                                  Additional Information
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="space-y-6 pt-4">
                                    <FormField
                                      control={form.control}
                                      name={`coBorrowers.${index}.additionalNotes`}
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>
                                            Additional Notes
                                          </FormLabel>
                                          <FormControl>
                                            <Textarea
                                              placeholder="Any additional information you'd like to provide..."
                                              rows={6}
                                              {...field}
                                            />
                                          </FormControl>
                                          <FormDescription>
                                            Optional: Add any additional
                                            information that might be relevant
                                            to your application
                                          </FormDescription>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}

                    <div className="flex justify-start">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => append(getDefaultCoBorrower() as any)}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add Co-Borrower
                      </Button>
                    </div>

                    {/* Employment Information Section */}
                    <AccordionItem
                      value="employment-info"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-xl font-semibold text-foreground hover:no-underline">
                        <span>
                          Employer Information
                          <span className="text-destructive">*</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-6 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="employerName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Employer Name{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Company Name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="businessPhone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Business Phone{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="tel"
                                      placeholder="(210) 123-4567"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="employerAddress"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Employer Address{" "}
                                  <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="123 Business St"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={form.control}
                              name="employerCity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Employer City{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="San Antonio"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="employerState"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Employer State{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="--Select State--" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {US_STATES.map((state) => (
                                        <SelectItem
                                          key={state.value}
                                          value={state.value}
                                        >
                                          {state.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="employerZip"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Employer Zip{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input placeholder="78251" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="employmentStatus"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Employment Status{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="--Select--" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="employed">
                                        Employed
                                      </SelectItem>
                                      <SelectItem value="self-employed">
                                        Self-Employed
                                      </SelectItem>
                                      <SelectItem value="unemployed">
                                        Unemployed
                                      </SelectItem>
                                      <SelectItem value="retired">
                                        Retired
                                      </SelectItem>
                                      <SelectItem value="student">
                                        Student
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="occupation"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Occupation{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Software Engineer"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="timeOnJob"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Time On Job{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="5"
                                      min="0"
                                      step="0.1"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription className="text-sm text-muted-foreground">
                                    Years
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="payFrequency"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    How often are you paid{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="--Select--" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="weekly">
                                        Weekly
                                      </SelectItem>
                                      <SelectItem value="bi-weekly">
                                        Bi-Weekly
                                      </SelectItem>
                                      <SelectItem value="semi-monthly">
                                        Semi-Monthly
                                      </SelectItem>
                                      <SelectItem value="monthly">
                                        Monthly
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="paycheckAmount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  How much per paycheck{" "}
                                  <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="2500"
                                    min="0"
                                    step="0.01"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription className="text-sm text-muted-foreground">
                                  (numbers only)
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Financial Information Section */}
                    <AccordionItem
                      value="financial-info"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-xl font-semibold text-foreground hover:no-underline">
                        <span>
                          Financial Information
                          <span className="text-destructive">*</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-6 pt-4">
                          <FormField
                            control={form.control}
                            name="monthlyIncome"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Monthly Income{" "}
                                  <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="5000"
                                    min="0"
                                    step="0.01"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Your gross monthly income before taxes
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="downPayment"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Down Payment</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="5000"
                                      min="0"
                                      step="0.01"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="loanAmount"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Loan Amount{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="25000"
                                      min="0"
                                      step="0.01"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="otherIncome"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Other Income:{" "}
                                  <span className="text-destructive">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    min="0"
                                    step="0.01"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription className="text-sm text-muted-foreground">
                                  per month
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <p className="text-sm text-muted-foreground">
                            *Alimony, child support, or separate maintenance
                            income need not be revealed if you do not wish to
                            have it considered as a basis for repaying this
                            obligation.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Vehicle Information Section */}
                    <AccordionItem
                      value="vehicle-info"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-xl font-semibold text-foreground hover:no-underline">
                        Vehicle Information (Optional)
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-6 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="vehicleYear"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Vehicle Year</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="2024"
                                      min="1900"
                                      max={new Date().getFullYear() + 1}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="vehicleMake"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Vehicle Make</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Toyota" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="vehicleModel"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Vehicle Model</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Camry" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="vehiclePrice"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Vehicle Price</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="30000"
                                      min="0"
                                      step="0.01"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Trade-In Details Section */}
                    <AccordionItem
                      value="trade-in-details"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-xl font-semibold text-foreground hover:no-underline">
                        Trade-In Details
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-6 pt-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="tradeInMake"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Trade-in Make</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Toyota" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="tradeInModel"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Trade-in Model</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Camry" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="tradeInYear"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Trade-in Year</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="2020"
                                      min="1900"
                                      max={new Date().getFullYear() + 1}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="tradeInMileage"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Trade-in Mileage</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="50000"
                                      min="0"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="tradeInComments"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Additional Comments</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Any additional information about your trade-in vehicle..."
                                    rows={4}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Additional Information Section */}
                    <AccordionItem
                      value="additional-info"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-xl font-semibold text-foreground hover:no-underline">
                        Additional Information
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-6 pt-4">
                          <FormField
                            control={form.control}
                            name="additionalNotes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Additional Notes</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Any additional information you'd like to share..."
                                    rows={4}
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  Optional: Share any additional information
                                  that might help with your application
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Terms and Conditions Section */}
                    <AccordionItem
                      value="terms-conditions"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-xl font-semibold text-foreground hover:no-underline">
                        <span>
                          Terms and Conditions
                          <span className="text-destructive">*</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-6 pt-4">
                          <FormField
                            control={form.control}
                            name="acceptTerms"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-base font-medium">
                                    I accept these terms.{" "}
                                    <span className="text-destructive">*</span>
                                  </FormLabel>
                                  <FormDescription className="text-sm text-muted-foreground">
                                    I agree that by submitting this application,
                                    I authorize and give this dealership, as
                                    well as any potential financing source this
                                    dealership presents this application to, my
                                    consent to obtain my credit report from any
                                    credit reporting agency used to complete an
                                    investigation of my credit.
                                  </FormDescription>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />

                          <div className="rounded-md border p-4 bg-muted/50">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              By submitting this application, I certify that all
                              information herein is true and complete. I agree I
                              am providing this information to the dealer
                              identified in this application and acknowledge
                              that my information may be shared pursuant to the
                              dealer's privacy policy, if applicable. I hereby
                              authorize this dealer, and any financial
                              institution engaged as a service provider by this
                              dealer, to retain this application and to check
                              and verify my credit, employment and salary
                              history. By submitting this application, I
                              authorize this dealer and/or financial
                              institutions, as they consider necessary and
                              appropriate, to obtain consumer credit reports on
                              me periodically and to gather employment history
                              in order to determine financing eligibility.
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full md:w-auto"
                  >
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        <DollarSign className="h-4 w-4 mr-2" />
                        Submit Finance Application
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
