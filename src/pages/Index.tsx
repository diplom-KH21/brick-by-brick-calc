
import CalculatorForm from "@/components/CalculatorForm";
import BackgroundScraper from "@/components/BackgroundScraper";
import ScrollToTop from "@/components/ScrollToTop";
import { Building2, Calculator } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Скрытый парсер работает в фоне */}
      <BackgroundScraper />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">БудКалькулятор</h1>
            </div>
            <nav className="flex space-x-4 md:space-x-8">
              <a href="/" className="text-blue-600 font-medium text-sm md:text-base">Послуги</a>
              <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors text-sm md:text-base">Про нас</a>
              <a href="/contacts" className="text-gray-600 hover:text-blue-600 transition-colors text-sm md:text-base">Контакти</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Calculator className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Калькулятор будівельних робіт
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Розрахуйте вартість ремонту та будівельних робіт онлайн. 
            Оберіть необхідні послуги та отримайте точну кошторис проекту.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <CalculatorForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 БудКалькулятор. Всі права захищені.</p>
        </div>
      </footer>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

export default Index;
