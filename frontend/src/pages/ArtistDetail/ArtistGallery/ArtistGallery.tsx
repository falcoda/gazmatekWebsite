import "./ArtistGallery.scss";

import { useTranslation } from "react-i18next";

import Carousel from "@/components/Carousel/Carousel";

interface ArtistGalleryProps {
  images: string[];
  artistName: string;
}

const ArtistGallery = ({ images, artistName }: ArtistGalleryProps) => {
  const { t } = useTranslation();

  if (images.length === 0) return null;

  return (
    <div className="artistGallery">
      <h2 className="title">{t("artists.galleryTitle")}</h2>
      <Carousel images={images} altPrefix={artistName} />
    </div>
  );
};

export default ArtistGallery;
