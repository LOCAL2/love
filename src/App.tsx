import { useState, useRef, useEffect, useMemo } from 'react'
import { config } from './config'
import './App.css'

const useImagePreload = (urls: string[]) => {
  useEffect(() => {
    urls.forEach(url => {
      if (!url) return;
      const img = new Image();
      img.src = url;
    });
  }, [urls]);
};

const TypingText = ({ text, delay = 100 }: { text: string; delay?: number }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const chars = Array.from(text)
    if (index < chars.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + chars[index])
        setIndex(prev => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [index, text, delay])

  return (
    <div className="typing-text-container">
      <span 
        className="typing-text" 
        style={{ 
          fontSize: `${config.message.fontSize}px`,
          color: config.message.color 
        }}
      >
        {displayedText}
      </span>
      <span 
        className="cursor" 
        style={{ 
          height: `${config.message.fontSize * 1.2}px`, 
          fontSize: `${config.message.fontSize}px`,
          backgroundColor: config.message.color
        }}
      ></span>
    </div>
  )
}

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadError, setLoadError] = useState(false);

  function handleAudioError() {
    setLoadError(true);
  }

  const initAudio = () => {
    if (!audioRef.current || analyserRef.current) return;
    try {
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
      const audioContext = new AudioContextClass();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioRef.current);
      
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      analyser.fftSize = 64; 
      analyserRef.current = analyser;
    } catch (e) {
      console.error("Audio init failed:", e);
    }
  };

  const updateVisualizer = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      if (!isPlaying) return;
      
      animationRef.current = requestAnimationFrame(draw);
      analyserRef.current!.getByteFrequencyData(dataArray);

      for (let i = 0; i < 10; i++) {
        const bar = barRefs.current[i];
        if (bar) {
          const value = dataArray[i * 2 + 2]; 
          const height = Math.max(15, (value / 255) * 100);
          bar.style.height = `${height}%`;
        }
      }
    };

    draw();
  };

  useEffect(() => {
    if (audioRef.current && config.music.url) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => {
        initAudio();
        setIsPlaying(true);
      }).catch((e) => {
        console.log("Music autoplay blocked:", e.message);
      });
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      updateVisualizer();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current && !loadError) {
      initAudio();
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className={`music-player-container ${loadError ? 'error' : ''} ${isPlaying ? 'playing' : ''}`} 
      onClick={config.music.url && !loadError ? togglePlay : undefined}
    >
      {config.music.url && (
        <audio 
          ref={audioRef} 
          src={config.music.url} 
          loop 
          onError={handleAudioError}
          onPlay={() => {
            initAudio();
            setIsPlaying(true);
          }}
          onPause={() => setIsPlaying(false)}
        />
      )}
      
      <div className="play-button-wrapper">
        <div className="play-button-glass">
          {config.music.thumbnail && (
            <img 
              src={config.music.thumbnail} 
              alt="Thumbnail" 
              className="music-thumbnail" 
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="play-icon-overlay">
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
                <path d="M8 5.14v14l11-7z" />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div className="song-details-scroller">
        <div className="song-info-wrapper">
          <span className="song-name-premium">
            {loadError ? 'Unable to load audio' : config.music.title}
          </span>
          <span className="artist-name-premium">
            {loadError ? '' : config.music.artist}
          </span>
        </div>
        
        <div className="visualizer-container">
          {!loadError && (
            <div className="visualizer">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className="bar" 
                  ref={el => { barRefs.current[i] = el; }}
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


const Particle = ({ angle, distance, delay }: { angle: number; distance: number; delay: number }) => {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;
  
  return (
    <div 
      className="particle-heart"
      style={{
        '--tx': `${x}px`,
        '--ty': `${y}px`,
        '--delay': `${delay}s`,
      } as any}
    >
      <svg viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
};

const ParticleSystem = ({ count = 12 }: { count?: number }) => {
  return (
    <div className="particle-container">
      {Array.from({ length: count }).map((_, i) => (
        <Particle 
          key={i} 
          angle={(i / count) * Math.PI * 2 + (Math.random() * 0.5)} 
          distance={100 + Math.random() * 150}
          delay={Math.random() * 0.2}
        />
      ))}
    </div>
  );
};

function App() {
  const [fillLevel, setFillLevel] = useState(0)
  const [isPressing, setIsPressing] = useState(false)
  const [isBooming, setIsBooming] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [showFlash, setShowFlash] = useState(false)
  
  const preloadUrls = useMemo(() => [
    config.card.image,
    config.music.thumbnail
  ].filter(Boolean) as string[], []);

  useImagePreload(preloadUrls);

  const requestRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)

  const animate = (time: number) => {
    if (lastTimeRef.current !== null) {
      const deltaTime = time - lastTimeRef.current
      
      if (isPressing && !isBooming) {
        setFillLevel(prev => {
          const next = Math.min(prev + (deltaTime / 20), 100)
          if (next === 100 && !isBooming) {
            setIsBooming(true)
            setShowFlash(true)
            setTimeout(() => setShowFlash(false), 800)
            setTimeout(() => setShowCard(true), 1500)
          }
          return next
        })
      } else if (!isBooming && fillLevel < 100) {
        setFillLevel(prev => Math.max(prev - (deltaTime / 40), 0))
      }
    }
    lastTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [isPressing, isBooming, fillLevel]) 

  const handlePointerDown = () => {
    if (!isBooming) setIsPressing(true)
  }

  const handlePointerUp = () => {
    setIsPressing(false)
  }

  if (showCard) {
    return (
      <div className="card-view-wrapper">
        <div className="card-container">
          <div className="polaroid-frame">
            <div className="card-image-wrapper">
              <img 
                src={config.card.image} 
                alt="Card" 
                className="card-image" 
                // @ts-ignore
                fetchpriority="high"
                decoding="async"
              />
            </div>
            {config.card.heart.show && (
              <div className="polaroid-heart">
                <span className="heart-content">{config.card.heart.content}</span>
              </div>
            )}
          </div>
          
          <div className="card-header">
            <h1 className="card-title">{config.card.title}</h1>
          </div>

          <div className="message-section">
            <p className="card-greeting">{config.card.greeting}</p>
            <TypingText text={config.message.text} delay={config.message.speed} />
          </div>

          <MusicPlayer />
        </div>
      </div>
    )
  }

  return (
    <div className="app-main-wrapper">
      {showFlash && <div className="flash-overlay" />}
      {isBooming && <ParticleSystem />}
      
      <div className="container" id="app-container">
        <div className="glow" id="heart-glow"></div>
        
        <div 
          id="heart-trigger"
          className={`heart-wrapper ${fillLevel === 100 ? 'full' : ''} ${isBooming ? 'boom' : ''}`}
          style={{ '--fill-level': '0' } as any}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
          onContextMenu={(e) => e.preventDefault()}
        >
            <svg viewBox="0 0 24 24" className="heart-svg">
            <defs>
              <clipPath id="heartClip">
                <path d="M20.16,4.61A6.27,6.27,0,0,0,12,4a6.27,6.27,0,0,0-8.16,9.48l7.45,7.45a1,1,0,0,0,1.42,0l7.45-7.45A6.27,6.27,0,0,0,20.16,4.61Z" />
              </clipPath>
              <clipPath id="fillClip">
                <rect 
                  x="0" 
                  y={22 - (fillLevel * 0.2)} 
                  width="24" 
                  height={fillLevel * 0.2} 
                />
              </clipPath>
            </defs>
            
            <path d="M20.16,4.61A6.27,6.27,0,0,0,12,4a6.27,6.27,0,0,0-8.16,9.48l7.45,7.45a1,1,0,0,0,1.42,0l7.45-7.45A6.27,6.27,0,0,0,20.16,4.61Z" fill="#ffffff" />
            <path className="heart-bg" d="M20.16,4.61A6.27,6.27,0,0,0,12,4a6.27,6.27,0,0,0-8.16,9.48l7.45,7.45a1,1,0,0,0,1.42,0l7.45-7.45A6.27,6.27,0,0,0,20.16,4.61Z" />
            
            <g clipPath="url(#heartClip)">
              <path 
                className="heart-fill"
                d="M20.16,4.61A6.27,6.27,0,0,0,12,4a6.27,6.27,0,0,0-8.16,9.48l7.45,7.45a1,1,0,0,0,1.42,0l7.45-7.45A6.27,6.27,0,0,0,20.16,4.61Z"
                clipPath="url(#fillClip)"
                id="heart-fill-path"
              />
            </g>
          </svg>
        </div>

        <div className={`instruction ${isBooming ? 'fade-out' : ''}`} id="instruction-text">
          {fillLevel === 100 
            ? "" 
            : isPressing 
              ? "กดค้างไว้นะ..." 
              : "กดค้างที่หัวใจสิ"}
        </div>
        
        {!isBooming && (
          <div 
            id="percentage-text"
            className={`percentage ${fillLevel > 0 ? 'visible' : ''}`}
          >
            {Math.round(fillLevel)}%
          </div>
        )}
      </div>
    </div>
  )
}

export default App
