# OpenStreetMap (OSM) Implementation Guide

## 📍 Overview

Kride menggunakan **OpenStreetMap (OSM)** sebagai penyedia peta gratis dan open-source. Implementasi ini menggunakan:

- **Leaflet** - Library pemetaan interaktif yang ringan dan fleksibel
- **React Leaflet** - Binding React untuk Leaflet
- **Nominatim** - Geocoding dan reverse geocoding API gratis dari OSM

**Keuntungan:**
✅ Gratis (no API key diperlukan)  
✅ Privacy-friendly (tanpa tracking Google)  
✅ Open source dan di-host mandiri  
✅ No vendor lock-in  
✅ Akurat untuk Indonesia  

---

## 🏗️ Arsitektur

### Direktori Struktur

```
src/
├── lib/
│   ├── osm.ts              # OSM utilities dan helper functions
│   └── supabase.ts         # Backend configuration
├── components/
│   ├── MapComponent.tsx    # Interactive map dengan Leaflet
│   └── LocationSearch.tsx  # Location search dengan Nominatim
└── pages/
    ├── GoRide.tsx          # Ride destination selection
    ├── GoFood.tsx          # Food delivery address
    └── driver/
        └── DriverHome.tsx  # Driver order map view
```

### Core Dependencies

```json
{
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "@types/leaflet": "^1.9.21"
}
```

---

## 🗺️ Component Usage

### MapComponent

Enhanced interactive map dengan fitur-fitur lengkap.

#### Basic Usage

```tsx
import MapComponent from '@/components/MapComponent';

export function MyPage() {
  return (
    <MapComponent
      height="400px"
      center={[-6.2088, 106.8456]}  // Jakarta
      zoom={13}
    />
  );
}
```

#### Advanced Usage

```tsx
import MapComponent, { MapMarker } from '@/components/MapComponent';
import { createMarkerIcon } from '@/lib/osm';

export function DriverMap() {
  const markers: MapMarker[] = [
    {
      id: 'driver-1',
      lat: -6.2088,
      lng: 106.8456,
      label: 'D1',
      color: '#3b82f6',
      type: 'marker'
    },
    {
      id: 'zone-1',
      lat: -6.1951,
      lng: 106.8751,
      radius: 5000, // 5km dalam meter
      type: 'circle'
    }
  ];

  return (
    <MapComponent
      height="500px"
      center={[-6.2088, 106.8456]}
      markers={markers}
      zoom={14}
      enableGeolocation={true}
      showRadius={true}
      clickToSelect={false}
      onLocationSelect={(lat, lng) => {
        console.log('Selected:', lat, lng);
      }}
    />
  );
}
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `height` | string | `300px` | Map container height |
| `center` | `[lat, lng]` | Jakarta | Map center coordinates |
| `markers` | `MapMarker[]` | `[]` | Markers to display |
| `zoom` | number | `13` | Initial zoom level |
| `onLocationSelect` | function | - | Callback saat lokasi dipilih |
| `enableGeolocation` | boolean | `true` | Show "Locate Me" button |
| `showRadius` | boolean | `false` | Show radius circles |
| `clickToSelect` | boolean | `false` | Allow click to select location |

#### MapMarker Interface

```typescript
interface MapMarker {
  id?: string;                    // Unique identifier
  lat: number;                    // Latitude
  lng: number;                    // Longitude
  label?: string;                 // Marker label
  color?: string;                 // Hex color (#ef4444)
  radius?: number;                // Radius in meters
  type?: 'marker' | 'circle';     // Marker type
}
```

---

### LocationSearch

Komponen pencarian lokasi dengan Nominatim API.

#### Basic Usage

```tsx
import LocationSearch from '@/components/LocationSearch';
import { useState } from 'react';

export function MyForm() {
  const [location, setLocation] = useState({ lat: 0, lng: 0, address: '' });

  return (
    <LocationSearch
      placeholder="Cari lokasi..."
      onSelect={(lat, lng, address) => {
        setLocation({ lat, lng, address });
      }}
    />
  );
}
```

#### Advanced Usage

```tsx
<LocationSearch
  placeholder="Pilih destinasi..."
  debounceMs={300}        // Faster search
  maxResults={10}         // More results
  enableHistory={true}    // Save history to localStorage
  showRecent={true}       // Show recent searches
  onSelect={(lat, lng, address) => {
    handleLocationSelect(lat, lng, address);
  }}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSelect` | function | - | Callback saat lokasi dipilih (**required**) |
| `placeholder` | string | `Cari lokasi...` | Input placeholder |
| `debounceMs` | number | `500` | Search debounce delay |
| `maxResults` | number | `5` | Maximum search results |
| `enableHistory` | boolean | `true` | Enable search history |
| `showRecent` | boolean | `true` | Show recent searches |

#### Features

- 🔍 **Debounced Search** - Efficient API calls
- 📱 **Keyboard Navigation** - Arrow keys + Enter support
- ⏱️ **Search History** - localStorage-based recent searches
- 🎯 **Indonesia-only** - Filtered to Indonesia (countrycodes=id)
- ⚡ **Error Handling** - User-friendly error messages

---

## 🔧 OSM Utilities Module

### `src/lib/osm.ts`

Helper functions untuk OSM operations.

#### Configuration

```typescript
import { OSM_CONFIG } from '@/lib/osm';

