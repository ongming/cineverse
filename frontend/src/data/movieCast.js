// data/movieCast.js
// Mock movie_cast junction table dataset

export const movie_cast = [
  // Movie 1: AVATAR
  { id: 1, movie_id: 1, actor_id: 1100, character_name: "Jake Sully", cast_order: 1 },
  { id: 2, movie_id: 1, actor_id: 8691, character_name: "Neytiri", cast_order: 2 },
  { id: 3, movie_id: 1, actor_id: 10205, character_name: "Dr. Grace Augustine", cast_order: 3 },

  // Movie 2: TITANIC
  { id: 4, movie_id: 2, actor_id: 6193, character_name: "Jack Dawson", cast_order: 1 },
  { id: 5, movie_id: 2, actor_id: 204, character_name: "Rose DeWitt Bukater", cast_order: 2 },
  { id: 6, movie_id: 2, actor_id: 73421, character_name: "Caledon Hockley", cast_order: 3 },

  // Movie 3: AVENGERS
  { id: 7, movie_id: 3, actor_id: 3223, character_name: "Tony Stark / Iron Man", cast_order: 1 },
  { id: 8, movie_id: 3, actor_id: 16828, character_name: "Steve Rogers / Captain America", cast_order: 2 },
  { id: 9, movie_id: 3, actor_id: 1245, character_name: "Natasha Romanoff / Black Widow", cast_order: 3 },

  // Movie 4: DUNE / THE LORD OF THE RINGS
  { id: 10, movie_id: 4, actor_id: 1320, character_name: "Paul Atreides", cast_order: 1 },
  { id: 11, movie_id: 4, actor_id: 50571, character_name: "Chani", cast_order: 2 },
  { id: 12, movie_id: 4, actor_id: 73421, character_name: "Emperor Shaddam IV", cast_order: 3 },
];
