# 🗺️ Configuración de Google Maps - Aura Link Restaurant

Esta guía te ayudará a configurar Google Maps en el sistema de delivery.

---

## 📋 Requisitos Previos

1. Cuenta de Google Cloud Platform
2. Tarjeta de crédito (para activar la API, incluye créditos gratuitos)
3. Proyecto creado en Google Cloud Console

---

## 🔑 Paso 1: Obtener API Key de Google Maps

### 1.1 Crear Proyecto en Google Cloud

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Nombre sugerido: "Aura Link Restaurant"

### 1.2 Habilitar APIs Necesarias

En el proyecto, habilita las siguientes APIs:

1. **Maps JavaScript API**
   - Permite mostrar mapas interactivos
   - [Habilitar aquí](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com)

2. **Places API** (opcional)
   - Para autocompletar direcciones
   - [Habilitar aquí](https://console.cloud.google.com/apis/library/places-backend.googleapis.com)

3. **Geocoding API** (opcional)
   - Para convertir direcciones en coordenadas
   - [Habilitar aquí](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com)

### 1.3 Crear API Key

1. Ve a **APIs & Services** → **Credentials**
2. Click en **Create Credentials** → **API Key**
3. Copia la API Key generada
4. **IMPORTANTE:** Restringe la API Key por seguridad

### 1.4 Restringir API Key (Seguridad)

**Para desarrollo local:**
```
HTTP referrers (web sites)
- http://localhost:*
- http://127.0.0.1:*
```

**Para producción:**
```
HTTP referrers (web sites)
- https://tudominio.com/*
- https://www.tudominio.com/*
```

**Restringir APIs:**
- Maps JavaScript API
- Places API
- Geocoding API

---

## ⚙️ Paso 2: Configurar Variables de Entorno

### 2.1 Crear archivo .env

En la raíz del proyecto, crea un archivo `.env`:

```bash
# Copia el archivo .env.example
cp .env.example .env
```

### 2.2 Configurar API Key

Edita el archivo `.env` y agrega tu API Key:

```env
# Google Maps API Key
VITE_GOOGLE_MAPS_API_KEY=TU_API_KEY_AQUI

# Configuración del Restaurante
VITE_RESTAURANT_LAT=-34.6037
VITE_RESTAURANT_LNG=-58.3816
VITE_RESTAURANT_NAME=Aura Link Restaurant
VITE_RESTAURANT_ADDRESS=Av. Corrientes 1234, Buenos Aires, Argentina
```

### 2.3 Personalizar Ubicación

**Encontrar coordenadas de tu restaurante:**

1. Ve a [Google Maps](https://www.google.com/maps)
2. Busca tu dirección
3. Click derecho en el marcador → "¿Qué hay aquí?"
4. Copia las coordenadas (Latitud, Longitud)

**Ejemplo:**
```
Buenos Aires: -34.6037, -58.3816
Madrid: 40.4168, -3.7038
Ciudad de México: 19.4326, -99.1332
```

---

## 🚀 Paso 3: Iniciar la Aplicación

### 3.1 Instalar Dependencias

```bash
npm install
```

### 3.2 Iniciar Servidor de Desarrollo

```bash
npm run dev
```

### 3.3 Verificar Integración

1. Abre el navegador en `http://localhost:5175`
2. Navega a **Delivery**
3. Desplázate hasta la sección del mapa
4. Deberías ver:
   - ✅ Mapa interactivo de Google Maps
   - ✅ Marcador del restaurante (verde)
   - ✅ Zonas de delivery (círculos de colores)
   - ✅ Marcadores de pedidos activos

---

## 🎨 Paso 4: Personalización

### 4.1 Modificar Zonas de Delivery

Edita `src/config/maps.ts`:

```typescript
deliveryZones: [
  { radius: 3, color: '#22c55e', opacity: 0.2, label: 'Zona 1 - Gratis' },
  { radius: 5, color: '#3b82f6', opacity: 0.15, label: 'Zona 2 - $500' },
  { radius: 8, color: '#f59e0b', opacity: 0.1, label: 'Zona 3 - $1000' },
],
```

**Parámetros:**
- `radius`: Radio en kilómetros
- `color`: Color en formato hexadecimal
- `opacity`: Transparencia (0-1)
- `label`: Etiqueta descriptiva

### 4.2 Ajustar Zoom Inicial

```typescript
defaultZoom: 13, // Valores: 1-20 (más alto = más cerca)
```

### 4.3 Cambiar Estilo del Mapa

El mapa se adapta automáticamente al tema (claro/oscuro).

Para personalizar estilos, edita `mapStyles` en `src/config/maps.ts`.

---

## 📱 Características Implementadas

### ✅ Funcionalidades del Mapa

- **Interactividad completa:**
  - ✅ Zoom con scroll o botones
  - ✅ Arrastrar para mover el mapa
  - ✅ Click en marcadores para ver información
  - ✅ Botón de pantalla completa

- **Marcadores:**
  - ✅ Restaurante (verde, grande)
  - ✅ Pedidos de delivery (azul/verde según estado)
  - ✅ Info windows con detalles

- **Zonas de Delivery:**
  - ✅ Círculos de radio configurable
  - ✅ Colores personalizables
  - ✅ Leyenda informativa

- **Responsive:**
  - ✅ Adaptado a mobile, tablet y desktop
  - ✅ Altura ajustable
  - ✅ Controles táctiles en móvil

- **Temas:**
  - ✅ Modo claro
  - ✅ Modo oscuro (automático)

---

## 🔧 Solución de Problemas

### Problema: "Google Maps API key no configurada"

**Solución:**
1. Verifica que el archivo `.env` existe
2. Verifica que `VITE_GOOGLE_MAPS_API_KEY` está configurada
3. Reinicia el servidor de desarrollo

### Problema: "Error al cargar Google Maps"

**Solución:**
1. Verifica que la API Key es válida
2. Verifica que Maps JavaScript API está habilitada
3. Verifica las restricciones de la API Key
4. Revisa la consola del navegador para más detalles

### Problema: "El mapa no se muestra"

**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores relacionados con Google Maps
3. Verifica que no hay errores de CORS
4. Verifica que la API Key tiene permisos correctos

### Problema: "Mapa en blanco o gris"

**Solución:**
1. Verifica que las coordenadas son válidas
2. Verifica que el zoom no es muy alto o muy bajo
3. Verifica la conexión a internet
4. Limpia caché del navegador

---

## 💰 Costos y Límites

### Créditos Gratuitos

Google Maps ofrece:
- **$200 USD/mes** en créditos gratuitos
- Suficiente para ~28,000 cargas de mapa/mes
- Ideal para desarrollo y pequeñas empresas

### Monitoreo de Uso

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Navega a **APIs & Services** → **Dashboard**
3. Revisa el uso de cada API
4. Configura alertas de facturación

### Optimización

Para reducir costos:
- ✅ Implementado: Carga única del script
- ✅ Implementado: Reutilización de instancia del mapa
- ✅ Implementado: Limpieza de recursos
- ✅ Implementado: Lazy loading del componente

---

## 📚 Recursos Adicionales

### Documentación Oficial

- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [Guía de Inicio Rápido](https://developers.google.com/maps/documentation/javascript/tutorial)
- [Ejemplos de Código](https://developers.google.com/maps/documentation/javascript/examples)

### Herramientas Útiles

- [Maps Platform Styling Wizard](https://mapstyle.withgoogle.com/) - Personalizar estilos
- [Geocoding Tool](https://www.latlong.net/) - Obtener coordenadas
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)

---

## ✅ Checklist de Configuración

- [ ] Proyecto creado en Google Cloud Platform
- [ ] Maps JavaScript API habilitada
- [ ] API Key generada
- [ ] API Key restringida (seguridad)
- [ ] Archivo `.env` creado
- [ ] API Key configurada en `.env`
- [ ] Coordenadas del restaurante configuradas
- [ ] Servidor de desarrollo iniciado
- [ ] Mapa visible en página de Delivery
- [ ] Marcadores funcionando correctamente
- [ ] Zonas de delivery visibles
- [ ] Interactividad verificada (zoom, arrastrar)
- [ ] Responsive verificado en móvil

---

## 🎉 ¡Listo!

Una vez completados todos los pasos, tu sistema de delivery tendrá un mapa completamente funcional e interactivo.

**Características finales:**
- ✅ Mapa interactivo de Google Maps
- ✅ Ubicación del restaurante visible
- ✅ Zonas de delivery configurables
- ✅ Pedidos en tiempo real en el mapa
- ✅ Responsive y adaptado a móviles
- ✅ Tema claro/oscuro automático
- ✅ Seguro y optimizado

---

**Soporte:** Si tienes problemas, revisa la consola del navegador y los logs del servidor.
