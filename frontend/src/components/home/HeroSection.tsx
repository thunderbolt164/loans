import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, TrendingDown, Building2, Landmark } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              Trusted by 1 Lakh+ Indians
            </div>
            
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Compare Loans from{" "}
              <span className="text-gradient">50+ Banks</span>{" "}
              in Minutes
            </h1>
            
            <p className="mb-8 text-lg text-muted-foreground md:text-xl max-w-xl mx-auto lg:mx-0">
              Find the best loan rates from Government Banks and NBFCs. Save up to ₹2 Lakhs on interest with smart comparison.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link to="/apply">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Get Best Loan Offers
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/compare">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Compare Rates
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              {[
                { icon: TrendingDown, text: "Lowest Rates" },
                { icon: Clock, text: "Quick Approval" },
                { icon: Shield, text: "100% Secure" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4 text-accent" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 space-y-4">
              {/* Government Banks Card */}
              <div className="ml-auto w-72 rounded-2xl bg-card p-6 shadow-card animate-float" style={{ animationDelay: "0s" }}>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-government-light">
                    <Landmark className="h-6 w-6 text-government" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Government Banks</p>
                    <p className="text-xl font-bold text-foreground">20+ Partners</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  SBI, PNB, BOB, Canara & more
                </div>
              </div>

              {/* NBFC Card */}
              <div className="w-72 rounded-2xl bg-card p-6 shadow-card animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-nbfc-light">
                    <Building2 className="h-6 w-6 text-nbfc" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">NBFC Partners</p>
                    <p className="text-xl font-bold text-foreground">30+ Partners</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Bajaj, HDFC, ICICI & more
                </div>
              </div>

              {/* Rate Card */}
              <div className="ml-auto w-72 rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-6 text-primary-foreground shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                <p className="text-sm opacity-90">Interest Rates Starting</p>
                <p className="text-3xl font-bold">8.5% p.a.</p>
                <p className="mt-2 text-sm opacity-80">
                  Compare and save lakhs on EMI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
