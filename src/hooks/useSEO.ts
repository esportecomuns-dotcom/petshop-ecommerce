import { useEffect } from "react";

export const useSEO = (title: string, description?: string) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | Pata Feliz PetShop`;

    const metaDescription = document.querySelector('meta[name="description"]');
    const prevDescription = metaDescription?.getAttribute("content");

    if (description && metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    return () => {
      document.title = prevTitle;
      if (prevDescription && metaDescription) {
        metaDescription.setAttribute("content", prevDescription);
      }
    };
  }, [title, description]);
};
