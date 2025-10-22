"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import fetchNotes from "@/lib/api";
import { NotesClientProps } from "@/types/note";
import css from "./page.module.css"
import SearchBox from "../../../../components/SearchBox/SearchBox";
import Pagination from "../../../../components/Pagination/Pagination";
import NoteList from "../../../../components/NoteList/NoteList";
import { useRouter } from "next/navigation";

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () => fetchNotes(debouncedSearch, page, tag ?? undefined),
    placeholderData: (prev) => prev,
  }); 
    
  const totalPages = data?.totalPages ?? 1;
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  
  const handleCreateNote = () => {
    router.push("/notes/action/create");
  };
  
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
          <SearchBox value={search} onChange={handleSearchChange}/>
          {data && data?.totalPages > 1 && <Pagination totalPages={totalPages  ?? 0} page={page} onChange={setPage}/>}
          <button className={css.button} onClick={handleCreateNote}>Create note</button>
      </header>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}