import { Planets } from "./utils/types";

export const PlanetTooltips: Record<Planets, JSX.Element> = {
  [Planets.Mercury]: (
    <div>
      Total Size: 3,032 miles (4,879 km)<br />
      Number of Moons: 0<br/>
      Revolution Period: 88 days<br />
      Rotation Period: 59 days<br />
    </div>
  ),
  [Planets.Venus]: (
    <div>
      Total Size: 7,521 miles (12,104 km)<br />
      Number of Moons: 0<br/>
      Revolution Period: 224.7 days<br />
      Rotation Period: 243 days<br />
    </div>
  ),
  [Planets.Earth]: (
    <div>
      Total Size: 7,926 miles (12,756 km)<br />
      Number of Moons: 1<br/>
      Revolution Period: 365.25 days<br />
      Rotation Period: 1 day<br />
    </div>
  ),
  [Planets.Mars]: (
    <div>
      Total Size: 4,212 miles (6,780 km)<br />
      Number of Moons: 2<br/>
      Revolution Period: 687 days<br />
      Rotation Period: 24.6 hours<br />
    </div>
  ),
  [Planets.Jupiter]: (
    <div>
      Total Size: 86,881.4 miles (139,822 km)<br />
      Number of Moons: 95<br/>
      Revolution Period: 4,333 days<br />
      Rotation Period: 10 hours<br />
    </div>
  ),
  [Planets.Saturn]: (
    <div>
      Total Size: 74,897 miles (120,500 km)<br />
      Number of Moons: 146<br/>
      Revolution Period: 10,755.7 days<br />
      Rotation Period: 10.5 hours<br />
    </div>
  ),
  [Planets.Uranus]: (
    <div>
      Total Size: 31,763 miles (51,118 km)<br />
      Number of Moons: 28<br/>
      Revolution Period: 30,687 days<br />
      Rotation Period: 17 hours<br />
    </div>
  ),
  [Planets.Neptune]: (
    <div>
      Total Size: 30,775 miles (49,528 km)<br />
      Number of Moons: 16<br/>
      Revolution Period: 60,190 days<br />
      Rotation Period: 16 hours<br />
    </div>
  ),
}
