const JoinUs = () => {
  return (
    <div className="flex gap-[16px] items-center">
      <a
        href={`#`}
        target="_blank"
        className="w-12"
      >
        <div className="flex justify-center items-center rounded-full w-12 h-12 bg-[#000] hover:bg-[#222]">
          <img src="/header/x.svg" alt="X" className="" />
        </div>
      </a>
      <a
        href={`https://twitter.com/0xrenegades`}
        target="_blank"
        className="w-12"
      >
        <div className="flex justify-center items-center rounded-full w-12 h-12 bg-[#000] hover:bg-[#222]">
          <img src="/header/github.svg" alt="discord" className="" />
        </div>
      </a>
    </div>
  );
};

export default JoinUs;
