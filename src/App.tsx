import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Bus, Car, Recycle as Motorcycle, MapPin, Clock, Users, Bell, ArrowRight } from 'lucide-react';
import CarpoolingPage from './pages/CarpoolingPage';
import MotorcyclePoolPage from './pages/MotorcyclePoolPage';
import BusTransitPage from './pages/BusTransitPage';
import { LucideIcon } from 'lucide-react';

interface TransitInfo {
  route: string;
  nextArrival: string;
  capacity: string;
}

interface TravelNotification {
  user: string;
  destination: string;
  departureTime: string;
  seatsAvailable: number;
}

const TransportCard = ({ 
  icon: Icon, 
  title, 
  description, 
  onClick
}: { 
  icon: LucideIcon; 
  title: string; 
  description: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="p-6 rounded-xl transition-all bg-white hover:bg-gray-50 shadow-md flex flex-col items-center text-center"
  >
    <Icon className="w-12 h-12 mb-4 text-blue-600" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </button>
);

const HomePage = () => {
  const navigate = useNavigate();
  
  const transitInfo: TransitInfo[] = [
    { route: "Route X1", nextArrival: "5 mins", capacity: "Available" },
    { route: "Route X2", nextArrival: "12 mins", capacity: "Crowded" },
    { route: "Route X3", nextArrival: "20 mins", capacity: "Available" }
  ];

  const travelNotifications: TravelNotification[] = [
    { user: "Sarah M.", destination: "City Center", departureTime: "10:30 AM", seatsAvailable: 3 },
    { user: "John D.", destination: "Shopping Mall", departureTime: "11:15 AM", seatsAvailable: 2 },
    { user: "Mike R.", destination: "University Campus", departureTime: "12:00 PM", seatsAvailable: 1 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Xime Connect</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Transport Options */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Choose Your Ride</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TransportCard
              icon={Car}
              title="Carpooling"
              description="Share rides with community members heading the same way"
              onClick={() => navigate('/carpooling')}
            />
            <TransportCard
              icon={Motorcycle}
              title="Motorcycle Pool"
              description="Quick and efficient bike sharing for shorter trips"
              onClick={() => navigate('/motorcycle-pool')}
            />
            <TransportCard
              icon={Bus}
              title="Bus Transit"
              description="Track real-time bus locations and schedules"
              onClick={() => navigate('/bus-transit')}
            />
          </div>
        </section>

        {/* Live Transit Updates */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Live Transit Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transitInfo.map((info, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{info.route}</h3>
                  <Clock className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Next arrival: {info.nextArrival}</span>
                  <span className="text-sm text-gray-600">{info.capacity}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Travel Notifications */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Travel Notifications</h2>
          <div className="space-y-4">
            {travelNotifications.map((notification, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-semibold">{notification.user}</span>
                  </div>
                  <Bell className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{notification.destination}</p>
                    <p className="text-sm text-gray-600">Departure: {notification.departureTime}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">{notification.seatsAvailable} seats available</span>
                    <ArrowRight className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/carpooling" element={<CarpoolingPage />} />
        <Route path="/motorcycle-pool" element={<MotorcyclePoolPage />} />
        <Route path="/bus-transit" element={<BusTransitPage />} />
      </Routes>
    </Router>
  );
}

export default App;