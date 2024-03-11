export class CustomerInfo {
    documentId: string | undefined;
    companyName: string;
    address: string;
    zipCode: string;
    country: string;
    vatNumber: string;
    chamberOfCommerce: string;
    generalContactName: string;
    generalContactEmail: string;
    generalContactPhoneNumber: string;
    financeContactName: string;
    financeContactEmail: string;
    financeContactPhoneNumber: string;
    bookingEscalationContactName: string;
    bookingEscalationContactEmail: string;
    bookingEscalationContactPhoneNumber: string;
  
    constructor(
      documentId: string | undefined,
      companyName: string,
      address: string,
      zipCode: string,
      country: string,
      vatNumber: string,
      chamberOfCommerce: string,
      generalContactName: string,
      generalContactEmail: string,
      generalContactPhoneNumber: string,
      financeContactName: string,
      financeContactEmail: string,
      financeContactPhoneNumber: string,
      bookingEscalationContactName: string,
      bookingEscalationContactEmail: string,
      bookingEscalationContactPhoneNumber: string,
    ) {
      this.documentId = documentId;
      this.companyName = companyName;
      this.address = address;
      this.zipCode = zipCode;
      this.country = country;
      this.vatNumber = vatNumber;
      this.chamberOfCommerce = chamberOfCommerce;
      this.generalContactName = generalContactName;
      this.generalContactEmail = generalContactEmail;
      this.generalContactPhoneNumber = generalContactPhoneNumber;
      this.financeContactName = financeContactName;
      this.financeContactEmail = financeContactEmail;
      this.financeContactPhoneNumber = financeContactPhoneNumber;
      this.bookingEscalationContactName = bookingEscalationContactName;
      this.bookingEscalationContactEmail = bookingEscalationContactEmail;
      this.bookingEscalationContactPhoneNumber = bookingEscalationContactPhoneNumber;
    }
  }
  
  export const CustomerInfoModel = {
    fromFirestore(data: any): CustomerInfo {
      return new CustomerInfo(
        "information",
        data.companyName,
        data.address,
        data.zipCode,
        data.country,
        data.vatNumber,
        data.chamberOfCommerce,
        data.generalContactName,
        data.generalContactEmail,
        data.generalContactPhoneNumber,
        data.financeContactName,
        data.financeContactEmail,
        data.financeContactPhoneNumber,
        data.bookingEscalationContactName,
        data.bookingEscalationContactEmail,
        data.bookingEscalationContactPhoneNumber,
      );
    },
  };
  