import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";

const videos = [
  { url: "/videos/youtube_zzanhyung/0.webm" },
  { url: "/videos/youtube_zzanhyung/1.webm" },
  { url: "/videos/youtube_zzanhyung/2.webm" },
];

const images = [
  { url: "/images/youtube_zzanhyung/1.jpg" },
  { url: "/images/youtube_zzanhyung/2.jpg" },
  { url: "/images/youtube_zzanhyung/3.jpg" },
  { url: "/images/youtube_zzanhyung/4.jpg" },
  { url: "/images/youtube_zzanhyung/5.jpg" },
  { url: "/images/youtube_zzanhyung/6.png" },
  { url: "/images/youtube_zzanhyung/7.png" },
];

export default function YtImage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // 화면에 보이는지 체크
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, []);

  // 보일 때만 자동 재생/정지
  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play().catch(() => {}); // 자동재생 에러 방지
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible, currentVideoIndex]);

  // 인덱스 변경 시 동일 엘리먼트에 소스 교체 후 재생 시도
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // 소스가 같아도 확실히 반영되도록 load 호출
    el.load?.();

    if (isVisible) {
      const playPromise = el.play?.();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {});
      }
    }
  }, [currentVideoIndex, isVisible]);

  // 영상이 끝나면 다음 인덱스로
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  return (
    <div className="w-full min-h-screen bg-[#f5e6d3] flex items-center justify-center">
      <div className="relative w-full max-w-7xl mx-auto px-4 py-16">
        {/* 제목 */}
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#9A3434]">
            YOUTUBE CHANNEL
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-2xl text-gray-700 font-bold">
            짠한형에서도 먹는 피자!!
          </p>
        </header>

        {/* 중앙 비디오 */}
        <div className="relative flex justify-center">
          <div
            ref={sectionRef}
            className={`w-full md:w-3/4 lg:w-2/3 max-h-[60vh] aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 z-10 transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <video
              ref={videoRef}
              src={videos[currentVideoIndex].url}
              onEnded={handleVideoEnd}
              muted
              playsInline
              preload="auto"
              controls={false}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 이미지 배치 (PC 전용) */}
          <img
            src={images[6].url}
            alt="gallery"
            className="hidden md:block absolute -top-60 -left-40 w-70 h-60 object-cover rounded-xl shadow-lg rotate-3"
          />
          <img
            src={images[1].url}
            alt="gallery"
            className="hidden md:block absolute -top-60 -right-40 w-80 h-80 object-cover rounded-xl shadow-lg rotate-3"
          />
          <img
            src={images[2].url}
            alt="gallery"
            className="hidden md:block absolute -bottom-80 -left-40 w-80 h-80 object-cover rounded-xl shadow-lg rotate-2"
          />
          <img
            src={images[3].url}
            alt="gallery"
            className="hidden md:block absolute -bottom-80 -right-40 w-80 h-80 object-cover rounded-xl shadow-lg rotate-[-4deg]"
          />
          <img
            src={images[5].url}
            alt="gallery"
            className="hidden md:block absolute top-40 -right-60 aspect-[16/9] h-60 object-cover rounded-xl shadow-lg rotate-[-4deg]"
          />
          <img
            src={images[4].url}
            alt="gallery"
            className="hidden md:block absolute top-20 -left-60 aspect-[16/9] h-60 object-cover rounded-xl shadow-lg rotate-[4deg]"
          />
        </div>

        {/* 설명 텍스트 */}
        <div className="flex justify-center mt-6">
          <div className="flex font-bold text-lg text-gray-700 text-center p-4 w-400">
            <span>
              2025.06.23 [ENG SUB] 이시영 정상훈 김다솜 짠한형 EP. 98 고통받고 있는 틱톡 속 그남자... 남편 아니에요ㅠㅠ
            </span>
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="flex flex-col items-center justify-center mt-12">
          <p className="text-xl md:text-2xl font-bold text-red-600 mb-4 text-center">
            짠한형 유튜브에서 확인해보세요!
          </p>
          <Link
            href="https://www.youtube.com/watch?v=UF-GPRVSsPg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-red-600 text-white text-xl md:text-2xl font-bold py-3 px-6 rounded-full shadow-lg hover:bg-red-700 transition duration-300"
          >
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.039c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10Zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8Zm-2-12.5v9l7-4.5-7-4.5Z" />
            </svg>
            <span>YouTube 영상으로 보기</span>
          </Link>
        </div>
      </div>
    </div>
  );
}