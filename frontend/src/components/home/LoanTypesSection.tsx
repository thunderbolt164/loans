import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Briefcase, Car, GraduationCap, User, Coins, ArrowRight } from "lucide-react";

const loanTypes = [
  {
    icon: User,
    name: "Personal Loan",
    rate: "10.5%",
    amount: "Up to ₹40 Lakhs",
    tenure: "1-5 Years",
    color: "primary",
  },
  {
    icon: Home,
    name: "Home Loan",
    rate: "8.5%",
    amount: "Up to ₹10 Crore",
    tenure: "Up to 30 Years",
    color: "government",
  },
  {
    icon: Briefcase,
    name: "Business Loan",
    rate: "11%",
    amount: "Up to ₹2 Crore",
    tenure: "1-7 Years",
    color: "nbfc",
  },
  {
    icon: Car,
    name: "Car Loan",
    rate: "8.7%",
    amount: "Up to ₹1 Crore",
    tenure: "1-7 Years",
    color: "accent",
  },
  {
    icon: GraduationCap,
    name: "Education Loan",
    rate: "9%",
    amount: "Up to ₹1.5 Crore",
    tenure: "Up to 15 Years",
    color: "warning",
  },
  {
    icon: Coins,
    name: "Gold Loan",
    rate: "7%",
    amount: "Based on Gold",
    tenure: "Up to 3 Years",
    color: "success",
  },
];

const LoanTypesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Loan Products</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            Choose Your Loan Type
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We offer comparison for all major loan types. Find the best rates for your specific needs.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loanTypes.map((loan) => (
            <Link
              key={loan.name}
              to={`/apply?type=${loan.name.toLowerCase().replace(" ", "-")}`}
              className="group rounded-2xl bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 border border-transparent hover:border-primary/20"
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-${loan.color}/10`}>
                  <loan.icon className={`h-7 w-7 text-${loan.color}`} />
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              
              <h3 className="mt-4 text-lg font-semibold text-foreground">{loan.name}</h3>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Interest Rate</span>
                  <span className="font-semibold text-accent">From {loan.rate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Loan Amount</span>
                  <span className="font-medium text-foreground">{loan.amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tenure</span>
                  <span className="font-medium text-foreground">{loan.tenure}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/compare">
            <Button variant="hero" size="lg">
              Compare All Loans
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoanTypesSection;
