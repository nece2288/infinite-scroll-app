"use client";

import { useEffect } from "react";

interface AdComponentProps {
  slotId: string;
}

const AdComponent: React.FC<AdComponentProps> = ({ slotId }) => {
  useEffect(() => {
    if (window.googletag) {
      window.googletag = window.googletag || { cmd: [] };

      googletag.cmd.push(() => {
        // Define a fluid ad slot.
        if (
          !googletag
            .pubads()
            .getSlots()
            .find((slot) => slot.getSlotElementId() === slotId)
        ) {
          googletag
            ?.defineSlot(
              "/6355419/Travel/Europe/France/Paris",
              [300, 250],
              slotId
            )
            ?.addService(googletag.pubads());

          // Enable SRA and services.
          googletag.pubads().enableSingleRequest();
          googletag.enableServices();
        }
      });

      googletag.cmd.push(() => {
        // Request and render all previously defined ad slots.
        googletag.display(slotId);
      });
    }
  }, [slotId]);

  return <div id={slotId} className="native-slot"></div>;
};

export default AdComponent;
