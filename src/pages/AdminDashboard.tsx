import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Star, 
  Search,
  Plus,
  MoreHorizontal,
  Settings,
  Building2
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("analytics");

  // Mock data
  const analyticsData = {
    totalUsers: 156,
    totalBookings: 342,
    todayBookings: 23,
    rating: 4.6
  };

  const chartData = [
    { room: "Conference A", bookings: 45 },
    { room: "Meeting B", bookings: 32 },
    { room: "Board Room", bookings: 28 },
    { room: "Video Call", bookings: 19 },
  ];

  const lineChartData = [
    { day: "Mon", bookings: 12 },
    { day: "Tue", bookings: 19 },
    { day: "Wed", bookings: 23 },
    { day: "Thu", bookings: 18 },
    { day: "Fri", bookings: 25 },
    { day: "Sat", bookings: 8 },
    { day: "Sun", bookings: 5 },
  ];

  const users = [
    { id: 1, name: "John Doe", pin: "1234", email: "john@company.com", phone: "+8801712345678", department: "Software Development", designation: "Developer", status: "Active" },
    { id: 2, name: "Jane Smith", pin: "5678", email: "jane@company.com", phone: "+8801787654321", department: "HR", designation: "Manager", status: "Active" },
    { id: 3, name: "Bob Wilson", pin: "9876", email: "bob@company.com", phone: "+8801555123456", department: "Finance", designation: "Analyst", status: "Blocked" },
  ];

  const bookings = [
    { id: 1, title: "Team Standup", name: "John Doe", pin: "1234", department: "Software Development", time: "10:00 AM - 11:00 AM", room: "Conference A" },
    { id: 2, title: "Client Meeting", name: "Jane Smith", pin: "5678", department: "HR", time: "2:00 PM - 3:00 PM", room: "Board Room" },
    { id: 3, title: "Project Review", name: "Bob Wilson", pin: "9876", department: "Finance", time: "4:00 PM - 5:00 PM", room: "Meeting B" },
  ];

  const rooms = [
    { id: 1, name: "Conference Room A", capacity: 10, facilities: "Projector, Whiteboard", photo: "room1.jpg", status: "enabled" },
    { id: 2, name: "Meeting Room B", capacity: 6, facilities: "TV, Video Call", photo: "room2.jpg", status: "enabled" },
    { id: 3, name: "Board Room", capacity: 12, facilities: "Projector, Audio System", photo: "room3.jpg", status: "disabled" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-card sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">OnnoRokom Admin</h1>
              <p className="text-sm text-muted-foreground">Meeting Booking System</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="bookings">Booking List</TabsTrigger>
            <TabsTrigger value="rooms">Manage Rooms</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{analyticsData.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">Registered users</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">{analyticsData.totalBookings}</div>
                  <p className="text-xs text-muted-foreground">All time bookings</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-available">{analyticsData.todayBookings}</div>
                  <p className="text-xs text-muted-foreground">Bookings today</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-pending">{analyticsData.rating}</div>
                  <p className="text-xs text-muted-foreground">System rating</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Room Bookings</CardTitle>
                  <CardDescription>Total bookings per room</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="room" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Weekly Trend</CardTitle>
                  <CardDescription>Daily booking growth rate</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="bookings" stroke="hsl(var(--secondary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10 w-80" placeholder="Search users..." />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Bulk Users
                </Button>
                <Button variant="hero">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New User
                </Button>
              </div>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage system users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>PIN</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Designation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.pin}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>{user.designation}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Block</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10 w-80" placeholder="Search bookings..." />
              </div>
            </div>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>Manage all meeting bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Meeting Title</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>PIN</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Meeting Time</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.title}</TableCell>
                        <TableCell>{booking.name}</TableCell>
                        <TableCell>{booking.pin}</TableCell>
                        <TableCell>{booking.department}</TableCell>
                        <TableCell>{booking.time}</TableCell>
                        <TableCell>{booking.room}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>View</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Meeting Rooms</h2>
              <Button variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                Add Room
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <Card key={room.id} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      <Badge variant={room.status === "enabled" ? "default" : "secondary"}>
                        {room.status}
                      </Badge>
                    </div>
                    <CardDescription>Capacity: {room.capacity} people</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <Building2 className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Facilities:</p>
                      <p className="text-sm">{room.facilities}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        QR Code
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>
                            {room.status === "enabled" ? "Disable" : "Enable"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;