const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCalEventsForMonth = async (startOfHoliday, endOfHoliday) => {
  try {
    const result =
      await prisma.$queryRaw`select distinct nameEn,event_date from employee_calendar_events where event_date between ${startOfHoliday} and ${endOfHoliday}`;
    // const monEvents = await prisma.employee_calendar_events.findMany({
    //   where: { event_date: startOfHoliday, event_date: endOfHoliday },
    //   select: {
    //     nameEn: true,
    //     event_date: {
    //       where: {
    //         event_date: { gte: new Date(startOfHoliday) },
    //         event_date: { lte: new Date(endOfHoliday) },
    //       },
    //     },
    //   },
    // });
    //console.log("Events fetched", result);
    return result;
  } catch (err) {
    console.log("Error fetching calendar events");
  }
};

const addEvent = async (eventDate, eventName) => {
  try {
    const result =
      await prisma.$queryRaw`insert into employee_calendar_events (event_date,nameEn) values (${eventDate}, ${eventName})`;
    console.log("add events result", result);
    return result;
  } catch (err) {
    console.log("Error updating event");
  }
};

const editEvent = async (eventDate,  eventName) =>{
try {
  const result = await prisma.$queryRaw`update employee_calendar_events set event_date=${eventDate}`

} catch (err) {
  console.log("Error editing event")
}

 
}
module.exports = { getCalEventsForMonth, addEvent };
