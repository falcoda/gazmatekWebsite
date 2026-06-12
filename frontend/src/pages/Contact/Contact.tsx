import "./Contact.scss";

import { useTranslation } from "react-i18next";

import ContactForm from "@/components/ContactForm/ContactForm";
import Container from "@/components/Container/Container";
import Section from "@/components/Section/Section";
import SeoHead from "@/components/SeoHead/SeoHead";
import { CONTACT_INTRO } from "@/content/site";
import { getLocalizedText } from "@/content/types";
import type { AppLanguage } from "@/i18n/config";

const Contact = () => {
  const { i18n, t } = useTranslation();
  const language = (i18n.resolvedLanguage ?? "fr") as AppLanguage;

  return (
    <Container className="contactPage">
      <SeoHead
        title={t("seo.contactTitle")}
        description={t("seo.contactDescription")}
        language={language}
      />
      <section className="contactHero fi">
        <p className="eyebrow">{t("nav.contact")}</p>
        <h1>{getLocalizedText(CONTACT_INTRO.title, language)}</h1>
        <p className="intro">
          {getLocalizedText(CONTACT_INTRO.body, language)}
        </p>
      </section>

      <Section className="contactSection fi">
        <ContactForm />
      </Section>
    </Container>
  );
};

export default Contact;
