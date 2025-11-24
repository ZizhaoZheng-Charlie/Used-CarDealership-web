export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessageCreateInput {
  data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  };
}

export interface ContactMessageResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

