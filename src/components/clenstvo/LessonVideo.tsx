'use client'

import MuxPlayer from '@mux/mux-player-react'

interface Props {
  playbackId: string
  title: string
  accent: string
}

export default function LessonVideo({ playbackId, title, accent }: Props) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      metadata={{ video_title: title }}
      accentColor={accent}
      streamType="on-demand"
      style={{ aspectRatio: '16 / 9', width: '100%' }}
    />
  )
}
