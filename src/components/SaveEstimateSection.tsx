
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Save, Edit } from 'lucide-react';

interface SaveEstimateSectionProps {
  selectedServices: Record<string, number>;
  totalCost: number;
  editingEstimateId?: string | null;
  selectedRegion?: string;
}

const SaveEstimateSection = ({ 
  selectedServices, 
  totalCost, 
  editingEstimateId,
  selectedRegion = 'dnipro'
}: SaveEstimateSectionProps) => {
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
      console.log('Editing estimate ID:', editingEstimateId);
      
      if (editingEstimateId) {
        // Обновляем существующий кошторис
        const { error } = await supabase
          .from('user_estimates')
          .update({
            title,
            region_id: selectedRegion,
            selected_services: selectedServices,
            total_cost: totalCost,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingEstimateId)
          .eq('custom_user_id', user.id);

        if (error) {
          console.error('Update estimate error:', error);
          toast({
            title: "Помилка",
            description: "Не вдалося оновити кошторис: " + error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Успіх",
            description: "Кошторис оновлено",
          });
          setEstimateTitle('');
        }
      } else {
        // Создаем новый кошторис
        const { error } = await supabase
          .from('user_estimates')
          .insert({
            custom_user_id: user.id,
            title,
            region_id: selectedRegion,
            selected_services: selectedServices,
            total_cost: totalCost,
            user_id: '00000000-0000-0000-0000-000000000000'
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

  const isEditing = !!editingEstimateId;

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          {isEditing ? <Edit className="mr-2 h-5 w-5" /> : <Save className="mr-2 h-5 w-5" />}
          {isEditing ? 'Оновити кошторис' : 'Зберегти кошторис'}
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
          variant={isEditing ? "default" : "default"}
        >
          {isEditing ? <Edit className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
          {isSaving 
            ? (isEditing ? 'Оновлення...' : 'Збереження...') 
            : (isEditing ? 'Оновити кошторис' : 'Зберегти в особистий кабінет')
          }
        </Button>
      </CardContent>
    </Card>
  );
};

export default SaveEstimateSection;
