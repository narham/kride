# Kride Application - Comprehensive Codebase Analysis

**Project Name:** Klumpang GO  
**Current Date:** March 24, 2026  
**Framework:** React 18.3.1 + TypeScript + Vite  
**Build Tool:** Vite 5.4.19  
**CSS Framework:** Tailwind CSS 3.4.17

---

## 1. EXECUTIVE SUMMARY

The **Kride** (Klumpang GO) application is a comprehensive ride-sharing and delivery service platform with multiple service modules including K-Ride, K-Food, K-Pay, and admin/driver dashboards. The application uses **Leaflet + OpenStreetMap** (NOT Google Maps) for mapping functionality, with location search via Nominatim API.

**Key Finding:** The `.env.example` file in the codebase mentions `VITE_GOOGLE_MAPS_API_KEY`, but this is **NOT used**. The application uses:
- **Leaflet** (v1.9.4)
- **React Leaflet** (v4.2.1)
- **OpenStreetMap** tiles
- **Nominatim API** for location search

---

## 2. MAP IMPLEMENTATION OVERVIEW

### 2.1 Map Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `leaflet` | ^1.9.4 | Core mapping library |
| `react-leaflet` | ^4.2.1 | React wrapper for Leaflet |
| `@types/leaflet` | ^1.9.21 | TypeScript definitions |

