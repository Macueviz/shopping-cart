import { createContext, useState } from "react";

// 1. Crear el contexto
export const FiltersContext = createContext();

// 2. Crear el provider para proveer el contexto
// eslint-disable-next-line react/prop-types
export function FiltersProvider ({children}) {

    const [filters, setFilters] = useState({
        category: 'All',
        minPrice: 0
      })
    return (
        <FiltersContext.Provider 
            value={{
                filters,
                setFilters
            }}>
        {children}
        </FiltersContext.Provider>
    )
}