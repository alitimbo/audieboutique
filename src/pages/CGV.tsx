import React from 'react'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import { SEO } from '../components/ui/SEO'

const CGV: React.FC = () => (
  <>
    <SEO
      title='CGV - Audie Boutique'
      description="Conditions Générales de Vente d'Audie Boutique."
    />
    <div className='min-h-screen bg-luxury-gray-50 pb-16'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className='max-w-4xl mx-auto px-4 pt-16 text-center'
      >
        <div className='flex justify-center mb-4'>
          <FileText className='w-14 h-14 text-luxury-red' />
        </div>
        <h1 className='text-3xl md:text-4xl font-display font-bold text-luxury-black mb-4'>
          CONDITIONS GENERALES DE VENTE
        </h1>
        <p className='text-lg text-luxury-gray-700 mb-2'>
          Les présentes conditions de vente sont conclues d’une part par la
          société AUDIE BOUTIQUE au capital social de 500 euros dont le siège
          social est situé à 25 ZONE LA LAUGIER 97215 RIVIERE SALEE immatriculée
          au Registre du Commerce et des Sociétés de FORT DE FRANCE sous le
          numéro 85122704100015, ci-après dénommée " AUDIE BOUTIQUE " et gérant
          le site audieboutique.com et, d’autre part, par toute personne
          physique ou morale souhaitant procéder à un achat via le site internet
          audieboutique.com dénommée ci-après " l’acheteur ".
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
        className='max-w-4xl mx-auto px-4 mt-10 bg-luxury-white rounded-3xl shadow-luxury p-8'
      >
        <section className='mb-8 border-b pb-4 border-luxury-gray-200'>
          <h2 className='text-xl font-bold text-luxury-black mb-2'>
            Article 1. Objet
          </h2>
          <p className='text-luxury-gray-700'>
            Les présentes conditions de vente visent à définir les relations
            contractuelles entre AUDIE BOUTIQUE et l’acheteur et les conditions
            applicables à tout achat effectué par le biais du site internet
            audieboutique.com. L’acquisition d’un produit à travers le présent
            site implique une acceptation sans réserve par l’acheteur des
            présentes conditions de vente dont l’acheteur reconnaît avoir pris
            connaissance préalablement à sa commande. Avant toute transaction,
            l’acheteur déclare d’une part que l’achat de produits sur le site
            audieboutique.com est sans rapport direct avec son activité
            professionnelle et est limité à une utilisation strictement
            personnelle et d’autre part avoir la pleine capacité juridique, lui
            permettant de s’engager au titre des présentes conditions générales
            de ventes. La société AUDIE BOUTIQUE conserve la possibilité de
            modifier à tout moment ces conditions de ventes, afin de respecter
            toute nouvelle réglementation ou dans le but d'améliorer
            l’utilisation de son site. De ce fait, les conditions applicables
            seront celles en vigueur à la date de la commande par l’acheteur.
          </p>
        </section>

        <section className='mb-8 border-b pb-4 border-luxury-gray-200'>
          <h2 className='text-xl font-bold text-luxury-black mb-2'>
            Article 2. Produits
          </h2>
          <p className='text-luxury-gray-700'>
            Les produits proposés sont ceux qui figurent sur le site
            audieboutique.com de la société AUDIE BOUTIQUE dans la limite des
            stocks disponibles. La société AUDIE BOUTIQUE se réserve le droit de
            modifier à tout moment l’assortiment de produits. Chaque produit est
            présenté sur le site internet sous forme d’un descriptif reprenant
            ses principales caractéristiques techniques (contenance,
            utilisation, composition…). Les photographies sont les plus fidèles
            possibles mais n’engagent en rien le Vendeur. La vente des produits
            présentés dans le site audieboutique.com est destinée à tous les
            acheteurs résidants dans les pays qui autorisent pleinement l’entrée
            sur leur territoire de ces produits.
          </p>
        </section>

        <section className='mb-8 border-b pb-4 border-luxury-gray-200'>
          <h2 className='text-xl font-bold text-luxury-black mb-2'>
            Article 3. Tarifs
          </h2>
          <p className='text-luxury-gray-700'>
            Les prix figurant sur les fiches produits du catalogue internet et
            sont des prix en Euros (€) toutes taxes comprises (TTC) tenant
            compte de la TVA applicable au jour de la commande. Tout changement
            du taux de la TVA pourra être répercuté sur le prix des produits. La
            société AUDIE BOUTIQUE se réserve le droit de modifier ses prix à
            tout moment, étant toutefois entendu que le prix figurant au
            catalogue le jour de la commande sera le seul applicable à
            l’acheteur. Les prix indiqués ne comprennent pas les frais de
            livraison, facturés en supplément du prix des produits achetés
            suivant le montant total de la commande.
          </p>
        </section>

        <section className='mb-8 border-b pb-4 border-luxury-gray-200'>
          <h2 className='text-xl font-bold text-luxury-black mb-2'>
            Article 4. Commande et modalités de paiement
          </h2>
          <p className='text-luxury-gray-700'>
            Avant toute commande, l’acheteur doit créer un compte sur le site
            audieboutique.com. La rubrique de création de compte est accessible
            directement depuis la barre de menu latérale. A chaque visite,
            l’acheteur, s’il souhaite commander ou consulter son compte (état
            des commandes, profil…), devra s’identifier à l’aide de ces
            informations. La société AUDIE BOUTIQUE propose à l’acheteur de
            commander et régler ses produits en plusieurs étapes, avec 3 options
            de paiement au choix :
            <br />- Paiement sécurisé par Paypal ou carte bancaire (via le
            système PAYPAL) : l’acheteur sélectionne les produits qu’il souhaite
            commander dans le « panier », modifie si besoin (quantités,
            références…), vérifie l’adresse de livraison ou en renseigne une
            nouvelle. Puis, les frais de port sont calculés et soumis à
            l’acheteur, ainsi que le nom du transporteur. Ensuite, l’acheteur
            choisit le mode de paiement de son choix : « Paiement par Paypal ».
            L’étape suivante lui propose de vérifier l’ensemble des
            informations, prendre connaissance et accepter les présentes
            conditions générales de vente en cochant la case correspondante,
            puis l’invite à valider sa commande en cliquant sur le bouton «
            Confirmer ma commande ». Enfin, l’acheteur est redirigé sur
            l’interface sécurisée PAYPAL afin de renseigner en toute sécurité
            ses références de compte Paypal ou de carte bleue personnelle. Si le
            paiement est accepté, la commande est enregistrée et le contrat
            définitivement formé. Le paiement par compte Paypal ou par carte
            bancaire est irrévocable. En cas d’utilisation frauduleuse de
            celle-ci, l’acheteur pourra exiger l’annulation du paiement par
            carte, les sommes versées seront alors recréditées ou restituées. La
            responsabilité du titulaire d’une carte bancaire n’est pas engagée
            si le paiement contesté a été prouvé effectué frauduleusement, à
            distance, sans utilisation physique de sa carte. Pour obtenir le
            remboursement du débit frauduleux et des éventuels frais bancaires
            que l’opération a pu engendrer, le porteur de la carte doit
            contester, par écrit, le prélèvement auprès de sa banque, dans les
            70 jours suivant l’opération, voire 120 jours si le contrat le liant
            à celle-ci le prévoit. Les montants prélevés sont remboursés par la
            banque dans un délai maximum d’un mois après réception de la
            contestation écrite formée par le porteur. Aucun frais de
            restitution des sommes ne pourra être mis à la charge du titulaire.
            <br />
            La confirmation d’une commande entraîne acceptation des présentes
            conditions de vente, la reconnaissance d’en avoir parfaite
            connaissance et la renonciation à se prévaloir de ses propres
            conditions d’achat. L’ensemble des données fournies et la
            confirmation enregistrée vaudront preuve de la transaction. Si
            l’acheteur possède une adresse électronique et s’il l’a renseignée
            sur son bon de commande, la société AUDIE BOUTIQUE lui communiquera
            par courrier électronique la confirmation de l’enregistrement de sa
            commande.
            <br />
            Si l’acheteur souhaite contacter la société AUDIE BOUTIQUE, il peut
            le faire soit par courrier à l’adresse suivante : 25 ZONE LA LAUGIER
            97215 RIVIERE SALEE; soit par email à l’adresse suivante :
            audieboutique@gmail.com
          </p>
        </section>

        <section className='mb-8 border-b pb-4 border-luxury-gray-200'>
          <h2 className='text-xl font-bold text-luxury-black mb-2'>
            Article 5. Réserve de propriété
          </h2>
          <p className='text-luxury-gray-700'>
            La société AUDIE BOUTIQUE conserve la propriété pleine et entière
            des produits vendus jusqu'au parfait encaissement du prix, en
            principal, frais et taxes compris.
          </p>
        </section>

        <section className='mb-8 border-b pb-4 border-luxury-gray-200'>
          <h2 className='text-xl font-bold text-luxury-black mb-2'>
            Article 6. Rétractation
          </h2>
          <p className='text-luxury-gray-700'>
            En vertu de l’article L121-20 du Code de la consommation, l’acheteur
            dispose d'un délai de quatorze jours ouvrables à compter de la
            livraison de leur commande pour exercer son droit de rétractation et
            ainsi faire retour du produit au vendeur pour échange ou
            remboursement sans pénalité, à l’exception des frais de retour.
          </p>
        </section>

        <section className='mb-8 border-b pb-4 border-luxury-gray-200'>
          <h2 className='text-xl font-bold text-luxury-black mb-2'>
            Article 7. Livraison
          </h2>
          <p className='text-luxury-gray-700'>
            Les livraisons sont faites à l’adresse indiquée sur le bon de
            commande qui ne peut être que dans la zone géographique convenue.
            Les commandes sont effectuées par La Poste via COLISSIMO, service de
            livraison avec suivi, remise sans signature. Les délais de livraison
            ne sont donnés qu’à titre indicatif ; si ceux-ci dépassent trente
            jours à compter de la commande, le contrat de vente pourra être
            résilié et l’acheteur remboursé. La société AUDIE BOUTIQUE pourra
            fournir par e-mail à l’acheteur le numéro de suivi de son colis.
            L’acheteur est livré à son domicile par son facteur. En cas
            d’absence de l’acheteur, il recevra un avis de passage de son
            facteur, ce qui lui permet de retirer les produits commandés au
            bureau de Poste le plus proche, pendant un délai indiqué par les
            services postaux. Les risques liés au transport sont à la charge de
            l'acquéreur à compter du moment où les articles quittent les locaux
            de la société AUDIE BOUTIQUE. L’acheteur est tenu de vérifier en
            présence du préposé de La Poste ou du livreur, l’état de l’emballage
            de la marchandise et son contenu à la livraison. En cas de dommage
            pendant le transport, toute protestation doit être effectuée auprès
            du transporteur dans un délai de trois jours à compter de la
            livraison.
          </p>
        </section>

        <section className='mb-8 border-b pb-4 border-luxury-gray-200'>
          <h2 className='text-xl font-bold text-luxury-black mb-2'>
            Article 8. Garantie
          </h2>
          <p className='text-luxury-gray-700'>
            Tous les produits fournis par la société AUDIE BOUTIQUE bénéficient
            de la garantie légale prévue par les articles 1641 et suivants du
            Code civil. En cas de non conformité d’un produit vendu, il pourra
            être retourné à la société AUDIE BOUTIQUE qui le reprendra,
            l’échangera ou le remboursera. Toutes les réclamations, demandes
            d’échange ou de remboursement doivent s’effectuer par voie postale à
            l’adresse suivante : AUDIE BOUTIQUE 25 ZONE LA LAUGIER 97215 RIVIERE
            SALEE dans un délai de trente jours après livraison.
          </p>
        </section>

        <section className='mb-8 border-b pb-4 border-luxury-gray-200'>
          <h2 className='text-xl font-bold text-luxury-black mb-2'>
            Article 9. Responsabilité
          </h2>
          <p className='text-luxury-gray-700'>
            La société AUDIE BOUTIQUE, dans le processus de vente à distance,
            n’est tenue que par une obligation de moyens. Sa responsabilité ne
            pourra être engagée pour un dommage résultant de l’utilisation du
            réseau Internet tel que perte de données, intrusion, virus, rupture
            du service, ou autres problèmes involontaires.
          </p>
        </section>

        <section className='mb-8 border-b pb-4 border-luxury-gray-200'>
          <h2 className='text-xl font-bold text-luxury-black mb-2'>
            Article 10. Propriété intellectuelle
          </h2>
          <p className='text-luxury-gray-700'>
            Tous les éléments du site audieboutique.com sont et restent la
            propriété intellectuelle et exclusive de la société AUDIE BOUTIQUE.
            Personne n’est autorisé à reproduire, exploiter, ou utiliser à
            quelque titre que ce soit, même partiellement, des éléments du site
            qu’ils soient sous forme de photo, logo, visuel ou texte.
          </p>
        </section>

        <section className='mb-8 border-b pb-4 border-luxury-gray-200'>
          <h2 className='text-xl font-bold text-luxury-black mb-2'>
            Article 11. Données à caractère personnel
          </h2>
          <p className='text-luxury-gray-700'>
            La société AUDIE BOUTIQUE s'engage à préserver la confidentialité
            des informations fournies par l’acheteur, qu'il serait amené à
            transmettre pour l'utilisation de certains services. Toute
            information le concernant est soumise aux dispositions de la loi n°
            78-17 du 6 janvier 1978. A ce titre, l'internaute dispose d'un droit
            d'accès, de modification et de suppression des informations le
            concernant. Il peut en faire la demande à tout moment par courrier à
            l’adresse suivante : AUDIE BOUTIQUE 25 ZONE LA LAUGIER 97215 RIVIERE
            SALEE.
          </p>
        </section>

        <section>
          <h2 className='text-xl font-bold text-luxury-black mb-2'>
            Article 12. Règlement des litiges
          </h2>
          <p className='text-luxury-gray-700'>
            Les présentes conditions de vente à distance sont soumises à la loi
            française. Pour tous litiges ou contentieux, le Tribunal compétent
            sera celui de FORT DE France.
          </p>
        </section>
      </motion.div>
    </div>
  </>
)

export default CGV
