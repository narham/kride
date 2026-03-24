import { MapContainer, TileLayer, Marker, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState, useCallback } from 'react';
import { LocateFixed, MapPin, AlertCircle } from 'lucide-react';
import { OSM_CONFIG, createMarkerIcon, isValidCoordinate } from '@/lib/osm';

// Fix for default marker icon in Leaflet + React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export interface MapMarker {
  id?: string;
  lat: number;
  lng: number;
  label?: string;
  color?: string;
  radius?: number;
  type?: 'marker' | 'circle';
}

interface MapComponentProps {
  /** Map container height (default: 300px) */
  height?: string;
  
  /** Map center coordinates [lat, lon] */
  center?: [number, number];
  
  /** Array of markers to display */
  markers?: MapMarker[];
  
  /** Initial zoom level (default: 13) */
  zoom?: number;
  
  /** Callback when location is selected on map */
  onLocationSelect?: (lat: number, lng: number) => void;
  
  /** Enable/disable geolocation button (default: true) */
  enableGeolocation?: boolean;
  
  /** Show indicator circle around each marker (default: false) */
  showRadius?: boolean;
  
  /** Custom marker icon source */
  markerIconUrl?: string;
  
  /** Allow users to click on map to select location */
  clickToSelect?: boolean;
}

/** Component to handle map view changes and resizing */
function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    if (isValidCoordinate(center[0], center[1])) {
      map.setView(center, zoom);
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    }
  }, [center, zoom, map]);
  return null;
}

const MapComponent = ({
  height = "300px",
  center = OSM_CONFIG.DEFAULT_CENTER,
  markers = [],
  zoom = OSM_CONFIG.DEFAULT_ZOOM,
  onLocationSelect,
  enableGeolocation = true,
  showRadius = false,
  clickToSelect = false,
}: MapComponentProps) => {
  const [currentCenter, setCurrentCenter] = useState<[number, number]>(center);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if (isValidCoordinate(center[0], center[1])) {
      setCurrentCenter(center);
    }
  }, [center]);

  const handleLocateMe = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation tidak didukung browser Anda');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentCenter([latitude, longitude]);
        setIsLocating(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLocationError('Gagal mendapatkan lokasi Anda');
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  const handleMapClick = useCallback(
    (e: L.LeafletMouseEvent) => {
      if (clickToSelect && onLocationSelect) {
        const { lat, lng } = e.latlng;
        onLocationSelect(lat, lng);
      }
    },
    [clickToSelect, onLocationSelect]
  );

  return (
    <div 
      style={{ height }} 
      className="w-full rounded-2xl overflow-hidden shadow-sm border border-border/50 z-0 relative"
    >
      <MapContainer 
        center={currentCenter}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        className={`cursor-${clickToSelect ? 'crosshair' : 'default'}`}
        onClick={handleMapClick}
      >
        <ChangeView center={currentCenter} zoom={zoom} />
        
        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          attribution={OSM_CONFIG.ATTRIBUTION}
          url={OSM_CONFIG.TILE_LAYER_URL}
          maxZoom={19}
          maxNativeZoom={18}
        />

        {/* Render markers */}
        {markers.map((marker, index) => {
          const markerKey = marker.id || `marker-${index}`;
          const icon = marker.color
            ? createMarkerIcon(marker.color, marker.label?.charAt(0).toUpperCase())
            : DefaultIcon;

          if (marker.type === 'circle') {
            return (
              <div key={markerKey}>
                <CircleMarker
                  center={[marker.lat, marker.lng]}
                  radius={marker.radius || 10}
                  fillColor={marker.color || '#ef4444'}
                  color={marker.color || '#ef4444'}
                  weight={2}
                  opacity={0.8}
                  fillOpacity={0.2}
                />
                {marker.label && (
                  <Marker position={[marker.lat, marker.lng]} icon={DefaultIcon}>
                    <Popup>{marker.label}</Popup>
                  </Marker>
                )}
              </div>
            );
          }

          return (
            <Marker
              key={markerKey}
              position={[marker.lat, marker.lng]}
              icon={icon}
            >
              {marker.label && <Popup>{marker.label}</Popup>}
            </Marker>
          );
        })}

        {/* Radius indicators around markers */}
        {showRadius &&
          markers
            .filter(m => m.radius)
            .map((marker, index) => (
              <CircleMarker
                key={`radius-${index}`}
                center={[marker.lat, marker.lng]}
                radius={marker.radius || 1000}
                fillColor="transparent"
                color={marker.color || '#3b82f6'}
                weight={1}
                opacity={0.3}
                dashArray="5, 5"
              />
            ))}
      </MapContainer>

      {/* Geolocation button */}
      {enableGeolocation && (
        <button
          onClick={handleLocateMe}
          disabled={isLocating}
          className="absolute bottom-4 right-4 z-[1000] p-3 rounded-full bg-white shadow-lg text-primary hover:bg-muted active:scale-90 transition-all border border-border/50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Lokasi Saya"
          title={locationError || 'Tampilkan lokasi saya'}
        >
          <LocateFixed className={`h-5 w-5 ${isLocating ? 'animate-spin' : ''}`} />
        </button>
      )}

      {/* Error message */}
      {locationError && (
        <div className="absolute bottom-4 left-4 z-[1000] flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-lg shadow-lg border border-red-200 text-sm">
          <AlertCircle className="h-4 w-4" />
          {locationError}
        </div>
      )}

      {/* Click to select indicator */}
      {clickToSelect && (
        <div className="absolute top-4 left-4 z-[1000] flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg shadow-lg border border-blue-200 text-xs font-medium">
          <MapPin className="h-3 w-3" />
          Klik peta untuk memilih lokasi
        </div>
      )}
    </div>
  );
};

export default MapComponent;
