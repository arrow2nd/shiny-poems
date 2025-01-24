"use client";

import Wave from "react-wavify";
import { updatedAtUTC } from "data/poems";
import Links from "./links";

const Footer = () => (
  <footer className="w-full font-sans">
    <Wave
      className="relative top-0.5 h-24 align-bottom"
      fill="#4C7ABE"
      paused={false}
      options={{
        height: 8,
        amplitude: 20,
        speed: 0.155
      }}
    />
    <div className="bg-main flex flex-col items-center justify-center px-8 pt-0.5 pb-20 text-center text-sm tracking-wider text-white">
      <Links />
      <span className="mb-8 w-8 border-b-2 border-dashed border-white" />
      <span className="mb-2" data-testid="last-updated">
        Last updated : {updatedAtUTC}
      </span>
      <span>
        The rights to all content related to THE IDOLM@STER™ belong to Bandai
        Namco Entertainment Inc.
      </span>
    </div>
  </footer>
);

export default Footer;
