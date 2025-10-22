import { create } from "zustand";
import { CreateNotePost } from "@/lib/api";
import { persist } from "zustand/middleware";
import { NoteTag } from "@/types/note";

type NoteDraft = {
    draft: CreateNotePost;
  setDraft: (note: CreateNotePost) => void;
  clearDraft: () => void;
}

const initialDraft: CreateNotePost = {
  title: '',
  content: '',
  tag: 'Todo' as NoteTag,
};

export const useNoteDraft = create<NoteDraft>()(
  persist<NoteDraft>(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",
    }
  )
);