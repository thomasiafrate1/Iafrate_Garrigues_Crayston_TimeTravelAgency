import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Booking from "./pages/Booking";
import QuizPage from "./pages/QuizPage";
import About from "./pages/About";

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div {...pageVariants}>
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/destinations"
              element={
                <motion.div {...pageVariants}>
                  <Destinations />
                </motion.div>
              }
            />
            <Route
              path="/destinations/:id"
              element={
                <motion.div {...pageVariants}>
                  <DestinationDetail />
                </motion.div>
              }
            />
            <Route
              path="/book"
              element={
                <motion.div {...pageVariants}>
                  <Booking />
                </motion.div>
              }
            />
            <Route
              path="/quiz"
              element={
                <motion.div {...pageVariants}>
                  <QuizPage />
                </motion.div>
              }
            />
            <Route
              path="/about"
              element={
                <motion.div {...pageVariants}>
                  <About />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
