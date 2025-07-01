import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { admin } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Bienvenue, {admin?.prenom} {admin?.nom}
          </h2>
          <p className="text-sm text-gray-600">
            Gérez votre salle de jeux vidéo
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{admin?.prenom} {admin?.nom}</p>
            <p className="text-xs text-gray-600">{admin?.email}</p>
          </div>
          <div className="h-10 w-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {admin?.prenom?.charAt(0)}{admin?.nom?.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}