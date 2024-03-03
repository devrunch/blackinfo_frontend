import Hero from "../components/Hero.jsx"
import FeaturesBlocks from "../components/features-blocks.jsx"
import Outcome from "../components/Outcome.jsx"
import ContactForm from "../components/ContactForm.jsx"
// import CounterMeasure from "./components/CounterMeasure.tsx"
function Home() {
  return (
    <>
      <main className="bg-gray-200 relative ">
        <Hero />
      </main>
        <FeaturesBlocks/>
        <Outcome/>
        <ContactForm/>
        

    </>
  )
}

export default Home
