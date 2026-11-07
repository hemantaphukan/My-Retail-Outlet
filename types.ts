
export enum VehicleType {
  TWO_WHEELER = '2 Wheeler',
  THREE_WHEELER = '3 Wheeler',
  FOUR_WHEELER = '4 Wheeler'
}

export enum OrderStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved'
}

export interface PUCCFile {
  name: string;
  data: string; // Base64
  type: string;
}

/**
 * Fix: Added missing User interface required by Settings.tsx
 */
export interface User {
  loginId: string;
  password?: string;
}

export interface Order {
  id: string;
  ownerName: string;
  vehicleNumber: string;
  dob?: string;
  vehicleType: VehicleType;
  vehicleImage?: PUCCFile;
  documentPdf?: PUCCFile;
  status: OrderStatus;
  createdAt: string;
}