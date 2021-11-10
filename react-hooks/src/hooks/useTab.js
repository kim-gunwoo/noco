import { useState } from "react";

export const useTab = (initialTabIndex, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(
    allTabs && !Array.isArray(allTabs) ? initialTabIndex : false
  );

  if (!currentIndex) {
    return;
  }

  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex,
  };
};
