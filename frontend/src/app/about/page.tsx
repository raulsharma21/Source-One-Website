import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, Target, HeartHandshake, Users, TrendingUp, ShieldCheck, CalendarDays, Award, Container, Network, Globe, MapPin, Leaf, Rocket, Factory, BarChart3, Milestone } from "lucide-react";
import Image from "next/image";

// Reusable photo that never warps or crops
function TeamPhoto({ src, alt, size = 112 }: { src: string; alt: string; size?: number }) {
  return (
    <div
      className="relative mx-auto mb-3 overflow-hidden rounded-xl bg-muted"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain object-center"
        sizes={`${size}px`}
        priority={false}
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: "About Source One | Our Story, Mission, Values, and Global Team",
  description: "Discover Source One's history, our mission for ethical global sourcing, core values, unique advantages, global team structure, and commitment to ethical business.",
};

const values = [
  { name: "Integrity", icon: HeartHandshake, description: "Operating with unwavering honesty and ethical principles in all our dealings." },
  { name: "Family-Focused Partnership", icon: Users, description: "Building lasting relationships based on trust, transparency, and mutual success." },
  { name: "Quality and Compliance", icon: ShieldCheck, description: "Constantly seeking better ways to serve our clients and optimize processes." },
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

// --- Sourcing countries (images expected in /public) ---
const sourcingCountries = [
  { name: "China",      img: "/china.jpg" },
  { name: "Taiwan",     img: "/taiwan.jpg" },
  { name: "India",      img: "/india.jpg" },
  { name: "Vietnam",    img: "/vietnam.jpg" },
  { name: "Cambodia",   img: "/cambodia.jpg" },
  { name: "Indonesia",  img: "/indonesia.jpg" },
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
              src="/contact2.jpg"
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
          <div className="flex flex-wrap justify-center gap-8">
  {values.map((value) => (
    <Card
      key={value.name}
      className="text-center shadow-md hover:shadow-lg transition-shadow duration-300 p-6 w-64"
    >
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

      {/* --- Sourcing Footprint Section (moved here) --- */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12 flex items-center justify-center">
          <Globe className="mr-3 h-8 w-8 text-[#5DA9E9]" /> Our Sourcing Footprint
        </h2>
        <p className="text-center text-foreground max-w-3xl mx-auto mb-10 text-xl md:text-2xl font-medium">
  We partner with vetted factories across Asia to match quality, lead time, and cost objectives, all while maintaining rigorous compliance standards.
</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sourcingCountries.map((c) => (
            <Card
              key={c.name}
              className="overflow-hidden group shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full h-56">
                <Image
                  src={c.img}
                  alt={`${c.name} sourcing`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-background/80 text-foreground text-sm font-medium shadow">
                    {c.name}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Global Team Section */}
      /* Global Team Section (No-Warp Images, improved spacing) */
<section className="py-12 bg-muted/50 rounded-lg px-6 md:px-12">
  <h2 className="text-3xl font-bold text-center text-foreground mb-12 flex items-center justify-center">
    <Globe className="mr-3 h-8 w-8 text-[#5DA9E9]" /> Our Global Team
  </h2>

  <div className="grid md:grid-cols-2 gap-12">
    {/* Duluth HQ */}
    <div>
      <h3 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
        <MapPin className="mr-2 h-7 w-7 text-[#5DA9E9]" /> Duluth HQ, USA
      </h3>

      <div className="space-y-6">
        {/* First row - 2 members */}
        <div className="grid grid-cols-2 gap-6">
          {teamMembers
            .filter((m) => m.city === "Duluth HQ")
            .slice(0, 2)
            .map((member) => (
              <Card key={member.name} className="text-center p-5 shadow-sm">
                <TeamPhoto src={member.image} alt={member.name} size={120} />
                <p className="font-semibold text-foreground text-base md:text-lg">
                  {member.name}
                </p>
                <p className="text-sm md:text-base text-muted-foreground">
                  {member.role}
                </p>
              </Card>
            ))}
        </div>

        {/* Second row - 1 member centered */}
        <div className="flex justify-center">
          {teamMembers
            .filter((m) => m.city === "Duluth HQ")
            .slice(2, 3)
            .map((member) => (
              <Card
                key={member.name}
                className="text-center p-5 shadow-sm w-[calc(50%-0.5rem)]"
              >
                <TeamPhoto src={member.image} alt={member.name} size={120} />
                <p className="font-semibold text-foreground text-base md:text-lg">
                  {member.name}
                </p>
                <p className="text-sm md:text-base text-muted-foreground">
                  {member.role}
                </p>
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

      <div className="grid grid-cols-2 gap-6">
        {teamMembers
          .filter((m) => m.city === "Ningbo HQ")
          .map((member) => (
            <Card key={member.name} className="text-center p-5 shadow-sm">
              <TeamPhoto src={member.image} alt={member.name} size={120} />
              <p className="font-semibold text-foreground text-base md:text-lg">
                {member.name}
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                {member.role}
              </p>
            </Card>
          ))}
      </div>
    </div>
  </div>
</section>


      

      {/* Timeline Strip Section */}
      <section className="py-12 bg-accent text-accent-foreground rounded-lg">
  <h2 className="text-3xl font-bold text-center mb-12">
    Our Journey
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
