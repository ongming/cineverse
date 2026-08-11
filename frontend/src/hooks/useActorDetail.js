// hooks/useActorDetail.js
import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { actors } from "../data/actors.js";
import { getActorFilmography } from "../utils/movieRelationUtils.js";

export const useActorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // Find actor by ID
  const actor = useMemo(() => {
    const numericId = parseInt(id, 10);
    return actors.find((a) => a.id === numericId);
  }, [id]);

  // Compute age from birthday
  const age = useMemo(() => {
    if (!actor?.birthday) return null;
    const birthDate = new Date(actor.birthday);
    const today = new Date();
    let ageCalc = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      ageCalc--;
    }
    return ageCalc;
  }, [actor]);

  // Retrieve filmography joined with character_name using decoupled helper
  const filmography = useMemo(() => {
    if (!actor) return [];
    return getActorFilmography(actor.id);
  }, [actor]);

  // Gallery Photo Controls
  const handleOpenPhoto = (index) => {
    setSelectedPhotoIndex(index);
    setIsLightboxOpen(true);
  };

  const handleNextPhoto = () => {
    if (!actor?.gallery || actor.gallery.length === 0) return;
    setSelectedPhotoIndex((prev) => (prev + 1) % actor.gallery.length);
  };

  const handlePrevPhoto = () => {
    if (!actor?.gallery || actor.gallery.length === 0) return;
    setSelectedPhotoIndex((prev) =>
      prev === 0 ? actor.gallery.length - 1 : prev - 1
    );
  };

  return {
    id,
    actor,
    age,
    filmography,
    isLightboxOpen,
    setIsLightboxOpen,
    selectedPhotoIndex,
    handleOpenPhoto,
    handleNextPhoto,
    handlePrevPhoto,
    navigate,
  };
};
