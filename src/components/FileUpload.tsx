import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, X, Check } from 'lucide-react';

interface UploadedFile {
  file: File;
  id: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  extractedQuestions?: number;
}

export const FileUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: 'uploading' as const,
      progress: 0,
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate file upload and processing
    newFiles.forEach(uploadedFile => {
      simulateUpload(uploadedFile.id);
    });
  }, []);

  const simulateUpload = (fileId: string) => {
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadedFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          if (file.progress < 100 && file.status === 'uploading') {
            return { ...file, progress: file.progress + 10 };
          } else if (file.progress >= 100 && file.status === 'uploading') {
            return { ...file, status: 'processing', progress: 0 };
          } else if (file.status === 'processing' && file.progress < 100) {
            return { ...file, progress: file.progress + 15 };
          } else if (file.status === 'processing' && file.progress >= 100) {
            const questionsFound = Math.floor(Math.random() * 30) + 20; // 20-50 questions
            toast({
              title: "PDF Processado",
              description: `${questionsFound} questões extraídas com sucesso!`,
            });
            return { 
              ...file, 
              status: 'completed', 
              progress: 100,
              extractedQuestions: questionsFound 
            };
          }
        }
        return file;
      }));
    }, 500);

    // Clean up interval after completion
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: true,
  });

  const totalQuestions = uploadedFiles
    .filter(file => file.status === 'completed')
    .reduce((sum, file) => sum + (file.extractedQuestions || 0), 0);

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="p-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
            ${isDragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Envie suas provas CTFL em PDF
          </h3>
          <p className="text-muted-foreground mb-4">
            Arraste e solte os arquivos aqui ou clique para selecionar
          </p>
          <Button variant="outline">
            Selecionar Arquivos PDF
          </Button>
        </div>
      </Card>

      {/* Stats */}
      {totalQuestions > 0 && (
        <Card className="p-6 bg-gradient-success/10 border-success/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-success-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-success">
                {totalQuestions} questões disponíveis
              </h3>
              <p className="text-success/80 text-sm">
                Pronto para gerar simulados personalizados
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Arquivos enviados</h3>
          {uploadedFiles.map((uploadedFile) => (
            <Card key={uploadedFile.id} className="p-4">
              <div className="flex items-center gap-4">
                <FileText className="w-8 h-8 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{uploadedFile.file.name}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-muted-foreground">
                          {uploadedFile.status === 'uploading' && 'Enviando...'}
                          {uploadedFile.status === 'processing' && 'Extraindo questões...'}
                          {uploadedFile.status === 'completed' && 
                            `✅ ${uploadedFile.extractedQuestions} questões extraídas`}
                          {uploadedFile.status === 'error' && '❌ Erro no processamento'}
                        </span>
                      </div>
                      {uploadedFile.status !== 'completed' && (
                        <Progress value={uploadedFile.progress} className="h-2" />
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(uploadedFile.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Start Simulation Button */}
      {totalQuestions >= 40 && (
        <div className="text-center">
          <Button variant="hero" size="xl" asChild>
            <a href="/simulado">
              Iniciar Simulado CTFL
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            40 questões serão selecionadas aleatoriamente
          </p>
        </div>
      )}
    </div>
  );
};