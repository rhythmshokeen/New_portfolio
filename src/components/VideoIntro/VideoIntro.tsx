'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './VideoIntro.module.css';
import CinematicLayer from '../CinematicLayer/CinematicLayer';

export default function VideoIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ambientVideoRef = useRef<HTMLVideoElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const titleTextRef1 = useRef<HTMLSpanElement>(null);
  const titleTextRef2 = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [avatarExists, setAvatarExists] = useState(false);

  // Video Source (Using a placeholder, user should replace with actual video)
  const videoSrc = '/hero-video.mp4';
  const ambientVideoSrc = '/hero-video.mp4?ambient=1';
  const staticImageSrc = '/hero-static.png';
  const avatarCutoutSrc = '/hero-avatar-cutout.png';

  useEffect(() => {
    // Check if avatar cutout image exists
    const img = new Image();
    img.src = avatarCutoutSrc;
    img.onload = () => setAvatarExists(true);
    img.onerror = () => setAvatarExists(false);
    // Handle Autoplay with Sound
    if (mainVideoRef.current && ambientVideoRef.current) {
      mainVideoRef.current.muted = false;
      
      // Play ambient video immediately (since it's muted, it should succeed)
      ambientVideoRef.current.play().catch(() => {});

      const playPromise = mainVideoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Browser blocked unmuted autoplay.
          // Keep it unmuted, but paused. Wait for user interaction.
          setShowHint(true);
          
          // CRITICAL FIX: Reload the main video to clear broken decoder state
          if (mainVideoRef.current) {
            mainVideoRef.current.load();
          }
        });
      }
    }

    // Initial GSAP Animation Sequence
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial fade in of the entire container (avoid flash of unstyled content)
    gsap.set(containerRef.current, { autoAlpha: 1 });

    tl.to([taglineRef.current], {
      opacity: 1,
      y: 0,
      duration: 1.5,
      delay: 0.5,
    })
      .to(
        [titleTextRef1.current, titleTextRef2.current],
        {
          y: '0%',
          duration: 1.5,
          stagger: 0.2,
          ease: 'power4.out',
        },
        '-=1.2'
      )
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
        },
        '-=1'
      )
      .to(
        [controlsRef.current, scrollIndicatorRef.current],
        {
          opacity: 1,
          duration: 1.5,
        },
        '-=1'
      );

    // We intentionally don't auto-hide the hint here. 
    // It will be hidden when the user taps to play.
  }, []);

  const handleContainerClick = () => {
    if (mainVideoRef.current && ambientVideoRef.current && mainVideoRef.current.paused) {
      if (isVideoEnded) {
        setIsVideoEnded(false);
        mainVideoRef.current.currentTime = 0;
        ambientVideoRef.current.currentTime = 0;
      }
      mainVideoRef.current.play();
      ambientVideoRef.current.play();
      if (showHint) setShowHint(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent hero container click
    if (mainVideoRef.current && ambientVideoRef.current) {
      // If the video was paused by the browser's autoplay policy, start it now
      if (mainVideoRef.current.paused) {
        if (isVideoEnded) {
          setIsVideoEnded(false);
          mainVideoRef.current.currentTime = 0;
          ambientVideoRef.current.currentTime = 0;
        }
        mainVideoRef.current.play();
        ambientVideoRef.current.play();
      }

      const newMutedState = !isMuted;
      mainVideoRef.current.muted = newMutedState;
      ambientVideoRef.current.muted = true; // Background always muted
      setIsMuted(newMutedState);
      
      if (showHint) {
        setShowHint(false);
      }
    }
  };

  const handleVideoEnded = () => {
    setIsVideoEnded(true);
  };

  const handleScrollClick = () => {
    // Smooth scroll to next section (assuming next section is 100vh down)
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      className={styles.hero} 
      ref={containerRef} 
      onClick={handleContainerClick}
      style={{ visibility: 'hidden', cursor: showHint ? 'pointer' : 'default' }}
    >
      {/* Background ambient blurred video */}
      <div className={styles.videoContainer}>
        <video
          ref={ambientVideoRef}
          className={styles.ambientVideo}
          src={ambientVideoSrc}
          muted
          playsInline
          style={{ opacity: isVideoEnded ? 0 : 0.8 }}
        />
        <div className={styles.gradientOverlay} />
      </div>

      {/* Main Foreground Video */}
      <div className={styles.videoContainer}>
        <video
          ref={mainVideoRef}
          className={styles.mainVideo}
          src={videoSrc}
          muted={isMuted}
          playsInline
          onEnded={handleVideoEnded}
          style={{ opacity: isVideoEnded ? 0 : 0.7 }}
        />
        <img 
          src={staticImageSrc} 
          alt="Static Hero" 
          className={`${styles.staticImage} ${isVideoEnded ? styles.staticImageVisible : ''}`} 
        />
      </div>

      {/* Three.js Cinematic Layer */}
      <CinematicLayer className={styles.threeLayer} />

      {/* Landing Content */}
      <div className={styles.content}>
        <p className={styles.tagline} ref={taglineRef} style={{ transform: 'translateY(20px)' }}>
          FOUNDER | RESEARCHER | FULL STACK | AIML SPECIALIST 
        </p>
        
        <h1 className={styles.title}>
          <span className={styles.titleLine}>
            <span className={styles.titleText} ref={titleTextRef1}>RHYTHM</span>
          </span>
          <span className={styles.titleLine}>
            <span className={styles.titleText} ref={titleTextRef2}>SHOKEEN</span>
          </span>
        </h1>
        
        <p className={styles.subtitle} ref={subtitleRef} style={{ transform: 'translateY(20px)' }}>
          Bridging the gap between bleeding-edge AI research and production-ready software. 
          I engineer scalable backend systems and intelligent solutions to solve complex, 
          real-world problems.
        </p>
      </div>

      {/* Masking Layer (Avatar Cutout) */}
      {avatarExists && (
        <img 
          src={avatarCutoutSrc} 
          alt="" 
          className={styles.avatarCutout} 
          style={{ opacity: isVideoEnded ? 0 : 1 }}
        />
      )}

      {/* Glassmorphism Controls */}
      <div className={styles.controls} ref={controlsRef}>
        <button 
          className={styles.glassButton} 
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
          ) : (
            <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
          )}
        </button>

        {showHint && (
          <span className={`${styles.soundHint} soundHintClass`}>
            Tap anywhere to start
          </span>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator} ref={scrollIndicatorRef} onClick={handleScrollClick}>
        <span className={styles.scrollText}>SCROLL</span>
        <div className={styles.scrollLineContainer}>
          <div className={styles.scrollLine} style={{
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }} />
        </div>
      </div>
      
      {/* Inline styles for pulse animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0%, 100% {
            transform: scaleY(1);
            opacity: 1;
          }
          50% {
            transform: scaleY(0);
            opacity: 0.3;
          }
        }
      `}} />
    </section>
  );
}
