
import { useEffect, useState } from "react"
import { Club } from "../data/Club";
import { ClubsResult } from "../data/ClubsResult";


export default function useFetchClubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (
      async function () {
        setLoading(true)
        const response = await fetch('clubs-v2/sats/clubs');
        if (response.status === 200) {
          const data: ClubsResult = await response.json();
          setClubs(data.clubs);
        } else {
          setError(response.statusText);
        }
        setLoading(false)
      }
    )()
  }, [])

  return { clubs, error, loading };

}