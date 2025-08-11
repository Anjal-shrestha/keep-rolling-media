import AboutSection from '@/components/AboutSection';
import ClientsSection from '@/components/ClientsSection';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import connectDB from '@/lib/mongodb';


export default async function HomePage() {
  await connectDB();


  return (
    <>
      <HeroSection/>
    <AboutSection />
    <ClientsSection/>
    <ServicesSection />
    <WhyChooseUsSection />
    <TestimonialsSection />
    </>
  );
}