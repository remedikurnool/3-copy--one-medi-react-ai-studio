
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

interface NavItemProps {
  icon: string;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, path, isActive, onClick, badge }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1.5 w-14 h-14 transition-all duration-500 relative group ${
      isActive 
        ? 'text-primary' 
        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
    }`}
  >
    <div className={`relative flex items-center justify-center transition-all duration-500 ${
      isActive ? 'scale-110 -translate-y-2' : 'group-hover:-translate-y-1'
    }`}>
      {/* 3D Glow for active item */}
      {isActive && (
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse"></div>
      )}
      
      <span className={`material-symbols-outlined text-[26px] leading-none transition-all duration-500 ${
        isActive ? 'filled drop-shadow-[0_4px_8px_rgba(13,148,136,0.4)]' : ''
      }`}>
        {icon}
      </span>
      
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-black text-white border-2 border-white dark:border-slate-900 shadow-md">
          {badge}
        </span>
      )}
    </div>
    
    <span className={`text-[9px] uppercase tracking-[0.15em] transition-all duration-500 absolute -bottom-1 ${
      isActive ? 'font-black opacity-100 translate-y-0' : 'font-bold opacity-0 translate-y-2'
    }`}>
      {label}
    </span>
    
    {/* 3D Active Indicator Pill */}
    {isActive && (
      <div className="absolute -bottom-2 w-5 h-1 rounded-full bg-primary shadow-[0_0_12px_#0d9488] animate-in fade-in zoom-in duration-500"></div>
    )}
  </button>
);

export const FloatingBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItemsCount = useCartStore((state) => state.items.length);

  const navItems = [
    { icon: 'home', label: 'Home', path: '/' },
    { icon: 'calendar_month', label: 'Bookings', path: '/bookings' },
    { icon: 'chat_bubble', label: 'Chat', path: '/chat', badge: 2 },
    { icon: 'person', label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] z-50">
      {/* Container with Glassmorphism and 3D Depth */}
      <nav className="relative flex items-center justify-between px-6 h-20 
        backdrop-blur-2xl bg-white/75 dark:bg-slate-900/80 
        border border-white/40 dark:border-slate-800/60 
        rounded-[2.5rem] 
        shadow-[0_20px_50px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] 
        dark:shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_0px_rgba(255,255,255,0.05)]">
        
        {/* Left Nav Items */}
        <div className="flex flex-1 justify-around items-center">
          {navItems.slice(0, 2).map((item) => (
            <NavItem 
              key={item.path} 
              {...item}
              isActive={location.pathname === item.path} 
              onClick={() => navigate(item.path)} 
            />
          ))}
        </div>

        {/* Central 3D Floating Action Button (Cart) */}
        <div className="relative -top-8 mx-2 group">
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full scale-150 group-hover:scale-[1.8] transition-transform duration-700"></div>
          
          <button 
            id="cart-icon-target"
            onClick={() => navigate('/cart')}
            className="relative flex items-center justify-center size-16 rounded-full 
              bg-gradient-to-br from-primary to-primary-dark text-white 
              shadow-[0_15px_30px_-5px_rgba(13,148,136,0.6),inset_0_-4px_8px_rgba(0,0,0,0.2),inset_0_4px_8px_rgba(255,255,255,0.3)] 
              hover:scale-110 active:scale-90 transition-all duration-500 overflow-hidden"
          >
            {/* Gloss Highlight Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none"></div>
            
            <span className="material-symbols-outlined text-3xl z-10 drop-shadow-md">shopping_cart</span>
            
            {cartItemsCount > 0 && (
              <span className="absolute top-3 right-3 flex items-center justify-center size-5 
                bg-red-500 rounded-full text-[10px] text-white font-black 
                border-2 border-white dark:border-primary shadow-lg animate-bounce">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>

        {/* Right Nav Items */}
        <div className="flex flex-1 justify-around items-center">
          {navItems.slice(2).map((item) => (
            <NavItem 
              key={item.path} 
              {...item}
              isActive={location.pathname === item.path} 
              onClick={() => navigate(item.path)} 
            />
          ))}
        </div>
      </nav>
    </div>
  );
};
