import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Admin = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      minecraft_nick: 'NewPlayer1',
      discord: 'newplayer#1234',
      email: 'new@example.com',
      reason: 'Хочу играть с друзьями на приватном сервере',
      status: 'pending',
      date: '2024-07-30'
    },
    {
      id: 2,
      minecraft_nick: 'CoolGamer',
      discord: 'coolgamer#5678',
      email: 'cool@example.com',
      reason: 'Играю в Minecraft уже 5 лет, хочу найти хорошее сообщество',
      status: 'approved',
      date: '2024-07-29'
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      minecraft_nick: 'Steve123',
      discord: 'steve#1234',
      email: 'steve@example.com',
      role: 'player',
      status: 'approved',
      lastSeen: '2024-07-30',
      playtime: '125 часов'
    },
    {
      id: 2,
      minecraft_nick: 'Admin',
      discord: 'admin#0001',
      email: 'admin@chiwawa.mc',
      role: 'admin',
      status: 'approved',
      lastSeen: '2024-07-30',
      playtime: '500 часов'
    }
  ]);

  const [serverStats, setServerStats] = useState({
    totalUsers: 23,
    activeUsers: 15,
    pendingApplications: 5,
    onlinePlayers: 12,
    serverUptime: '15 дней',
    totalPlaytime: '2,450 часов'
  });

  const [newsData, setNewsData] = useState({
    title: '',
    content: '',
    author: 'Admin'
  });

  const handleApplicationAction = (applicationId: number, action: 'approve' | 'reject') => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: action === 'approve' ? 'approved' : 'rejected' }
          : app
      )
    );
  };

  const handleUserRoleChange = (userId: number, newRole: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, role: newRole }
          : user
      )
    );
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'moderator': return 'bg-blue-500';
      case 'player': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return 'Администратор';
      case 'moderator': return 'Модератор';
      case 'player': return 'Игрок';
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
              <Link to="/profile" className="text-white/80 hover:text-minecraft-gold transition-colors">
                Профиль
              </Link>
              <Link to="/admin" className="text-minecraft-gold font-semibold">
                Админ-панель
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Admin Header */}
          <div className="minecraft-glass p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center">
                <Icon name="Shield" className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="font-orbitron text-2xl font-bold text-white">Админ-панель</h2>
                <p className="text-white/80">Управление сервером Chiwawa</p>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="minecraft-glass border-none text-center">
              <CardContent className="p-6">
                <Icon name="Users" className="h-8 w-8 mx-auto mb-2 text-minecraft-gold" />
                <h3 className="text-lg font-bold text-white">Всего пользователей</h3>
                <p className="text-2xl font-bold text-minecraft-gold">{serverStats.totalUsers}</p>
              </CardContent>
            </Card>

            <Card className="minecraft-glass border-none text-center">
              <CardContent className="p-6">
                <Icon name="UserCheck" className="h-8 w-8 mx-auto mb-2 text-minecraft-gold" />
                <h3 className="text-lg font-bold text-white">Активные игроки</h3>
                <p className="text-2xl font-bold text-minecraft-gold">{serverStats.activeUsers}</p>
              </CardContent>
            </Card>

            <Card className="minecraft-glass border-none text-center">
              <CardContent className="p-6">
                <Icon name="FileText" className="h-8 w-8 mx-auto mb-2 text-minecraft-gold" />
                <h3 className="text-lg font-bold text-white">Заявки на рассмотрении</h3>
                <p className="text-2xl font-bold text-minecraft-gold">{serverStats.pendingApplications}</p>
              </CardContent>
            </Card>

            <Card className="minecraft-glass border-none text-center">
              <CardContent className="p-6">
                <Icon name="Activity" className="h-8 w-8 mx-auto mb-2 text-minecraft-gold" />
                <h3 className="text-lg font-bold text-white">Онлайн сейчас</h3>
                <p className="text-2xl font-bold text-minecraft-gold">{serverStats.onlinePlayers}</p>
              </CardContent>
            </Card>
          </div>

          {/* Admin Tabs */}
          <Tabs defaultValue="applications" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-black/30 border border-white/20">
              <TabsTrigger value="applications" className="text-white data-[state=active]:bg-minecraft-gold data-[state=active]:text-black">
                <Icon name="FileText" className="mr-2 h-4 w-4" />
                Заявки
              </TabsTrigger>
              <TabsTrigger value="users" className="text-white data-[state=active]:bg-minecraft-gold data-[state=active]:text-black">
                <Icon name="Users" className="mr-2 h-4 w-4" />
                Пользователи
              </TabsTrigger>
              <TabsTrigger value="server" className="text-white data-[state=active]:bg-minecraft-gold data-[state=active]:text-black">
                <Icon name="Server" className="mr-2 h-4 w-4" />
                Сервер
              </TabsTrigger>
              <TabsTrigger value="news" className="text-white data-[state=active]:bg-minecraft-gold data-[state=active]:text-black">
                <Icon name="Newspaper" className="mr-2 h-4 w-4" />
                Новости
              </TabsTrigger>
            </TabsList>

            <TabsContent value="applications">
              <Card className="minecraft-glass border-none">
                <CardHeader>
                  <CardTitle className="text-minecraft-gold">Заявки на вступление</CardTitle>
                  <CardDescription className="text-white/80">
                    Рассмотрите заявки новых игроков
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20">
                        <TableHead className="text-white">Ник</TableHead>
                        <TableHead className="text-white">Discord</TableHead>
                        <TableHead className="text-white">Email</TableHead>
                        <TableHead className="text-white">Статус</TableHead>
                        <TableHead className="text-white">Дата</TableHead>
                        <TableHead className="text-white">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((app) => (
                        <TableRow key={app.id} className="border-white/20">
                          <TableCell className="text-white font-medium">{app.minecraft_nick}</TableCell>
                          <TableCell className="text-white/80">{app.discord}</TableCell>
                          <TableCell className="text-white/80">{app.email}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(app.status)} text-white`}>
                              {getStatusText(app.status)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-white/80">{app.date}</TableCell>
                          <TableCell>
                            {app.status === 'pending' && (
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() => handleApplicationAction(app.id, 'approve')}
                                >
                                  <Icon name="Check" className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => handleApplicationAction(app.id, 'reject')}
                                >
                                  <Icon name="X" className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card className="minecraft-glass border-none">
                <CardHeader>
                  <CardTitle className="text-minecraft-gold">Управление пользователями</CardTitle>
                  <CardDescription className="text-white/80">
                    Управляйте ролями и статусами пользователей
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20">
                        <TableHead className="text-white">Ник</TableHead>
                        <TableHead className="text-white">Discord</TableHead>
                        <TableHead className="text-white">Роль</TableHead>
                        <TableHead className="text-white">Последний вход</TableHead>
                        <TableHead className="text-white">Время в игре</TableHead>
                        <TableHead className="text-white">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id} className="border-white/20">
                          <TableCell className="text-white font-medium">{user.minecraft_nick}</TableCell>
                          <TableCell className="text-white/80">{user.discord}</TableCell>
                          <TableCell>
                            <Badge className={`${getRoleColor(user.role)} text-white`}>
                              {getRoleText(user.role)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-white/80">{user.lastSeen}</TableCell>
                          <TableCell className="text-white/80">{user.playtime}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                                  <Icon name="Edit" className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="minecraft-glass border-none text-white">
                                <DialogHeader>
                                  <DialogTitle className="text-minecraft-gold">Редактировать пользователя</DialogTitle>
                                  <DialogDescription className="text-white/80">
                                    Изменить роль пользователя {user.minecraft_nick}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label className="text-white">Роль</Label>
                                    <div className="flex gap-2 mt-2">
                                      <Button 
                                        size="sm" 
                                        variant={user.role === 'player' ? 'default' : 'outline'}
                                        className={user.role === 'player' ? 'bg-minecraft-gold text-black' : 'border-white/30 text-white hover:bg-white/10'}
                                        onClick={() => handleUserRoleChange(user.id, 'player')}
                                      >
                                        Игрок
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant={user.role === 'moderator' ? 'default' : 'outline'}
                                        className={user.role === 'moderator' ? 'bg-minecraft-gold text-black' : 'border-white/30 text-white hover:bg-white/10'}
                                        onClick={() => handleUserRoleChange(user.id, 'moderator')}
                                      >
                                        Модератор
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant={user.role === 'admin' ? 'default' : 'outline'}
                                        className={user.role === 'admin' ? 'bg-minecraft-gold text-black' : 'border-white/30 text-white hover:bg-white/10'}
                                        onClick={() => handleUserRoleChange(user.id, 'admin')}
                                      >
                                        Админ
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="server">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="minecraft-glass border-none">
                  <CardHeader>
                    <CardTitle className="text-minecraft-gold">Статистика сервера</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-white">
                    <div className="flex justify-between">
                      <span className="text-white/80">Время работы:</span>
                      <span className="font-semibold">{serverStats.serverUptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Общее время игры:</span>
                      <span className="font-semibold">{serverStats.totalPlaytime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Активных игроков:</span>
                      <span className="font-semibold">{serverStats.activeUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Всего пользователей:</span>
                      <span className="font-semibold">{serverStats.totalUsers}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="minecraft-glass border-none">
                  <CardHeader>
                    <CardTitle className="text-minecraft-gold">Управление сервером</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-minecraft-gold hover:bg-minecraft-yellow text-black">
                      <Icon name="RotateCcw" className="mr-2 h-4 w-4" />
                      Перезагрузить сервер
                    </Button>
                    <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                      <Icon name="Download" className="mr-2 h-4 w-4" />
                      Создать бэкап
                    </Button>
                    <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                      <Icon name="Settings" className="mr-2 h-4 w-4" />
                      Настройки сервера
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="news">
              <Card className="minecraft-glass border-none">
                <CardHeader>
                  <CardTitle className="text-minecraft-gold">Публикация новостей</CardTitle>
                  <CardDescription className="text-white/80">
                    Создайте новость для пользователей сервера
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="news-title" className="text-white">Заголовок новости</Label>
                      <Input
                        id="news-title"
                        value={newsData.title}
                        onChange={(e) => setNewsData({ ...newsData, title: e.target.value })}
                        placeholder="Введите заголовок..."
                        className="bg-black/30 border-white/30 text-white placeholder:text-white/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="news-content" className="text-white">Содержание</Label>
                      <Textarea
                        id="news-content"
                        value={newsData.content}
                        onChange={(e) => setNewsData({ ...newsData, content: e.target.value })}
                        placeholder="Введите текст новости..."
                        className="bg-black/30 border-white/30 text-white placeholder:text-white/50 min-h-[150px]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="news-author" className="text-white">Автор</Label>
                      <Input
                        id="news-author"
                        value={newsData.author}
                        onChange={(e) => setNewsData({ ...newsData, author: e.target.value })}
                        className="bg-black/30 border-white/30 text-white"
                      />
                    </div>
                    <Button className="w-full bg-minecraft-gold hover:bg-minecraft-yellow text-black">
                      <Icon name="Send" className="mr-2 h-4 w-4" />
                      Опубликовать новость
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;