**Source:** [package.json](package.json#L46-L48)

### 2.2 Map Configuration Files

- **No dedicated map config file** - Maps are configured inline within components
- **Default Center:** Jakarta coordinates `[-6.200000, 106.816666]`
- **Default Zoom:** 13 (display), 15 (on view change)
- **Tile Source:** OpenStreetMap (https://tile.openstreetmap.org)
- **Scroll Wheel Zoom:** Disabled (set to false)
- **Zoom Control:** Hidden (zoomControl={false})

---

## 3. MAP-RELATED COMPONENTS

### 3.1 MapComponent.tsx
**Location:** [src/components/MapComponent.tsx](src/components/MapComponent.tsx)  
**Lines:** 1-88

**Purpose:** Primary map display component using Leaflet with React

**Key Features:**
- Interactive map with customizable height and center position
- Marker support (display multiple locations)
- "Locate Me" button for geolocation (bottom-right corner)
- Automatic map resizing
- Default centering on Jakarta
- Custom marker icons with shadow

**Props Interface:**
```typescript
interface MapComponentProps {
  height?: string;              // Default: "300px"
  center?: [number, number];    // Default: [-6.200000, 106.816666]
  markers?: Array<{ lat: number; lng: number }>;
  onLocationSelect?: (lat: number, lng: number) => void;
}
```

**Geolocation Integration:**
- Uses browser's `navigator.geolocation.getCurrentPosition()`
- Converts device GPS coordinates to map view
- Updates mapCenter state on successful location

**Marker Implementation:**
- Uses Leaflet's default icon with custom size (25x41px)
- Marker anchor at [12, 41]
- Shadow effect for depth

**SubComponent - ChangeView:**
- Monitors latitude/longitude changes
- Calls `map.setView()` for real-time updates
- Handles map resize with 100ms debounce
- Zoom level: 15 on center change

### 3.2 LocationSearch.tsx
**Location:** [src/components/LocationSearch.tsx](src/components/LocationSearch.tsx)  
**Lines:** 1-114

**Purpose:** Location search component using Nominatim API (OpenStreetMap geocoding)

**Key Features:**
- Real-time location search with debounce (500ms)
- Nominatim API integration for address lookup
- Restricts results to Indonesia (`countrycodes=id`)
- Maximum 5 search results per query
- Click-outside detection for dropdown closure
- Loading state indicator

**Nominatim API Integration:**
```
API Endpoint: https://nominatim.openstreetmap.org/search
Query Parameters:
  - format=json
  - q={searchQuery}
  - countrycodes=id (Indonesia only)
  - limit=5 (max results)
```

**Props Interface:**
```typescript
interface LocationSearchProps {
  onSelect: (lat: number, lng: number, address: string) => void;
  placeholder?: string;           // Default: "Cari lokasi..."
  className?: string;
}
```

**Data Processing:**
- Converts lat/lon strings from API response to numbers
- Extracts first part of address as display title
- Shows full address as secondary text
- Callback: `onSelect(latitude, longitude, fullAddress)`

---

## 4. MAP USAGE ACROSS PAGES AND FEATURES

### 4.1 GoRide Service Page
**Location:** [src/pages/GoRide.tsx](src/pages/GoRide.tsx)  
**Lines:** 1-57

**Use Case:** Ride booking with location selection

**Map Usage:**
- Displays map with pickup location (default or user-selected)
- Height: 250px
- Shows current marker position
- Integrates LocationSearch below map

**State Management:**
```typescript
const [mapCenter, setMapCenter] = useState<[number, number]>([-6.200000, 106.816666]);
const [destination, setDestination] = useState("");

const handleLocationSelect = (lat: number, lng: number, address: string) => {
  setMapCenter([lat, lng]);
  setDestination(address);
};
```

**User Flow:**
1. Map shows default Jakarta location
2. User clicks "Locate Me" button for current location
3. LocationSearch component allows destination selection
4. Map updates to show selected destination
5. User can book ride via "Cari Driver K-Ride" button

### 4.2 GoFood Service Page
**Location:** [src/pages/GoFood.tsx](src/pages/GoFood.tsx)  
**Lines:** 1-104

**Use Case:** Food delivery with delivery address selection

**Map Usage:**
- Compact map showing delivery destination (150px height)
- Located below LocationSearch component
- Displays selected delivery address as overlay
- Marker shows delivery point

**Address Display:**
- Overlay card shows selected address with MapPin icon
- Updated dynamically as user selects new locations
- Default: "Rumah • Jl. Sudirman No. 123..."

**State Management:**
```typescript
const [mapCenter, setMapCenter] = useState<[number, number]>([-6.200000, 106.816666]);
const [address, setAddress] = useState("Rumah • Jl. Sudirman No. 123...");

const handleLocationSelect = (lat: number, lng: number, addr: string) => {
  setMapCenter([lat, lng]);
  setAddress(addr);
};
```

### 4.3 Driver Home Dashboard
**Location:** [src/pages/driver/DriverHome.tsx](src/pages/driver/DriverHome.tsx)  
**Lines:** 1-178

**Use Case:** Driver viewing available orders with locations

**Map Usage:**
- Displays all incoming order locations as markers
- Height: 200px
- Multiple markers for different orders
- Shows order pickup and destination points

**Order Data Structure:**
```typescript
const incomingOrders = [
  { 
    id: "ORD-1234", 
    type: "K-Ride", 
    distance: "2.5 km", 
    amount: "Rp 15.000", 
    pickup: "Jl. Sudirman No. 12", 
    destination: "Malioboro Mall", 
    color: "bg-primary", 
    lat: -6.210000,      // ← for marker
    lng: 106.820000      // ← for marker
  },
  // ... more orders
];
```

**Map Rendering:**
```typescript
<MapComponent 
  height="200px" 
  markers={incomingOrders.map(o => ({ lat: o.lat, lng: o.lng }))}
/>
```

---

## 5. ADMINISTRATIVE CONFIGURATION

### 5.1 Admin Settings Page
**Location:** [src/pages/admin/AdminSettings.tsx](src/pages/admin/AdminSettings.tsx)  
**Lines:** 1-183

**Maps Tab Features:**
- **Tab Value:** "maps" (default tab)
- **Title:** "Peta (OpenStreetMap)"
- **Description:** Documents use of open-source OpenStreetMap with Nominatim

**Configuration Options:**
1. ✅ OpenStreetMap + Nominatim Search (Active)
   - No API key required
   - Tile server URL field (optional customization)
   - Default: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`

2. **Note:** UI shows placeholder for Tile Server URL configuration but not currently persisted

**Admin Configuration Note:**
```typescript
<div className="p-4 rounded-2xl bg-muted/50 border border-dashed border-muted-foreground/30">
  <p className="text-sm font-bold text-muted-foreground italic">
    Integrasi OpenStreetMap aktif dengan Nominatim Search. 
    Tidak diperlukan API Key.
  </p>
</div>
```

---

## 6. ENVIRONMENT CONFIGURATION

### 6.1 Environment Variables

**File:** [.env.example](.env.example)

**Current Configuration:**
```env
VITE_SUPABASE_URL=https://lewcriivewycykketbvy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**IMPORTANT NOTE:** 
- ❌ `VITE_GOOGLE_MAPS_API_KEY` is NOT configured in the environment
- ❌ No map-related environment variables are defined
- The application does NOT use Google Maps API

### 6.2 Supabase Integration

**File:** [src/lib/supabase.ts](src/lib/supabase.ts)  
**Lines:** 1-13

**Purpose:** Backend database and authentication

**Configuration:**
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
```

**Current Service:** Supabase Database (lewcriivewycykketbvy)

---

## 7. API INTEGRATION PATTERNS

### 7.1 Nominatim Location Search
**API Type:** REST / Geocoding  
**Endpoint:** `https://nominatim.openstreetmap.org/search`

**Request Pattern:**
```typescript
const response = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=id&limit=5`
);
const data = await response.json();
```

**Response Format:**
```typescript
interface NominatimResult {
  lat: string;           // Latitude as string
  lon: string;           // Longitude as string
  display_name: string;  // Full address
}
```

### 7.2 Browser Geolocation API
**API Type:** W3C Geolocation API  
**Implementation:** [src/components/MapComponent.tsx#L48](src/components/MapComponent.tsx#L48-L51)

```typescript
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    setMapCenter([position.coords.latitude, position.coords.longitude]);
  });
}
```

### 7.3 Other Backend Services
**Primary Backend:** Supabase  
**Services Configured (Admin Settings):**
- **Payment:** Midtrans Gateway (for K-Pay)
- **Notifications:** Firebase Cloud Messaging (FCM)
- **Storage:** Cloudinary / AWS S3 (optional)

---

## 8. APPLICATION STRUCTURE

### 8.1 Project Layout

```
kride/
├── src/
│   ├── components/
│   │   ├── MapComponent.tsx          ⭐ Primary map display
│   │   ├── LocationSearch.tsx        ⭐ Location search with Nominatim
│   │   ├── Header.tsx
│   │   ├── BottomNav.tsx
│   │   ├── GoPayCard.tsx
│   │   ├── ServiceLayout.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── PromoSection.tsx
│   │   ├── BannerCarousel.tsx
│   │   ├── admin/
│   │   │   ├── AdminLayout.tsx
│   │   │   └── AdminSidebar.tsx
│   │   ├── driver/
│   │   │   ├── DriverLayout.tsx
│   │   │   └── DriverBottomNav.tsx
│   │   └── ui/ (40+ Shadcn UI components)
│   │
│   ├── pages/
│   │   ├── Index.tsx                 # Main landing
│   │   ├── GoRide.tsx               ⭐ Uses MapComponent + LocationSearch
│   │   ├── GoFood.tsx               ⭐ Uses MapComponent + LocationSearch
│   │   ├── GenericService.tsx
│   │   ├── GoPayService.tsx
│   │   ├── Login.tsx
│   │   ├── Profile.tsx
│   │   ├── Orders.tsx
│   │   ├── Chat.tsx
│   │   ├── Notifications.tsx
│   │   ├── Promo.tsx
│   │   ├── TopUp.tsx
│   │   ├── PayScanner.tsx
│   │   ├── SearchResults.tsx
│   │   ├── NotFound.tsx
│   │   ├── DetailPlaceholder.tsx
│   │   ├── admin/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminOrders.tsx
│   │   │   ├── AdminServices.tsx
│   │   │   ├── AdminUsers.tsx
│   │   │   └── AdminSettings.tsx    ⭐ Maps configuration UI
│   │   └── driver/
│   │       ├── DriverHome.tsx       ⭐ Uses MapComponent for orders
│   │       ├── DriverEarnings.tsx
│   │       ├── DriverPerformance.tsx
│   │       └── DriverProfile.tsx
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib/
│   │   ├── supabase.ts             # Supabase client
│   │   └── utils.ts
│   │
│   ├── App.tsx                      # Router configuration
│   ├── main.tsx
│   └── index.css
│
├── public/
│   └── robots.txt
│
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── playwright.config.ts
└── vitest.config.ts
```

### 8.2 Route Structure

**Customer Routes:**
```
/                    → Index (home/dashboard)
/login               → Login page
/promo               → Promotions
/orders              → Orders list
/orders/:id          → Order details
/chat                → Messages
/chat/:id            → Chat details
/profile             → User profile
/notifications       → Notifications
/search              → Search results
```

**Service Routes:**
```
/k-ride              → K-Ride (mapping + location)
/k-food              → K-Food (mapping + location)
/k-car               → K-Car (generic service)
/k-send              → K-Send (delivery)
/k-mart              → K-Mart (shopping)
/k-shop              → K-Shop
/k-play              → K-Play
/k-med               → K-Med
/k-club              → K-Club
/k-box               → K-Box (logistics)
```

**K-Pay Routes:**
```
/k-pay-pay           → Payment (scanner)
/k-pay-topup         → Top up (balance)
/k-pay-explore       → Services
/k-pay-more          → More options
/k-pay-history       → Payment history
```

**Driver Routes:**
```
/driver              → Driver home (with map)
/driver/earnings     → Earnings view
/driver/performance  → Performance stats
/driver/profile      → Driver profile
```

**Admin Routes:**
```
/admin               → Dashboard
/admin/orders        → Order management
/admin/services      → Service management
/admin/users         → User management
/admin/settings      → System settings (including maps)
```

### 8.3 Service Modules

| Service | Page Component | Map Used | Location Search | Purpose |
|---------|---|---|---|---|
| K-Ride | GoRide.tsx | YES (250px) | YES | Ride booking |
| K-Food | GoFood.tsx | YES (150px) | YES | Food delivery |
| K-Car | GenericService.tsx | NO | NO | Car rental |
| K-Send | GenericService.tsx | NO | NO | Package delivery |
| K-Mart | GenericService.tsx | NO | NO | Shopping |
| K-Shop | GenericService.tsx | NO | NO | Retail |
| K-Play | GenericService.tsx | NO | NO | Entertainment |
| K-Med | GenericService.tsx | NO | NO | Medical delivery |
| K-Club | GenericService.tsx | NO | NO | Club services |
| K-Box | GenericService.tsx | NO | NO | Logistics |

---

## 9. STATE MANAGEMENT & PATTERNS

### 9.1 State Management Approach
- **Local Component State:** React hooks (`useState`)
- **Server State:** TanStack React Query (v5.83.0)
- **Backend State:** Supabase
- **No Redux/Zustand** implemented

### 9.2 Map State Pattern (GoRide Example)

```typescript
// Component state for map
const [mapCenter, setMapCenter] = useState<[number, number]>([-6.200000, 106.816666]);
const [destination, setDestination] = useState("");

