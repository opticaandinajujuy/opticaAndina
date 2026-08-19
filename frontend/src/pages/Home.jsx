import Navbar from '../components/layout/Navbar.jsx';
import Hero from '../components/home/Hero.jsx';
import BrandsCarousel from '../components/home/BrandsCarousel.jsx';
import ProductGrid from '../components/products/ProductGrid.jsx';
import QuoteForm from '../components/quote/QuoteForm.jsx';
import About from '../components/home/About.jsx';
import ContactSection from '../components/home/ContactSection.jsx';
import Footer from '../components/layout/Footer.jsx';
import BrandsMarquee from '../components/home/BrandsMarquee.jsx';

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BrandsMarquee />
      <BrandsCarousel />
      <ProductGrid />
      <QuoteForm />
      <About />
      <ContactSection />
      <Footer />
    </>
  );
}

export default Home;
