import { ReactNode } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, X, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';
import { useState } from 'react';

interface DefaultLayoutProps {
  children?: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">AR</span>
                </div>
                <span className="text-xl font-bold text-foreground">ANPR READER</span>
              </Link>
            </div>


            {/* Desktop CTA Button */}
            {/* <div className="hidden md:flex items-center space-x-4">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200">
                Get Started
              </button>
              <Link to="/settings" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                <Settings size={20} />
              </Link>
            </div> */}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/services"
                className="block px-3 py-2 text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-2">
                <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 min-h-0">
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">AR</span>
                </div>
                <span className="text-xl font-bold text-foreground">ANPR READER</span>
              </div>
              <p className="text-muted-foreground text-sm max-w-xs">
                Building amazing experiences with modern technology and thoughtful design.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  <Github size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              
            </div>

            {/* Services */}
            <div>
             
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-foreground font-semibold mb-4">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">no-reply@classroom.google.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">+(62) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground text-sm">123 Main St, City, State 12345</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} ANPR READER. All rights reserved.
            </p>
            {/* <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm">
                Cookie Policy
              </a>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}