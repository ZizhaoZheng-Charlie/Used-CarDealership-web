import { useState, useEffect } from "react";
import { Users, Phone, Mail, Briefcase, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { getStaffMembers, type StaffMember } from "@/lib/api";

export function Staff() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);

  useEffect(() => {
    const fetchStaffMembers = async () => {
      const data = await getStaffMembers();
      setStaffMembers(data);
    };
    fetchStaffMembers();
  }, []);

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Meet Our Team
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Our experienced and dedicated team is here to help you find the
              perfect vehicle and make your car buying experience exceptional.
            </p>
          </div>
        </div>
      </section>

      {/* Staff Grid Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {staffMembers.map((member) => (
                <Card
                  key={member.id}
                  className="p-6 hover:shadow-lg transition-shadow duration-300 border-border flex flex-col"
                >
                  <CardContent className="p-0 flex flex-col">
                    <div className="mb-4">
                      <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 overflow-hidden">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Users className="h-20 w-20 text-primary/40" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {member.name}
                      </h3>
                      <div className="flex items-center gap-2 text-primary mb-3">
                        <Briefcase className="h-4 w-4" />
                        <span className="text-sm font-semibold">
                          {member.position}
                        </span>
                      </div>
                    </div>
                    {member.bio && (
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                        {member.bio}
                      </p>
                    )}
                    <div className="border-t border-border pt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <a
                          href={`mailto:${member.email}`}
                          className="hover:text-primary transition-colors break-all"
                        >
                          {member.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <a
                          href={`tel:${member.phone}`}
                          className="hover:text-primary transition-colors"
                        >
                          {member.phone}
                        </a>
                      </div>
                      {member.cellPhone && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Smartphone className="h-4 w-4" />
                          <span className="text-xs text-muted-foreground/70"></span>
                          <a
                            href={`tel:${member.cellPhone}`}
                            className="hover:text-primary transition-colors"
                          >
                            {member.cellPhone}
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
