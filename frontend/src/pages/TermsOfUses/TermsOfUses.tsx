import "./TermsOfUses.scss";

import React from "react";
import { useTranslation } from "react-i18next";

import SeoHead from "@/components/SeoHead/SeoHead";
import { SOCIAL_LINKS } from "@/config/socials";
import type { AppLanguage } from "@/i18n/config";

const TermsOfUses: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage ?? "fr") as AppLanguage;

  return (
    <div className="terms">
      <SeoHead
        title={t("seo.termsTitle")}
        description={t("seo.termsDescription")}
        language={language}
      />
      <h1 className="title">CONDITIONS GÉNÉRALES</h1>
      <p className="lastUpdated">Dernière mise à jour Avril 03, 2024</p>
      <div className="content">
        <div className="chapter">
          <h2 className="chapterTitle">1. Objet du contrat</h2>
          <p className="chapterText">
            <h3 className="chapterSubitle">Prestations de service</h3>
            Nos prestations ont de manière générale pour objet l’animation et la
            sonorisation au sens large d’activités et manifestations diverses de
            type festif, publicitaire, événementiel, familial, professionnel,
            mondain ou associatif. La mission qui nous est spécifiquement
            demandée est par ailleurs plus amplement décrite dans le bon de
            commande.
          </p>
          <p className="chapterText">
            <h3 className="chapterSubitle">Exclus de nos offres</h3>Sauf avis
            contraire, nos offres ne comprennent pas le catering du personnel
            pendant le montage, prestation et démontage, les frais de parking,
            les taxes gouvernementales pour les poids lourds, les droits Sabam
            et Rémuneration équitable et toute plainte éventuelle du voisinage.
            Vérifications par bureau d’étude et/ou contrôle extérieur ( BTV,
            CIB, pompiers, architectes,…. ). Gazmatek ASBL se réserve le droit
            de facturer ces frais liés à la prestation si le client ne les a pas
            pris en charge de son côté. Par ailleurs le clients a la
            responsabilité de faire les inspections par un bureau extérieur si
            le besoin en est.
          </p>
          <p className="chapterText">
            <h3 className="chapterSubitle">Location de matériel</h3>Nous
            développons également une activité de loueur de matériel de
            sonorisation et accessoires. Cette location de matériel peut
            intervenir à la fois dans le cadre d’un contrat de service mais
            également de manière autonome. Dans ce cas, un bon de livraison
            spécifique est délivré au CLIENT au moment où celui-ci prend
            possession du dit matériel.
          </p>
        </div>
        <div className="chapter">
          <h2 className="chapterTitle">Prise d’effet de la commande</h2>
          <p className="chapterText">
            Une commande peut être confirmée de par email. Une fois le job
            confirmé, veuillez procéder au paiement d’un acompte de 50% de la
            commande sur le compte BE02 0689 4320 9940. La confirmation de la
            commande vaut acceptation ferme et définitive de notre offre et
            entraîne l’adhésion du CLIENT aux présentes conditions générales.
            Par la signature du bon de commande, le CLIENT s’engage également à
            nous payer un acompte d’au moins 50% de la valeur de la commande.
            Notre offre fournit seulement le prix pour le matériel indiqué et ne
            garantit en aucun la disponibilité de celui-ci jusqu’à la commande
            complète. Gazmatek ASBL se réserve le droit d’exiger une garantie
            personnelle et solidaire pour la confirmation de toute commande. Le
            ou les signataires s’engageront solidairement sur la solvabilité de
            leur société / asbl ou association vis à vis de la commande passée
            chez Gazmatek ASBL.
          </p>
        </div>
        <div className="chapter">
          <h2 className="chapterTitle">Annulation de la commande</h2>
          <p className="chapterText">
            Le CLIENT a le droit de renoncer à l’exécution d’une commande qui
            nous a été passée. Dans ce cas, le CLIENT nous devra une indemnité
            forfaitaire conventionnelle irréductible de respectivement 30 %, de
            50 % ou de 100 % de la valeur de la commande si l’annulation
            intervient plus de 30 jours , entre 29 et 5 jours ou moins de 5
            jours avant la date d’exécution, sans préjudice d’éventuels autres
            dommages et intérêts. Cette indemnité n’est pas due en application
            d’une clause pénale mais constitue la contrepartie conventionnelle
            de la faculté pour le CLIENT d’annuler la commande.
          </p>
        </div>
        <div className="chapter">
          <h2 className="chapterTitle">Propriété du matériel</h2>
          <p className="chapterText">
            Nous restons en tout temps propriétaires du matériel loué. Le CLIENT
            est institué gardien de la chose à partir du moment où il prend
            livraison du matériel. Il est responsable pour tout dégâts ou perte
            de matériel et ce jusqu’à la restitution du matériel. Le CLIENT
            reconnaît avoir reçu le matériel loué en parfait état de marche,
            muni de tous ses accessoires s’il échet. Il s’engage à le restituer
            avec ses accessoires dans l’état où il en a pris livraison. Toute
            réclamation doit, sous peine de déchéance, nous parvenir dans les 3
            heures de la réception du matériel. En cas de défaillance du
            matériel loué, notre responsabilité sera limitée à une indemnité
            égale à 15 % maximum du prix de la location, sauf dol ou faute
            lourde de notre part.
          </p>
        </div>
        <div className="chapter">
          <h2 className="chapterTitle">Responsabilité et assurance</h2>
          <p className="chapterText">
            <h3 className="chapterSubitle">Utilisation du matériel</h3>
            Le client est tenu d’utiliser le matériel en bon père de famille, en
            tenant compte des capacités de charge maximale de celui-ci et
            veillera a ce que le matériel ne subisse aucun dégâts. Les dégâts
            suite a une utilisation inappropriée seront toujours a charge du
            client. Toute perte, vol ou détérioration du matériel loué ou de ses
            accessoires engage la responsabilité du CLIENT auquel les éventuels
            frais de remplacement – au prix neuf – ou de réparation seront
            facturés. Le CLIENT est tenu de prendre une assurance couvrant les
            risques de perte, de vol ou de réparation qui seront facturés. Le
            montant de la couverture de l’assurance souscrite par le client ne
            pourra pas être inférieur à € 5000. Dans le cas ou le clients met a
            disposition a Gazmatek ASBL du personnel en vue d’effectuer une
            prestation, celui ci reste sous la couverture du client. Dans le cas
            ou celui ci serait en sous-nombre ou inapproprié en vue d’effectuer
            la prestation demandée, Gazmatek ASBL peut faire appel a ses propres
            techniciens sans préavis, la main d’œuvre supplémentaire sera a
            charge du clients. En cas de location, le matériel doit être rendu
            propre, les câbles roulés et scotchés. Le matériel est fourni en bon
            état de marche, si toutefois le client devait constater quelconque
            défaut ou manquement, celui-ci doit immédiatement nous le signaler
            par écrit ou par email sur {SOCIAL_LINKS.email} . A défaut, le
            matériel sera considéré comme livré et en bon état de marche. Le cas
            échéant, le nettoyage ét réparations requises sont facturées. En
            location ou prestation, tout pendrillon dégradé est vendu.
          </p>
          <p className="chapterText">
            <h3 className="chapterSubitle">Utilisations extérieur</h3>
            Le client est dans le devoir d’apporter les protections nécessaire
            en cas d’utilisation extérieur ( régie, scène et stack couvert,
            tableau électrique ) En cas d’intempérie, Gazmatek ASBL ne peut
            assurer un parfait fonctionnement du matériel, en cas de danger
            quelconque pour la sécurité des personnes et ou matériel, Gazmatek
            ASBL peut apporter le modifications nécessaire ( mise hors tension,
            changement d’implantations ) sans préavis, le client prend a sa
            charge tout dommage et ou dégradations occasionné sur le matériel si
            celui na pas les protections adéquate. Sauf accord exclusif avant
            prestation le matériel non utilisé pour des raisons de sécurité
            reste a charge du client.
          </p>
        </div>
        <div className="chapter">
          <h2 className="chapterTitle">Délivrance et restitution</h2>
          <p className="chapterText">
            En cas de location autonome, le CLIENT a la charge de l’enlèvement
            du matériel loué et de sa restitution. Le matériel loué voyagera aux
            risques et périls du locataire. Le matériel loué doit être enlevé et
            restitué chez nous, aux dates et heures mentionnées par email. Tout
            retard apporté dans l’enlèvement du matériel loué entraînera de
            plein droit la facturation, au tarif plein, de la période de retard
            par unité de journée indivisible. Tout matériel non rentré à la date
            prévue entraine automatiquement la prolongation de la durée
            d’utilisation et augmente d’autant les frais de la location avec un
            surplus de 30%. En cas de retard, veuillez immédiatement prévenir
            votre contact.
          </p>
        </div>
        <div className="chapter">
          <h2 className="chapterTitle">Conditions spécifiques à le vente </h2>
          <p className="chapterText">
            Il est expressément convenu entre les parties que les biens livrés
            restent la propriété de l&apos;ASBL Gazmatek jusqu&apos;au moment du
            paiement intégral de leur prix. En cas de non paiement, Gazmatek
            ASBL peut exiger un montant de location du matériel a partir du
            moment ou celui ci a été livré et jusqu’à parfait paiement de
            celui-ci.
          </p>
        </div>
        <div className="chapter">
          <h2 className="chapterTitle">Propriété intellectuelle</h2>
          <p className="chapterText">
            Les projets, études, plans et devis réalisés à la demande du client
            restent la propriété de l&apos;ASBL et ne peuvent être reproduits,
            exécutés ou communiqués, de quelque manière que ce soit, sans son
            accord écrit préalable. Si le client exécute ou fait exécuter par un
            tiers un projet élaboré par l&apos;ASBL, il sera redevable envers
            celle-ci du montant total du devis établi pour ce projet, à titre
            d’indemnité forfaitaire et irréductible et sous réserve de tout
            dommage et intérêt complémentaires. La prise de photo ou capture
            video en direct ou en sous traitance lors d’une prestation régie par
            Gazmatek ASBL ou pour Gazmatek ASBL par sous-traitant est
            strictement interdite sauf accord écrit préalable. Toutes les images
            restent la propriété de Gazmatek ASBL et leur utilisation nécessite
            son accord préalable. Toute personne prise en photo par Gazmatek
            ASBL faisant face ou non à l’objectif pourra demander le retrait de
            sa photo moyennant une demande écrite.
          </p>
        </div>
        <div className="chapter">
          <h2 className="chapterTitle">Clause pénale et intérêts de retard</h2>
          <p className="chapterText">
            Nos factures sont payables dès leur réception par le CLIENT. Le
            montant des factures non réglées dans les quinze jours de leur
            échéance sera de plein droit et sans mise en demeure majoré d’une
            indemnité forfaitaire et irréductible de 15% de ce montant, avec un
            minimum de € 150. En outre, toute somme non payée à l’échéance fixée
            portera de plein droit et sans mise en demeure un intérêt de 12% par
            an à compter de son exigibilité.
          </p>
        </div>
        <div className="chapter">
          <h2 className="chapterTitle">Réclamations</h2>
          <p className="chapterText">
            Aucune réclamation d’aucune sorte ne sera admise si elle ne répond
            aux conditions suivantes: Envoi par courrier recommandé au siège de
            notre ASBL; dans les 8 jours calendriers suivant la date de
            facturation.
          </p>
        </div>
        <div className="chapter">
          <h2 className="chapterTitle">Compétence et loi applicable</h2>
          <p className="chapterText">
            En cas de litige, les Tribunaux de Bruxelles sont exclusivement
            compétents. Le droit belge est applicable. Le texte officiel en cas
            de différend relatif à l’interpretation des contrats est le
            français.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUses;
