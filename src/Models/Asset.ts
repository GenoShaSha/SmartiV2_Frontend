// import { Timestamp } from "firebase/firestore";

export class Assets {
    companyId: string;
    assetId: string;
    dateOfRegister: Date;
    assetType: string;
    tagId: string;

constructor(
    companyId: string,
    assetId: string,
    dateOfRegister: Date,
    assetType: string,
    tagId: string,
) {
    this.companyId = companyId;
    this.assetId = assetId;
    this.dateOfRegister = dateOfRegister;
    this.assetType =assetType;
    this.tagId = tagId;
}

}


export const assetModel = {
fromFirestore(data: any, companyId: string): Assets {
    return new Assets(
    companyId,
    data.assetId,
    data.dateOfRegister,
    data.assetType,
    data.tagId,
    );
},
};
