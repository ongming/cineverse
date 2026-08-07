import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function MovieCard({ movie }) {
    return (
        <Link
            to={`/trailer/${movie.id}`}
            className="flex flex-col group bg-dark  cursor-pointer transition-all duration-300 no-underline text-inherit w-full box-border"
        >
            <div className="relative w-full overflow-hidden rounded-lg">
                <img className="w-full aspect-[2/3] group-hover:scale-110 transition-transform duration-300 object-cover block" src={movie.image} alt={movie.name} />
                <span className="absolute top-[10px] left-[10px] bg-black/75 text-[#ffaa00] px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[#ffaa00] text-[#ffaa00]" />
                    {movie.rating}
                </span>
            </div>
            
            <div className="p-3 flex flex-col gap-1.5">
                <h3 className="m-0 text-sm text-white font-semibold leading-tight line-clamp-3 overflow-hidden text-ellipsis">
                    {movie.name}
                </h3>
                <span className="text-xs text-[#8c8c8c]">{movie.year}</span>
            </div>
        </Link>
    );
}