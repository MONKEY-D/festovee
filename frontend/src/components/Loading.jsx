const Loading = ({ type = "spinner", color = "#ff4d2d", size = 40 }) => {
  if (type === "spinner") {
    return (
      <svg
        className="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        style={{ color }}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
    );
  }

  if (type === "dots") {
    return (
      <div className="flex space-x-1">
        <span
          className="w-2 h-2 rounded-full animate-bounce"
          style={{ backgroundColor: color }}
        ></span>
        <span
          className="w-2 h-2 rounded-full animate-bounce delay-200"
          style={{ backgroundColor: color }}
        ></span>
        <span
          className="w-2 h-2 rounded-full animate-bounce delay-400"
          style={{ backgroundColor: color }}
        ></span>
      </div>
    );
  }

  return null;
};

export default Loading;
