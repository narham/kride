/**
 * OpenStreetMap (OSM) Utilities Module
 * 
 * Provides utilities for working with OpenStreetMap, Leaflet, and Nominatim API.
 * No API keys required - uses free, open-source services.
 */

import L from 'leaflet';

// OSM Configuration
export const OSM_CONFIG = {
  /** Default map center (Jakarta, Indonesia) */
  DEFAULT_CENTER: [-6.2088, 106.8456] as [number, number],
  
  /** Default zoom level */
  DEFAULT_ZOOM: 13,
  
  /** Bounding box for Indonesia [south, west, north, east] */
  INDONESIA_BOUNDS: [
    [-11.001, 94.976],
    [6.072, 141.119]
  ] as [[number, number], [number, number]],
  
  /** Tile layer URL - OpenStreetMap (free, no API key needed) */
  TILE_LAYER_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  
  /** Nominatim API for location search (free) */
  NOMINATIM_API: 'https://nominatim.openstreetmap.org/search',
  
  /** Tile layer attribution */
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
} as const;

/**
 * Create custom marker icon
 */
export function createMarkerIcon(
  color: string = '#ef4444',
  iconChar?: string
): L.Icon {
  const markerHTML = `
    <svg width="32" height="41" viewBox="0 0 32 41" xmlns="http://www.w3.org/2000/svg">
      <path fill="${color}" d="M16 0C9.373 0 4 5.373 4 12c0 8 12 29 12 29s12-21 12-29c0-6.627-5.373-12-12-12z"/>
      ${iconChar ? `<text x="16" y="16" font-size="18" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="central">${iconChar}</text>` : ''}
    </svg>
  `;

  return L.divIcon({
    html: markerHTML,
    iconSize: [32, 41],
    iconAnchor: [16, 41],
    popupAnchor: [0, -41],
    className: 'custom-marker-icon',
  });
}

/**
 * Format distance in meters to human-readable format
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Interface for Nominatim search results
 */
export interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
  address?: {
    city?: string;
    municipality?: string;
    county?: string;
    state?: string;
    country?: string;
  };
  type?: string;
  class?: string;
}

/**
 * Search for locations using Nominatim API (free, no API key needed)
 * Optimized for Indonesia
 */
export async function searchLocation(
  query: string,
  options?: {
    countrycode?: string;
    limit?: number;
    timeout?: number;
  }
): Promise<NominatimResult[]> {
  const {
    countrycode = 'id',
    limit = 5,
    timeout = 5000,
  } = options || {};

  if (query.length < 2) {
    return [];
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const params = new URLSearchParams({
      format: 'json',
      q: query,
      countrycodes: countrycode,
      limit: limit.toString(),
      'accept-language': 'id,en',
    });

    const response = await fetch(
      `${OSM_CONFIG.NOMINATIM_API}?${params}`,
      {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Location search error:', error);
    return [];
  }
}

/**
 * Get coordinates from address using Nominatim reverse geocoding
 */
export async function reverseGeocode(
  lat: number,
  lon: number,
  language: string = 'id'
): Promise<NominatimResult | null> {
  try {
    const params = new URLSearchParams({
      format: 'json',
      lat: lat.toString(),
      lon: lon.toString(),
      'accept-language': language,
    });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?${params}`
    );

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
}

/**
 * Check if coordinates are within Indonesia bounds
 */
export function isWithinIndonesia(lat: number, lon: number): boolean {
  const [[south, west], [north, east]] = OSM_CONFIG.INDONESIA_BOUNDS;
  return lat >= south && lat <= north && lon >= west && lon <= east;
}

/**
 * Validate latitude and longitude
 */
export function isValidCoordinate(lat: number, lon: number): boolean {
  return !isNaN(lat) && !isNaN(lon) && 
         lat >= -90 && lat <= 90 && 
         lon >= -180 && lon <= 180;
}

/**
 * Create a geographic bound from points
 */
export function createBounds(
  coordinates: Array<[number, number]>
): L.LatLngBounds | null {
  if (coordinates.length === 0) return null;

  const latitudes = coordinates.map(c => c[0]);
  const longitudes = coordinates.map(c => c[1]);

  return L.latLngBounds(
    [Math.min(...latitudes), Math.min(...longitudes)],
    [Math.max(...latitudes), Math.max(...longitudes)]
  );
}

/**
 * Format address for display
 */
export function formatAddress(address: string, maxLength: number = 60): string {
  const parts = address.split(',').map(p => p.trim());
  const formatted = parts.slice(0, 3).join(', ');
  
  if (formatted.length > maxLength) {
    return formatted.substring(0, maxLength) + '...';
  }
  return formatted;
}

/**
 * Extract city name from Nominatim result
 */
export function extractCity(result: NominatimResult): string {
  if (result.address) {
    return (
      result.address.city ||
      result.address.municipality ||
      result.address.county ||
      result.address.state ||
      'Unknown Location'
    );
  }
  
  const parts = result.display_name.split(',');
  return parts.length > 1 ? parts[1].trim() : result.display_name;
}
