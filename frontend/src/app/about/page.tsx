
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, Target, HeartHandshake, Users, TrendingUp, ShieldCheck, CalendarDays, Award, Container, Network, Globe, MapPin, Leaf, Rocket, Factory, BarChart3, Milestone } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Source One | Our Story, Mission, Values, and Global Team",
  description: "Discover Source One's history, our mission for ethical global sourcing, core values, unique advantages, global team structure, and commitment to sustainability.",
};

const values = [
  { name: "Family-Focused Parnership", icon: HeartHandshake, description: "Operating with unwavering honesty and ethical principles in all our dealings." },
  { name: "Integrity and Transparency", icon: Users, description: "Building lasting relationships based on trust, transparency, and mutual success." },
  { name: "Proven Quality and Compliance", icon: ShieldCheck, description: "Constantly seeking better ways to serve our clients and optimize processes." },
  { name: "Relentless Cost Optimization", icon: TrendingUp, description: "Prioritizing the safety of people and the quality of products above all." },
];

const edgeItems = [
  { text: "20+ years in China", icon: CalendarDays },
  { text: "Never lost a client", icon: Award },
  { text: "Volume leverage on freight rates", icon: Container },
  { text: "Exclusive SME factory network", icon: Network },
];

const teamMembers = [
  { city: "Duluth HQ", name: "Alice Johnson", role: "CEO, 20 yrs leadership", avatar: "AJ", image: "https://placehold.co/80x80.png", hint: "professional woman" },
  { city: "Duluth HQ", name: "Bob Williams", role: "Operations Head, 18 yrs logistics", avatar: "BW", image: "https://placehold.co/80x80.png", hint: "professional man" },
  { city: "Ningbo HQ", name: "Chen Lin", role: "Quality Engineer, 15 yrs hard-goods QC", avatar: "CL", image: "https://placehold.co/80x80.png", hint: "asian engineer" },
  { city: "Ningbo HQ", name: "Zhang Wei", role: "Factory Liaison, 12 yrs sourcing", avatar: "ZW", image: "https://placehold.co/80x80.png", hint: "chinese professional" },
];

const timelineEvents = [
    { year: "2003", event: "Source One Launched", description: "Founded in Duluth with a vision to simplify global sourcing.", icon: Rocket },
    { year: "2010", event: "OEM Expansion & Ningbo Office", description: "Expanded services for OEM components and opened our China headquarters.", icon: Factory },
    { year: "2025", event: "Container Optimization Tool Release", description: "Launched our innovative tool to maximize shipping efficiency.", icon: BarChart3 },
];

