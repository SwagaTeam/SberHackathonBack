import { useState } from 'react';
import { ArrowLeft, Plus, Calendar, MapPin, Users, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { mockEvents, type Event } from '../lib/mockData';

interface EventManagementProps {
  onBack: () => void;
  onCreateEvent: () => void;
  onEditEvent: (event: Event) => void;
}

export function EventManagement({ onBack, onCreateEvent, onEditEvent }: EventManagementProps) {
  const [events, setEvents] = useState<Event[]>(mockEvents);

  const handleDeleteEvent = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить это мероприятие?')) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const upcomingEvents = events.filter(
    (event) => new Date(event.date) >= new Date()
  );

  const pastEvents = events.filter(
    (event) => new Date(event.date) < new Date()
  );

  return (
    <div className="min-h-screen bg-[#636363]">
      {/* Header */}
      <div className="bg-[#2a2a2a] border-b border-[#4a4a4a] px-6 py-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="text-[#aac0a7] hover:text-[#c5d4c2] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[#aac0a7]">Управление мероприятиями</h1>
        </div>

        <Button
          onClick={onCreateEvent}
          className="bg-[#aac0a7] text-[#000000] hover:bg-[#c5d4c2]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Создать мероприятие
        </Button>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Upcoming Events */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#aac0a7]">Предстоящие мероприятия</h2>
            <Badge className="bg-[#4a4a4a] text-[#aac0a7]">
              {upcomingEvents.length}
            </Badge>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-[#2a2a2a] rounded-lg p-6 border border-[#4a4a4a] hover:border-[#aac0a7] transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 bg-[#aac0a7] rounded-lg px-3 py-2 text-center">
                        <p className="text-[#000000] text-xs uppercase">
                          {new Date(event.date).toLocaleDateString('ru-RU', { month: 'short' })}
                        </p>
                        <p className="text-[#000000]">
                          {new Date(event.date).getDate()}
                        </p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[#aac0a7] mb-2">{event.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-[#888888]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees.length} участников</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-[#888888] text-sm line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => onEditEvent(event)}
                      className="p-2 text-[#aac0a7] hover:bg-[#4a4a4a] rounded transition-colors"
                      title="Редактировать"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="p-2 text-[#d4183d] hover:bg-[#4a4a4a] rounded transition-colors"
                      title="Удалить"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {upcomingEvents.length === 0 && (
              <div className="bg-[#2a2a2a] rounded-lg p-12 text-center border border-[#4a4a4a]">
                <Calendar className="w-12 h-12 text-[#4a4a4a] mx-auto mb-4" />
                <p className="text-[#888888]">Нет предстоящих мероприятий</p>
              </div>
            )}
          </div>
        </div>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#aac0a7]">Прошедшие мероприятия</h2>
              <Badge className="bg-[#4a4a4a] text-[#888888]">
                {pastEvents.length}
              </Badge>
            </div>

            <div className="space-y-3">
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-[#4a4a4a] rounded-lg p-4 border border-[#4a4a4a] opacity-60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[#888888] mb-1">{event.title}</h3>
                      <div className="flex gap-4 text-xs text-[#888888]">
                        <span>
                          {new Date(event.date).toLocaleDateString('ru-RU')}
                        </span>
                        <span>{event.attendees.length} участников</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="p-2 text-[#d4183d] hover:bg-[#636363] rounded transition-colors flex-shrink-0"
                      title="Удалить"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#4a4a4a] rounded-lg p-4 border border-[#4a4a4a]">
            <p className="text-[#888888] text-sm mb-1">Всего мероприятий</p>
            <p className="text-[#aac0a7]">{events.length}</p>
          </div>
          <div className="bg-[#4a4a4a] rounded-lg p-4 border border-[#4a4a4a]">
            <p className="text-[#888888] text-sm mb-1">Предстоящих</p>
            <p className="text-[#aac0a7]">{upcomingEvents.length}</p>
          </div>
          <div className="bg-[#4a4a4a] rounded-lg p-4 border border-[#4a4a4a]">
            <p className="text-[#888888] text-sm mb-1">Участников</p>
            <p className="text-[#aac0a7]">
              {events.reduce((sum, event) => sum + event.attendees.length, 0)}
            </p>
          </div>
          <div className="bg-[#4a4a4a] rounded-lg p-4 border border-[#4a4a4a]">
            <p className="text-[#888888] text-sm mb-1">В этом месяце</p>
            <p className="text-[#aac0a7]">
              {events.filter((e) => {
                const eventDate = new Date(e.date);
                const now = new Date();
                return (
                  eventDate.getMonth() === now.getMonth() &&
                  eventDate.getFullYear() === now.getFullYear()
                );
              }).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
