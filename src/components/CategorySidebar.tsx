
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/data/services";

interface CategorySidebarProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <Card className="shadow-lg sticky top-4">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Категорії</h3>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange("all")}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
              selectedCategory === "all"
                ? "bg-blue-100 text-blue-700 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            📋 Усі послуги
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedCategory === category.id
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySidebar;
