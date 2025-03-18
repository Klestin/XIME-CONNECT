import React, { useState } from 'react';
import { Users, MapPin, Clock, Recycle, Home, Bus } from 'lucide-react';

interface User {
  id: string;
  name: string;
  status: 'hostel' | 'traveling';
  destination?: string;
  departureTime?: string;
  seatsAvailable?: number;
}

const MotorcyclePoolPage = () => {
  const [activeTab, setActiveTab] = useState<'hostel' | 'traveling'>('hostel');

  const hostelUsers: User[] = [
    { id: '1', name: 'Alex Turner', status: 'hostel' },
    { id: '2', name: 'Emma Davis', status: 'hostel' },
    { id: '3', name: 'Ryan Wilson', status: 'hostel' },
  ];

  const travelingUsers: User[] = [
    { 
      id: '4', 
      name: 'Chris Martin', 
      status: 'traveling',
      destination: 'University Campus',
      departureTime: '9:30 AM',
      seatsAvailable: 1
    },
    { 
      id: '5', 
      name: 'Lisa Anderson', 
      status: 'traveling',
      destination: 'Library',
      departureTime: '10:45 AM',
      seatsAvailable: 1
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Recycle className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Motorcycle Pool</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('hostel')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeTab === 'hostel'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Home className="w-5 h-5 mr-2" />
            In Hostel
          </button>
          <button
            onClick={() => setActiveTab('traveling')}
            className={`px-4 py-2 rounded-lg flex items-center ${
              activeTab === 'traveling'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Bus className="w-5 h-5 mr-2" />
            Traveling
          </button>
        </div>

        {/* User Lists */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="divide-y divide-gray-200">
            {activeTab === 'hostel' ? (
              hostelUsers.map((user) => (
                <div key={user.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 rounded-full p-2">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-500">Currently in Hostel</p>
                      </div>
                    </div>
                    <button className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                      Contact
                    </button>
                  </div>
                </div>
              ))
            ) : (
              travelingUsers.map((user) => (
                <div key={user.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 rounded-full p-2">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{user.destination}</span>
                          <Clock className="w-4 h-4 mx-2" />
                          <span>{user.departureTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        {user.seatsAvailable} seat available
                      </span>
                      <button className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                        Join Ride
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotorcyclePoolPage; 