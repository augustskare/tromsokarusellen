import races from "./races.json";
import routes from "./routes.json";

interface RaceRaw {
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
