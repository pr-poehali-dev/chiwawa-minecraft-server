import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    minecraft_nick: '',
    discord: '',
    email: '',
    password: '',
    confirmPassword: '',
    reason: '',
    agreeToRules: false
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.minecraft_nick.trim()) {
      newErrors.push('Введите Minecraft ник');
    }
    if (!formData.discord.trim()) {
      newErrors.push('Введите Discord');
    }
    if (!formData.email.trim()) {
      newErrors.push('Введите email');
    }
    if (!formData.password) {
      newErrors.push('Введите пароль');
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.push('Пароли не совпадают');
    }
    if (formData.password.length < 6) {
      newErrors.push('Пароль должен содержать минимум 6 символов');
    }
    if (!formData.reason.trim()) {
      newErrors.push('Объясните, почему хотите к нам присоединиться');
    }
    if (!formData.agreeToRules) {
      newErrors.push('Согласитесь с правилами сервера');
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    // Simulate registration process
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen minecraft-gradient flex items-center justify-center p-4">
        <div className="w-full max-w-md relative z-10">
          <Card className="minecraft-glass border-none text-center">
            <CardContent className="p-8">
              <div className="mb-4">
                <Icon name="CheckCircle" className="h-16 w-16 mx-auto text-green-400" />
              </div>
              <h2 className="font-orbitron text-2xl font-bold text-minecraft-gold mb-4">
                Заявка отправлена!
              </h2>
              <p className="text-white/80 mb-6">
                Ваша заявка успешно отправлена и ожидает рассмотрения администрацией. 
                Мы уведомим вас о решении на указанный email.
              </p>
              <p className="text-sm text-white/60 mb-4">
                Перенаправление на страницу входа через несколько секунд...
              </p>
              <Link to="/login">
                <Button className="bg-minecraft-gold hover:bg-minecraft-yellow text-black">
                  Перейти к входу
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen minecraft-gradient flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10">
          <img 
            src="/img/1b1e4f80-f5d9-4e3b-8685-a0a1a1e90b77.jpg" 
            alt="Minecraft Skin Left" 
            className="w-32 h-40 minecraft-skin"
          />
        </div>
        <div className="absolute top-20 right-10">
          <img 
            src="/img/6dc04d22-99f4-4d16-b265-151ba1c7d757.jpg" 
            alt="Minecraft Skin Right" 
            className="w-32 h-40 minecraft-skin"
          />
        </div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <span className="text-4xl">🐕</span>
            <h1 className="font-orbitron text-2xl font-bold text-white">CHIWAWA SERVER</h1>
          </Link>
        </div>

        {/* Registration Form */}
        <Card className="minecraft-glass border-none">
          <CardHeader className="text-center">
            <CardTitle className="font-orbitron text-2xl text-minecraft-gold">Регистрация</CardTitle>
            <CardDescription className="text-white/80">
              Подайте заявку на вступление в наш сервер
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errors.length > 0 && (
              <Alert className="mb-4 border-red-500 bg-red-500/20">
                <Icon name="AlertCircle" className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-300">
                  <ul className="list-disc pl-4 space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minecraft_nick" className="text-white">Minecraft ник *</Label>
                  <Input
                    id="minecraft_nick"
                    name="minecraft_nick"
                    value={formData.minecraft_nick}
                    onChange={handleInputChange}
                    placeholder="Steve123"
                    required
                    className="bg-black/30 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>

                <div>
                  <Label htmlFor="discord" className="text-white">Discord *</Label>
                  <Input
                    id="discord"
                    name="discord"
                    value={formData.discord}
                    onChange={handleInputChange}
                    placeholder="username#1234"
                    required
                    className="bg-black/30 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                  className="bg-black/30 border-white/30 text-white placeholder:text-white/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password" className="text-white">Пароль *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    className="bg-black/30 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-white">Подтвердите пароль *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    className="bg-black/30 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="reason" className="text-white">Почему хотите присоединиться? *</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Расскажите немного о себе и почему хотите играть именно у нас..."
                  required
                  className="bg-black/30 border-white/30 text-white placeholder:text-white/50 min-h-[100px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToRules"
                  checked={formData.agreeToRules}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, agreeToRules: checked as boolean })
                  }
                  className="border-white/30"
                />
                <Label htmlFor="agreeToRules" className="text-white text-sm">
                  Я согласен с{' '}
                  <Link to="/" className="text-minecraft-gold hover:text-minecraft-yellow">
                    правилами сервера
                  </Link>
                  {' '}*
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-minecraft-gold hover:bg-minecraft-yellow text-black font-bold py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                    Отправка заявки...
                  </>
                ) : (
                  <>
                    <Icon name="Send" className="mr-2 h-4 w-4" />
                    Подать заявку
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-transparent px-2 text-white/60">или</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-white/60 text-sm">Уже есть аккаунт? </span>
                <Link 
                  to="/login" 
                  className="text-minecraft-gold hover:text-minecraft-yellow transition-colors text-sm font-medium"
                >
                  Войти
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-minecraft-gold transition-colors text-sm"
          >
            <Icon name="ArrowLeft" className="h-4 w-4" />
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;