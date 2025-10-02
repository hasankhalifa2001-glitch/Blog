import React from "react";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import WebHostingPlan from "@/components/home/WebHostingPlan";

export const dynamic = 'force-dynamic';

const Home = () => {
  return (
    <section className="home">
      <Hero />
      <div className="text-center font-semibold text-3xl mt-10">
        Choose Your Web Hosting Plan
      </div>
      <div className="container m-auto flex justify-center items-center my-7 flex-wrap md:gap-7">
        <WebHostingPlan />
        <WebHostingPlan />
        <WebHostingPlan />
      </div>
    </section>
  );
};

export default Home;
