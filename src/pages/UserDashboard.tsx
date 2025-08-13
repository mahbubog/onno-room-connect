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
    { id: 1, name: "Meeting Room 1", capacity: 10 },
    { id: 2, name: "Meeting Room 2", capacity: 6 },
    { id: 3, name: "Meeting Room 3", capacity: 12 },
    { id: 4, name: "Meeting Room 4", capacity: 4 },
    { id: 5, name: "Meeting Room 5", capacity: 8 },
    { id: 6, name: "Meeting Room 6", capacity: 6 },
    { id: 7, name: "Meeting Room 7", capacity: 10 },
  ];

  // Get current week dates
  const getWeekDates = () => {
    const today = new Date(selectedDate);
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates();

  // Weekly bookings data
  const weeklyBookings = [
    { roomId: 1, day: 0, team: "Team Work: UX/UI", time: "9:30 AM - 11:30 AM", color: "bg-green-500" },
    { roomId: 1, day: 1, team: "Team Work: UX/UI", time: "9:30 AM - 11:30 AM", color: "bg-green-500" },
    { roomId: 1, day: 4, team: "Team Work: UX/UI", time: "9:30 AM - 11:30 AM", color: "bg-green-500" },
    
    { roomId: 2, day: 0, team: "Team Work: MVP", time: "9:30 AM - 11:30 AM", color: "bg-orange-500" },
    { roomId: 2, day: 1, team: "Team Work: MVP", time: "9:30 AM - 11:30 AM", color: "bg-orange-500" },
    { roomId: 2, day: 5, team: "Team Work: MVP", time: "9:30 AM - 11:30 AM", color: "bg-orange-500" },
    
    { roomId: 3, day: 0, team: "Team Work: UX/UI", time: "10:30 AM - 11:30 AM", color: "bg-purple-500" },
    { roomId: 3, day: 2, team: "Team Work: UX/UI", time: "10:30 AM - 11:30 AM", color: "bg-purple-500" },
    { roomId: 3, day: 4, team: "Team Work: UX/UI", time: "10:30 AM - 11:30 AM", color: "bg-purple-500" },
    { roomId: 3, day: 0, team: "Team Work: Marketing", time: "10:30 AM - 11:30 AM", color: "bg-purple-600", offset: true },
    { roomId: 3, day: 2, team: "Team Work: Marketing", time: "10:30 AM - 11:30 AM", color: "bg-purple-600", offset: true },
    { roomId: 3, day: 4, team: "Team Work: Marketing", time: "10:30 AM - 11:30 AM", color: "bg-purple-600", offset: true },
    
    { roomId: 4, day: 1, team: "Team Work: MVP", time: "9:30 AM - 11:30 AM", color: "bg-blue-500" },
    
    { roomId: 5, day: 0, team: "Team Work: UX/UI", time: "10:30 AM - 11:30 AM", color: "bg-teal-500" },
    { roomId: 5, day: 4, team: "Team Work: UX/UI", time: "10:30 AM - 11:30 AM", color: "bg-teal-500" },
    { roomId: 5, day: 6, team: "Team Work: UX/UI", time: "10:30 AM - 11:30 AM", color: "bg-teal-600" },
    { roomId: 5, day: 0, team: "Team Work: Marketing", time: "10:30 AM - 11:30 AM", color: "bg-teal-600", offset: true },
    { roomId: 5, day: 4, team: "Team Work: Marketing", time: "10:30 AM - 11:30 AM", color: "bg-teal-600", offset: true },
    { roomId: 5, day: 6, team: "Team Work: Marketing", time: "10:30 AM - 11:30 AM", color: "bg-teal-700", offset: true },
    
    { roomId: 6, day: 5, team: "Team Work: MVP", time: "9:30 AM - 11:30 AM", color: "bg-orange-500" },
    
    { roomId: 7, day: 1, team: "Team Work: MVP", time: "9:30 AM - 11:30 AM", color: "bg-green-600" },
    { roomId: 7, day: 6, team: "Team Work: MVP", time: "9:30 AM - 11:30 AM", color: "bg-green-600" },
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
        <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedDate(new Date())}
              className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
            >
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Today</span>
              <span className="sm:hidden">T</span>
            </Button>
            <div className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">
              {selectedDate.toLocaleDateString("en-US", { 
                weekday: window.innerWidth < 640 ? "short" : "long", 
                year: "numeric", 
                month: window.innerWidth < 640 ? "short" : "long", 
                day: "numeric" 
              })}
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span className="font-semibold text-foreground text-xs sm:text-sm lg:text-base hidden sm:inline">OnnoRokom Group</span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
              <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
              <Share className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
              <User className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-80 border-b lg:border-r lg:border-b-0 bg-card h-auto lg:h-[calc(100vh-73px)] overflow-y-auto">
          <div className="p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
            {/* Mini Calendar */}
            <Card className="lg:block hidden">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-xs sm:text-sm font-medium">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                    <div key={day} className="p-1 sm:p-2 font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                  {/* Calendar days would be generated here */}
                  {Array.from({ length: 35 }, (_, i) => (
                    <button
                      key={i}
                      className={`p-1 sm:p-2 rounded-md hover:bg-accent transition-colors text-xs ${
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
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-xs sm:text-sm font-medium">Layout View</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={viewType} onValueChange={setViewType}>
                  <SelectTrigger className="text-xs sm:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Day</SelectItem>
                    <SelectItem value="weekly">Week</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Date Navigation for Mobile */}
            <Card className="lg:hidden">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newDate = new Date(selectedDate);
                      newDate.setDate(newDate.getDate() - (viewType === "weekly" ? 7 : 1));
                      setSelectedDate(newDate);
                    }}
                    className="text-xs"
                  >
                    ←
                  </Button>
                  <span className="text-xs font-medium">
                    {viewType === "weekly" 
                      ? `${weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                      : selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    }
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newDate = new Date(selectedDate);
                      newDate.setDate(newDate.getDate() + (viewType === "weekly" ? 7 : 1));
                      setSelectedDate(newDate);
                    }}
                    className="text-xs"
                  >
                    →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6">
          {viewType === "daily" && (
            <Card className="shadow-card">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Daily Schedule</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      {selectedDate.toLocaleDateString("en-US", { 
                        weekday: "long", 
                        year: "numeric", 
                        month: "long", 
                        day: "numeric" 
                      })}
                    </CardDescription>
                  </div>
                  <Button variant="default" size="sm" className="flex items-center space-x-2 text-xs sm:text-sm">
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">New Booking</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <div className="min-w-[800px]">
                    {/* Time Header */}
                    <div className="grid grid-cols-8 gap-px bg-border">
                      <div className="bg-card"></div>
                      {["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM"].map((time, index) => (
                        <div key={index} className="bg-card p-2 sm:p-3 text-center">
                          <div className="font-medium text-xs sm:text-sm">{time}</div>
                        </div>
                      ))}
                    </div>

                    {/* Room Rows */}
                    <div className="grid grid-cols-8 gap-px bg-border">
                      {rooms.map((room) => (
                        <>
                          {/* Room Name */}
                          <div key={`room-${room.id}`} className="bg-card p-2 sm:p-3 flex items-center">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                                room.id === 1 ? 'bg-green-500' :
                                room.id === 2 ? 'bg-orange-500' :
                                room.id === 3 ? 'bg-purple-500' :
                                room.id === 4 ? 'bg-blue-500' :
                                room.id === 5 ? 'bg-teal-500' :
                                room.id === 6 ? 'bg-orange-600' :
                                'bg-green-600'
                              }`}></div>
                              <span className="font-medium text-xs sm:text-sm">{room.name}</span>
                            </div>
                          </div>
                          
                          {/* Time Slots */}
                          {Array.from({ length: 7 }, (_, timeIndex) => {
                            const hasBooking = room.id <= 3 && timeIndex < 3;
                            return (
                              <div key={`${room.id}-${timeIndex}`} className="bg-card p-1 min-h-[50px] sm:min-h-[60px] lg:min-h-[80px] relative">
                                {hasBooking ? (
                                  <div className={`meeting-block h-full ${
                                    room.id === 1 ? 'meeting-block-team-ux' :
                                    room.id === 2 ? 'meeting-block-team-mvp' :
                                    'meeting-block-team-marketing'
                                  }`}>
                                    <div className="meeting-info">
                                      <div className="meeting-team">Team Work: {
                                        room.id === 1 ? 'UX/UI' :
                                        room.id === 2 ? 'MVP' :
                                        'UX/UI'
                                      }</div>
                                      <div className="meeting-time">{
                                        timeIndex === 0 ? '9:00 AM - 10:00 AM' :
                                        timeIndex === 1 ? '9:00 AM - 10:00 AM' :
                                        '10:00 AM - 11:00 AM'
                                      }</div>
                                    </div>
                                  </div>
                                ) : (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full h-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/50"
                                  >
                                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                                  </Button>
                                )}
                              </div>
                            );
                          })}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {viewType === "weekly" && (
            <Card className="shadow-card">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Weekly Schedule</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2 lg:block hidden">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setDate(newDate.getDate() - 7);
                        setSelectedDate(newDate);
                      }}
                      className="text-xs sm:text-sm"
                    >
                      ←
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newDate = new Date(selectedDate);
                        newDate.setDate(newDate.getDate() + 7);
                        setSelectedDate(newDate);
                      }}
                      className="text-xs sm:text-sm"
                    >
                      →
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <div className="min-w-[800px]">
                    {/* Header with days */}
                    <div className="grid grid-cols-8 gap-px bg-border">
                      <div className="bg-card p-2 sm:p-3 font-medium"></div>
                      {weekDates.map((date, index) => (
                        <div key={index} className="bg-card p-2 sm:p-3 text-center">
                          <div className="font-medium text-xs sm:text-sm">
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div className="text-sm sm:text-lg font-bold">
                            {date.getDate()}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Room rows */}
                    <div className="grid grid-cols-8 gap-px bg-border">
                      {rooms.map((room) => (
                        <>
                          {/* Room name column */}
                          <div key={`room-${room.id}`} className="bg-card p-2 sm:p-3 lg:p-4 flex items-center">
                            <div className="flex items-center space-x-1 sm:space-x-2">
                              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                                room.id === 1 ? 'bg-green-500' :
                                room.id === 2 ? 'bg-orange-500' :
                                room.id === 3 ? 'bg-purple-500' :
                                room.id === 4 ? 'bg-blue-500' :
                                room.id === 5 ? 'bg-teal-500' :
                                room.id === 6 ? 'bg-orange-600' :
                                'bg-green-600'
                              }`}></div>
                              <span className="font-medium text-xs sm:text-sm">{room.name}</span>
                            </div>
                          </div>
                          
                          {/* Day columns for this room */}
                          {weekDates.map((date, dayIndex) => {
                            const dayBookings = weeklyBookings.filter(
                              booking => booking.roomId === room.id && booking.day === dayIndex
                            );
                            
                            return (
                              <div key={`${room.id}-${dayIndex}`} className="bg-card p-1 min-h-[50px] sm:min-h-[60px] lg:min-h-[80px] relative">
                                {dayBookings.length > 0 ? (
                                  <div className="space-y-0.5 sm:space-y-1">
                                    {dayBookings.map((booking, bookingIndex) => (
                                      <div
                                        key={bookingIndex}
                                        className={`meeting-block rounded shadow-sm ${
                                          booking.team.includes('UX/UI') ? 'meeting-block-team-ux' :
                                          booking.team.includes('MVP') ? 'meeting-block-team-mvp' :
                                          booking.team.includes('Marketing') ? 'meeting-block-team-marketing' :
                                          'meeting-block-team-other'
                                        } ${booking.offset ? 'mt-1' : ''}`}
                                      >
                                        <div className="meeting-info">
                                          <div className="meeting-team">{booking.team}</div>
                                          <div className="meeting-time">{booking.time}</div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full h-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent/50"
                                  >
                                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                                  </Button>
                                )}
                              </div>
                            );
                          })}
                        </>
                      ))}
                    </div>
                  </div>
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