// Default center coordinates
OSM_CONFIG.DEFAULT_CENTER  // [-6.2088, 106.8456]

// Default zoom
OSM_CONFIG.DEFAULT_ZOOM    // 13

// Indonesia bounding box
OSM_CONFIG.INDONESIA_BOUNDS

// Nominatim API endpoint
OSM_CONFIG.NOMINATIM_API

// OpenStreetMap tile attribution
OSM_CONFIG.ATTRIBUTION
```

#### Functions

##### `searchLocation(query, options?)`

Search locations using Nominatim API.

```typescript
import { searchLocation } from '@/lib/osm';

const results = await searchLocation('Jakarta Selatan', {
  countrycode: 'id',  // Optional
  limit: 10,          // Optional
  timeout: 5000       // Optional
});

// Returns: NominatimResult[]
// [{ lat: "...", lon: "...", display_name: "..." }, ...]
```

##### `reverseGeocode(lat, lon, language?)`

Get address from coordinates.

```typescript
import { reverseGeocode } from '@/lib/osm';

const result = await reverseGeocode(-6.2088, 106.8456, 'id');
console.log(result.display_name); // "Jl. Senayan, Jakarta, ..."
```

##### `calculateDistance(lat1, lon1, lat2, lon2)`

Calculate distance between two points in kilometers.

```typescript
import { calculateDistance } from '@/lib/osm';

const dist = calculateDistance(-6.2088, 106.8456, -6.1951, 106.8751);
console.log(dist); // Distance in km
```

##### `formatDistance(meters)`

Format meters to human-readable distance.

```typescript
import { formatDistance } from '@/lib/osm';

formatDistance(1500);    // "1.5 km"
formatDistance(500);     // "500 m"
```

##### `formatAddress(address, maxLength?)`

Format address for display.

```typescript
import { formatAddress } from '@/lib/osm';

const addr = "Jl. Senayan, Jakarta Selatan, Indonesia";
formatAddress(addr, 30);  // "Jl. Senayan, Jakarta S..."
```

##### `createMarkerIcon(color, iconChar?)`

Create custom marker icon.

```typescript
import { createMarkerIcon } from '@/lib/osm';

const icon = createMarkerIcon('#3b82f6', 'A');  // Blue marker with 'A'
// Gunakan di Leaflet Marker:
// <Marker position={[lat, lng]} icon={icon} />
```

##### `isValidCoordinate(lat, lon)`

Validate coordinates.

```typescript
import { isValidCoordinate } from '@/lib/osm';

isValidCoordinate(-6.2088, 106.8456);  // true
isValidCoordinate(95, 200);             // false (out of range)
```

##### `isWithinIndonesia(lat, lon)`

Check if coordinates are within Indonesia.

```typescript
import { isWithinIndonesia } from '@/lib/osm';

isWithinIndonesia(-6.2088, 106.8456);  // true (Jakarta)
isWithinIndonesia(48.8566, 2.3522);    // false (Paris)
```

---

## 📱 Page Integration Examples

### K-Ride (GoRide.tsx)

```tsx
import { useState } from 'react';
import MapComponent from '@/components/MapComponent';
import LocationSearch from '@/components/LocationSearch';
import { calculateDistance } from '@/lib/osm';

export function GoRide() {
  const [origin, setOrigin] = useState({ lat: -6.2088, lng: 106.8456 });
  const [destination, setDestination] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState(0);

  const handleDestinationSelect = (lat: number, lng: number) => {
    setDestination({ lat, lng });
    
    // Calculate distance
    const dist = calculateDistance(origin.lat, origin.lng, lat, lng);
    setDistance(dist);
  };

  return (
    <div>
      <LocationSearch
        placeholder="Kemana tujuanmu?"
        onSelect={handleDestinationSelect}
      />
      
      <MapComponent
        height="400px"
        markers={[
          { lat: origin.lat, lng: origin.lng, label: 'A', color: '#22c55e' },
          ...(destination ? [{ lat: destination.lat, lng: destination.lng, label: 'B', color: '#ef4444' }] : [])
        ]}
        center={destination ? [
          (origin.lat + destination.lat) / 2,
          (origin.lng + destination.lng) / 2
        ] : [origin.lat, origin.lng]}
      />
      
      <p>Jarak: {distance.toFixed(2)} km</p>
    </div>
  );
}
```

### Driver Home (DriverHome.tsx)

```tsx
import { useState, useEffect } from 'react';
import MapComponent, { MapMarker } from '@/components/MapComponent';
import { calculateDistance, formatDistance } from '@/lib/osm';

