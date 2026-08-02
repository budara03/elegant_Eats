import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import FeaturedCakes from "../components/home/FeaturedCakes";
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedCakes />
    </>
  );
};

export default Home;