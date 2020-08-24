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

  const data = props.data;

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
    return <OverView item={item} />;
  } else if (viewType == 2) {
    return HistoryHeadingView(item);
  } else {
    return LogView(item);
  }
};

const getViewType = (item) => {
  return item.type;
};
