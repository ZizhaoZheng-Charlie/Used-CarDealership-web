export interface StaffMember {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  cellPhone?: string;
  image?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StaffMemberCreateInput extends Omit<StaffMember, "id" | "createdAt" | "updatedAt"> {}

export interface StaffMemberUpdateInput extends Partial<Omit<StaffMember, "id" | "createdAt" | "updatedAt">> {}


