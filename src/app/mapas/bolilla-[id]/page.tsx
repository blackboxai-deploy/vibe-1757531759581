"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ConceptNode {
  id: string;
  label: string;
  description: string;
  level: number;
  connections: string[];
  category: string;
}

interface ConceptMap {
  title: string;
  description: string;
  nodes: ConceptNode[];
}

const conceptMaps: Record<number, ConceptMap> = {
  1: {
    title: "El Acto de Conocimiento",
    description: "Mapa conceptual de los fundamentos del conocimiento jurídico",
    nodes: [
      {
        id: "conocimiento",
        label: "CONOCIMIENTO",
        description: "Relación bilateral entre sujeto que conoce y objeto a conocer",
        level: 1,
        connections: ["vulgar", "cientifico", "filosofico"],
        category: "central"
      },
      {
        id: "vulgar",
        label: "Conocimiento Vulgar",
        description: "Ametódico, asistemático, anaxiomático",
        level: 2,
        connections: [],
        category: "tipo"
      },
      {
        id: "cientifico",
        label: "Conocimiento Científico",
        description: "Metódico, sistemático, axiomático, comunicable",
        level: 2,
        connections: [],
        category: "tipo"
      },
      {
        id: "filosofico",
        label: "Conocimiento Filosófico",
        description: "Totalizador, libertad metodológica, pretendidamente anaxiomático",
        level: 2,
        connections: [],
        category: "tipo"
      }
    ]
  },
  2: {
    title: "Teoría de las Normas - Von Wright",
    description: "Sistema clasificatorio de normas según Georg Henrik von Wright",
    nodes: [
      {
        id: "normas",
        label: "NORMAS",
        description: "Sistema general de Von Wright",
        level: 1,
        connections: ["puras", "impuras"],
        category: "central"
      },
      {
        id: "puras",
        label: "Normas Puras",
        description: "Se bastan a sí mismas",
        level: 2,
        connections: ["prescripciones", "conceptuales", "tecnicas"],
        category: "categoria"
      },
      {
        id: "impuras",
        label: "Normas Impuras",
        description: "Necesitan parecerse a dos normas puras",
        level: 2,
        connections: ["consuetudinarias", "morales", "ideales"],
        category: "categoria"
      },
      {
        id: "prescripciones",
        label: "Normas Prescripciones",
        description: "Obligan en sentido más fuerte",
        level: 3,
        connections: [],
        category: "tipo-pura"
      },
      {
        id: "conceptuales",
        label: "Reglas Conceptuales",
        description: "Establecen pautas a seguir",
        level: 3,
        connections: [],
        category: "tipo-pura"
      },
      {
        id: "tecnicas",
        label: "Reglas Técnicas",
        description: "Para obtener éxito",
        level: 3,
        connections: [],
        category: "tipo-pura"
      },
      {
        id: "consuetudinarias",
        label: "Reglas Consuetudinarias",
        description: "Reglas de la costumbre",
        level: 3,
        connections: [],
        category: "tipo-impura"
      },
      {
        id: "morales",
        label: "Reglas Morales",
        description: "Del HACER, se exteriorizan",
        level: 3,
        connections: [],
        category: "tipo-impura"
      },
      {
        id: "ideales",
        label: "Reglas Ideales",
        description: "Del SER, no se exteriorizan",
        level: 3,
        connections: [],
        category: "tipo-impura"
      }
    ]
  }
};

