import { motion } from "framer-motion";

function WatchListHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto flex flex-col mb-8 gap-6 border-b border-white/10 pb-6"
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
        DANH SÁCH XEM SAU
      </h1>
      <p className="text-gray-400 text-sm sm:text-base font-normal">
        Quản lý và lưu trữ danh sách Trailer yêu thích của bạn
      </p>
    </motion.header>
  );
}

export default WatchListHeader;
