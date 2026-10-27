# Photo Gallery

React + Vite + Tailwind CSS photo gallery using the Picsum Photos API.

## Run
```
npm install
npm run dev
```

## Features
- Fetch 30 photos with loading spinner and error state (`useFetchPhotos` custom hook)
- Responsive grid: 4 cols desktop, 2 tablet, 1 mobile
- Real-time search by author (`useCallback` + `useMemo`)
- Favourites managed with `useReducer`, persisted in localStorage
