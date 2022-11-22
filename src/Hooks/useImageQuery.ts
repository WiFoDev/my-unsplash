import {useQuery} from "@tanstack/react-query";

import {getImages, ImageTypes} from "@/querys";

export const useImageQuery = (
  select?: (data: ImageTypes[]) => ImageTypes[],
) => useQuery(["images"], getImages, {select});
