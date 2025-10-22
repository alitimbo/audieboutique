import React from 'react'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { SEO } from '../components/ui/SEO'

const Confidentialite: React.FC = () => (
  <>
    <SEO
      title='Politique de confidentialité - Audie Boutique'
      description="Politique de confidentialité d'Audie Boutique."
    />
    <div className='min-h-screen bg-luxury-gray-50 pb-16'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className='max-w-4xl mx-auto px-4 pt-16 text-center'
      >
        <div className='flex justify-center mb-4'>
          <Shield className='w-14 h-14 text-luxury-red' />
        </div>
        <h1 className='text-3xl md:text-4xl font-display font-bold text-luxury-black mb-4'>
          POLITIQUE DE CONFIDENTIALITE
        </h1>
        <h2 className='text-xl font-display font-semibold text-luxury-black mb-4'>
          DES DONNEES PERSONNELLES
        </h2>
        <p className='text-lg text-luxury-gray-700 mb-2'>
          La présente Politique de confidentialité s’intègre entièrement aux
          Conditions Générales de Vente proposées par la société AUDIE BOUTIQUE
          (ci-après la « Société »). La Société est le responsable du traitement
          des Données Clients et s’engage à la conformité de ces traitements
          conformément au RGPD.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
        className='max-w-4xl mx-auto px-4 mt-10 bg-luxury-white rounded-3xl shadow-luxury p-8'
      >
        <section className='mb-8 border-b pb-4 border-luxury-gray-200'>
          <h3 className='text-xl font-bold text-luxury-black mb-2'>
            ARTICLE 1. DONNÉES A CARACTERE PERSONNEL COLLECTEES
          </h3>
          <p className='text-luxury-gray-700'>
            Le Client consent au traitement des données à caractère personnel
            ci-dessus énumérées. Le Client est informé que la Société ne procède
            à la collecte d’aucune donnée à caractère sensible au sens de la
            législation et de la règlementation en vigueur. Le Client s’engage à
            ne communiquer que des données exactes, complètes, régulièrement
            mises à jour sur son identité et ses informations. La Société ne
            saurait en aucun cas engager sa responsabilité en cas de
            communication de données obsolètes, illicites ou contraire à l’ordre
            public.
            <br />
            <br />
            **Cookies**
            <br />
            La Société informe le Client qu’elle dépose des cookies ou
            technologies similaires de traçage sur le terminal du Client,
            lorsque celui-ci consulte le Site, et collecte les données suivantes
            : Adresse IP (Internet Protocol) ; Version du navigateur du terminal
            utilisé ; Parcours sur le site/ données de navigation ; Cookies de
            fonctionnement. Les finalités de traitement des données collectées
            via les cookies et les traceurs ainsi que la gestion des cookies
            seront détaillés à l’article 6.
          </p>
        </section>

        <section className='mb-8 border-b pb-4 border-luxury-gray-200'>
          <h3 className='text-xl font-bold text-luxury-black mb-2'>
            ARTICLE 2. FINALITE DU TRAITEMENT MIS EN ŒUVRE
          </h3>
          <p className='text-luxury-gray-700'>
            La Société collecte, traite et conserve les données transmises par
            le Client dans le cadre de l’accès aux Services. En outre, sous
            réserve de son acceptation expresse, le Client pourra recevoir des
            sollicitations de marketing direct de la part de la Société AUDIE
            BOUTIQUE. En cas de collecte des données à caractère personnel du
            Client par téléphone, un email de confirmation du consentement sera
            adressé au Client.
            <br />
            Ainsi, la Société ne collecte et traite les données à caractère
            personnel du Client que pour la stricte exécution et l’utilisation
            optimale des Services qu’elle propose. Le Client est informé que le
            traitement opéré par la Société a également pour finalité
            l’établissement de statistiques sur l’utilisation des Services. La
            Société informe les Clients qu’aucune donnée à caractère personnel
            ne sera collectée sans son accord exprès et préalable. La Société
            informe le Client que les données ne sont conservées que pour la
            durée de la relation contractuelle expressément nécessaire à la
            finalité du traitement.
          </p>
        </section>

        <section className='mb-8 border-b pb-4 border-luxury-gray-200'>
          <h3 className='text-xl font-bold text-luxury-black mb-2'>
            ARTICLE 3. OBLIGATIONS DE LA SOCIETE
          </h3>
          <p className='text-luxury-gray-700'>
            En sa qualité de responsable de traitement, et conformément à la
            législation et la réglementation en vigueur, la Société s’engage à :
            <ul className='list-disc list-inside ml-4 mt-2 space-y-1'>
              <li>
                Ne collecter les données des Clients de la Société que pour les
                finalités décrites à l’article 2 ;
              </li>
              <li>Tenir un registre des traitements ;</li>
              <li>
                Mettre en place toutes les mesures techniques et
                organisationnelles pour s’assurer de la sécurité des traitements
                effectués ;
              </li>
              <li>
                Restreindre les accès aux données des Clients aux seules
                personnes dûment habilitées à cet effet ;
              </li>
              <li>
                Sensibiliser et former le personnel au traitement des données ;
              </li>
              <li>
                Garantir tous les droits d’accès, de portabilité, d’effacement,
                de rectification et d’opposition des Clients concernant leurs
                données collectées lors de l’utilisation des Services ;
              </li>
              <li>
                Notifier à la CNIL toute faille de sécurité présentant un risque
                élevé pour les droits et libertés des Clients dans les 72 heures
                suivant la découverte de la violation ;
              </li>
              <li>
                Procéder à la destruction des données des Clients en l’absence
                de contact avec la Société pendant un délai de trois (3) ans.
              </li>
            </ul>
          </p>
        </section>

        <section className='mb-8 border-b pb-4 border-luxury-gray-200'>
          <h3 className='text-xl font-bold text-luxury-black mb-2'>
            ARTICLE 4. ACCES AUX DONNEES COLLECTEES
          </h3>
          <p className='text-luxury-gray-700'>
            Le Client dispose à tout moment, au préalable, au cours ou à la
            suite du traitement, d’un droit d’accès, de copie, de rectification,
            d’opposition, de portabilité, de limitation et de suppression des
            données qui le concernent.
            <br />
            Il peut paramétrer directement ses données via son compte personnel
            ou exercer ses droits en adressant un courrier électronique à
            l’adresse suivante : **contact@audieboutique.com** ou par voie
            postale à l’adresse suivante **AUDIE BOUTIQUE 25 Zone La Laugier
            97215 Rivière salée** et ce, sous réserve de justifier de son
            identité.
            <br />
            Le Client est dûment informé que la suppression de son compte
            personnel entraîne une suppression de l’accès aux Services et des
            données qui sont liées à l’utilisation des Services. Le Client est
            informé que les Données Clients sont conservées pour une période de
            soixante (60) jours à compter de la résiliation, sauf pour les
            éventuelles données dont une conservation plus longue serait imposée
            par la législation ou la règlementation.
            <br />
            En outre, le Client peut à tout moment interroger la Société s’il
            estime que ses droits ne sont pas respectés. A défaut de réponse
            satisfaisante, le Client peut introduire une réclamation devant la
            CNIL. Pour davantage d’informations, la Société invite le Client à
            consulter ses droits sur le site de la CNIL disponible sur le lien
            suivant : www.cnil.fr.
          </p>
        </section>

        <section className='mb-8 border-b pb-4 border-luxury-gray-200'>
          <h3 className='text-xl font-bold text-luxury-black mb-2'>
            ARTICLE 5. HEBERGEMENT DES DONNEES A CARACTERE PERSONNEL DES CLIENTS
          </h3>
          <p className='text-luxury-gray-700'>
            La Société informe le Client que les données collectées pour
            l’exécution des Services sont susceptibles de faire l’objet d’un
            transfert vers les Etats-Unis auprès du service d’hébergement de la
            Société GOOGLE, adhérent au système du Privacy Shield, ce à quoi le
            Client est expressément informé par les présentes. La Société
            informe le Client que le prestataire en charge de l’hébergement de
            ses données garantit toutes les mesures de sécurité auxquelles il
            peut légitimement s’attendre. Le Client est informé que selon son
            choix discrétionnaire, la Société est susceptible de changer
            d’hébergeur au profit d’un hébergement localisé ailleurs, au sein de
            l’Union Européenne.
          </p>
        </section>

        <section>
          <h3 className='text-xl font-bold text-luxury-black mb-2'>
            ARTICLE 6. GESTION DES COOKIES
          </h3>
          <p className='text-luxury-gray-700'>
            Un cookie est un fichier texte déposé, sous réserve des choix du
            Client, sur son ordinateur lors de la visite d'une page web. Il a
            pour but de collecter des informations relatives à la navigation du
            Client et de lui adresser des services adaptés à son terminal
            (ordinateur, mobile ou tablette). Le Client est par conséquent
            informé que l’utilisation des Services implique le stockage de
            fichiers « Cookies », témoins de connexion, autres traceurs ou
            technologies similaires sur le terminal du Client.
            <br />
            Le Client est informé que la Société dépose des cookies et des
            traceurs sur son terminal afin de permettre (i) au Client de
            s’identifier, (ii) à la Société d’administrer l’espace personnel du
            Client, (iii) d’améliorer le contenu du Site, ou le cas échéant (iv)
            à des fins de mesure d’audience du Site par le biais d’un calcul de
            statistiques sur les pages consultées par le Client et la
            détermination des Services les plus utilisés.
            <br />
            Le Client est informé que les cookies et traceurs seront déposés sur
            son terminal pendant une durée de treize (13) mois. Le Client peut à
            tout moment configurer son navigateur afin de recevoir une
            notification lorsqu’un cookie est envoyé ou de refuser les cookies.
            Toutefois, certaines des fonctionnalités des Services pourraient ne
            pas fonctionner sans cookies.
            <br />
            Par ailleurs, si la plupart des navigateurs sont paramétrés par
            défaut et acceptent l’installation de l’ensemble des cookies, le
            Client a la possibilité, s’il le souhaite, de choisir d’accepter le
            dépôt de tous les cookies, autres que les cookies fonctionnels, ou
            de les rejeter systématiquement ou encore de choisir ceux qu’il
            accepte selon leurs émetteurs, et ceci en effectuant les
            paramétrages suivants.
            <br />
            La Société informe le Client qu’il peut à tout moment revenir sur
            son consentement en modifiant ces paramétrages.
          </p>
        </section>
      </motion.div>
    </div>
  </>
)

export default Confidentialite
