
import { Building2, Users, Award, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Студентський проект",
      description: "Дипломна робота з розробки сучасного веб-додатку для розрахунку будівельних робіт"
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Сучасні технології",
      description: "Використання найновіших веб-технологій та бібліотек для створення зручного інтерфейсу"
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Інноваційний підхід",
      description: "Розробка зручного калькулятора для швидкого розрахунку вартості будівельних послуг"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
      title: "Практичне застосування",
      description: "Реальна можливість використання для планування ремонтних робіт"
    }
  ];

  const techSpecs = [
    // Row 1
    { name: "React", description: "Фронтенд фреймворк" },
    { name: "TypeScript", description: "Типізована мова програмування" },
    { name: "Tailwind CSS", description: "Система стилізації" },
    { name: "Vite", description: "Інструмент збірки" },
    // Row 2
    { name: "shadcn/ui", description: "Бібліотека компонентів" },
    { name: "Lucide", description: "Набір іконок" },
    { name: "jsPDF", description: "Генерація PDF" },
    { name: "React Router", description: "Маршрутизація" },
    // Row 3
    { name: "React Query", description: "Управління станом" },
    { name: "React Hook Form", description: "Робота з формами" },
    { name: "Zod", description: "Валідація даних" },
    { name: "Date-fns", description: "Робота з датами" }
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Про проект</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Це дипломна робота Владислава Романовича Коробецького, група КН-21, 
            Технологічний університет "КРОК". Проект присвячений створенню сучасного 
            веб-додатку для розрахунку вартості будівельних та ремонтних робіт.
          </p>
        </div>

        {/* Project Info */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Опис проекту</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-600 leading-relaxed">
            <p className="mb-4">
              <strong>Автор:</strong> Владислав Романович Коробецький<br/>
              <strong>Група:</strong> КН-21<br/>
              <strong>Навчальний заклад:</strong> Технологічний університет "КРОК"<br/>
              <strong>Тип роботи:</strong> Дипломний проект
            </p>
            <p className="mb-4">
              Даний веб-додаток розроблений як частина дипломної роботи і демонструє навички 
              створення сучасних веб-застосунків з використанням передових технологій розробки.
            </p>
            <p className="mb-4">
              Проект включає в себе інтерактивний калькулятор для розрахунку вартості різних 
              видів будівельних робіт, зручний інтерфейс користувача та можливість генерації 
              детального кошторису у форматі PDF.
            </p>
            <p>
              Використані технології: React, TypeScript, Tailwind CSS, shadcn/ui, Vite та інші 
              сучасні інструменти веб-розробки.
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

        {/* Technical Info - 3 rows of 4 items */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Технічні характеристики</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {techSpecs.slice(0, 4).map((tech, index) => (
                  <div key={index}>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{tech.name}</div>
                    <div className="text-gray-600">{tech.description}</div>
                  </div>
                ))}
              </div>
              
              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {techSpecs.slice(4, 8).map((tech, index) => (
                  <div key={index}>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{tech.name}</div>
                    <div className="text-gray-600">{tech.description}</div>
                  </div>
                ))}
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {techSpecs.slice(8, 12).map((tech, index) => (
                  <div key={index}>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{tech.name}</div>
                    <div className="text-gray-600">{tech.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 Дипломна робота Владислава Коробецького. Технологічний університет "КРОК".</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
