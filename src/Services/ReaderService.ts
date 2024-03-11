import { ref, get, onValue } from "firebase/database";
import { database, storage } from "./FirebaseService";
import { v4 } from "uuid";
import moment from "moment";
import FileUtils from "../Utils/FileUtils";
import { Reader } from "../Models/Reader";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserState } from "../Features/userSlice";
import dayjs from "dayjs";

export const useReadersService = () => {
  const { user } = useSelector(selectUserState);
  const [readers, setReaders] = React.useState<Reader[]>([]);
  const [filteredReaders, setFilteredReaders] = React.useState<Reader[]>([]);
  const [dateRange, setdateRange] = React.useState([null, null]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (!user || !user.customerId || !user.clientId) return setReaders([]);
    setLoading(true);


    let queryPath = `customers/${user.customerId}/readPoints`;
    let readersRef = ref(database, queryPath);

    if (user.role === "superAdmin" || user.clientId === "aZdK7hRGJdTS7qxMbIg2") {
      readersRef = ref(database, queryPath);
    }

    if (dateRange?.[0] && dateRange?.[1] && dayjs(dateRange?.[0])?.isValid() && dayjs(dateRange?.[1])?.isValid()) {
      let start = dayjs(dateRange[0]).startOf("day").toDate().getTime();
      let end = dayjs(dateRange[1]).endOf("day").toDate().getTime();
      readersRef = ref(database, queryPath);
      // Include the appropriate query logic based on your Realtime Database structure and data model
    }

    const unsubscribeReadersListener = onValue(readersRef, (snapshot) => {
      const readersData = snapshot.val();
      if (readersData) {
        const readersArray = Object.keys(readersData).map((key) => {
          const reader = readersData[key];
          return {
            ...reader,
            id: key,
            name: key,
            lastChanged: key,
            lastFetched: key,
            mode: key,
            slug: key,

          };
        });
        setReaders(readersArray);
        setLoading(false);
      } else {
        setReaders([]);
        setLoading(false);
      }
    });

    return () => {
      console.log("unsubscribeReadersListener");
      unsubscribeReadersListener();
    };
  }, [database, dateRange]);

  useEffect(() => {
    // Logic to fetch ritmeester agents list from Realtime Database
  }, []);

  // Include the rest of your functions (createOrders, updateOrder, etc.)

  return {
    // Return necessary state and functions
    readers
  };
};
