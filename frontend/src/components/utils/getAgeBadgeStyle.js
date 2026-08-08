export const getAgeBadgeStyle = (ageRating) => {
  switch (ageRating) {
    case "T18":
    case "C18":
      return "bg-red-950/80 text-red-400 border-red-500/60";
    case "T16":
    case "C16":
      return "bg-amber-950/80 text-amber-400 border-amber-500/60";
    case "T13":
    case "C13":
      return "bg-yellow-950/80 text-yellow-300 border-yellow-500/60";
    default:
      return "bg-cyan-950/80 text-cyan-300 border-cyan-500/60";
  }
};
