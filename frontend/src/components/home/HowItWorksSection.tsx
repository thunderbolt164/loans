import { UserCheck, FileText, Search, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserCheck,
    title: "Tell Us About You",
    description: "Are you salaried or self-employed? We customize document requirements based on your profile.",
    color: "government",
  },
  {
    number: "02",
    icon: FileText,
    title: "Upload Documents",
    description: "Securely upload your documents. We verify them instantly through DigiLocker, ITR & GST APIs.",
    color: "accent",
  },
  {
    number: "03",
    icon: Search,
    title: "Compare Offers",
    description: "Get personalized loan offers from 50+ banks. Compare interest rates, EMI, and processing fees.",
    color: "nbfc",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Apply & Get Approved",
    description: "Select the best offer and apply directly. Your application is sent to the bank with all verified data.",
    color: "success",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-secondary/30" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Process</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Get your loan approved in 4 simple steps. Fast, secure, and completely online.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border lg:block" />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative flex flex-col items-center gap-6 lg:flex-row ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Card */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 1 ? "lg:text-right" : ""}`}>
                  <div className="rounded-2xl bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover">
                    <div className={`mb-4 inline-flex items-center gap-3 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                      <span className="text-4xl font-bold text-muted-foreground/20">{step.number}</span>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${step.color}/10`}>
                        <step.icon className={`h-6 w-6 text-${step.color}`} />
                      </div>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="relative z-10 hidden lg:flex lg:w-2/12 lg:justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    <step.icon className="h-6 w-6" />
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden lg:block lg:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
