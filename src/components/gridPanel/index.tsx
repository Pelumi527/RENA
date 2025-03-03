import React, { useState, useEffect } from "react";
import ActivedItem from "./activedItem";
import InactivedItem from "./inactivedItem";

const GridPanel = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [items, setItems] = useState<Array<boolean>>([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const length = windowWidth < 760 ? 80 : 300;
    setItems(Array.from({ length }, () => Math.random() < 0.7));
  }, [windowWidth]);

  return (
    <div style={{ width: "100vw", overflowX: "hidden", marginTop: "-100px" }}>
      <div
        style={{
          backgroundColor: "#121212",
          display: "flex",
          minWidth: "110vw",
          flexWrap: "wrap",
          overflow: "hidden",
        }}
      >
        {Array(26)
          .fill(<ActivedItem />)
          .concat(Array(10).fill(<InactivedItem />))}
        {items.map((isActive, index) =>
          isActive ? (
            <ActivedItem key={index} />
          ) : (
            <InactivedItem key={index} />
          ),
        )}
      </div>
    </div>
  );
};

export default GridPanel;