function MapaContent({ bolillaId, conceptMap }: { bolillaId: number; conceptMap: ConceptMap }) {
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(null);
  const [highlightedNodes, setHighlightedNodes] = useState<Set<string>>(new Set());



  const handleNodeClick = (node: ConceptNode) => {
    setSelectedNode(node);
    const connected = new Set([node.id, ...node.connections]);
    setHighlightedNodes(connected);
  };

  const getNodeColor = (category: string, isHighlighted: boolean, isSelected: boolean) => {
    const baseColors = {
      central: "bg-purple-500 text-white",
      categoria: "bg-blue-500 text-white", 
      teoria: "bg-indigo-500 text-white",
      tipo: "bg-green-500 text-white",
      detalle: "bg-gray-500 text-white",
      historia: "bg-orange-500 text-white",
      filosofo: "bg-red-500 text-white",
      metodo: "bg-yellow-500 text-black",
      "tipo-pura": "bg-emerald-500 text-white",
      "tipo-impura": "bg-teal-500 text-white",
      ejemplo: "bg-cyan-500 text-white",
      concepto: "bg-pink-500 text-white",
      autor: "bg-violet-500 text-white",
      corriente: "bg-blue-600 text-white"
    };

    if (isSelected) {
      return "bg-yellow-400 text-black border-4 border-yellow-600";
    }
    if (isHighlighted) {
      return `${baseColors[category as keyof typeof baseColors] || "bg-gray-500 text-white"} ring-4 ring-yellow-300`;
    }
    return baseColors[category as keyof typeof baseColors] || "bg-gray-500 text-white";
  };

  const getNodePosition = (level: number, index: number, total: number) => {
    const levelWidth = 100 / 5;
    const nodeSpacing = 80 / (total + 1);
    return {
      left: `${level * levelWidth}%`,
      top: `${10 + (index + 1) * nodeSpacing}%`
    };
  };

  const nodesByLevel = conceptMap.nodes.reduce((acc, node) => {
    if (!acc[node.level]) acc[node.level] = [];
    acc[node.level].push(node);
    return acc;
  }, {} as Record<number, ConceptNode[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => window.location.href = `/bolilla/${bolillaId}`}
              >
                ← Volver
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  🧠 {conceptMap.title}
                </h1>
                <p className="text-gray-600">{conceptMap.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedNode(null);
                  setHighlightedNodes(new Set());
                }}
              >
                🔄 Limpiar selección
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedNode ? selectedNode.label : "Información"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedNode ? (
                  <>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Descripción:</h4>
                      <p className="text-gray-600 text-sm">{selectedNode.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Nivel:</h4>
                      <Badge variant="outline">{selectedNode.level}</Badge>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Categoría:</h4>
                      <Badge variant="secondary">{selectedNode.category}</Badge>
                    </div>
                    {selectedNode.connections.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Conectado con:</h4>
                        <div className="space-y-1">
                          {selectedNode.connections.map(connId => {
                            const connNode = conceptMap.nodes.find(n => n.id === connId);
                            return connNode ? (
                              <div key={connId} className="text-sm text-gray-600">
                                • {connNode.label}
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-gray-600 text-sm">
                    <p className="mb-4">Haz clic en cualquier concepto para ver más información y sus conexiones.</p>
                    <div>
                      <h4 className="font-semibold mb-2">Leyenda de colores:</h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-purple-500 rounded"></div>
                          <span>Concepto central</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-blue-500 rounded"></div>
                          <span>Categorías</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-500 rounded"></div>
                          <span>Tipos</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="h-[600px] relative overflow-hidden">
              <CardHeader>
                <CardTitle>Mapa Conceptual Interactivo</CardTitle>
                <CardDescription>
                  Haz clic en los conceptos para explorar sus relaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="relative h-full">
                <div className="relative w-full h-[500px]">
                  {Object.entries(nodesByLevel).map(([level, nodes]) =>
                    nodes.map((node, index) => {
                      const position = getNodePosition(parseInt(level) - 1, index, nodes.length);
                      const isHighlighted = highlightedNodes.has(node.id);
                      const isSelected = selectedNode?.id === node.id;
                      
                      return (
                        <div
                          key={node.id}
                          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-105 ${getNodeColor(node.category, isHighlighted, isSelected)} px-4 py-2 rounded-lg text-sm font-medium shadow-lg max-w-[150px] text-center`}
                          style={position}
                          onClick={() => handleNodeClick(node)}
                        >
                          {node.label}
                        </div>
                      );
                    })
                  )}
                  
                  {/* Líneas de conexión */}
                  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    {conceptMap.nodes.map(node => 
                      node.connections.map(connId => {
                        const connNode = conceptMap.nodes.find(n => n.id === connId);
                        if (!connNode) return null;
                        
                        const nodeLevel = nodesByLevel[node.level];
                        const connLevel = nodesByLevel[connNode.level];
                        
                        const nodeIndex = nodeLevel.indexOf(node);
                        const connIndex = connLevel.indexOf(connNode);
                        
                        const startPos = getNodePosition(node.level - 1, nodeIndex, nodeLevel.length);
                        const endPos = getNodePosition(connNode.level - 1, connIndex, connLevel.length);
                        
                        const isHighlighted = highlightedNodes.has(node.id) && highlightedNodes.has(connId);
                        
                        return (
                          <line
                            key={`${node.id}-${connId}`}
                            x1={startPos.left}
                            y1={startPos.top}
                            x2={endPos.left}
                            y2={endPos.top}
                            stroke={isHighlighted ? "#fbbf24" : "#d1d5db"}
                            strokeWidth={isHighlighted ? "3" : "2"}
                            className="transition-all duration-200"
                          />
                        );
                      })
                    )}
                  </svg>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-6 flex justify-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => {
                  const url = `${window.location.origin}/flashcards/bolilla-${bolillaId}`;
                  window.location.href = url;
                }}
              >
                📚 Flashcards
              </Button>
              <Button 
                onClick={() => {
                  const url = `${window.location.origin}/bolilla/${bolillaId}/examen`;
                  window.location.href = url;
                }}
              >
                📝 Tomar Examen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function MapaConceptualPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const paramId = resolvedParams.id || "";
  const bolillaId = parseInt(paramId.replace("bolilla-", ""));
  const conceptMap = conceptMaps[bolillaId];

  if (!conceptMap) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Mapa no disponible</CardTitle>
            <CardDescription>El mapa conceptual para la bolilla {bolillaId} no está disponible.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = "/"}>
              Volver al inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <MapaContent bolillaId={bolillaId} conceptMap={conceptMap} />;
}