import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteByIdServer } from "@/lib/api/serverApi";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const note = await fetchNoteByIdServer(id)
  return {
    title: note.title,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note ${note.title}`,
      description: note.content.slice(0, 50),
      type: "article",
      siteName: "Note Hub",
      url: `https://notehub-api.goit.study/api/notes/${id}`,
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

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteByIdServer(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetailsPage;