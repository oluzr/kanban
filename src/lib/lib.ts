export const setLocalStorage = (kanban) => {
  localStorage.setItem("kanban", JSON.stringify(kanban));
};