export default function AboutPage() {
  return (
    <div className="space-y-16 md:space-y-24">
      <section className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          About <span className="text-primary">Source One</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Our Journey, Our Values, Our Commitment to You.
        </p>
      </section>

      {/* Our Story Section */}
      <section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/600x450.png"
              alt="Symbolic image of Source One's history or Duluth office"
              width={600}
              height={450}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              data-ai-hint="company history office"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
              <Building2 className="mr-3 h-8 w-8 text-[#5DA9E9]" /> Our Story
            </h2>
            <p className="text-muted-foreground mb-4 text-lg">
              Founded in Duluth, Minnesota, Source One began with a straightforward mission: to make global sourcing accessible and reliable for businesses of all sizes. Our early growth was fueled by a dedication to understanding client needs and navigating the complexities of international trade with transparency.
            </p>
            <p className="text-muted-foreground text-lg">
              A pivotal moment in our journey was the launch of our Ningbo office, establishing a crucial on-the-ground presence in China. This expansion enhanced our ability to vet factories, ensure quality, and build strong supplier relationships. Our guiding philosophy has always been one of partnership—working closely with clients as an extension of their team to achieve shared success.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-12 bg-muted/50 rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center justify-center">
            <Target className="mr-3 h-8 w-8 text-[#5DA9E9]" /> Our Mission
          </h2>
          <p className="text-2xl md:text-3xl font-medium text-primary mb-12 max-w-3xl mx-auto">
            “”
          </p>
          <h3 className="text-2xl font-semibold text-foreground mb-10">Our Core Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.name} className="text-center shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary mb-4">
                    <value.icon className="h-7 w-7 text-[#5DA9E9]" />
                 </div>
                <CardTitle className="text-xl font-semibold text-primary mb-2">{value.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{value.description}</CardDescription>
              </Card>
            ))}
          </div>
        </div>
      </section>
      

      {/* Global Team Section */}
      <section className="py-12 bg-muted/50 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12 flex items-center justify-center">
          <Globe className="mr-3 h-8 w-8 text-[#5DA9E9]" /> Our Global Team
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Duluth HQ */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
              <MapPin className="mr-2 h-7 w-7 text-[#5DA9E9]" /> Duluth HQ, USA
            </h3>
            <div className="rounded-lg overflow-hidden shadow-md mb-6">
              <Image src="https://placehold.co/500x300.png" alt="Map of Duluth HQ" width={500} height={300} className="w-full h-auto object-cover" data-ai-hint="city map usa" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {teamMembers.filter(m => m.city === "Duluth HQ").map(member => (
                <Card key={member.name} className="text-center p-4 shadow-sm">
                  <Avatar className="w-20 h-20 mx-auto mb-3 border-2 border-primary">
                    <AvatarImage src={member.image} alt={`${member.name}`} data-ai-hint={member.hint} />
                    <AvatarFallback className="text-xl bg-muted">{member.avatar}</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-foreground text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </Card>
              ))}
            </div>
          </div>
          {/* Ningbo HQ */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
              <MapPin className="mr-2 h-7 w-7 text-[#5DA9E9]" /> Ningbo HQ, China
            </h3>
             <div className="rounded-lg overflow-hidden shadow-md mb-6">
              <Image src="https://placehold.co/500x300.png" alt="Map of Ningbo HQ" width={500} height={300} className="w-full h-auto object-cover" data-ai-hint="city map china"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {teamMembers.filter(m => m.city === "Ningbo HQ").map(member => (
                <Card key={member.name} className="text-center p-4 shadow-sm">
                  <Avatar className="w-20 h-20 mx-auto mb-3 border-2 border-primary">
                    <AvatarImage src={member.image} alt={`${member.name}`} data-ai-hint={member.hint} />
                    <AvatarFallback className="text-xl bg-muted">{member.avatar}</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-foreground text-sm">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability & Ethics Section */}
      <section className="py-12">
         <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Symbolic image of sustainability or ethical practices"
              width={600}
              height={400}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              data-ai-hint="sustainability nature"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
              <Leaf className="mr-3 h-8 w-8 text-[#5DA9E9]" /> Sustainability & Ethics
            </h2>
            <p className="text-muted-foreground text-lg">
              At Source One, we are committed to responsible sourcing. This includes rigorous factory audits to ensure safe labor practices and fair treatment of workers. We also champion carbon-smart shipping consolidations, minimizing environmental impact wherever possible. Building trust with ESG-minded prospects and clients is integral to our operations, reflecting our dedication to a sustainable and ethical global supply chain.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Strip Section */}
      <section className="py-12 bg-accent text-accent-foreground rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center">
          <Milestone className="mr-3 h-8 w-8 text-[#5DA9E9]" /> Our Journey: Key Milestones
        </h2>
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {timelineEvents.map((event) => (
                    <Card key={event.year} className="text-center p-6 shadow-lg bg-background/10 hover:bg-background/20 transition-colors duration-300">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/80 text-primary-foreground mb-4">
                            <event.icon className="h-8 w-8 text-[#5DA9E9]" />
                        </div>
                        <CardTitle className="text-2xl font-semibold text-primary-foreground mb-2">{event.year}</CardTitle>
                        <CardDescription className="text-lg font-medium text-accent-foreground/90 mb-1">{event.event}</CardDescription>
                        <p className="text-sm text-accent-foreground/80">{event.description}</p>
                    </Card>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
