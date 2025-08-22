# Live Search with Infinite Scroll - React Project

This project implements a live search feature with infinite scrolling functionality using React, TypeScript, and Tailwind CSS.

## Features

- **Real-time Search Filtering**: Instant filtering as users type
- **Infinite Scroll**: Dynamically loads more items as user scrolls
- **Responsive Design**: Built with Tailwind CSS for all screen sizes
- **Component-Based Architecture**: Modular, reusable components
- **Type Safety**: Strong typing with TypeScript interfaces

## Project Structure

### Components

1. **InfiniteScrollList Component** (`src/components/InfiniteScrollList.tsx`)
   - Implements infinite scroll functionality
   - Dynamically loads more items (10 at a time) when user scrolls to bottom
   - Shows "Loading more..." indicator when additional items are loading
   - Efficiently renders only visible items using `data.slice(0, visibleCount)`

2. **PersonCard Component** (`src/components/PersonCard.tsx` - not shown but used)
   - Displays individual person details
   - Receives `Person` props for rendering

3. **Main Page** (`src/app/page.tsx`)
   - Fetches data from `/data.json` on initial load
   - Implements live search filtering
   - Manages state for search query and results
   - Renders search input and infinite scroll list

### Type Definitions

`Person` type definition (`src/types/person.ts`):
```typescript
export type Person = {
  name: string;
  language: string;
  id: string;
  bio: string;
  version: number;
};
```

## Key Implementation Details

### Infinite Scroll Mechanism
```typescript
useEffect(() => {
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 100
    ) {
      setVisibleCount((prev) => Math.min(prev + 10, data.length));
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [data.length]);
```

### Live Search Filtering
```typescript
useEffect(() => {
  if (!query) {
    setResults(data);
    return;
  }
  const lower = query.toLowerCase();
  const filtered = data.filter(
    (item) =>
      item.name.toLowerCase().includes(lower) ||
      item.language.toLowerCase().includes(lower) ||
      item.id.toLowerCase().includes(lower) ||
      item.bio.toLowerCase().includes(lower)
  );
  setResults(filtered);
}, [query, data]);
```

### Data Fetching
```typescript
useEffect(() => {
  fetch("/data.json")
    .then((res) => res.json())
    .then((json: Person[]) => {
      setData(json);
      setResults(json);
    });
}, []);
```

## Technologies Used

- **React**: Component-based UI library
- **TypeScript**: Static typing for JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: `useState`, `useEffect` for state and side effects
- **Modern JavaScript**: ES6+ features (arrow functions, promises, etc.)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser at:
```
http://localhost:3000
```

## Usage

1. Type in the search box to filter results in real-time
2. Scroll down to automatically load more items
3. Clear the search box to see all items again

## Project Structure
```
src/
├── app/
│   └── page.tsx            # Main page component
├── components/
│   ├── InfiniteScrollList.tsx # Infinite scroll component
│   └── PersonCard.tsx      # Person card component
├── types/
│   └── person.ts           # Type definitions
public/
└── data.json               # Sample data
```
