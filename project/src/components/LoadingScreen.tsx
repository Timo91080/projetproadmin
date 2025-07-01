import { Gamepad2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-cyan-800 flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="relative">
          {/* Icône principale avec animation */}
          <div className="mx-auto h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
            <Gamepad2 className="h-10 w-10 text-purple-600" />
          </div>
          
          {/* Cercles d'animation autour */}
          <div className="absolute inset-0 animate-ping">
            <div className="h-20 w-20 mx-auto bg-white rounded-full opacity-20"></div>
          </div>
          <div className="absolute inset-0 animate-pulse">
            <div className="h-24 w-24 mx-auto bg-white rounded-full opacity-10 -mt-2 -ml-2"></div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">GameZone Manager</h1>
          <p className="text-purple-200 text-lg">Chargement de votre espace de gestion...</p>
          
          {/* Barre de progression animée */}
          <div className="w-64 mx-auto bg-purple-700 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Indicateur de chargement rotatif */}
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
}
