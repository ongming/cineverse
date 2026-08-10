export async function getMovies() {
    const movies = await fetch('/api/movies');
    if (!movies.ok) {
        throw new Error('Thất bại khi lấy dữ liệu phim từ');
    }
    return await movies.json();
}