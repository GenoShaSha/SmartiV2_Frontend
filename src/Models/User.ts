import { Timestamp } from "firebase/firestore";

export class User {
  id: string;
  documentId: string;
  email: string;
  role: string;
  lsp: string;
  offices?: string[];
  signInProviders: string[];
  dateFormat?: string;
  appUser?: string;
  lastLogin?: Timestamp;

  constructor(
    documentId: string,
    email: string,
    role: string,
    offices: string[],
    signInProviders: string[],
    lsp: string,
    dateFormat: string = "european",
    appUser: string = "No",
    lastLogin: Timestamp
  ) {
    this.documentId = documentId;
    this.id = documentId;
    this.email = email;
    this.role = role;
    this.offices = offices;
    this.signInProviders = signInProviders;
    this.lsp = lsp;
    this.dateFormat = dateFormat;
    this.appUser = appUser;
    this.lastLogin = lastLogin;
  }
}

export const UserModel = {
  fromFirestore(data: any, id: string): User {
    return new User(
      id,
      data.email,
      data.opRole ?? data.role,
      data.officesIds,
      data.signInProviders ?? [data.signInProvider],
      data.lsp,
      data.dateFormat,
      data.appUser,
      data.lastLogin,
    );
  },
};
