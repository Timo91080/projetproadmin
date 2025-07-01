import React, { useState, useEffect } from 'react';
import { Users, Monitor, Calendar, Play, TrendingUp, Clock } from 'lucide-react';
import { apiService } from '../services/apiService';

interface DashboardStats {
  totalClients: number;
  totalStations: number;
  totalReservations: number;
  activeSessions: number;
  todayReservations: number;
  todaySessions: number;
  stationStats: Array<{
    plateforme: string;
    total_stations: number;
    total_reservations: number;
  }>;
  recentSessions: Array<{
    id_session: number;
    debut_session: string;
    fin_session: string | null;
    plateforme: string;
    id_station: number;
    clients: string;
  }>;
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await apiService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Clients',
      value: stats?.totalClients || 0,
      icon: Users,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Stations',
      value: stats?.totalStations || 0,
      icon: Monitor,
      color: 'from-green-600 to-green-700',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Réservations',
      value: stats?.totalReservations || 0,
      icon: Calendar,
      color: 'from-purple-600 to-purple-700',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Sessions actives',
      value: stats?.activeSessions || 0,
      icon: Play,
      color: 'from-orange-600 to-orange-700',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const todayStats = [
    {
      title: "Réservations aujourd'hui",
      value: stats?.todayReservations || 0,
      icon: Calendar,
      color: 'text-cyan-600'
    },
    {
      title: "Sessions aujourd'hui",
      value: stats?.todaySessions || 0,
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <button
          onClick={fetchStats}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Actualiser
        </button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {todayStats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center space-x-3">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Station Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Utilisation des stations</h3>
          <div className="space-y-4">
            {stats?.stationStats.map((station) => (
              <div key={station.plateforme} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Monitor className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{station.plateforme}</p>
                    <p className="text-sm text-gray-600">{station.total_stations} stations</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">{station.total_reservations}</p>
                  <p className="text-xs text-gray-600">réservations</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sessions récentes</h3>
          <div className="space-y-3">
            {stats?.recentSessions.slice(0, 5).map((session) => (
              <div key={session.id_session} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${session.fin_session ? 'bg-gray-100' : 'bg-green-100'}`}>
                  <Clock className={`h-4 w-4 ${session.fin_session ? 'text-gray-600' : 'text-green-600'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    Station {session.id_station} ({session.plateforme})
                  </p>
                  <p className="text-xs text-gray-600 truncate">{session.clients}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">
                    {new Date(session.debut_session).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    session.fin_session 
                      ? 'bg-gray-100 text-gray-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {session.fin_session ? 'Terminée' : 'En cours'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}