import { Order } from "../models/Order";

export const searchShipmentsUtil = (term: string = "", array: Order[]) => {
  let searchTerm = term.trim().replace(" ", "").toLowerCase()?.toString();
  if (searchTerm.trim() == "") return array;
  let result: any[] = array?.filter((item, i) => {
    return item.shipmentId?.toLowerCase()?.includes(searchTerm) || item.vesselName?.toLowerCase()?.includes(searchTerm) || item.portName?.toLowerCase()?.includes(searchTerm);
  });
  console.log(result);
  

  return result;
};
export const searchUsersUtil = (term: string = "", array: any[]) => {
  let searchTerm = term.trim().replace(" ", "").toLowerCase();
  if (searchTerm.trim() == "") return array;
  let result: any[] = array?.filter((item, i) => {
    return item.email?.toLowerCase()?.includes(searchTerm) || item.role?.toLowerCase()?.includes(searchTerm);
  });

  return result;
};
export const searchReportsUtil = (term: string = "", array: any[]) => {
  let searchTerm = term.trim().replace(" ", "").toLowerCase();
  if (searchTerm.trim() == "") return array;
  let result: any[] = array?.filter((item, i) => {
    return item.shipmentId?.toLowerCase()?.includes(searchTerm) || item.email?.toLowerCase()?.includes(searchTerm) || item.vesselName?.toLowerCase()?.includes(searchTerm);
  });

  return result;
};
export const searchTasksUtil = (term: string = "", array: any[]) => {
  let searchTerm = term.trim().replace(" ", "").toLowerCase();
  if (searchTerm.trim() == "") return array;
  let result: any[] = array?.filter((item, i) => {
    return (
      item?.id?.toString()?.includes(searchTerm) ||
      item?.vessel?.replaceAll(" ", "")?.trim()?.toLowerCase()?.includes(searchTerm) ||
      item?.orderNo?.trim()?.toLowerCase()?.includes(searchTerm) ||
      item?.site?.trim().replaceAll(" ", "").toLowerCase()?.includes(searchTerm) ||
      item.deliveryNoteId?.toString()?.includes(searchTerm)
    );
  });

  return result;
};
