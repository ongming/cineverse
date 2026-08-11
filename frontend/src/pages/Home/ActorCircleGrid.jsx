// pages/Home/ActorCircleGrid.jsx
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, ChevronRight } from "lucide-react";

export default function ActorCircleGrid({ actors = [] }) {
  const navigate = useNavigate();

  if (!actors || actors.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 sm:px-8 py-8 font-mono text-left"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-extrabold text-white font-mono uppercase tracking-wide flex items-center gap-2 m-0">
          <Users className="w-5 h-5 text-cyan-400" />
          GƯƠNG MẶT NỔI BẬT (POPULAR PEOPLE)
        </h2>

        <Link
          to="/person/1320"
          className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:underline uppercase font-bold no-underline"
        >
          <span>XEM TẤT CẢ</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of Circular Photo Avatars */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-4">
        {actors.map((person) => (
          <div
            key={person.id}
            onClick={() => navigate(`/person/${person.id}`)}
            className="flex flex-col items-center text-center group cursor-pointer"
            title={`Xem hồ sơ của ${person.name}`}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-amber-400 transition-all p-1 mb-2 bg-[#12141a] shadow-lg group-hover:scale-105">
              <img
                src={person.profile_path}
                alt={person.name}
                loading="lazy"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h4 className="text-[11px] font-bold text-white font-mono line-clamp-1 group-hover:text-amber-400 transition-colors m-0">
              {person.name}
            </h4>
            <span className="text-[9px] font-mono text-gray-500 uppercase mt-0.5">
              {person.known_for_department || "Acting"}
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
