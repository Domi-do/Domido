import { useQuery } from "@tanstack/react-query";

export const decodeImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(src);
    };
    img.onerror = (e) => {
      reject(e);
    };
  });

export const useImagePreload = (src) => {
  useQuery({
    queryKey: ["img", src],
    queryFn: () => decodeImage(src),
    staleTime: Infinity,
    cacheTime: Infinity,
    suspense: false,
    enabled: !!src,
  });
};
