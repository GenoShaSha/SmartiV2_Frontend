export class Customer {
    documentId: string;
    companyName: string;
    clientStatus: string;
    clientCategory: string;
  
    constructor(documentId: string, companyName: string, clientStatus: string, clientCategory: string) {
      this.documentId = documentId;
      this.companyName = companyName;
      this.clientStatus = clientStatus;
      this.clientCategory = clientCategory;
    }
  }
  
  export const CustomerModel = {
    fromFirestore(data: any, id: string): Customer {
      return new Customer(id, data.companyName, data.clientStatus, data.clientCategory);
    },
  };
  