
import React, { forwardRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download } from "lucide-react";
import { formatCurrency } from "@/utils/calculations";
import { constructionServices } from "@/data/services";

interface EstimateTableProps {
  selectedServices: Record<string, number>;
  totalCost: number;
  onGeneratePDF: () => void;
}

const EstimateTable = forwardRef<HTMLDivElement, EstimateTableProps>(
  ({ selectedServices, totalCost, onGeneratePDF }, ref) => {
    const selectedItems = Object.entries(selectedServices)
      .filter(([_, area]) => area > 0);

    if (selectedItems.length === 0) return null;

    return (
      <div ref={ref} className="mt-12">
        <Card className="shadow-lg border-2 border-green-200 bg-green-50">
          <CardHeader className="bg-green-100 rounded-t-lg">
            <CardTitle className="flex items-center text-2xl text-green-800">
              <CheckCircle className="mr-3 h-6 w-6" />
              Кошторис будівельних робіт
            </CardTitle>
            <p className="text-green-700">
              Дата складання: {new Date().toLocaleDateString('uk-UA')}
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Обрані послуги:</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Найменування робіт</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Кількість</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Од. виміру</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Ціна за од.</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Сума</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItems.map(([serviceId, area]) => {
                      const serviceData = constructionServices.find(s => s.id === serviceId);
                      const serviceCost = (serviceData?.price || 0) * area;
                      return (
                        <tr key={serviceId} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium">
                            {serviceData?.name}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            {area}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            {serviceData?.unit}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">
                            {formatCurrency(serviceData?.price || 0)}
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center font-semibold">
                            {formatCurrency(serviceCost)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-blue-100 font-bold">
                      <td className="border border-gray-300 px-4 py-3" colSpan={4}>
                        ЗАГАЛЬНА ВАРТІСТЬ:
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center text-lg text-blue-700">
                        {formatCurrency(totalCost)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Примітка:</strong> Кошторис є попереднім розрахунком. Точна вартість робіт може відрізнятися 
                  залежно від конкретних умов об'єкта, складності виконання робіт та ринкових цін на матеріали.
                </p>
              </div>

              <div className="flex justify-center mt-6">
                <Button 
                  onClick={onGeneratePDF}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Завантажити кошторис у форматі PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
);

EstimateTable.displayName = "EstimateTable";

export default EstimateTable;
