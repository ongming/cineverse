// hooks/data/useActorDetail.js
import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { actors } from "../../data/actors.js";
import { getActorFilmography } from "../../utils/movieRelationUtils.js";
import { useActorData } from "../../hooks/data/useActorData.js";

export const useActorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const { data: actorData, isLoading, error } = useActorData(id);

  // Compute age from birthday
  const age = useMemo(() => {
    if (!actorData?.birthday) return null;
    const birthDate = new Date(actorData.birthday);
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
  }, [actorData]);

  // Gallery Photo Controls
  const handleOpenPhoto = (index) => {
    setSelectedPhotoIndex(index);
    setIsLightboxOpen(true);
  };

  const handleNextPhoto = () => {
    if (!actorData?.images || actorData.images.length === 0) return;
    setSelectedPhotoIndex((prev) => (prev + 1) % actorData.images.length);
  };

  const handlePrevPhoto = () => {
    if (!actorData?.images || actorData.images.length === 0) return;
    setSelectedPhotoIndex((prev) =>
      prev === 0 ? actorData.images.length - 1 : prev - 1,
    );
  };

  return {
    actorData,
    age,
    isLightboxOpen,
    setIsLightboxOpen,
    selectedPhotoIndex,
    handleOpenPhoto,
    handleNextPhoto,
    handlePrevPhoto,
    navigate,
  };
};
