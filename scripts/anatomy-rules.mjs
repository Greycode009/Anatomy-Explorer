// Rules that turn BodyParts3D part names into stable anatomical structures.
// Each BodyParts3D STL is one "part"; several parts can form one selectable structure
// (e.g. the three parts of the deltoid). The output IDs are the app's stable structure IDs.

export const SYSTEMS = [
  'skeletal', 'muscular', 'nervous', 'cardiovascular', 'respiratory', 'digestive',
  'urinary', 'reproductive', 'endocrine', 'lymphatic', 'integumentary',
];

export function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function cleanName(name) {
  return name.replace(/, nsn$/, '').trim();
}

/** Remove the laterality word wherever it appears ("left femur", "long head of left biceps"). */
function splitSide(name) {
  const m = name.match(/\b(left|right)\b/);
  if (!m) return { side: 'midline', base: name };
  return { side: m[1], base: name.replace(/\b(left|right) /, '').replace(/ (left|right)$/, '') };
}

// --- grouping -------------------------------------------------------------------------------

const MUSCLE_PART = /^(.*?) (part|head|belly|limb) of (?:the )?(.+)$/;

/** Returns { key, name, side } describing the structure a part belongs to. */
export function groupFor(rawName) {
  const name = cleanName(rawName);
  const { side, base } = splitSide(name);
  const sided = (b, label = b) => ({ key: side === 'midline' ? b : `${b}-${side}`, base: b, name: side === 'midline' ? cap(label) : `${cap(side)} ${label}`, side });

  if (name === 'wall of heart') return { key: 'heart', base: 'heart', name: 'Heart', side: 'midline' };
  if (name === 'ear') return { key: 'ear', base: 'ear', name: 'External ears', side: 'midline' };
  if (name === 'eyeball') return { key: 'eyeball', base: 'eyeball', name: 'Eyeballs', side: 'midline' };
  if (/papillary muscle/.test(name)) return { key: 'papillary-muscles', base: 'papillary-muscles', name: 'Papillary muscles', side: 'midline' };
  if (/left coronary artery/.test(name)) return { key: 'left-coronary-artery', base: 'coronary-artery', name: 'Left coronary artery (and branches)', side: 'left' };
  if (/right coronary artery/.test(name)) return { key: 'right-coronary-artery', base: 'coronary-artery', name: 'Right coronary artery (and branches)', side: 'right' };
  if (/cardiac vein|coronary sinus|veins of left ventricle/.test(name)) return { key: 'cardiac-veins', base: 'cardiac-veins', name: 'Cardiac veins and coronary sinus', side: 'midline' };
  if (/lobe of (left |right )?lung/.test(name)) {
    const s = /left/.test(name) ? 'left' : 'right';
    return { key: `lung-${s}`, base: 'lung', name: `${cap(s)} lung`, side: s };
  }
  if (/lobe of thymus/.test(name)) return { key: 'thymus', base: 'thymus', name: 'Thymus', side: 'midline' };
  if (/costal cartilage/.test(name)) return sided('costal-cartilages', 'costal cartilages');
  if (/^intervertebral disk/.test(name)) return { key: 'intervertebral-discs', base: 'intervertebral-discs', name: 'Intervertebral discs', side: 'midline' };
  if (/upper .*tooth/.test(name)) return { key: 'upper-teeth', base: 'teeth', name: 'Upper (maxillary) teeth', side: 'midline' };
  if (/lower .*tooth/.test(name)) return { key: 'lower-teeth', base: 'teeth', name: 'Lower (mandibular) teeth', side: 'midline' };
  if (/^gingiva/.test(name)) return { key: 'gingiva', base: 'gingiva', name: 'Gingiva (gums)', side: 'midline' };
  if (/phalanx of .*(thumb|finger)/.test(name)) return sided('phalanges-hand', 'hand phalanges (finger bones)');
  if (/phalanx of .*toe/.test(name)) return sided('phalanges-foot', 'foot phalanges (toe bones)');
  if (/lumbrical of (left|right) foot/.test(name)) return sided('lumbricals-foot', 'lumbricals of foot');
  if (/plantar interosseous/.test(name)) return sided('plantar-interossei', 'plantar interossei');
  if (/lateral ventricle|third ventricle|fourth ventricle|cerebral aqueduct|interventricular foramen|central canal of spinal cord/.test(name)) {
    return { key: 'ventricular-system', base: 'ventricular-system', name: 'Ventricular system of the brain', side: 'midline' };
  }
  if (/superior colliculus/.test(name)) return { key: 'superior-colliculi', base: 'superior-colliculi', name: 'Superior colliculi', side: 'midline' };
  if (/inferior colliculus/.test(name)) return { key: 'inferior-colliculi', base: 'inferior-colliculi', name: 'Inferior colliculi', side: 'midline' };
  if (/taenia$/.test(name)) return { key: 'taeniae-coli', base: 'taeniae-coli', name: 'Taeniae coli', side: 'midline' };
  if (/^set of head hairs$/.test(name)) return { key: 'scalp-hair', base: 'scalp-hair', name: 'Scalp hair', side: 'midline' };
  if (/^set of eyebrows$/.test(name)) return { key: 'eyebrows', base: 'eyebrows', name: 'Eyebrows', side: 'midline' };
  if (/^set of pubic hairs$/.test(name)) return { key: 'pubic-hair', base: 'pubic-hair', name: 'Pubic hair', side: 'midline' };
  if (/superior temporal gyrus/.test(name)) return sided('superior-temporal-gyrus', 'superior temporal gyrus');
  if (/labial part of mouth/.test(name)) return { key: 'lips', base: 'lips', name: 'Lips (labial part of mouth)', side: 'midline' };

  const m = base.match(MUSCLE_PART);
  if (m && !/sternum/.test(base)) return sided(slug(m[3]), m[3]);
  if (/^set of (left |right )?/.test(base)) {
    const b = base.replace(/^set of /, '');
    return sided(slug(b), b);
  }
  return sided(slug(base), base);
}

