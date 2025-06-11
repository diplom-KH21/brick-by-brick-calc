
import { supabase } from "@/integrations/supabase/client";
import { constructionServices } from "@/data/services";

export interface EstimateData {
  selectedServices: Record<string, number>;
  totalCost: number;
}

export const saveEstimateToDatabase = async (estimateData: EstimateData) => {
  try {
    console.log('Saving estimate to database...', estimateData);
    
    // Create the main estimate record
    const { data: estimate, error: estimateError } = await supabase
      .from('estimates')
      .insert({
        total_cost: estimateData.totalCost
      })
      .select()
      .single();

    if (estimateError) {
      console.error('Error creating estimate:', estimateError);
      throw estimateError;
    }

    console.log('Estimate created:', estimate);

    // Prepare estimate items
    const estimateItems = Object.entries(estimateData.selectedServices)
      .filter(([_, quantity]) => quantity > 0)
      .map(([serviceId, quantity]) => {
        const service = constructionServices.find(s => s.id === serviceId);
        if (!service) {
          throw new Error(`Service with id ${serviceId} not found`);
        }
        
        return {
          estimate_id: estimate.id,
          service_id: serviceId,
          service_name: service.name,
          quantity: quantity,
          unit: service.unit,
          unit_price: service.price,
          total_price: service.price * quantity
        };
      });

    console.log('Estimate items to insert:', estimateItems);

    // Insert estimate items
    const { data: items, error: itemsError } = await supabase
      .from('estimate_items')
      .insert(estimateItems);

    if (itemsError) {
      console.error('Error creating estimate items:', itemsError);
      throw itemsError;
    }

    console.log('Estimate items created successfully');
    return estimate.id;

  } catch (error) {
    console.error('Error saving estimate to database:', error);
    throw error;
  }
};
