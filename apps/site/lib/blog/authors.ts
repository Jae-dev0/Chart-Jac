import type { BlogAuthor } from "./types";

const all: BlogAuthor[] = [
  {
    id: "andrej",
    name: "Andrej Acevski",
    role: "Founder, JacChart",
    url: "https://github.com/JacChart",
  },
  {
    id: "jac-chart-team",
    name: "The JacChart team",
    role: "JacChart",
    url: "https://github.com/Jae-dev0/JacChart",
  },
];

export const authorList = all;

export const authors: Record<string, BlogAuthor> = Object.fromEntries(
  all.map((author) => [author.id, author]),
);
