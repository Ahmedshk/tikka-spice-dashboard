import { useState } from 'react';
import type { View } from 'react-big-calendar';
import { Layout } from '../../components/common/Layout';
import {
  CalendarCard,
  UpcomingEventsCard,
  type CalendarEventItem,
  type UpcomingEventItem,
} from '../../components/CalendarEvents';
import { AddEventModal } from '../../components/modal/AddEventModal';
import CalendarEventsIcon from '@assets/icons/calendar_and_events.svg?react';


interface AddEventParams {
  year: number;
  month: number;
  day: number;
  hour: number;
  min: number;
  durationHours: number;
  title: string;
  type: CalendarEventItem['type'];
}

function buildCalendarEvents(): CalendarEventItem[] {
  const events: CalendarEventItem[] = [];
  const add = (p: AddEventParams) => {
    const start = new Date(p.year, p.month, p.day, p.hour, p.min, 0);
    const end = new Date(start.getTime() + p.durationHours * 60 * 60 * 1000);
    events.push({ start, end, title: p.title, type: p.type });
  };
  const feb = 1;
  const mar = 2;
  const apr = 3;
  const y = 2026;
  // February – mix of 1, 2, 3, 4 events per day
  add({ year: y, month: feb, day: 3, hour: 14, min: 0, durationHours: 1, title: 'Manager Meeting', type: 'manager-meeting' });
  add({ year: y, month: feb, day: 5, hour: 10, min: 0, durationHours: 2, title: 'Catering', type: 'catering' });
  add({ year: y, month: feb, day: 5, hour: 15, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: feb, day: 6, hour: 9, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: feb, day: 10, hour: 10, min: 0, durationHours: 2, title: 'Catering', type: 'catering' });
  add({ year: y, month: feb, day: 12, hour: 9, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: feb, day: 14, hour: 10, min: 0, durationHours: 2, title: 'Catering', type: 'catering' });
  add({ year: y, month: feb, day: 17, hour: 9, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: feb, day: 18, hour: 10, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: feb, day: 18, hour: 14, min: 0, durationHours: 1, title: 'Manager Meeting', type: 'manager-meeting' });
  add({ year: y, month: feb, day: 18, hour: 16, min: 0, durationHours: 2, title: 'Catering', type: 'catering' });
  add({ year: y, month: feb, day: 21, hour: 10, min: 0, durationHours: 2, title: 'Catering', type: 'catering' });
  add({ year: y, month: feb, day: 24, hour: 9, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: feb, day: 26, hour: 10, min: 0, durationHours: 2, title: 'Catering', type: 'catering' });
  add({ year: y, month: feb, day: 27, hour: 14, min: 0, durationHours: 1, title: 'Manager Meeting', type: 'manager-meeting' });
  // March – mix of 1, 2, 3, 4 events per day
  add({ year: y, month: mar, day: 1, hour: 14, min: 0, durationHours: 1, title: 'Manager Meeting', type: 'manager-meeting' });
  add({ year: y, month: mar, day: 3, hour: 10, min: 0, durationHours: 2, title: 'Catering', type: 'catering' });
  add({ year: y, month: mar, day: 3, hour: 15, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: mar, day: 4, hour: 9, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: mar, day: 8, hour: 10, min: 0, durationHours: 2, title: 'Catering', type: 'catering' });
  add({ year: y, month: mar, day: 12, hour: 9, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: mar, day: 14, hour: 9, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: mar, day: 14, hour: 10, min: 0, durationHours: 2, title: 'Catering', type: 'catering' });
  add({ year: y, month: mar, day: 14, hour: 14, min: 0, durationHours: 1, title: 'Manager Meeting', type: 'manager-meeting' });
  add({ year: y, month: mar, day: 14, hour: 16, min: 0, durationHours: 1, title: 'Team Standup', type: 'manager-meeting' });
  add({ year: y, month: mar, day: 17, hour: 9, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: mar, day: 18, hour: 11, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: mar, day: 18, hour: 14, min: 0, durationHours: 1, title: 'Manager Meeting', type: 'manager-meeting' });
  add({ year: y, month: mar, day: 22, hour: 8, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: mar, day: 22, hour: 10, min: 0, durationHours: 2, title: 'Catering', type: 'catering' });
  add({ year: y, month: mar, day: 22, hour: 15, min: 0, durationHours: 1, title: 'Manager Meeting', type: 'manager-meeting' });
  add({ year: y, month: mar, day: 25, hour: 9, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: mar, day: 28, hour: 10, min: 0, durationHours: 2, title: 'Catering', type: 'catering' });
  add({ year: y, month: mar, day: 29, hour: 10, min: 0, durationHours: 2, title: 'Catering', type: 'catering' });
  add({ year: y, month: mar, day: 29, hour: 14, min: 0, durationHours: 1, title: 'Manager Meeting', type: 'manager-meeting' });
  add({ year: y, month: mar, day: 29, hour: 16, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: mar, day: 31, hour: 14, min: 0, durationHours: 1, title: 'Manager Meeting', type: 'manager-meeting' });
  // April
  add({ year: y, month: apr, day: 16, hour: 10, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: apr, day: 17, hour: 11, min: 0, durationHours: 1, title: 'Manager Meeting', type: 'manager-meeting' });
  add({ year: y, month: apr, day: 18, hour: 9, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: apr, day: 18, hour: 12, min: 0, durationHours: 2, title: 'Large Catering Order', type: 'catering' });
  add({ year: y, month: apr, day: 18, hour: 15, min: 0, durationHours: 1, title: 'Manager Meeting', type: 'manager-meeting' });
  add({ year: y, month: apr, day: 19, hour: 8, min: 0, durationHours: 1, title: 'Delivery', type: 'delivery' });
  add({ year: y, month: apr, day: 20, hour: 9, min: 0, durationHours: 1, title: 'Manager Meeting', type: 'manager-meeting' });
  add({ year: y, month: apr, day: 20, hour: 11, min: 0, durationHours: 2, title: 'Catering', type: 'catering' });
  return events;
}

