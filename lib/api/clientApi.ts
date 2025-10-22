import { User } from "@/types/user";
import apiServer from "./api";
import { Note, NoteTag } from "@/types/note";

export interface NoteHttpResponse {
  notes: Note[];
  totalPages: number;
}

export default async function fetchNotes(
  query: string,
  page: number,
  tag?: NoteTag
): Promise<NoteHttpResponse> {
  const params: Record<string, string | number>  = {
    search: query,
    page,
    perPage: 12,
  };

  if (tag) {
    params.tag = tag;
  }

  const response = await apiServer.get<NoteHttpResponse>("/", { params });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const responseById = await apiServer.get<Note>(`/notes/${id}`);
  return responseById.data;
}

export interface CreateNotePost {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNotePost): Promise<Note> {
  const postResponse = await apiServer.post<Note>("/notes", {
    title,
    content,
    tag,
  });
  return postResponse.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const deleteResponse = await apiServer.delete<Note>(`/notes/${id}`);

  return deleteResponse.data;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface UserRegister {
  username: string;
  email: string;
}

export async function register(data: RegisterRequest) {
  const res = await apiServer.post<User>("/auth/register", data);
  return res.data;
}

export async function login(data: RegisterRequest) {
  const res = await apiServer.post<User>("/auth/login", data);
  return res.data;
}

export const logout = async (): Promise<void> => {
  await apiServer.post("/auth/logout");
};

interface CheckSessionRequest {
  success: boolean;
}

export async function checkSession() {
  const res = await apiServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
}

export const getMe = async () => {
  const res = await apiServer.get<User>("/users/me");
  return res.data;
};

export interface UpdateUserRequest {
  username: string;
}

export const getMeUpdate = async (payload: UpdateUserRequest) => {
  const res = await apiServer.patch<User>("/users/me", payload);
  return res.data;
};