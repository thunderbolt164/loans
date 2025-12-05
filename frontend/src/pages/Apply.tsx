import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Briefcase, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  FileText,
  CheckCircle,
  Home,
  Car,
  GraduationCap,
  Coins,
  Building2,
  Shield,
  Clock,
  Landmark
} from "lucide-react";
import { cn } from "@/lib/utils";

type EmploymentType = "salaried" | "business" | null;
type LoanType = "personal" | "home" | "business" | "car" | "education" | "gold" | null;

const loanTypes = [
  { id: "personal", name: "Personal Loan", icon: User, rate: "10.5%" },
  { id: "home", name: "Home Loan", icon: Home, rate: "8.5%" },
  { id: "business", name: "Business Loan", icon: Briefcase, rate: "11%" },
  { id: "car", name: "Car Loan", icon: Car, rate: "8.7%" },
  { id: "education", name: "Education Loan", icon: GraduationCap, rate: "9%" },
  { id: "gold", name: "Gold Loan", icon: Coins, rate: "7%" },
];

const salariedDocs = [
  "PAN Card",
  "Aadhaar Card",
  "Last 3 Month Salary Slips",
  "Last 6 Month Bank Statement",
  "Form 16 / ITR",
];

const businessDocs = [
  "PAN Card",
  "Aadhaar Card",
  "GST Registration",
  "Last 2 Years ITR",
  "Last 12 Month Bank Statement",
  "Business Proof (License/Registration)",
];

