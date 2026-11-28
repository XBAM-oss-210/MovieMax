
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Film,
  Clapperboard,
  Lightbulb,
  MessageSquareWarning,
  Mail,
  Send,
  X,
  ArrowUpRight,
  ShieldCheck,
  FileText,
  Sparkles,
} from "lucide-react";

type FeedbackType = "suggestion" | "problem";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] =
    useState<FeedbackType>("suggestion");

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const openFeedback = (type: FeedbackType) => {
    setFeedbackType(type);
    setIsOpen(true);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject =
      feedbackType === "suggestion"
        ? "Suggestion MovieMax"
        : "Signalement d'un problème MovieMax";

    const body = `Email : ${email || "Non renseigné"}\n\nMessage :\n${message}`;

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=contact.moviemax@gmail.com` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, "_blank", "noopener,noreferrer");

    setIsOpen(false);
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <footer className="relative z-10 w-full overflow-hidden border-t border-white/6 bg-[#0b0b0f] text-gray-400 md:ml-64 md:w-[calc(100%-16rem)]">

        {/* Background glow */}
        <div className="pointer-events-none absolute -left-32 -top-40 h-96 w-96 rounded-full bg-red-600/[0.07] blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-red-900/8 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

          {/* LINKS */}
          <div className="grid grid-cols-1 gap-10 border-t border-white/[0.07] py-10 sm:grid-cols-2 lg:grid-cols-3">

            {/* BRAND */}
            <div>
              <Link href="/" className="inline-flex items-center">
                <img
                  src="/textLogo.png"
                  alt="MovieMax"
                  className="h-10 w-auto object-contain"
                />
              </Link>

              <p className="mt-4 max-w-xs text-sm leading-7 text-gray-600">
                Votre destination pour explorer le monde du cinéma
                et découvrir des histoires inoubliables.
              </p>
            </div>

            {/* LEGAL */}
            <div>
              <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-white">
                Informations légales
              </h3>

              <ul className="space-y-4">
                <li>
                  <Link
                    href="/terms-of-use"
                    className="group flex items-center gap-3 text-sm transition hover:text-white"
                  >
                    <FileText size={16} className="text-gray-600 group-hover:text-red-500" />
                    Conditions d'utilisation
                    <ArrowUpRight size={13} className="ml-auto opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>

                <li>
                  <Link
                    href="/privacy-policy"
                    className="group flex items-center gap-3 text-sm transition hover:text-white"
                  >
                    <ShieldCheck size={16} className="text-gray-600 group-hover:text-red-500" />
                    Politique de confidentialité
                    <ArrowUpRight size={13} className="ml-auto opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-white">
                Restons en contact
              </h3>

              <p className="mb-5 text-sm leading-7 text-gray-600">
                Une question ou une remarque ?
                Nous serons ravis de vous lire.
              </p>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=contact.moviemax@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 px-4 py-3 text-sm font-medium text-gray-300 transition hover:border-red-500/30 hover:bg-red-500/5 hover:text-white"
              >
                <Mail size={17} className="text-red-500" />
                Nous contacter
                <ArrowUpRight size={15} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

          </div>
        {/* DISCLAIMER */}
        <div className="border-t border-white/[0.07] py-6">
          <div className="mx-auto flex max-w-4xl items-start gap-3 rounded-xl border border-white/5 bg-white/2 p-4">
            <ShieldCheck
              size={18}
              className="mt-0.5 shrink-0 text-red-500"
            />

            <p className="text-xs leading-6 text-gray-500 sm:text-sm">
              Ce site ne stocke aucun fichier vidéo. Les liens vers des lecteurs
              externes sont fournis par des plateformes indépendantes. MovieMax
              n’héberge pas les contenus référencés et respecte les demandes
              relatives aux droits d’auteur.
            </p>
          </div>
        </div>
          {/* COPYRIGHT */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] py-6 sm:flex-row">

            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Film size={14} className="text-red-500" />
              <span>Made for movie lovers.</span>
            </div>

          </div>
        </div>
      </footer>

    </>
  );
}
