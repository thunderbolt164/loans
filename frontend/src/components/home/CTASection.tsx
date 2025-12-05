import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 md:p-12 lg:p-16">
          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div className="text-primary-foreground">
              <h2 className="text-3xl font-bold md:text-4xl">
                Ready to Find Your Perfect Loan?
              </h2>
              <p className="mt-4 text-lg opacity-90">
                Join 1 Lakh+ Indians who found their best loan match through LoanCompare. 
                Save time, money, and get approved faster.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Free loan comparison - No hidden charges",
                  "Instant eligibility check",
                  "100% digital process",
                  "Expert support available",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm opacity-90">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center gap-4 lg:items-end">
              <Link to="/apply">
                <Button 
                  size="xl" 
                  className="bg-white text-primary hover:bg-white/90 shadow-xl"
                >
                  Check Your Eligibility
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm text-primary-foreground/70">
                Takes only 2 minutes • No credit score impact
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
