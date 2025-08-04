'use client'

// 콘텐츠가 제거되어 애니메이션 관련 코드는 삭제되었습니다.

const VideoSection = () => {
  return (
    // --- 수정된 부분: 배경색을 bg-white로 변경합니다. ---
    <section className="relative h-[75vh] bg-white overflow-hidden">
      {/* --- 비디오 배경 --- */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          src="/video/pizza.model.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </section>
  )
}

export default VideoSection
