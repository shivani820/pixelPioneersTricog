// Function to generate all 30 min slots between 8 AM and 10 PM
const generateSlots = (startHour = 8, endHour = 22) => {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    for (let min of [0, 30]) {
      const start = new Date(2025, 0, 1, hour, min);
      const end = new Date(start.getTime() + 30 * 60000);

      const formatTime = (date) =>
        date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

      slots.push({ time: `${formatTime(start)} - ${formatTime(end)}`, isBooked: false });
    }
  }
  return slots;
}

export default generateSlots;