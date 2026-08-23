import React from "react";
import { motion } from "framer-motion";

const RevenueHeader = React.memo(function RevenueHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="border-b border-white/10 pb-8 mb-12 gap-6 max-w-7xl mx-auto"
    >
      <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4 font-mono">
        DOANH SỐ PHÒNG VÉ
      </h1>
      <p className="text-gray-400 text-sm sm:text-base font-mono">
        Thống kê doanh thu phòng vé, tỷ lệ sinh lời ROI và hiệu quả đầu tư các
        tác phẩm điện ảnh.{" "}
      </p>
    </motion.header>
  );
});

export default RevenueHeader;
