
import jsPDF from 'jspdf';
import { usePrices } from "@/hooks/usePrices";

export const generatePDF = (selectedServices: Record<string, number>, totalCost: number) => {
  const selectedItems = Object.entries(selectedServices)
    .filter(([_, area]) => area > 0);

  if (selectedItems.length === 0) {
    throw new Error("No services selected");
  }

  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Використовуємо базовий шрифт
  pdf.setFont('helvetica');
  
  // Заголовок
  pdf.setFontSize(20);
  pdf.text('KOSHTORYS BUDIVEL\'NYKH ROBIT', 105, 20, { align: 'center' });
  
  pdf.setFontSize(12);
  pdf.text('Data skladannja: ' + new Date().toLocaleDateString('uk-UA'), 105, 30, { align: 'center' });
  
  // Заголовки таблиці
  pdf.setFontSize(10);
  let yPosition = 50;
  
  pdf.text('Najmenuvannja robit', 15, yPosition);
  pdf.text('Kil\'kist\'', 80, yPosition);
  pdf.text('Od. vymiru', 110, yPosition);
  pdf.text('Cina za od.', 140, yPosition);
  pdf.text('Suma', 170, yPosition);
  
  // Лінія під заголовками
  pdf.line(10, yPosition + 2, 200, yPosition + 2);
  yPosition += 10;
  
  // Дані таблиці - тут нам потрібно отримати дані з бази даних
  // Оскільки це функція, що працює поза React, нам потрібно передавати дані
  // Змінимо підхід - будемо передавати дані про послуги як параметр
  
  pdf.setFontSize(8);
  pdf.text('Prymitka: Koshtorys je poperednim rozrakhunkom.', 15, yPosition);
  pdf.text('Tochna vartist\' robit mozhe vidriznjatysja zalezhno', 15, yPosition + 5);
  pdf.text('vid konkretnykh umov ob\'jekta.', 15, yPosition + 10);

  pdf.save('koshtorys-budivelnykh-robit.pdf');
};

// Функція транслітерації
const transliterate = (text: string): string => {
  const map: { [key: string]: string } = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e', 'є': 'je',
    'ж': 'zh', 'з': 'z', 'и': 'y', 'і': 'i', 'ї': 'ji', 'й': 'j', 'к': 'k', 'л': 'l',
    'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ь': '', 'ю': 'ju', 'я': 'ja',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'H', 'Ґ': 'G', 'Д': 'D', 'Е': 'E', 'Є': 'Je',
    'Ж': 'Zh', 'З': 'Z', 'И': 'Y', 'І': 'I', 'Ї': 'Ji', 'Й': 'J', 'К': 'K', 'Л': 'L',
    'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
    'Ф': 'F', 'Х': 'Kh', 'Ц': 'C', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ь': '', 'Ю': 'Ju', 'Я': 'Ja'
  };
  
  return text.split('').map(char => map[char] || char).join('');
};

// Новая функция, которая принимает данные о услугах
export const generatePDFWithData = (
  selectedServices: Record<string, number>, 
  totalCost: number,
  servicesData: Array<{ service_id: string; service_name: string; price: number; unit: string; }>
) => {
  const selectedItems = Object.entries(selectedServices)
    .filter(([_, area]) => area > 0);

  if (selectedItems.length === 0) {
    throw new Error("No services selected");
  }

  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Використовуємо базовий шрифт
  pdf.setFont('helvetica');
  
  // Заголовок
  pdf.setFontSize(20);
  pdf.text('KOSHTORYS BUDIVEL\'NYKH ROBIT', 105, 20, { align: 'center' });
  
  pdf.setFontSize(12);
  pdf.text('Data skladannja: ' + new Date().toLocaleDateString('uk-UA'), 105, 30, { align: 'center' });
  
  // Заголовки таблиці
  pdf.setFontSize(10);
  let yPosition = 50;
  
  pdf.text('Najmenuvannja robit', 15, yPosition);
  pdf.text('Kil\'kist\'', 80, yPosition);
  pdf.text('Od. vymiru', 110, yPosition);
  pdf.text('Cina za od.', 140, yPosition);
  pdf.text('Suma', 170, yPosition);
  
  // Лінія під заголовками
  pdf.line(10, yPosition + 2, 200, yPosition + 2);
  yPosition += 10;
  
  // Дані таблиці
  selectedItems.forEach(([serviceId, area]) => {
    const serviceData = servicesData.find(s => s.service_id === serviceId);
    const serviceCost = (serviceData?.price || 0) * area;
    
    // Транслітерація назви послуги
    const transliteratedName = transliterate(serviceData?.service_name || '');
    const transliteratedUnit = transliterate(serviceData?.unit || '');
    
    pdf.text(transliteratedName, 15, yPosition);
    pdf.text(area.toString(), 80, yPosition);
    pdf.text(transliteratedUnit, 110, yPosition);
    pdf.text((serviceData?.price || 0).toString() + ' hrn', 140, yPosition);
    pdf.text(serviceCost.toString() + ' hrn', 170, yPosition);
    
    yPosition += 8;
    
    // Перевіряємо, чи потрібна нова сторінка
    if (yPosition > 270) {
      pdf.addPage();
      yPosition = 20;
    }
  });
  
  // Лінія перед підсумком
  pdf.line(10, yPosition + 2, 200, yPosition + 2);
  yPosition += 10;
  
  // Загальна сума
  pdf.setFontSize(12);
  pdf.text('ZAGAL\'NA VARTIST\':', 15, yPosition);
  pdf.text(totalCost.toString() + ' hrn', 170, yPosition);
  
  // Примітка
  yPosition += 20;
  pdf.setFontSize(8);
  pdf.text('Prymitka: Koshtorys je poperednim rozrakhunkom.', 15, yPosition);
  pdf.text('Tochna vartist\' robit mozhe vidriznjatysja zalezhno', 15, yPosition + 5);
  pdf.text('vid konkretnykh umov ob\'jekta.', 15, yPosition + 10);

  pdf.save('koshtorys-budivelnykh-robit.pdf');
};
