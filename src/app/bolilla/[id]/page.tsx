"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface BolillaData {
  id: number;
  title: string;
  description: string;
  sections: {
    id: string;
    title: string;
    content: string[];
    concepts: { term: string; definition: string; }[];
  }[];
}

const bolillasData: Record<number, BolillaData> = {
  1: {
    id: 1,
    title: "El Acto de Conocimiento",
    description: "Fundamentos del conocimiento jurídico, clasificaciones de las ciencias y evolución histórica del pensamiento",
    sections: [
      {
        id: "conocimiento",
        title: "Descripción del Acto de Conocimiento",
        content: [
          "El conocimiento es una relación bilateral que se da entre el sujeto que conoce y el objeto a conocer que produce el enriquecimiento intelectual del sujeto a partir de cierta receptividad y actitud cognoscente.",
          "Primera etapa: Desde el siglo 6 a.C hasta la finalización del renacimiento era todo conocimiento filosófico (Realismo Filosófico)",
          "Segunda etapa: A partir de la finalización del renacimiento hasta nuestros días (Idealismo Filosófico)",
          "Evolución: Paso del mito al logos, aparición del conocimiento metódico con Sócrates y su método de la Mayéutica"
        ],
        concepts: [
          { term: "Conocimiento", definition: "Relación bilateral entre sujeto que conoce y objeto a conocer que produce enriquecimiento intelectual" },
          { term: "Mayéutica", definition: "Método socrático de preguntas y respuestas para llegar al conocimiento de la verdad" },
          { term: "Realismo Filosófico", definition: "Característica de conocer la realidad sin ponerla en duda" },
          { term: "Idealismo Filosófico", definition: "Busca construir la realidad, el sujeto crea esa realidad" }
        ]
      },
      {
        id: "tipos",
        title: "Tipos de Conocimiento",
        content: [
          "Conocimiento vulgar: Conocimiento básico, simple, ametódico, asistemático y anaxiomático",
          "Conocimiento científico: Metódico, sistemático, axiomático, comunicable, verificable y anaxiológico",
          "Conocimiento filosófico: Totalizador, apunta a la esencia última del objeto, metódico con libertad metodológica, pretendidamente anaxiomático"
        ],
        concepts: [
          { term: "Conocimiento Vulgar", definition: "Conocimiento básico obtenido por el mero transitar de la vida, superficial y ametódico" },
          { term: "Conocimiento Científico", definition: "Conocimiento metódico, sistemático y axiomático que requiere actitud de querer conocer" },
          { term: "Conocimiento Filosófico", definition: "Conocimiento totalizador que apunta a la esencia última del objeto con libertad metodológica" }
        ]
      },
      {
        id: "clasificaciones",
        title: "Clasificaciones de las Ciencias",
        content: [
          "Clasificación de Mario Bunge: Ciencias Formales (matemáticas, lógica) y Ciencias Fácticas (física, química, biología)",
          "Clasificación de Cossio: Ciencias de objetos ideales, Ciencias de objetos reales (naturaleza y cultura), Ciencias de objetos metafísicos"
        ],
        concepts: [
          { term: "Ciencias Formales", definition: "Establecen razonamientos lógicos, objeto surge de la mente humana" },
          { term: "Ciencias Fácticas", definition: "Estudian los hechos y sus relaciones, surgen de la naturaleza/realidad" },
          { term: "Ciencias de la Cultura", definition: "Analizan lo que el hombre hace en sociedad (Derecho, Historia, Filosofía)" }
        ]
      }
    ]
  },
  2: {
    id: 2,
    title: "Teoría de las Normas según Von Wright",
    description: "Análisis completo de la teoría normativa de Von Wright, tipos de normas y elementos fundamentales",
    sections: [
      {
        id: "teoria-general",
        title: "Teoría General de las Normas",
        content: [
          "Von Wright construye una teoría de las normas en general porque no solo las normas jurídicas generan algún tipo de obligación",
          "Divide las 'Leyes' en tres tipos: Leyes de la Naturaleza, Leyes del Estado, y Leyes de la lógica y matemáticas",
          "Las Leyes de la Naturaleza describen fenómenos, las del Estado prescriben conductas, las de lógica determinan pautas"
        ],
        concepts: [
          { term: "Normas Puras", definition: "Se bastan así mismas, con mencionarlas se sabe que son normas" },
          { term: "Normas Impuras", definition: "Necesitan parecerse a dos normas puras para formar parte de la teoría normativa" },
          { term: "Leyes del Estado", definition: "Obligan en el sentido más fuerte, se obedece o se aplica sanción coactiva" }
        ]
      },
      {
        id: "normas-puras",
        title: "Normas Puras",
        content: [
          "Normas Prescripciones: Obligan en el sentido más fuerte (leyes del estado, órdenes militares, órdenes paternas)",
          "Reglas Conceptuales: Incluyen leyes de lógica/matemáticas, reglas de juego, reglas gramaticales",
          "Reglas Técnicas: Reglas que debo respetar si quiero obtener éxito, contienen Proposición Anankástica"
        ],
        concepts: [
          { term: "Normas Prescripciones", definition: "Obligan con sanción coactiva, ejercicio monopólico de la fuerza por el Estado" },
          { term: "Reglas Conceptuales", definition: "Establecen pautas sin sanción coactiva (lógica, matemáticas, juegos)" },
          { term: "Proposición Anankástica", definition: "Regla interna de las reglas técnicas que indica el éxito obtenido" }
        ]
      },
      {
        id: "normas-impuras",
        title: "Normas Impuras",
        content: [
          "Reglas Consuetudinarias: Reglas de la costumbre, conducta similar como integrantes de un grupo",
          "Reglas Morales: El individuo se las da a sí mismo, son del HACER, se manifiestan en acciones",
          "Reglas Ideales: Son del SER, no se exteriorizan en actos, ligadas a pretensiones y deseos"
        ],
        concepts: [
          { term: "Reglas Consuetudinarias", definition: "Reglas de costumbre con autoridad normativa que es la misma comunidad" },
          { term: "Reglas Morales", definition: "Reglas del HACER que el individuo se da a sí mismo" },
          { term: "Reglas Ideales", definition: "Reglas del SER que quedan en el interior del individuo" }
        ]
      }
    ]
  },
  3: {
    id: 3,
    title: "Objeto de Derecho",
    description: "Análisis de las diferentes concepciones sobre qué es el Derecho y los problemas recurrentes de la ciencia jurídica",
    sections: [
      {
        id: "hart-problemas",
        title: "Problemas Recurrentes según Hart",
        content: [
          "¿Es el Derecho una orden respaldada por amenaza? Crítica al mandato del soberano de John Austin",
          "Relación entre Derecho y Moral: El problema terminológico por usar lenguaje similar",
          "¿Es el Derecho una cuestión de reglas? Hart: conjunto de reglas creadas por autoridad oficialmente organizada"
        ],
        concepts: [
          { term: "Mandato del Soberano", definition: "Teoría de Austin: el Derecho era un mandato que no sometía al soberano" },
          { term: "Autoridad Oficialmente Organizada", definition: "Para Hart, el Derecho es conjunto de reglas con obligatoriedad, perdurabilidad y generalidad" },
          { term: "Reglas Primarias", definition: "Van dirigidas a los individuos de la sociedad" }
        ]
      },
      {
        id: "escuela-egologica",
        title: "Escuela Egológica",
        content: [
          "Para Carlos Cossio el Derecho es conducta humana en interferencia intersubjetiva",
          "Conducta humana porque es fenómeno cultural, intersubjetiva por convivencia social",
          "Interferencia porque analiza aspecto pacífico y conflictivo de la conducta"
        ],
        concepts: [
          { term: "Conducta Humana en Interferencia Intersubjetiva", definition: "Definición egológica del Derecho por Carlos Cossio" },
          { term: "Objetos Culturales", definition: "Existen en el mundo real, están en la experiencia, son valiosos" },
          { term: "Objetos Egológicos", definition: "Vida humana viviente, algo que está transcurriendo ahora" }
        ]
      },
      {
        id: "teorias",
        title: "Teorías sobre el Objeto del Derecho",
        content: [
          "Teorías Normativistas: El objeto está en las normas jurídicas (Kelsen, Iusnaturalismo, Escuela Analítica)",
          "Teorías Culturalistas: El objeto está en la cultura (Escuela Tridimensional, Escuela Egológica)",
          "Teorías Sociológicas: Se encuentra en los hechos sociales (Realismo Norteamericano, Realismo Escandinavo)"
        ],
        concepts: [
          { term: "Normativismo Kelseniano", definition: "El jurista debe analizar simultáneamente el fenómeno jurídico y la norma jurídica" },
          { term: "Escuela Tridimensional", definition: "El Derecho es Hecho social, Norma jurídica y Valoración (Miguel Reale)" },
          { term: "Realismo Norteamericano", definition: "Un solo intérprete: el juez cuando dicta sentencia" }
        ]
      }
    ]
  },
  4: {
    id: 4,
    title: "Las Normas Jurídicas",
    description: "Estructura y elementos de las normas jurídicas según los análisis de Kelsen, Cossio y Hart",
    sections: [
      {
        id: "estructura-kelsen",
        title: "Análisis de Kelsen",
        content: [
          "Primera versión (1934): Dado A debe ser B. Formulación jurídica: Dado el Acto ilícito debe ser la Sanción",
          "Elementos: Sanción (más importante), Debe ser (nexo lógico imputativo), Acto ilícito",
          "Segunda versión (1953-1960): Agrega Deber jurídico y Responsabilidad como elementos auxiliares lógicos"
        ],
        concepts: [
          { term: "Lógica Imputativa del Deber Ser", definition: "Descubrimiento de Kelsen: el Derecho se maneja con probabilidades" },
          { term: "Sanción", definition: "Privación de un bien con o sin contenido económico" },
          { term: "Responsabilidad Directa", definition: "Quien comete el acto ilícito debe cumplir la sanción" }
        ]
      },
      {
        id: "estructura-cossio",
        title: "Análisis de Cossio",
        content: [
          "Formulación lógica: Dado A debe ser B o Dado no B debe ser S",
          "10 elementos: situación de convivencia, debe ser, prestación, obligado, titular, disyunción, no prestación, sanción, funcionario, pretensión comunidad",
          "Endonorma (aspecto pacífico) y Perinorma (aspecto conflictivo)"
        ],
        concepts: [
          { term: "Juicio Lógico Disyuntivo", definition: "Tiene más de una solución, posibilidad de opción" },
          { term: "Endonorma", definition: "Parte pacífica de la norma: prestación de alguien obligado frente al titular" },
          { term: "Perinorma", definition: "Parte conflictiva: sanción aplicada por funcionario por pretensión de la comunidad" }
        ]
      },
      {
        id: "estructura-hart",
        title: "Análisis de Hart",
        content: [
          "Para un verdadero ordenamiento jurídico: reglas primarias de obligación y reglas secundarias de complementación",
          "Tres defectos: falta de certeza, carácter estático, difuso control social",
          "Tres remedios: regla de reconocimiento, regla de cambio, regla de adjudicación"
        ],
        concepts: [
          { term: "Reglas Primarias de Obligación", definition: "Van dirigidas a los individuos de la sociedad" },
          { term: "Reglas Secundarias de Complementación", definition: "Van dirigidas a los órganos del Estado" },
          { term: "Regla de Reconocimiento", definition: "Soluciona la falta de certeza, dirigida a todos los órganos del ordenamiento jurídico" }
        ]
      }
    ]
  },
  7: {
    id: 7,
    title: "Fuentes del Derecho",
    description: "Análisis de los diferentes sentidos de fuentes del derecho, legislación y codificación",
    sections: [
      {
        id: "sentidos-fuentes",
        title: "Sentidos de 'Fuentes del Derecho'",
        content: [
          "Corriente tradicional: modo de creación. Derecho Continental Europeo vs Derecho Anglosajón",
          "Fuentes como factores extrajurídicos: posición de la Escuela Histórica (Savigny)",
          "Fuentes como fundamento de validez: posición de Hans Kelsen",
          "Posición de Julio Cueto Rua: todas las fuentes son formales y materiales simultáneamente"
        ],
        concepts: [
          { term: "Derecho Continental Europeo", definition: "De raíz romanista, escrito, codificado. Principal fuente: la Ley" },
          { term: "Derecho Anglosajón", definition: "Fuentes: Costumbre (hasta s.XVI), luego Jurisprudencia como principal" },
          { term: "Espíritu del Pueblo", definition: "Para Savigny, reglas que el pueblo alemán debía acatar según su evolución histórica" }
        ]
      },
      {
        id: "legislacion",
        title: "Legislación",
        content: [
          "Conjunto de normas jurídicas que rigen a un Estado y emanan del poder legislativo",
          "Procedimiento: Proyecto de Ley → Debate y Sanción → Promulgación → Publicación",
          "Ley formal: ha seguido todos los procedimientos. Ley material: contenido jurídico sin todos los procedimientos"
        ],
        concepts: [
          { term: "Ley en Sentido Formal", definition: "Ha seguido todos los procedimientos establecidos para su constitución" },
          { term: "Ley en Sentido Material", definition: "Contenido jurídico sin seguir todos los procedimientos (ej: decreto)" },
          { term: "Leyes Imperativas", definition: "No pueden dejarse de lado, son de orden público, cumplimiento inexcusable" }
        ]
      },
      {
        id: "codificacion",
        title: "Codificación",
        content: [
          "Forma de legislar concentrando normas en un cuerpo orgánico y sistemático de una rama específica",
          "Ventajas: ubicación precisa, sistema comprensivo de conceptos, instrumento claro",
          "Desventajas: Savigny temía que cristalizara el Derecho y perdiera carácter evolutivo",
          "Polémica Thibaut vs Savigny (1814): retrasó codificación alemana 86 años"
        ],
        concepts: [
          { term: "Código", definition: "Cuerpo orgánico y sistemático referido a una rama específica del derecho" },
          { term: "Recopilación", definition: "No se refiere a rama específica, puede incluir diferentes temas" },
          { term: "Código Abierto", definition: "Posibilidad de que se sumen paulatinamente normas al cuerpo normativo" }
        ]
      }
    ]
  },
  12: {
    id: 12,
    title: "Historia del Pensamiento Jurídico",
    description: "Evolución histórica del pensamiento jurídico desde Oriente hasta el criticismo moderno",
    sections: [
      {
        id: "oriente-grecia-roma",
        title: "Oriente, Grecia y Roma",
        content: [
          "Egipto: Teocracia con el faraón como dios, justicia por sacerdotes de Maat",
          "Grecia: Platón (justicia como equilibrio), Aristóteles (justicia distributiva y correctiva)",
          "Roma: Cicerón (derecho natural universal), desarrollo del ius civile, ius gentium, ius naturale"
        ],
        concepts: [
          { term: "Maat", definition: "Diosa egipcia de la justicia, su pluma se usaba para pesar el corazón en el juicio de Osiris" },
          { term: "Ius Civile", definition: "Derecho civil romano aplicable a ciudadanos romanos" },
          { term: "Ius Gentium", definition: "Derecho de gentes, aplicable a extranjeros en Roma" }
        ]
      },
      {
        id: "edad-media",
        title: "Edad Media y Escolástica",
        content: [
          "Santo Tomás de Aquino: unión de filosofía aristotélica con cristianismo",
          "División de leyes: Eterna (plan divino), Divina (revelada), Natural (razón humana), Humana (creada por el hombre)",
          "Justicia como virtud moral con tipos: legal, conmutativa y distributiva"
        ],
        concepts: [
          { term: "Ley Eterna", definition: "Plan de Dios para todas las cosas del universo" },
          { term: "Ley Natural", definition: "Parte de la ley eterna dirigida a humanos, captada por la razón (sindéresis)" },
          { term: "Sindéresis", definition: "Proceso por el cual la razón humana capta los principios del derecho natural" }
        ]
      },
      {
        id: "positivismo-criticismo",
        title: "Positivismo y Criticismo Jurídico",
        content: [
          "Positivismo: influido por ciencias naturales, método empírico, separación derecho-moral",
          "Materialismo histórico: Marx y Engels, historia determinada por condiciones económicas",
          "Criticismo: Escuela de Marburgo (logicista) y Escuela de Baden (eticista), relativismo de Radbruch"
        ],
        concepts: [
          { term: "Positivismo Criminológico", definition: "Lombroso (criminal nato), Ferri (factores sociales), Garofalo (peligrosidad)" },
          { term: "Materialismo Histórico", definition: "Base económica determina superestructura (ideas, derecho, política)" },
          { term: "Relativismo de Radbruch", definition: "La justicia es relativa según concepciones políticas de cada comunidad" }
        ]
      }
    ]
  }
};

