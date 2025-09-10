"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: "Fácil" | "Medio" | "Difícil";
}

const flashcardsData: Record<number, Flashcard[]> = {
  1: [
    {
      id: 1,
      question: "¿Qué es el conocimiento según la teoría del conocimiento?",
      answer: "Es una relación bilateral que se da entre el sujeto que conoce y el objeto a conocer que produce el enriquecimiento intelectual del sujeto a partir de cierta receptividad y actitud cognoscente.",
      category: "Acto de Conocimiento",
      difficulty: "Medio"
    },
    {
      id: 2,
      question: "¿Cuáles son las características del conocimiento vulgar?",
      answer: "Conocimiento básico, simple, ametódico (no requiere método), asistemático (no hay concatenación lógica), anaxiomático (no parte de dogmas), se obtiene por el mero transitar la vida.",
      category: "Tipos de Conocimiento",
      difficulty: "Fácil"
    },
    {
      id: 3,
      question: "¿Qué es la Mayéutica de Sócrates?",
      answer: "Método socrático que consiste en ir haciendo preguntas y obteniendo respuestas cada vez más precisas para llegar a conocer la verdad. Tiene una parte destructiva (pars destruens) y una constructiva (pars construens).",
      category: "Evolución Histórica",
      difficulty: "Medio"
    },
    {
      id: 4,
      question: "¿Cómo clasifica Mario Bunge las ciencias?",
      answer: "Ciencias Formales: establecen razonamientos lógicos, objeto surge de la mente (matemáticas). Ciencias Fácticas: estudian hechos y relaciones, surgen de la naturaleza (física, química).",
      category: "Clasificación de Ciencias",
      difficulty: "Medio"
    },
    {
      id: 5,
      question: "¿Qué diferencias hay entre conocimiento científico y filosófico?",
      answer: "Científico: metódico, sistemático, axiomático, parte de hechos. Filosófico: totalizador, apunta a esencia última, libertad metodológica, pretendidamente anaxiomático (pone verdades en tela de juicio).",
      category: "Tipos de Conocimiento",
      difficulty: "Difícil"
    }
  ],
  2: [
    {
      id: 6,
      question: "¿Qué son las normas puras según Von Wright?",
      answer: "Son normas que se bastan a sí mismas, ya con mencionarlas se sabe que estamos en presencia de normas. Incluye: Normas Prescripciones, Reglas Conceptuales y Reglas Técnicas.",
      category: "Teoría de Normas",
      difficulty: "Medio"
    },
    {
      id: 7,
      question: "¿Qué caracteriza a las Normas Prescripciones?",
      answer: "Obligan en el sentido más fuerte de la palabra, donde encontramos las leyes del estado, órdenes verbales militares y órdenes de padres a hijos. Tienen sanción coactiva aplicada por el Estado.",
      category: "Normas Puras",
      difficulty: "Medio"
    },
    {
      id: 8,
      question: "¿Qué es la Proposición Anankástica?",
      answer: "Es la regla interna dentro de las reglas técnicas. Me permite saber si he obtenido éxito al seguir la regla técnica. Es específica de las reglas técnicas.",
      category: "Reglas Técnicas",
      difficulty: "Difícil"
    },
    {
      id: 9,
      question: "¿Cómo se diferencian las reglas morales de las ideales?",
      answer: "Reglas Morales: son del HACER, se exteriorizan en acciones del individuo. Reglas Ideales: son del SER, no se exteriorizan en actos, quedan en el interior, ligadas a pretensiones y deseos.",
      category: "Normas Impuras",
      difficulty: "Difícil"
    },
    {
      id: 10,
      question: "¿Qué son los grados de abstención según Von Wright?",
      answer: "Grado inicial: puedo hacer pero no lo hago. Grado de oportunidad: me abstengo ahora. Grado de opción: elijo no hacerlo. Grado de decisión: decido no hacerlo pese a tener deseos.",
      category: "Actos y Omisiones",
      difficulty: "Medio"
    }
  ],
  3: [
    {
      id: 11,
      question: "¿Cuáles son los tres problemas recurrentes que analiza Hart?",
      answer: "1) ¿Es el Derecho una orden respaldada por amenaza? 2) Relación entre Derecho y Moral 3) ¿Es el Derecho una cuestión de reglas?",
      category: "Problemas de Hart",
      difficulty: "Medio"
    },
    {
      id: 12,
      question: "¿Cómo define Carlos Cossio el Derecho?",
      answer: "El Derecho es conducta humana en interferencia intersubjetiva. Conducta humana porque es fenómeno cultural, intersubjetiva por convivencia social, interferencia porque analiza aspecto pacífico y conflictivo.",
      category: "Escuela Egológica",
      difficulty: "Medio"
    },
    {
      id: 13,
      question: "¿Qué son los objetos culturales según Husserl-Cossio?",
      answer: "Existen en el mundo real, están en la experiencia, son valiosos positiva o negativamente. Método empírico dialéctico. Acto gnoseológico: comprensión. Tienen sustrato material y sentido espiritual.",
      category: "Teoría de Objetos",
      difficulty: "Difícil"
    },
    {
      id: 14,
      question: "¿Cuál es la diferencia entre teorías normativistas y culturalistas?",
      answer: "Normativistas: el objeto del derecho está en las normas jurídicas (Kelsen). Culturalistas: el objeto está en la cultura, todo lo que individuos hacen en sociedad (Cossio, Escuela Tridimensional).",
      category: "Teorías del Derecho",
      difficulty: "Difícil"
    },
    {
      id: 15,
      question: "¿Qué establece la Escuela Tridimensional del Derecho?",
      answer: "Creada por Miguel Reale en Brasil. El Derecho es la integración de tres elementos: Hecho social, Norma jurídica y Valoración. Todos son igualmente importantes y se complementan.",
      category: "Teorías Culturalistas",
      difficulty: "Medio"
    }
  ],
  4: [
    {
      id: 16,
      question: "¿Cuál es la formulación lógica de Kelsen para las normas jurídicas?",
      answer: "Formulación lógica: Dado A debe ser B. Formulación jurídica: Dado el Acto ilícito debe ser la Sanción. Utiliza juicio lógico hipotético con lógica imputativa del deber ser.",
      category: "Análisis de Kelsen",
      difficulty: "Medio"
    },
    {
      id: 17,
      question: "¿Cuáles son los elementos de la norma jurídica según Kelsen (1934)?",
      answer: "1) La Sanción (elemento más importante, privación de un bien), 2) El Debe ser (nexo lógico imputativo), 3) El acto ilícito (acto que corresponde una sanción jurídica).",
      category: "Estructura Kelseniana",
      difficulty: "Medio"
    },
    {
      id: 18,
      question: "¿Qué agrega Kelsen en su segunda versión (1953-1960)?",
      answer: "Agrega como elementos auxiliares lógicos: 4) Deber jurídico (conducta que debe tener el individuo), 5) Responsabilidad (a quién va dirigida la sanción). Forman parte de la norma secundaria.",
      category: "Teoría Pura Evolución",
      difficulty: "Difícil"
    },
    {
      id: 19,
      question: "¿Cómo estructura Cossio la norma jurídica?",
      answer: "Formulación disyuntiva: Dado A debe ser B O Dado no B debe ser S. 10 elementos: 8 variables y 2 estables (debe ser y disyunción). Endonorma (aspecto pacífico) y Perinorma (aspecto conflictivo).",
      category: "Análisis de Cossio",
      difficulty: "Difícil"
    },
    {
      id: 20,
      question: "¿Cuáles son los tres defectos y remedios según Hart?",
      answer: "Defectos: 1) Falta de certeza, 2) Carácter estático, 3) Difuso control social. Remedios: 1) Regla de reconocimiento, 2) Regla de cambio, 3) Regla de adjudicación.",
      category: "Análisis de Hart",
      difficulty: "Difícil"
    }
  ],
  7: [
    {
      id: 21,
      question: "¿Cuáles son los sentidos de 'fuentes del derecho'?",
      answer: "1) Modo de creación (Continental vs Anglosajón), 2) Factores extrajurídicos (Escuela Histórica), 3) Fundamento de validez (Kelsen), 4) Posición de Cueto Rua, 5) Grados de objetivación (Ross).",
      category: "Fuentes del Derecho",
      difficulty: "Medio"
    },
    {
      id: 22,
      question: "¿Qué diferencia hay entre Derecho Continental y Anglosajón?",
      answer: "Continental: de raíz romanista, escrito, codificado, principal fuente es la Ley. Anglosajón: principal fuente era Costumbre (hasta s.XVI), luego Jurisprudencia, después Ley y Doctrina.",
      category: "Sistemas Jurídicos",
      difficulty: "Medio"
    },
    {
      id: 23,
      question: "¿Qué establece la posición de la Escuela Histórica sobre las fuentes?",
      answer: "Para Savigny, las fuentes principales eran la costumbre y el lenguaje. La ley estaba sometida a la costumbre. Las 'reglas del espíritu del pueblo' eran las que debía acatar el pueblo alemán.",
      category: "Escuela Histórica",
      difficulty: "Difícil"
    },
    {
      id: 24,
      question: "¿Cuál es la diferencia entre ley formal y material?",
      answer: "Ley formal: ha seguido todos los procedimientos establecidos para su constitución. Ley material: tiene contenido jurídico pero no ha seguido todos los procedimientos (ej: decreto).",
      category: "Legislación",
      difficulty: "Fácil"
    },
    {
      id: 25,
      question: "¿Qué ventajas y desventajas tiene la codificación?",
      answer: "Ventajas: ubicación precisa, sistema comprensivo, instrumento claro. Desventajas: Savigny temía que cristalizara el Derecho y perdiera su carácter evolutivo y dinámico.",
      category: "Codificación",
      difficulty: "Medio"
    }
  ],
  12: [
    {
      id: 26,
      question: "¿Cómo funcionaba la justicia en el Antiguo Egipto?",
      answer: "Teocracia con el faraón como dios. Justicia administrada por sacerdotes del culto a Maat (diosa de la justicia). Juicio de Osiris: corazón del difunto se pesaba contra la pluma de Maat.",
      category: "Derecho en Oriente",
      difficulty: "Fácil"
    },
    {
      id: 27,
      question: "¿Cuáles son los tipos de justicia según Aristóteles?",
      answer: "Justicia Distributiva: dar a cada uno según su mérito. Justicia Correctiva: reparar el daño causado, restablecer el equilibrio. Ambas fundadas en la razón y la equidad.",
      category: "Filosofía Griega",
      difficulty: "Medio"
    },
    {
      id: 28,
      question: "¿Cómo divide Santo Tomás las leyes?",
      answer: "1) Ley Eterna (plan divino para todo), 2) Ley Divina (revelada a los hombres), 3) Ley Natural (captada por razón/sindéresis), 4) Ley Humana (derecho positivo creado por hombres).",
      category: "Escolástica",
      difficulty: "Medio"
    },
    {
      id: 29,
      question: "¿Qué establece la teoría del criminal nato de Lombroso?",
      answer: "El delincuente es así por naturaleza, tiene características físicas que lo denotan: frente ancha, ojos grandes, brazos largos, rasgos siniestros. Establece estigmas somáticos del delincuente.",
      category: "Positivismo Criminológico",
      difficulty: "Medio"
    },
    {
      id: 30,
      question: "¿Qué es el relativismo de Radbruch?",
      answer: "La justicia es relativa según concepciones políticas: individualistas (libertad individual), supraindividualistas (idea de nación), transpersonalistas (protección de la cultura). No existe justicia absoluta.",
      category: "Criticismo Jurídico",
      difficulty: "Difícil"
    }
  ]
};

