import React, { useEffect } from "react";
import * as GlamAR from "@glamario/core-web";

export default function GlamARDemo({ accessToken }) {
  useEffect(() => {
    const config = {
      platform: "web",
      meta: { sdkVersion: "2.0.0" },
    };

    GlamAR.init("container__frame_wrapper", accessToken, config);
    GlamAR.addEventListener("*", eventHandler);

    return () => {
      if (GlamAR && typeof GlamAR.destroy === "function") {
        GlamAR.destroy();
      }
    };
  }, [accessToken]);

  const onCategoryClick = () => {
    GlamAR.applyByCategory("sunglasses");
  };
  const onResetClick = () => {
    GlamAR.reset();
  };
  const onSnapShotClick = () => {
    GlamAR.snapshot();
  };

  const eventHandler = (e) => {
    console.log("handle all your action based on the event", e);

    switch (e) {
      case "loaded":
        //fired when sdk is loaded
        break;
      case "sku-applied":
        //fired desired sku is applied
        break;
    }
  };

  return (
    <>
      <div id="container__frame_wrapper" />
      <div className="cta-root">
        <div className="cta-tabs">
          <button id="CTA" onClick={onCategoryClick}>
            Apply category
          </button>
          <button id="CTA" onClick={onResetClick}>
            Reset
          </button>
          <button id="CTA" onClick={onSnapShotClick}>
            snapshot
          </button>
        </div>
      </div>
    </>
  );
}
