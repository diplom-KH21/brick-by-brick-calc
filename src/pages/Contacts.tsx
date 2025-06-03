
import { Building2, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Contacts = () => {
  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: "Телефон",
      details: ["+38 (044) 123-45-67", "+38 (067) 890-12-34"]
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email",
      details: ["vlad.korobeckij@gmail.com", "student.project@ukr.net"]
    },
    {
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      title: "Навчальний заклад",
      details: ["Київський національний університет", "будівництва і архітектури", "м. Київ, Україна"]
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Час для зв'язку",
      details: ["Пн-Пт: 14:00 - 18:00", "Сб-Нд: за домовленістю"]
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
              <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">Про нас</a>
              <a href="/contacts" className="text-blue-600 font-medium">Контакти</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Контактна інформація</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Дипломний проект студента факультету будівництва та архітектури. 
            Калькулятор будівельних робіт створено в рамках випускної кваліфікаційної роботи 
            для автоматизації розрахунку кошторисів будівельних проектів.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Як зі мною зв'язатися</h2>
            
            {contactInfo.map((contact, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {contact.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{contact.title}</h3>
                      {contact.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Project Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Про дипломний проект</h3>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Тема роботи:</strong> "Розробка веб-додатку для автоматизації розрахунку кошторисів будівельних робіт"</p>
                  <p><strong>Автор:</strong> Студент групи БА-20-1</p>
                  <p><strong>Науковий керівник:</strong> к.т.н., доцент кафедри</p>
                  <p><strong>Рік захисту:</strong> 2024</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Зворотний зв'язок</h3>
                <p className="text-gray-600 mb-4">
                  Маєте питання щодо проекту або пропозиції по вдосконаленню? Буду радий отримати ваш відгук!
                </p>
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Mail className="h-5 w-5 mr-2" />
                  Написати листа
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2024 БудКалькулятор - Дипломний проект. Розроблено для навчальних цілей.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contacts;