// Handler for location selection
const handleLocationSelect = (lat: number, lng: number, address: string) => {
  setMapCenter([lat, lng]);        // Update map display
  setDestination(address);          // Store selected address
};

// Pass to MapComponent
<MapComponent 
  center={mapCenter}
  markers={[{ lat: mapCenter[0], lng: mapCenter[1] }]}
/>

// Pass to LocationSearch
<LocationSearch onSelect={handleLocationSelect} />
```

---

## 10. STYLING & UI FRAMEWORK

### 10.1 Design System
- **Framework:** Shadcn UI (40+ components)
- **CSS:** Tailwind CSS v3.4.17
- **Font:** Plus Jakarta Sans
- **Animation:** Tailwind CSS Animate

### 10.2 Color Scheme
```typescript
// Primary colors defined in CSS variables
--primary           // Main brand color
--destructive       // Red (delete, cancel)
--gopay-blue        # K-Pay specific
--sidebar-*         # Admin/Driver layouts

// Semantic colors
--border, --input, --ring
--background, --foreground
--muted, --muted-foreground
--card, --card-foreground
--accent, --accent-foreground
--popover, --popover-foreground
```

### 10.3 Theme Configuration
- **Dark Mode:** Supported via class-based approach
- **Responsive:** Mobile-first design
- **Max Width:** 1400px (desktop)
- **Custom Border Radius:** CSS variable based

---

## 11. EXTERNAL DEPENDENCIES & INTEGRATIONS

### 11.1 Core Dependencies

| Package | Version | Category | Purpose |
|---------|---------|----------|---------|
| react | ^18.3.1 | Framework | UI library |
| react-dom | ^18.3.1 | Framework | DOM rendering |
| react-router-dom | ^6.30.1 | Routing | Page routing |
| typescript | ^5.8.3 | Language | Type safety |

### 11.2 Map & Location Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| leaflet | ^1.9.4 | Map rendering |
| react-leaflet | ^4.2.1 | React integration |
| @types/leaflet | ^1.9.21 | TypeScript types |

### 11.3 State Management

| Package | Version | Purpose |
|---------|---------|---------|
| @tanstack/react-query | ^5.83.0 | Server state management |
| react-hook-form | ^7.61.1 | Form state |
| @hookform/resolvers | ^3.10.0 | Form validation |
| zod | ^3.25.76 | Schema validation |

### 11.4 UI Framework

| Package | Version | Purpose |
|---------|---------|---------|
| @radix-ui/* | ^1.x.x | 20+ UI components |
| sonner | ^1.7.4 | Toast notifications |
| recharts | ^2.15.4 | Charts/analytics |
| lucide-react | ^0.462.0 | Icons (700+) |

### 11.5 Backend

| Package | Version | Purpose |
|---------|---------|---------|
| @supabase/supabase-js | ^2.100.0 | Database + Auth |

### 11.6 Utilities

| Package | Version | Purpose |
|---------|---------|---------|
| date-fns | ^3.6.0 | Date handling |
| clsx | ^2.1.1 | className merging |
| tailwind-merge | ^2.6.0 | CSS conflict resolution |
| class-variance-authority | ^0.7.1 | CSS variants |

### 11.7 Development Dependencies

| Package | Purpose |
|---------|---------|
| @vitejs/plugin-react-swc | Fast React transpilation |
| vitest | Unit testing |
| @playwright/test | E2E testing |
| eslint | Code linting |

---

## 12. BUILD & DEPLOYMENT CONFIGURATION

### 12.1 Vite Configuration
**File:** [vite.config.ts](vite.config.ts)

```typescript
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",           // IPv6 + IPv4
    port: 8080,           // Dev server port
    hmr: {
      overlay: false,     // No HMR overlay
    },
  },
  plugins: [
    react(),              // React SWC compiler
    mode === "development" && componentTagger()  // Component tracking
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],  // Prevent duplication
  },
}));
```

### 12.2 Build Commands

```bash
npm run dev              # Start dev server (localhost:8080)
npm run build            # Production build
npm run build:dev        # Development build
npm run preview          # Preview production build
npm run lint             # ESLint check
npm run test             # Run vitest
npm run test:watch       # Watch mode testing
```

### 12.3 Package Configuration
- **Package Manager:** Bun (bun.lockb file)
- **Type:** ES Module
- **App Name:** "klumpang-go"
- **Build Output:** Not specified (defaults to "dist/")

---

## 13. TESTING SETUP

### 13.1 Testing Frameworks
- **Unit Test:** Vitest v3.2.4
- **E2E Test:** Playwright v1.57.0
- **DOM Testing:** @testing-library/react v16.0.0

### 13.2 Test Files Location
- **Conventional Path:** [src/test/](src/test/)
- **Example Test:** [src/test/example.test.ts](src/test/example.test.ts)
- **Setup File:** [src/test/setup.ts](src/test/setup.ts)

---

## 14. CODE ORGANIZATION & PATTERNS

### 14.1 Component Patterns

**Functional Components with Hooks:**
```typescript
const MyComponent = ({ prop1, prop2 }: MyComponentProps) => {
  const [state, setState] = useState(initialValue);
  const { data, isLoading } = useQuery({ ... });
  
  return <div>...</div>;
};

