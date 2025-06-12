
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/data/services";

interface CategorySidebarProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  onCategoryClick: (categoryId: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  selectedCategory,
  onCategoryChange,
  onCategoryClick,
}) => {
  return (
    <div className="sticky top-4">
      <Card className="shadow-lg">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Категорії</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => onCategoryClick(category.id)}
                className={`px-3 py-2 rounded-md transition-colors cursor-pointer hover:bg-gray-100 ${
                  selectedCategory === category.id
                    ? "bg-blue-100 text-blue-700 font-medium border-l-4 border-blue-500"
                    : "text-gray-600"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategorySidebar;
