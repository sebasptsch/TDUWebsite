import { z } from "zod";
import { procedure, router } from "../trpc";
import env from "../env";
import { TRPCError } from "@trpc/server";
import { Award, OpenAPI, TeamService } from "tba-api-v3client-ts";
import { DateTime } from "luxon";

function onlyUnique(value: number, index: number, self: number[]) {
  return self.indexOf(value) === index;
}

interface BlueAward extends Award {
  blue: boolean;
}

const tbaRouter = router({
  events: procedure.input(z.void()).query(async () => {
    const tbaKey = env.TBA_KEY;
    if (!tbaKey)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "TBA_KEY not set",
      });

    OpenAPI.HEADERS = {
      "X-TBA-Auth-Key": tbaKey,
    };

    const tbaTeamEvents = await TeamService.getTeamEventsSimple("frc3132");

    // Event dates are in Event end date in yyyy-mm-dd format. Parse this using luxon

    const upcomingEvents = tbaTeamEvents.filter((event) => {
      const eventDate = event.end_date;
      const eventDateTime = new Date(eventDate);
      const now = new Date();
      return eventDateTime > now;
    });

    const withOngoingEvents = upcomingEvents.map((event) => {
      const eventDate = event.end_date;
      const eventDateTime = new Date(eventDate);
      const now = new Date();
      const ongoing = eventDateTime < now;
      return { ...event, ongoing };
    });

    return withOngoingEvents;
  }),
  awards: procedure.input(z.void()).query(async () => {
    const tbaKey = env.TBA_KEY;

    if (!tbaKey)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "TBA_KEY not set",
      });

    OpenAPI.HEADERS = {
      "X-TBA-Auth-Key": tbaKey,
    };

    const awardsFRC3132 = await TeamService.getTeamAwards("frc3132");
    const awardsFRC5331 = await TeamService.getTeamAwards("frc5331");

    const joinedAndSortedAwards = awardsFRC3132
      .concat(awardsFRC5331)
      .sort((a, b) => b.year - a.year);

    const years = joinedAndSortedAwards.map((award) => award.year);
    const uniqueYears = years.filter(onlyUnique);

    const yearsWithAwards: Array<{ year: number; awards: BlueAward[] }> = [];

    uniqueYears.forEach((year) => {
      const awardsForYear = joinedAndSortedAwards
        .filter((award) => award.year === year)
        .map((award) => {
          const { award_type, recipient_list } = award;

          const blue =
            award_type === 0 ||
            award_type === 69 ||
            award_type === 1 ||
            award_type === 3 ||
            award_type === 74;

          const ourRecipients = recipient_list.filter(
            (recipient) =>
              recipient.team_key === "frc3132" ||
              recipient.team_key === "frc5331" ||
              !recipient.team_key
          );

          return { ...award, blue, recipient_list: ourRecipients };
        });

      yearsWithAwards.push({ year, awards: awardsForYear });
    });

    return yearsWithAwards;
  }),
});

export default tbaRouter;
