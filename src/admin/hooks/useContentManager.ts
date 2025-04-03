
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ContentItem {
  id: string;
  [key: string]: any;
}

interface UseContentManagerProps<T extends ContentItem> {
  storageKey: string;
  initialData?: T[];
}

export function useContentManager<T extends ContentItem>({
  storageKey,
  initialData = [],
}: UseContentManagerProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(storageKey);
      if (savedItems) {
        setItems(JSON.parse(savedItems));
      } else if (initialData.length > 0) {
        setItems(initialData);
        localStorage.setItem(storageKey, JSON.stringify(initialData));
      }
    } catch (err) {
      console.error('Error loading data from localStorage:', err);
      setError('Failed to load data from storage');
    } finally {
      setIsLoading(false);
    }
  }, [storageKey, initialData]);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(items));
      } catch (err) {
        console.error('Error saving data to localStorage:', err);
        setError('Failed to save data to storage');
      }
    }
  }, [items, isLoading, storageKey]);

  // Add a new item
  const addItem = useCallback((item: Omit<T, 'id'>) => {
    const newItem = {
      ...item,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as T;
    
    setItems(prevItems => [...prevItems, newItem]);
    return newItem;
  }, []);

  // Update an existing item
  const updateItem = useCallback((id: string, updates: Partial<T>) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { 
              ...item, 
              ...updates, 
              updatedAt: new Date().toISOString() 
            } 
          : item
      )
    );
  }, []);

  // Delete an item
  const deleteItem = useCallback((id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  }, []);

  // Get a single item by ID
  const getItem = useCallback(
    (id: string) => items.find(item => item.id === id) || null,
    [items]
  );

  // Bulk operations
  const bulkAddItems = useCallback((newItems: Omit<T, 'id'>[]) => {
    const itemsWithIds = newItems.map(item => ({
      ...item,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })) as T[];
    
    setItems(prevItems => [...prevItems, ...itemsWithIds]);
    return itemsWithIds;
  }, []);

  const bulkDeleteItems = useCallback((ids: string[]) => {
    setItems(prevItems => prevItems.filter(item => !ids.includes(item.id)));
  }, []);

  return {
    items,
    isLoading,
    error,
    addItem,
    updateItem,
    deleteItem,
    getItem,
    bulkAddItems,
    bulkDeleteItems,
    setItems, // Expose this for complete control if needed
  };
}
