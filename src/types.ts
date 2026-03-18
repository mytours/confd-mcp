export interface Social {
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  linkedin: string | null;
  youtube: string | null;
  threads: string | null;
  tiktok: string | null;
}

export interface Logo {
  thumb: string;
  list: string;
  large: string;
}

export interface CoverImage {
  banner: string;
  thumb: string;
}

export interface OpeningHour {
  id: number;
  row_type: "hours" | "text";
  position: number;
  group_key: string | null;
  days: number[] | null;
  opens: string | null;
  closes: string | null;
  closed: boolean;
  label: string | null;
  notes: string | null;
  group_label?: string;
  display_text: string;
}

export interface Facility {
  id: number;
  row_type: "facility" | "text";
  position: number;
  facility_type: string | null;
  notes: string | null;
  label: string;
}

export interface AdmissionPrice {
  id: number;
  row_type: "price" | "text";
  position: number;
  group_key: string | null;
  amount_cents: number | null;
  currency: string;
  label: string | null;
  notes: string | null;
  formatted_price: string;
  group_label?: string;
  display_text: string;
}

export interface OpeningHourInput {
  id?: number;
  row_type: "hours" | "text";
  position: number;
  group_key?: string;
  days?: number[];
  opens?: string;
  closes?: string;
  closed?: boolean;
  label?: string;
  notes?: string;
  _destroy?: boolean;
}

export interface AdmissionPriceInput {
  id?: number;
  row_type: "price" | "text";
  position: number;
  group_key?: string;
  amount_cents?: number;
  currency?: string;
  label?: string;
  notes?: string;
  _destroy?: boolean;
}

export interface FacilityInput {
  id?: number;
  row_type: "facility" | "text";
  position: number;
  facility_type?: string;
  notes?: string;
  _destroy?: boolean;
}

export interface Museum {
  id: number;
  name: string;
  description: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address_line1: string | null;
  address_line2: string | null;
  locality: string | null;
  administrative_area: string | null;
  postal_code: string | null;
  country_code: string | null;
  lat: string | null;
  lng: string | null;
  source: string | null;
  published: boolean;
  do_not_import: boolean;
  discarded_at: string | null;
  tags: string[];
  social: Social;
  logo: Logo | null;
  cover_image: CoverImage | null;
  transport: string | null;
  opening_hours: OpeningHour[];
  admission_prices: AdmissionPrice[];
  facilities: Facility[];
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: number;
  name: string;
  description: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address_line1: string | null;
  address_line2: string | null;
  locality: string | null;
  administrative_area: string | null;
  postal_code: string | null;
  country_code: string | null;
  lat: string | null;
  lng: string | null;
  source: string | null;
  discarded_at: string | null;
  tags: string[];
  social: Social;
  logo: Logo | null;
  cover_image: CoverImage | null;
  created_at: string;
  updated_at: string;
}

export interface Conference {
  id: number;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  website_url: string | null;
  registration_url: string | null;
  cfp_deadline: string | null;
  venue_name: string | null;
  attendance_size: number | null;
  registration_fee: string | null;
  organization_id: number | null;
  email: string | null;
  phone: string | null;
  address_line1: string | null;
  address_line2: string | null;
  locality: string | null;
  administrative_area: string | null;
  postal_code: string | null;
  country_code: string | null;
  lat: string | null;
  lng: string | null;
  discarded_at: string | null;
  tags: string[];
  social: Social;
  logo: Logo | null;
  cover_image: CoverImage | null;
  created_at: string;
  updated_at: string;
}

export interface ConferenceInput {
  name?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  website_url?: string;
  registration_url?: string;
  cfp_deadline?: string;
  venue_name?: string;
  attendance_size?: number;
  registration_fee?: string;
  organization_id?: number;
  email?: string;
  phone?: string;
  address_line1?: string;
  address_line2?: string;
  locality?: string;
  administrative_area?: string;
  postal_code?: string;
  country_code?: string;
  lat?: number;
  lng?: number;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linked_in?: string;
  youtube?: string;
  threads?: string;
  tiktok?: string;
  tag_list?: string;
}

export interface Pagination {
  page: number;
  items: number;
  total: number;
  pages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface MergedResponse {
  merged_into: number;
}

export interface ErrorResponse {
  error: string;
  messages?: string[];
  message?: string;
}

export interface MuseumInput {
  name?: string;
  description?: string;
  email?: string;
  phone?: string;
  website?: string;
  address_line1?: string;
  address_line2?: string;
  locality?: string;
  administrative_area?: string;
  postal_code?: string;
  country_code?: string;
  lat?: number;
  lng?: number;
  source?: string;
  published?: boolean;
  do_not_import?: boolean;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linked_in?: string;
  youtube?: string;
  threads?: string;
  tiktok?: string;
  tag_list?: string;
  transport?: string;
  opening_hours_attributes?: OpeningHourInput[];
  admission_prices_attributes?: AdmissionPriceInput[];
  facilities_attributes?: FacilityInput[];
}

export interface OrganizationInput {
  name?: string;
  description?: string;
  email?: string;
  phone?: string;
  website?: string;
  address_line1?: string;
  address_line2?: string;
  locality?: string;
  administrative_area?: string;
  postal_code?: string;
  country_code?: string;
  lat?: number;
  lng?: number;
  source?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linked_in?: string;
  youtube?: string;
  threads?: string;
  tiktok?: string;
  tag_list?: string;
}
