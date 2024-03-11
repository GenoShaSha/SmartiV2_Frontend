export interface Office {
    documentId: string;
    name: string | undefined;
    processing: string | undefined;
    features: string[];
    email_addresses: string[];
    site_names: string[];
  }
  
  export enum officeModalEnum {
    editing,
    adding,
    Unknown,
  }
  
  export function fromString(enumAsString: String): officeModalEnum {
    switch (enumAsString) {
      case "editing": {
        return officeModalEnum.editing;
      }
      case "adding": {
        return officeModalEnum.adding;
      }
      default: {
        return officeModalEnum.Unknown;
      }
    }
  }
  