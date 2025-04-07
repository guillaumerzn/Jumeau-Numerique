"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "next/navigation"
import { patients } from "./HomeView"

interface Disease {
    name: string;
    events: any[];
}

const DISEASE_AREAS = {
"hypertension": "coeur",
"pneumonie": "poumons",
"anémie": "sang",

}

const ORGAN_AREAS = {
    "poumons": { x: 47, y: 30, radius: 8 },
    "coeur": { x: 52, y: 29, radius: 4 }
    
}

const DISEASE_DESCRIPTION = {
    "hypertension": "Augmentation anormale de la pression artérielle, pouvant endommager le système cardiovasculaire",
    "pneumonie": "Infection des poumons causant inflammation et difficultés respiratoires",
    "anémie": "Diminution des globules rouges dans le sang, causant fatigue et faiblesse"
} 

export default function BodyDiseaseMap() {
    const params = useParams();
    const patientId = parseInt(params.slug as string);
    const patient = patients.find(p => p.id === patientId);
    const [activeDisease, setActiveDisease] = useState<string>("");

    const DISEASE_LIST = Object.keys(DISEASE_AREAS);

    const diseases = patient?.antecedents.reduce((acc: Disease[], event) => {
        if (event.type === "vaccination") return acc;
        
        DISEASE_LIST.forEach(disease => {
            if (event.description.toLowerCase().includes(disease)) {
                const existingDisease = acc.find(d => d.name === disease);
                if (existingDisease) {
                    existingDisease.events.push(event);
                } else {
                    acc.push({
                        name: disease,
                        events: [event]
                    })
                }
            }
        })
        return acc;
    }, []) || [];

    const getOrganCoordinates = (disease: string) => {
        const organ = DISEASE_AREAS[disease as keyof typeof DISEASE_AREAS];
        return ORGAN_AREAS[organ as keyof typeof ORGAN_AREAS];
    };

    return(
        <div className="container mx-auto px-4 sm:px-8 py-8">
            <div className="mb-4 space-y-1">
                <h1 className="text-2xl font-bold animate-in fade-in slide-in-from-top-4 duration-500">Jumeau numérique</h1>
                <p className="text-sm text-muted-foreground animate-in fade-in slide-in-from-top-4 duration-500 delay-150">Cartographie des maladies de {patient?.name}</p>
            </div>
            {diseases.length > 0 ? (
                <Tabs defaultValue={diseases[0].name} className="w-full mt-6" onValueChange={setActiveDisease}>
                    <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${diseases.length}, 1fr)` }}>
                        {diseases.map(disease => (
                            <TabsTrigger 
                                key={disease.name} 
                                value={disease.name}
                                className="hover:text-900"
                            >
                                {disease.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="flex flex-col lg:flex-row gap-8 mt-8">
                        <div className="w-full lg:w-1/2 space-y-4">
                            <div className="relative aspect-[460/600] bg-gray-100 rounded-lg">
                          
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Image
                                        src="/SVG.png"
                                        alt="Silhouette"
                                        width={460}
                                        height={600}
                                        className="object-contain"
                                    />
                                </div>
                                
                            
                                
                                {Object.entries(DISEASE_AREAS).map(([disease, organ]) => {
                                    const coordinates = ORGAN_AREAS[organ as keyof typeof ORGAN_AREAS];
                                    const isActive = disease === activeDisease;
                                    
                                    if (disease === "anémie") {
                                        return (
                                            <div 
                                                key={disease}
                                                className={`absolute top-[4%] right-[4%]`}
                                                style={{
                                                    transition: "all 0.3s ease"
                                                }}
                                            >
                                                <Badge 
                                                    variant="destructive"
                                                    className={`text-sm ${isActive ? 'bg-red-500' : 'bg-gray-200 text-red-800'}`}
                                                >
                                                    Sang
                                                </Badge>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div 
                                            key={disease}
                                            className={`absolute ${isActive ? 'animated-pulse' : ''}`} 
                                            style={{
                                                left: `${coordinates?.x}%`,
                                                top: `${coordinates?.y}%`,
                                                width: `${coordinates?.radius}%`,
                                                height: `${coordinates?.radius}%`,
                                                borderRadius: "50%",
                                                backgroundColor: isActive 
                                                    ? "rgba(255, 0, 0, 0.2)" 
                                                    : "rgba(255, 0, 0, 0.05)",
                                                border: `2px solid ${isActive 
                                                    ? "rgba(255, 0, 0, 0.6)" 
                                                    : "rgba(255, 0, 0, 0.2)"}`,
                                                pointerEvents: "none",
                                                transition: "all 0.3s ease"
                                            }} 
                                        />
                                    );
                                })}
                            </div>
                            <div className="text-center bg-gray-100 py-2 rounded-md">
                                <p>Zone concernée : {DISEASE_AREAS[activeDisease as keyof typeof DISEASE_AREAS]}</p>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            {diseases.map(disease => (
                                <TabsContent key={disease.name} value={disease.name}>
                                    <div className="space-y-4">
                                        {disease.events.map(event => (
                                            <Card key={event.id} className="animate-in fade-in slide-in-from-top-4 duration-500 ">
                                                <CardHeader>
                                                    <CardTitle>{event.title}</CardTitle>
                                                    <CardDescription>{event.date}</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <p>{event.description}</p>
                                                    <Badge 
                                                        variant="outline" 
                                                        className="mt-4"
                                                    >
                                                        {disease.name}
                                                    </Badge>                                        
                                                </CardContent>
                                            </Card>
                                        ))}
                                        <Card className="bg-muted/50 animate-in fade-in slide-in-from-top-4 duration-500 ">
                                            <CardHeader>
                                                <CardTitle className="">{disease.name}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p>
                                                    {DISEASE_DESCRIPTION[disease.name as keyof typeof DISEASE_DESCRIPTION]}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </TabsContent>
                            ))}
                        </div>
                    </div>
                </Tabs>
            ) : (
                <div className="text-center py-8 text-muted-foreground">
                    Aucune maladie détectée dans les antécédents du patient.
                </div>
            )}

        </div>
    )
}
