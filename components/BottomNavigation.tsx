import Image from "next/image";
import React from 'react';
import { img1stButton, img2ndButton, img3rdButton, img4thButton, imgIconsPlusCrFr } from '../imports/svg-b10nj';

interface BottomNavigationProps {
  currentScreen: string;
  navigateToScreen: (screen: string) => void;
}

export function BottomNavigation({ currentScreen, navigateToScreen }: BottomNavigationProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white px-6 py-2">
      <div aria-hidden="true" className="absolute border-[#eaecf0] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
        <div className="content-stretch flex gap-10 items-start justify-start relative shrink-0">
          {/* Home Button */}
          <button 
            onClick={() => navigateToScreen('home')}
            className="relative shrink-0 size-6"
          >
            <img 
              className="block max-w-none size-full" 
              src={img1stButton}
              style={{
                filter: currentScreen === 'home' ? 'none' : 'grayscale(1) opacity(0.4)'
              }}
            />
          </button>
          
          {/* Feed/Search Button */}
          <button 
            onClick={() => navigateToScreen('feed')}
            className="relative shrink-0 size-6"
          >
            <img 
              className="block max-w-none size-full" 
              src={img2ndButton}
              style={{
                filter: currentScreen === 'feed' ? 'none' : 'grayscale(1) opacity(0.4)'
              }}
            />
          </button>
        </div>
        
        {/* Center Plus Button */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-6">
          <button 
            onClick={() => navigateToScreen('challenges')}
            className="relative shrink-0 w-[44px] h-[44px]"
          >
            <img className="block max-w-none size-full" src={imgIconsPlusCrFr} />
          </button>
        </div>
        
        <div className="content-stretch flex gap-10 items-start justify-start relative shrink-0">
          {/* Leaderboard Button */}
          <button 
            onClick={() => navigateToScreen('leaderboard')}
            className="relative shrink-0 size-6"
          >
            <img 
              className="block max-w-none size-full" 
              src={img3rdButton}
              style={{
                filter: currentScreen === 'leaderboard' ? 'none' : 'grayscale(1) opacity(0.4)'
              }}
            />
          </button>
          
          {/* Profile Button */}
          <button 
            onClick={() => navigateToScreen('profile')}
            className="relative shrink-0 size-6"
          >
            <img 
              className="block max-w-none size-full" 
              src={img4thButton}
              style={{
                filter: currentScreen === 'profile' ? 'none' : 'grayscale(1) opacity(0.4)'
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}