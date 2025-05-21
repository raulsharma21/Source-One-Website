
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Globe, ShieldCheck, Lightbulb, MessageSquareQuote, Factory, Ship, Award, ListChecks, Eye, Phone, ClipboardList, PackageSearch, FileCheck2, Star, Settings, FileEdit, Handshake, Truck, Repeat, BarChart3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "Source One transformed our import process. Their expertise and transparent communication made global trade feel effortless. Highly recommended!",
    name: "John Doe",
    company: "Global Imports LLC",
    avatar: "JD",
    image: "https://placehold.co/80x80.png",
    hint: "man smiling",
  },
  {
    quote: "The team at Source One is incredibly knowledgeable and responsive. They helped us navigate complex customs regulations with ease.",
    name: "Jane Smith",
    company: "Tech Solutions Inc.",
    avatar: "JS",
    image: "https://placehold.co/80x80.png",
    hint: "woman professional",
  },
  {
    quote: "Partnering with Source One was a game-changer for our supply chain. Their innovative solutions saved us time and money.",
    name: "Carlos Ray",
    company: "Future Goods Co.",
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
];

const whySourceOneItems = [
  { icon: Award, text: "NEVER lost a customer" },
  { icon: Globe, text: "U.S. + China offices" },
  { icon: ListChecks, text: "Hundreds of vetted factories" },
  { icon: Eye, text: "End-to-end oversight" },
];

const ctaSteps = [
  { icon: Phone, title: "1. Initial Call", description: "Discuss your project needs with our experts." },
  { icon: ClipboardList, title: "2. Define Specs", description: "We'll help you detail product specifications." },
  { icon: PackageSearch, title: "3. Get Samples", description: "Review and approve samples before production." },
  { icon: FileCheck2, title: "4. First PO", description: "Place your first production order with confidence." },
];

export default function Home() {
  const fullWelcomeMessage = "Welcome to Source One.";
  const typingSpeed = 70;

  const [typedMessage, setTypedMessage] = useState("");

  useEffect(() => {
    if (typedMessage.length < fullWelcomeMessage.length) {
      const timer = setTimeout(() => {
        setTypedMessage(fullWelcomeMessage.substring(0, typedMessage.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [typedMessage, fullWelcomeMessage, typingSpeed]);

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
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground min-h-[60px] sm:min-h-[72px] md:min-h-[80px]">
          {displayWelcome}
          <span className="text-primary">{displaySourceOne}</span>
          <span className="text-foreground">{displayPeriod}</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
          Reliable, Low-Cost Global Sourcing, Just For You
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="transition-transform hover:scale-105" variant="secondary">
            <Link href="/contact">
              Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="default" size="lg" className="transition-transform hover:scale-105">
            <Link href="/services">
              Explore Our Services
            </Link>
          </Button>
        </div>
      </section>

      {/* Retailer Logos Section - Carousel */}
      <section className="py-8">
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
      <section className="py-12 md:py-16 bg-muted/50 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">What We Do For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section className="py-12 md:py-16 bg-accent text-accent-foreground rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Customer Snapshot</h2>
          <Star className="h-10 w-10 text-secondary mx-auto mb-4" />
          <blockquote className="max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl font-medium italic mb-6">
              “How a Midwest tool brand cut component costs 37% and hit shelves at Lowe’s in 6 months.”
            </p>
            <footer className="text-sm uppercase tracking-wider">
              - A Source One Success Story
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
      </section>

      {/* Step-by-Step CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">Your Journey to Savings & Scale</h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">Follow our simple 4-step process to unlock global sourcing efficiencies and get your product to market.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
            {ctaSteps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4 text-2xl font-bold">
                  {index + 1}
                </div>
                <step.icon className="h-10 w-10 text-[#5DA9E9] mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground flex-grow">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="secondary" className="transition-transform hover:scale-105">
              <Link href="/contact">
                Talk to an Expert <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

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
                  <div className="flex items-center mt-auto">
                    <Avatar className="h-12 w-12 mr-4 border-2 border-primary">
                      <AvatarImage src={testimonial.image} alt={`${testimonial.name}, client of Source One`} data-ai-hint={testimonial.hint}/>
                      <AvatarFallback className="bg-muted text-foreground">{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 md:py-20 text-center bg-accent text-accent-foreground rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Ready to Streamline Your Imports?</h2>
        <p className="max-w-xl mx-auto text-lg mb-8">
          Let Source One be your guide in the world of international trade. Contact us today for a consultation.
        </p>
        <Button asChild size="lg" variant="secondary" className="transition-transform hover:scale-105" >
          <Link href="/contact">
            Request a Quote
          </Link>
        </Button>
      </section>
    </div>
  );
}

    