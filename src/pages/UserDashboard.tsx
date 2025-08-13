import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Plus, Share, HelpCircle, User, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const UserDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState("daily");

  // Mock data for demonstration
  const timeSlots = Array.from({ length: 18 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    const minute = (i % 2) * 30;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  const rooms = [
    { id: 1, name: "Conference Room A", capacity: 10 },
    { id: 2, name: "Meeting Room B", capacity: 6 },
    { id: 3, name: "Board Room", capacity: 12 },
    { id: 4, name: "Video Call Room", capacity: 4 },
  ];

  const bookings = [
    { id: 1, roomId: 1, time: "10:00", duration: 2, title: "Team Standup", status: "booked" },
    { id: 2, roomId: 2, time: "14:00", duration: 1, title: "Client Call", status: "pending" },
    { id: 3, roomId: 3, time: "09:00", duration: 1, title: "Board Meeting", status: "past" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-available text-available-foreground";
      case "booked": return "bg-booked text-booked-foreground";
      case "pending": return "bg-pending text-pending-foreground";
      case "past": return "bg-past text-past-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getCellStatus = (roomId: number, timeSlot: string) => {
    const booking = bookings.find(b => b.roomId === roomId && b.time === timeSlot);
    if (booking) return booking;
    return { status: "available", title: "" };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="border-b bg-card shadow-card sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDate(new Date())}
              className="flex items-center space-x-2"
            >
              <Calendar className="h-4 w-4" />
              <span>Today</span>
            </Button>
            <div className="text-lg font-semibold text-foreground">
              {selectedDate.toLocaleDateString("en-US", { 
                weekday: "long", 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">OnnoRokom Group</span>
            </div>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-80 border-r bg-card h-[calc(100vh-73px)] overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Mini Calendar */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                    <div key={day} className="p-2 font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                  {/* Calendar days would be generated here */}
                  {Array.from({ length: 35 }, (_, i) => (
                    <button
                      key={i}
                      className={`p-2 rounded-md hover:bg-accent transition-colors ${
                        i === 15 ? "bg-primary text-primary-foreground" : ""
                      }`}
                    >
                      {i > 5 && i < 30 ? i - 5 : ""}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Layout Filter */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">View</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={viewType} onValueChange={setViewType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Today's Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Bookings</span>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Available Rooms</span>
                  <Badge className="bg-available text-available-foreground">4</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pending Approval</span>
                  <Badge className="bg-pending text-pending-foreground">1</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {viewType === "daily" && (
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Daily Schedule</CardTitle>
                    <CardDescription>
                      Click on available slots to book a meeting
                    </CardDescription>
                  </div>
                  <Button variant="hero" size="lg" className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>New Booking</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="grid" style={{ gridTemplateColumns: `150px repeat(${rooms.length}, 1fr)`, minWidth: '800px' }}>
                    {/* Header */}
                    <div className="p-3 font-medium border-b border-r">Time</div>
                    {rooms.map(room => (
                      <div key={room.id} className="p-3 font-medium border-b text-center">
                        <div className="font-semibold">{room.name}</div>
                        <div className="text-xs text-muted-foreground">Capacity: {room.capacity}</div>
                      </div>
                    ))}

                    {/* Time slots */}
                    {timeSlots.map(timeSlot => (
                      <>
                        <div key={`time-${timeSlot}`} className="p-3 border-b border-r text-sm font-medium flex items-center">
                          <Clock className="h-3 w-3 mr-2" />
                          {timeSlot}
                        </div>
                        {rooms.map(room => {
                          const cellData = getCellStatus(room.id, timeSlot);
                          return (
                            <button
                              key={`${room.id}-${timeSlot}`}
                              className={`p-3 border-b text-xs transition-all duration-200 hover:scale-105 ${getStatusColor(cellData.status)}`}
                            >
                              {cellData.title || "Available"}
                            </button>
                          );
                        })}
                      </>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {viewType === "weekly" && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
                <CardDescription>
                  Week view of all meeting rooms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Weekly view coming soon...</p>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;