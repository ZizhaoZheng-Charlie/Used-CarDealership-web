import { useState } from "react";
import { MapPin, Phone, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card } from "@/components/ui/Card";
import { sendContactEmail } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function ContactUs() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(formData);
      
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
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
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
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Have a question? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1 space-y-6">
                <div className="text-center lg:text-left space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                    Get in Touch
                  </h2>
                  <div className="w-24 h-1 bg-primary mx-auto lg:mx-0"></div>
                  <p className="text-muted-foreground">
                    Visit us at our location or give us a call. We're here to
                    help you find your perfect vehicle.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="p-6 border-border">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                          <MapPin className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground mb-2">
                          Address
                        </h3>
                        <a
                          href="https://www.google.com/maps/place/Auto+Solution/@29.481679,-98.6623269,859m/data=!3m1!1e3!4m15!1m8!3m7!1s0x865c5d3533f9073f:0xf74bac9dd32b99f7!2s8915+Grissom+Rd,+San+Antonio,+TX+78251!3b1!8m2!3d29.4815938!4d-98.6598007!16s%2Fg%2F11c2hvv3zn!3m5!1s0x865c5d352b0afa27:0x3479cf266dae3dbc!8m2!3d29.4814603!4d-98.6601056!16s%2Fg%2F1hc19w6n_?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          8915 Grissom Road
                          <br />
                          San Antonio, TX 78251
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-border">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                          <Phone className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground mb-2">
                          Phone
                        </h3>
                        <a
                          href="tel:+12108645348"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          (210) 864-5348
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 border-border">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                          <Clock className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground mb-3">
                          Business Hours
                        </h3>
                        <div className="w-24 h-0.5 bg-primary mb-4"></div>
                        <div className="space-y-0">
                          <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-muted-foreground font-medium">
                              Monday
                            </span>
                            <span className="text-foreground">
                              10:00 AM - 7:00 PM
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-muted-foreground font-medium">
                              Tuesday
                            </span>
                            <span className="text-foreground">
                              10:00 AM - 7:00 PM
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-muted-foreground font-medium">
                              Wednesday
                            </span>
                            <span className="text-foreground">
                              10:00 AM - 7:00 PM
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-muted-foreground font-medium">
                              Thursday
                            </span>
                            <span className="text-foreground">
                              10:00 AM - 7:00 PM
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-muted-foreground font-medium">
                              Friday
                            </span>
                            <span className="text-foreground">
                              10:00 AM - 7:00 PM
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-muted-foreground font-medium">
                              Saturday
                            </span>
                            <span className="text-foreground">
                              10:00 AM - 5:00 PM
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-muted-foreground font-medium">
                              Sunday
                            </span>
                            <span className="text-foreground">Closed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="p-6 md:p-8 border-border">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-foreground"
                        >
                          Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-foreground"
                        >
                          Email <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium text-foreground"
                        >
                          Phone
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(210) 123-4567"
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium text-foreground"
                        >
                          Subject <span className="text-destructive">*</span>
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What is this regarding?"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-foreground"
                      >
                        Message <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        className="w-full"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full md:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2">Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
