
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Save } from 'lucide-react';

interface SaveEstimateSectionProps {
  selectedServices: Record<string, number>;
  totalCost: number;
}

const SaveEstimateSection = ({ selectedServices, totalCost }: SaveEstimateSectionProps) => {
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
      
      console.log('Saving estimate with user:', user);
      console.log('Selected services:', selectedServices);
      console.log('Total cost:', totalCost);
      
      const { error } = await supabase
        .from('user_estimates')
        .insert({
          custom_user_id: user.id,
          user_id: user.id, // Используем тот же ID для совместимости
          title,
          region_id: 'dnipro',
          selected_services: selectedServices,
          total_cost: totalCost
        });

      if (error) {
        console.error('Save estimate error:', error);
        toast({
          title: "Помилка",
          description: "Не вдалося зберегти кошторис: " + error.message,
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

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Save className="mr-2 h-5 w-5" />
          Зберегти кошторис
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Назва кошторису (необов'язково)"
          value={estimateTitle}
          onChange={(e) => setEstimateTitle(e.target.value)}
        />
        
        <Button
          onClick={handleSaveEstimate}
          disabled={isSaving}
          className="w-full"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Збереження...' : 'Зберегти в особистий кабінет'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SaveEstimateSection;
