
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
