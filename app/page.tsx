import DashedStroke from "@/components/DashedStroke";
import Header from "@/components/Homepage/Header";
import HeaderImage from "@/components/Homepage/HeaderImage";
import Revolution from "@/components/Homepage/Revolution";
import Testimonial from "@/components/Homepage/Testimonial";
import UnrivaledFeatures from "@/components/Homepage/UnrivaledFeatures";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/nav/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Header />
        <HeaderImage />
        <section className="grid relative">
          <section className="col-start-1 col-end-2">
            <UnrivaledFeatures />
            <Revolution />
          </section>
          <DashedStroke />
        </section>
        <Testimonial />
      </main>
      <Footer />
    </>
  );
}
