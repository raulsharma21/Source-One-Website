
import type { Metadata } from 'next';
import { ContactForm } from "@/components/contact/ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact Source One | Get in Touch for Importing Solutions",
  description: "Reach out to Source One for inquiries about our importing services, request a quote, or discuss your global trade needs. Find our contact details and office location.",
};

export default function ContactPage() {
  return (
    <div className="space-y-16">
      <section className="text-center py-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
          Contact Us
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We're here to help. Reach out to us with any questions or to discuss your importing needs.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">Our Office</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 text-[#5DA9E9] mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Address:</h3>
                  <p className="text-muted-foreground">314 West Superior Street, Suite 502, Duluth, MN - 55802</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-6 w-6 text-[#5DA9E9] mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Phone:</h3>
                  <p className="text-muted-foreground">(218) 740-3072</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-6 w-6 text-[#5DA9E9] mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">Email:</h3>
                  <p className="text-muted-foreground">info@sourceoneus.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg overflow-hidden">
             <CardHeader>
              <CardTitle className="text-xl font-semibold">Find Us Here</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <Image
                src="https://placehold.co/600x400.png"
                alt="Map showing the location of Source One's Duluth office"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                data-ai-hint="city map"
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
