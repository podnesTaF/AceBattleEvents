import { EventCard, IFutureEvent } from "@/src/entities/Event";
import { CustomSlider } from "@/src/shared/ui";

export const EventCardSlider = ({
  events,
}: {
  events: IFutureEvent[];
}): JSX.Element => {
  return (
    <section>
      <CustomSlider
        childPropName={"event"}
        items={events}
        ItemComponent={EventCard}
        title={"Close Events"}
      />
    </section>
  );
};
