import { useState, useContext, createContext } from 'react';

const CatalogContext = createContext(null);
const CatalogUpdateContext = createContext(null);

// Custom hook for Catalog settings state 
export const useCatalog = () => useContext(CatalogContext);
// Custom hook for updating Catalog settings state
export const useCatalogUpdate = () => useContext(CatalogUpdateContext);

export function CatalogProvider({ children }) {
    const [imageSize, setImageSize] = useState('small');
    const [sortBy, setSortBy] = useState('bump');
    const [showOpComment, setShowOpComment] = useState(true);

    return (
        <CatalogContext.Provider value={{ sortBy, imageSize, showOpComment }}>
            <CatalogUpdateContext.Provider value={{ setSortBy, setImageSize, setShowOpComment }}>
                {children}
            </CatalogUpdateContext.Provider>
        </CatalogContext.Provider>
    )
}