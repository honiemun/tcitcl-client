import { AddPostForm } from "~/features/posts/AddPostForm";
import type { Route } from "./+types/home";
import { PostTable } from "~/features/posts/PostTable";
import { FilterPostForm } from "~/features/posts/FilterPostForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TCIT Take-home project" },
    { name: "description", content: "Simple front-end app for posts created with React and Redux." },
  ];
}

export default function Home() {
  return (
    <>
      <FilterPostForm />
      <PostTable />
      <AddPostForm />
    </>
  );
}
