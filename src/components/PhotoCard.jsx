import { memo } from "react";

function PhotoCard({ photo, isFavourite, onToggle }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image: hover pe halka zoom */}
      <div className="overflow-hidden">
        <img
          src={`https://picsum.photos/id/${photo.id}/400/300`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <p className="text-sm font-semibold text-slate-700 truncate transition-colors group-hover:text-indigo-600">
          {photo.author}
        </p>
        <button
          onClick={() => onToggle(photo.id)}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
          className="p-2 rounded-full cursor-pointer transition-all duration-200 hover:bg-rose-50 hover:scale-110 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className={`w-6 h-6 transition-colors duration-200 ${
              isFavourite
                ? "fill-rose-500 text-rose-500"
                : "fill-none text-slate-400 group-hover:text-rose-400"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default memo(PhotoCard);
