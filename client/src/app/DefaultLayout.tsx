import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

const DefaultLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navbar />
      <div className=" sm:px-10" id="Home">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
