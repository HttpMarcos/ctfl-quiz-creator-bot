import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Calendar, 
  Clock, 
  TrendingUp,
  BookOpen
} from 'lucide-react';

interface SimulationResult {
  id: string;
  date: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: string;
  passed: boolean;
}

// Mock data for demonstration
const mockResults: SimulationResult[] = [
  {
    id: '1',
    date: '2024-01-15',
    score: 72.5,
    correctAnswers: 29,
    totalQuestions: 40,
    timeSpent: '1h 15min',
    passed: true
  },
  {
    id: '2',
    date: '2024-01-10',
    score: 62.5,
    correctAnswers: 25,
    totalQuestions: 40,
    timeSpent: '1h 30min',
    passed: false
  },
  {
    id: '3',
    date: '2024-01-05',
    score: 67.5,
    correctAnswers: 27,
    totalQuestions: 40,
    timeSpent: '1h 22min',
    passed: true
  }
];

export default function Historico() {
  const totalAttempts = mockResults.length;
  const passedAttempts = mockResults.filter(r => r.passed).length;
  const averageScore = mockResults.reduce((sum, r) => sum + r.score, 0) / totalAttempts;
  const bestScore = Math.max(...mockResults.map(r => r.score));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Histórico de Simulados</h1>
          <p className="text-muted-foreground mt-1">
            Acompanhe seu progresso na preparação CTFL
          </p>
        </div>
        <Button variant="hero" asChild>
          <a href="/simulado">Novo Simulado</a>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalAttempts}</p>
              <p className="text-sm text-muted-foreground">Tentativas</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{passedAttempts}</p>
              <p className="text-sm text-muted-foreground">Aprovações</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{averageScore.toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">Média Geral</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{bestScore}%</p>
              <p className="text-sm text-muted-foreground">Melhor Nota</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Results List */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Resultados Detalhados</h2>
        
        {mockResults.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum simulado realizado</h3>
            <p className="text-muted-foreground mb-6">
              Faça seu primeiro simulado para ver os resultados aqui
            </p>
            <Button variant="hero" asChild>
              <a href="/simulado">Iniciar Primeiro Simulado</a>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {mockResults.map((result) => (
              <div 
                key={result.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    result.passed ? 'bg-success/20' : 'bg-destructive/20'
                  }`}>
                    {result.passed ? (
                      <CheckCircle className="w-6 h-6 text-success" />
                    ) : (
                      <XCircle className="w-6 h-6 text-destructive" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold">
                        Simulado CTFL #{result.id}
                      </h3>
                      <Badge variant={result.passed ? "default" : "destructive"}>
                        {result.passed ? 'Aprovado' : 'Reprovado'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(result.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {result.timeSpent}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold mb-1">
                    {result.score}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {result.correctAnswers}/{result.totalQuestions} acertos
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Performance Tips */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="text-lg font-semibold mb-4 text-primary">
          💡 Dicas para Melhorar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">Para Aprovação (65%)</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Revise os fundamentos de teste</li>
              <li>• Pratique com mais PDFs de provas</li>
              <li>• Foque nos tópicos com mais erros</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Estratégias de Estudo</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Faça simulados regularmente</li>
              <li>• Analise suas respostas incorretas</li>
              <li>• Gerencie bem o tempo durante o teste</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}