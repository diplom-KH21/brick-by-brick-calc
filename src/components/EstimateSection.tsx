
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Save, Download, FileText } from 'lucide-react';
import { generatePDF } from '@/utils/pdfGenerator';
import { formatCurrency } from '@/utils/calculations';
import EstimateTable from './EstimateTable';

interface Service {
  id: string;
  name: string;
  unit: string;
  pricePerUnit: number;
  quantity: number;
}

interface EstimateSectionProps {
  selectedServices: Record<string, number>;
  totalCost: number;
  onRemoveService: (serviceId: string) => void;
  onGeneratePDF: () => void;
  onGenerateEstimate: () => void;
  priceMultiplier?: number;
}

const EstimateSection = ({ 
  selectedServices, 
  totalCost, 
  onRemoveService,
  onGeneratePDF,
  onGenerateEstimate,
  priceMultiplier = 1.0
}: EstimateSectionProps) => {
  const [estimateTitle, setEstimateTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSaveEstimate = async () => {
    if (!user) {
      toast({
        title: "Увага",
        description: "Для збереження кошторису необхідно увійти в систему",
        variant: "destructive",
      });
      return;
    }

    const selectedItems = Object.entries(selectedServices).filter(([_, area]) => area > 0);
    
    if (selectedItems.length === 0) {
      toast({
        title: "Увага",
        description: "Додайте послуги до кошторису перед збереженням",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const title = estimateTitle.trim() || 'Кошторис';
      
      const { error } = await supabase
        .from('user_estimates')
        .insert({
          custom_user_id: user.id,
          title,
          region_id: 'dnipro',
          selected_services: selectedServices,
          total_cost: totalCost
        });

      if (error) {
        console.error('Save estimate error:', error);
        toast({
          title: "Помилка",
          description: "Не вдалося зберегти кошторис",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Успіх",
          description: "Кошторис збережено",
        });
        setEstimateTitle('');
      }
    } catch (error) {
      console.error('Error saving estimate:', error);
      toast({
        title: "Помилка",
        description: "Виникла помилка при збереженні",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const selectedItemsCount = Object.entries(selectedServices).filter(([_, area]) => area > 0).length;

  if (selectedItemsCount === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Оберіть послуги для створення кошторису</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Обрані послуги
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Обрано послуг: {selectedItemsCount}
          </p>
          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
            <span className="text-lg font-medium">Загальна вартість:</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatCurrency(totalCost)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="Назва кошторису (необов'язково)"
            value={estimateTitle}
            onChange={(e) => setEstimateTitle(e.target.value)}
          />
          
          <div className="flex gap-2">
            <Button
              onClick={handleSaveEstimate}
              disabled={isSaving}
              className="flex-1"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Збереження...' : 'Зберегти кошторис'}
            </Button>
            
            <Button
              onClick={onGeneratePDF}
              variant="outline"
              className="flex-1"
            >
              <Download className="mr-2 h-4 w-4" />
              Завантажити PDF
            </Button>
          </div>
          
          <Button
            onClick={onGenerateEstimate}
            className="w-full"
            variant="default"
          >
            <FileText className="mr-2 h-4 w-4" />
            Переглянути детальний кошторис
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimateSection;
