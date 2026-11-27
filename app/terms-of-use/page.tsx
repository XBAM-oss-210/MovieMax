
import Link from "next/link";
import { ArrowLeft, ShieldCheck, FileText } from "lucide-react";

const TermsOfUse = () => {
  const sections = [
    {
      title: "1. Acceptation des conditions",
      content:
        "En accédant à MovieMax et en utilisant ses fonctionnalités, vous acceptez les présentes conditions d’utilisation. Si vous n’acceptez pas ces conditions, nous vous invitons à ne pas utiliser le site.",
    },
    {
      title: "2. Présentation du service",
      content:
        "MovieMax est une plateforme permettant de découvrir des films et des séries, de consulter des informations à leur sujet et de gérer une liste de favoris. Le site propose également des fonctionnalités destinées à faciliter la découverte de contenus.",
    },
    {
      title: "3. Contenus et services externes",
      content:
        "Certaines informations ou ressources accessibles depuis MovieMax peuvent provenir de services tiers indépendants. MovieMax ne contrôle pas ces services et ne garantit ni leur disponibilité, ni leur fonctionnement, ni leur contenu.",
    },
    {
      title: "4. Utilisation du site",
      content:
        "Vous vous engagez à utiliser MovieMax de manière légale et responsable. Il est notamment interdit de tenter de perturber le fonctionnement du site, d'accéder sans autorisation à ses systèmes ou d'utiliser ses fonctionnalités à des fins frauduleuses ou contraires à la loi.",
    },
    {
      title: "5. Propriété intellectuelle",
      content:
        "Les éléments propres à MovieMax, notamment son nom, son logo, son interface et ses éléments graphiques, sont protégés par les règles applicables en matière de propriété intellectuelle. Toute reproduction ou utilisation non autorisée de ces éléments est interdite. Les marques et contenus appartenant à des tiers restent la propriété de leurs détenteurs respectifs.",
    },
    {
      title: "6. Limitation de responsabilité",
      content:
        "MovieMax est proposé dans son état actuel, sans garantie de disponibilité permanente ou d'absence d'erreurs. Nous ne pouvons être tenus responsables des interruptions du service, des informations éventuellement inexactes ou des problèmes liés aux services externes.",
    },
    {
      title: "7. Modification du service et des conditions",
      content:
        "MovieMax se réserve le droit de modifier, suspendre ou interrompre certaines fonctionnalités du site. Les présentes conditions peuvent également être mises à jour à tout moment. La version publiée sur cette page est celle qui fait foi.",
    },
    {
      title: "8. Contact",
      content:
        "Pour toute question concernant les présentes conditions d’utilisation, vous pouvez nous contacter à l’adresse suivante : contact.moviemax@gmail.com.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0b0b0f] px-4 py-12 text-gray-300 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Retour */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-red-500"
        >
          <ArrowLeft size={16} />
          Retour à l'accueil
        </Link>

        {/* En-tête */}
        <div className="mb-12 border-b border-white/8 pb-10">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-500">
            <FileText size={27} />
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
            MovieMax · Informations légales
          </p>

          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Conditions d’utilisation
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Les présentes conditions définissent les règles d’utilisation
            de MovieMax. Nous vous invitons à les lire attentivement avant
            d’utiliser la plateforme.
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs text-gray-600">
            <ShieldCheck size={15} className="text-red-500" />
            Dernière mise à jour : 27 novembre 2026
          </div>
        </div>

        {/* Contenu */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <section
              key={index}
              className="rounded-2xl border border-white/6 bg-[#121217] p-5 transition-colors hover:border-white/12 sm:p-7"
            >
              <h2 className="mb-4 text-base font-bold text-white sm:text-lg">
                {section.title}
              </h2>

              <p className="text-sm leading-7 text-gray-400 sm:text-base">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* Bas de page */}
        <div className="mt-10 border-t border-white/8 pt-6">
          <p className="text-center text-xs leading-6 text-gray-600">
            © 2026 MovieMax. Tous droits réservés.
          </p>
        </div>
      </div>
    </main>
  );
};

export default TermsOfUse;
