'use client';

interface MenuBoxProps {
  onClick: () => void;
  label: string;
}

const MenuBox: React.FC<MenuBoxProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer 
        px-4 
        py-3 
        hover:bg-emerald-200
        transition
        font-semibold
        
      "
    >
      {label}
    </div>
  );
};

export default MenuBox;
