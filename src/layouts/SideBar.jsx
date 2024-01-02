/* eslint-disable react/prop-types */
import { Home, Clapperboard, Repeat, Library, ChevronUp, ChevronDown, History, PlaySquare, Clock, Lightbulb, ThumbsUp, ListVideo, Flame, ShoppingBag, Music2, Film, Radio, Gamepad2,  Newspaper, Trophy, Shirt, Podcast } from "lucide-react";
import Button, { buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { Children } from "react";
import { useState } from "react";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../contexts/SidebarContext";
import { PageHeaderFirstSection } from "./PageHeader";

export default function SideBar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext()

  return (
    <>
    {/* 1. Small Sidebar: for small screen < 1024 */}
      <aside className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${isLargeOpen ? "lg:hidden" : "lg:flex" }`}>
        <SmallSidebarItem IconOrImage={Home} title="Home" url="/"/>
        <SmallSidebarItem IconOrImage={Repeat} title="Shorts" url="/shorts"/>
        <SmallSidebarItem IconOrImage={Clapperboard} title="Subcriptions" url="/subcriptions"/>
        <SmallSidebarItem IconOrImage={Library} title="Library" url="/library"/>
      </aside>

      {isSmallOpen && (
        <div onClick={close} className="lg-hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"/>
      )}

    {/* 2. Large Sidebar: for large screen > 1024 */}
      <aside className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${isLargeOpen ? "lg:flex" : "lg:hidden"} ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}>
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderFirstSection />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem isActive IconOrImage={Home} title="Home" url="/" />
          <LargeSidebarItem IconOrImage={Repeat} title="Shorts" url="/shorts" />
          <LargeSidebarItem IconOrImage={Clapperboard} title="Subscriptions" url="/subscriptions" />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem IconOrImage={Library} title="Library" url="/library" />
          <LargeSidebarItem IconOrImage={History} title="History" url="/history" />
          <LargeSidebarItem IconOrImage={PlaySquare} title="Your Videos" url="/your-videos" />
          <LargeSidebarItem IconOrImage={Lightbulb} title="Your Courses" url="/feed/courses" />
          <LargeSidebarItem IconOrImage={Clock} title="Watch Later" url="/playlist?list=WL" />
          <LargeSidebarItem IconOrImage={ThumbsUp} title="Liked Videos" url="/playlist?list=LL" />
          {playlists.map(playlist => (
            <LargeSidebarItem 
              key={playlist.id}
              IconOrImage={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions" visibleItemCount={5}>
          {subscriptions.map(subscription => (
            <LargeSidebarItem key={subscription.id} IconOrImage={subscription.imgUrl} title={subscription.channelName} url={`/@${subscription.id}`} />
          ))}
        </LargeSidebarSection>
        <hr />

        <LargeSidebarSection title="Explore">
            <LargeSidebarItem IconOrImage={Flame} title="Trending" url="/trending" />
            <LargeSidebarItem IconOrImage={ShoppingBag} title="Shopping" url="/shopping" />
            <LargeSidebarItem IconOrImage={Music2} title="Music" url="/music" />
            <LargeSidebarItem IconOrImage={Film} title="Movies & TV" url="/movies-tv" />
            <LargeSidebarItem IconOrImage={Radio} title="Live" url="/live" />
            <LargeSidebarItem IconOrImage={Gamepad2} title="Gaming" url="/gaming" />
            <LargeSidebarItem IconOrImage={Newspaper} title="News" url="/news" />
            <LargeSidebarItem IconOrImage={Trophy} title="Sports" url="/sports" />
            <LargeSidebarItem IconOrImage={Lightbulb} title="Learning" url="/learning" />
            <LargeSidebarItem IconOrImage={Shirt} title="Fashion & Beauty" url="/fashion-beauty" />
            <LargeSidebarItem IconOrImage={Podcast} title="Podcasts" url="/podcasts" />
        </LargeSidebarSection>
      </aside>
    </>
  )
}

function SmallSidebarItem({IconOrImage, title, url}) {
  return (
    <a href={url} className={twMerge(buttonStyles({variant: "ghost"}), "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
      <IconOrImage className="w-6 h-6"/>
      <div className="text-sm">{title}</div>
    </a>
  )
}

function LargeSidebarSection({children, title, visibleItemCount = Number.POSITIVE_INFINITY}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const childrenArr = Children.toArray(children).flat()
  const showExpandButton = childrenArr.length > visibleItemCount
  const visibleChildren = isExpanded ? childrenArr : childrenArr.slice(0, visibleItemCount)
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button 
          onClick={() => setIsExpanded(e => !e)}
          variant="ghost" 
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show less" : "Show more"}</div>
        </Button>
      )}
    </div>
  )
}

function LargeSidebarItem({IconOrImage, title, url, isActive = false}) {
  return (
    <a href={url} className={twMerge(buttonStyles({variant: "ghost"}), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined}`)}>
      {typeof IconOrImage === "string" ? (
        <img src={IconOrImage} className="w-6 h-6 rounded-full" />
      ) : (
        <IconOrImage className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  )
}