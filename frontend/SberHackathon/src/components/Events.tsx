import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { mockEvents } from '../lib/mockData';

export function Events() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>(
    mockEvents.filter((e) => e.isRegistered).map((e) => e.id)
  );

  const handleToggleRegistration = (eventId: string) => {
    setRegisteredEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const selectedEventData = mockEvents.find((e) => e.id === selectedEvent);

  if (selectedEventData) {
    return (
      <div className="min-h-screen bg-[#636363]">
        {/* Header */}
        <div className="bg-[#636363] border-b border-[#4a4a4a] px-6 py-4">
          <button
            onClick={() => setSelectedEvent(null)}
            className="flex items-center gap-2 text-[#aac0a7] mb-2 hover:text-[#c5d4c2] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Events
          </button>
          <h1 className="text-[#aac0a7]">Event Details</h1>
        </div>

        {/* Event Details */}
        <div className="px-6 py-6">
          <div className="bg-[#2a2a2a] rounded-lg p-6 shadow-lg mb-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-[#aac0a7] flex-1">{selectedEventData.title}</h2>
              {registeredEvents.includes(selectedEventData.id) && (
                <Badge className="bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]">
                  Registered
                </Badge>
              )}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-[#888888]">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">
                  {new Date(selectedEventData.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[#888888]">
                <Clock className="w-5 h-5" />
                <span className="text-sm">{selectedEventData.time}</span>
              </div>
              <div className="flex items-center gap-3 text-[#888888]">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">{selectedEventData.location}</span>
              </div>
            </div>

            <div className="mb-6 pb-6 border-b border-[#4a4a4a]">
              <h3 className="text-[#aac0a7] mb-2">About this Event</h3>
              <p className="text-sm text-[#888888] leading-relaxed">
                {selectedEventData.description}
              </p>
            </div>

            <Button
              onClick={() => handleToggleRegistration(selectedEventData.id)}
              className={`w-full h-12 ${
                registeredEvents.includes(selectedEventData.id)
                  ? 'bg-[#4a4a4a] text-[#888888] border border-[#636363] hover:bg-[#636363]'
                  : 'bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]'
              }`}
              variant={registeredEvents.includes(selectedEventData.id) ? 'outline' : 'default'}
            >
              {registeredEvents.includes(selectedEventData.id)
                ? 'Cancel Registration'
                : 'Register in 1-Click'}
            </Button>
          </div>

          {/* Attendees */}
          <div className="bg-[#4a4a4a] rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-[#aac0a7]" />
              <h3 className="text-[#aac0a7]">Attendees ({selectedEventData.attendees.length})</h3>
            </div>
            <div className="space-y-2">
              {selectedEventData.attendees.map((attendee, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg bg-[#636363]"
                >
                  <div className="w-8 h-8 rounded-full bg-[#aac0a7] flex items-center justify-center">
                    <span className="text-sm text-[#000000]">
                      {attendee.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-sm text-[#aac0a7]">{attendee}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#636363]">
      {/* Header */}
      <div className="bg-[#636363] border-b border-[#4a4a4a] px-6 py-4">
        <h1 className="text-[#aac0a7]">Events</h1>
        <p className="text-sm text-[#888888]">Discover workshops, author talks, and more</p>
      </div>

      {/* Events List */}
      <div className="px-6 py-6">
        <div className="space-y-4">
          {mockEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event.id)}
              className="bg-[#2a2a2a] rounded-lg p-5 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-[#aac0a7] rounded-lg px-3 py-2 text-center min-w-[60px]">
                  <p className="text-[#000000] text-xs uppercase">
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                  </p>
                  <p className="text-[#000000]">
                    {new Date(event.date).getDate()}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-[#aac0a7]">{event.title}</h3>
                    {registeredEvents.includes(event.id) && (
                      <Badge className="text-xs flex-shrink-0 bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]">
                        Registered
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2 text-sm text-[#888888]">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#888888]">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#888888] line-clamp-2 mb-3">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[#888888]">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees.length} attending</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}