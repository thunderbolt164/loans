import { 
  Search, 
  FileCheck, 
  Calculator, 
  Send, 
  ShieldCheck, 
  Clock,
  Percent,
  Users
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Comparison",
    description: "Compare loan offers from 50+ banks and NBFCs in one place with real-time rates.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileCheck,
    title: "Instant Verification",
    description: "Verify documents through DigiLocker, ITR, and GST APIs for faster processing.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Calculator,
    title: "EMI Calculator",
    description: "Calculate exact EMI amounts and compare total interest across different banks.",
    color: "bg-nbfc/10 text-nbfc",
  },
  {
    icon: Send,
    title: "Direct Application",
    description: "Apply directly to your chosen bank with pre-filled verified information.",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure",
    description: "Bank-grade encryption ensures your personal and financial data stays protected.",
    color: "bg-success/10 text-success",
  },
  {
    icon: Clock,
    title: "Quick Approval",
    description: "Get loan approval in as little as 24 hours with our streamlined process.",
    color: "bg-government/10 text-government",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Features</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            Why Choose LoanCompare?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We make finding the right loan simple, fast, and transparent. Here's what sets us apart.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group rounded-2xl bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid gap-8 rounded-2xl bg-primary p-8 text-primary-foreground md:grid-cols-4">
          {[
            { value: "50+", label: "Bank Partners" },
            { value: "1L+", label: "Happy Customers" },
            { value: "₹500Cr+", label: "Loans Disbursed" },
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
  );
};

export default FeaturesSection;
