const JoinUs = () => {
  return (
    <div className="flex gap-[16px] items-center">
      <a
        href={`#`}
        target="_blank"
        className="w-12"
      >
        <img src="/header/x.svg" alt="X" className="w-12 h-12" />
      </a>
      <a
        href={`#`}
        target="_blank"
        className="w-12"
      >
        <img src="/header/github.svg" alt="discord" className="w-12 h-12" />
      </a>
    </div>
  );
};

export default JoinUs;
