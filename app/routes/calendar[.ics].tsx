import type { EventAttributes } from "ics";
import { createEvents as icsCreateEvents } from "ics";
import { getAllRaces } from "~/data/races.server";

export async function loader() {
  try {
    const events = await createEvents(
      getAllRaces().map((race) => {
        const date = new Date(race.date);

        return {
          calName: "Tromsøkarusellen",
          title: "Tromsøkarusellen",
          description: race.title,
          duration: { hours: 1 },
          start: [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
          ],
        };
      })
    );

    return new Response(events, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {}

  return new Response("Server error", { status: 500 });
}

function createEvents(events: EventAttributes[]): Promise<string> {
  return new Promise((resolve, reject) => {
    icsCreateEvents(events, (error, value) => {
      if (error) {
        return reject(error);
      }

      return resolve(value);
    });
  });
}
