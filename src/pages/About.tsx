
import { Building2, Users, Award, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Досвідчена команда",
      description: "Понад 10 років досвіду в будівельній сфері з командою кваліфікованих спеціалістів"
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Гарантія якості",
      description: "Надаємо гарантію на всі види робіт та використовуємо тільки якісні матеріали"
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Дотримання термінів",
      description: "Завжди виконуємо роботи в обумовлені терміни без затримок"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
      title: "Прозорість цін",
      description: "Чіткий кошторис без прихованих доплат та несподіванок"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">БудКалькулятор</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Послуги</a>
              <a href="/about" className="text-blue-600 font-medium">Про нас</a>
              <a href="/contacts" className="text-gray-600 hover:text-blue-600 transition-colors">Контакти</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Про нашу компанію</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ми - провідна будівельна компанія України, яка спеціалізується на якісних ремонтних та будівельних роботах. 
            Наша місія - зробити будівництво доступним, прозорим та якісним для кожного клієнта.
          </p>
        </div>

        {/* Company Story */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Наша історія</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 leading-relaxed">
            <p className="mb-4">
              Компанія БудКалькулятор була заснована у 2014 році з простою метою - зробити будівельні послуги більш прозорими 
              та доступними для звичайних людей. Почавши як невелика команда ентузіастів, ми виросли в надійного партнера для 
              тисяч клієнтів по всій Україні.
            </p>
            <p className="mb-4">
              За роки роботи ми реалізували понад 2000 проектів різної складності - від косметичного ремонту квартир до 
              будівництва приватних будинків. Наш досвід та професіоналізм дозволяють нам гарантувати якісний результат 
              незалежно від масштабу проекту.
            </p>
            <p>
              Сьогодні БудКалькулятор - це не тільки будівельна компанія, але й онлайн-платформа, яка допомагає клієнтам 
              швидко та точно розрахувати вартість будівельних робіт та знайти найкращі рішення для своїх потреб.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Наші досягнення</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">2000+</div>
                <div className="text-gray-600">Завершених проектів</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                <div className="text-gray-600">Років досвіду</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Кваліфікованих спеціалістів</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600">Задоволених клієнтів</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 БудКалькулятор. Всі права захищені.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
