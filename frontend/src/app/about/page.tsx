
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, Target, HeartHandshake, Users, TrendingUp, ShieldCheck, CalendarDays, Award, Container, Network, Globe, MapPin, Leaf, Rocket, Factory, BarChart3, Milestone } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Source One | Our Story, Mission, Values, and Global Team",
  description: "Discover Source One's history, our mission for ethical global sourcing, core values, unique advantages, global team structure, and commitment to ethical business.",
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
  { city: "Duluth HQ", name: "Greg Oas", role: "Founder, 30 years", avatar: "BW", image: "/headshots/Greg Oas.png", hint: "professional man" },
  { city: "Duluth HQ", name: "Greg Poul", role: "President, 25+ years working with Asia", avatar: "GP", image: "/headshots/GregPoul.png", hint: "professional woman" },
  { city: "Duluth HQ", name: "Erikka Bergstem", role: "Director of Operations, 20+ years", avatar: "BW", image: "/headshots/Erikka.jpeg", hint: "professional man" },
  { city: "Ningbo HQ", name: "Michael", role: "Director of Asian Ops, 28 years", avatar: "CL", image: "/headshots/Michael.png", hint: "asian engineer" },
  { city: "Ningbo HQ", name: "Ning", role: "China Sourcing Specialist, 28 years", avatar: "ZW", image: "/headshots/Ning.jpeg", hint: "chinese professional" },
];

const timelineEvents = [
    { year: "1995", event: "Source One Founded", description: "Founded in Duluth with a vision to simplify global sourcing.", icon: Rocket },
    { year: "1997", event: "Opened Asian Office in Ningbo China", description: "Expanded services for OEM components and opened our China headquarters.", icon: Factory },
    { year: "2025", event: "Celebrated 30 Years of Business", description: "30 years of helping customers lower their product procurement costs.", icon: BarChart3 },
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
              src="/SOimage2.jpeg"
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
              After selling his insurance business and teaching at a Beijing college for two years, Greg Oas and his former students had a dream to import and sell chunks of the Great Wall of China in the US. When that dream proved impossible, they decided selling rabbit fur hats, gloves, umbrellas, and tote bags to major US retailers would be much more achievable and Source One was born.
            </p>
            <p className="text-muted-foreground text-lg">
              Since that humble beginning over 30 years ago, Source One has built an Asian network of reliable factory partners by growing relationships with unparalleled business conduct and integrity. Today, Source One Enterprises has established itself as a major supplier of OEM products for the hardware, houseware, sporting goods, traffic control, and building materials industries. Most of our customers have been with us for decades; a testament to how committed we are to their success. We encourage you to join us.
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
            “At Source One, our mission is to simplify global sourcing by building lasting, genuine partnerships with factories and clients alike.”
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
            {/* <div className="rounded-lg overflow-hidden shadow-md mb-6">
              <Image src="https://placehold.co/500x300.png" alt="Map of Duluth HQ" width={500} height={300} className="w-full h-auto object-cover" data-ai-hint="city map usa" />
            </div> */}
            <div className="space-y-4">
              {/* First row - 2 members */}
              <div className="grid grid-cols-2 gap-4">
                {teamMembers.filter(m => m.city === "Duluth HQ").slice(0, 2).map(member => (
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
              {/* Second row - 1 member centered */}
              <div className="flex justify-center">
                {teamMembers.filter(m => m.city === "Duluth HQ").slice(2, 3).map(member => (
                  <Card key={member.name} className="text-center p-4 shadow-sm w-[calc(50%-0.5rem)]">
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
          {/* Ningbo HQ */}
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
              <MapPin className="mr-2 h-7 w-7 text-[#5DA9E9]" /> Ningbo HQ, China
            </h3>
            {/* <div className="rounded-lg overflow-hidden shadow-md mb-6">
              <Image src="https://placehold.co/500x300.png" alt="Map of Ningbo HQ" width={500} height={300} className="w-full h-auto object-cover" data-ai-hint="city map china"/>
            </div> */}
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

      {/* Ethics Section */}
      <section className="py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/SOimage4.jpeg"
              alt="Symbolic image of ethical practices"
              width={600}
              height={400}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              data-ai-hint="business ethics"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center">
              <ShieldCheck className="mr-3 h-8 w-8 text-[#5DA9E9]" /> Ethics
            </h2>
            <p className="text-muted-foreground text-lg">
              At Source One, we are committed to responsible sourcing. This includes rigorous factory audits to ensure safe labor practices and fair treatment of workers. We also champion carbon-smart shipping consolidations, minimizing environmental impact wherever possible. Building trust with ESG-minded prospects and clients is integral to our operations, reflecting our dedication to an ethical global supply chain.
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
