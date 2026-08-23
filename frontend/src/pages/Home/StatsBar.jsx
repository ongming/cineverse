// pages/Home/StatsBar.jsx
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Film, Users, Award, Clock } from "lucide-react";
import { formatTimeAgo } from "../../utils/dateUtils.js";

function CounterItem({ icon: Icon, label, targetValue, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || typeof targetValue !== "number") return;
    let start = 0;
    const duration = 2000; // 2 seconds countup
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = Math.ceil(targetValue / steps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetValue]);

  return (
    <div ref={ref} className="flex items-center justify-center gap-3 py-2 px-4">
      <div className="p-2.5 text-cyan-400">
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-left font-mono">
        <div className="text-lg sm:text-xl font-extrabold text-white">
          {typeof targetValue === "number"
            ? count.toLocaleString()
            : targetValue}
          {suffix}
        </div>
        <div className="text-[10px] text-gray-400 uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function StatsBar({ stats }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full py-4"
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <CounterItem
          icon={Film}
          label="TỔNG SỐ PHIM"
          targetValue={stats?.total_movies || "NA"}
        />
        <CounterItem
          icon={Users}
          label="TỔNG DIỄN VIÊN"
          targetValue={stats?.total_actors || "NA"}
        />
        <CounterItem
          icon={Award}
          label="SỐ GIÁ TỪ Tmdb"
          targetValue={parseInt(stats?.total_user_reviews) || "NA"}
        />
        <CounterItem
          icon={Clock}
          label="CẬP NHẬT MỚI NHẤT"
          targetValue={formatTimeAgo(stats?.last_updated_at) || "Vừa xong"}
        />
      </div>
    </motion.div>
  );
}
