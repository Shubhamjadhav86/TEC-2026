import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import MentorsSection from './components/MentorsSection';
import TeamsSection from './components/TeamsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
    return (
        <div className="relative">
            <Navbar />
            <HeroSection />
            <TimelineSection />
            <MentorsSection />
            <TeamsSection />
            <ContactSection />
            <Footer />
        </div>
    );
}

export default App;
