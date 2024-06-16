import { MainNav } from "@/components/main-nav";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24,
          },
        },
      })
  );
  const [persister, setPersister] = useState<any>(null);

  useEffect(() => {
    // Zorg ervoor dat localStorage alleen op de client-side wordt gebruikt
    if (typeof window !== "undefined") {
      const localStoragePersister = createSyncStoragePersister({
        storage: window.localStorage,
      });
      setPersister(localStoragePersister);
    }
  }, []);

  if (!persister) {
    // Render niets totdat de persister is ingesteld om hydration problemen te voorkomen
    return null;
  }
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        queryClient.resumePausedMutations();
        queryClient.invalidateQueries();
      }}
    >
      <MainNav />
      <main className="px-24 w-full min-h-screen  items-center justify-between mt-12">
        <Component {...pageProps} />
      </main>
    </PersistQueryClientProvider>
  );
}
