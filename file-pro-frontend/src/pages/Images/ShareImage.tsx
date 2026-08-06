import { useState } from "react";
import axios from "axios";

interface ShareProps {
  fileId: string;
}

const ShareImage = ({ fileId }: ShareProps) => {
  const [shareUrl, setShareUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateLink = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/share/${fileId}`,
        {},
        {
          withCredentials: true,
        }
      );

      setShareUrl(res.data.url);
    } catch (err) {
      console.error(err);
      alert("Failed to generate share link");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async () => {
    if (!shareUrl) return;

    await navigator.clipboard.writeText(shareUrl);
    alert("Link copied!");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 rounded-xl border border-gray-700 p-6 bg-zinc-900">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Share File
      </h2>

      <button
        onClick={generateLink}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
      >
        {loading ? "Generating..." : "Generate Share Link"}
      </button>

      {shareUrl && (
        <div className="mt-6">
          <input
            value={shareUrl}
            readOnly
            className="w-full bg-zinc-800 border border-gray-600 rounded px-3 py-2 text-white"
          />

          <button
            onClick={copyLink}
            className="mt-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareImage;