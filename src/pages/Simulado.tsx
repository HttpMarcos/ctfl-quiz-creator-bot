import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag,
  CheckCircle,
  AlertCircle 
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

// Mock questions for demonstration
const mockQuestions: Question[] = Array.from({ length: 40 }, (_, i) => ({
  id: `q${i + 1}`,
  question: `Questão ${i + 1}: Qual das seguintes opções melhor descreve o conceito de teste de software no contexto CTFL?`,
  options: [
    'Um processo de verificação de que o software funciona conforme especificado',
    'Uma atividade realizada apenas após o desenvolvimento estar completo',
    'Um processo que garante 100% de ausência de defeitos',
    'Uma técnica de programação para evitar bugs'
  ],
  correctAnswer: 0,
  explanation: 'Teste de software é um processo de verificação e validação que o software atende aos requisitos especificados.'
}));

export default function Simulado() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds
  const [isFinished, setIsFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isFinished) {
      handleFinishExam();
    }
  }, [timeLeft, isFinished]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [mockQuestions[currentQuestion].id]: parseInt(value)
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinishExam = () => {
    setIsFinished(true);
    calculateResults();
  };

  const calculateResults = () => {
    const correctAnswers = Object.entries(answers).filter(([questionId, answer]) => {
      const question = mockQuestions.find(q => q.id === questionId);
      return question && question.correctAnswer === answer;
    }).length;

    const score = (correctAnswers / mockQuestions.length) * 100;
    const passed = correctAnswers >= 26; // 65% = 26 out of 40

    toast({
      title: passed ? "Parabéns! Você foi aprovado!" : "Você foi reprovado",
      description: `${correctAnswers}/40 questões corretas (${score.toFixed(1)}%)`,
      variant: passed ? "default" : "destructive",
    });

    setShowResults(true);
  };

  const answeredQuestions = Object.keys(answers).length;
  const progressPercentage = (answeredQuestions / mockQuestions.length) * 100;

  if (showResults) {
    const correctAnswers = Object.entries(answers).filter(([questionId, answer]) => {
      const question = mockQuestions.find(q => q.id === questionId);
      return question && question.correctAnswer === answer;
    }).length;

    const score = (correctAnswers / mockQuestions.length) * 100;
    const passed = correctAnswers >= 26;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-8 text-center">
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            passed ? 'bg-success/20' : 'bg-destructive/20'
          }`}>
            {passed ? (
              <CheckCircle className="w-10 h-10 text-success" />
            ) : (
              <AlertCircle className="w-10 h-10 text-destructive" />
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            {passed ? 'Parabéns! Aprovado!' : 'Reprovado'}
          </h1>
          
          <div className="text-6xl font-bold mb-4">
            {correctAnswers}/40
          </div>
          
          <p className="text-xl text-muted-foreground mb-2">
            {score.toFixed(1)}% de aproveitamento
          </p>
          
          <p className="text-muted-foreground mb-8">
            {passed 
              ? 'Você atingiu a pontuação mínima para aprovação (65%)'
              : 'Você precisa de pelo menos 26 acertos para ser aprovado (65%)'
            }
          </p>

          <div className="flex gap-4 justify-center">
            <Button variant="outline" asChild>
              <a href="/">Voltar ao Início</a>
            </Button>
            <Button variant="default" asChild>
              <a href="/simulado">Tentar Novamente</a>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentQ = mockQuestions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with timer and progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-mono text-lg font-semibold">
              {formatTime(timeLeft)}
            </span>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              Questão {currentQuestion + 1} de {mockQuestions.length}
            </p>
            <p className="text-sm text-muted-foreground">
              {answeredQuestions} respondidas
            </p>
          </div>
        </div>
        
        <Progress value={progressPercentage} className="h-2" />
      </Card>

      {/* Question */}
      <Card className="p-8">
        <h2 className="text-xl font-semibold mb-6 leading-relaxed">
          {currentQ.question}
        </h2>

        <RadioGroup
          value={answers[currentQ.id]?.toString() || ''}
          onValueChange={handleAnswerChange}
          className="space-y-4"
        >
          {currentQ.options.map((option, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
                className="mt-1"
              />
              <Label
                htmlFor={`option-${index}`}
                className="flex-1 text-base leading-relaxed cursor-pointer"
              >
                <span className="font-medium mr-2">
                  {String.fromCharCode(65 + index)})
                </span>
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>

        <div className="flex gap-2">
          {currentQuestion === mockQuestions.length - 1 ? (
            <Button
              variant="success"
              onClick={handleFinishExam}
              disabled={answeredQuestions < mockQuestions.length}
            >
              <Flag className="w-4 h-4 mr-2" />
              Finalizar Simulado
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={handleNextQuestion}
            >
              Próxima
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      {/* Question Navigation Grid */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Navegação Rápida</h3>
        <div className="grid grid-cols-10 gap-2">
          {mockQuestions.map((_, index) => {
            const isAnswered = answers[mockQuestions[index].id] !== undefined;
            const isCurrent = index === currentQuestion;
            
            return (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                  isCurrent
                    ? 'bg-primary text-primary-foreground'
                    : isAnswered
                    ? 'bg-success/20 text-success hover:bg-success/30'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}