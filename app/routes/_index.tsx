import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Race } from "~/data/races.server";
import { getUpcomingRaces } from "~/data/races.server";

export function loader() {
  const races = getUpcomingRaces();
  const next = races.shift();
  const upcoming = races;
  return json({ races: { next, upcoming } });
}

export default function Index() {
  const { races } = useLoaderData<typeof loader>();
  const nextRace = races.next;
  return (
    <>
      {nextRace ? (
        <section>
          <h2>Neste løp</h2>

          <SingleRace race={nextRace} />
        </section>
      ) : null}

      <section>
        <h2>Kommende løp</h2>
        <ol>
          {races.upcoming.map((race) => {
            return (
              <li key={race.date}>
                <SingleRace race={race} />
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}

function SingleRace({ race }: { race: Race }) {
  const date = new Date(race.date);
  return (
    <article>
      <h3>{race.title}</h3>
      <time dateTime={date.toISOString()}>
        {new Intl.DateTimeFormat("no", {
          day: "2-digit",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
        }).format(date)}
      </time>
      <p>
        Distanse:{" "}
        {new Intl.ListFormat("no", {
          style: "long",
          type: "conjunction",
        }).format(race.routes.map((r) => r.distance).map((l) => l + "km"))}
      </p>
    </article>
  );
}
