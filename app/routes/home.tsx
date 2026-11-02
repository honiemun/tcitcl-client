import { AddPostForm } from "~/features/posts/AddPostForm";
import type { Route } from "./+types/home";
import { PostTable } from "~/features/posts/PostTable";
import { FilterPostForm } from "~/features/posts/FilterPostForm";
import { Header } from "~/features/page/Header";
import { Footer } from "~/features/page/Footer";

import './home.css';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TCIT Take-home project" },
    { name: "description", content: "Simple front-end app for posts created with React and Redux." },
  ];
}

export default function Home() {
  return (
    <div className='page'>
      <Header />
      <div className='content-wrapper'>
        <div className='content'>
          <FilterPostForm />
          <PostTable />
          <AddPostForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
