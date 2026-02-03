import { Category } from '@/types';

// Map category names to translation keys
const categoryKeyMap: Record<string, string> = {
  'Appetizers': 'appetizers',
  'Main Course': 'mainCourse',
  'Desserts': 'desserts',
  'Beverages': 'beverages',
  'Cocktails': 'cocktails',
  'Pizza': 'pizza',
};

export const getTranslatedCategoryName = (
  categoryName: string,
  t: (key: string) => string
): string => {
  const key = categoryKeyMap[categoryName];
  if (key) {
    return t(`categories.${key}`);
  }
  return categoryName;
};

export const getTranslatedCategories = (
  categories: Category[],
  t: (key: string) => string
): Category[] => {
  return categories.map(cat => ({
    ...cat,
    name: getTranslatedCategoryName(cat.name, t),
  }));
};
