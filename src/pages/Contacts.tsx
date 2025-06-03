
import { Building2, Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contacts = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: "Телефон",
      details: ["+38 (044) 123-45-67", "+38 (067) 890-12-34"]
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email",
      details: ["info@budkalculator.ua", "support@budkalculator.ua"]
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.phone || !formData.message) {
      toast({
        title: "Помилка",
        description: "Заповніть всі обов'язкові поля",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const emailBody = `
Нова заявка з БудКалькулятора

Ім'я: ${formData.firstName} ${formData.lastName}
Телефон: ${formData.phone}
Email: ${formData.email || 'Не вказано'}
Тема: ${formData.subject || 'Не вказано'}

Повідомлення:
${formData.message}

Дата: ${new Date().toLocaleDateString('uk-UA')} ${new Date().toLocaleTimeString('uk-UA')}
      `.trim();

      // Create mailto link
      const mailtoLink = `mailto:vlad.korobeckij@gmail.com?subject=${encodeURIComponent(`Заявка з БудКалькулятора: ${formData.subject || 'Без теми'}`)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      });

      toast({
        title: "Заявку відправлено",
        description: "Ваше повідомлення буде відправлено через email-клієнт",
      });

    } catch (error) {
      console.error('Помилка відправки:', error);
      toast({
        title: "Помилка відправки",
        description: "Спробуйте ще раз або зв'яжіться з нами за телефоном",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Як з нами зв'язатися</h2>
            
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

            {/* Map placeholder */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Наше розташування</h3>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Інтерактивна карта</p>
                    <p className="text-sm">вул. Хрещатик, 22, Київ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-6 w-6 text-blue-600 mr-2" />
                  Залишити повідомлення
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Ім'я *</Label>
                      <Input 
                        id="firstName" 
                        name="firstName"
                        placeholder="Ваше ім'я" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Прізвище</Label>
                      <Input 
                        id="lastName" 
                        name="lastName"
                        placeholder="Ваше прізвище" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      placeholder="+38 (___) ___-__-__" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="your@email.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Тема звернення</Label>
                    <Input 
                      id="subject" 
                      name="subject"
                      placeholder="Коротко опишіть тему" 
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Повідомлення *</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      placeholder="Детально опишіть ваш проект або питання..."
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Відправляємо..." : "Відправити повідомлення"}
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    * Обов'язкові поля для заповнення
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Quick Contact */}
            <Card className="mt-6">
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
