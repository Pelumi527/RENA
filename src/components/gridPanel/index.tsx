import React from 'react';
import ActivedItem from "./activedItem";
import InactivedItem from "./inactivedItem";

const GridPanel = () => {
  const items = Array.from({ length: 300 }, () => Math.random() < 0.7); // Randomly decides if an item is active or inactive

  return (
    <div className="w-[150vw] -ml-14 -mt-20">
      <div className="bg-[#121212] flex min-w-[150vw] flex-wrap">
        {items.map((isActive, index) =>
          isActive ? <ActivedItem key={index} /> : <InactivedItem key={index} />
        )}
      </div>
    </div>
  );
};

export default GridPanel;