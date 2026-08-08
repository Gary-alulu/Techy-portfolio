"use client";

import { useState } from "react";
import Configurator from "@/components/services/Configurator";
import WhoIHelp from "@/components/services/WhoIHelp";
import ProblemsISolve from "@/components/services/ProblemsISolve";
import ServiceCategories from "@/components/services/ServiceCategories";
import ProcessJourney from "@/components/services/ProcessJourney";
import Deliverables from "@/components/services/Deliverables";
import TechStack from "@/components/services/TechStack";
import FeaturedWork from "@/components/services/FeaturedWork";
import type { ServiceType } from "@/app/services/page";

export default function ServicesClientWrapper({ initialProjects = [] }: { initialProjects?: any[] }) {
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);

  return (
    <>
      <Configurator selected={selectedServices} onChange={setSelectedServices} />
      <WhoIHelp />
      <ProblemsISolve />
      <ServiceCategories />
      <ProcessJourney selected={selectedServices} />
      <Deliverables selected={selectedServices} />
      <TechStack selected={selectedServices} />
      <FeaturedWork selected={selectedServices} projects={initialProjects} />
    </>
  );
}
