import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [playersOnline, setPlayersOnline] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    minecraft_nick: '',
    discord: '',
    email: '',
    reason: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Simulate server status check
  useEffect(() => {
    const checkServer = () => {
      setTimeout(() => {
        setServerStatus(Math.random() > 0.3 ? 'online' : 'offline');
        setPlayersOnline(Math.floor(Math.random() * 50) + 10);
      }, 2000);
    };
    
    checkServer();
    const interval = setInterval(checkServer, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitStatus('idle');
        setFormData({ minecraft_nick: '', discord: '', email: '', reason: '' });
      }, 2000);
    }, 1500);
  };

  const getStatusColor = () => {
    switch (serverStatus) {
      case 'online': return 'text-green-400';
      case 'offline': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getStatusText = () => {
    switch (serverStatus) {
      case 'online': return 'ОНЛАЙН';
      case 'offline': return 'ОФФЛАЙН';
      default: return 'ПРОВЕРКА...';
    }
  };

  return (
    <div className="min-h-screen minecraft-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
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

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-4">
            <span className="text-4xl mr-3">🐕</span>
            <h1 className="font-orbitron text-4xl md:text-5xl font-black text-white">
              CHIWAWA SERVER
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="minecraft-glass p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Добро пожаловать на приватный Minecraft сервер!
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Мы создали уютное место для игры в Minecraft. Вход на сервер только по заявке, 
              чтобы поддерживать дружелюбную атмосферу и качественный геймплей.
            </p>

            {/* Server Status */}
            <div className="mb-8">
              <Card className="minecraft-glass border-none max-w-md mx-auto">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${
                      serverStatus === 'online' ? 'bg-green-400 pulse-animation' : 
                      serverStatus === 'offline' ? 'bg-red-400' : 'bg-yellow-400 pulse-animation'
                    }`} />
                    <span className={`font-bold text-lg ${getStatusColor()}`}>
                      Сервер: {getStatusText()}
                    </span>
                    {serverStatus === 'online' && (
                      <Badge variant="secondary" className="bg-minecraft-gold text-black font-bold">
                        {playersOnline}/100 игроков
                      </Badge>
                    )}
                  </div>
                  {serverStatus === 'online' && (
                    <div className="mt-4 text-white/80 text-sm">
                      <p>IP: <code className="bg-black/30 px-2 py-1 rounded text-minecraft-gold">play.chiwawa.mc</code></p>
                      <p className="mt-1">Версия: <Badge variant="outline" className="text-white border-white/30">1.20.4</Badge></p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="bg-minecraft-gold hover:bg-minecraft-yellow text-black font-bold px-8 py-3 text-lg glow-effect hover-glow transition-all duration-300"
                  >
                    <Icon name="FileText" className="mr-2" />
                    Подать заявку
                  </Button>
                </DialogTrigger>
                <DialogContent className="minecraft-glass border-none text-white max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-orbitron text-2xl text-minecraft-gold">
                      Заявка на вступление
                    </DialogTitle>
                    <DialogDescription className="text-white/80">
                      Заполните форму ниже, чтобы подать заявку на вступление в наш сервер
                    </DialogDescription>
                  </DialogHeader>
                  
                  {submitStatus === 'success' ? (
                    <Alert className="border-green-500 bg-green-500/20">
                      <Icon name="CheckCircle" className="h-4 w-4 text-green-400" />
                      <AlertDescription className="text-green-300">
                        Заявка успешно отправлена! Мы рассмотрим её в ближайшее время.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="minecraft_nick" className="text-white">Minecraft ник</Label>
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
                        <Label htmlFor="discord" className="text-white">Discord</Label>
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
                        <Label htmlFor="reason" className="text-white">Почему хотите к нам?</Label>
                        <Textarea
                          id="reason"
                          name="reason"
                          value={formData.reason}
                          onChange={handleInputChange}
                          placeholder="Расскажите немного о себе и почему хотите играть именно у нас..."
                          required
                          className="bg-black/30 border-white/30 text-white placeholder:text-white/50 min-h-[80px]"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-minecraft-gold hover:bg-minecraft-yellow text-black font-bold py-2"
                        disabled={submitStatus === 'submitting'}
                      >
                        <Icon name="Send" className="mr-2" />
                        {submitStatus === 'submitting' ? 'Отправляем...' : 'Отправить заявку'}
                      </Button>
                    </form>
                  )}
                </DialogContent>
              </Dialog>

              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 font-bold px-8 py-3 text-lg transition-all duration-300"
                onClick={() => window.open('https://discord.gg/chiwawa', '_blank')}
              >
                <Icon name="MessageCircle" className="mr-2" />
                Discord сервер
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="minecraft-glass border-none text-white">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-minecraft-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-minecraft-gold">Дружное сообщество</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-white/80">Мы ценим каждого игрока и поддерживаем атмосферу взаимопомощи</p>
              </CardContent>
            </Card>

            <Card className="minecraft-glass border-none text-white">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-minecraft-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-minecraft-gold">Защита от гриферов</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-white/80">Строгая модерация и система защиты построек от вандализма</p>
              </CardContent>
            </Card>

            <Card className="minecraft-glass border-none text-white">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-minecraft-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" className="h-6 w-6 text-black" />
                </div>
                <CardTitle className="text-minecraft-gold">Стабильная работа</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-white/80">Сервер работает 24/7 на мощном оборудовании</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Rules Section */}
        <section className="max-w-4xl mx-auto">
          <Card className="minecraft-glass border-none text-white">
            <CardHeader className="text-center">
              <CardTitle className="font-orbitron text-2xl text-minecraft-gold">Правила сервера</CardTitle>
              <CardDescription className="text-white/80">
                Простые правила для комфортной игры всех участников
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Icon name="Check" className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-minecraft-gold">Уважение к игрокам</h4>
                    <p className="text-sm text-white/80">Будьте вежливы и дружелюбны</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Icon name="Check" className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-minecraft-gold">Запрет на читы</h4>
                    <p className="text-sm text-white/80">Играем честно без модификаций</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Icon name="Check" className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-minecraft-gold">Нет гриферству</h4>
                    <p className="text-sm text-white/80">Не разрушайте чужие постройки</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Icon name="Check" className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-minecraft-gold">Помощь новичкам</h4>
                    <p className="text-sm text-white/80">Помогайте начинающим игрокам</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/20 bg-black/20 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/80">
              <p>&copy; 2024 Chiwawa Server. Создано с ❤️ для игроков Minecraft</p>
            </div>
            <div className="flex gap-4">
              <a 
                href="mailto:admin@chiwawa.mc" 
                className="text-white/60 hover:text-minecraft-gold transition-colors"
              >
                <Icon name="Mail" className="h-5 w-5" />
              </a>
              <a 
                href="https://discord.gg/chiwawa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-minecraft-gold transition-colors"
              >
                <Icon name="MessageCircle" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;