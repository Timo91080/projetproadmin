import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, Users, Monitor } from 'lucide-react';
import { apiService } from '../services/apiService';

interface Reservation {
  id_reservation: number;
  date_reservation: string;
  id_station: number;
  plateforme: string;
  clients: string;
  nombre_clients: number;
  id_session?: number;
  debut_session?: string;
  fin_session?: string;
}

interface Client {
  id_client: number;
  nom: string;
  prenom: string;
  email: string;
}

interface Station {
  id_station: number;
  plateforme: string;
}

export function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date_reservation: '',
    id_station: 0,
    client_ids: [] as number[]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [reservationsData, clientsData, stationsData] = await Promise.all([
        apiService.getReservations(),
        apiService.getClients(),
        apiService.getStations()
      ]);
      setReservations(reservationsData);
      setClients(clientsData);
      setStations(stationsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.createReservation(formData);
      fetchData();
      closeModal();
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      try {
        await apiService.deleteReservation(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting reservation:', error);
      }
    }
  };

  const openModal = () => {
    setFormData({
      date_reservation: '',
      id_station: 0,
      client_ids: []
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      date_reservation: '',
      id_station: 0,
      client_ids: []
    });
  };

  const handleClientSelect = (clientId: number) => {
    setFormData(prev => ({
      ...prev,
      client_ids: prev.client_ids.includes(clientId)
        ? prev.client_ids.filter(id => id !== clientId)
        : [...prev.client_ids, clientId]
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Calendar className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Gestion des réservations</h1>
        </div>
        <button
          onClick={openModal}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nouvelle réservation</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Liste des réservations ({reservations.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Heure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Station
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clients
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Session
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((reservation) => (
                <tr key={reservation.id_reservation} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(reservation.date_reservation).toLocaleDateString('fr-FR', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(reservation.date_reservation).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Monitor className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Station {reservation.id_station}
                        </p>
                        <p className="text-xs text-gray-500">{reservation.plateforme}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-900">{reservation.clients}</p>
                        <p className="text-xs text-gray-500">
                          {reservation.nombre_clients} client(s)
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reservation.id_session ? (
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        reservation.fin_session 
                          ? 'bg-gray-100 text-gray-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {reservation.fin_session ? 'Terminée' : 'En cours'}
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                        Pas de session
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(reservation.id_reservation)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Nouvelle réservation
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date et heure
                </label>
                <input
                  type="datetime-local"
                  value={formData.date_reservation}
                  onChange={(e) => setFormData({ ...formData, date_reservation: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Station
                </label>
                <select
                  value={formData.id_station}
                  onChange={(e) => setFormData({ ...formData, id_station: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                >
                  <option value={0}>Sélectionner une station</option>
                  {stations.map((station) => (
                    <option key={station.id_station} value={station.id_station}>
                      Station {station.id_station} ({station.plateforme})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clients ({formData.client_ids.length} sélectionné(s))
                </label>
                <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2 space-y-1">
                  {clients.map((client) => (
                    <label
                      key={client.id_client}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.client_ids.includes(client.id_client)}
                        onChange={() => handleClientSelect(client.id_client)}
                        className="text-purple-600 focus:ring-purple-600"
                      />
                      <span className="text-sm text-gray-900">
                        {client.prenom} {client.nom}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={formData.client_ids.length === 0}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}