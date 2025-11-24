import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Label } from "@/components/ui/Label";
import { sendContactEmail } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface EmailModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleName: string;
  clickedButtonRect?: DOMRect | null;
  onAnimationEnd?: () => void;
  initialHasTradeIn?: boolean;
}

export function EmailModal({
  isOpen,
  onOpenChange,
  vehicleName,
  clickedButtonRect,
  onAnimationEnd,
  initialHasTradeIn = false,
}: EmailModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    hasTradeIn: false,
    tradeInYear: "",
    tradeInMake: "",
    tradeInModel: "",
    tradeInMileage: "",
    tradeInColor: "",
    tradeInVin: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const maxMessageLength = 1000;
  const messageLength = formData.message.length;

  // Initialize message with vehicle name and trade-in state
  useEffect(() => {
    if (isOpen) {
      const defaultMessage = initialHasTradeIn
        ? "I would like to get a valuation for my trade-in vehicle."
        : vehicleName
        ? `Could you provide more information about this ${vehicleName}?`
        : "";

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: defaultMessage,
        hasTradeIn: initialHasTradeIn,
        tradeInYear: "",
        tradeInMake: "",
        tradeInModel: "",
        tradeInMileage: "",
        tradeInColor: "",
        tradeInVin: "",
      });
    }
  }, [vehicleName, initialHasTradeIn, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      hasTradeIn: checked,
      // Clear trade-in fields when unchecked
      ...(checked
        ? {}
        : {
            tradeInYear: "",
            tradeInMake: "",
            tradeInModel: "",
            tradeInMileage: "",
            tradeInColor: "",
            tradeInVin: "",
          }),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Build the full message with trade-in information if applicable
      let fullMessage = formData.message;
      
      if (formData.hasTradeIn) {
        const tradeInInfo = [
          "\n\n--- Trade-in Information ---",
          `Year: ${formData.tradeInYear}`,
          `Make: ${formData.tradeInMake}`,
          `Model: ${formData.tradeInModel}`,
          formData.tradeInMileage ? `Mileage: ${formData.tradeInMileage}` : "",
          `Color: ${formData.tradeInColor}`,
          formData.tradeInVin ? `VIN: ${formData.tradeInVin}` : "",
        ]
          .filter(Boolean)
          .join("\n");
        fullMessage = `${fullMessage}\n${tradeInInfo}`;
      }

      // Create subject based on context
      const subject = formData.hasTradeIn
        ? "Trade-in Vehicle Valuation Request"
        : vehicleName
        ? `Inquiry about ${vehicleName}`
        : "Vehicle Inquiry";

      // Combine first and last name
      const name = `${formData.firstName} ${formData.lastName}`.trim();

      const result = await sendContactEmail({
        name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject,
        message: fullMessage,
      });

      // Check status code first - 400+ are errors, even if success is true
      const isError = result.statusCode 
        ? result.statusCode >= 400 
        : !result.success;

      if (!isError && result.success) {
        toast({
          title: "Message Sent Successfully",
          description: "Thank you! Your message has been sent successfully. We'll respond as soon as possible.",
          variant: "default",
        });
        
        // Close modal and reset form on success
        onOpenChange(false);
        const defaultMessage = initialHasTradeIn
          ? "I would like to get a valuation for my trade-in vehicle."
          : vehicleName
          ? `Could you provide more information about this ${vehicleName}?`
          : "";

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: defaultMessage,
          hasTradeIn: false,
          tradeInYear: "",
          tradeInMake: "",
          tradeInModel: "",
          tradeInMileage: "",
          tradeInColor: "",
          tradeInVin: "",
        });
      } else {
        // Handle error cases (400, 500, etc.)
        const errorMessage = result.message || 
          (result.errors && result.errors.length > 0 
            ? result.errors.map((err: any) => err.message).join(", ")
            : "Failed to send message. Please try again.");
        
        toast({
          title: "Failed to Send Message",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={`${
          formData.hasTradeIn ? "max-w-6xl" : "max-w-2xl"
        } w-[95vw] max-h-[90vh] overflow-hidden [&]:!animate-none p-0 ${
          clickedButtonRect
            ? "animate-image-pop-out-from-position"
            : "animate-image-pop-out"
        }`}
        style={
          clickedButtonRect
            ? ({
                "--origin-x": `${
                  clickedButtonRect.left + clickedButtonRect.width / 2
                }px`,
                "--origin-y": `${
                  clickedButtonRect.top + clickedButtonRect.height / 2
                }px`,
              } as React.CSSProperties)
            : undefined
        }
        onAnimationEnd={onAnimationEnd}
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Left Panel - Contact Information */}
            <div
              className={`flex-1 p-6 overflow-y-auto ${
                formData.hasTradeIn ? "border-r border-border" : ""
              }`}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div className="space-y-2">
                    <Label htmlFor="modal-firstName">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="modal-firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <Label htmlFor="modal-lastName">
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="modal-lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="modal-email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="modal-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="modal-phone">Phone</Label>
                  <Input
                    id="modal-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="modal-message">Message</Label>
                  <Textarea
                    id="modal-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    maxLength={maxMessageLength}
                    rows={5}
                    className="w-full resize-none"
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {messageLength}/{maxMessageLength}
                  </div>
                </div>

                {/* Trade-in Checkbox */}
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="modal-hasTradeIn"
                    checked={formData.hasTradeIn}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label
                    htmlFor="modal-hasTradeIn"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Do you have a trade-in?
                  </Label>
                </div>
              </div>
            </div>

            {/* Right Panel - Trade-in Information */}
            {formData.hasTradeIn && (
              <div className="flex-1 p-6 overflow-y-auto bg-muted/30">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Trade-in Information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Year */}
                    <div className="space-y-2">
                      <Label htmlFor="modal-tradeInYear">
                        Year <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="modal-tradeInYear"
                        name="tradeInYear"
                        value={formData.tradeInYear}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="e.g., 2020"
                      />
                    </div>

                    {/* Make */}
                    <div className="space-y-2">
                      <Label htmlFor="modal-tradeInMake">
                        Make <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="modal-tradeInMake"
                        name="tradeInMake"
                        value={formData.tradeInMake}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="e.g., Toyota"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Model */}
                    <div className="space-y-2">
                      <Label htmlFor="modal-tradeInModel">
                        Model <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="modal-tradeInModel"
                        name="tradeInModel"
                        value={formData.tradeInModel}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="e.g., Camry"
                      />
                    </div>

                    {/* Mileage */}
                    <div className="space-y-2">
                      <Label htmlFor="modal-tradeInMileage">Mileage</Label>
                      <Input
                        id="modal-tradeInMileage"
                        name="tradeInMileage"
                        type="number"
                        value={formData.tradeInMileage}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="e.g., 50000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Color */}
                    <div className="space-y-2">
                      <Label htmlFor="modal-tradeInColor">
                        Color <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="modal-tradeInColor"
                        name="tradeInColor"
                        value={formData.tradeInColor}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                        placeholder="e.g., Red"
                      />
                    </div>

                    {/* VIN */}
                    <div className="space-y-2">
                      <Label htmlFor="modal-tradeInVin">VIN (Optional)</Label>
                      <Input
                        id="modal-tradeInVin"
                        name="tradeInVin"
                        value={formData.tradeInVin}
                        onChange={handleInputChange}
                        className="w-full"
                        placeholder="e.g., 1HGBH41JXMN109186"
                        maxLength={17}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer with Submit Button and Legal Text */}
          <div className="p-6 border-t border-border bg-background">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold"
            >
              {isSubmitting ? "Sending..." : "Send Email"}
            </Button>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              By clicking "Send Email", I consent to be contacted by
              Carsforsale.com and the dealer selling this vehicle at any
              telephone number I provide, including, without limitation,
              communications sent via text message to my cell phone or
              communications sent using an autodialer or prerecorded message.
              This acknowledgment constitutes my written consent to receive such
              communications. This site is protected by reCAPTCHA and the{" "}
              <a
                href="/privacy-policy"
                className="text-primary underline hover:text-primary/80"
              >
                Google Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="/terms-of-service"
                className="text-primary underline hover:text-primary/80"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
