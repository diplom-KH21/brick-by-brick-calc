
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateTotal = (
  selectedServices: Record<string, { area: number; selected: boolean }>,
  services: Array<{ id: string; price: number }>
): number => {
  return Object.entries(selectedServices).reduce((total, [serviceId, service]) => {
    if (service.selected && service.area > 0) {
      const serviceData = services.find(s => s.id === serviceId);
      if (serviceData) {
        return total + (serviceData.price * service.area);
      }
    }
    return total;
  }, 0);
};

// Новая функция для работы с ценами из базы данных
export const calculateTotalFromDatabase = (
  selectedServices: Record<string, number>,
  getPriceByServiceId: (serviceId: string) => { price: number } | undefined,
  priceMultiplier: number = 1.0
): number => {
  return Object.entries(selectedServices).reduce((total, [serviceId, quantity]) => {
    if (quantity > 0) {
      const service = getPriceByServiceId(serviceId);
      if (service) {
        return total + (service.price * quantity * priceMultiplier);
      }
    }
    return total;
  }, 0);
};
