import CategoryPills from "./components/CategoryPills";
import VideoGridItem from "./components/VideoGridItem";
import PageHeader from "./layouts/PageHeader";
import { categories, videos } from "../src/data/home";
import { useState } from "react";
import SideBar from "./layouts/SideBar";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="max-h-screen flex flex-col">
      {/* 1. Header */}
      <PageHeader />

      {/* -- Dibagi 3 bagian: Grid bagian sidebar, category pills, video cards */}
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        {/* 2. Sidebar section */}
        <SideBar />
        {/* -- Dibagi 2 lagi: Category pills & Video Cards */}
        <div className="overflow-x-hidden px-8 pb-4">
          {/* 2. Categories section: category pills */}
          <div className="sticky top-0 bg-white z-10 pb-4">
            <CategoryPills
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>

          {/* 3. Video Cards */}
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {videos.map((video) => (
              <VideoGridItem key={video.id} {...video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