// --- system and layer classification ---------------------------------------------------------

const SKELETAL = /\b(bone|vertebra|rib|femur|tibia|fibula|patella|humerus|radius|ulna|clavicle|scapula|manubrium|xiphoid process|sacrum|atlas|axis|mandible|maxilla|ethmoid|sphenoid|vomer|calcaneus|talus|cuboid|navicular|cuneiform|metacarpal|metatarsal|phalanges|scaphoid|lunate|triquetral|pisiform|trapezium|trapezoid|capitate|hamate|sesamoid|costal cartilages|intervertebral discs|interosseous membrane|long plantar ligament|inferior nasal concha|body of sternum)\b/;
const NERVOUS = /(gyrus|gyri|lobe$|cerebellum|pons|medulla oblongata|midbrain|thalamus|hypothalamus|hippocampus|amygdala|caudate|putamen|globus pallidus|corpus callosum|fornix|commissure|ventricular system|colliculi|geniculate|stria|habenula|septum pellucidum|choroid plexus|lamina terminalis|tuber cinereum|mammillary|interpeduncular|peduncle|optic|internal capsule|insula|white matter|precuneus|eyeball|^ear$)/;
const CARDIO = /(heart|valve|papillary|coronary|cardiac veins|aorta|vena cava|artery|vein|arteries)/;
const RESPIRATORY = /(trachea|bronchus|lung|thyroid cartilage|nasal cartilages|diaphragm)/;
const DIGESTIVE = /(esophagus|stomach|duodenum|jejunum|ileum|colon|appendix|rectum|liver|gallbladder|pancreas|pancreatic duct|teeth|gingiva|lips|taeniae coli)/;
const URINARY = /(kidney|ureter|urinary bladder|urethra)/;
const REPRODUCTIVE = /(testis|epididymis|deferent duct|seminal vesicle|prostate|penis)/;
const ENDOCRINE = /(pituitary|adrenal gland|pineal)/;
const LYMPHATIC = /(spleen|thymus)/;
const INTEGUMENTARY = /(skin|hair|eyebrows)/;

