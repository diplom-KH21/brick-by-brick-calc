
import Navigation from "@/components/Navigation";
import { Building2, Users, Award, Clock } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Про БудКалькулятор
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Ми допомагаємо планувати та розраховувати вартість будівельних робіт з 2015 року
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Досвід</h3>
              <p className="text-gray-600">
                Понад 8 років досвіду в будівельній галузі та розробці кошторисів
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Команда</h3>
              <p className="text-gray-600">
                Професійна команда будівельників та інженерів-кошторисників
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Якість</h3>
              <p className="text-gray-600">
                Гарантуємо точність розрахунків та актуальність цін на ринку
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Наша місія</h2>
          <p className="text-lg text-gray-600 mb-8">
            Зробити планування будівельних робіт простим, прозорим та доступним для кожного. 
            Ми віримо, що кожен має право знати точну вартість робіт ще до їх початку.
          </p>
          <div className="flex items-center justify-center">
            <Clock className="h-8 w-8 text-blue-600 mr-3" />
            <span className="text-lg font-medium text-gray-900">
              Економимо ваш час та гроші з 2015 року
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 БудКалькулятор. Всі права захищені.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