export default MyComponent;
```

**Interface Naming:**
```typescript
interface ComponentNameProps {
  requiredProp: string;
  optionalProp?: number;
  onCallback: (param: string) => void;
}
```

### 14.2 File Naming Conventions
- **Components:** PascalCase (MapComponent.tsx)
- **Pages:** PascalCase (GoRide.tsx)
- **Utilities:** camelCase (utils.ts)
- **Hooks:** kebab-case prefix (use-mobile.tsx)
- **UI Components:** kebab-case (dropdown-menu.tsx)

### 14.3 Import Aliases
```typescript
import MapComponent from "@/components/MapComponent";  // @ = src/
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
```

---

## 15. PERFORMANCE CONSIDERATIONS

### 15.1 Map Component Optimizations
1. **Scroll Wheel Disabled:** Prevents accidental zoom during scroll
2. **Zoom Control Hidden:** Reduces UI clutter on mobile
3. **Debounced Resize:** 100ms delay for map.invalidateSize()
4. **Marker Optimization:** Static array rendering (no dynamic re-renders)

### 15.2 Location Search Optimizations
1. **Debounced API Calls:** 500ms delay before search request
2. **Query Validation:** Only searches if query length > 2 chars
3. **Result Limiting:** Maximum 5 results per request
4. **Click-Outside Detection:** Proper cleanup with event listeners

### 15.3 Bundle Analysis
- **No bundle size analysis tool configured**
- **Tree-shaking:** Enabled by default in Vite with ES modules
- **Code Splitting:** Not explicitly configured (Vite default)

---

## 16. SECURITY & BEST PRACTICES

### 16.1 Environment Secrets
✅ **Supabase credentials** stored in `.env.example`  
✅ **No hardcoded secrets** in source code  
✅ **API keys** marked for environment config only  

**Exception:** Admin Settings page shows example placeholder values (for documentation)

### 16.2 API Security
- **Nominatim:** No authentication required (public API)
- **Supabase:** Row-Level Security (RLS) recommended but not visible in code
- **CORS:** Nominatim allows public cross-origin requests

### 16.3 Form Validation
- **Zod:** Schema validation library configured
- **React Hook Form:** Validated form state management
- **No validation visible** for map/location inputs (TODO)

---

## 17. KNOWN LIMITATIONS & TODOs

### 17.1 Current Limitations
1. ❌ **No Google Maps Support** - Only OpenStreetMap available
2. ❌ **No Route Planning** - Maps show location only, not directions
3. ❌ **No Real-time Tracking** - Static marker display
4. ❌ **No Map Caching** - Each reload fetches fresh tiles
5. ❌ **No Offline Support** - Requires internet for all maps/search
6. ❌ **No Custom Markers** - Uses default Leaflet icons only
7. ❌ **No Marker Clustering** - Multiple nearby markers not grouped

### 17.2 Not Implemented
- Drive/walk directions
- Distance/time calculation
- Geofencing
- Real-time vehicle tracking
- Map annotation/drawing
- Multi-stop routing
- Alternative route selection
- ETA calculation

**Admin Settings shows configuration UI for but NOT implemented:**
- Custom tile server configuration
- Payment gateway integration (Midtrans)
- Firebase Cloud Messaging
- Cloudinary/S3 storage

---

## 18. QUICK REFERENCE: MAP CODE LOCATIONS

| Feature | File | Lines | Status |
|---------|------|-------|--------|
| **Map Display** | [src/components/MapComponent.tsx](src/components/MapComponent.tsx) | 1-88 | ✅ Active |
| **Location Search** | [src/components/LocationSearch.tsx](src/components/LocationSearch.tsx) | 1-114 | ✅ Active |
| **K-Ride Map** | [src/pages/GoRide.tsx](src/pages/GoRide.tsx) | 1-57 | ✅ Active |
| **K-Food Map** | [src/pages/GoFood.tsx](src/pages/GoFood.tsx) | 1-104 | ✅ Active |
| **Driver Dashboard Map** | [src/pages/driver/DriverHome.tsx](src/pages/driver/DriverHome.tsx) | 20-30 | ✅ Active |
| **Admin Maps Config** | [src/pages/admin/AdminSettings.tsx](src/pages/admin/AdminSettings.tsx) | 30-60 | ⚠️ UI Only |
| **Supabase Config** | [src/lib/supabase.ts](src/lib/supabase.ts) | 1-13 | ✅ Active |
| **Vite Config** | [vite.config.ts](vite.config.ts) | 1-30 | ✅ Active |

---

## 19. API DOCUMENTATION

### 19.1 Nominatim Search API

**Endpoint:** `https://nominatim.openstreetmap.org/search`

