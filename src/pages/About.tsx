
import Navigation from "@/components/Navigation";
import { Building2, Users, Award, Clock, GraduationCap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Про brick-by-brick
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Дипломний проєкт для автоматичного розрахунку вартості будівельних робіт
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Досвід</h3>
              <p className="text-gray-600">
                Проєкт базується на аналізі реальних потреб будівельної галузі та сучасних підходах до автоматизації кошторисних розрахунків
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Автор</h3>
              <p className="text-gray-600">
                <strong>Коробецький Владислав Романович</strong><br />
                Група КН21<br />
                Спеціальність "Комп'ютерні науки"
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Якість</h3>
              <p className="text-gray-600">
                Використання сучасного технологічного стеку (React, TypeScript, Tailwind CSS) забезпечує точність розрахунків та адаптивний інтерфейс
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Моя місія</h3>
              <p className="text-gray-600">
                Хоча це навчальний проєкт у рамках бакалаврської роботи, він створений з метою реальної допомоги користувачам у плануванні будівництва
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Про проєкт</h2>
          <p className="text-lg text-gray-600 mb-8">
            brick-by-brick — це дипломний проєкт, розроблений у рамках бакалаврської роботи за спеціальністю 
            "Комп'ютерні науки". Мета проєкту — зробити процес попереднього кошторису будівництва простим, 
            прозорим і доступним для звичайного користувача.
          </p>
          <div className="flex items-center justify-center">
            <Clock className="h-8 w-8 text-blue-600 mr-3" />
            <span className="text-lg font-medium text-gray-900">
              Дипломний проєкт 2024 року
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 brick-by-brick. Дипломний проєкт.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