function BolillaContent({ bolillaId, bolilla }: { bolillaId: number; bolilla: BolillaData }) {
  const [currentSection, setCurrentSection] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => window.location.href = "/"}
              >
                ← Volver
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Bolilla {bolilla.id}: {bolilla.title}
                </h1>
                <p className="text-gray-600">{bolilla.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">0%</div>
                <div className="text-sm text-gray-500">Progreso</div>
              </div>
            </div>
          </div>
          <Progress value={0} className="mt-4 h-2" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de navegación */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Contenidos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {bolilla.sections.map((section) => (
                  <Button
                    key={section.id}
                    variant={currentSection === section.id ? "default" : "ghost"}
                    className="w-full justify-start text-left"
                    onClick={() => setCurrentSection(section.id)}
                  >
                    {section.title}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="contenido" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="contenido">📚 Contenido</TabsTrigger>
                <TabsTrigger value="conceptos">💡 Conceptos Clave</TabsTrigger>
                <TabsTrigger value="resumen">📄 Resumen</TabsTrigger>
              </TabsList>

              <TabsContent value="contenido" className="space-y-6">
                {currentSection === "" ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Bienvenido a la Bolilla {bolilla.id}</CardTitle>
                      <CardDescription>
                        Selecciona una sección del menú lateral para comenzar a estudiar.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {bolilla.sections.map((section) => (
                          <Card key={section.id} className="cursor-pointer hover:shadow-md transition-shadow">
                            <CardHeader>
                              <CardTitle className="text-base">{section.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <Button 
                                variant="outline" 
                                className="w-full"
                                onClick={() => setCurrentSection(section.id)}
                              >
                                Estudiar →
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {bolilla.sections
                      .filter(section => section.id === currentSection)
                      .map((section) => (
                        <Card key={section.id}>
                          <CardHeader>
                            <CardTitle>{section.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {section.content.map((paragraph, index) => (
                              <p key={index} className="text-gray-700 leading-relaxed">
                                {paragraph}
                              </p>
                            ))}
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="conceptos" className="space-y-6">
                {currentSection === "" ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Conceptos Clave</CardTitle>
                      <CardDescription>
                        Selecciona una sección para ver sus conceptos clave.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {bolilla.sections
                      .filter(section => section.id === currentSection)
                      .map((section) => (
                        <Card key={section.id}>
                          <CardHeader>
                            <CardTitle>Conceptos Clave - {section.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {section.concepts.map((concept, index) => (
                                <div key={index} className="border-l-4 border-indigo-500 pl-4">
                                  <h4 className="font-semibold text-indigo-700 mb-2">
                                    {concept.term}
                                  </h4>
                                  <p className="text-gray-600">
                                    {concept.definition}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="resumen" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Resumen de la Bolilla {bolilla.id}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {bolilla.sections.map((section) => (
                        <AccordionItem key={section.id} value={section.id}>
                          <AccordionTrigger>{section.title}</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">Contenido principal:</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                  {section.content.slice(0, 2).map((point, index) => (
                                    <li key={index} className="text-gray-700 text-sm">
                                      {point.substring(0, 100)}...
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Conceptos clave:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {section.concepts.map((concept, index) => (
                                    <Badge key={index} variant="secondary">
                                      {concept.term}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Botones de navegación */}
            <div className="flex justify-between items-center mt-8">
              <Button 
                variant="outline"
                onClick={() => {
                  const url = `${window.location.origin}/flashcards/bolilla-${bolilla.id}`;
                  window.location.href = url;
                }}
              >
                📚 Flashcards
              </Button>
              <div className="flex space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => {
                    const url = `${window.location.origin}/mapas/bolilla-${bolilla.id}`;
                    window.location.href = url;
                  }}
                >
                  🧠 Mapa Conceptual
                </Button>
                <Button 
                  onClick={() => {
                    const url = `${window.location.origin}/bolilla/${bolilla.id}/examen`;
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
    </div>
  );
}

export default async function BolillaPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const bolillaId = parseInt(resolvedParams.id);
  const bolilla = bolillasData[bolillaId];

  if (!bolilla) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Bolilla no encontrada</CardTitle>
            <CardDescription>La bolilla {resolvedParams.id} no existe o no está disponible.</CardDescription>
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

  return <BolillaContent bolillaId={bolillaId} bolilla={bolilla} />;
}