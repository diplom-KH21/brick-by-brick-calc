
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
      details: ["vlad.korobeckij@gmail.com", "support@budkalculator.ua"]
    },
    {
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      title: "Адреса",
      details: ["вул. Хрещатик, 22", "Київ, 01001, Україна"]
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Години роботи",
      details: ["Пн-Пт: 9:00 - 18:00", "Сб: 10:00 - 16:00", "Нд: вихідний"]
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Наші контакти</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Маєте питання або готові розпочати проект? Зв'яжіться з нами зручним для вас способом. 
            Наші експерти завжди готові надати професійну консультацію.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Як з нами зв'язатися</h2>
            
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

            {/* Quick Contact */}
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Швидкий зв'язок</h3>
                <p className="text-gray-600 mb-4">
                  Потрібна термінова консультація? Зателефонуйте нам прямо зараз!
                </p>
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Phone className="h-5 w-5 mr-2" />
                  Зателефонувати зараз
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
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

export default Contacts;
