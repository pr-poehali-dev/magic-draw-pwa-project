import func2url from "../../backend/func2url.json";

const CREATIONS_URL = func2url.creations;

export interface Creation {
  id: number;
  user_name: string;
  title: string;
  image_url: string;
  effect: string | null;
  emoji: string;
  likes: number;
  created_at: string | null;
}

export function getUserName(): string {
  return localStorage.getItem("magicdraw_user") || "Гость";
}

export function setUserName(name: string) {
  localStorage.setItem("magicdraw_user", name || "Гость");
}

export async function fetchCreations(userName?: string): Promise<Creation[]> {
  const url = userName
    ? `${CREATIONS_URL}?user_name=${encodeURIComponent(userName)}`
    : CREATIONS_URL;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Не удалось загрузить творения");
  const data = await res.json();
  return data.creations || [];
}

export async function saveCreation(params: {
  image_base64: string;
  title: string;
  effect: string;
  emoji: string;
  user_name?: string;
}): Promise<Creation> {
  const res = await fetch(CREATIONS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...params,
      user_name: params.user_name || getUserName(),
    }),
  });
  if (!res.ok) throw new Error("Не удалось сохранить рисунок");
  return res.json();
}

export async function likeCreation(id: number): Promise<number> {
  const res = await fetch(CREATIONS_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error("Не удалось поставить лайк");
  const data = await res.json();
  return data.likes;
}
