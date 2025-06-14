
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
  selectedServices: Service[];
  totalCost: number;
  regionId: string;
  onRemoveService: (serviceId: string) => void;
  onUpdateQuantity: (serviceId: string, quantity: number) => void;
}

const EstimateSection = ({ 
  selectedServices, 
  totalCost, 
  regionId,
  onRemoveService,
  onUpdateQuantity 
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

    if (selectedServices.length === 0) {
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
          region_id: regionId,
          selected_services: selectedServices,
          total_cost: totalCost
        });

      if (error) {
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

  const handleDownloadPDF = () => {
    const title = estimateTitle.trim() || 'Кошторис';
    generatePDF(selectedServices, totalCost, regionId, title);
  };

  if (selectedServices.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Кошторис
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <EstimateTable 
          services={selectedServices}
          onRemoveService={onRemoveService}
          onUpdateQuantity={onUpdateQuantity}
        />
        
        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
          <span className="text-lg font-medium">Загальна вартість:</span>
          <span className="text-2xl font-bold text-blue-600">
            {formatCurrency(totalCost)}
          </span>
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
              onClick={handleDownloadPDF}
              variant="outline"
              className="flex-1"
            >
              <Download className="mr-2 h-4 w-4" />
              Завантажити PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimateSection;
