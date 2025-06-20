import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint1 = 768, breakpoint2 = 500) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint1);
    const checkSmallMobile = () => setIsSmallMobile(window.innerWidth < breakpoint2);

    checkMobile();
    checkSmallMobile();

    window.addEventListener('resize', checkMobile);
    window.addEventListener('resize', checkSmallMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', checkSmallMobile);
    };
  }, [breakpoint1, breakpoint2]);

  return { isMobile, isSmallMobile };
}

