import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Calculator, 
  Landmark, 
  Building2, 
  ArrowRight,
  Filter,
  SlidersHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

const bankData = [
  { id: 1, name: "State Bank of India", type: "government", rate: 8.5, maxAmount: 5000000, processingFee: 0.5 },
  { id: 2, name: "HDFC Bank", type: "nbfc", rate: 9.2, maxAmount: 4000000, processingFee: 1 },
  { id: 3, name: "Punjab National Bank", type: "government", rate: 8.8, maxAmount: 4500000, processingFee: 0.5 },
  { id: 4, name: "ICICI Bank", type: "nbfc", rate: 9.5, maxAmount: 5000000, processingFee: 1.5 },
  { id: 5, name: "Bank of Baroda", type: "government", rate: 8.6, maxAmount: 4000000, processingFee: 0.5 },
  { id: 6, name: "Bajaj Finserv", type: "nbfc", rate: 10.5, maxAmount: 3500000, processingFee: 2 },
  { id: 7, name: "Canara Bank", type: "government", rate: 9.0, maxAmount: 3500000, processingFee: 0.5 },
  { id: 8, name: "Axis Bank", type: "nbfc", rate: 9.8, maxAmount: 4500000, processingFee: 1.5 },
];

const Compare = () => {
  const [amount, setAmount] = useState(500000);
  const [tenure, setTenure] = useState(36);
  const [filter, setFilter] = useState<"all" | "government" | "nbfc">("all");

  const calculateEMI = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round(emi);
  };

  const filteredBanks = bankData
    .filter((bank) => filter === "all" || bank.type === filter)
    .sort((a, b) => a.rate - b.rate);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              Compare Loan Rates
            </h1>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
              Compare interest rates, EMI, and processing fees across 50+ banks and NBFCs
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Calculator Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl bg-card p-6 shadow-card">
                <div className="flex items-center gap-2 mb-6">
                  <Calculator className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">EMI Calculator</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Loan Amount</Label>
                      <span className="text-sm font-semibold text-primary">₹{amount.toLocaleString()}</span>
                    </div>
                    <Slider
                      value={[amount]}
                      onValueChange={(value) => setAmount(value[0])}
                      min={50000}
                      max={5000000}
                      step={50000}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>₹50K</span>
                      <span>₹50L</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <Label>Tenure</Label>
                      <span className="text-sm font-semibold text-primary">{tenure} months</span>
                    </div>
                    <Slider
                      value={[tenure]}
                      onValueChange={(value) => setTenure(value[0])}
                      min={12}
                      max={84}
                      step={6}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>12 mo</span>
                      <span>84 mo</span>
                    </div>
                  </div>

                  {/* Filter */}
                  <div>
                    <Label className="mb-2 block">Bank Type</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "all", label: "All" },
                        { value: "government", label: "Govt" },
                        { value: "nbfc", label: "NBFC" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setFilter(option.value as typeof filter)}
                          className={cn(
                            "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            filter === option.value
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Summary Card */}
                <div className="mt-6 rounded-xl bg-primary/5 p-4">
                  <p className="text-sm text-muted-foreground">Lowest EMI Available</p>
                  <p className="text-2xl font-bold text-primary">
                    ₹{calculateEMI(amount, filteredBanks[0]?.rate || 8.5, tenure).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    at {filteredBanks[0]?.rate}% p.a. from {filteredBanks[0]?.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredBanks.length} results
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <SlidersHorizontal className="h-4 w-4" />
                  Sorted by lowest rate
                </div>
              </div>

              {filteredBanks.map((bank, index) => {
                const emi = calculateEMI(amount, bank.rate, tenure);
                const totalInterest = (emi * tenure) - amount;
                const processingFeeAmount = Math.round(amount * bank.processingFee / 100);

                return (
                  <div
                    key={bank.id}
                    className={cn(
                      "rounded-2xl bg-card p-6 shadow-card transition-all hover:shadow-card-hover",
                      index === 0 && "border-2 border-accent"
                    )}
                  >
                    {index === 0 && (
                      <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                        Best Rate
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-xl",
                            bank.type === "government" ? "bg-government-light" : "bg-nbfc-light"
                          )}
                        >
                          {bank.type === "government" ? (
                            <Landmark className="h-7 w-7 text-government" />
                          ) : (
                            <Building2 className="h-7 w-7 text-nbfc" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{bank.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {bank.type === "government" ? "Government Bank" : "NBFC"}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        <div className="text-center md:text-right">
                          <p className={cn(
                            "text-xl font-bold",
                            index === 0 ? "text-accent" : "text-foreground"
                          )}>
                            {bank.rate}%
                          </p>
                          <p className="text-xs text-muted-foreground">Interest Rate</p>
                        </div>
                        <div className="text-center md:text-right">
                          <p className="text-xl font-bold text-foreground">
                            ₹{emi.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">Monthly EMI</p>
                        </div>
                        <div className="text-center md:text-right">
                          <p className="text-xl font-bold text-foreground">
                            ₹{totalInterest.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">Total Interest</p>
                        </div>
                        <div className="text-center md:text-right">
                          <Button
                            variant={index === 0 ? "accent" : "outline"}
                            size="sm"
                          >
                            Apply
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span>Processing Fee: ₹{processingFeeAmount.toLocaleString()} ({bank.processingFee}%)</span>
                      <span>Max Amount: ₹{(bank.maxAmount / 100000).toFixed(0)}L</span>
                      <span>Total Payable: ₹{(emi * tenure).toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Compare;
