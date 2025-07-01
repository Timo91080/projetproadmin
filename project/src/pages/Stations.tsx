import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Monitor, Gamepad2 } from 'lucide-react';
import { apiService } from '../services/apiService';

interface Station {
  id_station: number;
  plateforme: string;
  config_pc?: string;
  nombre_manettes?: number;
  total_reservations: number;
}

export function Stations() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [formData, setFormData] = useState({
    plateforme: 'PC',
    config_pc: '',
    nombre_manettes: 2
  });

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const data = await apiService.getStations();
      setStations(data);
    } catch (error) {
      console.error('Error fetching stations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStation) {
        await apiService.updateStation(editingStation.id_station, formData);
      } else {
        await apiService.createStation(formData);
      }
      fetchStations();
      closeModal();
    } catch (error) {
      console.error('Error saving station:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette station ?')) {
      try {
        await apiService.deleteStation(id);
        fetchStations();
      } catch (error) {
        console.error('Error deleting station:', error);
      }
    }
  };

  const openModal = (station?: Station) => {
    setEditingStation(station || null);
    setFormData({
      plateforme: station?.plateforme || 'PC',
      config_pc: station?.config_pc || '',
      nombre_manettes: station?.nombre_manettes || 2
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingStation(null);
    setFormData({ plateforme: 'PC', config_pc: '', nombre_manettes: 2 });
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
          <Monitor className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Gestion des stations</h1>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nouvelle station</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Liste des stations ({stations.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Station
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plateforme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Configuration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Réservations
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stations.map((station) => (
                <tr key={station.id_station} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                        {station.plateforme === 'PC' ? (
                          <Monitor className="h-5 w-5 text-white" />
                        ) : (
                          <Gamepad2 className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Station {station.id_station}
                        </p>
                        <p className="text-xs text-gray-500">ID: {station.id_station}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      station.plateforme === 'PC' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {station.plateforme}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {station.plateforme === 'PC' ? (
                        station.config_pc || 'Non spécifiée'
                      ) : (
                        `${station.nombre_manettes} manettes`
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                      {station.total_reservations} réservations
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => openModal(station)}
                        className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(station.id_station)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingStation ? 'Modifier la station' : 'Nouvelle station'}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plateforme
                </label>
                <select
                  value={formData.plateforme}
                  onChange={(e) => setFormData({ ...formData, plateforme: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="PC">PC</option>
                  <option value="Console">Console</option>
                </select>
              </div>
              
              {formData.plateforme === 'PC' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Configuration PC
                  </label>
                  <textarea
                    value={formData.config_pc}
                    onChange={(e) => setFormData({ ...formData, config_pc: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    rows={3}
                    placeholder="Ex: i7-10700K, RTX 3070, 16GB RAM"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de manettes
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={formData.nombre_manettes}
                    onChange={(e) => setFormData({ ...formData, nombre_manettes: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
              )}
              
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
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {editingStation ? 'Modifier' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}