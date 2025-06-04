export interface Label {
  text: string;
}

export type AccountType = 'LDAP' | 'Локальная';

export interface Account {
  id: string;
  labels: Label[];
  type: AccountType;
  login: string;
  password: string | null;
}

export interface AccountFormData {
  labels: string;
  type: AccountType;
  login: string;
  password: string;
} 