export const getRandomColors = () => {
  const colors = [
    {
      textColor: "#093EA7",
      backgroundColor: "#99C0FD",
    },
    {
      textColor: "#7A475D",
      backgroundColor: "#F7C4DD",
    },
    {
      textColor: "#1C4848",
      backgroundColor: "#78C9CC",
    },
    {
      textColor: "#020101",
      backgroundColor: "#FEA399",
    },
    {
      textColor: "#C33938",
      backgroundColor: "#FFD8D9",
    },
    {
      textColor: "#1C8284",
      backgroundColor: "#B3F8FE",
    },
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};
