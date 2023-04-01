import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllRaces } from "~/data/races.server";

export function loader() {
  const races = getAllRaces();
  return json({ races });
}

export default function Index() {
  const { races } = useLoaderData<typeof loader>();

  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>Tromsøkarusellen</h1>
        <a href="/calendar.ics">Abonner i din kalender</a>
      </header>
      {/* {nextRoute ? (
        <section>
          <h2>Neste løp</h2>

          <article>
            <h3>{nextRoute.title}</h3>
            <dl>
              <Distance distance={nextRoute.routes.map((r) => r.distance)} />
              <Time>{new Date(nextRace!.date)}</Time>
            </dl>
          </article>
        </section>
      ) : null} */}

      <section>
        <h2>Kommende løp</h2>
        <ul>
          {races.map((race) => {
            return (
              <li key={race.date}>
                <article>
                  <h3>{race.title}</h3>
                  <dl>
                    <Distance distance={race.routes.map((r) => r?.distance)} />
                    <Time>{new Date(race.date)}</Time>
                  </dl>
                </article>
              </li>
            );
          })}
        </ul>
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
