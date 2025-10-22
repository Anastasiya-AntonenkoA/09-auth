import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const note = await fetchNoteById(id)
  return {
    title: note.title,
    description: note.content.slice(0, 30),
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 30),
      type: "article",
      siteName: "Note Hub",
      url: `https://08-zustand-sigma-five.vercel.app/notes/${id}`,
      images: [{
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: note.title,
      }]
    }
  }
}

const NoteDetailsPage = async ({ params }: Props) => {
    const { id } = await params;
    const queryClient = new QueryClient();
    const dehydratedState = dehydrate(queryClient);

    if (id) {
        await queryClient.prefetchQuery({
            queryKey: ["note", id],
            queryFn: () => fetchNoteById(id),
        });
    }

    return (
        <HydrationBoundary state={dehydratedState}>
            <NoteDetailsClient />
        </HydrationBoundary>
    );
};

export default NoteDetailsPage;