"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import fetchNotes from "@/lib/api/clientApi";
import css from "./page.module.css"
import Link from "next/link";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";

export default function NotesClient({ tag }: { tag?: string }) {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);

  const { data} = useQuery({
    queryKey: ["notes", search, page, tag],
    queryFn: () => fetchNotes(search, page, tag),
    placeholderData: keepPreviousData,
  });

  const handleChange = useDebouncedCallback(
    (newValue: string) => {
      setSearch(newValue);
      setPage(1);
    },
    1000,
  );
  
  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={handleChange} />
        {data && data?.notes.length > 0 && (
          <Pagination
            totalPages={data?.totalPages ?? 0}
            page={page}
            onChange={(newPage) => setPage(newPage)}
          />
        )}
        <Link className={css.button} href={"/notes/action/create"}>Create note</Link>
      </div>
      {data && data?.notes.length > 0 && <NoteList notes={data?.notes} />}
    </div>
  );
}