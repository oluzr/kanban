export const setLocalStorage = (kanban) => {
  localStorage.setItem("kanban", JSON.stringify(kanban));
};

export const statusColor = (status: string) => {
  switch (status) {
    case "todo":
      return "bg-red-100";
    case "doing":
      return "bg-lime-200";
    case "done":
      return "bg-base-300";
    default:
      return "bg-red-200";
  }
};