**Parameters:**
```
format=json       - Response format
q=<query>        - Search query
countrycodes=id   - Filter to Indonesia
limit=5          - Maximum 5 results
```

**Example Request:**
```
https://nominatim.openstreetmap.org/search?format=json&q=Mall%20Grand%20Indonesia&countrycodes=id&limit=5
```

**Response:**
```json
[
  {
    "lat": "-6.1956",
    "lon": "106.8229",
    "display_name": "Grand Indonesia Mall, Jalan Thamrin, Menteng, Jakarta Pusat, Jakarta, 12190, Indonesia"
  }
]
```

### 19.2 Browser Geolocation API

**Method:** `navigator.geolocation.getCurrentPosition()`

**Parameters:**
```typescript
(position: GeolocationPosition) => {
  position.coords.latitude   // number
  position.coords.longitude  // number
  position.coords.accuracy   // meters
  position.timestamp         // milliseconds
}
```

**Errors:** 
- PERMISSION_DENIED (user blocked)
- POSITION_UNAVAILABLE (no GPS signal)
- TIMEOUT (slow GPS lock)

---

## 20. MIGRATION PATH: GOOGLE MAPS (IF NEEDED)

If migration to Google Maps is required:

**Required Changes:**
1. Add `VITE_GOOGLE_MAPS_API_KEY` to `.env`
2. Replace `react-leaflet` with `@react-google-maps/api`
3. Update MapComponent.tsx to use Google Maps API
4. Replace Nominatim with Google Places API for location search
5. Update admin settings documentation

**Estimated Effort:** 2-3 days (medium complexity)

---

## 21. SUMMARY TABLE

| Aspect | Technology/Pattern | Status |
|--------|-------------------|--------|
| **Mapping** | Leaflet + React Leaflet | ✅ Active |
| **Geocoding** | Nominatim API | ✅ Active |
| **Geolocation** | Browser API | ✅ Active |
| **Backend** | Supabase | ✅ Active |
| **Frontend** | React 18 + TypeScript | ✅ Active |
| **Routing** | React Router v6 | ✅ Active |
| **State** | React Hooks + React Query | ✅ Active |
| **UI** | Shadcn + Tailwind CSS | ✅ Active |
| **Forms** | React Hook Form + Zod | ✅ Active |
| **Google Maps** | (Not Used) | ❌ Not Implemented |
| **Real-time** | Supabase (Not visible) | ⚠️ Configured |
| **Testing** | Vitest + Playwright | ✅ Ready |

---

**Generated:** 2026-03-24  
**Analysis Version:** 1.0  
**Application:** Klumpang GO (Kride)

