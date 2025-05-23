
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'https://subhakaryam.org/#services-section';
    }
  };

  return (
    <footer className="bg-ceremonial-maroon text-white py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-display font-bold text-xl mb-4">Subhakaryam</h3>
          <p className="text-sm opacity-80">
            Making sacred ceremonies accessible and memorable for everyone.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-ceremonial-gold transition-colors">About Us</Link></li>
            <li>
              <button 
                onClick={scrollToServices}
                className="hover:text-ceremonial-gold transition-colors text-white"
              >
                Services
              </button>
            </li>
            <li><Link to="/contact" className="hover:text-ceremonial-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/policies/privacy-policy" 
                className="hover:text-ceremonial-gold transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link 
                to="/policies/terms-conditions" 
                className="hover:text-ceremonial-gold transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link 
                to="/policies/cancellation-policy" 
                className="hover:text-ceremonial-gold transition-colors"
              >
                Cancellation Policy
              </Link>
            </li>
            <li>
              <Link 
                to="/policies/refund-policy" 
                className="hover:text-ceremonial-gold transition-colors"
              >
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <p className="text-sm opacity-80 mb-2">Email: info@subhakaryam.org</p>
          <p className="text-sm opacity-80">Phone: +91 98765 43210</p>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-8 border-t border-white/20 text-center text-sm opacity-80">
        <p>© 2024 Subhakaryam. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
