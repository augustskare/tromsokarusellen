import { useLoaderData } from "@remix-run/react";
import races from "~/races.json";
import routes from "~/routes.json";

export function loader() {
  return { races, routes };
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const races = [...data.races];
  const nextRace = races.shift();
  const nextRoute = routes.find((j) => j.id === nextRace!.routeId);

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
      {nextRoute ? (
        <section>
          <h2>Neste løp</h2>

          <article>
            <h3>{nextRoute.name}</h3>
            <dl>
              <Distance distance={nextRoute.length} />
              <Time>{new Date(nextRace!.date)}</Time>
            </dl>
          </article>
        </section>
      ) : null}

      <section>
        <h2>Kommende løp</h2>
        <ul>
          {races.map((race) => {
            const route = routes.find((r) => r.id === race.routeId);
            if (!route) {
              return null;
            }
            return (
              <li key={race.date}>
                <article>
                  <h3>{route?.name}</h3>
                  <dl>
                    <Distance distance={route.length} />
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
