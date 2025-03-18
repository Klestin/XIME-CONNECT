import { useState } from 'react';
import { Bus, MapPin, Clock, ChevronRight, ChevronDown, Bike } from 'lucide-react';

interface BusStop {
  name: string;
  arrivalTime: string;
}

interface BusRoute {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  frequency: string;
  nextArrival: string;
  stops: BusStop[];
  isExpanded?: boolean;
}

interface MyBYKStation {
  id: string;
  name: string;
  availableBikes: number;
  totalCapacity: number;
  status: 'available' | 'low' | 'empty';
}

const BusTransitPage = () => {
  const [routes, setRoutes] = useState<BusRoute[]>([
    {
      id: '1',
      name: 'Route X1',
      startPoint: 'University Campus',
      endPoint: 'City Center',
      frequency: 'Every 30 mins',
      nextArrival: '5 mins',
      stops: [
        { name: 'University Campus', arrivalTime: '9:00 AM' },
        { name: 'Library', arrivalTime: '9:15 AM' },
        { name: 'Shopping Mall', arrivalTime: '9:30 AM' },
        { name: 'City Center', arrivalTime: '9:45 AM' },
      ],
      isExpanded: false,
    },
    {
      id: '2',
      name: 'Route X2',
      startPoint: 'Hostel Complex',
      endPoint: 'Airport',
      frequency: 'Every 1 hour',
      nextArrival: '12 mins',
      stops: [
        { name: 'Hostel Complex', arrivalTime: '10:00 AM' },
        { name: 'University Campus', arrivalTime: '10:15 AM' },
        { name: 'Bus Terminal', arrivalTime: '10:30 AM' },
        { name: 'Airport', arrivalTime: '11:00 AM' },
      ],
      isExpanded: false,
    },
    {
      id: '3',
      name: 'Route X3',
      startPoint: 'University Campus',
      endPoint: 'Train Station',
      frequency: 'Every 45 mins',
      nextArrival: '20 mins',
      stops: [
        { name: 'University Campus', arrivalTime: '10:30 AM' },
        { name: 'Library', arrivalTime: '10:45 AM' },
        { name: 'City Center', arrivalTime: '11:00 AM' },
        { name: 'Train Station', arrivalTime: '11:15 AM' },
      ],
      isExpanded: false,
    },
  ]);

  const [mybykStations] = useState<MyBYKStation[]>([
    {
      id: '1',
      name: 'Main Campus Entrance',
      availableBikes: 8,
      totalCapacity: 12,
      status: 'available'
    },
    {
      id: '2',
      name: 'Library',
      availableBikes: 3,
      totalCapacity: 10,
      status: 'low'
    },
    {
      id: '3',
      name: 'Hostel Complex',
      availableBikes: 0,
      totalCapacity: 8,
      status: 'empty'
    },
    {
      id: '4',
      name: 'Sports Complex',
      availableBikes: 5,
      totalCapacity: 8,
      status: 'available'
    }
  ]);

  const toggleRoute = (routeId: string) => {
    setRoutes(routes.map(route => 
      route.id === routeId 
        ? { ...route, isExpanded: !route.isExpanded }
        : route
    ));
  };

  const getStatusColor = (status: MyBYKStation['status']) => {
    switch (status) {
      case 'available':
        return 'text-green-600';
      case 'low':
        return 'text-orange-600';
      case 'empty':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Bus className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Bus Transit</h1>
          </div>
          <div className="flex items-center">
            <Bike className="w-6 h-6 text-green-600 mr-2" />
            <span className="text-sm text-gray-500">MyBYK Available</span>
          </div>
        </div>

        {/* MyBYK Stations Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">MyBYK Stations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mybykStations.map((station) => (
              <div key={station.id} className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{station.name}</h3>
                  <Bike className={`w-5 h-5 ${getStatusColor(station.status)}`} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Available Bikes</span>
                    <span className={`text-sm font-medium ${getStatusColor(station.status)}`}>
                      {station.availableBikes}/{station.totalCapacity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        station.status === 'available' ? 'bg-green-500' :
                        station.status === 'low' ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${(station.availableBikes / station.totalCapacity) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bus Routes Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Bus Routes</h2>
          <div className="space-y-4">
            {routes.map((route) => (
              <div key={route.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleRoute(route.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 rounded-full p-2">
                        <Bus className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{route.name}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{route.startPoint}</span>
                          <ChevronRight className="w-4 h-4 mx-2" />
                          <span>{route.endPoint}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Next: {route.nextArrival}
                      </div>
                      {route.isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {route.isExpanded && (
                  <div className="border-t border-gray-200">
                    <div className="p-6">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Frequency</h4>
                        <p className="text-sm text-gray-900">{route.frequency}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">Stops</h4>
                        <div className="space-y-2">
                          {route.stops.map((stop, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <span className="text-blue-600 font-medium">{index + 1}</span>
                              </div>
                              <div>
                                <p className="text-gray-900">{stop.name}</p>
                                <p className="text-gray-500">{stop.arrivalTime}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusTransitPage; 