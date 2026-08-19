import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Film } from "lucide-react";
import CineverseLogo from "../../components/Header/CineverseLogo.jsx";
import useLogin from "../../hooks/auth/useLogin.js";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import LoginPanel from "./LoginPanel.jsx";
import RegisterPanel from "./RegisterPanel.jsx";
import { useHomeData } from "../../hooks/data/useHomeData.js";

import "swiper/css";
import "swiper/css/effect-fade";

export default function Login() {
  const [activePanel, setActivePanel] = useState("login"); // "login" | "register"
  const { data: homeData, isLoading, isError } = useHomeData();
  const { heroMovies } = homeData || {};
  const movieBackgroundImage = heroMovies?.map((movie) => movie.banner);

  const {
    navigate,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    showPassword,
    setShowPassword,
  } = useLogin();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white font-mono">
        <p className="text-lg">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white font-mono">
        <p className="text-lg">Đã xảy ra lỗi khi tải dữ liệu.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-transparent text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="inset-0 top-0 w-full h-full z-0 overflow-hidden"
        >
          {movieBackgroundImage?.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Cineverse Backdrop ${index + 1}`}
                className="w-full h-full object-cover scale-105"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Multi-stage Dark Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-black/30 to-black/60 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0b0c10]/90 lg:via-[#0b0c10]/70 to-[#0b0c10] z-10 pointer-events-none" />

      {/* LEFT PANEL: Cinematic Full-Bleed Movie Backdrop (~60% Desktop) */}
      <div className="hidden lg:block lg:col-span-7 xl:col-span-8 relative z-20">
        {/* Top-Left Overlaid Logo */}
        <Link
          to="/"
          className="absolute top-10 left-10 shrink-0 flex items-center gap-2.5 no-underline group mr-4 xl:mr-8"
        >
          <CineverseLogo className="w-[36px] xl:w-[42px] h-[36px] xl:h-[42px] transition-all duration-400" />
          <span className="font-extrabold text-lg sm:text-xl tracking-wider font-mono">
            <span className="text-white">CINE</span>
            <span className="text-amber-400">VERSE</span>
          </span>
        </Link>

        {/* Bottom Cinematic Tagline */}
        <div className="absolute bottom-12 left-10 z-20 max-w-3xl space-y-2 font-mono">
          <h1 className="text-xl font-black tracking-tight text-white leading-tight">
            Đây là sản phẩm được hoàn thiện bằng dữ liệu từ TMDB API, không có
            mục đích thương mại.
          </h1>
        </div>
      </div>

      {/* RIGHT PANEL: 200% GPU Sliding Track Frame (~40% Desktop) */}
      <div className="lg:col-span-5 xl:col-span-4 h-full relative overflow-hidden border-l border-white/5 z-20">
        <div
          className={`flex w-[200%] h-full transition-transform duration-500 ease-in-out ${
            activePanel === "login" ? "translate-x-0" : "-translate-x-1/2"
          }`}
        >
          {/* Panel 1: Login Form (1/2 Width = 100% Column) */}
          <div className="w-1/2 h-full flex flex-col justify-center px-6 sm:px-14 py-8 overflow-y-auto">
            <LoginPanel onSwitchToRegister={() => setActivePanel("register")} />
          </div>

          {/* Panel 2: Register Form (1/2 Width = 100% Column) */}
          <div className="w-1/2 h-full flex flex-col justify-center px-6 sm:px-14 py-8 overflow-y-auto">
            <RegisterPanel onSwitchToLogin={() => setActivePanel("login")} />
          </div>
        </div>
      </div>
    </div>
  );
}
