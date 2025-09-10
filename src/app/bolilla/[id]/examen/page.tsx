"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: "Fácil" | "Medio" | "Difícil";
}

const examData: Record<number, Question[]> = {
  1: [
    {
      id: 1,
      question: "¿Cuáles son las características principales del conocimiento vulgar?",
      options: [
        "Metódico, sistemático y axiomático",
        "Ametódico, asistemático y anaxiomático",
        "Totalizador y con libertad metodológica",
        "Comunicable, verificable y anaxiológico"
      ],
      correctAnswer: 1,
      explanation: "El conocimiento vulgar es básico, simple, ametódico (no requiere método), asistemático (no hay concatenación lógica) y anaxiomático (no parte de dogmas).",
      category: "Tipos de Conocimiento",
      difficulty: "Fácil"
    },
    {
      id: 2,
      question: "¿Qué método utilizaba Sócrates para llegar al conocimiento de la verdad?",
      options: [
        "Dialéctica hegeliana",
        "Lógica aristotélica",
        "Mayéutica",
        "Fenomenología husserliana"
      ],
      correctAnswer: 2,
      explanation: "La Mayéutica era el método socrático que consistía en hacer preguntas y obtener respuestas cada vez más precisas para llegar al conocimiento de la verdad.",
      category: "Evolución Histórica",
      difficulty: "Medio"
    },
    {
      id: 3,
      question: "Según Mario Bunge, ¿cómo se clasifican las ciencias?",
      options: [
        "Naturales y Sociales",
        "Exactas e Inexactas",
        "Formales y Fácticas",
        "Puras y Aplicadas"
      ],
      correctAnswer: 2,
      explanation: "Mario Bunge clasifica las ciencias en Formales (establecen razonamientos lógicos, como matemáticas) y Fácticas (estudian hechos y relaciones, como física).",
      category: "Clasificación de Ciencias",
      difficulty: "Medio"
    },
    {
      id: 4,
      question: "¿Cuál es la principal diferencia entre el Realismo y el Idealismo Filosófico?",
      options: [
        "El Realismo usa método empírico y el Idealismo método racional",
        "El Realismo conoce la realidad sin cuestionarla, el Idealismo busca construir la realidad",
        "El Realismo es anterior al Renacimiento y el Idealismo posterior",
        "Todas las anteriores son correctas"
      ],
      correctAnswer: 3,
      explanation: "Todas las opciones son correctas: el Realismo Filosófico (hasta el Renacimiento) conocía la realidad sin ponerla en duda, mientras el Idealismo (post-Renacimiento) busca construir la realidad.",
      category: "Evolución Histórica",
      difficulty: "Difícil"
    },
    {
      id: 5,
      question: "¿Qué distingue al conocimiento filosófico del científico?",
      options: [
        "El filosófico es metódico y el científico no",
        "El científico es sistemático y el filosófico no",
        "El filosófico es totalizador y pretendidamente anaxiomático",
        "No hay diferencias significativas"
      ],
      correctAnswer: 2,
      explanation: "El conocimiento filosófico es totalizador (apunta a la esencia última), tiene libertad metodológica y es pretendidamente anaxiomático (pone las verdades en tela de juicio).",
      category: "Tipos de Conocimiento",
      difficulty: "Difícil"
    }
  ],
  2: [
    {
      id: 6,
      question: "Según Von Wright, ¿cuáles son las tres categorías de 'Leyes' que analiza?",
      options: [
        "Civiles, Penales y Comerciales",
        "Nacionales, Internacionales y Supranacionales",
        "De la Naturaleza, del Estado, y de la Lógica/Matemáticas",
        "Escritas, Consuetudinarias y Jurisprudenciales"
      ],
      correctAnswer: 2,
      explanation: "Von Wright divide las 'Leyes' en: de la Naturaleza (describen fenómenos), del Estado (prescriben conductas), y de Lógica/Matemáticas (determinan pautas).",
      category: "Teoría de Normas",
      difficulty: "Medio"
    },
    {
      id: 7,
      question: "¿Qué caracteriza a las Normas Prescripciones?",
      options: [
        "Establecen pautas sin sanción coactiva",
        "Son reglas técnicas con proposición anankástica",
        "Obligan en el sentido más fuerte con sanción coactiva",
        "Se las da el individuo a sí mismo"
      ],
      correctAnswer: 2,
      explanation: "Las Normas Prescripciones obligan en el sentido más fuerte de la palabra, donde encontramos las leyes del estado con sanción coactiva aplicada por el Estado.",
      category: "Normas Puras",
      difficulty: "Medio"
    },
    {
      id: 8,
      question: "¿Cuál es la diferencia fundamental entre reglas morales y reglas ideales?",
      options: [
        "Las morales son del HACER y se exteriorizan, las ideales son del SER y no se exteriorizan",
        "Las morales son colectivas y las ideales individuales",
        "Las morales tienen sanción y las ideales no",
        "No hay diferencias significativas"
      ],
      correctAnswer: 0,
      explanation: "Las reglas morales son del HACER y se manifiestan en acciones del individuo en sociedad, mientras las ideales son del SER, no se exteriorizan y quedan en el interior.",
      category: "Normas Impuras",
      difficulty: "Difícil"
    },
    {
      id: 9,
      question: "¿Qué es la Proposición Anankástica?",
      options: [
        "Una regla moral interna",
        "La regla interna de las reglas técnicas que indica si se obtuvo éxito",
        "Una norma consuetudinaria",
        "Un tipo de juicio lógico"
      ],
      correctAnswer: 1,
      explanation: "La Proposición Anankástica es la regla interna dentro de las reglas técnicas que me permite saber si he obtenido éxito al seguir la regla técnica.",
      category: "Reglas Técnicas",
      difficulty: "Difícil"
    },
    {
      id: 10,
      question: "¿Cuántos grados de abstención distingue Von Wright?",
      options: [
        "Tres grados",
        "Cuatro grados",
        "Cinco grados (incluyendo intento fallido)",
        "Seis grados"
      ],
      correctAnswer: 1,
      explanation: "Von Wright distingue 4 grados: inicial (puedo pero no hago), oportunidad (me abstengo ahora), opción (elijo no hacerlo), decisión (decido no hacerlo pese a deseos).",
      category: "Actos y Omisiones",
      difficulty: "Medio"
    }
  ],
  3: [
    {
      id: 11,
      question: "¿Cuáles son los tres problemas recurrentes que analiza Hart?",
      options: [
        "Validez, Eficacia y Legitimidad",
        "Orden respaldado por amenaza, Relación Derecho-Moral, Cuestión de reglas",
        "Norma, Hecho y Valor",
        "Ser, Deber Ser y Valoración"
      ],
      correctAnswer: 1,
      explanation: "Hart analiza: 1) ¿Es el Derecho una orden respaldada por amenaza? 2) Relación entre Derecho y Moral 3) ¿Es el Derecho una cuestión de reglas?",
      category: "Problemas de Hart",
      difficulty: "Medio"
    },
    {
      id: 12,
      question: "¿Cómo define el Derecho la Escuela Egológica de Carlos Cossio?",
      options: [
        "Conjunto de normas jurídicas",
        "Conducta humana en interferencia intersubjetiva",
        "Hecho social, norma jurídica y valoración",
        "Interpretación judicial de hechos sociales"
      ],
      correctAnswer: 1,
      explanation: "Para Cossio, el Derecho es conducta humana en interferencia intersubjetiva: humana (fenómeno cultural), intersubjetiva (convivencia social), interferencia (aspecto pacífico y conflictivo).",
      category: "Escuela Egológica",
      difficulty: "Medio"
    },
    {
      id: 13,
      question: "¿Qué caracteriza a los objetos culturales según la teoría de Husserl-Cossio?",
      options: [
        "No existen en el mundo real, son neutros al valor",
        "Existen en el mundo real, están en la experiencia, son valiosos",
        "Solo existen en el plano intelectual",
        "Son inmutables y eternos"
      ],
      correctAnswer: 1,
      explanation: "Los objetos culturales: existen en el mundo real, están en la experiencia, son valiosos positiva o negativamente, método empírico dialéctico, acto gnoseológico de comprensión.",
      category: "Teoría de Objetos",
      difficulty: "Difícil"
    },
    {
      id: 14,
      question: "¿En qué se diferencian las teorías normativistas de las culturalistas sobre el objeto del Derecho?",
      options: [
        "No hay diferencias significativas",
        "Normativistas: objeto en las normas jurídicas; Culturalistas: objeto en la cultura",
        "Solo difieren en el método de estudio",
        "Una es europea y otra americana"
      ],
      correctAnswer: 1,
      explanation: "Teorías normativistas (Kelsen, Iusnaturalismo): objeto en las normas jurídicas. Teorías culturalistas (Cossio, Escuela Tridimensional): objeto en la cultura.",
      category: "Teorías del Derecho",
      difficulty: "Difícil"
    },
    {
      id: 15,
      question: "¿Qué establece la Escuela Tridimensional del Derecho de Miguel Reale?",
      options: [
        "El Derecho tiene tres fuentes: ley, costumbre y jurisprudencia",
        "El Derecho es Hecho social, Norma jurídica y Valoración",
        "Hay tres tipos de derecho: natural, positivo y social",
        "Existen tres métodos jurídicos: dogmático, sociológico y filosófico"
      ],
      correctAnswer: 1,
      explanation: "La Escuela Tridimensional (Miguel Reale, Brasil) establece que el Derecho es la integración de tres elementos: Hecho social, Norma jurídica y Valoración.",
      category: "Teorías Culturalistas",
      difficulty: "Medio"
    }
  ],
  4: [
    {
      id: 16,
      question: "¿Cuál es la formulación lógica de Kelsen para las normas jurídicas?",
      options: [
        "A es B",
        "Dado A debe ser B",
        "Dado A debe ser B o dado no B debe ser S",
        "Si A entonces B"
      ],
      correctAnswer: 1,
      explanation: "Kelsen utiliza la formulación lógica 'Dado A debe ser B' con juicio lógico hipotético. La formulación jurídica es 'Dado el Acto ilícito debe ser la Sanción'.",
      category: "Análisis de Kelsen",
      difficulty: "Medio"
    },
    {
      id: 17,
      question: "¿Cuáles son los elementos de la norma jurídica según Kelsen en 1934?",
      options: [
        "Deber jurídico, responsabilidad y sanción",
        "Sanción, debe ser y acto ilícito",
        "Endonorma, perinorma y disyunción",
        "Antecedente, consecuente y nexo"
      ],
      correctAnswer: 1,
      explanation: "En 1934, Kelsen establece 3 elementos: 1) Sanción (más importante), 2) Debe ser (nexo lógico imputativo), 3) Acto ilícito (acto que corresponde sanción).",
      category: "Estructura Kelseniana",
      difficulty: "Medio"
    },
    {
      id: 18,
      question: "¿Qué diferencia hay entre la formulación de Kelsen y la de Cossio?",
      options: [
        "Kelsen usa juicio categórico, Cossio hipotético",
        "Kelsen usa juicio hipotético, Cossio disyuntivo",
        "No hay diferencias en la formulación lógica",
        "Solo difieren en la terminología"
      ],
      correctAnswer: 1,
      explanation: "Kelsen utiliza juicio lógico hipotético (Dado A debe ser B), mientras Cossio utiliza juicio disyuntivo (Dado A debe ser B O dado no B debe ser S).",
      category: "Comparación Teorías",
      difficulty: "Difícil"
    },
    {
      id: 19,
      question: "¿Qué son la Endonorma y Perinorma en la teoría de Cossio?",
      options: [
        "Dos tipos diferentes de normas jurídicas",
        "Endonorma: aspecto pacífico; Perinorma: aspecto conflictivo",
        "Normas principales y secundarias",
        "Normas escritas y consuetudinarias"
      ],
      correctAnswer: 1,
      explanation: "Endonorma es la parte pacífica de la norma (prestación de obligado frente al titular); Perinorma es la parte conflictiva (sanción aplicada por funcionario).",
      category: "Análisis de Cossio",
      difficulty: "Difícil"
    },
    {
      id: 20,
      question: "¿Cuáles son los tres remedios que propone Hart para los defectos del sistema jurídico?",
      options: [
        "Certeza, dinamismo y control",
        "Regla de reconocimiento, regla de cambio, regla de adjudicación",
        "Legislación, jurisprudencia y doctrina",
        "Poder legislativo, ejecutivo y judicial"
      ],
      correctAnswer: 1,
      explanation: "Hart propone 3 remedios: Regla de reconocimiento (certeza), Regla de cambio (dinamismo), Regla de adjudicación (control social).",
      category: "Análisis de Hart",
      difficulty: "Difícil"
    }
  ],
  7: [
    {
      id: 21,
      question: "¿Cuál es la principal fuente del Derecho en el sistema Continental Europeo?",
      options: [
        "La Jurisprudencia",
        "La Costumbre",
        "La Ley",
        "La Doctrina"
      ],
      correctAnswer: 2,
      explanation: "En el Derecho Continental Europeo (de raíz romanista, escrito, codificado) la principal fuente es la Ley, mientras el resto son fuentes materiales.",
      category: "Sistemas Jurídicos",
      difficulty: "Fácil"
    },
    {
      id: 22,
      question: "Según la Escuela Histórica de Savigny, ¿cuál debía ser la principal fuente del derecho?",
      options: [
        "La ley escrita",
        "La costumbre",
        "La jurisprudencia",
        "Los códigos"
      ],
      correctAnswer: 1,
      explanation: "Para Savigny, la costumbre era la principal fuente del derecho. La ley estaba sometida a la costumbre y las 'reglas del espíritu del pueblo' eran las que debía acatar cada pueblo.",
      category: "Escuela Histórica",
      difficulty: "Medio"
    },
    {
      id: 23,
      question: "¿Qué diferencia hay entre ley en sentido formal y material?",
      options: [
        "Formal: contenido jurídico; Material: procedimientos",
        "Formal: procedimientos completos; Material: contenido jurídico sin todos los procedimientos",
        "No hay diferencias significativas",
        "Solo difieren en el órgano que las dicta"
      ],
      correctAnswer: 1,
      explanation: "Ley formal: ha seguido todos los procedimientos para su constitución. Ley material: tiene contenido jurídico pero no siguió todos los procedimientos (ej: decreto).",
      category: "Legislación",
      difficulty: "Medio"
    },
    {
      id: 24,
      question: "¿Cuál fue el resultado del debate entre Thibaut y Savigny sobre la codificación alemana?",
      options: [
        "Thibaut ganó y se codificó inmediatamente",
        "Savigny ganó y retrasó la codificación 86 años",
        "Llegaron a un acuerdo intermedio",
        "El debate no tuvo consecuencias prácticas"
      ],
      correctAnswer: 1,
      explanation: "En 1814, Savigny se opuso a la codificación (temía que cristalizara el Derecho) y ganó el debate, retrasando la codificación alemana 86 años (hasta 1900).",
      category: "Codificación",
      difficulty: "Medio"
    },
    {
      id: 25,
      question: "¿Qué establece Alf Ross sobre los grados de objetivación de las fuentes?",
      options: [
        "Todas las fuentes tienen el mismo grado de objetivación",
        "Totalmente objetivadas, parcialmente objetivadas, no objetivadas",
        "Solo distingue entre objetivas y subjetivas",
        "No habla de grados sino de tipos"
      ],
      correctAnswer: 1,
      explanation: "Ross distingue: Totalmente objetivadas (completas, intérprete solo aplica), Parcialmente objetivadas (incompletas, con lagunas), No objetivadas (no hay fuente, debe crearla).",
      category: "Teoría de Ross",
      difficulty: "Difícil"
    }
  ],
  12: [
    {
      id: 26,
      question: "¿Cómo funcionaba la administración de justicia en el Antiguo Egipto?",
      options: [
        "Por jueces independientes",
        "Por el pueblo en asambleas",
        "Por sacerdotes del culto a Maat",
        "Por el ejército"
      ],
      correctAnswer: 2,
      explanation: "En Egipto, la justicia era administrada por sacerdotes del culto a Maat (diosa de la justicia). Existía el juicio de Osiris donde el corazón se pesaba contra la pluma de Maat.",
      category: "Derecho en Oriente",
      difficulty: "Fácil"
    },
    {
      id: 27,
      question: "¿Cuáles son los tipos de justicia según Aristóteles?",
      options: [
        "Natural y positiva",
        "Distributiva y correctiva",
        "Legal y moral",
        "Individual y social"
      ],
      correctAnswer: 1,
      explanation: "Aristóteles distingue: Justicia Distributiva (dar a cada uno según su mérito) y Justicia Correctiva (reparar el daño causado, restablecer equilibrio).",
      category: "Filosofía Griega",
      difficulty: "Medio"
    },
    {
      id: 28,
      question: "¿Cómo divide Santo Tomás de Aquino las leyes?",
      options: [
        "Divinas y humanas solamente",
        "Eterna, Divina, Natural y Humana",
        "Naturales y positivas",
        "Escritas y consuetudinarias"
      ],
      correctAnswer: 1,
      explanation: "Santo Tomás divide en: 1) Ley Eterna (plan divino), 2) Ley Divina (revelada), 3) Ley Natural (razón humana/sindéresis), 4) Ley Humana (derecho positivo).",
      category: "Escolástica",
      difficulty: "Medio"
    },
    {
      id: 29,
      question: "¿Qué postulaba Cesare Lombroso sobre el delincuente?",
      options: [
        "Es producto del ambiente social",
        "Es resultado de factores económicos",
        "Es así por naturaleza, con características físicas identificables",
        "Es una elección racional"
      ],
      correctAnswer: 2,
      explanation: "Lombroso postulaba la teoría del 'criminal nato': el delincuente es así por naturaleza y tiene características físicas identificables (estigmas somáticos).",
      category: "Positivismo Criminológico",
      difficulty: "Medio"
    },
    {
      id: 30,
      question: "¿En qué consiste el relativismo de Gustav Radbruch?",
      options: [
        "La justicia es absoluta e inmutable",
        "La justicia es relativa según las concepciones políticas de cada comunidad",
        "No existe diferencia entre justicia y derecho",
        "La justicia depende solo del legislador"
      ],
      correctAnswer: 1,
      explanation: "Radbruch sostiene que la justicia es relativa según concepciones políticas: individualistas (libertad), supraindividualistas (nación), transpersonalistas (cultura).",
      category: "Criticismo Jurídico",
      difficulty: "Difícil"
    }
  ]
};

