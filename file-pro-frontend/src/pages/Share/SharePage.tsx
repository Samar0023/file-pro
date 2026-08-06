import { useParams } from "react-router-dom";

const SharePage = () => {
  const { token } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="bg-zinc-900 p-8 rounded-xl">
        <h1 className="text-3xl font-bold mb-4">Shared File</h1>
        <p>Token: {token}</p>
      </div>
    </div>
  );
};

export default SharePage;