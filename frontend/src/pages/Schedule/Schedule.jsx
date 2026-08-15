import { Calendar } from "lucide-react";
import CustomDatePicker from "../../components/DatePicker/CustomDatePicker.jsx";
import TrailerCard from "./TrailerCard.jsx";
import {handleSelectCustomDate} from "../../utils/revenueUtils.js";
import  useScheduleData  from "../../hooks/data/useScheduleData.js";

export default function Schedule() {

  const {
    selectedDateIndex,
    setSelectedDateIndex,
    customDate,
    setCustomDate,
    dateList,
    filteredMovies,
    isLoading,
    isError,
    nowPlaying,
    upcoming,
  } = useScheduleData();


  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center gap-4 font-mono">
        <div className="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
        <p className="text-xs text-gray-400 uppercase tracking-widest animate-pulse">
          ĐANG TẢI GIAO DIỆN LỊCH KHỞI CHIẾU CINEVERSE...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center gap-4 font-mono">
        <h2 className="text-lg font-bold text-amber-400">
          Không thể tải dữ liệu Trang Chủ!
        </h2>
        <p className="text-xs text-gray-400">
          Vui lòng kiểm tra kết nối và thử lại sau.
        </p>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen bg-[#080808] text-white py-8 px-4 sm:px-8 xl:px-16">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-cyan-neon/10 rounded-xl border border-cyan-neon/30 text-cyan-neon">
            <Calendar className="w-6 h-6" />
          </div>
          <span className="text-cyan-neon text-sm font-semibold tracking-wider uppercase font-mono">
            CINEVERSE CALENDAR
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight text-white mb-3 font-mono">
          Lịch Khởi Chiếu Phim
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl font-mono">
          Cập nhật danh sách phim bom tấn mới nhất sắp khởi chiếu & đang công
          chiếu với chất lượng điện ảnh đỉnh cao tại CINEVERSE.
        </p>
      </div>

      {/* Date Picker Component (CHỌN NGÀY) */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="bg-[#12141a] border border-[#222222] rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-bold text-cyan-neon uppercase tracking-widest font-mono">
              CHỌN NGÀY CHIẾU
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedDateIndex("ALL");
                setCustomDate("");
              }}
              className={`min-w-[110px] py-3 px-4 rounded-xl flex flex-col items-center justify-center border cursor-pointer transition-all duration-300 ${
                selectedDateIndex === "ALL"
                  ? "bg-cyan-neon/15 border-cyan-neon text-cyan-neon shadow-[0_0_15px_rgba(0,229,229,0.3)] scale-105"
                  : "bg-[#181a22] border-[#292d3e] text-gray-400 hover:bg-[#222533] hover:text-white"
              }`}
            >
              <span className="text-sm font-black font-mono text-white">
                PHIM ĐÃ RA MẮT
              </span>
            </button>

            {/* Dynamic Date Buttons (Next 7 Days) */}
            {dateList.map((item) => {
              const isSelected = selectedDateIndex === item.index;
              return (
                <button
                  key={item.formatted}
                  type="button"
                  onClick={() => {
                    setSelectedDateIndex(item.index);
                    setCustomDate("");
                  }}
                  className={`min-w-[110px] py-3 px-4 rounded-xl flex flex-col items-center justify-center border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "bg-cyan-neon/15 border-cyan-neon text-cyan-neon shadow-[0_0_15px_rgba(0,229,229,0.3)] scale-105"
                      : "bg-[#181a22] border-[#292d3e] text-gray-400 hover:bg-[#222533] hover:text-white"
                  }`}
                >
                  <span className="text-[11px] font-semibold text-gray-400 mb-0.5">
                    {item.badge}
                  </span>
                  <span className="text-sm font-black font-mono tracking-tight text-white">
                    {item.index > 1
                      ? `${item.dayOfWeek} ${item.formatted}`
                      : item.formatted}
                  </span>
                </button>
              );
            })}

            {/* Custom Cyberpunk Dark Theme DatePicker Component */}
            <div className="w-full h-full flex flex-col items-center justify-center">
              <CustomDatePicker
                selectedDate={customDate}
                onSelectDate={handleSelectCustomDate}
                isActive={selectedDateIndex === "CUSTOM"}
                setCustomDate={setCustomDate}
                setSelectedDateIndex={setSelectedDateIndex}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-5">
        {selectedDateIndex === "CUSTOM" && customDate && (
          <span className="text-xs mx-auto font-mono text-cyan-neon bg-cyan-neon/10 px-3 py-1 rounded-full border border-cyan-neon/30">
            Đang xem lịch ngày: {customDate}
          </span>
        )}
      </div>

      {/* Movies Grid Section */}
      <div className="max-w-7xl mx-auto mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
          <TrailerCard
            filteredMovies={filteredMovies}
            dateList={dateList}
          />
        </div>
      </div>
    </div>
  );
}
