export interface AuthenticatedUser {
  id: number;
  email: string;
  roles: RequestRole[];
}

export interface RequestRole {
  id: number;
  name: string;
  active: boolean;
}
