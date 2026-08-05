export default function Footer() {
  return (
    <footer className="border-t border-[#151515] py-[40px] flex flex-col items-center gap-[16px]">
      <div className="flex gap-[30px] text-[#555555] text-[0.9rem]">
        <span className="cursor-pointer hover:text-white transition-colors">Điều khoản</span>
        <span className="cursor-pointer hover:text-white transition-colors">Bảo mật</span>
        <span className="cursor-pointer hover:text-white transition-colors">Liên hệ</span>
        <span className="cursor-pointer hover:text-white transition-colors">Trợ giúp</span>
      </div>
      <p className="text-[#333333] text-[0.8rem] m-0 tracking-[0.5px]">
        © 2024 CINEVERSE. Trải nghiệm điện ảnh đỉnh cao.
      </p>
    </footer>
  );
}