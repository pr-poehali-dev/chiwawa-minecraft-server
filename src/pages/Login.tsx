import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login process
    setTimeout(() => {
      if (formData.email === 'admin@chiwawa.mc' && formData.password === 'admin123') {
        localStorage.setItem('token', 'admin-token');
        localStorage.setItem('userRole', 'admin');
        navigate('/admin');
      } else if (formData.email === 'player@example.com' && formData.password === 'player123') {
        localStorage.setItem('token', 'player-token');
        localStorage.setItem('userRole', 'player');
        navigate('/profile');
      } else {
        setError('Неверный email или пароль');
      }
      setIsLoading(false);
    }, 1000);
  };

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

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <span className="text-4xl">🐕</span>
            <h1 className="font-orbitron text-2xl font-bold text-white">CHIWAWA SERVER</h1>
          </Link>
        </div>

        {/* Login Form */}
        <Card className="minecraft-glass border-none">
          <CardHeader className="text-center">
            <CardTitle className="font-orbitron text-2xl text-minecraft-gold">Вход в аккаунт</CardTitle>
            <CardDescription className="text-white/80">
              Войдите в свой аккаунт для доступа к серверу
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4 border-red-500 bg-red-500/20">
                <Icon name="AlertCircle" className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-300">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
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

              <div>
                <Label htmlFor="password" className="text-white">Пароль</Label>
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

              <Button 
                type="submit" 
                className="w-full bg-minecraft-gold hover:bg-minecraft-yellow text-black font-bold py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                    Вход...
                  </>
                ) : (
                  <>
                    <Icon name="LogIn" className="mr-2 h-4 w-4" />
                    Войти
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="flex justify-center">
                <Link 
                  to="/forgot-password" 
                  className="text-minecraft-gold hover:text-minecraft-yellow transition-colors text-sm"
                >
                  Забыли пароль?
                </Link>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-transparent px-2 text-white/60">или</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full border-white/30 text-white hover:bg-white/10"
                onClick={() => window.open('https://discord.gg/chiwawa', '_blank')}
              >
                <Icon name="MessageCircle" className="mr-2 h-4 w-4" />
                Войти через Discord
              </Button>

              <div className="text-center">
                <span className="text-white/60 text-sm">Нет аккаунта? </span>
                <Link 
                  to="/register" 
                  className="text-minecraft-gold hover:text-minecraft-yellow transition-colors text-sm font-medium"
                >
                  Зарегистрироваться
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="minecraft-glass border-none mt-4">
          <CardContent className="p-4">
            <h3 className="text-minecraft-gold font-semibold mb-2">Демо-аккаунты:</h3>
            <div className="space-y-2 text-sm">
              <div className="text-white/80">
                <strong>Админ:</strong> admin@chiwawa.mc / admin123
              </div>
              <div className="text-white/80">
                <strong>Игрок:</strong> player@example.com / player123
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

export default Login;