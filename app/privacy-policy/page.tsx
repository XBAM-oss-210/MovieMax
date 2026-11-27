
import Link from "next/link";
import { ArrowLeft, ShieldCheck, LockKeyhole } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Introduction",
      content:
        "La confidentialité de nos visiteurs est importante pour MovieMax. Cette politique explique comment le site traite les informations lors de votre navigation et quelles données sont éventuellement conservées.",
    },
    {
      title: "2. Collecte des données personnelles",
      content:
        "MovieMax ne collecte pas directement de données personnelles auprès de ses visiteurs. Aucun compte utilisateur n'est nécessaire pour utiliser les fonctionnalités principales du site. Nous ne demandons ni nom, ni adresse e-mail, ni mot de passe, ni autre information personnelle pour accéder à la plateforme.",
    },
    {
      title: "3. Stockage des favoris",
      content:
        "Lorsque vous ajoutez un film ou une série à vos favoris, ces informations sont enregistrées localement dans le stockage de votre navigateur (localStorage). Elles restent sur votre appareil et ne sont pas transmises à une base de données MovieMax. Vous pouvez supprimer vos favoris à tout moment depuis le site ou en effaçant les données de navigation de votre navigateur. La suppression de ces données peut entraîner la perte de votre liste de favoris.",
    },
    {
      title: "4. Cookies et technologies de suivi",
      content:
        "MovieMax n'utilise pas de cookies à des fins publicitaires ou de suivi des utilisateurs. Le site ne met pas en place de système de suivi destiné à établir un profil de navigation de ses visiteurs.",
    },
    {
      title: "5. Services et contenus externes",
      content:
        "Certaines fonctionnalités peuvent faire appel à des services externes indépendants. Lorsque votre navigateur accède à ces services, ceux-ci peuvent traiter certaines informations techniques conformément à leurs propres politiques de confidentialité. MovieMax ne contrôle pas les pratiques de ces services tiers.",
    },
    {
      title: "6. Sécurité et conservation",
      content:
        "Les favoris sont conservés dans le navigateur de l'utilisateur. Leur sécurité dépend notamment de la protection de son appareil et de son navigateur. MovieMax ne conserve pas de copie de cette liste sur ses propres serveurs.",
    },
    {
      title: "7. Vos choix",
      content:
        "Vous gardez le contrôle sur les favoris enregistrés dans votre navigateur. Vous pouvez les supprimer directement depuis MovieMax ou effacer le stockage local de votre navigateur. Vous pouvez également interrompre l'utilisation du site à tout moment.",
    },
    {
      title: "8. Modification de cette politique",
      content:
        "MovieMax peut mettre à jour cette politique de confidentialité afin de refléter les évolutions du site ou de ses pratiques. Toute modification sera publiée sur cette page.",
    },
    {
      title: "9. Contact",
      content:
        "Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à l'adresse suivante : contact.moviemax@gmail.com.",
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
            <LockKeyhole size={27} />
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
            MovieMax · Protection des données
          </p>

          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Politique de confidentialité
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Votre vie privée compte. Découvrez comment MovieMax traite
            les informations liées à votre utilisation du site.
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

      </div>
    </main>
  );
};

export default PrivacyPolicy;
