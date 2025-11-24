import { useState, useEffect } from "react";
import { getLogo } from "@/lib/api";

export function useLogo() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLogo() {
      try {
        setLoading(true);
        setError(null);
        const url = await getLogo();
        setLogoUrl(url);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load logo");
        console.error("Error loading logo:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLogo();
  }, []);

  return { logoUrl, loading, error };
}
