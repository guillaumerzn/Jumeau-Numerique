'use client';

import React from 'react';
import Header from './Header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { useRouter } from 'next/navigation';

// Données temporaires pour les patients
const patients = [
  {
    id: 1,
    name: "Jean Dupont",
    age: 45,
    description: "Patient régulier",
    disease: [
      "pneumonie",
      "hypertension"
    ],
    antecedents: [
      {
        id: 1,
        date: "15/12/2023",
        title: "Consultation Cardiologie",
        description: "Examen cardiaque annuel. Résultats normaux, aucune anomalie détectée.",
        type: "consultation",
      },
      {
        id: 2,
        date: "03/10/2023",
        title: "Prescription Médicaments",
        description: "Renouvellement de l'ordonnance pour l'hypertension. Dosage maintenu.",
        type: "medication",
      },
      {
        id: 3,
        date: "22/08/2023",
        title: "Analyse Sanguine",
        description: "Bilan sanguin complet. Légère anémie détectée, supplémentation en fer recommandée.",
        type: "test",
      },
      {
        id: 4,
        date: "17/05/2023",
        title: "Hospitalisation",
        description: "Admission pour pneumonie. Traitement antibiotique administré pendant 5 jours.",
        type: "hospitalization",
      },
      {
        id: 5,
        date: "08/02/2023",
        title: "Vaccination",
        description: "Vaccination contre la grippe saisonnière.",
        type: "vaccination",
      },
      {
        id: 6,
        date: "30/11/2022",
        title: "Radiographie",
        description: "Radiographie thoracique de contrôle. Résultats normaux.",
        type: "test",
      },
    ]
  },
  {
    id: 2,
    name: "Marie Martin",
    age: 32,
    description: "Nouveau patient",
    antecedents: [
      {
        id: 1,
        date: "2023-12-15",
        title: "Consultation Cardiologie",
        description: "Examen cardiaque annuel. Résultats normaux, aucune anomalie détectée.",
        type: "consultation",
      },
      {
        id: 2,
        date: "2023-10-03",
        title: "Prescription Médicaments",
        description: "Renouvellement de l'ordonnance pour l'hypertension. Dosage maintenu.",
        type: "medication",
      },
      {
        id: 3,
        date: "2023-08-22",
        title: "Analyse Sanguine",
        description: "Bilan sanguin complet. Légère anémie détectée, supplémentation en fer recommandée.",
        type: "test",
      },
      {
        id: 4,
        date: "2023-05-17",
        title: "Hospitalisation",
        description: "Admission pour pneumonie. Traitement antibiotique administré pendant 5 jours.",
        type: "hospitalization",
      },
      {
        id: 5,
        date: "2023-02-08",
        title: "Vaccination",
        description: "Vaccination contre la grippe saisonnière.",
        type: "vaccination",
      },
      {
        id: 6,
        date: "2022-11-30",
        title: "Radiographie",
        description: "Radiographie thoracique de contrôle. Résultats normaux.",
        type: "test",
      },
    ]
  },
  {
    id: 3,
    name: "Pierre Durand",
    age: 58,
    description: "Patient suivi",
    antecedents: [
      {
        id: 1,
        date: "2023-12-15",
        title: "Consultation Cardiologie",
        description: "Examen cardiaque annuel. Résultats normaux, aucune anomalie détectée.",
        type: "consultation",
      },
      {
        id: 2,
        date: "2023-10-03",
        title: "Prescription Médicaments",
        description: "Renouvellement de l'ordonnance pour l'hypertension. Dosage maintenu.",
        type: "medication",
      },
      {
        id: 3,
        date: "2023-08-22",
        title: "Analyse Sanguine",
        description: "Bilan sanguin complet. Légère anémie détectée, supplémentation en fer recommandée.",
        type: "test",
      },
      {
        id: 4,
        date: "2023-05-17",
        title: "Hospitalisation",
        description: "Admission pour pneumonie. Traitement antibiotique administré pendant 5 jours.",
        type: "hospitalization",
      },
      {
        id: 5,
        date: "2023-02-08",
        title: "Vaccination",
        description: "Vaccination contre la grippe saisonnière.",
        type: "vaccination",
      },
      {
        id: 6,
        date: "2022-11-30",
        title: "Radiographie",
        description: "Radiographie thoracique de contrôle. Résultats normaux.",
        type: "test",
      },
    ]
  },
  {
    id: 4,
    name: "Sophie Bernard",
    age: 41,
    description: "Patient régulier",
    antecedents: [
      {
        id: 1,
        date: "2023-12-15",
        title: "Consultation Cardiologie",
        description: "Examen cardiaque annuel. Résultats normaux, aucune anomalie détectée.",
        type: "consultation",
      },
      {
        id: 2,
        date: "2023-10-03",
        title: "Prescription Médicaments",
        description: "Renouvellement de l'ordonnance pour l'hypertension. Dosage maintenu.",
        type: "medication",
      },
      {
        id: 3,
        date: "2023-08-22",
        title: "Analyse Sanguine",
        description: "Bilan sanguin complet. Légère anémie détectée, supplémentation en fer recommandée.",
        type: "test",
      },
      {
        id: 4,
        date: "2023-05-17",
        title: "Hospitalisation",
        description: "Admission pour pneumonie. Traitement antibiotique administré pendant 5 jours.",
        type: "hospitalization",
      },
      {
        id: 5,
        date: "2023-02-08",
        title: "Vaccination",
        description: "Vaccination contre la grippe saisonnière.",
        type: "vaccination",
      },
      {
        id: 6,
        date: "2022-11-30",
        title: "Radiographie",
        description: "Radiographie thoracique de contrôle. Résultats normaux.",
        type: "test",
      },
    ]
  },
  {
    id: 5,
    name: "Lucas Petit",
    age: 28,
    description: "Nouveau patient",
    antecedents: [
      {
        id: 1,
        date: "2023-12-15",
        title: "Consultation Cardiologie",
        description: "Examen cardiaque annuel. Résultats normaux, aucune anomalie détectée.",
        type: "consultation",
      },
      {
        id: 2,
        date: "2023-10-03",
        title: "Prescription Médicaments",
        description: "Renouvellement de l'ordonnance pour l'hypertension. Dosage maintenu.",
        type: "medication",
      },
      {
        id: 3,
        date: "2023-08-22",
        title: "Analyse Sanguine",
        description: "Bilan sanguin complet. Légère anémie détectée, supplémentation en fer recommandée.",
        type: "test",
      },
      {
        id: 4,
        date: "2023-05-17",
        title: "Hospitalisation",
        description: "Admission pour pneumonie. Traitement antibiotique administré pendant 5 jours.",
        type: "hospitalization",
      },
      {
        id: 5,
        date: "2023-02-08",
        title: "Vaccination",
        description: "Vaccination contre la grippe saisonnière.",
        type: "vaccination",
      },
      {
        id: 6,
        date: "2022-11-30",
        title: "Radiographie",
        description: "Radiographie thoracique de contrôle. Résultats normaux.",
        type: "test",
      },
    ]
  },
  {
    id: 6,
    name: "Emma Dubois",
    age: 52,
    description: "Patient régulier",
    antecedents: [
      {
        id: 1,
        date: "2023-12-15",
        title: "Consultation Cardiologie",
        description: "Examen cardiaque annuel. Résultats normaux, aucune anomalie détectée.",
        type: "consultation",
      },
      {
        id: 2,
        date: "2023-10-03",
        title: "Prescription Médicaments",
        description: "Renouvellement de l'ordonnance pour l'hypertension. Dosage maintenu.",
        type: "medication",
      },
      {
        id: 3,
        date: "2023-08-22",
        title: "Analyse Sanguine",
        description: "Bilan sanguin complet. Légère anémie détectée, supplémentation en fer recommandée.",
        type: "test",
      },
      {
        id: 4,
        date: "2023-05-17",
        title: "Hospitalisation",
        description: "Admission pour pneumonie. Traitement antibiotique administré pendant 5 jours.",
        type: "hospitalization",
      },
      {
        id: 5,
        date: "2023-02-08",
        title: "Vaccination",
        description: "Vaccination contre la grippe saisonnière.",
        type: "vaccination",
      },
      {
        id: 6,
        date: "2022-11-30",
        title: "Radiographie",
        description: "Radiographie thoracique de contrôle. Résultats normaux.",
        type: "test",
      },
    ]
  }
];

export { patients };

export default function HomeView() {
  const router = useRouter();
  const cardColors = [
    "bg-blue-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-orange-200"
  ];

  const handleCardClick = (patientId: number) => {
    router.push(`/patient/${patientId}`);
  };

  return (
    <div className="min-h-screen ">
      <Header />
      <div className="container mx-auto px-4 mt-16">
        <h1 className="text-3xl font-semibold">Choix du patient</h1>
        <p className="text-gray-500">Sélectionnez un patient pour accéder à ses informations</p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {patients.map((patient, index) => (
            <Card 
              key={patient.id} 
              className={`${cardColors[index]} hover:shadow-lg transition-shadow cursor-pointer border-md`}
              onClick={() => handleCardClick(patient.id)}
            >

              <CardHeader>
                <CardTitle>{patient.name}</CardTitle>
                <CardDescription>{patient.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Âge: {patient.age} ans</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm">Cliquez pour voir les détails</p>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-26"></div>
      </div>
    </div>
  );
}
