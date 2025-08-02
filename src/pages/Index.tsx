import { Layout } from '@/components/Layout';
import { FileUpload } from '@/components/FileUpload';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Award, 
  Upload, 
  FileText, 
  CheckCircle, 
  Users, 
  Target,
  BookOpen,
  TrendingUp
} from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Award className="w-4 h-4" />
            Certificação CTFL
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Simulador 
            <span className="bg-gradient-primary bg-clip-text text-transparent"> CTFL</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Prepare-se para a certificação <strong>Certified Tester Foundation Level</strong> 
            com simulados personalizados gerados a partir das suas provas em PDF
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl">
              Começar Agora
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="/historico">Ver Histórico</a>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-card transition-all duration-300">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload de PDFs</h3>
            <p className="text-muted-foreground">
              Envie suas provas antigas em PDF e nosso sistema extrairá automaticamente as questões
            </p>
          </Card>

          <Card className="p-6 hover:shadow-card transition-all duration-300">
            <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Simulados Personalizados</h3>
            <p className="text-muted-foreground">
              40 questões selecionadas aleatoriamente com timer e aprovação em 65% (26 acertos)
            </p>
          </Card>

          <Card className="p-6 hover:shadow-card transition-all duration-300">
            <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-warning" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Acompanhe seu Progresso</h3>
            <p className="text-muted-foreground">
              Histórico completo com estatísticas e insights para melhorar sua performance
            </p>
          </Card>
        </div>

        {/* Upload Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Como Funciona
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Em 3 passos simples você estará pronto para seus simulados CTFL
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Envie seus PDFs</h3>
              <p className="text-muted-foreground">
                Faça upload das provas CTFL em formato PDF
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Processamento IA</h3>
              <p className="text-muted-foreground">
                Nossa IA extrai automaticamente as questões
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Faça Simulados</h3>
              <p className="text-muted-foreground">
                Pratique com questões reais e receba feedback
              </p>
            </div>
          </div>
        </div>

        {/* File Upload Component */}
        <FileUpload />

        {/* Stats */}
        <Card className="p-8 bg-gradient-primary/5 border-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Questões Extraídas</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1,200+</div>
              <p className="text-muted-foreground">Simulados Realizados</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">85%</div>
              <p className="text-muted-foreground">Taxa de Aprovação</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">40</div>
              <p className="text-muted-foreground">Questões por Simulado</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
