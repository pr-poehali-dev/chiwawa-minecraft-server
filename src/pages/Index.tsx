import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isServerOnline, setIsServerOnline] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState('pending');
  const [userRole, setUserRole] = useState('user');
  const [formData, setFormData] = useState({
    minecraft_nick: '',
    discord: '',
    email: '',
    reason: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    setApplicationStatus('submitted');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/img/d7202963-e801-42d2-9f71-0ee7f63d2835.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)'
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <img 
              src="/img/7b70888b-8004-4faf-8832-b19e45ba6e6a.jpg" 
              alt="Chiwawa Server Logo" 
              className="w-32 h-32 rounded-2xl glow-effect hover-glow border-4 border-primary/50"
            />
          </div>
          <h1 className="font-orbitron text-6xl font-black mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            CHIWAWA SERVER
          </h1>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Приватный Minecraft сервер. Вход только по заявке. 
            Присоединяйся к нашему дружному сообществу!
          </p>
          
          {/* Server Status */}
          <div className="flex justify-center mb-8">
            <Card className="minecraft-border hover-glow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${isServerOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                  <span className="font-semibold text-lg">
                    Сервер: {isServerOnline ? 'ОНЛАЙН' : 'ОФФЛАЙН'}
                  </span>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    23/100 игроков
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-primary hover:bg-primary/90 font-bold px-8 py-3 text-lg glow-effect hover-glow">
              <Icon name="Users" className="mr-2" />
              Подать заявку
            </Button>
            <Button variant="secondary" className="bg-accent hover:bg-accent/90 font-bold px-8 py-3 text-lg">
              <Icon name="MessageCircle" className="mr-2" />
              Discord
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Tabs defaultValue="apply" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 h-14">
            <TabsTrigger value="apply" className="font-semibold text-base">
              <Icon name="FileText" className="mr-2" />
              Заявка
            </TabsTrigger>
            <TabsTrigger value="profile" className="font-semibold text-base">
              <Icon name="User" className="mr-2" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="server" className="font-semibold text-base">
              <Icon name="Server" className="mr-2" />
              Сервер
            </TabsTrigger>
            <TabsTrigger value="admin" className="font-semibold text-base">
              <Icon name="Shield" className="mr-2" />
              Админ
            </TabsTrigger>
          </TabsList>

          {/* Application Form */}
          <TabsContent value="apply">
            <Card className="minecraft-border">
              <CardHeader>
                <CardTitle className="font-orbitron text-2xl text-primary">Форма заявки</CardTitle>
                <CardDescription>
                  Заполните все поля, чтобы подать заявку на вступление в наш сервер
                </CardDescription>
              </CardHeader>
              <CardContent>
                {applicationStatus === 'submitted' && (
                  <Alert className="mb-6 border-green-500 bg-green-500/10">
                    <Icon name="CheckCircle" className="h-4 w-4" />
                    <AlertDescription>
                      Заявка успешно отправлена! Ожидайте рассмотрения.
                    </AlertDescription>
                  </Alert>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="minecraft_nick">Minecraft ник</Label>
                      <Input
                        id="minecraft_nick"
                        name="minecraft_nick"
                        value={formData.minecraft_nick}
                        onChange={handleInputChange}
                        placeholder="Steve123"
                        required
                        className="bg-muted"
                      />
                    </div>
                    <div>
                      <Label htmlFor="discord">Discord</Label>
                      <Input
                        id="discord"
                        name="discord"
                        value={formData.discord}
                        onChange={handleInputChange}
                        placeholder="username#1234"
                        required
                        className="bg-muted"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      required
                      className="bg-muted"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="reason">Почему хотите присоединиться?</Label>
                    <Textarea
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      placeholder="Расскажите о себе и почему хотите играть именно у нас..."
                      required
                      className="bg-muted min-h-[100px]"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 font-bold py-3 text-lg glow-effect hover-glow"
                    disabled={applicationStatus === 'submitted'}
                  >
                    <Icon name="Send" className="mr-2" />
                    {applicationStatus === 'submitted' ? 'Заявка отправлена' : 'Отправить заявку'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Profile */}
          <TabsContent value="profile">
            <Card className="minecraft-border">
              <CardHeader>
                <CardTitle className="font-orbitron text-2xl text-secondary">Личный кабинет</CardTitle>
                <CardDescription>
                  Информация о вашем аккаунте и статусе заявки
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Icon name="Gamepad2" className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <p className="font-semibold">Minecraft ник</p>
                          <p className="text-muted-foreground">Steve123</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Icon name="MessageCircle" className="h-8 w-8 mx-auto mb-2 text-accent" />
                          <p className="font-semibold">Discord</p>
                          <p className="text-muted-foreground">steve#1234</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <Icon name="Mail" className="h-8 w-8 mx-auto mb-2 text-secondary" />
                          <p className="font-semibold">Email</p>
                          <p className="text-muted-foreground">steve@example.com</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Separator />
                  
                  <div className="text-center">
                    <h3 className="font-semibold text-xl mb-4">Статус заявки</h3>
                    <Badge 
                      variant={applicationStatus === 'approved' ? 'default' : applicationStatus === 'pending' ? 'secondary' : 'destructive'}
                      className="text-lg px-6 py-2"
                    >
                      {applicationStatus === 'approved' ? 'Одобрена' : 
                       applicationStatus === 'pending' ? 'На рассмотрении' : 'Отклонена'}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="outline" className="font-semibold">
                      <Icon name="LogOut" className="mr-2" />
                      Выйти
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Server Info */}
          <TabsContent value="server">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="minecraft-border">
                <CardHeader>
                  <CardTitle className="font-orbitron text-xl text-accent">Информация о сервере</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>IP адрес:</span>
                      <code className="bg-muted px-2 py-1 rounded">play.chiwawa.mc</code>
                    </div>
                    <div className="flex justify-between">
                      <span>Версия:</span>
                      <Badge>1.20.4</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Игроков онлайн:</span>
                      <span className="text-green-500 font-semibold">23/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Время работы:</span>
                      <span>24/7</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="minecraft-border">
                <CardHeader>
                  <CardTitle className="font-orbitron text-xl text-primary">Правила сервера</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="h-4 w-4 text-green-500" />
                      Уважайте других игроков
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="h-4 w-4 text-green-500" />
                      Запрещен спам и флуд
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="h-4 w-4 text-green-500" />
                      Не используйте читы
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" className="h-4 w-4 text-green-500" />
                      Помогайте новичкам
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Admin Panel */}
          <TabsContent value="admin">
            {userRole === 'admin' ? (
              <div className="space-y-6">
                <Card className="minecraft-border">
                  <CardHeader>
                    <CardTitle className="font-orbitron text-2xl text-destructive">Админ-панель</CardTitle>
                    <CardDescription>
                      Управление пользователями и заявками
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Icon name="Users" className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <p className="font-semibold text-2xl">23</p>
                          <p className="text-sm text-muted-foreground">Активных игроков</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Icon name="FileText" className="h-8 w-8 mx-auto mb-2 text-secondary" />
                          <p className="font-semibold text-2xl">5</p>
                          <p className="text-sm text-muted-foreground">Заявок на рассмотрении</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Icon name="Shield" className="h-8 w-8 mx-auto mb-2 text-accent" />
                          <p className="font-semibold text-2xl">3</p>
                          <p className="text-sm text-muted-foreground">Администраторов</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="flex flex-wrap gap-4">
                      <Button className="bg-primary hover:bg-primary/90">
                        <Icon name="UserPlus" className="mr-2" />
                        Управление пользователями
                      </Button>
                      <Button variant="secondary">
                        <Icon name="FileCheck" className="mr-2" />
                        Рассмотреть заявки
                      </Button>
                      <Button variant="outline">
                        <Icon name="Settings" className="mr-2" />
                        Настройки сервера
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="minecraft-border">
                <CardContent className="p-12 text-center">
                  <Icon name="Lock" className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-2xl font-semibold mb-2">Доступ запрещен</h3>
                  <p className="text-muted-foreground">
                    У вас нет прав доступа к админ-панели
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-card mt-20 py-8 border-t">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-orbitron font-bold text-primary">
              © 2024 Chiwawa Server
            </div>
            <div className="flex gap-6">
              <a href="mailto:admin@chiwawa.mc" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Mail" className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
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