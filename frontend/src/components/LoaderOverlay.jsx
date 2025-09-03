import Loading from "./Loading";

const LoaderOverlay = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <Loading type="spinner" size={60} color="#fff" />
    </div>
  );
};

export default LoaderOverlay;
