export const formattedDate = (today: Date): string => {
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
  const day = today.getDate();
  const month = today.toLocaleDateString("en-US", { month: "short" });

  return `${weekday}, ${day} ${month}`;
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isTomorrow = (date: Date): boolean => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
};
