const Loading = () => {
  return (
    <div className="p-8 flex-1 flex flex-col justify-center items-center">
      <div
        className="w-10 h-10 rounded-full border-4 border-sep-light border-t-brand-blue animate-spin"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default Loading;
