import { Landmark, Building2 } from "lucide-react";

const governmentBanks = [
  "State Bank of India",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank",
  "Bank of India",
  "Indian Bank",
  "Central Bank",
];

const nbfcBanks = [
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Bajaj Finserv",
  "Tata Capital",
  "Aditya Birla Capital",
  "L&T Finance",
  "Mahindra Finance",
];

const BankPartnersSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Partners</span>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            Our Banking Partners
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We partner with India's leading banks and NBFCs to bring you the best loan options.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Government Banks */}
          <div className="rounded-2xl bg-card p-8 shadow-card">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-government-light">
                <Landmark className="h-6 w-6 text-government" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Government Banks</h3>
                <p className="text-sm text-muted-foreground">Public Sector Banks</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {governmentBanks.map((bank) => (
                <div
                  key={bank}
                  className="rounded-lg bg-government-light/50 px-4 py-3 text-sm font-medium text-foreground"
                >
                  {bank}
                </div>
              ))}
            </div>
          </div>

          {/* NBFC Banks */}
          <div className="rounded-2xl bg-card p-8 shadow-card">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-nbfc-light">
                <Building2 className="h-6 w-6 text-nbfc" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">NBFC Partners</h3>
                <p className="text-sm text-muted-foreground">Private Banks & NBFCs</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {nbfcBanks.map((bank) => (
                <div
                  key={bank}
                  className="rounded-lg bg-nbfc-light/50 px-4 py-3 text-sm font-medium text-foreground"
                >
                  {bank}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BankPartnersSection;
