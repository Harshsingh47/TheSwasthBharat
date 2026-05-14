import { Outlet } from 'react-router';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import ScrollToTop from '../components/layout/ScrollToTop';
import { Chatbot } from '../components/layout/Chatbot';

export default function Root() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Chatbot />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
