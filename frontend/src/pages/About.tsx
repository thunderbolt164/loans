import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Target, 
  Eye, 
  Users, 
  Award,
  Shield,
  TrendingUp,
  ArrowRight
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="py-20 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                Making Loans <span className="text-gradient">Simple & Transparent</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                LoanCompare is India's leading loan comparison platform, helping over 1 lakh Indians 
                find the best loan rates from 50+ banks and NBFCs. We believe everyone deserves 
                access to fair, transparent, and competitive loan options.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-card p-8 shadow-card">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To democratize access to financial products by providing transparent comparison 
                  tools that help Indians make informed borrowing decisions. We aim to save 
                  our users time and money while ensuring they get the best loan terms possible.
                </p>
              </div>

              <div className="rounded-2xl bg-card p-8 shadow-card">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 mb-4">
                  <Eye className="h-7 w-7 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To become India's most trusted financial marketplace where every borrower 
                  can easily compare, choose, and apply for loans with complete confidence. 
                  We envision a future where financial decisions are simple and stress-free.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Our Values</h2>
              <p className="mt-2 text-muted-foreground">The principles that guide everything we do</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Shield,
                  title: "Trust & Security",
                  description: "Your data is protected with bank-grade encryption. We never share your information without consent.",
                },
                {
                  icon: TrendingUp,
                  title: "Transparency",
                  description: "No hidden fees, no surprises. We show you the complete picture including all charges and terms.",
                },
                {
                  icon: Users,
                  title: "Customer First",
                  description: "Every decision we make puts our users' interests first. Your financial wellbeing is our priority.",
                },
              ].map((value) => (
                <div key={value.title} className="rounded-2xl bg-card p-6 shadow-card text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 rounded-2xl bg-primary p-8 text-primary-foreground md:grid-cols-4">
              {[
                { value: "50+", label: "Bank Partners" },
                { value: "1L+", label: "Happy Customers" },
                { value: "₹500Cr+", label: "Loans Facilitated" },
                { value: "4.8★", label: "User Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold md:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-sm opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Find Your Perfect Loan?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of Indians who have found their best loan match through LoanCompare.
            </p>
            <Link to="/apply">
              <Button variant="hero" size="lg">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
