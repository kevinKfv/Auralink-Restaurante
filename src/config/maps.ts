// Configuración de Google Maps
export const GOOGLE_MAPS_CONFIG = {
  // API Key (en producción, usar variable de entorno)
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  
  // Ubicación del restaurante (Buenos Aires, Argentina - ejemplo)
  restaurantLocation: {
    lat: parseFloat(import.meta.env.VITE_RESTAURANT_LAT) || -34.6037,
    lng: parseFloat(import.meta.env.VITE_RESTAURANT_LNG) || -58.3816,
  },
  
  // Información del restaurante
  restaurantInfo: {
    name: import.meta.env.VITE_RESTAURANT_NAME || 'Aura Link Restaurant',
    address: import.meta.env.VITE_RESTAURANT_ADDRESS || 'Av. Corrientes 1234, Buenos Aires, Argentina',
  },
  
  // Configuración del mapa
  defaultZoom: 13,
  defaultCenter: {
    lat: parseFloat(import.meta.env.VITE_RESTAURANT_LAT) || -34.6037,
    lng: parseFloat(import.meta.env.VITE_RESTAURANT_LNG) || -58.3816,
  },
  
  // Estilos del mapa (tema oscuro/claro)
  mapStyles: {
    light: [],
    dark: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  },
  
  // Zonas de delivery (círculos de radio en km)
  deliveryZones: [
    { radius: 3, color: '#22c55e', opacity: 0.2, label: 'Zona 1 - Gratis' },
    { radius: 5, color: '#3b82f6', opacity: 0.15, label: 'Zona 2 - $500' },
    { radius: 8, color: '#f59e0b', opacity: 0.1, label: 'Zona 3 - $1000' },
  ],
};

// Función para verificar si la API key está configurada
export const isGoogleMapsConfigured = (): boolean => {
  return !!GOOGLE_MAPS_CONFIG.apiKey && GOOGLE_MAPS_CONFIG.apiKey !== '';
};

// Función para obtener la URL del script de Google Maps
export const getGoogleMapsScriptUrl = (): string => {
  return `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=places,geometry`;
};
