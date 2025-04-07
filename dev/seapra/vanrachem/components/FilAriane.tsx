"use client";
import React from "react";
import { useParams } from "next/navigation";
import { patients } from "./HomeView";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { CalendarClock, Pill, Stethoscope, Activity, FileText } from "lucide-react"
import { Badge } from "./ui/badge";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


export default function FilAriane() {
  const params = useParams();
  const patientId = parseInt(params.slug as string);
  const patient = patients.find(p => p.id === patientId);

  const [filter, setFilter] = useState<string>("all");

  const filteredEvents = filter === "all" ? patient?.antecedents : patient?.antecedents.filter(event => event.type === filter);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "consultation":
        return <Stethoscope className="h-5 w-5" />
      case "medication":
        return <Pill className="h-5 w-5" />
      case "test":
        return <Activity className="h-5 w-5" />
      case "hospitalization":
        return <FileText className="h-5 w-5" />
      default:
        return <CalendarClock className="h-5 w-5" />
    }
  }

  const getEventBadge = (type: string) => {
    switch (type) {
      case "consultation":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
            Consultation
          </Badge>
        )
      case "medication":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
            Médicament
          </Badge>
        )
      case "test":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-50">
            Analyse
          </Badge>
        )
      case "hospitalization":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">
            Hospitalisation
          </Badge>
        )
      case "vaccination":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
            Vaccination
          </Badge>
        )
      default:
        return <Badge variant="outline">Autre</Badge>
    }
  }


  return (
    <div className="container mx-auto px-8 py-8 max-w-3xl">
      <div className="mb-4 space-y-1">
        <h1 className="text-2xl font-bold animate-in fade-in slide-in-from-top-4 duration-500">Fil d'Ariane</h1>
        <p className="text-sm text-muted-foreground animate-in fade-in slide-in-from-top-4 duration-500 delay-150">Historique chronologique des antécédents médicaux de {patient?.name}</p>

        <div className="flex items-center space-x-2 mt-6 animate-in fade-in slide-in-from-top-4 duration-500 delay-300">
          <span className="text-sm font-medium">Filtrer par type:</span>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[160px] h-8 transition-all duration-200 hover:scale-105">
              <SelectValue placeholder="Tous les événements" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-200" />
                Tous
              </SelectItem>
              <SelectItem value="consultation" className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-50 border border-blue-200" />
                Consultations
              </SelectItem>
              <SelectItem value="medication" className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-50 border border-green-200" />
                Médicaments
              </SelectItem>
              <SelectItem value="test" className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-purple-50 border border-purple-200" />
                Analyses
              </SelectItem>
              <SelectItem value="hospitalization" className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-50 border border-red-200" />
                Hospitalisations
              </SelectItem>
              <SelectItem value="vaccination" className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-50 border border-amber-200" />
                Vaccinations
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="relative">
        {/* Timeline center line */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border animate-in fade-in duration-1000" />

        <div className="space-y-6">
          {filteredEvents?.map((event, index) => (
            <div
              key={event.id}
              className={`relative flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} animate-in fade-in slide-in-from-${index % 2 === 0 ? "left" : "right"}-4 duration-500 delay-${(index + 1) * 100}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-primary z-10 transition-all duration-300 hover:scale-110 hover:shadow-md">
                {getEventIcon(event.type)}
              </div>

              {/* Content */}
              <div className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}>
                <Card className="text-sm transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                  <CardHeader className="pb-1">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{event.title}</CardTitle>
                      {getEventBadge(event.type)}
                    </div>
                    <CardDescription className="text-xs">{event.date}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p>{event.description}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Empty space for the other side */}
              <div className="w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
