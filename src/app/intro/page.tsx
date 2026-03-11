'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const INTRO_SEEN_KEY = 'fanyinge_intro_seen';

export default function IntroPage() {
  const [show, setShow] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 检查是否已看过引导页
    const hasSeenIntro = localStorage.getItem(INTRO_SEEN_KEY);
    if (hasSeenIntro) {
      setShouldRedirect(true);
      return;
    }

    // 标记已看过引导页
    localStorage.setItem(INTRO_SEEN_KEY, 'true');

    setShow(true);
    // 经文渐显动画
    setTimeout(() => setTextVisible(true), 500);
  }, []);

  // 如果已看过引导页，直接跳转
  useEffect(() => {
    if (shouldRedirect) {
      router.replace('/products');
    }
  }, [shouldRedirect, router]);

  const handleEnter = () => {
    router.push('/products');
  };

  // 空格键快速进入
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'}`}
      style={{
        background: `
          radial-gradient(ellipse at 20% 80%, rgba(120, 80, 40, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(80, 60, 30, 0.1) 0%, transparent 40%),
          linear-gradient(180deg, #0a0908 0%, #12100c 50%, #0a0806 100%)
        `,
      }}
    >
      {/* 背景装饰 - 莲花意象 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/3 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-700/2 blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      {/* 品牌锚点 - 左上角极小字体 */}
      <div className="absolute top-6 left-6 text-amber-500/10 text-[10px] tracking-[0.5em]">
        如法阁
      </div>

      {/* 主内容区 */}
      <div className={`relative z-10 text-center px-6 max-w-lg transition-all duration-1500 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {/* 经文核心 - 三段式叙事 */}
        <div className="mb-16">
          {/* 第一段：观照 */}
          <div className="mb-10">
            <p className="text-lg text-amber-100/80 font-serif leading-loose mb-3">
              观自在菩萨<br />
              行深般若波罗蜜多时<br />
              照见五蕴皆空
            </p>
          </div>

          {/* 第二段：空性 */}
          <div className="mb-10">
            <p className="text-xl text-amber-200/90 font-serif leading-loose">
              色不异空，空不异色<br />
              <span className="text-amber-100">色即是空，空即是色</span>
            </p>
          </div>

          {/* 第三段：圆满 */}
          <div>
            <p className="text-lg text-amber-100/80 font-serif leading-loose mb-4">
              心无挂碍，无有恐怖<br />
              远离颠倒梦想<br />
              究竟涅槃
            </p>
            <p className="text-2xl text-amber-300/70 font-serif tracking-wider">
              揭谛揭谛，菩提萨婆诃
            </p>
          </div>
        </div>

        {/* 品牌Slogan */}
        <div className="mb-12">
          <p className="text-amber-400/50 font-serif text-sm tracking-wide">
            每一件藏品，皆是一次结缘
          </p>
        </div>

        {/* 进入按钮 - 仪式感设计 */}
        <div className="relative inline-block">
          <button
            onClick={handleEnter}
            className="group relative px-12 py-4 text-amber-300 font-serif tracking-widest transition-all duration-500"
          >
            {/* 装饰线 */}
            <span className="absolute top-1/2 left-0 w-16 h-px bg-gradient-to-r from-transparent to-amber-500/30 -translate-x-20 group-hover:w-24 group-hover:bg-amber-500/50 transition-all duration-500" />
            <span className="absolute top-1/2 right-0 w-16 h-px bg-gradient-to-l from-transparent to-amber-500/30 translate-x-20 group-hover:w-24 group-hover:bg-amber-500/50 transition-all duration-500" />

            {/* 按钮文字 */}
            <span className="relative z-10 group-hover:text-amber-200 transition-colors duration-300">
              进入如法阁
            </span>

            {/* 悬停光效 */}
            <span className="absolute inset-0 rounded-sm bg-amber-500/0 group-hover:bg-amber-500/5 transition-all duration-500" />
          </button>
        </div>

      </div>

      {/* 跳过 - 右下角极弱化 */}
      <button
        onClick={handleEnter}
        className="absolute bottom-6 right-6 text-amber-500/10 hover:text-amber-400/20 text-[10px] transition-colors duration-300"
      >
        跳过
      </button>
    </div>
  );
}
