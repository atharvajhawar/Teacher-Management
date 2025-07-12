import React from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const times = [
  "all-day", "7:30am", "8am", "8:30am", "9am", "9:30am", "10am", "10:30am", "11am", "11:30am",
  "12pm", "12:30pm", "1pm", "1:30pm", "2pm", "2:30pm", "3pm", "3:30pm", "4pm", "4:30pm", "5pm", "5:30pm", "6pm"
];

export type Availability = Record<string, Record<string, boolean>>;

interface ScheduleGridProps {
  availability: Availability;
  onToggle: (day: string, time: string) => void;
}

const ScheduleGrid: React.FC<ScheduleGridProps> = ({ availability, onToggle }) => (
  <section className="bg-white rounded-xl shadow p-6 mb-6 overflow-x-auto">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Availability</h3>
    <table className="min-w-full border-collapse">
      <thead>
        <tr>
          <th className="p-2 border-b"></th>
          {days.map(day => (
            <th key={day} className="p-2 border-b text-xs font-medium text-gray-500">{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {times.map(time => (
          <tr key={time}>
            <td className="p-2 border-b text-xs text-gray-400">{time}</td>
            {days.map(day => (
              <td
                key={day}
                className={`p-2 border-b text-center cursor-pointer transition ${
                  availability[day]?.[time]
                    ? "bg-blue-200 hover:bg-blue-300"
                    : "bg-gray-50 hover:bg-gray-200"
                }`}
                onClick={() => onToggle(day, time)}
              >
                {availability[day]?.[time] ? "✓" : ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default ScheduleGrid;