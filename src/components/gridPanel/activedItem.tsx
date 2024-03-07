const ActivedItem = () => {

  return (
    <>
      <div className="relative w-[120px] h-[120px] hover:cursor-pointer">
        <img
          src="/home/bgIcon/active.svg"
          className="w-full h-full absolute inset-0 transition-opacity duration-100 ease-in-out hover:opacity-0"
        />
        <img
          src="/home/bgIcon/hover.svg"
          className="w-[124px] h-[124px] absolute inset-0 transition-opacity duration-100 ease-in-out opacity-0 hover:opacity-100"
        />
      </div>
    </>
  );
};

export default ActivedItem;
