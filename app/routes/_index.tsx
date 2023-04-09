import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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

          <article>
            <h3>
              <a href={"/lop/" + nextRace.id}>{nextRace.title}</a>
            </h3>
            <dl>
              <Distance distance={nextRace.routes.map((r) => r.distance)} />
              <Time>{new Date(nextRace.date)}</Time>
            </dl>
          </article>
        </section>
      ) : null}

      <section>
        <h2>Kommende løp</h2>
        <ol>
          {races.upcoming.map((race) => {
            return (
              <li key={race.date}>
                <article>
                  <h3>
                    <a href={"/lop/" + race.id}>{race.title}</a>
                  </h3>
                  {race.description ? <p>{race.description}</p> : null}
                  <dl>
                    <Distance distance={race.routes.map((r) => r?.distance)} />
                    <Time>{new Date(race.date)}</Time>
                  </dl>
                </article>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}

function Distance(props: { distance: number[] }) {
  return (
    <>
      <dt>Distanser</dt>
      <dd>
        {" "}
        {new Intl.ListFormat("no", {
          style: "long",
          type: "conjunction",
        }).format(props.distance.map((l) => l + "km"))}
      </dd>
    </>
  );
}

function Time(props: { children: Date }) {
  return (
    <>
      <dt>Dato</dt>
      <dd>
        <time dateTime={props.children.toISOString()}>
          {new Intl.DateTimeFormat("no", {
            dateStyle: "full",
          }).format(props.children)}
        </time>
      </dd>
    </>
  );
}
