"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from "next/navigation"
import { patients } from "./HomeView"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Disease {
    name: string;
    events: any[];
}

const DISEASE_AREAS = {
"hypertension": "coeur",
"pneumonie": "poumons",
"anémie": "sang",
"glaucome": "yeux",
"arthrite": "articulations",
"appendicite": "abdomen"
}

const ORGAN_AREAS = {
    "poumons": [{ x: 47, y: 30, radiusx: 4, radiusy: 8},
                { x: 51, y: 30, radiusx: 4, radiusy: 8}
    ],
    "coeur": [{ x: 52, y: 29, radiusx: 4, radiusy: 4 }],
    "yeux": [
        { x: 48.7, y: 19.5, radiusx: 1.95, radiusy: 1.5}, // œil gauche
        { x: 51.5, y: 19.5, radiusx: 1.95, radiusy: 1.5 }  // œil droit
    ],
    "articulations": [
        { x: 38, y: 39, radiusx: 4, radiusy: 4 }, // articulation gauche
        { x: 60, y: 39, radiusx: 4, radiusy: 4 }, // articulation droite
        { x: 45, y: 60, radiusx: 4, radiusy: 4 }, // articulation gauche
        { x: 53, y: 60, radiusx: 4, radiusy: 4 }  // articulation droite
    ],
    "abdomen": [{ x: 45.25, y: 40, radiusx: 12, radiusy: 12 }]
}

const DISEASE_DESCRIPTION = {
    "hypertension": "Augmentation anormale de la pression artérielle, pouvant endommager le système cardiovasculaire",
    "pneumonie": "Infection des poumons causant inflammation et difficultés respiratoires",
    "anémie": "Diminution des globules rouges dans le sang, causant fatigue et faiblesse",
    "glaucome": "Maladie oculaire caractérisée par une augmentation de la pression intraoculaire qui peut endommager le nerf optique",
    "arthrite": "Inflammation des articulations causant douleur, raideur et limitation des mouvements",
    "appendicite": "Inflammation aiguë de l'appendice, nécessitant généralement une intervention chirurgicale"
} 

const DISEASE_TERMS = {
    "arthrite": ["arthrite", "articulaire", "rhumatolog"],
    "glaucome": ["glaucome", "ophtalmolog", "intraoculaire"],
    "appendicite": ["appendicite", "appendicectomie"]
}

