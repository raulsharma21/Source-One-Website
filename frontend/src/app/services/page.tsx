
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { CheckCircle, Package, Settings, Wrench, ClipboardList, Factory, Handshake, ShieldCheck, Ship, Truck, Repeat, BarChart3, Target, UserCheck, DollarSign, Search, FileText, ArrowRight } from "lucide-react";
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Our Services | From Idea to Store Shelf | Source One",
  description: "Source One offers comprehensive supply chain solutions from sketch to store shelf, including retail-ready goods, OEM components, and container optimization.",
};

const readyForRetailBullets = [
  { icon: Settings, text: "Plastics" },
  { icon: Package, text: "Glass and Ceramics" },
  { icon: UserCheck, text: "Carbon Fiber" },
  { icon: FileText, text: "Aluminium" },
  { icon: Truck, text: "Steel" },
];

const oemComponentsBullets = [
  { icon: Wrench, text: "Engineering Liaison" },
  { icon: DollarSign, text: "Cost-Out Initiatives" },
  { icon: Settings, text: "Rapid Prototype-to-Production" },
  { icon: Target, text: "On-Site Quality Plans" },
];

const sixStepProcess = [
  { icon: ClipboardList, title: "Define Specs", description: "Clearly outline your product requirements and specifications." },
  { icon: Factory, title: "Match Factory", description: "We identify and vet the ideal manufacturing partner for your needs." },
  { icon: Handshake, title: "Negotiate & Sample", description: "Secure competitive pricing and approve pre-production samples." },
  { icon: ShieldCheck, title: "QA & Compliance", description: "Ensure your products meet all quality and regulatory standards." },
  { icon: Ship, title: "Ship & Clear Customs", description: "Manage global logistics and navigate customs procedures seamlessly." },
  { icon: Repeat, title: "Deliver & Repeat", description: "Receive your goods and establish a reliable ongoing supply chain." },
];

const successMetrics = [
    { value: "1.5 Million+", label: "Units Imported in 2024", icon: DollarSign },
    { value: "500+", label: "Audited Factories", icon: Truck },
    { value: "100%", label: "Containers QC-Passed", icon: CheckCircle },
];


export default function ServicesPage() {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Overview Banner Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground flex items-center justify-center tracking-tight min-h-[60px] sm:min-h-[72px]">
          <Truck className="mr-3 h-10 w-10 sm:h-12 sm:w-12 text-[#5DA9E9]" />
          Our Services
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          From Idea to Store Shelf
        </p>
      </section>

      {/* Ready for Retail Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
              <Package className="mr-3 h-8 w-8 text-[#5DA9E9]" /> An End To End Solution For Your Retail Ready Goods
            </h2>
            <p className="text-muted-foreground mb-6 text-lg">
              For private-label and direct-to-consumer (DTC) brands, getting your product shelf-ready is paramount. Source One manages the entire process, ensuring your goods arrive finished, packaged, and compliant, ready for your customers.
            </p>
            <ul className="space-y-3">
              {readyForRetailBullets.map((item) => (
                <li key={item.text} className="flex items-center text-muted-foreground text-lg">
                  <item.icon className="h-6 w-6 mr-3 text-[#5DA9E9] shrink-0" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
             <Image
              src="/SOimage3.jpeg"
              alt="Retail ready products on shelf"
              width={600}
              height={400}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              data-ai-hint="retail products shelf"
            />
          </div>
        </div>
      </section>


      {/* The 6-Step Process Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our 6-Step Process</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sixStepProcess.map((step, index) => (
              <Card key={step.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4 text-2xl font-bold">
                  {index + 1}
                </div>
                <step.icon className="h-12 w-12 text-[#5DA9E9] mx-auto mb-4" />
                <CardTitle className="text-xl font-semibold text-primary mb-2">{step.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{step.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* We'll Reach Out To You Section */}
      <section className="py-12 bg-accent text-accent-foreground rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <BarChart3 className="mr-3 h-8 w-8 text-[#5DA9E9]" /> We'll Reach Out To You.
          </h2>
          <p className="max-w-2xl mx-auto text-lg mb-8">
            Input your email below and we'll have our experts reach out to you with how we can help your business needs.
          </p>
          <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-grow bg-background text-foreground placeholder:text-muted-foreground text-base" 
            />
            <Button type="submit" variant="secondary" size="lg" className="transition-transform hover:scale-105 w-full sm:w-auto">
              Send Email
            </Button>
          </form>
           <p className="mt-4 text-xs">We'll contact you to discuss your needs. No obligation.</p>
        </div>
      </section>

      {/* Success Metrics Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Our Proven Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {successMetrics.map((metric) => (
              <Card key={metric.label} className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <metric.icon className="h-12 w-12 text-[#5DA9E9] mx-auto mb-4" />
                <p className="text-4xl font-bold text-primary mb-2">{metric.value}</p>
                <p className="text-muted-foreground text-lg">{metric.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 text-center bg-primary text-primary-foreground rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Imports?</h2>
        <p className="max-w-xl mx-auto text-lg mb-6">
          Discover how Source One's tailored services can transform your supply chain.
        </p>
        <Button asChild size="lg" variant="secondary" className="transition-transform hover:scale-105">
          <Link href="/contact">
            Request a Consultation
          </Link>
        </Button>
      </section>
    </div>
  );
}

    