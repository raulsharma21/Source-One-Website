
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-border/40 bg-background text-muted-foreground">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Source One</h3>
            <p className="text-sm">
              Your trusted partner for seamless global importing. We simplify complexities, ensuring your goods arrive efficiently and reliably.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 shrink-0 text-[#5DA9E9]" />
                <span>123 Import Drive, Duluth, MN 55802, USA</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 shrink-0 text-[#5DA9E9]" />
                <a href="tel:+12185550199" className="hover:text-primary transition-colors">(218) 555-0199</a>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 shrink-0 text-[#5DA9E9]" />
                <a href="mailto:info@sourceone.com" className="hover:text-primary transition-colors">info@sourceone.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/40 pt-6 text-center text-xs">
          <p>
            {currentYear !== null ? (
              `© ${currentYear} Source One. All rights reserved.`
            ) : (
              `© Source One. All rights reserved.`
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
