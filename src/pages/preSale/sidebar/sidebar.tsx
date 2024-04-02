import './index.css';

const Sidebar = () => {
   const items = [
      "/presale/sidebarItem1.svg",
      "/presale/sidebarItem2.svg",
      "/presale/sidebarItem3.svg",
      "/presale/sidebarItem4.svg",
      "/presale/sidebarItem5.svg",
      "/presale/sidebarItem6.svg",
      "/presale/sidebarItem7.svg",
      "/presale/sidebarItem8.svg",
   ];

   const allItems = Array.from({ length: 40 }, () => items).flat();

   return (
      <div className="scrolling-wrapper w-[100vw] mt-16">
         <div className="scrolling-content gap-[17px]">
            {allItems.map((item, index) => (
               <div key={index} className="sidebar-item w-[327px] h-[143px]">
                  <img src={item} className='w-[327px] h-[143px]' alt={`Sidebar item ${index + 1}`} />
               </div>
            ))}
         </div>
      </div>
   );
};

export default Sidebar;