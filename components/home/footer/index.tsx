"use client";

import Wave from "react-wavify";

import { updatedAtUTC } from "data/poem-list";

import Links from "./links";

const Footer = () => (
  <footer className="w-full">
    <Wave
      className="relative h-24 top-0.5 align-bottom"
      fill="#4C7ABE"
      paused={false}
      options={{
        height: 8,
        amplitude: 20,
        speed: 0.155
      }}
    />
    <div className="flex flex-col items-center justify-center px-8 pt-0.5 pb-20 tracking-wider text-sm text-center text-white bg-main">
      <Links />
      <span className="w-8 mb-8 border-b-2 border-dashed border-white" />
      <span className="mb-2" data-testid="last-updated">
        Last updated : {updatedAtUTC}
      </span>
      <span>
        The rights to all content related to THE IDOLM@STER belong to BANDAI
        NAMCO Entertainment Inc.
      </span>
    </div>
  </footer>
);

export default Footer;