function ExamenContent({ bolillaId, questions }: { bolillaId: number; questions: Question[] }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] ?? null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] ?? null);
    }
  };

  const handleFinish = () => {
    setShowResults(true);
  };

  const calculateResults = () => {
    const correctCount = questions.reduce((count, question, index) => {
      return count + (answers[index] === question.correctAnswer ? 1 : 0);
    }, 0);
    
    const percentage = (correctCount / questions.length) * 100;
    return { correctCount, percentage };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-green-100 text-green-800";
      case "Medio": return "bg-yellow-100 text-yellow-800";
      case "Difícil": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };



  if (showResults) {
    const { correctCount, percentage } = calculateResults();
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  📊 Resultados del Examen - Bolilla {bolillaId}
                </h1>
                <p className="text-gray-600">Revisión detallada de respuestas</p>
              </div>
              <div className="text-center">
                <div className={`text-4xl font-bold ${getGradeColor(percentage)}`}>
                  {Math.round(percentage)}%
                </div>
                <div className="text-sm text-gray-500">Calificación</div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Resumen de resultados */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen de Resultados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{questions.length}</div>
                    <div className="text-sm text-gray-500">Total de preguntas</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">{correctCount}</div>
                    <div className="text-sm text-gray-500">Respuestas correctas</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-600">{questions.length - correctCount}</div>
                    <div className="text-sm text-gray-500">Respuestas incorrectas</div>
                  </div>
                  <div>
                    <div className={`text-3xl font-bold ${getGradeColor(percentage)}`}>
                      {percentage >= 80 ? "Excelente" : percentage >= 60 ? "Bueno" : "Necesita mejorar"}
                    </div>
                    <div className="text-sm text-gray-500">Evaluación</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revisión detallada */}
            <div className="space-y-6">
              {questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <Card key={question.id} className={`border-l-4 ${
                    userAnswer === undefined ? "border-gray-300" : 
                    isCorrect ? "border-green-500" : "border-red-500"
                  }`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          Pregunta {index + 1}
                          {userAnswer === undefined ? (
                            <Badge className="ml-2 bg-gray-100 text-gray-800">Sin responder</Badge>
                          ) : isCorrect ? (
                            <Badge className="ml-2 bg-green-100 text-green-800">✅ Correcta</Badge>
                          ) : (
                            <Badge className="ml-2 bg-red-100 text-red-800">❌ Incorrecta</Badge>
                          )}
                        </CardTitle>
                        <div className="flex space-x-2">
                          <Badge className={getDifficultyColor(question.difficulty)}>
                            {question.difficulty}
                          </Badge>
                          <Badge variant="outline">
                            {question.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-900 font-medium">{question.question}</p>
                      
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border ${
                              optionIndex === question.correctAnswer
                                ? "bg-green-50 border-green-300 text-green-800"
                                : optionIndex === userAnswer && userAnswer !== question.correctAnswer
                                ? "bg-red-50 border-red-300 text-red-800"
                                : "bg-gray-50 border-gray-200"
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              {optionIndex === question.correctAnswer && (
                                <span className="text-green-600 font-bold">✅</span>
                              )}
                              {optionIndex === userAnswer && userAnswer !== question.correctAnswer && (
                                <span className="text-red-600 font-bold">❌</span>
                              )}
                              <span>{option}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">💡 Explicación:</h4>
                        <p className="text-blue-700">{question.explanation}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Acciones finales */}
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                  setSelectedAnswer(null);
                }}
              >
                🔄 Reintentar Examen
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  const url = `${window.location.origin}/bolilla/${bolillaId}`;
                  window.location.href = url;
                }}
              >
                📚 Repasar contenido
              </Button>
              <Button 
                onClick={() => window.location.href = "/"}
              >
                🏠 Volver al inicio
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  
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
                  📝 Examen - Bolilla {bolillaId}
                </h1>
                <p className="text-gray-600">
                  Pregunta {currentQuestion + 1} de {questions.length}
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
                  {Object.keys(answers).length}
                </div>
                <div className="text-sm text-gray-500">Respondidas</div>
              </div>
            </div>
          </div>
          <Progress value={progress} className="mt-4 h-2" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Pregunta actual */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">
                  Pregunta {currentQuestion + 1}
                </CardTitle>
                <div className="flex space-x-2">
                  <Badge className={getDifficultyColor(currentQ.difficulty)}>
                    {currentQ.difficulty}
                  </Badge>
                  <Badge variant="outline">
                    {currentQ.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-gray-900 leading-relaxed">
                {currentQ.question}
              </p>
              
              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={(value) => handleAnswerSelect(parseInt(value))}
              >
                {currentQ.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navegación */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              ⬅️ Anterior
            </Button>
            
            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <Button
                  key={index}
                  variant={currentQuestion === index ? "default" : "outline"}
                  size="sm"
                  className={`w-10 h-10 ${
                    answers[index] !== undefined ? 'bg-green-100 border-green-300' : ''
                  }`}
                  onClick={() => {
                    setCurrentQuestion(index);
                    setSelectedAnswer(answers[index] ?? null);
                  }}
                >
                  {index + 1}
                </Button>
              ))}
            </div>

            {currentQuestion === questions.length - 1 ? (
              <Button
                onClick={handleFinish}
                disabled={Object.keys(answers).length === 0}
                className="bg-green-600 hover:bg-green-700"
              >
                🏁 Finalizar Examen
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={currentQuestion === questions.length - 1}
              >
                Siguiente ➡️
              </Button>
            )}
          </div>

          {/* Resumen de progreso */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progreso del Examen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {Object.keys(answers).length}
                  </div>
                  <div className="text-sm text-gray-500">Respondidas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {questions.length - Object.keys(answers).length}
                  </div>
                  <div className="text-sm text-gray-500">Pendientes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600">
                    {questions.length}
                  </div>
                  <div className="text-sm text-gray-500">Total</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default async function ExamenPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const bolillaId = parseInt(resolvedParams.id);
  const questions = examData[bolillaId] || [];

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Examen no disponible</CardTitle>
            <CardDescription>El examen para la bolilla {bolillaId} no está disponible.</CardDescription>
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

  return <ExamenContent bolillaId={bolillaId} questions={questions} />;
}