export default function BodyDiseaseMap() {
    const params = useParams();
    const patientId = parseInt(params.slug as string);
    const patient = patients.find(p => p.id === patientId);
    const [activeDisease, setActiveDisease] = useState<string>("");
    const [currentEventIndex, setCurrentEventIndex] = useState<Record<string, number>>({});

    const DISEASE_LIST = Object.keys(DISEASE_AREAS);

    const diseases = patient?.antecedents.reduce((acc: Disease[], event) => {
        if (event.type === "vaccination") return acc;
        
        DISEASE_LIST.forEach(disease => {
            const terms = DISEASE_TERMS[disease as keyof typeof DISEASE_TERMS] || [disease];
            const eventText = (event.title + " " + event.description).toLowerCase();
            
            if (terms.some(term => eventText.includes(term))) {
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

    console.log("Diseases detected:", diseases);

    const getOrganCoordinates = (disease: string) => {
        const organ = DISEASE_AREAS[disease as keyof typeof DISEASE_AREAS];
        return ORGAN_AREAS[organ as keyof typeof ORGAN_AREAS];
    };

    const handleNextEvent = (diseaseName: string, eventsCount: number) => {
        setCurrentEventIndex(prev => ({
            ...prev,
            [diseaseName]: ((prev[diseaseName] || 0) + 1) % eventsCount
        }));
    };

    const handlePrevEvent = (diseaseName: string, eventsCount: number) => {
        setCurrentEventIndex(prev => ({
            ...prev,
            [diseaseName]: ((prev[diseaseName] || 0) - 1 + eventsCount) % eventsCount
        }));
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
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/SVG.png"
                                            alt="Silhouette"
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                        
                                        {Object.entries(DISEASE_AREAS).map(([disease, organ]) => {
                                            const coordinates = ORGAN_AREAS[organ as keyof typeof ORGAN_AREAS];
                                            const isActive = disease === activeDisease;
                                            
                                            const patientHasDisease = diseases.some(d => d.name === disease);
                                            
                                            if (!patientHasDisease) return null;
                                            
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

                                            return coordinates.map((coord, index) => (
                                                <div 
                                                    key={`${disease}-${index}`}
                                                    className={`absolute ${isActive ? 'animated-pulse' : ''}`} 
                                                    style={{
                                                        left: `${coord.x}%`,
                                                        top: `${coord.y}%`,
                                                        width: `${coord.radiusx}%`,
                                                        height: `${coord.radiusy}%`,
                                                        borderRadius: "40%",
                                                        backgroundColor: isActive 
                                                            ? "rgba(255, 109, 109, 0.2)" 
                                                            : "rgba(250, 118, 118, 0.05)",
                                                        border: `2px solid ${isActive 
                                                            ? "rgba(250, 102, 102, 0.6)" 
                                                            : "rgba(253, 101, 101, 0.2)"}`,
                                                        pointerEvents: "none",
                                                        transition: "all 0.3s ease"
                                                    }} 
                                                />
                                            ));
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="text-center bg-gray-100 py-2 rounded-md">
                                <p>Zone concernée : {DISEASE_AREAS[activeDisease as keyof typeof DISEASE_AREAS]}</p>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            {diseases.map(disease => (
                                <TabsContent key={disease.name} value={disease.name}>
                                    <div className="space-y-4">
                                        {disease.events.length > 0 && (
                                            <Card className="animate-in fade-in slide-in-from-top-4 duration-500 overflow-hidden">
                                                <motion.div
                                                    key={currentEventIndex[disease.name] || 0}
                                                    initial={{ opacity: 0, x: 50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -50 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <CardHeader>
                                                        <CardTitle>{disease.events[currentEventIndex[disease.name] || 0].title}</CardTitle>
                                                        <CardDescription>{disease.events[currentEventIndex[disease.name] || 0].date}</CardDescription>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <p>{disease.events[currentEventIndex[disease.name] || 0].description}</p>
                                                        <Badge 
                                                            variant="outline" 
                                                            className="mt-4"
                                                        >
                                                            {disease.name}
                                                        </Badge>
                                                    </CardContent>
                                                </motion.div>
                                                {disease.events.length > 1 && (
                                                    <div className="flex justify-between items-center px-6 pb-4">
                                                        <Button 
                                                            variant="outline" 
                                                            size="icon"
                                                            onClick={() => handlePrevEvent(disease.name, disease.events.length)}
                                                            className="transition-transform hover:scale-105"
                                                        >
                                                            <ChevronLeft className="h-4 w-4" />
                                                        </Button>
                                                        <div className="flex space-x-2">
                                                            {disease.events.map((_, index) => (
                                                                <motion.div 
                                                                    key={index}
                                                                    className={`h-2 w-2 rounded-full cursor-pointer ${
                                                                        index === (currentEventIndex[disease.name] || 0) 
                                                                            ? 'bg-primary' 
                                                                            : 'bg-gray-300'
                                                                    }`}
                                                                    whileHover={{ scale: 1.2 }}
                                                                    onClick={() => setCurrentEventIndex(prev => ({
                                                                        ...prev,
                                                                        [disease.name]: index
                                                                    }))}
                                                                />
                                                            ))}
                                                        </div>
                                                        <Button 
                                                            variant="outline" 
                                                            size="icon"
                                                            onClick={() => handleNextEvent(disease.name, disease.events.length)}
                                                            className="transition-transform hover:scale-105"
                                                        >
                                                            <ChevronRight className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                )}
                                            </Card>
                                        )}
                                        <Card className="bg-muted/50 animate-in fade-in slide-in-from-top-4 duration-500">
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
