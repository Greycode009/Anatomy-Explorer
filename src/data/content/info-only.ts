import type { InfoOnlyStructure } from '../../types';

/**
 * Anatomy that is not modelled in 3D in this app but is searchable and explained.
 * `related` prefers real structure IDs so users can jump to a nearby model.
 */
export const INFO_ONLY: InfoOnlyStructure[] = [
  // ───────────────────────────── Endocrine ─────────────────────────────
  {
    id: 'thyroid-gland',
    name: 'Thyroid gland',
    system: 'endocrine',
    content: {
      anatomicalName: 'Thyroid gland',
      summary:
        'The thyroid is a butterfly-shaped gland in the front of the neck. Its hormones set the pace of the body\'s metabolism.',
      location: 'Front of the neck, wrapped around the upper trachea just below the larynx.',
      functions: [
        'Produces thyroxine (T4) and triiodothyronine (T3), which regulate metabolic rate',
        'Supports normal growth and brain development',
        'Produces calcitonin, which can lower blood calcium',
      ],
      components: ['Right and left lobes', 'Isthmus (connecting band)', 'Follicles filled with colloid', 'Parafollicular (C) cells'],
      howItWorks:
        'Thyroid-stimulating hormone (TSH) from the pituitary prompts follicle cells to make hormones using iodine from the diet. Rising thyroid hormone levels in turn reduce TSH release.',
      facts: ['It is one of the largest purely endocrine glands in the body.', 'Iodine is an essential ingredient of thyroid hormones.'],
      related: ['thyroid-cartilage', 'trachea', 'pituitary-gland', 'sternothyroid-left', 'common-carotid-artery-left', 'Parathyroid glands'],
      aliases: ['thyroid', 'T3', 'T4', 'thyroxine'],
    },
  },
  {
    id: 'parathyroid-glands',
    name: 'Parathyroid glands',
    system: 'endocrine',
    content: {
      anatomicalName: 'Parathyroid glands',
      summary:
        'The parathyroid glands are tiny glands on the back of the thyroid. They control the level of calcium in the blood.',
      location: 'On the back surface of the thyroid gland in the neck; usually four, two on each side.',
      functions: [
        'Secrete parathyroid hormone (PTH)',
        'Raise blood calcium when it falls too low',
        'Help regulate phosphate levels',
      ],
      howItWorks:
        'When blood calcium drops, PTH releases calcium from bone, reduces calcium loss in the urine and stimulates the kidneys to activate vitamin D, which increases calcium absorption from food.',
      facts: ['Each gland is roughly the size of a grain of rice.', 'Despite their name and position, they work independently of the thyroid.'],
      related: ['trachea', 'kidney-left', 'kidney-right', 'thyroid-cartilage', 'Thyroid gland'],
      aliases: ['parathyroid', 'PTH', 'parathyroid hormone'],
    },
  },

  // ───────────────────────────── Nervous ─────────────────────────────
  {
    id: 'spinal-cord',
    name: 'Spinal cord',
    system: 'nervous',
    content: {
      anatomicalName: 'Spinal cord',
      summary:
        'The spinal cord is a long bundle of nerve tissue running down the spine. It links the brain with the rest of the body and handles simple reflexes.',
      location: 'Inside the vertebral canal, from the medulla oblongata at the base of the skull to about the level of the first or second lumbar vertebra.',
      functions: [
        'Carries sensory signals from the body to the brain',
        'Carries motor commands from the brain to muscles',
        'Coordinates reflexes, such as withdrawing from pain',
      ],
      components: ['Gray matter (butterfly-shaped core)', 'White matter (nerve tracts)', '31 pairs of spinal nerves', 'Meninges and cerebrospinal fluid', 'Cauda equina (nerve roots below its end)'],
      howItWorks:
        'Nerve roots enter and leave at each level, forming spinal nerves. Ascending tracts in the white matter carry sensation upward, descending tracts carry movement commands down, and local circuits in the gray matter produce reflexes.',
      facts: ['In adults it is about 45 cm long, shorter than the vertebral column, which is why lower nerve roots form the cauda equina.'],
      related: ['medulla-oblongata', 'atlas', 'axis', 'intervertebral-discs', 'first-lumbar-vertebra', 'sacrum'],
      aliases: ['spine', 'spinal nerves', 'cauda equina', 'cord'],
    },
  },
  {
    id: 'brachial-plexus',
    name: 'Brachial plexus',
    system: 'nervous',
    content: {
      anatomicalName: 'Brachial plexus',
      summary:
        'The brachial plexus is a network of nerves that supplies the shoulder, arm and hand. It forms from nerves leaving the lower neck.',
      location: 'From the side of the neck, between the scalene muscles, under the clavicle and into the armpit (axilla).',
      functions: [
        'Supplies movement to the muscles of the shoulder, arm and hand',
        'Carries sensation from the upper limb',
      ],
      components: ['Roots (C5 to T1)', 'Trunks', 'Divisions', 'Cords', 'Terminal branches: musculocutaneous, axillary, radial, median and ulnar nerves'],
      howItWorks:
        'Fibers from several spinal nerves regroup in a set pattern, so each final nerve carries fibers from more than one spinal level.',
      facts: ['It passes between the anterior and middle scalene muscles together with the subclavian artery.'],
      related: ['scalenus-anterior-left', 'scalenus-medius-left', 'clavicle-left', 'subclavian-artery-left', 'first-rib-left', 'humerus-left'],
      aliases: ['brachial nerve plexus', 'arm nerves'],
    },
  },
  {
    id: 'median-nerve',
    name: 'Median nerve',
    system: 'nervous',
    content: {
      anatomicalName: 'Median nerve',
      summary:
        'The median nerve runs down the middle of the arm into the hand. It controls many forearm flexor muscles and muscles at the base of the thumb.',
      location: 'Down the inner arm with the brachial artery, through the middle of the forearm, and through the carpal tunnel into the palm.',
      functions: [
        'Supplies most of the forearm flexor muscles',
        'Supplies the thenar muscles that move the thumb',
        'Carries sensation from the palm side of the thumb, index, middle and half of the ring finger',
      ],
      howItWorks: 'It forms from the lateral and medial cords of the brachial plexus and passes into the hand beneath the flexor retinaculum.',
      facts: ['The carpal tunnel through which it passes is a tight space it shares with nine flexor tendons.'],
      related: ['flexor-retinaculum-of-wrist-left', 'pronator-teres-left', 'flexor-digitorum-superficialis-left', 'opponens-pollicis-left', 'humerus-left', 'Brachial plexus'],
      aliases: ['median'],
    },
  },
  {
    id: 'ulnar-nerve',
    name: 'Ulnar nerve',
    system: 'nervous',
    content: {
      anatomicalName: 'Ulnar nerve',
      summary:
        'The ulnar nerve runs along the inner side of the arm to the little-finger side of the hand. It controls most of the small muscles of the hand.',
      location: 'Down the inner arm, behind the medial epicondyle of the humerus at the elbow, along the ulnar side of the forearm and into the hand.',
      functions: [
        'Supplies most of the small (intrinsic) muscles of the hand, important for fine finger movements',
        'Supplies the flexor carpi ulnaris and part of the deep finger flexor',
        'Carries sensation from the little finger and half of the ring finger',
      ],
      howItWorks: 'It arises from the medial cord of the brachial plexus and enters the hand beside the pisiform bone.',
      facts: ['It lies close to the skin behind the elbow; bumping it there causes the tingling known as hitting the funny bone.'],
      related: ['humerus-left', 'ulna-left', 'flexor-carpi-ulnaris-left', 'pisiform-left', 'palmar-interossei-of-hand-left', 'adductor-pollicis-left'],
      aliases: ['ulnar', 'funny bone'],
    },
  },
  {
    id: 'radial-nerve',
    name: 'Radial nerve',
    system: 'nervous',
    content: {
      anatomicalName: 'Radial nerve',
      summary:
        'The radial nerve supplies the muscles that straighten the elbow, wrist and fingers. It winds around the back of the upper arm bone.',
      location: 'Behind the humerus in the radial groove, then to the outer (thumb) side of the elbow and forearm.',
      functions: [
        'Supplies the triceps, which straightens the elbow',
        'Supplies the extensor muscles of the wrist, fingers and thumb',
        'Carries sensation from the back of the arm, forearm and thumb side of the hand',
      ],
      howItWorks: 'It is the largest branch of the posterior cord of the brachial plexus and divides near the elbow into superficial (sensory) and deep (motor) branches.',
      related: ['humerus-left', 'triceps-brachii-left', 'brachioradialis-left', 'extensor-digitorum-left', 'supinator-left', 'radius-left'],
      aliases: ['radial'],
    },
  },
  {
    id: 'phrenic-nerve',
    name: 'Phrenic nerve',
    system: 'nervous',
    content: {
      anatomicalName: 'Phrenic nerve',
      summary:
        'The phrenic nerves control the diaphragm, the main breathing muscle. There is one on each side of the body.',
      location: 'From the neck, down over the anterior scalene muscle, through the chest beside the heart, to the diaphragm.',
      functions: [
        'Provides the only motor supply to the diaphragm',
        'Carries sensation from the central diaphragm, the pericardium and parts of the pleura',
      ],
      howItWorks: 'It arises mainly from the C3 to C5 spinal nerves and descends through the mediastinum in front of the lung root.',
      facts: ['Because it arises in the neck, irritation of the diaphragm can be felt as pain in the shoulder region.'],
      related: ['diaphragm', 'scalenus-anterior-left', 'heart', 'lung-left', 'lung-right', 'fourth-cervical-vertebra'],
      aliases: ['phrenic'],
    },
  },
  {
    id: 'vagus-nerve',
    name: 'Vagus nerve',
    system: 'nervous',
    content: {
      anatomicalName: 'Vagus nerve (cranial nerve X)',
      summary:
        'The vagus nerve is the longest cranial nerve. It wanders from the brainstem down to the abdomen, linking the brain with the heart, lungs and gut.',
      location: 'From the medulla oblongata, through the jugular foramen, down the neck in the carotid sheath, through the chest and into the abdomen.',
      functions: [
        'Carries parasympathetic signals that slow the heart rate',
        'Stimulates digestive activity and secretion',
        'Supplies muscles of the pharynx and larynx for swallowing and speech',
        'Carries sensory information from the internal organs to the brain',
      ],
      components: ['Pharyngeal branches', 'Recurrent laryngeal nerves', 'Cardiac and pulmonary branches', 'Esophageal plexus', 'Gastric branches'],
      howItWorks: 'Its fibers reach organs from the neck down to roughly the middle of the large intestine, carrying information in both directions.',
      facts: [
        'Its name comes from the Latin for wandering.',
        'The left recurrent laryngeal branch loops under the aortic arch, while the right loops under the right subclavian artery.',
      ],
      related: ['medulla-oblongata', 'internal-jugular-vein-left', 'common-carotid-artery-left', 'heart', 'esophagus', 'stomach'],
      aliases: ['vagus', 'cranial nerve X', 'CN X', 'tenth cranial nerve'],
    },
  },
  {
    id: 'sciatic-nerve',
    name: 'Sciatic nerve',
    system: 'nervous',
    content: {
      anatomicalName: 'Sciatic nerve',
      summary:
        'The sciatic nerve is the largest nerve in the body. It runs from the lower back through the buttock and down the back of the thigh.',
      location: 'From the sacral plexus in the pelvis, below the piriformis muscle, deep to the gluteus maximus and down the back of the thigh.',
      functions: [
        'Supplies the hamstring muscles',
        'Through its branches, supplies all muscles below the knee',
        'Carries sensation from most of the leg and foot',
      ],
      components: ['Tibial nerve', 'Common fibular (peroneal) nerve'],
      howItWorks: 'It forms from the L4 to S3 spinal nerves and usually divides above the knee into the tibial and common fibular nerves.',
      facts: ['It is about as wide as a thumb near its origin.'],
      related: ['piriformis-left', 'gluteus-maximus-left', 'biceps-femoris-left', 'semitendinosus-left', 'hip-bone-left', 'femur-left'],
      aliases: ['sciatic', 'sciatica', 'tibial nerve', 'fibular nerve', 'peroneal nerve'],
    },
  },
  {
    id: 'femoral-nerve',
    name: 'Femoral nerve',
    system: 'nervous',
    content: {
      anatomicalName: 'Femoral nerve',
      summary:
        'The femoral nerve supplies the muscles at the front of the thigh. It allows the knee to straighten.',
      location: 'From the lumbar plexus, through the psoas major muscle, under the inguinal ligament into the front of the thigh, lateral to the femoral artery.',
      functions: [
        'Supplies the quadriceps, which extends the knee',
        'Supplies the iliacus, sartorius and pectineus muscles',
        'Carries sensation from the front of the thigh and, via the saphenous nerve, the inner leg',
      ],
      howItWorks: 'It arises from the L2 to L4 spinal nerves and branches widely just below the inguinal ligament.',
      facts: ['It is the largest branch of the lumbar plexus.'],
      related: ['psoas-major-left', 'iliacus-left', 'inguinal-ligament-left', 'rectus-femoris-left', 'sartorius-left', 'vastus-medialis-left'],
      aliases: ['femoral', 'saphenous nerve'],
    },
  },

  // ───────────────────────────── Cardiovascular ─────────────────────────────
  {
    id: 'right-atrium',
    name: 'Right atrium',
    system: 'cardiovascular',
    content: {
      anatomicalName: 'Right atrium',
      summary:
        'The right atrium is the upper right chamber of the heart. It collects oxygen-poor blood returning from the body.',
      location: 'Upper right part of the heart, forming its right border.',
      functions: [
        'Receives blood from the superior and inferior venae cavae and the coronary sinus',
        'Passes blood through the tricuspid valve into the right ventricle',
        'Contains the sinoatrial node, the natural pacemaker of the heart',
      ],
      components: ['Right auricle', 'Pectinate muscles', 'Sinoatrial node', 'Fossa ovalis', 'Openings of the venae cavae and coronary sinus'],
      howItWorks: 'Blood flows in continuously; at the end of each filling period the atrium contracts, topping up the right ventricle before it contracts.',
      facts: ['The fossa ovalis is the remnant of the foramen ovale, an opening between the atria before birth.'],
      related: ['heart', 'superior-vena-cava', 'inferior-vena-cava', 'tricuspid-valve', 'cardiac-veins'],
      aliases: ['RA', 'right auricle', 'sinoatrial node', 'SA node'],
    },
  },
  {
    id: 'right-ventricle',
    name: 'Right ventricle',
    system: 'cardiovascular',
    content: {
      anatomicalName: 'Right ventricle',
      summary:
        'The right ventricle is the lower right chamber of the heart. It pumps oxygen-poor blood to the lungs.',
      location: 'Forms most of the front (anterior) surface of the heart.',
      functions: ['Receives blood from the right atrium', 'Pumps blood through the pulmonary valve into the pulmonary trunk'],
      components: ['Trabeculae carneae (muscular ridges)', 'Three papillary muscles', 'Septomarginal trabecula (moderator band)', 'Conus arteriosus (outflow tract)'],
      howItWorks: 'When it contracts, the tricuspid valve closes and the pulmonary valve opens, sending blood to the lungs at relatively low pressure.',
      facts: ['Its wall is much thinner than the left ventricle because the lungs need far less pressure than the rest of the body.'],
      related: ['heart', 'tricuspid-valve', 'pulmonary-valve', 'pulmonary-artery', 'papillary-muscles'],
      aliases: ['RV'],
    },
  },
  {
    id: 'left-atrium',
    name: 'Left atrium',
    system: 'cardiovascular',
    content: {
      anatomicalName: 'Left atrium',
      summary:
        'The left atrium is the upper left chamber of the heart. It receives oxygen-rich blood from the lungs.',
      location: 'Forms most of the back (base) of the heart, directly in front of the esophagus.',
      functions: ['Receives blood from the four pulmonary veins', 'Passes blood through the mitral valve into the left ventricle'],
      components: ['Left auricle', 'Openings of the pulmonary veins'],
      howItWorks: 'It fills while the ventricles contract, then empties into the left ventricle, with a final boost from atrial contraction.',
      facts: ['It is the most posterior chamber of the heart.'],
      related: ['heart', 'pulmonary-vein', 'mitral-valve', 'esophagus', 'descending-aorta'],
      aliases: ['LA', 'left auricle'],
    },
  },
  {
    id: 'left-ventricle',
    name: 'Left ventricle',
    system: 'cardiovascular',
    content: {
      anatomicalName: 'Left ventricle',
      summary:
        'The left ventricle is the strongest chamber of the heart. It pumps oxygen-rich blood into the aorta for the whole body.',
      location: 'Lower left part of the heart, forming the apex and most of the left border.',
      functions: ['Receives blood from the left atrium', 'Pumps blood through the aortic valve into the aorta and systemic circulation'],
      components: ['Thick muscular wall', 'Two papillary muscles', 'Trabeculae carneae', 'Interventricular septum (shared with the right ventricle)'],
      howItWorks: 'It contracts forcefully to generate the high pressure needed to push blood around the body, while the mitral valve closes to prevent backflow.',
      facts: ['Its wall is normally about two to three times thicker than that of the right ventricle.', 'The heartbeat felt on the left chest comes mainly from its apex.'],
      related: ['heart', 'mitral-valve', 'ascending-aorta', 'papillary-muscles', 'left-coronary-artery', 'right-coronary-artery'],
      aliases: ['LV', 'apex of heart'],
    },
  },
  {
    id: 'aortic-valve',
    name: 'Aortic valve',
    system: 'cardiovascular',
    content: {
      anatomicalName: 'Aortic valve',
      summary:
        'The aortic valve guards the exit from the left ventricle into the aorta. It opens with each heartbeat and closes to stop blood leaking back.',
      location: 'Between the left ventricle and the ascending aorta, near the center of the heart.',
      functions: ['Allows blood to leave the left ventricle for the body', 'Prevents backflow from the aorta into the left ventricle'],
      components: ['Three semilunar cusps', 'Aortic sinuses (small pockets behind the cusps)'],
      howItWorks: 'Ventricular contraction pushes the cusps open; when the ventricle relaxes, backflowing blood fills the cusps and seals the valve.',
      facts: ['The coronary arteries arise from the aortic sinuses just above this valve.', 'Closure of the aortic and pulmonary valves produces the second heart sound.'],
      related: ['heart', 'ascending-aorta', 'left-coronary-artery', 'right-coronary-artery', 'mitral-valve', 'pulmonary-valve'],
      aliases: ['aortic semilunar valve'],
    },
  },
  {
    id: 'pericardium',
    name: 'Pericardium',
    system: 'cardiovascular',
    content: {
      anatomicalName: 'Pericardium',
      summary:
        'The pericardium is the protective sac that encloses the heart. A thin film of fluid inside it lets the heart beat with little friction.',
      location: 'Middle mediastinum, surrounding the heart and the roots of the great vessels, fixed below to the diaphragm.',
      functions: ['Reduces friction as the heart beats', 'Anchors the heart in the chest', 'Helps prevent sudden overfilling of the heart'],
      components: ['Fibrous pericardium (tough outer layer)', 'Parietal serous layer', 'Visceral serous layer (epicardium)', 'Pericardial cavity with fluid'],
      howItWorks: 'The two serous layers slide over each other, lubricated by a small amount of pericardial fluid.',
      related: ['heart', 'diaphragm', 'ascending-aorta', 'superior-vena-cava', 'pulmonary-artery'],
      aliases: ['pericardial sac', 'epicardium'],
    },
  },
  {
    id: 'hepatic-portal-vein',
    name: 'Hepatic portal vein',
    system: 'cardiovascular',
    content: {
      anatomicalName: 'Hepatic portal vein',
      summary:
        'The hepatic portal vein carries blood from the stomach, intestines, pancreas and spleen to the liver. This lets the liver process absorbed nutrients first.',
      location: 'Upper abdomen, from behind the neck of the pancreas up to the liver, alongside the hepatic artery and bile duct.',
      functions: [
        'Delivers nutrient-rich blood from the digestive tract to the liver',
        'Supplies most of the blood that flows through the liver',
      ],
      components: ['Superior mesenteric vein', 'Splenic vein', 'Right and left portal branches'],
      howItWorks: 'It forms where the superior mesenteric and splenic veins join, then divides inside the liver into small vessels that pass between liver cells before draining to the hepatic veins.',
      facts: ['It provides roughly three quarters of the liver\'s blood supply.'],
      related: ['superior-mesenteric-vein', 'splenic-vein', 'liver', 'pancreas', 'common-hepatic-artery', 'inferior-vena-cava'],
      aliases: ['portal vein', 'portal system'],
    },
  },

  // ───────────────────────────── Respiratory ─────────────────────────────
  {
    id: 'nasal-cavity',
    name: 'Nasal cavity',
    system: 'respiratory',
    content: {
      anatomicalName: 'Nasal cavity',
      summary:
        'The nasal cavity is the air-filled space inside the nose. It cleans, warms and moistens air and contains the sense of smell.',
      location: 'Inside the nose, from the nostrils back to the nasopharynx, above the hard palate.',
      functions: ['Filters, warms and humidifies inhaled air', 'Contains the olfactory (smell) receptors', 'Adds resonance to the voice'],
      components: ['Nasal septum', 'Superior, middle and inferior nasal conchae', 'Meatuses (air passages)', 'Olfactory region', 'Openings of the paranasal sinuses'],
      howItWorks: 'Curled bony shelves called conchae create turbulence so air contacts the moist, blood-rich lining, which traps particles and adds heat and moisture.',
      related: ['nasal-cartilages', 'inferior-nasal-concha-left', 'ethmoid', 'vomer', 'maxilla-left', 'nasal-bone-left'],
      aliases: ['nose', 'nasal passages', 'nasal septum', 'turbinates', 'sinuses'],
    },
  },
  {
    id: 'pharynx',
    name: 'Pharynx',
    system: 'respiratory',
    content: {
      anatomicalName: 'Pharynx',
      commonName: 'Throat',
      summary:
        'The pharynx is the muscular tube at the back of the nose and mouth. It is a shared passage for air and food.',
      location: 'From the base of the skull down to about the level of the sixth cervical vertebra, behind the nasal cavity, mouth and larynx.',
      functions: [
        'Conducts air between the nasal cavity and larynx',
        'Moves food and liquid from the mouth to the esophagus during swallowing',
        'Contains tonsils that help defend against infection',
      ],
      components: ['Nasopharynx', 'Oropharynx', 'Laryngopharynx', 'Pharyngeal constrictor muscles', 'Openings of the auditory (Eustachian) tubes'],
      howItWorks: 'During swallowing its constrictor muscles squeeze food downward while the soft palate and epiglottis help seal off the nose and airway.',
      related: ['esophagus', 'trachea', 'hyoid-bone', 'thyroid-cartilage', 'sphenoid-bone', 'Larynx'],
      aliases: ['throat', 'nasopharynx', 'oropharynx'],
    },
  },
  {
    id: 'larynx',
    name: 'Larynx',
    system: 'respiratory',
    content: {
      anatomicalName: 'Larynx',
      commonName: 'Voice box',
      summary:
        'The larynx is the voice box at the top of the windpipe. It protects the airway and produces sound for speech.',
      location: 'Front of the neck, below the hyoid bone and above the trachea (about C3 to C6).',
      functions: ['Produces voice (phonation)', 'Protects the lower airway during swallowing', 'Allows coughing to clear the airway'],
      components: ['Thyroid cartilage', 'Cricoid cartilage', 'Epiglottis', 'Arytenoid cartilages', 'Vocal folds (vocal cords)'],
      howItWorks: 'Air from the lungs makes the vocal folds vibrate; small muscles change their tension and position to alter pitch. During swallowing the larynx rises and closes.',
      facts: ['Most of its muscles are supplied by the recurrent laryngeal branches of the vagus nerve.'],
      related: ['thyroid-cartilage', 'trachea', 'hyoid-bone', 'esophagus', 'thyrohyoid-left'],
      aliases: ['voice box', 'vocal cords', 'vocal folds', 'glottis'],
    },
  },
  {
    id: 'epiglottis',
    name: 'Epiglottis',
    system: 'respiratory',
    content: {
      anatomicalName: 'Epiglottis',
      summary:
        'The epiglottis is a leaf-shaped flap of cartilage behind the tongue. It helps keep food and drink out of the airway when swallowing.',
      location: 'Top of the larynx, behind the root of the tongue.',
      functions: ['Helps cover the entrance to the larynx during swallowing', 'Directs food toward the esophagus'],
      components: ['Elastic cartilage core', 'Mucous membrane covering'],
      howItWorks: 'As the larynx is pulled upward during swallowing, the epiglottis tips backward over the laryngeal inlet.',
      facts: ['It is made of elastic cartilage, which makes it flexible.'],
      related: ['thyroid-cartilage', 'hyoid-bone', 'trachea', 'esophagus', 'Larynx'],
      aliases: ['epiglottic cartilage'],
    },
  },
  {
    id: 'alveoli',
    name: 'Alveoli',
    system: 'respiratory',
    content: {
      anatomicalName: 'Pulmonary alveoli',
      commonName: 'Air sacs',
      summary:
        'Alveoli are tiny, thin-walled air sacs at the ends of the airways in the lungs. They are where oxygen and carbon dioxide are exchanged.',
      location: 'Throughout the lungs, clustered at the ends of the smallest bronchioles.',
      functions: ['Allow oxygen to pass into the blood', 'Allow carbon dioxide to pass out of the blood', 'Produce surfactant that keeps them from collapsing'],
      components: ['Type I cells (thin lining)', 'Type II cells (make surfactant)', 'Alveolar macrophages', 'Surrounding capillary network'],
      howItWorks: 'Gases diffuse across the extremely thin barrier between the air in each alveolus and the blood in the capillaries around it.',
      facts: ['The lungs contain hundreds of millions of alveoli, giving a very large surface for gas exchange.'],
      related: ['lung-left', 'lung-right', 'bronchus', 'pulmonary-artery', 'pulmonary-vein'],
      aliases: ['alveolus', 'air sacs', 'surfactant'],
    },
  },
  {
    id: 'pleura',
    name: 'Pleura',
    system: 'respiratory',
    content: {
      anatomicalName: 'Pleura',
      summary:
        'The pleura is a thin, double-layered membrane around each lung. Fluid between the layers lets the lungs glide smoothly as you breathe.',
      location: 'Covering each lung and lining the inside of the chest wall, the top of the diaphragm and the sides of the mediastinum.',
      functions: ['Reduces friction during breathing', 'Couples the lungs to the chest wall so they expand together'],
      components: ['Visceral pleura (on the lung)', 'Parietal pleura (on the chest wall)', 'Pleural cavity with a thin layer of fluid'],
      howItWorks: 'Surface tension of the pleural fluid holds the two layers together, so when the chest expands the lungs are pulled open.',
      related: ['lung-left', 'lung-right', 'diaphragm', 'external-intercostal-muscle', 'first-rib-left'],
      aliases: ['pleural membrane', 'pleural cavity'],
    },
  },

  // ───────────────────────────── Digestive ─────────────────────────────
  {
    id: 'tongue',
    name: 'Tongue',
    system: 'digestive',
    content: {
      anatomicalName: 'Tongue',
      summary:
        'The tongue is a highly movable muscular organ in the mouth. It is used for tasting, chewing, swallowing and speaking.',
      location: 'Floor of the mouth, extending back into the throat; anchored to the hyoid bone and mandible.',
      functions: ['Detects taste', 'Moves food during chewing and forms it into a ball for swallowing', 'Shapes sounds for speech'],
      components: ['Intrinsic muscles (change shape)', 'Extrinsic muscles (change position)', 'Papillae', 'Taste buds', 'Lingual tonsil'],
      howItWorks: 'Intrinsic muscles curl, flatten and lengthen the tongue, while extrinsic muscles move it in and out and side to side. Taste buds on its papillae send signals to the brain.',
      facts: ['All regions with taste buds can sense all basic tastes; the idea of a strict tongue taste map is a myth.', 'Most of its muscles are controlled by the hypoglossal nerve.'],
      related: ['mandible', 'hyoid-bone', 'geniohyoid-left', 'mylohyoid-left', 'lower-teeth', 'lips'],
      aliases: ['lingual', 'taste buds'],
    },
  },
  {
    id: 'salivary-glands',
    name: 'Salivary glands',
    system: 'digestive',
    content: {
      anatomicalName: 'Salivary glands',
      summary:
        'The salivary glands make saliva, which moistens food and begins digestion. There are three main pairs plus many tiny glands.',
      location: 'Around the mouth: in front of the ear (parotid), under the jaw (submandibular) and under the tongue (sublingual).',
      functions: ['Moisten food for chewing and swallowing', 'Begin starch digestion with the enzyme amylase', 'Help protect the teeth and mouth from microbes', 'Help dissolve food so it can be tasted'],
      components: ['Parotid glands', 'Submandibular glands', 'Sublingual glands', 'Minor salivary glands'],
      howItWorks: 'The autonomic nervous system controls secretion, increasing it at the sight, smell or taste of food. Ducts carry saliva into the mouth.',
      facts: ['Adults produce roughly 0.5 to 1.5 liters of saliva a day.', 'The parotid duct opens on the inside of the cheek near the upper second molar.'],
      related: ['masseter-left', 'mandible', 'buccinator-left', 'mylohyoid-left', 'upper-teeth', 'temporal-bone-left'],
      aliases: ['saliva', 'parotid gland', 'submandibular gland', 'sublingual gland'],
    },
  },
  {
    id: 'bile-ducts',
    name: 'Bile ducts',
    system: 'digestive',
    content: {
      anatomicalName: 'Biliary tree',
      summary:
        'The bile ducts are a branching system of tubes that carry bile from the liver to the gallbladder and small intestine.',
      location: 'Inside and below the liver, running behind the duodenum and through the head of the pancreas.',
      functions: ['Drain bile from the liver', 'Carry bile to and from the gallbladder', 'Deliver bile into the duodenum to help digest fats'],
      components: ['Right and left hepatic ducts', 'Common hepatic duct', 'Cystic duct', 'Common bile duct', 'Hepatopancreatic ampulla and its sphincter'],
      howItWorks: 'The common hepatic duct and the cystic duct join to form the common bile duct, which usually meets the pancreatic duct and opens into the duodenum. When the sphincter is closed, bile backs up into the gallbladder for storage.',
      related: ['liver', 'gallbladder', 'pancreatic-duct', 'duodenum', 'pancreas'],
      aliases: ['bile duct', 'common bile duct', 'hepatic duct', 'cystic duct', 'biliary system'],
    },
  },
  {
    id: 'cecum',
    name: 'Cecum',
    system: 'digestive',
    content: {
      anatomicalName: 'Cecum',
      summary:
        'The cecum is a pouch that forms the first part of the large intestine. The small intestine empties into it and the appendix hangs from it.',
      location: 'Lower right abdomen (right iliac fossa), below the junction with the ileum.',
      functions: ['Receives digested material from the ileum', 'Begins absorption of water and salts in the large intestine'],
      components: ['Ileocecal valve', 'Opening of the appendix', 'Taeniae coli'],
      howItWorks: 'Contents pass from the ileum through the ileocecal valve into the cecum and then up the ascending colon.',
      related: ['colon', 'ileum', 'appendix', 'taeniae-coli', 'superior-mesenteric-artery'],
      aliases: ['caecum', 'ileocecal valve'],
    },
  },
  {
    id: 'anal-canal',
    name: 'Anal canal',
    system: 'digestive',
    content: {
      anatomicalName: 'Anal canal',
      summary:
        'The anal canal is the last few centimeters of the digestive tract. Its sphincter muscles keep it closed until stool is passed.',
      location: 'Below the rectum, passing through the pelvic floor to the anus.',
      functions: ['Maintains continence', 'Allows controlled passage of stool'],
      components: ['Internal anal sphincter (involuntary)', 'External anal sphincter (voluntary)', 'Anal columns', 'Pectinate line'],
      howItWorks: 'The internal sphincter stays contracted automatically, while the external sphincter and puborectalis muscle are under voluntary control.',
      facts: ['It is about 3 to 4 cm long.'],
      related: ['rectum', 'external-anal-sphincter', 'puborectalis-left', 'iliococcygeus-left'],
      aliases: ['anus', 'anal sphincter'],
    },
  },

  // ───────────────────────────── Lymphatic ─────────────────────────────
  {
    id: 'lymph-nodes',
    name: 'Lymph nodes',
    system: 'lymphatic',
    content: {
      anatomicalName: 'Lymph nodes',
      summary:
        'Lymph nodes are small, bean-shaped filters along lymphatic vessels. They trap germs and help start immune responses.',
      location: 'Throughout the body, in clusters in the neck, armpits, groin, chest and abdomen.',
      functions: ['Filter lymph and trap microbes, debris and abnormal cells', 'House lymphocytes that launch immune responses'],
      components: ['Capsule', 'Cortex with lymphoid follicles (B cells)', 'Paracortex (T cells)', 'Medulla', 'Afferent and efferent lymphatic vessels'],
      howItWorks: 'Lymph enters through several vessels, percolates past immune cells that check it for foreign material, and leaves through a vessel at the hilum.',
      facts: ['The body has several hundred lymph nodes.', 'Nodes can enlarge while fighting an infection.'],
      related: ['spleen', 'thymus', 'subclavian-vein-left', 'Lymphatic vessels', 'Thoracic duct'],
      aliases: ['lymph node', 'lymph glands', 'glands'],
    },
  },
  {
    id: 'lymphatic-vessels',
    name: 'Lymphatic vessels',
    system: 'lymphatic',
    content: {
      anatomicalName: 'Lymphatic vessels',
      summary:
        'Lymphatic vessels are thin tubes that collect excess fluid from the tissues. They return it, as lymph, to the bloodstream.',
      location: 'Throughout most of the body, alongside blood vessels.',
      functions: ['Return excess tissue fluid to the blood', 'Transport absorbed dietary fats from the intestine', 'Carry immune cells and antigens to lymph nodes'],
      components: ['Lymphatic capillaries', 'Collecting vessels with valves', 'Lacteals (in the intestinal villi)', 'Thoracic duct and right lymphatic duct'],
      howItWorks: 'Fluid enters through overlapping cells of the capillaries. Valves keep it moving one way, pushed along by muscle movements, breathing and the vessel walls, until it drains into veins at the base of the neck.',
      facts: ['Lymph from the intestine after a fatty meal looks milky and is called chyle.'],
      related: ['subclavian-vein-left', 'internal-jugular-vein-left', 'jejunum', 'spleen', 'Thoracic duct', 'Lymph nodes'],
      aliases: ['lymphatics', 'lymph', 'lacteals', 'lymphatic system'],
    },
  },
  {
    id: 'thoracic-duct',
    name: 'Thoracic duct',
    system: 'lymphatic',
    content: {
      anatomicalName: 'Thoracic duct',
      summary:
        'The thoracic duct is the largest lymphatic vessel. It returns lymph from most of the body to the blood.',
      location: 'From the upper abdomen, up through the chest beside the aorta and esophagus, to the base of the neck on the left.',
      functions: ['Drains lymph from the legs, abdomen, left side of the chest, left arm and left side of the head and neck', 'Carries absorbed dietary fats into the bloodstream'],
      components: ['Cisterna chyli (sac at its start, in many people)', 'Valves'],
      howItWorks: 'It ascends through the aortic opening of the diaphragm and empties into the junction of the left internal jugular and left subclavian veins.',
      facts: ['Lymph from the right upper quarter of the body drains separately through the right lymphatic duct.'],
      related: ['descending-aorta', 'esophagus', 'subclavian-vein-left', 'internal-jugular-vein-left', 'brachiocephalic-vein-left', 'diaphragm'],
      aliases: ['left lymphatic duct', 'cisterna chyli'],
    },
  },
  {
    id: 'tonsils',
    name: 'Tonsils',
    system: 'lymphatic',
    content: {
      anatomicalName: 'Tonsils',
      summary:
        'The tonsils are clusters of lymphoid tissue around the throat. They sample what is breathed in and swallowed to help the immune system respond.',
      location: 'Around the opening of the throat: at the sides of the oropharynx, on the back of the tongue and in the roof of the nasopharynx.',
      functions: ['Detect microbes entering through the mouth and nose', 'Help start local immune responses'],
      components: ['Palatine tonsils', 'Pharyngeal tonsil (adenoids)', 'Lingual tonsil', 'Tubal tonsils'],
      howItWorks: 'Deep pits (crypts) in the tonsil surface trap material so that immune cells beneath can sample it.',
      facts: ['Together they form a ring of lymphoid tissue around the throat.', 'They are relatively large in childhood and usually shrink with age.'],
      related: ['Pharynx', 'Tongue', 'thymus', 'spleen'],
      aliases: ['tonsil', 'adenoids', 'palatine tonsils', 'Waldeyer ring'],
    },
  },
  {
    id: 'bone-marrow',
    name: 'Bone marrow',
    system: 'lymphatic',
    content: {
      anatomicalName: 'Bone marrow',
      summary:
        'Bone marrow is the soft tissue inside bones. Red marrow makes all types of blood cells.',
      location: 'Inside bones; in adults, red marrow is found mainly in the pelvis, vertebrae, ribs, sternum, skull and the ends of the femur and humerus.',
      functions: ['Produces red blood cells, white blood cells and platelets', 'Site where B lymphocytes mature', 'Stores fat (yellow marrow)'],
      components: ['Red marrow', 'Yellow (fatty) marrow', 'Hematopoietic stem cells'],
      howItWorks: 'Stem cells divide and mature into the different blood cell types, which then enter the bloodstream through thin-walled vessels.',
      facts: ['It produces billions of new blood cells every day.', 'At birth nearly all marrow is red; much of it is gradually replaced by yellow marrow.'],
      related: ['hip-bone-left', 'body-of-sternum', 'femur-left', 'humerus-left', 'first-lumbar-vertebra', 'thymus'],
      aliases: ['marrow', 'red marrow', 'blood cell production', 'hematopoiesis'],
    },
  },

  // ───────────────────────────── Reproductive ─────────────────────────────
  {
    id: 'ovaries',
    name: 'Ovaries',
    system: 'reproductive',
    content: {
      anatomicalName: 'Ovary',
      summary:
        'The ovaries are the two female reproductive glands. They release egg cells and produce the hormones estrogen and progesterone.',
      location: 'Pelvis, one on each side of the uterus, near the side walls of the pelvis.',
      functions: ['Develop and release egg cells (oocytes)', 'Produce estrogens and progesterone', 'Help regulate the menstrual cycle'],
      components: ['Ovarian follicles', 'Corpus luteum (forms after ovulation)', 'Ovarian ligament', 'Suspensory ligament with the ovarian vessels'],
      howItWorks: 'Pituitary hormones (FSH and LH) cause follicles to mature; usually one releases an egg at ovulation each cycle, and the remaining follicle becomes the corpus luteum, which makes progesterone.',
      facts: ['A female is born with all the follicles she will ever have.'],
      related: ['pituitary-gland', 'descending-aorta', 'hip-bone-left', 'Uterine tubes', 'Uterus'],
      aliases: ['ovary', 'female gonads', 'ovulation'],
    },
  },
  {
    id: 'uterine-tubes',
    name: 'Uterine tubes',
    system: 'reproductive',
    content: {
      anatomicalName: 'Uterine tubes',
      commonName: 'Fallopian tubes',
      summary:
        'The uterine tubes are a pair of narrow tubes that carry egg cells from the ovaries to the uterus. Fertilization usually happens here.',
      location: 'Pelvis, extending from the upper sides of the uterus toward each ovary.',
      functions: ['Capture the egg released from the ovary', 'Provide the usual site of fertilization', 'Transport the egg or early embryo to the uterus'],
      components: ['Fimbriae (finger-like fringes)', 'Infundibulum', 'Ampulla', 'Isthmus', 'Intramural part'],
      howItWorks: 'Fimbriae sweep the released egg into the tube, and cilia together with gentle muscle contractions move it toward the uterus over several days.',
      facts: ['Each tube is about 10 cm long.'],
      related: ['urinary-bladder', 'rectum', 'Ovaries', 'Uterus'],
      aliases: ['fallopian tubes', 'oviducts', 'uterine tube'],
    },
  },
  {
    id: 'uterus',
    name: 'Uterus',
    system: 'reproductive',
    content: {
      anatomicalName: 'Uterus',
      commonName: 'Womb',
      summary:
        'The uterus is a hollow, muscular organ in the female pelvis. It is where a fertilized egg implants and a fetus develops during pregnancy.',
      location: 'Pelvis, between the urinary bladder in front and the rectum behind.',
      functions: ['Provides a site for implantation of an embryo', 'Supports and protects the developing fetus', 'Contracts during childbirth', 'Sheds its lining during menstruation'],
      components: ['Fundus', 'Body', 'Cervix', 'Endometrium (inner lining)', 'Myometrium (muscle layer)', 'Perimetrium (outer covering)'],
      howItWorks: 'Each cycle, ovarian hormones thicken the endometrium. If no pregnancy occurs, the lining is shed as menstruation; in pregnancy, the uterus enlarges greatly.',
      facts: ['In a non-pregnant adult it is roughly the size of a pear, about 7 to 8 cm long.'],
      related: ['urinary-bladder', 'rectum', 'sacrum', 'pituitary-gland', 'Uterine tubes', 'Vagina'],
      aliases: ['womb', 'cervix', 'endometrium'],
    },
  },
  {
    id: 'vagina',
    name: 'Vagina',
    system: 'reproductive',
    content: {
      anatomicalName: 'Vagina',
      summary:
        'The vagina is a muscular, elastic canal that connects the uterus to the outside of the body.',
      location: 'Pelvis, from the cervix of the uterus to the vestibule of the vulva, between the urethra and bladder in front and the rectum behind.',
      functions: ['Serves as the birth canal', 'Provides an outlet for menstrual flow', 'Receives the penis during sexual intercourse'],
      components: ['Muscular wall', 'Folded lining (rugae)', 'Fornices (recesses around the cervix)'],
      howItWorks: 'Its folded, elastic walls allow it to stretch considerably, and normal bacteria help keep its environment mildly acidic.',
      facts: ['It is typically about 7 to 10 cm long.'],
      related: ['urethra', 'urinary-bladder', 'rectum', 'pubococcygeus-left', 'Uterus', 'Vulva'],
      aliases: ['birth canal', 'vaginal canal'],
    },
  },
  {
    id: 'vulva',
    name: 'Vulva',
    system: 'reproductive',
    content: {
      anatomicalName: 'Vulva',
      summary:
        'The vulva is the collective name for the external female genitals. It surrounds and protects the openings of the urethra and vagina.',
      location: 'External genital region, below the mons pubis and in front of the anus.',
      functions: ['Protects the urethral and vaginal openings', 'Provides sexual sensation', 'Glands provide lubrication'],
      components: ['Mons pubis', 'Labia majora', 'Labia minora', 'Clitoris', 'Vestibule', 'Greater vestibular (Bartholin) glands'],
      howItWorks: 'The clitoris contains erectile tissue and many sensory nerve endings, and the vestibular glands secrete mucus.',
      facts: ['The clitoris develops from the same embryonic tissue as the penis.'],
      related: ['pubic-hair', 'urethra', 'skin', 'hip-bone-left', 'Vagina'],
      aliases: ['external genitalia', 'labia', 'clitoris'],
    },
  },
  {
    id: 'scrotum',
    name: 'Scrotum',
    system: 'reproductive',
    content: {
      anatomicalName: 'Scrotum',
      summary:
        'The scrotum is the pouch of skin and muscle that holds the testes. It keeps them slightly cooler than the rest of the body.',
      location: 'Below the penis, between the thighs.',
      functions: ['Contains and protects the testes', 'Helps regulate testicular temperature'],
      components: ['Skin', 'Dartos muscle', 'Scrotal septum', 'Cremaster muscle (around the spermatic cord)'],
      howItWorks: 'In the cold the dartos muscle wrinkles the skin and the cremaster muscle draws the testes closer to the body; in warmth they relax.',
      related: ['testis-left', 'testis-right', 'epididymis-left', 'skin', 'pubic-hair'],
      aliases: ['scrotal sac'],
    },
  },
  {
    id: 'mammary-glands',
    name: 'Mammary glands',
    system: 'reproductive',
    content: {
      anatomicalName: 'Mammary glands',
      summary:
        'The mammary glands are milk-producing glands within the breasts. They develop fully in females at puberty and produce milk after childbirth.',
      location: 'Front of the chest, over the pectoralis major muscle, roughly between the second and sixth ribs.',
      functions: ['Produce milk (lactation)', 'Deliver milk through ducts to the nipple'],
      components: ['Lobes and lobules', 'Milk-producing alveoli', 'Lactiferous ducts', 'Nipple and areola', 'Suspensory ligaments', 'Fat tissue'],
      howItWorks: 'After childbirth, prolactin from the pituitary stimulates milk production and oxytocin causes milk to be released during feeding.',
      facts: ['They are modified skin glands present in both sexes.', 'Most lymph from the breast drains to the lymph nodes in the armpit.'],
      related: ['pectoralis-major-left', 'second-rib-left', 'sixth-rib-left', 'body-of-sternum', 'pituitary-gland', 'skin'],
      aliases: ['breast', 'breasts', 'mammary', 'nipple', 'lactation'],
    },
  },

  // ───────────────────────────── Integumentary ─────────────────────────────
  {
    id: 'epidermis',
    name: 'Epidermis',
    system: 'integumentary',
    content: {
      anatomicalName: 'Epidermis',
      summary:
        'The epidermis is the thin outer layer of the skin. It forms a tough, waterproof barrier that constantly renews itself.',
      location: 'Outermost layer of the skin, on top of the dermis.',
      functions: ['Forms a barrier against microbes, chemicals and water loss', 'Protects against ultraviolet light with the pigment melanin', 'Contains immune cells that detect invaders'],
      components: ['Stratum basale', 'Stratum spinosum', 'Stratum granulosum', 'Stratum lucidum (thick skin only)', 'Stratum corneum', 'Keratinocytes, melanocytes, Langerhans and Merkel cells'],
      howItWorks: 'New cells form in the deepest layer and move outward over several weeks, filling with keratin and flattening until they are shed from the surface.',
      facts: ['It has no blood vessels; it is nourished from the dermis below.', 'It is thickest on the palms and soles.'],
      related: ['skin', 'Dermis', 'Hypodermis'],
      aliases: ['outer skin', 'stratum corneum', 'keratinocytes', 'melanin'],
    },
  },
  {
    id: 'dermis',
    name: 'Dermis',
    system: 'integumentary',
    content: {
      anatomicalName: 'Dermis',
      summary:
        'The dermis is the thick, strong layer of skin beneath the epidermis. It contains blood vessels, nerves, hair follicles and glands.',
      location: 'Beneath the epidermis and above the hypodermis.',
      functions: ['Gives the skin strength and elasticity', 'Supplies nutrients to the epidermis', 'Houses touch, pressure, pain and temperature receptors', 'Helps regulate temperature through its blood flow'],
      components: ['Papillary layer', 'Reticular layer', 'Collagen and elastic fibers', 'Blood vessels and nerves', 'Hair follicles and glands'],
      howItWorks: 'Fibroblasts make collagen and elastic fibers, and ridges of the upper dermis interlock with the epidermis, forming the patterns of fingerprints.',
      facts: ['Tattoo ink is deposited in the dermis, which is why tattoos last.'],
      related: ['skin', 'Epidermis', 'Hypodermis', 'Hair follicles', 'Sweat glands'],
      aliases: ['corium', 'true skin', 'collagen'],
    },
  },
  {
    id: 'hypodermis',
    name: 'Hypodermis',
    system: 'integumentary',
    content: {
      anatomicalName: 'Hypodermis',
      commonName: 'Subcutaneous tissue',
      summary:
        'The hypodermis is the layer of fat and loose connective tissue under the skin. It cushions, insulates and anchors the skin.',
      location: 'Beneath the dermis, above the deep fascia and muscles.',
      functions: ['Stores energy as fat', 'Insulates against heat loss', 'Cushions underlying structures', 'Attaches the skin to deeper tissues while allowing movement'],
      components: ['Adipose (fat) tissue', 'Loose connective tissue', 'Larger blood vessels and nerves'],
      howItWorks: 'Fat cells store energy and act as padding, while loose connective fibers let the skin slide over the structures beneath.',
      facts: ['Strictly speaking it is not part of the skin, but it is usually described with it.', 'Its thickness varies greatly between body regions and individuals.'],
      related: ['skin', 'Dermis', 'Epidermis'],
      aliases: ['subcutaneous tissue', 'subcutis', 'subcutaneous fat', 'superficial fascia'],
    },
  },
  {
    id: 'hair-follicles',
    name: 'Hair follicles',
    system: 'integumentary',
    content: {
      anatomicalName: 'Hair follicles',
      summary:
        'Hair follicles are tiny tube-shaped structures in the skin where hairs grow. Each one has its own small muscle and oil gland.',
      location: 'In the dermis (and sometimes the upper hypodermis) over almost all of the body except the palms, soles and lips.',
      functions: ['Produce hair', 'Contain stem cells that help regenerate hair and skin', 'Sense touch through nerve endings around them'],
      components: ['Hair bulb', 'Dermal papilla', 'Hair matrix', 'Arrector pili muscle', 'Sebaceous gland'],
      howItWorks: 'Cells in the matrix at the base divide and become keratinized, pushing the hair shaft upward; melanocytes add pigment that gives hair its color.',
      facts: ['Contraction of the arrector pili muscles makes hairs stand up, causing goosebumps.'],
      related: ['skin', 'scalp-hair', 'eyebrows', 'pubic-hair', 'Sebaceous glands'],
      aliases: ['hair follicle', 'hair root', 'arrector pili', 'goosebumps'],
    },
  },
  {
    id: 'nails',
    name: 'Nails',
    system: 'integumentary',
    content: {
      anatomicalName: 'Nails',
      summary:
        'Nails are hard plates of keratin on the tips of the fingers and toes. They protect the fingertips and help with fine handling.',
      location: 'Back surface of the tips of the fingers and toes.',
      functions: ['Protect the tips of the fingers and toes', 'Support the fingertip pad, aiding grip and fine touch', 'Allow scratching and picking up small objects'],
      components: ['Nail plate', 'Nail bed', 'Nail matrix', 'Lunula', 'Cuticle (eponychium)', 'Nail folds'],
      howItWorks: 'Cells in the nail matrix under the skin at the base divide and harden with keratin, pushing the nail plate forward over the nail bed.',
      facts: ['Fingernails grow about 3 mm per month; toenails grow more slowly.'],
      related: ['phalanges-hand-left', 'phalanges-foot-left', 'skin'],
      aliases: ['nail', 'fingernails', 'toenails', 'cuticle'],
    },
  },
  {
    id: 'sweat-glands',
    name: 'Sweat glands',
    system: 'integumentary',
    content: {
      anatomicalName: 'Sudoriferous glands',
      commonName: 'Sweat glands',
      summary:
        'Sweat glands release sweat onto the skin. Evaporation of sweat is the body\'s main way of cooling down.',
      location: 'In the dermis and hypodermis over most of the body; especially dense on the palms, soles and forehead.',
      functions: ['Cool the body through evaporation', 'Excrete small amounts of water, salts and waste', 'Help keep the skin of the palms and soles slightly moist for grip'],
      components: ['Eccrine glands (most of the body)', 'Apocrine glands (armpits and groin)'],
      howItWorks: 'Eccrine glands release watery sweat directly onto the skin when the nervous system detects heat or stress. Apocrine glands open into hair follicles and become active at puberty.',
      facts: ['Sweat itself is nearly odorless; body odor comes from skin bacteria breaking down apocrine sweat.', 'The body has a few million sweat glands.'],
      related: ['skin', 'Dermis', 'Hair follicles'],
      aliases: ['sweat', 'perspiration', 'eccrine glands', 'apocrine glands'],
    },
  },
  {
    id: 'sebaceous-glands',
    name: 'Sebaceous glands',
    system: 'integumentary',
    content: {
      anatomicalName: 'Sebaceous glands',
      commonName: 'Oil glands',
      summary:
        'Sebaceous glands produce sebum, an oily substance that lubricates and waterproofs the skin and hair.',
      location: 'In the dermis, usually opening into hair follicles; most numerous on the face and scalp and absent from the palms and soles.',
      functions: ['Lubricate the skin and hair', 'Reduce water loss from the skin', 'Contribute to the skin\'s protective surface film'],
      components: ['Gland lobules', 'Short duct into the hair follicle'],
      howItWorks: 'Their cells fill with lipids and then break apart, releasing their contents as sebum (a holocrine secretion).',
      facts: ['Their activity increases at puberty under the influence of androgens.'],
      related: ['skin', 'scalp-hair', 'Hair follicles', 'Dermis'],
      aliases: ['oil glands', 'sebum'],
    },
  },

  // ───────────────────────────── Skeletal ─────────────────────────────
  {
    id: 'coccyx',
    name: 'Coccyx',
    system: 'skeletal',
    content: {
      anatomicalName: 'Coccyx',
      commonName: 'Tailbone',
      summary:
        'The coccyx is the small triangular bone at the very bottom of the spine. It is made of several tiny fused vertebrae.',
      location: 'Below the sacrum, at the lower end of the vertebral column.',
      functions: ['Provides attachment for pelvic floor muscles, ligaments and part of the gluteus maximus', 'Helps bear weight when sitting and leaning back'],
      components: ['Usually three to five small fused coccygeal vertebrae'],
      howItWorks: 'It joins the sacrum at a small joint that allows slight movement, for example during childbirth.',
      facts: ['It is the remnant of a tail.'],
      related: ['sacrum', 'gluteus-maximus-left', 'coccygeus-left', 'iliococcygeus-left', 'hip-bone-left'],
      aliases: ['tailbone', 'coccygeal vertebrae'],
    },
  },
  {
    id: 'auditory-ossicles',
    name: 'Auditory ossicles',
    system: 'skeletal',
    content: {
      anatomicalName: 'Auditory ossicles',
      commonName: 'Middle ear bones',
      summary:
        'The auditory ossicles are three tiny bones in the middle ear. They pass sound vibrations from the eardrum to the inner ear.',
      location: 'In the middle ear cavity within the temporal bone, between the eardrum and the inner ear.',
      functions: ['Transmit vibrations from the eardrum to the inner ear', 'Amplify the force of sound vibrations', 'Help dampen very loud sounds via attached muscles'],
      components: ['Malleus (hammer)', 'Incus (anvil)', 'Stapes (stirrup)', 'Tensor tympani and stapedius muscles'],
      howItWorks: 'The malleus is attached to the eardrum and the stapes fits into the oval window of the cochlea. Because the eardrum is much larger than the oval window, the chain concentrates the vibrations.',
      facts: ['The stapes is the smallest bone in the human body.'],
      related: ['ear', 'temporal-bone-left', 'temporal-bone-right'],
      aliases: ['ossicles', 'malleus', 'incus', 'stapes', 'hammer', 'anvil', 'stirrup', 'ear bones'],
    },
  },
];
