
import Navigation from "@/components/Navigation";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contacts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Контакти
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Зв'яжіться з нами для отримання консультації або індивідуального розрахунку
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Адреса</h3>
              <p className="text-gray-600">
                м. Київ, вул. Будівельна, 123<br />
                офіс 45
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Телефон</h3>
              <p className="text-gray-600">
                +38 (044) 123-45-67<br />
                +38 (050) 987-65-43
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Email</h3>
              <p className="text-gray-600">
                info@budcalculator.ua<br />
                support@budcalculator.ua
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Графік роботи</h3>
              <p className="text-gray-600">
                Пн-Пт: 9:00 - 18:00<br />
                Сб: 10:00 - 15:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 brick-by-brick. Всі права захищені.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contacts;
