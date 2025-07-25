import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from '@/utils/calculations';
import { generatePDFWithData } from '@/utils/pdfGenerator';
import { usePrices } from '@/hooks/usePrices';
import { regions } from '@/components/RegionSelector';
import Navigation from '@/components/Navigation';
import { User, LogOut, FileText, Trash2, Plus, Download, Edit } from 'lucide-react';

interface UserEstimate {
  id: string;
  title: string;
  region_id: string;
  selected_services: any;
  total_cost: number;
  created_at: string;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [estimates, setEstimates] = useState<UserEstimate[]>([]);
  const [loading, setLoading] = useState(true);
  const { getPriceByServiceId } = usePrices();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    fetchEstimates();
  }, [user, navigate]);

  const fetchEstimates = async () => {
    if (!user) return;
    
    try {
      console.log('Fetching estimates for user:', user.id);
      
      const { data, error } = await supabase
        .from('user_estimates')
        .select('*')
        .eq('custom_user_id', user.id)
        .order('created_at', { ascending: false });

      console.log('Fetch estimates response:', { data, error });

      if (error) {
        console.error('Fetch estimates error:', error);
        toast({
          title: "Помилка",
          description: "Не вдалося завантажити кошториси: " + error.message,
          variant: "destructive",
        });
      } else {
        setEstimates(data || []);
      }
    } catch (error) {
      console.error('Error fetching estimates:', error);
      toast({
        title: "Помилка",
        description: "Виникла помилка при завантаженні кошторисів",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Не вдалося вийти з системи",
        variant: "destructive",
      });
    }
  };

  const deleteEstimate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_estimates')
        .delete()
        .eq('id', id)
        .eq('custom_user_id', user?.id);

      if (error) {
        toast({
          title: "Помилка",
          description: "Не вдалося видалити кошторис: " + error.message,
          variant: "destructive",
        });
      } else {
        setEstimates(estimates.filter(est => est.id !== id));
        toast({
          title: "Успіх",
          description: "Кошторис видалено",
        });
      }
    } catch (error) {
      console.error('Error deleting estimate:', error);
      toast({
        title: "Помилка",
        description: "Виникла помилка при видаленні кошторису",
        variant: "destructive",
      });
    }
  };

  const downloadEstimate = async (estimate: UserEstimate) => {
    try {
      console.log('Downloading estimate:', estimate);
      
      const selectedServices = estimate.selected_services || {};
      
      // Получаем региональный множитель
      const currentRegion = regions.find(r => r.id === estimate.region_id);
      const priceMultiplier = currentRegion?.priceMultiplier || 1.0;
      
      // Получаем данные о услугах из базы для PDF
      const selectedItems = Object.entries(selectedServices)
        .filter(([_, area]) => (area as number) > 0);

      if (selectedItems.length === 0) {
        toast({
          title: "Помилка",
          description: "В кошторисі немає обраних послуг",
          variant: "destructive",
        });
        return;
      }

      // Подготавливаем данные для PDF с учетом регионального множителя
      const servicesData = selectedItems.map(([serviceId, _]) => {
        const service = getPriceByServiceId(serviceId);
        if (service) {
          return {
            service_id: service.service_id,
            service_name: service.service_name,
            price: service.price * priceMultiplier, // Применяем региональный множитель
            unit: service.unit
          };
        }
        return null;
      }).filter(Boolean) as Array<{ service_id: string; service_name: string; price: number; unit: string; }>;

      console.log('Services data for PDF:', servicesData);
      console.log('Selected services:', selectedServices);
      console.log('Price multiplier:', priceMultiplier);

      generatePDFWithData(selectedServices, estimate.total_cost, servicesData);
      
      toast({
        title: "Успіх",
        description: "Кошторис завантажено",
      });
    } catch (error) {
      console.error('Error downloading estimate:', error);
      toast({
        title: "Помилка",
        description: "Виникла помилка при завантаженні кошторису",
        variant: "destructive",
      });
    }
  };

  const editEstimate = (estimate: UserEstimate) => {
    // Передаем данные кошторису через state при навигации
    navigate('/', { 
      state: { 
        editEstimate: {
          id: estimate.id,
          title: estimate.title,
          regionId: estimate.region_id,
          selectedServices: estimate.selected_services,
          totalCost: estimate.total_cost
        }
      }
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Navigation Header */}
      <Navigation />
      
      <div className="max-w-6xl mx-auto p-2 sm:p-4">
        {/* Header */}
        <Card className="mb-4 sm:mb-6">
          <CardHeader className="p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <div className="flex items-center">
                <User className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2 sm:mr-3" />
                <div>
                  <CardTitle className="text-lg sm:text-2xl">Особистий кабінет</CardTitle>
                  <p className="text-gray-600 mt-1 text-sm">
                    Логін: {user.username}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={() => navigate('/')}
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm"
                >
                  <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Новий кошторис
                </Button>
                <Button 
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 text-xs sm:text-sm"
                >
                  <LogOut className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  Вийти
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Estimates List */}
        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <FileText className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              Мої кошториси
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            {loading ? (
              <p className="text-center py-8 text-sm">Завантаження...</p>
            ) : estimates.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <FileText className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-sm sm:text-lg mb-4">У вас поки немає збережених кошторисів</p>
                <Button onClick={() => navigate('/')} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Створити перший кошторис
                </Button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {estimates.map((estimate) => (
                  <div key={estimate.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg space-y-3 sm:space-y-0">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">{estimate.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Створено: {new Date(estimate.created_at).toLocaleDateString('uk-UA')}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Регіон: {estimate.region_id}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <span className="text-base sm:text-lg font-semibold text-blue-600">
                        {formatCurrency(estimate.total_cost)}
                      </span>
                      <div className="flex items-center space-x-1 sm:space-x-2 w-full sm:w-auto">
                        <Button
                          onClick={() => editEstimate(estimate)}
                          variant="outline"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex-1 sm:flex-initial text-xs px-2 py-1"
                        >
                          <Edit className="h-3 w-3" />
                          <span className="ml-1 sm:hidden">Редагувати</span>
                        </Button>
                        <Button
                          onClick={() => downloadEstimate(estimate)}
                          variant="outline"
                          size="sm"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50 flex-1 sm:flex-initial text-xs px-2 py-1"
                        >
                          <Download className="h-3 w-3" />
                          <span className="ml-1 sm:hidden">Завантажити</span>
                        </Button>
                        <Button
                          onClick={() => deleteEstimate(estimate.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-1 sm:flex-initial text-xs px-2 py-1"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="ml-1 sm:hidden">Видалити</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
