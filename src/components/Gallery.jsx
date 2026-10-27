import { useState, useReducer, useEffect, useCallback, useMemo } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import {
  favouritesReducer,
  loadFavourites,
  STORAGE_KEY,
} from "../reducers/favouritesReducer";
import PhotoCard from "./PhotoCard";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [search, setSearch] = useState("");
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites);

  // favourites change hote hi localStorage me save
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
  }, [favourites]);

  // useCallback: function ka reference stable rehta hai, har render pe naya nahi banta
  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleToggle = useCallback((id) => {
    dispatch({ type: "TOGGLE_FAVOURITE", id });
  }, []);

  // useMemo: filter tabhi dobara chalega jab photos ya search change ho
  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase();
    return photos.filter((p) => p.author.toLowerCase().includes(query));
  }, [photos, search]);

  return (
    <>
      {/* Sticky header with title + search */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-rose-500 bg-clip-text text-transparent">
            Photo Gallery
          </h1>

          <div className="relative w-full sm:w-80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search by author name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-300 bg-white shadow-sm transition-all hover:border-indigo-300 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading && (
          <div className="flex justify-center py-24">
            <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="max-w-md mx-auto text-center bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-6">
            Failed to load photos: {error}
          </div>
        )}

        {!loading && !error && filteredPhotos.length === 0 && (
          <p className="text-center text-slate-500 py-16">No photos found.</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.includes(photo.id)}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
