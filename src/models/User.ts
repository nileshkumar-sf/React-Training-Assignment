export enum Role {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class User {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role;
  address: string;

  constructor(data: any) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.middleName = data.middleName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phoneNumber;
    this.role = data.role;
    this.address = data.address;
  }
}
