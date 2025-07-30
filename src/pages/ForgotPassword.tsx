import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    if (!email.trim()) {
      setError('Введите email адрес');
      setIsLoading(false);
      return;
    }

    // Simulate password reset process
    setTimeout(() => {
      setIsSuccess(true);
      setMessage('Инструкции по сбросу пароля отправлены на ваш email');
      setIsLoading(false);
    }, 1500);
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

        {/* Forgot Password Form */}
        <Card className="minecraft-glass border-none">
          <CardHeader className="text-center">
            <CardTitle className="font-orbitron text-2xl text-minecraft-gold">Забыли пароль?</CardTitle>
            <CardDescription className="text-white/80">
              Введите email для получения инструкций по сбросу пароля
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

            {message && (
              <Alert className="mb-4 border-green-500 bg-green-500/20">
                <Icon name="CheckCircle" className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-300">
                  {message}
                </AlertDescription>
              </Alert>
            )}

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-white">Email адрес</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="bg-black/30 border-white/30 text-white placeholder:text-white/50"
                  />
                  <p className="text-sm text-white/60 mt-1">
                    Мы отправим инструкции по сбросу пароля на этот адрес
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-minecraft-gold hover:bg-minecraft-yellow text-black font-bold py-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Icon name="Mail" className="mr-2 h-4 w-4" />
                      Отправить инструкции
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" className="h-8 w-8 text-green-400" />
                </div>
                <p className="text-white/80">
                  Если аккаунт с таким email существует, мы отправили инструкции 
                  по сбросу пароля. Проверьте почту и следуйте указаниям.
                </p>
                <p className="text-sm text-white/60">
                  Не забудьте проверить папку "Спам"
                </p>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-transparent px-2 text-white/60">или</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="w-full border-white/30 text-white hover:bg-white/10"
                  >
                    <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
                    Вернуться к входу
                  </Button>
                </Link>

                <Link to="/register">
                  <Button 
                    variant="outline" 
                    className="w-full border-white/30 text-white hover:bg-white/10"
                  >
                    <Icon name="UserPlus" className="mr-2 h-4 w-4" />
                    Создать новый аккаунт
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Info */}
        <Card className="minecraft-glass border-none mt-4">
          <CardContent className="p-4 text-center">
            <h3 className="text-minecraft-gold font-semibold mb-2">Нужна помощь?</h3>
            <p className="text-white/80 text-sm mb-3">
              Если у вас возникли проблемы с восстановлением пароля, 
              обратитесь к администрации сервера.
            </p>
            <div className="flex justify-center gap-4">
              <a 
                href="mailto:admin@chiwawa.mc" 
                className="text-minecraft-gold hover:text-minecraft-yellow transition-colors text-sm"
              >
                <Icon name="Mail" className="inline mr-1 h-4 w-4" />
                Email
              </a>
              <a 
                href="https://discord.gg/chiwawa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-minecraft-gold hover:text-minecraft-yellow transition-colors text-sm"
              >
                <Icon name="MessageCircle" className="inline mr-1 h-4 w-4" />
                Discord
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-minecraft-gold transition-colors text-sm"
          >
            <Icon name="Home" className="h-4 w-4" />
            На главную страницу
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;