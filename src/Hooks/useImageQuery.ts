import {useQuery} from "@tanstack/react-query";

import {getImages} from "@/querys";

export const useImageQuery = () => useQuery(["images"], getImages);
