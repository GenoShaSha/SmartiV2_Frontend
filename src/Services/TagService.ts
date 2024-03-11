import { ref, get, onValue } from "firebase/database";
import { database, storage } from "./FirebaseService";
import { v4 } from "uuid";
import moment from "moment";
import FileUtils from "../Utils/FileUtils";
import { Tag } from "../Models/Tag";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserState } from "../Features/userSlice";
import dayjs from "dayjs";

export const useTagsService = (range: any = [null, null]) => {
  const { user } = useSelector(selectUserState);
  const [tag, setTags] = React.useState<Tag[]>([]);
  const [dateRange, setdateRange] = React.useState([null, null]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (range?.[0] !== null && range?.[1] !== null) setdateRange(range);
  }, [range]);

  useEffect(() => {
    if (!user || !user.customerId || !user.clientId) return setTags([]);
    setLoading(true);


    let queryPath = `customers/${user.customerId}/tags`;
    let tagsRef = ref(database, queryPath);

    if (user.role === "superAdmin" || user.clientId === "aZdK7hRGJdTS7qxMbIg2") {
      tagsRef = ref(database, queryPath);
    }

    if (dateRange?.[0] && dateRange?.[1] && dayjs(dateRange?.[0])?.isValid() && dayjs(dateRange?.[1])?.isValid()) {
      let start = dayjs(dateRange[0]).startOf("day").toDate().getTime();
      let end = dayjs(dateRange[1]).endOf("day").toDate().getTime();
      tagsRef = ref(database, queryPath);
      // Include the appropriate query logic based on your Realtime Database structure and data model
    }

    const unsubscribeTagsListener = onValue(tagsRef, (snapshot) => {
      const tagsData = snapshot.val();
      if (tagsData) {
        const tagsArray = Object.keys(tagsData).map((key) => {
          const tag = tagsData[key];
          return {
            ...tag,
            id: key,
            name: key,
            lastChanged: key,
            lastFetched: key,
            mode: key,
            slug: key,

            // Include additional transformations as needed
          };
        });
        setTags(tagsArray);
        setLoading(false);
      } else {
        setTags([]);
        setLoading(false);
      }
    });

    return () => {
      console.log("unsubscribeTagsListener");
      unsubscribeTagsListener();
    };
  }, [database, dateRange]);

  useEffect(() => {
    // Logic to fetch ritmeester agents list from Realtime Database
  }, []);

  // Include the rest of your functions (createOrders, updateOrder, etc.)

  return {
    // Return necessary state and functions
  };
};
