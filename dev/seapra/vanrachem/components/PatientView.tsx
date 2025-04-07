'use client';

import React from 'react';
import Header from './Header';
import { useParams } from 'next/navigation';
import { patients } from './HomeView';
import FilAriane from './FilAriane';
import Jumeau from './Jumeau';
export default function PatientView() {
  const params = useParams();
  const patientId = parseInt(params.slug as string);
  const patient = patients.find(p => p.id === patientId);

  if (!patient) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 mt-16">
          <h1 className="text-3xl font-semibold text-red-500">Patient non trouvé</h1>
          <p className="text-gray-500">Le patient que vous recherchez n'existe pas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />
      <div className="container mx-auto px-4 mt-16">
        <h1 className="text-3xl font-semibold">Profil de {patient.name}</h1>
        <p className="text-gray-500">Consultez ici votre fil d'Ariane et votre Jumeau numérique</p>
      </div>

      <div className="container mx-auto px-4 mt-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Colonne de gauche */}
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-lg h-fit">
            <FilAriane />
          </div>

          {/* Colonne de droite */}
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-lg h-fit">
            <Jumeau/>
          </div>
        </div>
      </div>
    </div>
  );
}