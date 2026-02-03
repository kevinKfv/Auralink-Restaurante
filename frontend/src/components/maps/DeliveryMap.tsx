import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Loader } from 'lucide-react';
import { GOOGLE_MAPS_CONFIG, isGoogleMapsConfigured } from '@/config/maps';
import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from '@/i18n/useTranslation';

interface DeliveryMapProps {
  height?: string;
  showDeliveryZones?: boolean;
  showOrders?: boolean;
  className?: string;
}

const DeliveryMap = ({ 
  height = '500px', 
  showDeliveryZones = true,
  showOrders = true,
  className = '' 
}: DeliveryMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const circlesRef = useRef<google.maps.Circle[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  
  const { orders } = useAppStore();
  const { theme } = useAppStore();
  const { t } = useTranslation();

  // Cargar script de Google Maps
  useEffect(() => {
    if (!isGoogleMapsConfigured()) {
      setError('Google Maps API key no configurada');
      setIsLoading(false);
      return;
    }

    // Verificar si el script ya está cargado
    if (window.google && window.google.maps) {
      setIsScriptLoaded(true);
      setIsLoading(false);
      return;
    }

    // Cargar script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.apiKey}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsScriptLoaded(true);
      setIsLoading(false);
    };
    
    script.onerror = () => {
      setError('Error al cargar Google Maps');
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup si es necesario
    };
  }, []);

  // Inicializar mapa
  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current || mapInstanceRef.current) return;

    try {
      const mapStyles = theme === 'dark' 
        ? GOOGLE_MAPS_CONFIG.mapStyles.dark 
        : GOOGLE_MAPS_CONFIG.mapStyles.light;

      const map = new google.maps.Map(mapRef.current, {
        center: GOOGLE_MAPS_CONFIG.defaultCenter,
        zoom: GOOGLE_MAPS_CONFIG.defaultZoom,
        styles: mapStyles,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
      });

      mapInstanceRef.current = map;

      // Agregar marcador del restaurante
      const restaurantMarker = new google.maps.Marker({
        position: GOOGLE_MAPS_CONFIG.restaurantLocation,
        map: map,
        title: GOOGLE_MAPS_CONFIG.restaurantInfo.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: '#22c55e',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3,
        },
        animation: google.maps.Animation.DROP,
      });

      // Info window del restaurante
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; font-family: system-ui;">
            <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600; color: #1f2937;">
              ${GOOGLE_MAPS_CONFIG.restaurantInfo.name}
            </h3>
            <p style="margin: 0; font-size: 14px; color: #6b7280;">
              ${GOOGLE_MAPS_CONFIG.restaurantInfo.address}
            </p>
          </div>
        `,
      });

      restaurantMarker.addListener('click', () => {
        infoWindow.open(map, restaurantMarker);
      });

      markersRef.current.push(restaurantMarker);

      // Agregar zonas de delivery
      if (showDeliveryZones) {
        GOOGLE_MAPS_CONFIG.deliveryZones.forEach((zone) => {
          const circle = new google.maps.Circle({
            strokeColor: zone.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: zone.color,
            fillOpacity: zone.opacity,
            map: map,
            center: GOOGLE_MAPS_CONFIG.restaurantLocation,
            radius: zone.radius * 1000, // Convertir km a metros
          });

          circlesRef.current.push(circle);
        });
      }

      // Agregar marcadores de pedidos de delivery
      if (showOrders) {
        const deliveryOrders = orders.filter(o => o.isDelivery && o.deliveryAddress);
        
        deliveryOrders.forEach((order, index) => {
          // Generar posición aleatoria cerca del restaurante (simulación)
          const lat = GOOGLE_MAPS_CONFIG.restaurantLocation.lat + (Math.random() - 0.5) * 0.1;
          const lng = GOOGLE_MAPS_CONFIG.restaurantLocation.lng + (Math.random() - 0.5) * 0.1;

          const orderMarker = new google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: `Pedido #${order.id.slice(0, 8)}`,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: order.status === 'delivered' ? '#22c55e' : '#3b82f6',
              fillOpacity: 0.9,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
            label: {
              text: (index + 1).toString(),
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 'bold',
            },
          });

          const orderInfoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 8px; font-family: system-ui;">
                <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #1f2937;">
                  Pedido #${order.id.slice(0, 8)}
                </h4>
                <p style="margin: 0; font-size: 12px; color: #6b7280;">
                  ${order.deliveryAddress || 'Dirección no disponible'}
                </p>
                <p style="margin: 4px 0 0 0; font-size: 12px; font-weight: 500; color: ${
                  order.status === 'delivered' ? '#22c55e' : '#3b82f6'
                };">
                  Estado: ${order.status}
                </p>
              </div>
            `,
          });

          orderMarker.addListener('click', () => {
            orderInfoWindow.open(map, orderMarker);
          });

          markersRef.current.push(orderMarker);
        });
      }

    } catch (err) {
      console.error('Error inicializando mapa:', err);
      setError('Error al inicializar el mapa');
    }
  }, [isScriptLoaded, theme, showDeliveryZones, showOrders, orders, t]);

  // Actualizar estilos del mapa cuando cambia el tema
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const mapStyles = theme === 'dark' 
      ? GOOGLE_MAPS_CONFIG.mapStyles.dark 
      : GOOGLE_MAPS_CONFIG.mapStyles.light;

    mapInstanceRef.current.setOptions({ styles: mapStyles });
  }, [theme]);

  // Cleanup
  useEffect(() => {
    return () => {
      // Limpiar marcadores
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      
      // Limpiar círculos
      circlesRef.current.forEach(circle => circle.setMap(null));
      circlesRef.current = [];
    };
  }, []);

  if (error) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}
        style={{ height }}
      >
        <MapPin size={48} className="text-gray-400 mb-4" />
        <p className="text-gray-600 dark:text-gray-400 text-center px-4">
          {error}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 text-center px-4">
          {t('delivery.mapNote')}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}
        style={{ height }}
      >
        <Loader size={48} className="text-primary-600 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-400">
          Cargando mapa...
        </p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mapRef} 
        className="w-full rounded-lg shadow-lg"
        style={{ height }}
      />
      
      {/* Leyenda de zonas */}
      {showDeliveryZones && (
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 max-w-xs">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Navigation size={16} />
            Zonas de Delivery
          </h4>
          <div className="space-y-1">
            {GOOGLE_MAPS_CONFIG.deliveryZones.map((zone, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: zone.color }}
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {zone.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryMap;
