import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    minecraft_nick: 'Steve123',
    discord: 'steve#1234',
    email: 'steve@example.com',
    role: 'player',
    status: 'approved',
    joinDate: '2024-01-15',
    lastSeen: '2024-07-30',
    playtime: '125 часов'
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    discord: user.discord,
    email: user.email
  });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...user, ...editData });
    setIsEditModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Одобрена';
      case 'pending': return 'На рассмотрении';
      case 'rejected': return 'Отклонена';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen minecraft-gradient">
      {/* Header */}
      <header className="border-b border-white/20 bg-black/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <span className="text-2xl">🐕</span>
              <h1 className="font-orbitron text-xl font-bold text-white">CHIWAWA SERVER</h1>
            </Link>
            <nav className="flex gap-4">
              <Link to="/" className="text-white/80 hover:text-minecraft-gold transition-colors">
                Главная
              </Link>
              <Link to="/profile" className="text-minecraft-gold font-semibold">
                Профиль
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="minecraft-glass p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-minecraft-gold rounded-lg flex items-center justify-center">
                <Icon name="User" className="h-12 w-12 text-black" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="font-orbitron text-2xl font-bold text-white mb-2">{user.minecraft_nick}</h2>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge className={`${getStatusColor(user.status)} text-white`}>
                    {getStatusText(user.status)}
                  </Badge>
                  <Badge variant="outline" className="text-white border-white/30">
                    {user.role === 'admin' ? 'Администратор' : user.role === 'moderator' ? 'Модератор' : 'Игрок'}
                  </Badge>
                </div>
              </div>
              <div className="md:ml-auto">
                <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-minecraft-gold hover:bg-minecraft-yellow text-black">
                      <Icon name="Edit" className="mr-2 h-4 w-4" />
                      Редактировать
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="minecraft-glass border-none text-white">
                    <DialogHeader>
                      <DialogTitle className="text-minecraft-gold">Редактировать профиль</DialogTitle>
                      <DialogDescription className="text-white/80">
                        Измените информацию о своём профиле
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="discord" className="text-white">Discord</Label>
                        <Input
                          id="discord"
                          value={editData.discord}
                          onChange={(e) => setEditData({ ...editData, discord: e.target.value })}
                          className="bg-black/30 border-white/30 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          className="bg-black/30 border-white/30 text-white"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit" className="bg-minecraft-gold hover:bg-minecraft-yellow text-black">
                          Сохранить
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsEditModalOpen(false)}
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          Отмена
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Profile Tabs */}
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-black/30 border border-white/20">
              <TabsTrigger value="info" className="text-white data-[state=active]:bg-minecraft-gold data-[state=active]:text-black">
                <Icon name="Info" className="mr-2 h-4 w-4" />
                Информация
              </TabsTrigger>
              <TabsTrigger value="stats" className="text-white data-[state=active]:bg-minecraft-gold data-[state=active]:text-black">
                <Icon name="BarChart3" className="mr-2 h-4 w-4" />
                Статистика
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-white data-[state=active]:bg-minecraft-gold data-[state=active]:text-black">
                <Icon name="Settings" className="mr-2 h-4 w-4" />
                Настройки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="minecraft-glass border-none">
                  <CardHeader>
                    <CardTitle className="text-minecraft-gold">Основная информация</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-white">
                    <div className="flex justify-between">
                      <span className="text-white/80">Minecraft ник:</span>
                      <span className="font-semibold">{user.minecraft_nick}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Discord:</span>
                      <span className="font-semibold">{user.discord}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Email:</span>
                      <span className="font-semibold">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Дата регистрации:</span>
                      <span className="font-semibold">{user.joinDate}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="minecraft-glass border-none">
                  <CardHeader>
                    <CardTitle className="text-minecraft-gold">Статус на сервере</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-white">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Статус заявки:</span>
                      <Badge className={`${getStatusColor(user.status)} text-white`}>
                        {getStatusText(user.status)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Роль:</span>
                      <span className="font-semibold">
                        {user.role === 'admin' ? 'Администратор' : user.role === 'moderator' ? 'Модератор' : 'Игрок'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Последний вход:</span>
                      <span className="font-semibold">{user.lastSeen}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Время в игре:</span>
                      <span className="font-semibold">{user.playtime}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="minecraft-glass border-none text-center">
                  <CardContent className="p-6">
                    <Icon name="Clock" className="h-12 w-12 mx-auto mb-4 text-minecraft-gold" />
                    <h3 className="text-lg font-bold text-white mb-2">Время в игре</h3>
                    <p className="text-2xl font-bold text-minecraft-gold">{user.playtime}</p>
                  </CardContent>
                </Card>

                <Card className="minecraft-glass border-none text-center">
                  <CardContent className="p-6">
                    <Icon name="Trophy" className="h-12 w-12 mx-auto mb-4 text-minecraft-gold" />
                    <h3 className="text-lg font-bold text-white mb-2">Достижения</h3>
                    <p className="text-2xl font-bold text-minecraft-gold">47</p>
                  </CardContent>
                </Card>

                <Card className="minecraft-glass border-none text-center">
                  <CardContent className="p-6">
                    <Icon name="Users" className="h-12 w-12 mx-auto mb-4 text-minecraft-gold" />
                    <h3 className="text-lg font-bold text-white mb-2">Друзья</h3>
                    <p className="text-2xl font-bold text-minecraft-gold">12</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              <Card className="minecraft-glass border-none">
                <CardHeader>
                  <CardTitle className="text-minecraft-gold">Настройки аккаунта</CardTitle>
                  <CardDescription className="text-white/80">
                    Управление настройками вашего профиля
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-black/20 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-white">Уведомления Discord</h4>
                      <p className="text-sm text-white/80">Получать уведомления о событиях на сервере</p>
                    </div>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Включено
                    </Button>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-black/20 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-white">Приватность профиля</h4>
                      <p className="text-sm text-white/80">Показывать статистику другим игрокам</p>
                    </div>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                      Публичный
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-white/20">
                    <Button 
                      onClick={handleLogout}
                      variant="destructive" 
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      <Icon name="LogOut" className="mr-2 h-4 w-4" />
                      Выйти из аккаунта
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;