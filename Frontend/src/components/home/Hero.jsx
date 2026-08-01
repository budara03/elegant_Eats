import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBirthdayCake } from "react-icons/fa";
import heroCake from "../../assets/cakes/hero-cake.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#F2DEC7]">

      {/* Decorative Circles */}
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#E1B8A2]/30 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#99B4AA]/30 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 items-center gap-14">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .8 }}
          >

            <span className="bg-[#E1B8A2] px-5 py-2 rounded-full text-[#6B6D43] font-semibold">
              Handmade • Fresh • Custom Made
            </span>

            <h1 className="text-5xl lg:text-7xl font-extrabold mt-8 leading-tight text-[#6B6D43]">

              Celebrate

              <br />

              Every

              <span className="text-[#CF7D65]"> Sweet </span>

              Moment

            </h1>

            <p className="text-gray-600 text-lg mt-8 leading-8 max-w-xl">

              Beautiful handcrafted cakes for birthdays,
              weddings, baby showers, anniversaries,
              parties and every special celebration.

              Design your dream cake exactly the way
              you imagine.

            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/custom-cake"
                className="bg-[#CF7D65] hover:bg-[#b9654f]
                text-white px-8 py-4 rounded-full
                font-semibold transition shadow-lg"
              >
                Design Your Cake
              </Link>

              <Link
                to="/cakes"
                className="border-2 border-[#6B6D43]
                text-[#6B6D43]
                hover:bg-[#6B6D43]
                hover:text-white
                px-8 py-4 rounded-full
                font-semibold transition"
              >
                Explore Cakes
              </Link>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-6 mt-14">

              <div>

                <h2 className="text-4xl font-bold text-[#CF7D65]">
                  500+
                </h2>

                <p className="text-gray-600 mt-2">
                  Happy Customers
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold text-[#CF7D65]">
                  150+
                </h2>

                <p className="text-gray-600 mt-2">
                  Cake Designs
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold text-[#CF7D65]">
                  5★
                </h2>

                <p className="text-gray-600 mt-2">
                  Customer Rating
                </p>

              </div>

            </div>

          </motion.div>

          {/* RIGHT SIDE */}

          <motion.div

            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: .8 }}

            className="relative flex justify-center"

          >

            {/* Floating Circle */}

            <div className="absolute h-[450px] w-[450px] rounded-full bg-[#99B4AA]/30 blur-2xl"></div>

            <motion.img

              src={heroCake}

              alt="Hero Cake"

              animate={{
                y: [0, -20, 0],
              }}

              transition={{
                duration: 4,
                repeat: Infinity,
              }}

              className="relative w-[450px] lg:w-[550px] drop-shadow-2xl"

            />

            {/* Floating Card */}

            <motion.div

              animate={{
                y: [0, -10, 0],
              }}

              transition={{
                repeat: Infinity,
                duration: 3,
              }}

              className="absolute bottom-5 left-0
              bg-white rounded-3xl shadow-xl
              px-6 py-4"

            >

              <div className="flex items-center gap-4">

                <div className="bg-[#CF7D65] text-white p-3 rounded-full">

                  <FaBirthdayCake size={28} />

                </div>

                <div>

                  <h3 className="font-bold text-[#6B6D43]">
                    100% Custom Cakes
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Designed just for you
                  </p>

                </div>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default Hero;