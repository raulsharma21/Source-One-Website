
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Globe, ShieldCheck, Lightbulb, MessageSquareQuote, Factory, Ship, Award, ListChecks, Eye, Phone, ClipboardList, PackageSearch, FileCheck2, Star, Settings, FileEdit, Handshake, Truck, Repeat, BarChart3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import WizardModal from '../components/WizardModal';
import { submitProjectBrief } from './services/projectBrief';

const testimonials = [
  {
    quote: "Greg, you have saved us millions of dollars, thank you!",
    name: "Tim C, VP of Sales",
    company: "OEM Sporting Goods Distributor",
    avatar: "CR",
    image: "https://placehold.co/80x80.png",
    hint: "person thinking",
  },
  {
    quote: "Over the past two decades Source One has become one of my most valuable suppliers. During that time, we’ve developed many new products from concept, to market, and they have produced with exceptional quality. They are always willing to accept a new design challenge and have always responded quickly with production samples, with competitive quotes, reasonable setup costs, and short turn-around times. I highly recommend considering Source One for your next new product, or if you are looking for another product source in the future!",
    name: "Jeff B, Purchasing Manager",
    company: "100+ Year Old Traffic Industry Company",
    avatar: "JS",
    image: "https://placehold.co/80x80.png",
    hint: "woman professional",
  },
  {
    quote: "Source One offers outstanding customer service and truly values partnership. Their attentive and helpful team consistently delivers excellent reporting and support, making them a trusted resource for both supply chain savings and product development needs.",
    name: "KC, President",
    company: "Sporting Goods Company",
    avatar: "CR",
    image: "https://placehold.co/80x80.png",
    hint: "person thinking",
  },
];

const retailerLogos = [
  { name: "Cabela's", src: "/Cabelas.png", hint: "Cabelas logo" },
  { name: "Home Depot", src: "/HomeDepot.png", hint: "Home Depot logo" },
  { name: "Target", src: "/Target.png", hint: "Target logo" },
  { name: "Walmart", src: "/Walmart.png", hint: "Walmart logo" },
  { name: "Lowe's", src: "/Lowes.png", hint: "Lowes logo" },
  { name: "Gander Mountain", src: "/gander.png", hint: "Gander Mountain logo" },
  { name: "Bass Pro Shops", src: "/Bass.png", hint: "Bass Pro Shops logo" },
  { name: "Amazon", src: "/amazon.png", hint: "Amazon logo" },
  { name: "Mills Fleet Farm", src: "/Mills.png", hint: "Mills Fleet Farm logo" },
  { name: "Menards", src: "/Menards.png", hint: "Menards logo" },
  { name: "Northern Tool and Equipment", src: "/northern.png", hint: "Northern Tool and Equipment logo" },
  { name: "Dick's Sporting Goods", src: "/dSporting.png", hint: "Dick's Sporting Goods logo" },
  { name: "Cabela's", src: "/Cabelas.png", hint: "Cabelas logo" },
  { name: "Home Depot", src: "/HomeDepot.png", hint: "Home Depot logo" },
  { name: "Target", src: "/Target.png", hint: "Target logo" },
  { name: "Walmart", src: "/Walmart.png", hint: "Walmart logo" },
  { name: "Lowe's", src: "/Lowes.png", hint: "Lowes logo" },
  { name: "Gander Mountain", src: "/gander.png", hint: "Gander Mountain logo" },
  { name: "Bass Pro Shops", src: "/Bass.png", hint: "Bass Pro Shops logo" },
  { name: "Amazon", src: "/amazon.png", hint: "Amazon logo" },
  { name: "Mills Fleet Farm", src: "/Mills.png", hint: "Mills Fleet Farm logo" },
  { name: "Menards", src: "/Menards.png", hint: "Menards logo" },
  { name: "Northern Tool and Equipment", src: "/northern.png", hint: "Northern Tool and Equipment logo" },
  { name: "Dick's Sporting Goods", src: "/dSporting.png", hint: "Dick's Sporting Goods logo" },
  { name: "Cabela's", src: "/Cabelas.png", hint: "Cabelas logo" },
  { name: "Home Depot", src: "/HomeDepot.png", hint: "Home Depot logo" },
  { name: "Target", src: "/Target.png", hint: "Target logo" },
  { name: "Walmart", src: "/Walmart.png", hint: "Walmart logo" },
  { name: "Lowe's", src: "/Lowes.png", hint: "Lowes logo" },
  { name: "Gander Mountain", src: "/gander.png", hint: "Gander Mountain logo" },
  { name: "Bass Pro Shops", src: "/Bass.png", hint: "Bass Pro Shops logo" },
  { name: "Amazon", src: "/amazon.png", hint: "Amazon logo" },
  { name: "Mills Fleet Farm", src: "/Mills.png", hint: "Mills Fleet Farm logo" },
  { name: "Menards", src: "/Menards.png", hint: "Menards logo" },
  { name: "Northern Tool and Equipment", src: "/northern.png", hint: "Northern Tool and Equipment logo" },
  { name: "Dick's Sporting Goods", src: "/dSporting.png", hint: "Dick's Sporting Goods logo" },
  { name: "Cabela's", src: "/Cabelas.png", hint: "Cabelas logo" },
  { name: "Home Depot", src: "/HomeDepot.png", hint: "Home Depot logo" },
  { name: "Target", src: "/Target.png", hint: "Target logo" },
  { name: "Walmart", src: "/Walmart.png", hint: "Walmart logo" },
  { name: "Lowe's", src: "/Lowes.png", hint: "Lowes logo" },
  { name: "Gander Mountain", src: "/gander.png", hint: "Gander Mountain logo" },
  { name: "Bass Pro Shops", src: "/Bass.png", hint: "Bass Pro Shops logo" },
  { name: "Amazon", src: "/amazon.png", hint: "Amazon logo" },
  { name: "Mills Fleet Farm", src: "/Mills.png", hint: "Mills Fleet Farm logo" },
  { name: "Menards", src: "/Menards.png", hint: "Menards logo" },
  { name: "Northern Tool and Equipment", src: "/northern.png", hint: "Northern Tool and Equipment logo" },
  { name: "Dick's Sporting Goods", src: "/dSporting.png", hint: "Dick's Sporting Goods logo" },
];

