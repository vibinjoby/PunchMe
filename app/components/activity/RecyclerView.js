import React, { useState } from "react";
import { FlatList } from "react-native";
import FontLoad from "./FontLoad";
import { AppLoading } from "expo";

import HistoryHeadingView from "./items/HistoryHeadngView";
import LogView from "./items/LogView";
import ScheduleView from "./items/ScheduleView";
import OverView from "./items/OverView";

export default function RecyclerView(props) {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const data = [
    {
      type: 0,
      id: 1,
      title: "nothing",
    },
    {
      type: 1,
      id: 2,
      title: "nothing",
    },
    {
      type: 2,
      id: 3,
      title: "nothing",
    },
    {
      type: 3,
      id: 4,
      title: "nothing",
    },
    {
      type: 3,
      id: 5,
      title: "nothing",
    },
    {
      type: 3,
      id: 6,
      title: "nothing",
    },
    {
      type: 3,
      id: 7,
      title: "nothing",
    },
  ];

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={FontLoad}
        onFinish={() => {
          setFontLoaded(true);
          setRefreshing(false);
        }}
      />
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => {
        item.id;
      }}
      renderItem={createViewHolder}
    />
  );
}

const createViewHolder = ({ item }) => {
  const viewType = getViewType(item);
  if (viewType == 0) {
    return ScheduleView(item);
  } else if (viewType == 1) {
    return OverView(item);
  } else if (viewType == 2) {
    return HistoryHeadingView(item);
  } else {
    return LogView();
  }
};

const getViewType = (item) => {
  return item.type;
};
