export interface FinanceApplication {
  id: number;
  data: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface FinanceApplicationCreateInput {
  data: Record<string, any>;
}

export interface FinanceApplicationResponse extends FinanceApplication {
  id: number;
  data: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}