const whatWeDoItems = [
  {
    icon: Factory,
    title: "Factory Sourcing",
    description: "We find and vet the best factories for your products, ensuring quality and reliability.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Compliance",
    description: "Our teams ensure your products meet all quality standards and compliance requirements.",
  },
  {
    icon: Ship,
    title: "Freight & Customs",
    description: "Seamless logistics and customs clearance to get your goods where they need to be.",
  },
  {
    icon: Factory,
    title: "Payments",
    description: "We handle all transactions with manufacturers, customs, and shipping to make your import experience seamless.",
  },
];

const whySourceOneItems = [
  { icon: Globe, text: "U.S. & Asia offices" },
  { icon: ListChecks, text: "Vetted factories" },
  { icon: Eye, text: "End-to-end oversight" },
  { icon: Globe, text: "Lifelong customers" }
];

const ctaSteps = [
  { icon: Phone, title: "1. Initial Call", description: "Discuss your project needs with our experts." },
  { icon: ClipboardList, title: "2. Assess Synergies", description: "We're a boutique firm where fit and relationships matter." },
  { icon: PackageSearch, title: "3. Meet in Person", description: "Review drawings, samples, requirements." },
  { icon: FileCheck2, title: "4. Finalize Factory Details", description: "Choose from prequalified factory options." },
];

