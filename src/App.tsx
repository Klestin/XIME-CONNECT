import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Bus, Car, Recycle as Motorcycle, MapPin, Clock, Users, Bell, ArrowRight } from 'lucide-react';
import CarpoolingPage from './pages/CarpoolingPage';
import MotorcyclePoolPage from './pages/MotorcyclePoolPage';
import BusTransitPage from './pages/BusTransitPage';

type TransportMode = 'carpool' | 'motorcycle' | 'bus';

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
  mode,
  onClick
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  mode: TransportMode;
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
  const [selectedMode, setSelectedMode] = useState<TransportMode | null>(null);
  
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
              mode="carpool"
              onClick={() => navigate('/carpooling')}
            />
            <TransportCard
              icon={Motorcycle}
              title="Motorcycle Pool"
              description="Quick and efficient bike sharing for shorter trips"
              mode="motorcycle"
              onClick={() => navigate('/motorcycle-pool')}
            />
            <TransportCard
              icon={Bus}
              title="Bus Transit"
              description="Track real-time bus locations and schedules"
              mode="bus"
              onClick={() => navigate('/bus-transit')}
            />
          </div>
        </section>

        {/* Community Travel Notifications */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Bell className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold">Community Travel Updates</h2>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {travelNotifications.map((notification, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 rounded-full p-2">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{notification.user}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>Traveling to {notification.destination}</span>
                          <ArrowRight className="w-4 h-4 mx-2" />
                          <span>{notification.departureTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                        {notification.seatsAvailable} {notification.seatsAvailable === 1 ? 'seat' : 'seats'} available
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Transit Information */}
        <section>
          <div className="flex items-center mb-6">
            <Clock className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold">Live Transit Updates</h2>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {transitInfo.map((info, index) => (
                <div key={index} className="p-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{info.route}</h3>
                    <p className="text-sm text-gray-500">Next arrival: {info.nextArrival}</p>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-400 mr-2" />
                    <span className={`text-sm ${
                      info.capacity === 'Available' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {info.capacity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
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