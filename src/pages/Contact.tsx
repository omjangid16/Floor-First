import ContactSection from "@/components/home/ContactSection";

const Contact = () => {
  return (
    <main className="min-h-screen bg-background">
      <section className="gradient-walnut py-16 lg:py-24">
        <div className="container-luxury">
          <p className="text-primary-foreground/50 font-body text-sm mb-2">Get in touch</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground">Contact Us</h1>
          <p className="text-primary-foreground/60 font-body mt-4 max-w-2xl text-lg">
            Have a question or ready to start your flooring project? We'd love to hear from you.
          </p>
        </div>
      </section>
      <ContactSection />
    </main>
  );
};

export default Contact;
