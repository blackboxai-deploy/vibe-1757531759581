"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Brain, Gamepad2, FileText, Trophy, Clock } from "lucide-react";

interface Bolilla {
  id: number;
  title: string;
  topics: string[];
  progress: number;
  difficulty: "Básico" | "Intermedio" | "Avanzado";
  estimatedTime: string;
}

const bolillas: Bolilla[] = [
  {
    id: 1,
    title: "El Acto de Conocimiento",
    topics: ["Conocimiento vulgar, científico y filosófico", "Clasificaciones de las ciencias", "Objeto y método", "Evolución histórica del pensamiento"],
    progress: 0,
    difficulty: "Básico",
    estimatedTime: "2-3 horas"
  },
  {
    id: 2,
    title: "Teoría de las Normas según Von Wright",
    topics: ["Normas prescripciones", "Reglas conceptuales y técnicas", "Normas consuetudinarias, morales e ideales", "Acción y actividad"],
    progress: 0,
    difficulty: "Intermedio",
    estimatedTime: "3-4 horas"
  },
  {
    id: 3,
    title: "Objeto de Derecho",
    topics: ["Problemas recurrentes de Hart", "Concepto de Derecho para la Escuela Egológica", "Teoría de los objetos", "Corrientes iuspositivistas y iusnaturalistas"],
    progress: 0,
    difficulty: "Avanzado",
    estimatedTime: "4-5 horas"
  },
  {
    id: 4,
    title: "Las Normas Jurídicas",
    topics: ["Estructura y elementos", "Análisis de Cossio, Kelsen y Hart", "Teoría pura del Derecho", "Esquema de interpretación"],
    progress: 0,
    difficulty: "Avanzado",
    estimatedTime: "4-5 horas"
  },
  {
    id: 7,
    title: "Fuentes del Derecho",
    topics: ["Sentidos de fuentes del derecho", "Fuentes formales y materiales", "Legislación", "Codificación vs Recopilación"],
    progress: 0,
    difficulty: "Intermedio",
    estimatedTime: "3-4 horas"
  },
  {
    id: 12,
    title: "Historia del Pensamiento Jurídico",
    topics: ["Pensamiento en Oriente, Grecia y Roma", "Edad Media y Escolástica", "Positivismo jurídico", "Criticismo jurídico"],
    progress: 0,
    difficulty: "Intermedio",
    estimatedTime: "3-4 horas"
  }
];

export default function HomePage() {
  const [selectedBolilla, setSelectedBolilla] = useState<number | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Básico": return "bg-green-100 text-green-800";
      case "Intermedio": return "bg-yellow-100 text-yellow-800";
      case "Avanzado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-600 p-3 rounded-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Introducción al Derecho</h1>
                <p className="text-gray-600">Plataforma interactiva de estudio</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">6</div>
                <div className="text-sm text-gray-500">Bolillas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">0%</div>
                <div className="text-sm text-gray-500">Progreso</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="bolillas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bolillas">Bolillas</TabsTrigger>
            <TabsTrigger value="mapas">Mapas Conceptuales</TabsTrigger>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="juegos">Juegos</TabsTrigger>
          </TabsList>

          <TabsContent value="bolillas" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bolillas.map((bolilla) => (
                <Card key={bolilla.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Bolilla {bolilla.id}</CardTitle>
                      <Badge className={getDifficultyColor(bolilla.difficulty)}>
                        {bolilla.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="font-semibold text-gray-900">
                      {bolilla.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progreso</span>
                        <span className="font-medium">{bolilla.progress}%</span>
                      </div>
                      <Progress value={bolilla.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {bolilla.estimatedTime}
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Temas principales:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {bolilla.topics.slice(0, 2).map((topic, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                        {bolilla.topics.length > 2 && (
                          <li className="text-indigo-600 font-medium">
                            +{bolilla.topics.length - 2} temas más
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-4">
                      <Button 
                        size="sm" 
                        className="flex items-center space-x-1"
                        onClick={() => window.location.href = `/bolilla/${bolilla.id}`}
                      >
                        <BookOpen className="h-4 w-4" />
                        <span>Estudiar</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.location.href = `/bolilla/${bolilla.id}/examen`}
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Examen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mapas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-6 w-6" />
                  <span>Mapas Conceptuales</span>
                </CardTitle>
                <CardDescription>
                  Visualiza las relaciones entre conceptos jurídicos de forma interactiva
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bolillas.map((bolilla) => (
                    <Button
                      key={bolilla.id}
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center space-y-2"
                      onClick={() => window.location.href = `/mapas/bolilla-${bolilla.id}`}
                    >
                      <Brain className="h-8 w-8" />
                      <span className="text-sm">Bolilla {bolilla.id}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flashcards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-6 w-6" />
                  <span>Flashcards</span>
                </CardTitle>
                <CardDescription>
                  Memoriza conceptos clave con tarjetas interactivas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bolillas.map((bolilla) => (
                    <Button
                      key={bolilla.id}
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center space-y-2"
                      onClick={() => window.location.href = `/flashcards/bolilla-${bolilla.id}`}
                    >
                      <BookOpen className="h-8 w-8" />
                      <span className="text-sm">Bolilla {bolilla.id}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="juegos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gamepad2 className="h-6 w-6" />
                  <span>Juegos Educativos</span>
                </CardTitle>
                <CardDescription>
                  Aprende de forma divertida con juegos interactivos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-32 flex flex-col items-center justify-center space-y-2"
                    onClick={() => window.location.href = '/juegos/quiz'}
                  >
                    <Trophy className="h-12 w-12" />
                    <span>Quiz Rápido</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-32 flex flex-col items-center justify-center space-y-2"
                    onClick={() => window.location.href = '/juegos/memoria'}
                  >
                    <Brain className="h-12 w-12" />
                    <span>Memoria</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-32 flex flex-col items-center justify-center space-y-2"
                    onClick={() => window.location.href = '/juegos/asociacion'}
                  >
                    <BookOpen className="h-12 w-12" />
                    <span>Asociación</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-32 flex flex-col items-center justify-center space-y-2"
                    onClick={() => window.location.href = '/juegos/completar'}
                  >
                    <FileText className="h-12 w-12" />
                    <span>Completar</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}