const calendarEvents = buildCalendarEvents();

function calendarEventsToUpcoming(events: CalendarEventItem[]): UpcomingEventItem[] {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const sorted = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());
  const timeOpts: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
  return sorted.map((e) => {
    const d = e.start;
    const dateStr = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const isToday = d.getTime() >= todayStart.getTime() && d.getTime() < todayStart.getTime() + 24 * 60 * 60 * 1000;
    const dayLabel = isToday ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'long' });
    const startTime = d.toLocaleTimeString('en-US', timeOpts);
    const timeStr =
      e.end && e.end.getTime() !== d.getTime()
        ? `${startTime} - ${e.end.toLocaleTimeString('en-US', timeOpts)}`
        : startTime;
    return {
      date: dateStr,
      dayLabel,
      time: timeStr,
      eventName: e.title,
      status: 'Scheduled',
    };
  });
}

export const CalendarEvents = () => {
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [currentView, setCurrentView] = useState<View>('month');
  const [selectedDate] = useState<Date | null>(null);
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  const handleSelectSlot = ({ start }: { start: Date; end: Date; slots: Date[] }) => {
    if (currentView === 'month') {
      setCurrentDate(start);
      setCurrentView('day');
    }
  };

  const handleDrillDown = (date: Date) => {
    setCurrentDate(date);
    setCurrentView('day');
  };

  const handleSelectEvent = (event: CalendarEventItem) => {
    if (currentView === 'month') {
      setCurrentDate(event.start);
      setCurrentView('day');
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="flex items-center gap-2 text-base md:text-lg 2xl:text-xl font-semibold text-primary">
            <CalendarEventsIcon className="w-4 h-4 md:w-5 md:h-5 2xl:w-6 2xl:h-6 text-primary" aria-hidden />
            Calendar & Events
          </h2>
          <button
            type="button"
            onClick={() => setAddEventModalOpen(true)}
            className="self-start sm:self-center px-4 py-2 bg-button-primary text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            + Add Events
          </button>
        </div>

        <div className="space-y-6">
          <CalendarCard
            events={calendarEvents}
            date={currentDate}
            view={currentView}
            onView={setCurrentView}
            selectedDate={selectedDate}
            onNavigate={handleNavigate}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            onDrillDown={handleDrillDown}
          />
          <UpcomingEventsCard
            events={calendarEventsToUpcoming(calendarEvents)}
            pageSize={5}
          />
        </div>
      </div>

      <AddEventModal
        isOpen={addEventModalOpen}
        onClose={() => setAddEventModalOpen(false)}
      />
    </Layout>
  );
};
