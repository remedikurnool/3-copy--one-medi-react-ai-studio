
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
      const cartIcon = document.getElementById('cart-icon-target');
      
      if (!cartIcon) return;

      const cartRect = cartIcon.getBoundingClientRect();
      const end = {
        x: cartRect.left + cartRect.width / 2,
        y: cartRect.top + cartRect.height / 2
      };

      const id = Date.now();

      setFlyingItems(prev => [...prev, { id, start, end, image, status: 'start' }]);

      // Trigger animation frame
      requestAnimationFrame(() => {
        // Double RAF to ensure browser paints the start position first
        requestAnimationFrame(() => {
          setFlyingItems(prev => prev.map(item => 
            item.id === id ? { ...item, status: 'flying' } : item
          ));
        });
      });

      // Cleanup after animation
      setTimeout(() => {
        setFlyingItems(prev => prev.filter(item => item.id !== id));
      }, 800);
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
          className="absolute object-cover rounded-full shadow-xl border-2 border-white z-50"
          style={{
            left: item.status === 'start' ? item.start.x : item.end.x,
            top: item.status === 'start' ? item.start.y : item.end.y,
            width: '50px',
            height: '50px',
            opacity: item.status === 'flying' ? 0 : 1,
            transform: `translate(-50%, -50%) scale(${item.status === 'flying' ? 0.2 : 1})`,
            transition: 'all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        />
      ))}
    </div>
  );
};
