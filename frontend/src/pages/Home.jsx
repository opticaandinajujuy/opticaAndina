import Navbar from '../components/layout/Navbar.jsx';
import Hero from '../components/home/Hero.jsx';
import ProductGrid from '../components/products/ProductGrid.jsx';
import QuoteForm from '../components/quote/QuoteForm.jsx';
import About from '../components/home/About.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import ContactSection from '../components/home/ContactSection.jsx';
import Footer from '../components/layout/Footer.jsx';
import BrandsMarquee from '../components/home/BrandsMarquee.jsx';

function Home() {
  return (
    <>
      <Navbar overlay />
      <Hero />
      <BrandsMarquee />
      <ProductGrid />
      <QuoteForm />
      <About />
      <Testimonials />
      <ContactSection />
      <Footer />
    </>
  );
}

export default Home;
