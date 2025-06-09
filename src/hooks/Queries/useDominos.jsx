import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import fetcher from "@/services/fetcher";
import useDominoStore from "@/store/useDominoStore";

export const useDominos = () => {
  const { projectId } = useParams();
  const setDominos = useDominoStore((state) => state.setDominos);

  const { data: dominos } = useSuspenseQuery({
    queryKey: ["dominos", projectId],
    queryFn: () => fetcher(`/dominos/${projectId}`),
    enabled: !!projectId,
  });

  useEffect(() => {
    setDominos(dominos);
  }, [dominos]);
};
