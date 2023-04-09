import races from "./races.json";
import routes from "./routes.json";

interface RaceRaw {
  id: number;
  title: string;
  description?: string;
  date: string;
  routes: number[];
}

interface Route {
  id: number;
  name: string;
  distance: number;
  gpx: string | null;
}

interface Race extends Omit<RaceRaw, "routes"> {
  routes: Route[];
}

export function getAllRaces(): Race[] {
  return races.map((race) => {
    return {
      ...race,
      routes: race.routes.map((routeId) =>
        routes.find((route) => route.id === routeId)
      ),
    };
  });
}

export function getUpcomingRaces(): Race[] {
  return getAllRaces().filter(
    (race) => new Date(race.date).getTime() >= new Date().getTime()
  );
}
