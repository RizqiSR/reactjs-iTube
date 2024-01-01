import { useState } from "react";
import { formatDuration } from "../utils/formatDuration";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import { useRef } from "react";
import { useEffect } from "react";


const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {notation: "compact"})

/* eslint-disable react/prop-types */
export default function VideoGridItem({id, title, channel, views, postedAt, duration, thumbnailUrl, videoUrl }){
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current == null) return

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }, [isVideoPlaying])

  return (
    <div className="flex flex-col gap-2" onMouseEnter={() => setIsVideoPlaying(true)} onMouseLeave={() => setIsVideoPlaying(false)}>
      


      {/* 1. for video display */}
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        <img src={thumbnailUrl} alt="" className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${isVideoPlaying ? "rounded-none" : "rounded-xl"}`} />

        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
          {formatDuration(duration)}
        </div>

        {/* Play on hover */}
        <video src={videoUrl} ref={videoRef} muted playsInline className={`block h-full object-cover inset-0 absolute duration-200 transition-opacity  ${isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"}`} />
      </a>

      {/* 2. for title, channel, postedAt, views */}
      <div className="flex gap-2 ">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img src={channel.profileUrl} alt="Creator Profile Picture" className="w-12 h-12 rounded-full" />
        </a>
        <div className="flex flex-col">
          <a href={`/watch?v=${id}`} className="font-bold">{title}</a>
          <a href={`/@${channel.id}`} className="text-secondary-text text-sm">{channel.name}</a>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATTER.format(views)} views • {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  )
}