/** Muscles and connective tissue that lie directly beneath the skin. Everything else muscular is "deep". */
const SUPERFICIAL_MUSCLES = new Set([
  'deltoid', 'pectoralis-major', 'trapezius', 'latissimus-dorsi', 'external-oblique', 'rectus-abdominis', 'serratus-anterior',
  'sternocleidomastoid', 'platysma', 'biceps-brachii', 'triceps-brachii', 'brachioradialis', 'flexor-carpi-radialis',
  'palmaris-longus', 'flexor-carpi-ulnaris', 'pronator-teres', 'extensor-carpi-radialis-longus', 'extensor-carpi-radialis-brevis',
  'extensor-digitorum', 'extensor-digiti-minimi', 'extensor-carpi-ulnaris', 'anconeus', 'gluteus-maximus', 'tensor-fasciae-latae',
  'sartorius', 'rectus-femoris', 'vastus-lateralis', 'vastus-medialis', 'gracilis', 'adductor-longus', 'pectineus', 'biceps-femoris',
  'semitendinosus', 'gastrocnemius', 'tibialis-anterior', 'extensor-digitorum-longus', 'fibularis-longus', 'frontalis', 'occipitalis',
  'orbicularis-oculi', 'orbicularis-oris', 'zygomaticus-major', 'zygomaticus-minor', 'masseter', 'temporalis', 'temporoparietalis',
  'aponeurosis-of-epicranius', 'teres-major', 'infraspinatus-muscle', 'linea-alba', 'iliotibial-tract', 'calcaneal-tendon',
  'gluteus-medius', 'soleus', 'abductor-pollicis-longus', 'extensor-pollicis-brevis', 'nasalis', 'procerus', 'depressor-anguli-oris',
  'risorius', 'mentalis', 'levator-labii-superioris', 'buccinator',
]);

export function classify(group) {
  const b = group.base.replace(/-/g, ' ');
  let system = 'muscular';
  const alsoIn = [];
  if (INTEGUMENTARY.test(b)) system = 'integumentary';
  else if (ENDOCRINE.test(b)) system = 'endocrine';
  else if (LYMPHATIC.test(b)) system = 'lymphatic';
  else if (CARDIO.test(b)) system = 'cardiovascular';
  else if (RESPIRATORY.test(b)) system = 'respiratory';
  else if (DIGESTIVE.test(b)) system = 'digestive';
  else if (URINARY.test(b)) system = 'urinary';
  else if (REPRODUCTIVE.test(b)) system = 'reproductive';
  else if (NERVOUS.test(b)) system = 'nervous';
  else if (SKELETAL.test(b)) system = 'skeletal';

  if (/pancreas/.test(b) || /testis/.test(b) || /hypothalamus/.test(b) || /thymus/.test(b)) alsoIn.push('endocrine');
  if (/pineal/.test(b)) alsoIn.push('nervous');
  if (/diaphragm|external anal sphincter/.test(b)) alsoIn.push('muscular');
  if (/external anal sphincter/.test(b)) alsoIn.push('digestive');
  if (/(splenic|thymus)/.test(b)) { if (!alsoIn.includes('lymphatic') && system !== 'lymphatic') alsoIn.push('lymphatic'); }

  let layer;
  if (system === 'integumentary') layer = 'skin';
  else if (system === 'skeletal') layer = 'skeleton';
  else if (system === 'muscular') layer = SUPERFICIAL_MUSCLES.has(group.base) ? 'muscles-superficial' : 'muscles-deep';
  else if (/diaphragm/.test(b)) layer = 'muscles-deep';
  else if (system === 'cardiovascular') layer = 'vessels';
  else if (system === 'nervous') layer = 'nervous';
  else layer = 'organs';
  return { system, alsoIn, layer };
}

// --- educational content keys ----------------------------------------------------------------

/** Maps a structure group to the key of its educational entry in src/data/content. */
export function contentIdFor(group, rawNames) {
  const b = group.base;
  const n = rawNames.join(' ');
  if (b === 'intervertebral-discs' || b === 'heart' || b === 'lung' || b === 'teeth') return b;
  if (b === 'atlas' || b === 'axis' || b === 'sacrum') return b;
  if (/cervical vertebra/.test(n)) return 'cervical-vertebra';
  if (/thoracic vertebra/.test(n)) return 'thoracic-vertebra';
  if (/lumbar vertebra/.test(n)) return 'lumbar-vertebra';
  if (/ rib$/.test(n)) return 'rib';
  if (/(scaphoid|lunate|triquetral|pisiform|trapezium|trapezoid|capitate|hamate)$/.test(n)) return 'carpal-bones';
  if (/metacarpal/.test(n)) return 'metacarpals';
  if (/(talus|calcaneus|cuboid|navicular|cuneiform)/.test(n)) return 'tarsal-bones';
  if (/metatarsal/.test(n)) return 'metatarsals';
  if (/gyrus|gyri|precuneus/.test(n)) return b.replace(/-(left|right)$/, '');
  if (/^(set-of-)?(dorsal|palmar)-interossei/.test(b)) return 'interossei';
  return b;
}
