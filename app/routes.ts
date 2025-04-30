import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("calendar.ics", "routes/calendar[.ics].tsx"),
] satisfies RouteConfig;