const Apply = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [employmentType, setEmploymentType] = useState<EmploymentType>(null);
  const [selectedLoanType, setSelectedLoanType] = useState<LoanType>(
    (searchParams.get("type")?.replace("-", "") as LoanType) || null
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    amount: "",
    tenure: "",
  });
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);

  const totalSteps = 4;

  const handleDocUpload = (docName: string) => {
    if (uploadedDocs.includes(docName)) {
      setUploadedDocs(uploadedDocs.filter((d) => d !== docName));
    } else {
      setUploadedDocs([...uploadedDocs, docName]);
    }
  };

  const requiredDocs = employmentType === "salaried" ? salariedDocs : businessDocs;
  const allDocsUploaded = requiredDocs.every((doc) => uploadedDocs.includes(doc));

  const canProceed = () => {
    switch (step) {
      case 1:
        return employmentType !== null;
      case 2:
        return allDocsUploaded;
      case 3:
        return selectedLoanType !== null && formData.amount && formData.tenure;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {["Employment", "Documents", "Loan Details", "Compare"].map((label, index) => (
                <div key={label} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all",
                        step > index + 1
                          ? "bg-accent text-accent-foreground"
                          : step === index + 1
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {step > index + 1 ? <CheckCircle className="h-5 w-5" /> : index + 1}
                    </div>
                    <span className="mt-2 text-xs font-medium text-muted-foreground hidden sm:block">
                      {label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div
                      className={cn(
                        "mx-2 h-1 w-12 sm:w-24 rounded-full transition-colors",
                        step > index + 1 ? "bg-accent" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Employment Type */}
            {step === 1 && (
              <div className="animate-fade-up">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-foreground">Tell Us About Your Employment</h1>
                  <p className="mt-2 text-muted-foreground">
                    This helps us customize document requirements and loan offers for you
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <button
                    onClick={() => setEmploymentType("salaried")}
                    className={cn(
                      "group rounded-2xl bg-card p-8 text-left shadow-card transition-all duration-300 hover:shadow-card-hover border-2",
                      employmentType === "salaried"
                        ? "border-primary bg-primary/5"
                        : "border-transparent hover:border-primary/20"
                    )}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-government-light mb-4">
                      <User className="h-8 w-8 text-government" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Salaried Employee</h3>
                    <p className="mt-2 text-muted-foreground">
                      Working professional with regular monthly income
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        Salary slips required
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        Form 16 / ITR for tax proof
                      </li>
                    </ul>
                  </button>

                  <button
                    onClick={() => setEmploymentType("business")}
                    className={cn(
                      "group rounded-2xl bg-card p-8 text-left shadow-card transition-all duration-300 hover:shadow-card-hover border-2",
                      employmentType === "business"
                        ? "border-primary bg-primary/5"
                        : "border-transparent hover:border-primary/20"
                    )}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-nbfc-light mb-4">
                      <Briefcase className="h-8 w-8 text-nbfc" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Self-Employed / Business</h3>
                    <p className="mt-2 text-muted-foreground">
                      Business owner or self-employed professional
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        GST registration required
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-accent" />
                        ITR for last 2 years
                      </li>
                    </ul>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Document Upload */}
            {step === 2 && (
              <div className="animate-fade-up">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-foreground">Upload Your Documents</h1>
                  <p className="mt-2 text-muted-foreground">
                    We verify documents securely through DigiLocker, ITR & GST APIs
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {requiredDocs.map((doc) => (
                    <button
                      key={doc}
                      onClick={() => handleDocUpload(doc)}
                      className={cn(
                        "flex items-center gap-4 rounded-xl bg-card p-4 text-left shadow-card transition-all hover:shadow-card-hover border-2",
                        uploadedDocs.includes(doc)
                          ? "border-accent bg-accent/5"
                          : "border-transparent hover:border-primary/20"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-lg",
                          uploadedDocs.includes(doc)
                            ? "bg-accent/10 text-accent"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {uploadedDocs.includes(doc) ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : (
                          <Upload className="h-6 w-6" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{doc}</p>
                        <p className="text-sm text-muted-foreground">
                          {uploadedDocs.includes(doc) ? "Uploaded" : "Click to upload"}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 rounded-xl bg-primary/5 p-4 flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Your data is secure</p>
                    <p className="text-sm text-muted-foreground">
                      All documents are encrypted and verified through government APIs. We never share your data without consent.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Loan Type & Details */}
            {step === 3 && (
              <div className="animate-fade-up">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-foreground">Select Loan Type & Amount</h1>
                  <p className="mt-2 text-muted-foreground">
                    Choose your loan type and enter the amount you need
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                  {loanTypes.map((loan) => (
                    <button
                      key={loan.id}
                      onClick={() => setSelectedLoanType(loan.id as LoanType)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl bg-card p-4 text-left shadow-card transition-all hover:shadow-card-hover border-2",
                        selectedLoanType === loan.id
                          ? "border-primary bg-primary/5"
                          : "border-transparent hover:border-primary/20"
                      )}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <loan.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{loan.name}</p>
                        <p className="text-sm text-accent">From {loan.rate}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="rounded-2xl bg-card p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Loan Details</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="amount">Loan Amount (₹)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tenure">Tenure (Months)</Label>
                      <Input
                        id="tenure"
                        type="number"
                        placeholder="Enter tenure"
                        value={formData.tenure}
                        onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Comparison Results */}
            {step === 4 && (
              <div className="animate-fade-up">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-foreground">Best Loan Offers for You</h1>
                  <p className="mt-2 text-muted-foreground">
                    Based on your profile, here are the best rates from our partners
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Best Offer Badge */}
                  <div className="rounded-2xl bg-card p-6 shadow-card border-2 border-accent relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
                      BEST OFFER
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-government-light">
                          <Landmark className="h-7 w-7 text-government" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">State Bank of India</p>
                          <p className="text-sm text-muted-foreground">Government Bank</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6 text-center md:text-right">
                        <div>
                          <p className="text-2xl font-bold text-accent">8.5%</p>
                          <p className="text-xs text-muted-foreground">Interest Rate</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">₹{formData.amount ? Math.round(Number(formData.amount) * 0.02).toLocaleString() : "0"}</p>
                          <p className="text-xs text-muted-foreground">Monthly EMI</p>
                        </div>
                        <div>
                          <Button variant="accent" size="sm">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Other Offers */}
                  {[
                    { name: "HDFC Bank", type: "NBFC", icon: Building2, rate: "9.2%", color: "nbfc" },
                    { name: "Punjab National Bank", type: "Government Bank", icon: Landmark, rate: "9.5%", color: "government" },
                    { name: "ICICI Bank", type: "NBFC", icon: Building2, rate: "9.8%", color: "nbfc" },
                  ].map((bank) => (
                    <div key={bank.name} className="rounded-2xl bg-card p-6 shadow-card">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-${bank.color}-light`}>
                            <bank.icon className={`h-7 w-7 text-${bank.color}`} />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{bank.name}</p>
                            <p className="text-sm text-muted-foreground">{bank.type}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-6 text-center md:text-right">
                          <div>
                            <p className="text-2xl font-bold text-foreground">{bank.rate}</p>
                            <p className="text-xs text-muted-foreground">Interest Rate</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-foreground">
                              ₹{formData.amount ? Math.round(Number(formData.amount) * (parseFloat(bank.rate) / 100 / 12 + 0.01)).toLocaleString() : "0"}
                            </p>
                            <p className="text-xs text-muted-foreground">Monthly EMI</p>
                          </div>
                          <div>
                            <Button variant="outline" size="sm">
                              Apply Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <Button variant="outline" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
              )}
              {step < totalSteps && (
                <Button
                  variant="hero"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="ml-auto"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Apply;
