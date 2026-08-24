export default function Footer() {
  return (
    <footer className="border-t border-[#151515] py-[40px] flex flex-col items-center gap-[16px]">
      <a
        href="https://github.com/ongming"
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-[30px] text-[#555555] text-[0.9rem]"
      >
        <span className="cursor-pointer hover:text-white transition-colors">
          Link Github của tôi
        </span>
      </a>
      <p className="text-[#333333] text-center text-[0.8rem] m-0 tracking-[0.5px]">
        © CINEVERSE. Dữ liệu được lấy từ TMDB API. Mọi thông tin về phim, diễn
        viên, đạo diễn, trailer đều được cung cấp bởi TMDB.
      </p>
    </footer>
  );
}
