import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

// Helper to wrap lazy components in Suspense
const Loadable = (Component: React.LazyExoticComponent<any>) => (props: any) => (
  <Suspense fallback={
    <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16 flex items-center justify-center">
        {/* Pulsing rings */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        <div className="absolute inset-2 rounded-full bg-primary/40 animate-pulse" />
        {/* Core circle */}
        <div className="w-8 h-8 bg-primary rounded-full shadow-lg flex items-center justify-center">
          <div className="w-3.5 h-3.5 bg-white rounded-full animate-ping" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-bold text-gray-900 tracking-wider">The Swasth Bharat</span>
        <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase animate-pulse">Loading experience...</span>
      </div>
    </div>
  }>
    <Component {...props} />
  </Suspense>
);

// Lazy load all pages
const Home = Loadable(lazy(() => import("../pages/Home")));
const About = Loadable(lazy(() => import("../pages/About")));
const Careers = Loadable(lazy(() => import("../pages/Careers")));
const Blogs = Loadable(lazy(() => import("../pages/Blogs")));
const FindDoctors = Loadable(lazy(() => import("../pages/FindDoctors")));
const DoctorProfile = Loadable(lazy(() => import("../pages/DoctorProfile")));
const BookAppointment = Loadable(lazy(() => import("../pages/BookAppointment")));
const Donations = Loadable(lazy(() => import("../pages/Donations")));
const Contact = Loadable(lazy(() => import("../pages/Contact")));
const Login = Loadable(lazy(() => import("../pages/Login")));
const Signup = Loadable(lazy(() => import("../pages/Signup")));
const CompleteProfile = Loadable(lazy(() => import("../pages/CompleteProfile")));
const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
const AdminDashboard = Loadable(lazy(() => import("../pages/AdminDashboard")));
const Profile = Loadable(lazy(() => import("../pages/Profile")));
const BloodDonation = Loadable(lazy(() => import("../pages/BloodDonation")));
const GovtSchemes = Loadable(lazy(() => import("../pages/GovtSchemes")));
const DoctorPartnership = Loadable(lazy(() => import("../pages/DoctorPartnership")));
const NotFound = Loadable(lazy(() => import("../pages/NotFound")));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "careers", element: <Careers /> },
      { path: "blogs", element: <Blogs /> },
      { path: "find-doctors", element: <FindDoctors /> },
      { path: "doctor/:id", element: <DoctorProfile /> },
      { path: "donations", element: <Donations /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "blood-donation", element: <BloodDonation /> },
      { path: "govt-schemes", element: <GovtSchemes /> },
      { path: "doctor-partnership", element: <DoctorPartnership /> },
      
      // Protected Routes (Must be logged in)
      {
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "profile", element: <Profile /> },
          { path: "complete-profile", element: <CompleteProfile /> },
          { path: "book-appointment/:doctorId", element: <BookAppointment /> },
        ]
      },
      // Admin Routes (Must be ADMIN)
      {
        element: <ProtectedRoute allowedRoles={['ADMIN']} />,
        children: [
          { path: "admin", element: <AdminDashboard /> },
        ]
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
