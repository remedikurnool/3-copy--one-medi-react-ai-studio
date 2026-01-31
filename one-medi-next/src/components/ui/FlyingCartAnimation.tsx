'use client';
import React, { useEffect, useState } from 'react';

// Helper to trigger the animation from anywhere
export const triggerCartAnimation = (e: React.MouseEvent, imageSrc: string) => {
  const target = e.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();

  // Dispatch custom event
  const event = new CustomEvent('fly-to-cart', {
    detail: {
      start: {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      },
      image: imageSrc
    }
  });
  window.dispatchEvent(event);
};

export const FlyingCartAnimation = () => {
  const [flyingItems, setFlyingItems] = useState<any[]>([]);

  useEffect(() => {
    const handler = (e: any) => {
      const { start, image } = e.detail;

      // Smart detection: Find the visible cart icon (Desktop or Mobile)
      const cartIcons = document.querySelectorAll('[id="cart-icon-target"]');
      let cartIcon = null;

      // Pick the first visible cart icon
      for (const icon of Array.from(cartIcons)) {
        if ((icon as HTMLElement).offsetWidth > 0 && (icon as HTMLElement).offsetHeight > 0) {
          cartIcon = icon;
          break;
        }
      }

      if (!cartIcon) return;

      const cartRect = cartIcon.getBoundingClientRect();
      const end = {
        x: cartRect.left + cartRect.width / 2,
        y: cartRect.top + cartRect.height / 2
      };

      const id = Math.random().toString(36).substr(2, 9);

      // Initial state
      setFlyingItems(prev => [...prev, { id, start, end, image, status: 'start' }]);

      // Transition to flying state
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFlyingItems(prev => prev.map(item =>
            item.id === id ? { ...item, status: 'flying' } : item
          ));
        });
      });

      // Cleanup
      setTimeout(() => {
        setFlyingItems(prev => prev.filter(item => item.id !== id));

        // Brief pulse on the target icon
        if (cartIcon) {
          cartIcon.classList.add('animate-bounce');
          setTimeout(() => cartIcon?.classList.remove('animate-bounce'), 400);
        }
      }, 700);
    };

    window.addEventListener('fly-to-cart', handler);
    return () => window.removeEventListener('fly-to-cart', handler);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {flyingItems.map(item => (
        <img
          key={item.id}
          src={item.image}
          alt=""
          className="absolute object-cover rounded-full shadow-2xl border-2 border-white z-50 pointer-events-none"
          style={{
            left: item.status === 'start' ? item.start.x : item.end.x,
            top: item.status === 'start' ? item.start.y : item.end.y,
            width: item.status === 'start' ? '60px' : '20px',
            height: item.status === 'start' ? '60px' : '20px',
            opacity: item.status === 'flying' ? 0.3 : 1,
            filter: item.status === 'flying' ? 'blur(1px)' : 'none',
            transform: `translate(-50%, -50%) rotate(${item.status === 'flying' ? '360deg' : '0deg'})`,
            transition: 'all 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.1)'
          }}
        />
      ))}
    </div>
  );
};