export function DriverHome() {
  const [driverLocation, setDriverLocation] = useState([-6.2088, 106.8456]);
  const [orders, setOrders] = useState([
    { id: 1, lat: -6.2000, lng: 106.8400, status: 'pending' },
    { id: 2, lat: -6.2150, lng: 106.8500, status: 'pending' }
  ]);

  const markers: MapMarker[] = [
    {
      id: 'driver',
      lat: driverLocation[0],
      lng: driverLocation[1],
      label: 'Saya',
      color: '#3b82f6',
      type: 'marker'
    },
    ...orders.map((order, idx) => ({
      id: `order-${order.id}`,
      lat: order.lat,
      lng: order.lng,
      label: `${idx + 1}`,
      color: '#f59e0b',
      type: 'marker' as const
    }))
  ];

  // Update driver location setiap 10 detik
  useEffect(() => {
    const interval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          setDriverLocation([pos.coords.latitude, pos.coords.longitude]);
        });
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <MapComponent
        height="500px"
        center={driverLocation as [number, number]}
        markers={markers}
        zoom={14}
        enableGeolocation={true}
      />
      
      <div className="mt-4">
        {orders.map((order, idx) => {
          const dist = calculateDistance(
            driverLocation[0], driverLocation[1],
            order.lat, order.lng
          );
          return (
            <div key={order.id} className="p-3 border rounded">
              <p>Order {idx + 1} - {formatDistance(dist * 1000)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

---

## 🌍 Location Search Behavior

### Search Flow

1. **User Input** → Debounce 500ms
2. **API Call** → Nominatim API dengan filter `countrycodes=id`
3. **Results** → Max 5 hasil ditampilkan
4. **History** → Disimpan ke localStorage otomatis
5. **Recent** → Tampilkan jika search field kosong

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `↓` | Next result |
| `↑` | Previous result |
| `Enter` | Select highlighted result |
| `Escape` | Close dropdown |

### Error Handling

- Koneksi timeout: "Gagal mencari lokasi. Silakan coba lagi."
- No results: "Lokasi tidak ditemukan"
- Geolocation denied: User notification di map

---

## 🚀 Performance Tips

### 1. Memoize Map Center

```tsx
const center = useMemo(() => [lat, lng], [lat, lng]);

<MapComponent center={center} />
```

### 2. Debounce Location Search

LocationSearch sudah include debouncing, tapi bisa di-customize:

```tsx
<LocationSearch debounceMs={300} />  // Faster for more responsive apps
```

### 3. Limit Marker Count

Jangan render ratusan marker sekaligus:

```tsx
const visibleMarkers = markers.slice(0, 50);

<MapComponent markers={visibleMarkers} />
```

### 4. Cache Geocoding Results

```tsx
const cache = useRef(new Map());

const getCachedResult = async (query) => {
  if (cache.current.has(query)) {
    return cache.current.get(query);
  }
  const result = await searchLocation(query);
  cache.current.set(query, result);
  return result;
};
```

---

## 🔒 Privacy & Security

- ✅ **No Google tracking** - Uses open-source OSM
- ✅ **Local storage only** - Search history stored locally
- ✅ **No API keys** - Nominatim public access (rate limits apply)
- ✅ **HTTPS only** - All API calls use HTTPS

### Rate Limiting (Nominatim)

- Max 1 request/second per IP
- Cache results to avoid repeated calls
- Consider self-hosted Nominatim for production with high volume

---

## 🛠️ Troubleshooting

### Map Not Displaying

```tsx
// Ensure height is set
<MapComponent height="400px" />

// Check console for errors
import { OSM_CONFIG } from '@/lib/osm';
console.log(OSM_CONFIG.TILE_LAYER_URL);
```

### Markers Not Showing

```tsx
// Validate coordinates
import { isValidCoordinate } from '@/lib/osm';
console.log(isValidCoordinate(lat, lng));

// Ensure markers array is formatted correctly
const markers: MapMarker[] = [
  { lat: -6.2088, lng: 106.8456 }
];
```

### LocationSearch Not Working

```tsx
// Check if query > 2 characters
// Results filter to Indonesia only - use proper location names
// Check network tab for Nominatim API calls
// Verify countrycode is 'id' for Indonesia
```

### Geolocation Error

```tsx
// May fail if:
// - HTTPS not enabled (except localhost)
// - User denied permission
// - Browser doesn't support geolocation

// Check in browser console:
console.log(navigator.geolocation);
```

---

## 📚 Resources

- **Leaflet Docs**: https://leafletjs.com/reference.html
- **React-Leaflet**: https://react-leaflet.js.org/
- **Nominatim API**: https://nominatim.org/release-docs/latest/api/
- **OpenStreetMap**: https://www.openstreetmap.org/
- **Leaflet Plugins**: https://leafletjs.com/plugins.html

---

## 🔄 Migration from Google Maps

Jika sebelumnya menggunakan Google Maps:

1. ✅ **Remove** Google Maps API key dari `.env`
2. ✅ **Replace** `@react-google-maps/api` dengan `react-leaflet`
3. ✅ **Use** `searchLocation()` dari `osm.ts` untuk geocoding
4. ✅ **Leverage** custom markers dan styling di Leaflet

**No code compatibility** - Complete rewrite dari Google Maps → OSM required.

---

**Version:** 1.0  
**Last Updated:** March 2026  
**Maintained By:** Development Team
