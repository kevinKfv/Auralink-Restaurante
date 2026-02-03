import productImagesData from '@/data/productImages.json';

interface ProductImage {
  id: string;
  name: string;
  image: string;
  thumbnail: string;
}

const productImages: Record<string, ProductImage> = productImagesData.products;

export const getProductImage = (productId: string): string => {
  return productImages[productId]?.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
};

export const getProductThumbnail = (productId: string): string => {
  return productImages[productId]?.thumbnail || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=150&fit=crop';
};
