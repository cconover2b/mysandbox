// components/ui/loader.tsx

// 'use client' directive is used in Next.js to specify that this file should be treated as a client-side component.
// This is important for components that rely on client-side libraries or hooks like useState, useEffect, etc.
'use client'

// Importing the BeatLoader component from the react-spinners library.
// BeatLoader is a simple loading spinner that can be customized with different sizes and colors.
import { BeatLoader } from "react-spinners";

// Defining and exporting the Loader functional component.
// This component will render a BeatLoader spinner with a specified size.
export const Loader = () => {
  return (
    // Rendering the BeatLoader component with a size of 20.
    // The size prop controls the size of the spinner.
    <BeatLoader size={20} />
  )
};
