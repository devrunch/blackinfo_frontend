import { useEffect, useState } from "react";
import FooterMain from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import Identification from "./pages/Identification";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Mptp from './components/Analysis'
import Form from "./pages/AccidentForm"
import Aqusition from "./pages/aqusition";
import SiteInvestigation from "./pages/SiteInvestigation";
import ContactForm from "./components/ContactForm";
import HeatMap from './components/heatMap'
import AccidentAnalysis from "./components/AccidentAnalysis";
import Chatbot from "./components/Chatbot";
// import CounterMeasure from "./components/CounterMeasure.tsx"
function App() {
  const [userEmail, setUserEmail] = useState('');
  useEffect(() => {
    const fetchUser = async () => {

      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/api/user/profile/` + localStorage.getItem('token'));
      const data = await response.json();
      console.log(data)
      if (data.status === 1) {
        setUserEmail(data.message);
      }
    }
    if (userEmail == '')
      fetchUser();
    console.log(userEmail)
  }, [userEmail]);

  // State for user information
  return (
    <>
      <BrowserRouter>
        <Navbar user={userEmail} setUser={setUserEmail} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Accidentform" element={<Form />} />
          <Route path="/siteInvestigation" element={<SiteInvestigation />} />
          <Route path="/identification" element={<Identification />} />
          <Route path="/aqusition" element={<Aqusition />} />
          <Route path="/analysis" element={<Mptp />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/analysis/:loc" element={<AccidentAnalysis />} />
          <Route path="/test" element={<AccidentAnalysis />} />
        </Routes>
        {/* <Chatbot/> */}
        <FooterMain />
      </BrowserRouter>
    </>
  )
}

export default App
