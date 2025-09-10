"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  bolilla: number;
  category: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "¿Cuáles son las características del conocimiento vulgar?",
    options: ["Metódico y sistemático", "Ametódico y asistemático", "Axiomático y comunicable", "Totalizador y preciso"],
    correctAnswer: 1,
    bolilla: 1,
    category: "Tipos de Conocimiento"
  },
  {
    id: 2,
    question: "¿Qué método utilizaba Sócrates?",
    options: ["Dialéctica", "Mayéutica", "Fenomenología", "Empirismo"],
    correctAnswer: 1,
    bolilla: 1,
    category: "Historia del Pensamiento"
  },
  {
    id: 3,
    question: "¿Cuántos tipos de normas puras distingue Von Wright?",
    options: ["Dos", "Tres", "Cuatro", "Cinco"],
    correctAnswer: 1,
    bolilla: 2,
    category: "Teoría de Normas"
  },
  {
    id: 4,
    question: "¿Qué son las Normas Prescripciones?",
    options: ["Reglas técnicas", "Reglas conceptuales", "Normas que obligan en sentido fuerte", "Reglas morales"],
    correctAnswer: 2,
    bolilla: 2,
    category: "Normas Puras"
  },
  {
    id: 5,
    question: "¿Cómo define Cossio el Derecho?",
    options: ["Conjunto de normas", "Conducta humana en interferencia intersubjetiva", "Hecho social", "Interpretación judicial"],
    correctAnswer: 1,
    bolilla: 3,
    category: "Escuela Egológica"
  },
  {
    id: 6,
    question: "¿Cuántos problemas recurrentes analiza Hart?",
    options: ["Dos", "Tres", "Cuatro", "Cinco"],
    correctAnswer: 1,
    bolilla: 3,
    category: "Análisis de Hart"
  },
  {
    id: 7,
    question: "¿Qué formulación lógica usa Kelsen?",
    options: ["A es B", "Dado A debe ser B", "A o B", "Si A entonces B"],
    correctAnswer: 1,
    bolilla: 4,
    category: "Teoría de Kelsen"
  },
  {
    id: 8,
    question: "¿Qué son la Endonorma y Perinorma?",
    options: ["Dos tipos de normas", "Aspecto pacífico y conflictivo", "Normas primarias y secundarias", "Elementos de Kelsen"],
    correctAnswer: 1,
    bolilla: 4,
    category: "Teoría de Cossio"
  },
  {
    id: 9,
    question: "¿Cuál es la principal fuente en el Derecho Continental?",
    options: ["Jurisprudencia", "Costumbre", "Ley", "Doctrina"],
    correctAnswer: 2,
    bolilla: 7,
    category: "Fuentes del Derecho"
  },
  {
    id: 10,
    question: "¿Quién administraba justicia en el Antiguo Egipto?",
    options: ["El Faraón", "Los sacerdotes de Maat", "Los jueces", "El pueblo"],
    correctAnswer: 1,
    bolilla: 12,
    category: "Historia Antigua"
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    // Mezclar preguntas al inicio
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
    setShuffledQuestions(shuffled);
  }, []);

  useEffect(() => {
    if (gameStarted && !gameFinished && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
  }, [timeLeft, gameStarted, gameFinished]);

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(30);
  };

  const handleTimeUp = () => {
    // Tiempo agotado, marcar respuesta actual y continuar
    setAnswers([...answers, selectedAnswer ?? -1]);
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      finishGame();
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerIndex);
      const isCorrect = answerIndex === shuffledQuestions[currentQuestion].correctAnswer;
      if (isCorrect) {
        setScore(score + 1);
      }
      
      setTimeout(() => {
        setAnswers([...answers, answerIndex]);
        if (currentQuestion < shuffledQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setTimeLeft(30);
        } else {
          finishGame();
        }
      }, 1500);
    }
  };

  const finishGame = () => {
    setGameFinished(true);
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(30);
    setGameStarted(false);
    setGameFinished(false);
    setAnswers([]);
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
    setShuffledQuestions(shuffled);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return "¡Excelente! 🏆";
    if (percentage >= 60) return "¡Bien! 👍";
    if (percentage >= 40) return "Puedes mejorar 📚";
    return "Necesitas estudiar más 💪";
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando quiz...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-96">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🏆</div>
            <CardTitle className="text-2xl">Quiz Rápido</CardTitle>
            <CardDescription>
              Responde 5 preguntas de diferentes bolillas. ¡Tienes 30 segundos por pregunta!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold text-indigo-600">5</div>
                  <div className="text-gray-500">Preguntas</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-600">30s</div>
                  <div className="text-gray-500">Por pregunta</div>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button 
                variant="outline"
                onClick={() => window.location.href = "/"}
                className="flex-1"
              >
                ← Volver
              </Button>
              <Button onClick={startGame} className="flex-1">
                🚀 Comenzar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (gameFinished) {
    const percentage = (score / shuffledQuestions.length) * 100;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-[500px]">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">
              {percentage >= 80 ? "🏆" : percentage >= 60 ? "👍" : "📚"}
            </div>
            <CardTitle className="text-2xl">¡Quiz Completado!</CardTitle>
            <CardDescription>
              {getScoreMessage(percentage)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor(percentage)}`}>
                {score}/{shuffledQuestions.length}
              </div>
              <div className="text-gray-600 mt-2">
                {Math.round(percentage)}% de respuestas correctas
              </div>
            </div>

            {/* Resumen de respuestas */}
            <div className="space-y-3">
              <h3 className="font-semibold text-center">Resumen de respuestas:</h3>
              {shuffledQuestions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                const wasAnswered = userAnswer !== -1;
                
                return (
                  <div 
                    key={question.id} 
                    className={`p-3 rounded-lg border ${
                      !wasAnswered ? "bg-gray-50 border-gray-200" :
                      isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">
                          Bolilla {question.bolilla}
                        </Badge>
                        <p className="text-sm font-medium">
                          {question.question.substring(0, 50)}...
                        </p>
                      </div>
                      <div className="text-right">
                        {!wasAnswered ? (
                          <span className="text-gray-500 text-2xl">⏰</span>
                        ) : isCorrect ? (
                          <span className="text-green-600 text-2xl">✅</span>
                        ) : (
                          <span className="text-red-600 text-2xl">❌</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex space-x-4">
              <Button 
                variant="outline"
                onClick={() => window.location.href = "/"}
                className="flex-1"
              >
                🏠 Inicio
              </Button>
              <Button onClick={restartGame} className="flex-1">
                🔄 Jugar de nuevo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = shuffledQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🏆 Quiz Rápido</h1>
              <p className="text-gray-600">
                Pregunta {currentQuestion + 1} de {shuffledQuestions.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-indigo-600'}`}>
                  {timeLeft}
                </div>
                <div className="text-sm text-gray-500">segundos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-500">correctas</div>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Progress value={progress} className="h-2" />
            <Progress value={(timeLeft / 30) * 100} className="h-1 bg-red-100" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <Badge variant="outline">Bolilla {currentQ.bolilla}</Badge>
                <Badge variant="secondary">{currentQ.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 leading-relaxed">
                  {currentQ.question}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQ.options.map((option, index) => {
                  let buttonClass = "h-auto p-6 text-left transition-all duration-200";
                  
                  if (selectedAnswer !== null) {
                    if (index === currentQ.correctAnswer) {
                      buttonClass += " bg-green-100 border-green-500 text-green-800 hover:bg-green-100";
                    } else if (index === selectedAnswer) {
                      buttonClass += " bg-red-100 border-red-500 text-red-800 hover:bg-red-100";
                    } else {
                      buttonClass += " opacity-50";
                    }
                  } else {
                    buttonClass += " hover:bg-indigo-50 hover:border-indigo-300";
                  }

                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={buttonClass}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-semibold">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="flex-1">{option}</span>
                        {selectedAnswer === index && index === currentQ.correctAnswer && (
                          <span className="text-green-600 text-xl">✅</span>
                        )}
                        {selectedAnswer === index && index !== currentQ.correctAnswer && (
                          <span className="text-red-600 text-xl">❌</span>
                        )}
                      </div>
                    </Button>
                  );
                })}
              </div>

              {selectedAnswer !== null && (
                <div className="text-center">
                  <div className="animate-pulse text-gray-600">
                    Preparando siguiente pregunta...
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}