function FlashcardsContent({ bolillaId, flashcards }: { bolillaId: number; flashcards: Flashcard[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Set<number>>(new Set());
  const [correctAnswers, setCorrectAnswers] = useState<Set<number>>(new Set());
  const [mode, setMode] = useState<"study" | "review">("study");

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setStudiedCards(prev => new Set(prev).add(currentCard.id));
    }
  };

  const handleMarkCorrect = (correct: boolean) => {
    if (correct) {
      setCorrectAnswers(prev => new Set(prev).add(currentCard.id));
    } else {
      setCorrectAnswers(prev => {
        const newSet = new Set(prev);
        newSet.delete(currentCard.id);
        return newSet;
      });
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-green-100 text-green-800";
      case "Medio": return "bg-yellow-100 text-yellow-800";
      case "Difícil": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
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
                  📚 Flashcards - Bolilla {bolillaId}
                </h1>
                <p className="text-gray-600">
                  {currentIndex + 1} de {flashcards.length} tarjetas
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {Math.round(progress)}%
                </div>
                <div className="text-sm text-gray-500">Progreso</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {correctAnswers.size}
                </div>
                <div className="text-sm text-gray-500">Correctas</div>
              </div>
            </div>
          </div>
          <Progress value={progress} className="mt-4 h-2" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Controles de modo */}
          <div className="flex justify-center space-x-4">
            <Button
              variant={mode === "study" ? "default" : "outline"}
              onClick={() => setMode("study")}
            >
              📖 Modo Estudio
            </Button>
            <Button
              variant={mode === "review" ? "default" : "outline"}
              onClick={() => setMode("review")}
            >
              🔄 Modo Repaso
            </Button>
          </div>

          {/* Flashcard principal */}
          <div className="relative">
            <Card 
              className={`min-h-[400px] cursor-pointer transition-all duration-500 ${
                isFlipped ? 'transform rotate-y-180' : ''
              }`}
              onClick={handleFlip}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Badge className={getDifficultyColor(currentCard.difficulty)}>
                    {currentCard.difficulty}
                  </Badge>
                  <Badge variant="outline">
                    {currentCard.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-center min-h-[300px]">
                <div className="text-center space-y-6">
                  {!isFlipped ? (
                    <>
                      <div className="text-6xl mb-4">❓</div>
                      <h3 className="text-2xl font-bold text-gray-900 leading-relaxed">
                        {currentCard.question}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Haz clic para ver la respuesta
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="text-6xl mb-4">💡</div>
                      <div className="text-left space-y-4">
                        <h4 className="text-lg font-semibold text-indigo-700">
                          Respuesta:
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {currentCard.answer}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controles de navegación */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              ⬅️ Anterior
            </Button>
            
            <div className="flex space-x-4">
              {isFlipped && (
                <>
                  <Button
                    variant="outline"
                    className="border-red-200 hover:bg-red-50"
                    onClick={() => handleMarkCorrect(false)}
                  >
                    ❌ Difícil
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-200 hover:bg-green-50"
                    onClick={() => handleMarkCorrect(true)}
                  >
                    ✅ Fácil
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentIndex === flashcards.length - 1}
            >
              Siguiente ➡️
            </Button>
          </div>

          {/* Resumen de progreso */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progreso de Estudio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {studiedCards.size}
                  </div>
                  <div className="text-sm text-gray-500">Tarjetas vistas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {correctAnswers.size}
                  </div>
                  <div className="text-sm text-gray-500">Marcadas como fáciles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">
                    {studiedCards.size - correctAnswers.size}
                  </div>
                  <div className="text-sm text-gray-500">Necesitan repaso</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de todas las tarjetas */}
          <Card>
            <CardHeader>
              <CardTitle>Todas las Tarjetas</CardTitle>
              <CardDescription>
                Haz clic en cualquier tarjeta para saltar a ella
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {flashcards.map((card, index) => (
                  <Button
                    key={card.id}
                    variant={currentIndex === index ? "default" : "outline"}
                    className={`h-auto p-4 text-left ${
                      studiedCards.has(card.id) ? 'border-blue-300' : ''
                    } ${
                      correctAnswers.has(card.id) ? 'bg-green-50 border-green-300' : ''
                    }`}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsFlipped(false);
                    }}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={getDifficultyColor(card.difficulty)}>
                          {card.difficulty}
                        </Badge>
                        {studiedCards.has(card.id) && (
                          <span className="text-blue-500">👁️</span>
                        )}
                        {correctAnswers.has(card.id) && (
                          <span className="text-green-500">✅</span>
                        )}
                      </div>
                      <p className="text-sm font-medium">
                        {card.question.substring(0, 80)}
                        {card.question.length > 80 ? "..." : ""}
                      </p>
                      <p className="text-xs text-gray-500">
                        {card.category}
                      </p>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Botones finales */}
          <div className="flex justify-center space-x-4">
            <Button 
              variant="outline"
              onClick={() => {
                const url = `${window.location.origin}/bolilla/${bolillaId}`;
                window.location.href = url;
              }}
            >
              📚 Volver al contenido
            </Button>
            <Button 
              onClick={() => {
                const url = `${window.location.origin}/bolilla/${bolillaId}/examen`;
                window.location.href = url;
              }}
            >
              📝 Tomar examen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function FlashcardsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const paramId = resolvedParams.id || "";
  const bolillaId = parseInt(paramId.replace("bolilla-", ""));
  const flashcards = flashcardsData[bolillaId] || [];

  if (!flashcards.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Flashcards no disponibles</CardTitle>
            <CardDescription>Las flashcards para la bolilla {bolillaId} no están disponibles.</CardDescription>
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

  return <FlashcardsContent bolillaId={bolillaId} flashcards={flashcards} />;
}