export default function Home() {
  const fullWelcomeMessage = "Welcome to Source One.";
  const typingSpeed = 70;

  const [typedMessage, setTypedMessage] = useState("");

  const [isWizardOpen, setIsWizardOpen] = useState(false);

  useEffect(() => {
    if (typedMessage.length < fullWelcomeMessage.length) {
      const timer = setTimeout(() => {
        setTypedMessage(fullWelcomeMessage.substring(0, typedMessage.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [typedMessage, fullWelcomeMessage, typingSpeed]);

  const handleWizardSubmit = async (answers: Record<string, any>, contactData: any) => {
  try {
    const result = await submitProjectBrief({ answers, contactData });
    if (result.success) {
      alert('Project brief submitted successfully!');
    }
  } catch (error) {
    console.error('Submission failed:', error);
    alert('Failed to submit project brief. Please try again.');
  }
};

  const welcomePart = "Welcome to ";
  const sourceOnePart = "Source One";
  const periodPart = ".";

  let displayWelcome = "";
  let displaySourceOne = "";
  let displayPeriod = "";

  if (typedMessage.length <= welcomePart.length) {
    displayWelcome = typedMessage;
  } else if (typedMessage.length <= welcomePart.length + sourceOnePart.length) {
    displayWelcome = welcomePart;
    displaySourceOne = typedMessage.substring(welcomePart.length);
  } else {
    displayWelcome = welcomePart;
    displaySourceOne = sourceOnePart;
    displayPeriod = typedMessage.substring(welcomePart.length + sourceOnePart.length);
  }

  return (
    <div className="space-y-16 md:space-y-24 overflow-x-hidden">
      {/* Hero Section */}
      {/* <section className="text-center py-12 md:py-16"> */}
    <section className="text-center py-8 md:py-4">

    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground min-h-[60px] sm:min-h-[72px] md:min-h-[80px]">
    {displayWelcome}
    <span className="text-primary">{displaySourceOne}</span>
    <span className="text-foreground">{displayPeriod}</span>
    </h1>
    <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
      Overseas, Sourcing, Hometown-Service.
    </p>
    <div className="relative w-screen max-w-none ml-[calc(50%-50vw)] mt-4 mb-6 h-[320px] sm:h-[400px] md:h-[480px] overflow-hidden">
      <Image
        src="/boxes.jpg"
        alt="Container port and shipping"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
    </div>
    <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
      <Button size="lg" className="transition-transform hover:scale-105" variant="secondary" onClick={() => setIsWizardOpen(true)}>
          Get a Personalized Solution <ArrowRight className="ml-2 h-5 w-5" />
      </Button>

      <Button asChild variant="default" size="lg" className="transition-transform hover:scale-105">
        <Link href="/about">
          Learn About Us
        </Link>
      </Button>

      <WizardModal 
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSubmit={handleWizardSubmit}
      />
    </div>
  </section>

      {/* Services Section */}
      {/* Retailer Logos Section - Carousel */}
      <section className="pt-4 pb-8 !mt-6">
        <h2 className="text-sm font-semibold text-center text-muted-foreground mb-6 uppercase tracking-wider">
          Trusted by brands whose products are sold at
        </h2>
        <div className="w-full overflow-hidden">
          <div className="flex animate-scroll-logos">
            {[...retailerLogos, ...retailerLogos, ...retailerLogos, ...retailerLogos].map((logo, index) => ( 
              <div key={`${logo.name}-${index}`} className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8 hover:opacity-75 transition-opacity">
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={150}
                  height={60}
                  className="h-10 md:h-12 w-auto object-contain"
                  data-ai-hint={logo.hint}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do For You Section */}
      <section className="py-12 md:py-16 rounded-lg bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/4boxes.jpg)'}}>
        <div className="container mx-auto px-4">
          {/* <h2 className="text-3xl font-bold text-center text-white mb-12">What We Do For You</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
            {whatWeDoItems.map((item) => (
              <Card key={item.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                    <item.icon className="h-6 w-6 text-[#5DA9E9]" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Source One Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Source One?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whySourceOneItems.map((item) => (
              <Card key={item.text} className="p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                    <item.icon className="h-8 w-8 text-[#5DA9E9]" />
                 </div>
                <p className="text-lg font-medium text-foreground">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Snapshot Section */}
      {/* <section className="py-12 md:py-16 bg-accent text-accent-foreground rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Customer Testimonial</h2>
          <blockquote className="max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl font-medium italic mb-6">
              “Greg, you have saved us millions of dollars, thank you!”
            </p>
            <footer className="text-sm uppercase tracking-wider">
              <p> Tim C. VP of Sales </p> 
              <p> OEM Sporting Goods Distributor </p>
            </footer>
          </blockquote>
           <div className="mt-8">
            <Image
              src="https://placehold.co/600x300.png"
              alt="Midwest tool brand products or Lowe's storefront"
              width={600}
              height={300}
              className="w-full max-w-xl mx-auto h-auto object-cover rounded-lg shadow-xl transition-transform duration-500 hover:scale-105"
              data-ai-hint="tools hardware store"
            />
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-muted/30 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12 flex items-center justify-center">
            <MessageSquareQuote className="mr-3 h-8 w-8 text-[#5DA9E9]" /> What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
                <CardContent className="p-6 flex-grow flex flex-col">
                  <MessageSquareQuote className="h-8 w-8 text-[#5DA9E9] mb-4" />
                  <p className="text-muted-foreground mb-6 flex-grow">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="mt-auto">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 md:py-20 text-center bg-accent text-accent-foreground rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Ready to Simplify Your Imports & Cut Landed Costs?</h2>
        <p className="max-w-xl mx-auto text-lg mb-8">
        Our U.S. and Asia teams are ready to support your next project.
        </p>
        <Button asChild size="lg" variant="secondary" className="transition-transform hover:scale-105" >
          <Link href="/contact">
            Reach Out To Us <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </div>
  );
}

    