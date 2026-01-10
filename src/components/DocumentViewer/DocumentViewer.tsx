'use client';

import { useEffect } from 'react';
import { X, FileText, Globe, Shield, Building2, Landmark, MapPin, DollarSign, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ title, icon, children, className }) => (
  <div className={cn('mb-8', className)}>
    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
      <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
    </div>
    <div className="text-sm text-slate-600 leading-relaxed space-y-3">
      {children}
    </div>
  </div>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mt-4">
    <h4 className="text-sm font-semibold text-slate-700 mb-2">{title}</h4>
    <div className="text-sm text-slate-600 leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

const PillarCard: React.FC<{ number: number; title: string; description: string }> = ({ number, title, description }) => (
  <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
    <div className="flex items-center gap-2 mb-2">
      <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">{number}</span>
      <h5 className="font-semibold text-blue-800">{title}</h5>
    </div>
    <p className="text-sm text-blue-700">{description}</p>
  </div>
);

const GuidingQuestion: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
    <HelpCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
    <span className="text-sm text-amber-800">{children}</span>
  </li>
);

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ isOpen, onClose }) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-4 sm:inset-8 md:inset-12 lg:inset-16 xl:inset-20 flex items-center justify-center">
        <div className="w-full h-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 fade-in-0 duration-300">
          {/* Header */}
          <div className="flex-shrink-0 px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Drug Trafficking in Latin America</h2>
                  <p className="text-xs text-slate-400">United Nations Office on Drugs and Crime</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-6">
              <div className="max-w-3xl mx-auto">
                {/* Authors */}
                <div className="mb-6 p-4 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-600">
                  <p><strong>Original authors:</strong> Gaston Slupski, Anastasia Demydenko and Keren Guttman</p>
                  <p><strong>Rewritten by:</strong> Li-or Pinchas</p>
                </div>

                {/* Introduction to UNODC */}
                <Section title="Introduction to the United Nations Office on Drugs and Crime (UNODC)" icon={<Building2 className="w-4 h-4" />}>
                  <p>
                    The United Nations Office on Drugs and Crime (UNODC) is the core United Nations entity mandated to address the interconnected threats of illicit drugs and international crime. Established in 1997, it resulted from the merger of the United Nations International Drug Control Programme (UNDCP) and the Crime Prevention and Criminal Justice Division (CPCJ). Headquartered in Vienna, the UNODC serves as an essential global resource for Member States seeking to promote security, justice, and the rule of law.
                  </p>
                </Section>

                {/* UNODC Mandate and Pillars */}
                <Section title="The UNODC Mandate and Pillars of Work" icon={<Landmark className="w-4 h-4" />}>
                  <p>
                    The overarching mission of the UNODC is to contribute to global peace, security, human rights, and development by making the world safer from drugs, organized crime, corruption, and terrorism (UNODC Strategy 2021-2025). The Office delivers its mandate through three mutually reinforcing pillars of work:
                  </p>
                  <div className="space-y-3 mt-4">
                    <PillarCard
                      number={1}
                      title="Normative Work"
                      description="Serving as the guardian of international conventions (such as the three international drug control conventions and the UN Convention against Transnational Organized Crime, Palermo Convention) and providing secretarial services to governing bodies like the Commission on Narcotic Drugs (CND)."
                    />
                    <PillarCard
                      number={2}
                      title="Research & Analysis"
                      description="Generating objective data, analysis, and research on global drug and crime trends to inform policy and practice. Key outputs include the annual World Drug Report and the Global Report on Trafficking in Persons."
                    />
                    <PillarCard
                      number={3}
                      title="Technical Cooperation"
                      description="Providing technical assistance and expertise to Member States (especially low/middle-income countries) to strengthen their legal frameworks, law enforcement, criminal justice institutions, and border management."
                    />
                  </div>
                </Section>

                {/* Funding Structure */}
                <Section title="Funding Structure and Challenges" icon={<DollarSign className="w-4 h-4" />}>
                  <p>
                    A critical element of the UNODC&apos;s operational reality is its financial structure. The Office relies heavily on voluntary contributions, primarily from governments, for approximately 90% of its budget.
                  </p>
                  <p>
                    A significant challenge is that most contributions are heavily earmarked (or special-purpose), meaning they are tightly restricted by the donor for specific projects or regions. This reliance on earmarked funds, as noted in management reviews, limits the flexibility and sustainability of the UNODC&apos;s core functions (like research and policy support) and can lead to a donor-driven rather than a purely mandate-driven agenda.
                  </p>
                </Section>

                {/* Background on Drug Trafficking */}
                <Section title="Background on Drug Trafficking: Scale and Scope" icon={<Globe className="w-4 h-4" />}>
                  <p>
                    Drug trafficking is defined as the global, illicit trade involving the cultivation, production, distribution, and sale of substances controlled by international drug conventions. Key categories of illicit drugs include cocaine, heroin/opioids (including synthetic opioids like fentanyl), cannabis, and amphetamine-type stimulants (ATS) like methamphetamine.
                  </p>

                  <SubSection title="The Scale of the Illicit Market">
                    <p>
                      The global illicit drug market remains one of the world&apos;s largest transnational criminal enterprises. While precise figures are challenging to ascertain due to the nature of the economy, it generates hundreds of billions of U.S. dollars annually, posing a significant challenge to global financial stability and occupying a substantial portion of the global criminal economy.
                    </p>
                    <p>
                      Drug trafficking is not an isolated crime; it functions as a central driver of instability, violence, and insecurity worldwide, feeding a vicious cycle that undermines governance and development.
                    </p>
                  </SubSection>

                  <SubSection title="Fueling Transnational Organized Crime (TOC)">
                    <p>
                      The illicit drug market provides the primary revenue stream for Transnational Organized Crime (TOC) groups. These Drug Trafficking Organizations (DTOs) are highly adaptive and utilize their profits and criminal networks to engage in a wide array of other illicit activities, including money laundering, arms trafficking, human trafficking, and increasingly, illegal resource extraction (such as illegal mining and logging).
                    </p>
                    <p>
                      This convergence of criminal activities empowers TOC groups by diversifying their income streams, expanding their global reach, and destabilizing regions far beyond the primary trafficking routes. The sheer financial scale of this activity necessitates a sophisticated, multilateral response focusing on disrupting illicit financial flows.
                    </p>
                  </SubSection>

                  <SubSection title="Corruption and Governance Erosion">
                    <p>
                      The enormous, unregulated profits generated by the drug trade are systematically used to corrupt high-level officials across government, law enforcement, and the judiciary. This widespread corruption profoundly undermines the rule of law, erodes public trust in democratic institutions, and cripples a state&apos;s capacity to effectively enforce its laws and assert its sovereign authority.
                    </p>
                    <p>
                      When institutions are captured by criminal interests, the state becomes less capable of providing security and justice, directly impacting socioeconomic development and the ability of the country to implement international treaties and conventions advocated by the UNODC.
                    </p>
                  </SubSection>

                  <SubSection title="Geopolitical Instability and Violence">
                    <p>
                      Drug trafficking is particularly destabilising in countries with pre-existing governance issues or conflict, turning these areas into key flashpoints of violence. Competition over lucrative trafficking routes and markets frequently triggers extreme violence, including high rates of homicide and brutality, which has been acutely observed in countries along the cocaine supply chain, such as Ecuador.
                    </p>
                    <p>
                      Furthermore, in some regions, illegal armed groups and insurgents generate funds by taxing or managing drug production and trafficking, effectively turning illicit drug revenue into a key source for sustaining conflict and insurgency. The violence associated with trafficking is often not just limited to rival criminal groups but is deliberately targeted against journalists, civil society leaders, and state officials, posing a direct threat to civil society and democratic freedoms.
                    </p>
                  </SubSection>
                </Section>

                {/* Drug Trafficking in Latin America */}
                <Section title="Drug Trafficking in Latin America: The Evolving Drug Landscape" icon={<MapPin className="w-4 h-4" />}>
                  <p>
                    Latin America remains the most crucial geographic zone for the global supply of several illicit substances, most notably cocaine, and increasingly, synthetic drugs. The region&apos;s role is defined by a dynamic and evolving chain: production in the Andean Region, transit through Central America and the Caribbean, and distribution to major consumption markets in North America and Europe.
                  </p>

                  <SubSection title="Production and Supply Chain Realities">
                    <p>
                      The Andean countries, Colombia, Peru, and Bolivia, continue to constitute the world&apos;s exclusive supply of the coca plant and are the primary producers of cocaine. Global cocaine manufacture has surged to unprecedented levels, with the latest UNODC data indicating record highs in potential manufacture, driven by increased cultivation of the coca bush, particularly in Colombia, which remains the largest producer by volume.
                    </p>
                    <p>
                      While Mexico and Central America remain the principal transit corridor for cocaine destined for the vast North American market, there has been a notable rise in maritime trafficking directly from South America to Europe. This transatlantic route often utilises large commercial container ports, which have elevated the prominence of countries like Ecuador and Brazil&apos;s coastal areas as significant export hubs.
                    </p>
                    <p>
                      Narcotics continue to be transported using sophisticated methods, from standard commercial vessels to purpose-built narco-submarines (semi-submersible and fully-submersible vessels), manufactured in remote regions to evade detection.
                    </p>
                  </SubSection>

                  <SubSection title="The Evolution of Transnational Criminal Organisations (TOCs)">
                    <p>
                      The structure of major Drug Trafficking Organisations (DTOs) has fundamentally changed since the era of the hierarchical, centralised Medellín and Cali Cartels of the 1980s and 1990s. Modern TOCs, such as the Sinaloa Cartel and the Jalisco New Generation Cartel (CJNG) in Mexico, often operate more as fluid, decentralised networks or &quot;franchise models.&quot; These modern DTOs specialise in distinct parts of the supply chain and purchase raw material from smaller, independent cultivation groups.
                    </p>
                    <p>
                      Furthermore, the most destabilising modern development is Mexico&apos;s leading role in the illicit manufacture and trafficking of synthetic opioids, particularly fentanyl, destined for the U.S. market. This shift to synthetics requires fewer physical resources than traditional plant-based drugs and offers extremely high profits, significantly altering the criminal landscape.
                    </p>
                  </SubSection>

                  <SubSection title="Consequences for Latin American States">
                    <p>
                      The consequences of drug trafficking permeate the political, economic, and social fabric of Latin American nations. The immense cash flow sustains deep-seated corruption at all levels of government, law enforcement, and the judiciary. This corruption ensures impunity for criminal acts, crippling a state&apos;s capacity to enforce its laws and assert its sovereign authority.
                    </p>
                    <p>
                      Drug-related violence, characterised by extreme brutality, continues to escalate in transit and production countries. The recent security crisis in Ecuador, marked by criminal attacks on state institutions, exemplifies the direct threat that TOCs pose to state sovereignty and stability.
                    </p>
                    <p>
                      In production zones, illicit activities also cause severe environmental degradation through deforestation and the chemical dumping associated with processing coca into cocaine. Finally, the integration of Latin American economies and the massive growth in legitimate trade flows have unintentionally created opportunities for criminal groups, who increasingly rely on formal border crossings and ports of entry to intermingle illicit goods and cash with legitimate commercial containers, making detection more complex.
                    </p>
                  </SubSection>
                </Section>

                {/* UNODC Actions */}
                <Section title="UNODC's Actions Against Drug Trafficking in Latin America" icon={<Shield className="w-4 h-4" />}>
                  <p>
                    As the specialised body of the UN on drug and crime issues, the UNODC&apos;s strategy in Latin America is defined by its Strategic Vision for Latin America and the Caribbean 2022-2025. This vision focuses on providing technical expertise, fostering regional cooperation, and strengthening the entire criminal justice chain to disrupt drug trafficking and associated Transnational Organised Crime (TOC).
                  </p>

                  <SubSection title="UNODC-WCO Passenger and Cargo Control Programme (PCCP)">
                    <p>
                      The UNODC offers crucial assistance to governments in the region to design and implement appropriate responses to drug trafficking. A key program in this area is the UNODC-WCO Passenger and Cargo Control Programme (PCCP). Established in January 2025 through the merger of the Container Control Programme (CCP) and the Airport Communication Project (AIRCOP), the PCCP is a global initiative with extensive involvement in Latin America.
                    </p>
                    <p>
                      Its purpose is to build the capacity of national law enforcement, customs, and police units in seaports, airports, and land border crossings to systematically identify and inspect high-risk cargo containers and passengers. This minimises the risk of commercial trade being exploited for illicit drug trafficking and other forms of TOC. Countries such as Costa Rica, Guatemala, Panama, and Ecuador are actively participating, reflecting the program&apos;s strategic focus on major transit and export hubs.
                    </p>
                  </SubSection>

                  <SubSection title="Strengthening Criminal Justice Institutions">
                    <p>
                      A core component of the UNODC&apos;s work is strengthening the capacity and integrity of criminal justice institutions, moving beyond simple seizures to effective prosecution. The CRIMJUST Global Programme is central to this effort, implemented in partnership with INTERPOL and focusing on disrupting criminal networks operating along illicit trafficking routes.
                    </p>
                    <p>
                      The program&apos;s main goal is to strengthen transnational investigations and enhance the capacity of prosecutors and judges to successfully prosecute TOC cases. This includes promoting post-seizure investigations to trace illicit financial flows and target high-value figures within the criminal networks, rather than just low-level actors.
                    </p>
                    <p>
                      CRIMJUST holds regular investigative case forums and training sessions with officials from key countries like Argentina, Brazil, Colombia, Dominican Republic, Ecuador, and Panama to build effective regional cooperation and utilise advanced investigative techniques. Furthermore, UNODC has launched targeted initiatives like &quot;Operation Azure,&quot; which is specifically designed to equip countries in the region with the resources needed to investigate and prosecute the trafficking of the increasingly important threat of synthetic opioids.
                    </p>
                  </SubSection>
                </Section>

                {/* Guiding Questions */}
                <Section title="Guiding Questions for MUN Delegates" icon={<HelpCircle className="w-4 h-4" />}>
                  <p className="mb-4">Consider these questions as you prepare for the simulation:</p>
                  <ul className="space-y-2">
                    <GuidingQuestion>
                      What are the main challenges of UNODC regarding the drug trafficking problem in Latin America this upcoming year?
                    </GuidingQuestion>
                    <GuidingQuestion>
                      What are the direct consequences of drug trafficking in the different Latin American countries?
                    </GuidingQuestion>
                    <GuidingQuestion>
                      What is the policy of my country regarding the fight against drug trafficking?
                    </GuidingQuestion>
                    <GuidingQuestion>
                      Would the legalisation of drugs, such as cannabis, solve the illegal drug trafficking in my country?
                    </GuidingQuestion>
                    <GuidingQuestion>
                      What does my country gain from the support of UNODC in the fight against drug trafficking?
                    </GuidingQuestion>
                    <GuidingQuestion>
                      What are the approaches of different Latin American countries to the current situation?
                    </GuidingQuestion>
                    <GuidingQuestion>
                      What possible compromises in the fight against drug trafficking can be found to satisfy all Latin American members of UNODC?
                    </GuidingQuestion>
                  </ul>
                </Section>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500 text-center">
                    Reference document for Model United Nations simulation on UNODC Drug Trafficking in Latin America.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
