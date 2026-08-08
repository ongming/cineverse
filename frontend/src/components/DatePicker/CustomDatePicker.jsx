import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";

export default function CustomDatePicker({
  selectedDate,
  onSelectDate,
  isActive,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const containerRef = useRef(null);

  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  // Click outside listener to auto-close calendar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  // Generate days matrix for calendar grid
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  // Adjust Monday as day 0 (0 = Mon, 6 = Sun)
  const startingDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const handleDateClick = (day) => {
    const dayStr = String(day).padStart(2, "0");
    const monthStr = String(currentMonth + 1).padStart(2, "0");
    const formatted = `${dayStr}/${monthStr}/${currentYear}`;
    onSelectDate(formatted);
    setIsOpen(false);
  };

  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-full py-3 px-2 rounded-xl flex flex-col items-center justify-center border cursor-pointer transition-all duration-300 ${
          isActive
            ? "bg-cyan-neon/15 border-cyan-neon text-cyan-neon shadow-[0_0_15px_rgba(0,229,229,0.3)] scale-105"
            : "bg-[#181a22] border-[#292d3e] text-gray-300 hover:bg-[#222533] hover:text-white hover:border-cyan-neon/50"
        }`}
      >
        <span className="text-[11px] font-semibold text-cyan-neon mb-0.5 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-cyan-neon" />
          <span>{selectedDate ? "Đã chọn" : "Ngày khác"}</span>
        </span>
        <span className="text-sm font-black font-mono tracking-tight text-white">
          {selectedDate ? selectedDate.slice(0, 5) : "Chọn ngày"}
        </span>
      </button>

      {/* Cyberpunk Dark Theme Calendar Modal Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-[300px] bg-[#12141a]/95 backdrop-blur-md border border-[#2b3042] rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8)] p-4 z-[1000] animate-in fade-in zoom-in-95 duration-200">
          {/* Calendar Header */}
          <div className="flex items-center justify-between border-b border-[#222736] pb-3 mb-3">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg bg-[#1a1e2b] hover:bg-cyan-neon hover:text-black text-gray-300 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-sm font-extrabold text-white font-mono uppercase tracking-wide">
              {monthNames[currentMonth]} {currentYear}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg bg-[#1a1e2b] hover:bg-cyan-neon hover:text-black text-gray-300 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2 font-mono">
            {weekDays.map((d) => (
              <span key={d} className="text-xs font-bold text-gray-500 py-1">
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center font-mono">
            {/* Empty slots for offset */}
            {Array.from({ length: startingDay }).map((_, idx) => (
              <span key={`empty-${idx}`} className="py-2" />
            ))}

            {/* Days of current month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const dayStr = String(day).padStart(2, "0");
              const monthStr = String(currentMonth + 1).padStart(2, "0");
              const fullFormatted = `${dayStr}/${monthStr}/${currentYear}`;
              const isSelected = selectedDate === fullFormatted;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDateClick(day)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-cyan-neon text-black font-black shadow-[0_0_10px_rgba(0,229,229,0.5)] scale-110"
                      : isToday(day)
                        ? "border border-cyan-neon text-cyan-neon hover:bg-cyan-neon/20"
                        : "text-gray-200 hover:bg-[#202534] hover:text-white"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Close Footer */}
          <div className="mt-3 pt-2.5 border-t border-[#222736] flex items-center justify-between text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                onSelectDate("");
                setIsOpen(false);
              }}
              className="text-gray-400 hover:text-red-400 cursor-pointer transition-colors"
            >
              Xóa ngày chọn
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-cyan-neon hover:underline cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
