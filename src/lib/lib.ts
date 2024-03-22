export const setLocalStorage = (kanban) => {
  localStorage.setItem("kanban", JSON.stringify(kanban));
};

export const statusColor = (status: string) => {
  switch (status) {
    case "todo":
      return "bg-red-100";
    case "doing":
      return "bg-primary";
    case "done":
      return "bg-lime-500";
  }
};
