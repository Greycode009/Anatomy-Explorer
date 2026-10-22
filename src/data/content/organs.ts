import type { ContentEntry } from '../../types';

/**
 * Educational content for organs, vessels and other non-musculoskeletal structures.
 * Keyed by contentId (several left/right structures may share one entry).
 */
export const ORGAN_CONTENT: Record<string, ContentEntry> = {
  // ───────────────────────────── Cardiovascular ─────────────────────────────
  heart: {
    anatomicalName: 'Heart',
    summary:
      'The heart is a muscular pump about the size of a closed fist. It beats continuously to move blood through the lungs and around the rest of the body.',
    location: 'Thoracic cavity (middle mediastinum), between the lungs, with its apex directed toward the left.',
    functions: [
      'Pumps blood through the pulmonary circulation (to the lungs and back)',
      'Pumps blood through the systemic circulation (to the rest of the body)',
      'Maintains circulation to deliver oxygen and nutrients and remove waste products',
    ],
    components: [
      'Right atrium',
      'Left atrium',
      'Right ventricle',
      'Left ventricle',
      'Four valves: tricuspid, pulmonary, mitral and aortic',
      'Major vessels: aorta, pulmonary trunk, venae cavae and pulmonary veins',
    ],
    howItWorks:
      'The right side receives oxygen-poor blood from the body and pumps it to the lungs; the left side receives oxygen-rich blood from the lungs and pumps it into the aorta. An electrical impulse that starts in the sinoatrial node coordinates each beat, and one-way valves keep blood flowing forward.',
    facts: [
      'At rest the heart beats roughly 60 to 100 times per minute, about 100,000 times a day.',
      'The wall of the left ventricle is the thickest because it pumps blood to the whole body.',
      'The heart muscle receives its own blood supply from the coronary arteries.',
    ],
    related: ['lung-left', 'lung-right', 'ascending-aorta', 'superior-vena-cava', 'inferior-vena-cava', 'pulmonary-artery', 'pulmonary-vein'],
    aliases: ['cardiac', 'myocardium', 'cor'],
  },

  'coronary-artery': {
    anatomicalName: 'Coronary arteries',
    summary:
      'The coronary arteries are the vessels that supply the heart muscle itself with oxygen-rich blood. There are two main ones, the left and right coronary arteries.',
    location: 'On the surface of the heart, running in the grooves between the chambers; both arise from the base of the ascending aorta just above the aortic valve.',
    functions: [
      'Deliver oxygen and nutrients to the heart muscle (myocardium)',
      'Supply the electrical conduction system of the heart',
    ],
    components: [
      'Left coronary artery (short main stem)',
      'Anterior interventricular branch (left anterior descending artery)',
      'Circumflex branch',
      'Right coronary artery, with its marginal branch',
      'Posterior interventricular branch (usually from the right coronary artery)',
    ],
    howItWorks:
      'The left coronary artery has a short stem that divides into the anterior interventricular and circumflex branches, supplying most of the left ventricle. The right coronary artery runs in the groove between the right atrium and ventricle and supplies the right side of the heart and, in most people, the sinoatrial node. Flow into the left coronary artery occurs mainly when the heart relaxes (diastole).',
    facts: [
      'They are the first branches of the aorta.',
      'The anterior interventricular branch is often called the LAD (left anterior descending) artery.',
    ],
    related: ['heart', 'ascending-aorta', 'cardiac-veins', 'arch-of-aorta'],
    aliases: ['coronary arteries', 'left coronary artery', 'right coronary artery', 'LAD', 'circumflex artery'],
  },

  'cardiac-veins': {
    anatomicalName: 'Cardiac veins',
    summary:
      'The cardiac veins collect oxygen-poor blood from the heart muscle after it has been used. Most of them drain into a large collecting vein called the coronary sinus.',
    location: 'On the surface of the heart, running alongside the coronary arteries; the coronary sinus lies in the groove on the back of the heart between the left atrium and left ventricle.',
    functions: [
      'Drain deoxygenated blood from the heart wall',
      'Return this blood to the right atrium',
    ],
    components: [
      'Coronary sinus',
      'Great cardiac vein',
      'Middle cardiac vein',
      'Posterior vein of the left ventricle',
      'Anterior cardiac veins',
    ],
    howItWorks:
      'The great cardiac vein runs with the anterior interventricular artery and the middle cardiac vein runs with the posterior interventricular artery; both empty into the coronary sinus, which opens into the right atrium. The small anterior cardiac veins drain directly into the right atrium.',
    facts: ['The coronary sinus is the largest vein of the heart.'],
    related: ['heart', 'left-coronary-artery', 'right-coronary-artery', 'superior-vena-cava', 'inferior-vena-cava'],
    aliases: ['coronary sinus', 'great cardiac vein', 'middle cardiac vein', 'anterior cardiac veins', 'coronary veins'],
  },

  'papillary-muscles': {
    anatomicalName: 'Papillary muscles',
    summary:
      'Papillary muscles are small cone-shaped muscles inside the ventricles. They anchor the valve flaps between the atria and ventricles so the valves do not flip backward.',
    location: 'Projecting from the inner walls of the right and left ventricles of the heart.',
    functions: [
      'Tense the chordae tendineae during ventricular contraction',
      'Prevent the tricuspid and mitral valve cusps from everting into the atria',
      'Help prevent backflow of blood into the atria',
    ],
    components: [
      'Anterior, posterior and septal papillary muscles (right ventricle)',
      'Anterior and posterior papillary muscles (left ventricle)',
      'Chordae tendineae (tendinous cords)',
    ],
    howItWorks:
      'Thin tendinous cords connect the papillary muscles to the edges of the valve cusps. The papillary muscles contract together with the ventricle, keeping the cords taut so the closed valve holds against the rising pressure. They do not open the valves.',
    facts: ['The right ventricle usually has three papillary muscles and the left ventricle two.'],
    related: ['heart', 'tricuspid-valve', 'mitral-valve'],
    aliases: ['papillary muscle', 'chordae tendineae', 'heart strings'],
  },

  'mitral-valve': {
    anatomicalName: 'Mitral valve',
    summary:
      'The mitral valve is a two-flap valve between the left atrium and the left ventricle. It lets oxygen-rich blood into the ventricle and stops it flowing back.',
    location: 'Between the left atrium and the left ventricle of the heart.',
    functions: [
      'Allows blood to flow from the left atrium into the left ventricle',
      'Prevents backflow into the left atrium when the left ventricle contracts',
    ],
    components: ['Anterior cusp', 'Posterior cusp', 'Valve ring (annulus)', 'Chordae tendineae', 'Papillary muscles'],
    howItWorks:
      'When the left ventricle relaxes, the valve opens and blood flows in from the left atrium. When the ventricle contracts, rising pressure snaps the cusps shut, and the chordae tendineae and papillary muscles stop them from bulging into the atrium.',
    facts: [
      'It is the only heart valve with two cusps.',
      'Its name comes from its resemblance to a bishop\'s mitre.',
    ],
    related: ['heart', 'papillary-muscles', 'pulmonary-vein', 'tricuspid-valve'],
    aliases: ['bicuspid valve', 'left atrioventricular valve', 'mitral'],
  },

  'tricuspid-valve': {
    anatomicalName: 'Tricuspid valve',
    summary:
      'The tricuspid valve is a three-flap valve between the right atrium and the right ventricle. It lets blood into the ventricle and prevents it flowing back.',
    location: 'Between the right atrium and the right ventricle of the heart.',
    functions: [
      'Allows blood to flow from the right atrium into the right ventricle',
      'Prevents backflow into the right atrium when the right ventricle contracts',
    ],
    components: ['Anterior cusp', 'Posterior cusp', 'Septal cusp', 'Chordae tendineae', 'Papillary muscles'],
    howItWorks:
      'The valve opens as the right ventricle relaxes and fills. When the ventricle contracts, the cusps are pushed together, and the chordae tendineae held by the papillary muscles keep them from everting into the atrium.',
    facts: ['It has three cusps, which gives it its name.'],
    related: ['heart', 'papillary-muscles', 'pulmonary-valve', 'superior-vena-cava', 'inferior-vena-cava'],
    aliases: ['right atrioventricular valve', 'tricuspid'],
  },

  'pulmonary-valve': {
    anatomicalName: 'Pulmonary valve',
    summary:
      'The pulmonary valve guards the exit of the right ventricle. It opens to let blood into the pulmonary trunk toward the lungs and closes to stop it coming back.',
    location: 'At the junction of the right ventricle and the pulmonary trunk.',
    functions: [
      'Allows blood to leave the right ventricle for the lungs',
      'Prevents backflow from the pulmonary trunk into the right ventricle',
    ],
    components: ['Three semilunar (half-moon) cusps'],
    howItWorks:
      'When the right ventricle contracts, pressure pushes the cusps open. When it relaxes, blood falling back fills the cup-shaped cusps and presses them together, closing the valve. Unlike the atrioventricular valves, it has no chordae tendineae.',
    facts: ['It is one of the two semilunar valves; the other is the aortic valve.'],
    related: ['heart', 'pulmonary-artery', 'tricuspid-valve'],
    aliases: ['pulmonic valve', 'pulmonary semilunar valve'],
  },

  'ascending-aorta': {
    anatomicalName: 'Ascending aorta',
    summary:
      'The ascending aorta is the first part of the aorta, the body\'s largest artery. It carries oxygen-rich blood upward from the left ventricle.',
    location: 'In the middle mediastinum, rising from the left ventricle behind the sternum before curving into the aortic arch.',
    functions: [
      'Carries oxygen-rich blood away from the left ventricle',
      'Gives rise to the left and right coronary arteries',
      'Its elastic wall helps smooth the pressure pulses of each heartbeat',
    ],
    components: ['Aortic root and aortic sinuses', 'Openings of the coronary arteries'],
    howItWorks:
      'Blood ejected through the aortic valve enters the ascending aorta. Its elastic wall stretches during each beat and recoils afterward, helping keep blood moving between beats.',
    facts: ['It is about 5 cm long.', 'The coronary arteries are its only branches.'],
    related: ['heart', 'arch-of-aorta', 'left-coronary-artery', 'right-coronary-artery', 'pulmonary-artery', 'superior-vena-cava'],
    aliases: ['aorta', 'aortic root'],
  },

  'arch-of-aorta': {
    anatomicalName: 'Arch of aorta',
    commonName: 'Aortic arch',
    summary:
      'The aortic arch is the curved part of the aorta above the heart. Its branches carry blood to the head, neck and arms.',
    location: 'In the superior mediastinum, behind the upper sternum, curving backward and to the left over the root of the left lung.',
    functions: [
      'Connects the ascending aorta to the descending aorta',
      'Sends blood to the head, neck and upper limbs through three large branches',
      'Contains pressure sensors (baroreceptors) that help regulate blood pressure',
    ],
    components: ['Brachiocephalic trunk', 'Left common carotid artery', 'Left subclavian artery'],
    howItWorks:
      'As blood flows over the arch, part of it is directed into the three branches to the upper body, while the rest continues into the descending aorta.',
    facts: ['A fibrous band, the ligamentum arteriosum, connects it to the pulmonary trunk; it is the remnant of a fetal vessel.'],
    related: ['ascending-aorta', 'descending-aorta', 'brachiocephalic-artery', 'common-carotid-artery-left', 'subclavian-artery-left', 'pulmonary-artery'],
    aliases: ['aortic arch', 'aorta'],
  },

  'descending-aorta': {
    anatomicalName: 'Descending aorta',
    summary:
      'The descending aorta is the long part of the aorta that runs down through the chest and abdomen. It supplies the chest wall, abdominal organs, pelvis and legs.',
    location: 'Along the front of the spine, from the end of the aortic arch (about T4) through the diaphragm (T12) to its division at about L4.',
    functions: [
      'Carries oxygen-rich blood to the trunk, pelvis and lower limbs',
      'Gives branches to the chest wall, abdominal organs and kidneys',
    ],
    components: [
      'Thoracic aorta (above the diaphragm)',
      'Abdominal aorta (below the diaphragm)',
      'Major branches: celiac trunk, superior and inferior mesenteric arteries, renal arteries',
    ],
    howItWorks:
      'It passes through the aortic opening of the diaphragm and, in the lower abdomen, divides into the right and left common iliac arteries.',
    facts: ['Its thoracic part gives off the posterior intercostal arteries that supply the spaces between the ribs.'],
    related: ['arch-of-aorta', 'celiac-artery', 'superior-mesenteric-artery', 'renal-artery-left', 'common-iliac-artery-left', 'diaphragm'],
    aliases: ['thoracic aorta', 'abdominal aorta', 'aorta'],
  },

  'brachiocephalic-artery': {
    anatomicalName: 'Brachiocephalic trunk',
    summary:
      'The brachiocephalic trunk is the first and largest branch of the aortic arch. It supplies the right side of the head, neck and the right arm.',
    location: 'In the superior mediastinum, running up and to the right from the aortic arch to behind the right sternoclavicular joint.',
    functions: [
      'Delivers blood to the right arm via the right subclavian artery',
      'Delivers blood to the right side of the head and neck via the right common carotid artery',
    ],
    components: ['Right subclavian artery', 'Right common carotid artery'],
    howItWorks: 'It is a short vessel that divides into its two terminal branches behind the right sternoclavicular joint.',
    facts: ['There is normally only one brachiocephalic artery, on the right; the left side receives its arteries directly from the arch.'],
    related: ['arch-of-aorta', 'subclavian-artery-right', 'common-carotid-artery-right', 'brachiocephalic-vein-left', 'trachea'],
    aliases: ['brachiocephalic trunk', 'innominate artery'],
  },

  'common-carotid-artery': {
    anatomicalName: 'Common carotid artery',
    summary:
      'The common carotid arteries are the main arteries running up each side of the neck. They carry blood toward the head and brain.',
    location: 'In the neck, inside the carotid sheath alongside the internal jugular vein and vagus nerve.',
    functions: [
      'Carries oxygen-rich blood to the head and neck',
      'Divides into the internal carotid (brain and eye) and external carotid (face and neck) arteries',
      'Its carotid sinus and carotid body sense blood pressure and blood gases',
    ],
    components: ['Internal carotid artery', 'External carotid artery', 'Carotid sinus', 'Carotid body'],
    howItWorks:
      'The vessel rises without branching until about the level of the upper border of the thyroid cartilage, where it divides. Sensors at the division send signals to the brainstem that help regulate heart rate, blood pressure and breathing.',
    facts: [
      'The right one arises from the brachiocephalic trunk; the left arises directly from the aortic arch.',
      'Its pulse can be felt at the side of the neck.',
    ],
    related: ['arch-of-aorta', 'brachiocephalic-artery', 'internal-jugular-vein-left', 'thyroid-cartilage', 'sternocleidomastoid-left'],
    aliases: ['carotid artery', 'carotid', 'carotid pulse'],
  },

  'subclavian-artery': {
    anatomicalName: 'Subclavian artery',
    summary:
      'The subclavian arteries are the main arteries supplying the arms. They also send branches to the brain, neck and chest wall.',
    location: 'At the root of the neck, arching over the first rib behind the clavicle.',
    functions: [
      'Supplies blood to the upper limb',
      'Gives rise to the vertebral artery, which helps supply the brain',
      'Gives rise to the internal thoracic artery, which supplies the front of the chest wall',
    ],
    components: ['Vertebral artery', 'Internal thoracic artery', 'Thyrocervical trunk', 'Costocervical trunk'],
    howItWorks:
      'The artery passes between the anterior and middle scalene muscles and over the first rib. At the outer border of the first rib it continues as the axillary artery, and further down as the brachial artery.',
    facts: ['The right one arises from the brachiocephalic trunk; the left arises directly from the aortic arch.'],
    related: ['arch-of-aorta', 'brachiocephalic-artery', 'subclavian-vein-left', 'first-rib-left', 'clavicle-left', 'scalenus-anterior-left'],
    aliases: ['subclavian'],
  },

  'celiac-artery': {
    anatomicalName: 'Celiac trunk',
    summary:
      'The celiac trunk is a short, thick artery from the abdominal aorta. It supplies the stomach, liver, spleen and nearby organs.',
    location: 'Upper abdomen, arising from the front of the abdominal aorta just below the diaphragm (around T12).',
    functions: [
      'Supplies the foregut organs: lower esophagus, stomach and first part of the duodenum',
      'Supplies the liver, gallbladder, spleen and part of the pancreas',
    ],
    components: ['Left gastric artery', 'Common hepatic artery', 'Splenic artery'],
    howItWorks: 'After about 1 to 2 cm it splits into its three branches, which spread out to the upper abdominal organs.',
    facts: ['It is the first major unpaired branch of the abdominal aorta.'],
    related: ['descending-aorta', 'gastric-artery-left', 'common-hepatic-artery', 'splenic-artery', 'stomach', 'liver'],
    aliases: ['celiac trunk', 'coeliac trunk', 'celiac axis'],
  },

  'gastric-artery': {
    anatomicalName: 'Left gastric artery',
    summary:
      'The left gastric artery is the smallest branch of the celiac trunk. It supplies part of the stomach and the lower esophagus.',
    location: 'Upper abdomen, running up toward the esophagus and then along the lesser curvature of the stomach.',
    functions: [
      'Supplies the lesser curvature of the stomach',
      'Sends esophageal branches to the lower esophagus',
    ],
    howItWorks: 'It runs along the lesser curvature and joins (anastomoses) with the right gastric artery, forming an arterial arc.',
    facts: ['It often gives small branches that pass up through the diaphragm with the esophagus.'],
    related: ['celiac-artery', 'stomach', 'esophagus', 'common-hepatic-artery'],
    aliases: ['gastric artery', 'left gastric'],
  },

  'common-hepatic-artery': {
    anatomicalName: 'Common hepatic artery',
    summary:
      'The common hepatic artery carries oxygen-rich blood toward the liver. It also supplies the gallbladder, stomach, duodenum and pancreas.',
    location: 'Upper abdomen, running to the right from the celiac trunk along the upper border of the pancreas.',
    functions: [
      'Supplies oxygen-rich blood to the liver and gallbladder',
      'Supplies parts of the stomach, duodenum and pancreas',
    ],
    components: ['Proper hepatic artery', 'Gastroduodenal artery', 'Right and left hepatic arteries', 'Cystic artery (to the gallbladder)'],
    howItWorks:
      'It gives off the gastroduodenal artery and continues as the proper hepatic artery, which divides into right and left hepatic arteries entering the liver.',
    facts: ['The hepatic artery provides only about a quarter of the liver\'s blood; the rest arrives through the hepatic portal vein.'],
    related: ['celiac-artery', 'liver', 'gallbladder', 'duodenum', 'pancreas'],
    aliases: ['hepatic artery'],
  },

  'splenic-artery': {
    anatomicalName: 'Splenic artery',
    summary:
      'The splenic artery is the largest branch of the celiac trunk. It carries blood to the spleen and also supplies the pancreas and part of the stomach.',
    location: 'Upper left abdomen, running a winding course along the upper border of the pancreas toward the spleen.',
    functions: [
      'Supplies blood to the spleen',
      'Sends branches to the body and tail of the pancreas',
      'Supplies part of the stomach through the short gastric and left gastro-omental arteries',
    ],
    howItWorks: 'Near the spleen it divides into several branches that enter at the hilum of the spleen.',
    facts: ['It is known for its tortuous, wavy course.'],
    related: ['celiac-artery', 'spleen', 'pancreas', 'stomach', 'splenic-vein'],
    aliases: ['lienal artery'],
  },

  'superior-mesenteric-artery': {
    anatomicalName: 'Superior mesenteric artery',
    summary:
      'The superior mesenteric artery supplies most of the intestines. It feeds the small intestine and the first half of the large intestine.',
    location: 'Abdomen, arising from the front of the aorta just below the celiac trunk (around L1) and running down into the mesentery.',
    functions: [
      'Supplies the lower duodenum, jejunum and ileum',
      'Supplies the cecum, appendix, ascending colon and most of the transverse colon',
      'Helps supply the head of the pancreas',
    ],
    components: ['Inferior pancreaticoduodenal artery', 'Jejunal and ileal arteries', 'Ileocolic artery', 'Right colic artery', 'Middle colic artery'],
    howItWorks: 'Its branches form a series of arches (arcades) within the mesentery, giving rise to straight vessels that enter the intestinal wall.',
    facts: ['It supplies the embryonic midgut.'],
    related: ['descending-aorta', 'superior-mesenteric-vein', 'jejunum', 'ileum', 'colon', 'pancreas'],
    aliases: ['SMA'],
  },

  'inferior-mesenteric-artery': {
    anatomicalName: 'Inferior mesenteric artery',
    summary:
      'The inferior mesenteric artery supplies the last part of the large intestine. It feeds the left side of the colon and the upper rectum.',
    location: 'Lower abdomen, arising from the front of the abdominal aorta (around L3) and running down and to the left.',
    functions: [
      'Supplies the distal transverse colon, descending colon and sigmoid colon',
      'Supplies the upper rectum',
    ],
    components: ['Left colic artery', 'Sigmoid arteries', 'Superior rectal artery'],
    howItWorks: 'Its colic branches connect with branches of the superior mesenteric artery along the colon, forming a continuous arterial channel.',
    facts: ['It supplies the embryonic hindgut.'],
    related: ['descending-aorta', 'colon', 'rectum', 'superior-mesenteric-artery'],
    aliases: ['IMA'],
  },

  'renal-artery': {
    anatomicalName: 'Renal artery',
    summary:
      'The renal arteries carry blood from the aorta to the kidneys. The kidneys then filter this blood to make urine.',
    location: 'Upper abdomen, arising from the sides of the abdominal aorta (around L1 to L2) and running to the hilum of each kidney.',
    functions: [
      'Delivers blood to the kidney for filtration',
      'Supplies the kidney tissue, ureter and adrenal gland with small branches',
    ],
    components: ['Segmental arteries', 'Inferior suprarenal artery', 'Ureteric branches'],
    howItWorks: 'Near the kidney it divides into segmental arteries, which branch further until they form the tiny capillary tufts (glomeruli) where blood is filtered.',
    facts: [
      'At rest the kidneys receive about 20 to 25 percent of the blood pumped by the heart.',
      'The right renal artery is longer and passes behind the inferior vena cava.',
    ],
    related: ['kidney-left', 'kidney-right', 'descending-aorta', 'renal-vein-left', 'adrenal-gland-left'],
    aliases: ['kidney artery'],
  },

  'common-iliac-artery': {
    anatomicalName: 'Common iliac artery',
    summary:
      'The common iliac arteries are the two large vessels formed where the aorta splits in the lower abdomen. They carry blood to the pelvis and legs.',
    location: 'Lower abdomen, from the aortic bifurcation (around L4) to the front of the sacroiliac joint.',
    functions: ['Carries blood from the aorta toward the pelvis and lower limb', 'Divides into the internal and external iliac arteries'],
    components: ['Internal iliac artery', 'External iliac artery'],
    howItWorks: 'Each runs down and outward for about 4 to 5 cm before dividing at the level of the pelvic brim.',
    facts: ['The ureter usually crosses near the division of the common iliac artery.'],
    related: ['descending-aorta', 'internal-iliac-artery-left', 'external-iliac-artery-left', 'common-iliac-vein-left', 'ureter-left'],
    aliases: ['iliac artery'],
  },

  'external-iliac-artery': {
    anatomicalName: 'External iliac artery',
    summary:
      'The external iliac artery is the main route of blood to the leg. It becomes the femoral artery as it enters the thigh.',
    location: 'Pelvis, running along the pelvic brim from the common iliac artery to beneath the inguinal ligament.',
    functions: ['Supplies blood to the lower limb', 'Supplies part of the lower anterior abdominal wall'],
    components: ['Inferior epigastric artery', 'Deep circumflex iliac artery'],
    howItWorks: 'It follows the psoas major muscle and passes under the inguinal ligament, where it is renamed the femoral artery.',
    facts: ['The femoral pulse in the groin is felt just beyond where this artery ends.'],
    related: ['common-iliac-artery-left', 'external-iliac-vein-left', 'psoas-major-left', 'inguinal-ligament-left', 'femur-left'],
    aliases: ['iliac artery', 'femoral artery'],
  },

  'internal-iliac-artery': {
    anatomicalName: 'Internal iliac artery',
    summary:
      'The internal iliac artery is the main artery of the pelvis. Its branches supply the pelvic organs, buttocks and external genitals.',
    location: 'Pelvis, descending from the common iliac artery into the pelvic cavity.',
    functions: [
      'Supplies the bladder, rectum and internal reproductive organs',
      'Supplies the gluteal (buttock) muscles',
      'Supplies the perineum and external genitalia',
    ],
    components: ['Superior and inferior gluteal arteries', 'Internal pudendal artery', 'Obturator artery', 'Vesical arteries', 'Uterine artery (in females)'],
    howItWorks: 'It usually splits into anterior and posterior divisions whose branches spread to the pelvic walls and organs.',
    facts: ['Before birth, its umbilical branch carries blood to the placenta.'],
    related: ['common-iliac-artery-left', 'internal-iliac-vein-left', 'urinary-bladder', 'rectum', 'gluteus-maximus-left'],
    aliases: ['hypogastric artery', 'iliac artery'],
  },

  'pulmonary-artery': {
    anatomicalName: 'Pulmonary trunk and arteries',
    summary:
      'The pulmonary trunk and its branches carry oxygen-poor blood from the heart to the lungs. There the blood picks up oxygen and gives off carbon dioxide.',
    location: 'Middle mediastinum, rising from the right ventricle and dividing beneath the aortic arch into a branch for each lung.',
    functions: [
      'Carries deoxygenated blood from the right ventricle to the lungs',
      'Distributes blood to the capillaries around the alveoli for gas exchange',
    ],
    components: ['Pulmonary trunk', 'Right pulmonary artery', 'Left pulmonary artery'],
    howItWorks: 'Blood leaves the right ventricle through the pulmonary valve into the trunk, which splits into two arteries that branch repeatedly alongside the bronchi.',
    facts: [
      'In adults they are the only arteries that carry oxygen-poor blood.',
      'Pressure in the pulmonary circulation is much lower than in the systemic circulation.',
    ],
    related: ['heart', 'pulmonary-valve', 'lung-left', 'lung-right', 'arch-of-aorta', 'bronchus'],
    aliases: ['pulmonary trunk', 'pulmonary arteries'],
  },

  'pulmonary-vein': {
    anatomicalName: 'Pulmonary veins',
    summary:
      'The pulmonary veins return freshly oxygenated blood from the lungs to the heart. Usually there are four of them.',
    location: 'Middle mediastinum, running from the root of each lung to the left atrium.',
    functions: ['Carry oxygen-rich blood from the lungs to the left atrium', 'Complete the pulmonary circulation'],
    components: ['Two pulmonary veins from each lung (superior and inferior)'],
    howItWorks: 'Capillaries around the alveoli merge into progressively larger veins that leave each lung and empty into the left atrium.',
    facts: ['They are the only veins in adults that carry oxygen-rich blood.'],
    related: ['heart', 'lung-left', 'lung-right', 'mitral-valve', 'pulmonary-artery'],
    aliases: ['pulmonary veins'],
  },

  'superior-vena-cava': {
    anatomicalName: 'Superior vena cava',
    summary:
      'The superior vena cava is a large vein that returns blood from the upper body to the heart. It empties into the right atrium.',
    location: 'Superior and middle mediastinum, to the right of the ascending aorta.',
    functions: ['Returns deoxygenated blood from the head, neck, upper limbs and chest wall to the heart', 'Receives blood from the back of the chest wall via the azygos vein'],
    components: ['Left and right brachiocephalic veins (which unite to form it)', 'Azygos vein (a major tributary)'],
    howItWorks: 'It forms behind the first right costal cartilage where the two brachiocephalic veins join, and runs down about 7 cm to the right atrium.',
    facts: ['It has no valves.'],
    related: ['heart', 'brachiocephalic-vein-left', 'brachiocephalic-vein-right', 'inferior-vena-cava', 'ascending-aorta'],
    aliases: ['SVC', 'vena cava'],
  },

  'inferior-vena-cava': {
    anatomicalName: 'Inferior vena cava',
    summary:
      'The inferior vena cava is the largest vein in the body. It returns blood from the legs, pelvis and abdomen to the heart.',
    location: 'Along the back of the abdomen to the right of the aorta, passing through the diaphragm to the right atrium.',
    functions: ['Returns deoxygenated blood from the legs, pelvis and abdomen to the right atrium', 'Receives filtered blood from the kidneys and processed blood from the liver'],
    components: ['Common iliac veins (which unite to form it)', 'Renal veins', 'Hepatic veins', 'Lumbar veins'],
    howItWorks: 'It begins at about L5 where the two common iliac veins join, collects veins from the kidneys and liver, and passes through the caval opening of the diaphragm (around T8).',
    facts: ['Blood from the stomach and intestines reaches it only after passing through the liver via the hepatic portal system.'],
    related: ['heart', 'common-iliac-vein-left', 'renal-vein-left', 'liver', 'diaphragm', 'superior-vena-cava'],
    aliases: ['IVC', 'vena cava'],
  },

  'brachiocephalic-vein': {
    anatomicalName: 'Brachiocephalic vein',
    summary:
      'The brachiocephalic veins drain blood from the head, neck and arms. The two veins join to form the superior vena cava.',
    location: 'Root of the neck and upper chest, behind the sternoclavicular joints.',
    functions: ['Collects blood from the head, neck and upper limbs', 'Forms the superior vena cava by joining its partner'],
    components: ['Internal jugular vein', 'Subclavian vein', 'Smaller tributaries such as the vertebral and internal thoracic veins'],
    howItWorks: 'Each forms where the internal jugular and subclavian veins meet. The left one is longer and crosses the midline in front of the arch branches to meet the right one.',
    facts: ['The thoracic duct usually drains lymph into the junction that forms the left brachiocephalic vein.'],
    related: ['superior-vena-cava', 'internal-jugular-vein-left', 'subclavian-vein-left', 'brachiocephalic-artery', 'thymus'],
    aliases: ['innominate vein'],
  },

  'internal-jugular-vein': {
    anatomicalName: 'Internal jugular vein',
    summary:
      'The internal jugular veins are the main veins draining the brain, face and neck. They run down each side of the neck.',
    location: 'In the neck, inside the carotid sheath lateral to the carotid artery, from the base of the skull to behind the clavicle.',
    functions: ['Drains blood from the brain and skull', 'Drains blood from the face and neck'],
    howItWorks: 'It begins at the jugular foramen as a continuation of the venous sinuses of the brain and joins the subclavian vein to form the brachiocephalic vein.',
    facts: ['It shares the carotid sheath with the common carotid artery and the vagus nerve.'],
    related: ['brachiocephalic-vein-left', 'subclavian-vein-left', 'common-carotid-artery-left', 'sternocleidomastoid-left', 'temporal-bone-left'],
    aliases: ['jugular vein', 'IJV'],
  },

  'subclavian-vein': {
    anatomicalName: 'Subclavian vein',
    summary:
      'The subclavian veins carry blood back from the arms. They run beneath the collarbone.',
    location: 'Root of the neck, beneath the clavicle and over the first rib, in front of the anterior scalene muscle.',
    functions: ['Drains blood from the upper limb', 'Joins the internal jugular vein to form the brachiocephalic vein'],
    howItWorks: 'It continues from the axillary vein at the outer border of the first rib and passes in front of the subclavian artery.',
    facts: ['Lymph from much of the body enters the bloodstream near the junction of the subclavian and internal jugular veins.'],
    related: ['brachiocephalic-vein-left', 'internal-jugular-vein-left', 'subclavian-artery-left', 'clavicle-left', 'first-rib-left'],
    aliases: ['subclavian'],
  },

  'renal-vein': {
    anatomicalName: 'Renal vein',
    summary:
      'The renal veins carry filtered blood out of the kidneys. They drain into the inferior vena cava.',
    location: 'Upper abdomen, running from the hilum of each kidney to the inferior vena cava, in front of the renal artery.',
    functions: ['Returns filtered blood from the kidney to the inferior vena cava', 'On the left, also drains the gonad and adrenal gland of that side'],
    howItWorks: 'Small veins inside the kidney merge into the renal vein at the hilum.',
    facts: [
      'The left renal vein is longer than the right and crosses in front of the aorta.',
      'The left renal vein also receives the left gonadal and left suprarenal veins.',
    ],
    related: ['kidney-left', 'kidney-right', 'inferior-vena-cava', 'renal-artery-left', 'descending-aorta'],
    aliases: ['kidney vein'],
  },

  'common-iliac-vein': {
    anatomicalName: 'Common iliac vein',
    summary:
      'The common iliac veins collect blood from the pelvis and legs. The two veins join to form the inferior vena cava.',
    location: 'Lower abdomen and pelvis, near the front of the sacroiliac joint and lower lumbar spine.',
    functions: ['Drains blood from the lower limb and pelvis', 'Forms the inferior vena cava by joining its partner'],
    components: ['External iliac vein', 'Internal iliac vein'],
    howItWorks: 'Each forms where the external and internal iliac veins meet, and they unite at about L5 to the right of the midline.',
    related: ['inferior-vena-cava', 'external-iliac-vein-left', 'internal-iliac-vein-left', 'common-iliac-artery-left', 'fifth-lumbar-vertebra'],
    aliases: ['iliac vein'],
  },

  'external-iliac-vein': {
    anatomicalName: 'External iliac vein',
    summary:
      'The external iliac vein carries blood back from the leg into the pelvis. It continues from the femoral vein.',
    location: 'Pelvis, along the pelvic brim beside the external iliac artery, from the inguinal ligament to the sacroiliac joint.',
    functions: ['Drains blood from the lower limb', 'Receives veins from the lower abdominal wall'],
    howItWorks: 'It begins as the femoral vein passes beneath the inguinal ligament and joins the internal iliac vein to form the common iliac vein.',
    related: ['common-iliac-vein-left', 'external-iliac-artery-left', 'internal-iliac-vein-left', 'inguinal-ligament-left'],
    aliases: ['iliac vein', 'femoral vein'],
  },

  'internal-iliac-vein': {
    anatomicalName: 'Internal iliac vein',
    summary:
      'The internal iliac vein drains the pelvis. It collects blood from the pelvic organs, buttocks and perineum.',
    location: 'Pelvis, alongside the internal iliac artery.',
    functions: ['Drains the bladder, rectum and internal reproductive organs', 'Drains the gluteal region and perineum'],
    components: ['Pelvic venous plexuses (around the bladder, rectum, prostate or uterus)', 'Gluteal veins', 'Internal pudendal vein'],
    howItWorks: 'Networks of veins around the pelvic organs drain into it, and it joins the external iliac vein to form the common iliac vein.',
    related: ['common-iliac-vein-left', 'internal-iliac-artery-left', 'urinary-bladder', 'rectum'],
    aliases: ['hypogastric vein', 'iliac vein'],
  },

  'splenic-vein': {
    anatomicalName: 'Splenic vein',
    summary:
      'The splenic vein drains blood from the spleen and pancreas. It is one of the two veins that form the hepatic portal vein.',
    location: 'Upper abdomen, running from the spleen along the back of the pancreas.',
    functions: [
      'Drains the spleen, pancreas and part of the stomach',
      'Usually receives the inferior mesenteric vein',
      'Carries blood toward the liver as part of the portal system',
    ],
    howItWorks: 'Behind the neck of the pancreas it joins the superior mesenteric vein to form the hepatic portal vein, which carries blood to the liver.',
    related: ['spleen', 'pancreas', 'superior-mesenteric-vein', 'splenic-artery', 'liver'],
    aliases: ['lienal vein', 'portal system'],
  },

  'superior-mesenteric-vein': {
    anatomicalName: 'Superior mesenteric vein',
    summary:
      'The superior mesenteric vein carries nutrient-rich blood away from the small intestine. It helps form the hepatic portal vein to the liver.',
    location: 'Abdomen, in the root of the mesentery to the right of the superior mesenteric artery.',
    functions: [
      'Drains the small intestine, cecum, ascending colon and most of the transverse colon',
      'Carries absorbed nutrients toward the liver for processing',
    ],
    howItWorks: 'Behind the neck of the pancreas it joins the splenic vein to form the hepatic portal vein.',
    facts: ['Blood in this vein after a meal is rich in absorbed nutrients such as glucose and amino acids.'],
    related: ['superior-mesenteric-artery', 'splenic-vein', 'jejunum', 'ileum', 'liver', 'pancreas'],
    aliases: ['SMV', 'portal system'],
  },

  // ───────────────────────────── Respiratory ─────────────────────────────
  lung: {
    anatomicalName: 'Lung',
    summary:
      'The lungs are a pair of spongy, air-filled organs in the chest. They bring oxygen into the blood and remove carbon dioxide.',
    location: 'Thoracic cavity, on either side of the heart and mediastinum, resting on the diaphragm.',
    functions: [
      'Gas exchange: oxygen into the blood and carbon dioxide out',
      'Help regulate blood acidity (pH) by controlling carbon dioxide levels',
      'Provide the airflow used for speech',
    ],
    components: ['Lobes (three in the right lung, two in the left)', 'Bronchi and bronchioles', 'Alveoli', 'Pleura (covering membrane)', 'Pulmonary vessels'],
    howItWorks:
      'Air travels through branching airways to millions of tiny air sacs called alveoli. Oxygen diffuses across the thin alveolar wall into surrounding capillaries, while carbon dioxide moves the opposite way.',
    facts: [
      'The right lung has three lobes (upper, middle and lower); the left has two (upper and lower) and a notch that makes room for the heart.',
      'Together the lungs contain hundreds of millions of alveoli.',
    ],
    related: ['bronchus', 'trachea', 'heart', 'diaphragm', 'pulmonary-artery', 'pulmonary-vein'],
    aliases: ['lungs', 'pulmonary', 'left lung', 'right lung', 'lobes of lung'],
  },

  bronchus: {
    anatomicalName: 'Bronchi',
    summary:
      'The bronchi are the airways that branch off the windpipe into the lungs. They divide again and again, like the branches of a tree.',
    location: 'Chest, beginning where the trachea divides (around the level of the sternal angle) and continuing into each lung.',
    functions: ['Conduct air into and out of the lungs', 'Warm and humidify air', 'Trap and clear dust and microbes with mucus and cilia'],
    components: ['Right and left main bronchi', 'Lobar (secondary) bronchi', 'Segmental (tertiary) bronchi', 'Bronchioles', 'Cartilage plates and smooth muscle'],
    howItWorks:
      'Each main bronchus enters a lung and divides into lobar and then segmental bronchi. Cilia lining the airways beat upward, moving mucus and trapped particles toward the throat.',
    facts: ['The right main bronchus is shorter, wider and more vertical than the left, so inhaled objects more often lodge on the right.'],
    related: ['trachea', 'lung-left', 'lung-right', 'pulmonary-artery', 'esophagus'],
    aliases: ['bronchi', 'bronchial tree', 'main bronchus', 'bronchioles'],
  },

  trachea: {
    anatomicalName: 'Trachea',
    commonName: 'Windpipe',
    summary:
      'The trachea is the tube that carries air between the throat and the lungs. Rings of cartilage keep it from collapsing.',
    location: 'Neck and upper chest, in front of the esophagus, from the larynx (around C6) to its division into the main bronchi (around T4 to T5).',
    functions: ['Conducts air to and from the lungs', 'Filters, warms and humidifies inhaled air', 'Clears mucus and particles upward toward the throat'],
    components: ['C-shaped cartilage rings', 'Trachealis muscle', 'Ciliated mucous lining', 'Carina (the ridge where it divides)'],
    howItWorks:
      'Its C-shaped rings hold the airway open while the soft back wall lets the esophagus behind it expand during swallowing.',
    facts: ['It is about 10 to 12 cm long and supported by roughly 16 to 20 cartilage rings.'],
    related: ['bronchus', 'thyroid-cartilage', 'esophagus', 'lung-left', 'lung-right'],
    aliases: ['windpipe', 'airway'],
  },

  diaphragm: {
    anatomicalName: 'Diaphragm',
    summary:
      'The diaphragm is a dome-shaped sheet of muscle under the lungs. It is the main muscle used for breathing.',
    location: 'Between the thoracic and abdominal cavities, attached to the lower ribs, sternum and lumbar spine.',
    functions: [
      'Main muscle of inspiration (breathing in)',
      'Separates the chest cavity from the abdominal cavity',
      'Helps raise abdominal pressure during coughing, vomiting and defecation',
    ],
    components: ['Central tendon', 'Muscular part (sternal, costal and lumbar parts)', 'Caval opening', 'Esophageal hiatus', 'Aortic hiatus'],
    howItWorks:
      'When it contracts, the dome flattens and moves down, enlarging the chest so air flows into the lungs. When it relaxes, it rises and air flows out.',
    facts: ['It is supplied by the phrenic nerves, which arise from the C3 to C5 spinal nerves in the neck.'],
    related: ['lung-left', 'lung-right', 'heart', 'liver', 'esophagus', 'inferior-vena-cava'],
    aliases: ['thoracic diaphragm', 'breathing muscle'],
  },

  'thyroid-cartilage': {
    anatomicalName: 'Thyroid cartilage',
    commonName: 'Adam\'s apple',
    summary:
      'The thyroid cartilage is the largest cartilage of the larynx (voice box). Its front ridge forms the bump known as the Adam\'s apple.',
    location: 'Front of the neck, below the hyoid bone and above the cricoid cartilage and trachea.',
    functions: ['Protects the vocal folds and the inside of the larynx', 'Provides attachment for the vocal folds and several neck muscles'],
    components: ['Two flat plates (laminae)', 'Laryngeal prominence', 'Superior and inferior horns'],
    howItWorks: 'The two plates meet at the front at an angle; the vocal folds attach to the inner surface just behind this junction.',
    facts: [
      'The laryngeal prominence is usually more noticeable in males because the plates meet at a sharper angle after puberty.',
      'Its name means shield-shaped; it is not part of the thyroid gland.',
    ],
    related: ['hyoid-bone', 'trachea', 'esophagus', 'thyrohyoid-left', 'sternothyroid-left', 'Larynx'],
    aliases: ['Adam\'s apple', 'laryngeal prominence', 'voice box'],
  },

  'nasal-cartilages': {
    anatomicalName: 'Nasal cartilages',
    summary:
      'The nasal cartilages are flexible plates that shape the lower part of the nose. They keep the nostrils open while allowing the tip of the nose to bend.',
    location: 'External nose, below and in front of the nasal bones.',
    functions: ['Give shape to the external nose', 'Keep the nostrils and nasal passages open', 'Allow flexibility of the nasal tip'],
    components: ['Septal cartilage', 'Lateral (upper lateral) cartilages', 'Major alar cartilages', 'Minor alar cartilages'],
    howItWorks: 'The cartilages are made of hyaline cartilage, which is firm yet bendable, and are joined to the nasal bones and maxilla by fibrous tissue.',
    facts: ['The septal cartilage forms the front part of the wall that divides the nose into two passages.'],
    related: ['nasal-bone-left', 'nasal-bone-right', 'maxilla-left', 'vomer', 'nasalis-left'],
    aliases: ['nose cartilage', 'alar cartilage', 'septal cartilage', 'nose'],
  },

  // ───────────────────────────── Digestive ─────────────────────────────
  lips: {
    anatomicalName: 'Lips',
    summary:
      'The lips are the soft, movable folds around the opening of the mouth. They help with eating, speaking and facial expression.',
    location: 'Around the opening of the mouth (oral fissure), in front of the teeth and gums.',
    functions: ['Help take in food and keep it in the mouth', 'Shape sounds during speech', 'Contribute to facial expression', 'Provide fine touch sensation'],
    components: ['Upper and lower lip', 'Vermilion (red part)', 'Philtrum', 'Orbicularis oris muscle', 'Corners of the mouth (commissures)'],
    howItWorks: 'The circular orbicularis oris muscle closes and purses the lips, while other facial muscles pull them up, down or sideways.',
    facts: ['The red part of the lip has a thin, lightly keratinized covering that lets the color of blood in underlying capillaries show through.'],
    related: ['orbicularis-oris', 'upper-teeth', 'lower-teeth', 'gingiva', 'zygomaticus-major-left'],
    aliases: ['lip', 'labia oris', 'mouth'],
  },

  teeth: {
    anatomicalName: 'Teeth',
    summary:
      'Teeth are hard structures set in the jaws that cut and grind food. Adults normally have 32 permanent teeth.',
    location: 'In the sockets of the upper jaw (maxilla) and lower jaw (mandible).',
    functions: ['Bite, tear and grind food (mastication)', 'Help form speech sounds', 'Support the shape of the face and lips'],
    components: ['Incisors', 'Canines', 'Premolars', 'Molars', 'Enamel, dentin, pulp and cementum', 'Periodontal ligament'],
    howItWorks:
      'Front incisors and canines cut and grip, while broad premolars and molars crush and grind. Each tooth is anchored in its socket by the periodontal ligament.',
    facts: [
      'Enamel is the hardest substance in the human body.',
      'Children have 20 primary (baby) teeth, replaced by 32 permanent teeth including the wisdom teeth.',
    ],
    related: ['upper-teeth', 'lower-teeth', 'gingiva', 'mandible', 'maxilla-left', 'masseter-left'],
    aliases: ['tooth', 'dentition', 'molars', 'incisors', 'canines', 'premolars', 'wisdom teeth', 'upper teeth', 'lower teeth'],
  },

  gingiva: {
    anatomicalName: 'Gingiva',
    commonName: 'Gums',
    summary:
      'The gingiva, or gums, is the firm tissue covering the jawbones around the teeth. It forms a seal around the neck of each tooth.',
    location: 'Covering the tooth-bearing (alveolar) parts of the maxilla and mandible.',
    functions: ['Protect the underlying bone and tooth roots', 'Form a seal around the teeth', 'Withstand friction from chewing'],
    components: ['Attached gingiva', 'Free (marginal) gingiva', 'Interdental papillae', 'Gingival sulcus'],
    howItWorks: 'The gingiva is a tough mucous membrane firmly bound to the bone beneath and attached to each tooth just above the root.',
    facts: ['The shallow groove between the gum margin and the tooth is called the gingival sulcus.'],
    related: ['upper-teeth', 'lower-teeth', 'maxilla-left', 'mandible', 'lips'],
    aliases: ['gums', 'gum'],
  },

  esophagus: {
    anatomicalName: 'Esophagus',
    commonName: 'Gullet',
    summary:
      'The esophagus is the muscular tube that carries swallowed food and drink from the throat to the stomach.',
    location: 'From the pharynx in the neck (around C6), down through the chest behind the trachea and heart, through the diaphragm to the stomach.',
    functions: ['Transports food and liquid to the stomach', 'Prevents stomach contents from flowing back up (lower esophageal sphincter)'],
    components: ['Upper esophageal sphincter', 'Lower esophageal sphincter', 'Muscular wall (skeletal muscle above, smooth muscle below)', 'Mucous lining'],
    howItWorks:
      'After swallowing, waves of muscle contraction called peristalsis push food downward; the lower sphincter relaxes to let it enter the stomach.',
    facts: ['It is about 25 cm long and passes through the diaphragm at the esophageal hiatus.'],
    related: ['stomach', 'trachea', 'diaphragm', 'heart', 'descending-aorta'],
    aliases: ['gullet', 'food pipe', 'oesophagus'],
  },

  stomach: {
    anatomicalName: 'Stomach',
    summary:
      'The stomach is a J-shaped muscular sac that stores and churns food. It mixes food with acid and enzymes to begin breaking down proteins.',
    location: 'Upper abdomen, mainly on the left, just below the diaphragm.',
    functions: [
      'Stores food temporarily',
      'Mixes food with gastric juice to form a semi-liquid called chyme',
      'Begins protein digestion with acid and pepsin',
      'Releases chyme gradually into the duodenum',
    ],
    components: ['Cardia', 'Fundus', 'Body', 'Pyloric antrum and pylorus', 'Rugae (inner folds)', 'Gastric glands'],
    howItWorks:
      'Three layers of muscle churn the contents while glands secrete hydrochloric acid, pepsinogen and protective mucus. The pyloric sphincter controls emptying into the small intestine.',
    facts: ['Parietal cells in its lining also make intrinsic factor, which is needed to absorb vitamin B12.'],
    related: ['esophagus', 'duodenum', 'liver', 'spleen', 'pancreas', 'gastric-artery-left'],
    aliases: ['gastric', 'tummy'],
  },

  duodenum: {
    anatomicalName: 'Duodenum',
    summary:
      'The duodenum is the first, short part of the small intestine. Here food from the stomach mixes with bile and pancreatic juice.',
    location: 'Upper abdomen, curving in a C shape around the head of the pancreas.',
    functions: [
      'Receives chyme from the stomach',
      'Receives bile and pancreatic enzymes that continue digestion',
      'Neutralizes stomach acid',
      'Releases hormones such as secretin and cholecystokinin',
    ],
    components: ['Superior, descending, horizontal and ascending parts', 'Major duodenal papilla', 'Duodenal (Brunner) glands'],
    howItWorks:
      'Bile and pancreatic juice enter through the major duodenal papilla in its descending part. Bicarbonate neutralizes acid, and enzymes break down fats, proteins and carbohydrates.',
    facts: ['It is about 25 cm long; its name comes from the Latin for twelve finger-widths.'],
    related: ['stomach', 'jejunum', 'pancreas', 'pancreatic-duct', 'gallbladder', 'liver'],
    aliases: ['small intestine', 'small bowel'],
  },

  jejunum: {
    anatomicalName: 'Jejunum',
    summary:
      'The jejunum is the middle part of the small intestine. It is a major site where nutrients are absorbed into the blood.',
    location: 'Mainly in the upper left part of the abdomen, between the duodenum and the ileum.',
    functions: ['Absorbs sugars, amino acids, fatty acids and other nutrients', 'Continues enzymatic digestion'],
    components: ['Circular folds (plicae circulares)', 'Villi and microvilli', 'Mesentery with blood vessels'],
    howItWorks:
      'Its lining is folded and covered in finger-like villi with microvilli, greatly increasing the surface area for absorption.',
    facts: ['Its wall is thicker and more richly supplied with blood than the ileum.', 'Its name comes from the Latin for empty.'],
    related: ['duodenum', 'ileum', 'superior-mesenteric-artery', 'superior-mesenteric-vein'],
    aliases: ['small intestine', 'small bowel'],
  },

  ileum: {
    anatomicalName: 'Ileum',
    summary:
      'The ileum is the last and longest part of the small intestine. It absorbs remaining nutrients, vitamin B12 and bile salts.',
    location: 'Mainly in the lower abdomen and pelvis, ending at the junction with the large intestine in the lower right abdomen.',
    functions: ['Absorbs vitamin B12 and bile salts', 'Absorbs remaining nutrients', 'Contains lymphoid tissue that monitors gut contents'],
    components: ['Villi', 'Peyer\'s patches (lymphoid follicles)', 'Ileocecal valve (at its end)'],
    howItWorks: 'Contents move along by peristalsis; the ileocecal valve controls their passage into the cecum and limits backflow.',
    facts: ['Peyer\'s patches are most numerous in the ileum.'],
    related: ['jejunum', 'colon', 'appendix', 'superior-mesenteric-artery'],
    aliases: ['small intestine', 'small bowel', 'terminal ileum'],
  },

  appendix: {
    anatomicalName: 'Vermiform appendix',
    commonName: 'Appendix',
    summary:
      'The appendix is a narrow, finger-like tube closed at one end. It hangs from the cecum, the first part of the large intestine.',
    location: 'Usually in the lower right abdomen (right iliac fossa), though its exact position varies.',
    functions: ['Contains lymphoid tissue that is part of the gut immune system', 'May serve as a reservoir for beneficial gut bacteria (a proposed role)'],
    components: ['Base attached to the cecum', 'Lymphoid follicles', 'Mesoappendix (supporting fold)'],
    facts: ['It averages about 8 to 10 cm long.', 'The three taeniae coli of the large intestine converge at its base.'],
    related: ['colon', 'ileum', 'taeniae-coli', 'superior-mesenteric-artery'],
    aliases: ['appendix', 'vermiform appendix'],
  },

  colon: {
    anatomicalName: 'Colon',
    summary:
      'The colon is the main part of the large intestine. It absorbs water and salts and turns digestive waste into stool.',
    location: 'Abdomen, framing the small intestine: up the right side, across the top, down the left side and into the pelvis.',
    functions: [
      'Absorbs water and electrolytes',
      'Forms and moves stool toward the rectum',
      'Houses gut bacteria that ferment fiber and produce some vitamins, such as vitamin K',
    ],
    components: ['Ascending colon', 'Transverse colon', 'Descending colon', 'Sigmoid colon', 'Haustra (pouches)', 'Taeniae coli'],
    howItWorks: 'Slow contractions mix and move the contents along, and periodic stronger mass movements push stool toward the rectum.',
    facts: ['The large intestine is about 1.5 m long, wider but much shorter than the small intestine.'],
    related: ['taeniae-coli', 'appendix', 'ileum', 'rectum', 'superior-mesenteric-artery', 'inferior-mesenteric-artery'],
    aliases: ['large intestine', 'large bowel', 'bowel', 'sigmoid colon', 'transverse colon', 'ascending colon', 'descending colon'],
  },

  'taeniae-coli': {
    anatomicalName: 'Taeniae coli',
    summary:
      'The taeniae coli are three ribbon-like bands of muscle running along the outside of the colon. They help give the colon its pouched appearance.',
    location: 'On the outer surface of the cecum and colon, from the base of the appendix to the start of the rectum.',
    functions: ['Form the outer longitudinal muscle of the colon', 'Contract to help move and mix contents', 'Gather the colon wall into pouches (haustra)'],
    components: ['Mesocolic taenia', 'Omental taenia', 'Free taenia'],
    howItWorks: 'Because the bands are shorter than the colon wall, they bunch it into a series of sacculations called haustra.',
    facts: ['All three converge at the base of the appendix and spread out to form a continuous layer at the rectum.'],
    related: ['colon', 'appendix', 'rectum'],
    aliases: ['taenia coli', 'teniae coli', 'colonic bands'],
  },

  rectum: {
    anatomicalName: 'Rectum',
    summary:
      'The rectum is the final section of the large intestine before the anal canal. It stores stool until it is passed out of the body.',
    location: 'Pelvis, in front of the sacrum and coccyx, from the sigmoid colon to the anal canal.',
    functions: ['Temporarily stores stool', 'Senses stretching that creates the urge to defecate', 'Helps expel stool'],
    components: ['Rectal ampulla', 'Transverse rectal folds', 'Muscular wall'],
    howItWorks: 'As stool fills the rectum, stretch receptors signal the urge to defecate; the anal sphincters and puborectalis muscle control when it is released.',
    facts: ['Unlike the colon, it has no taeniae coli, haustra or fat appendages.', 'It is about 12 to 15 cm long.'],
    related: ['colon', 'sacrum', 'external-anal-sphincter', 'puborectalis-left', 'urinary-bladder', 'prostate'],
    aliases: ['back passage', 'lower bowel'],
  },

  liver: {
    anatomicalName: 'Liver',
    summary:
      'The liver is the largest internal organ and gland in the body. It processes nutrients, makes bile and clears many substances from the blood.',
    location: 'Upper right abdomen, under the diaphragm and largely protected by the lower ribs.',
    functions: [
      'Produces bile to help digest fats',
      'Stores glucose as glycogen and helps regulate blood sugar',
      'Makes plasma proteins, including albumin and clotting factors',
      'Breaks down or modifies drugs, alcohol and waste products',
      'Stores vitamins (such as A, D and B12) and iron',
    ],
    components: ['Right, left, caudate and quadrate lobes', 'Lobules of liver cells (hepatocytes)', 'Hepatic artery and hepatic portal vein', 'Bile ducts'],
    howItWorks:
      'It receives oxygen-rich blood from the hepatic artery and nutrient-rich blood from the intestines via the hepatic portal vein. Liver cells process this blood and secrete bile into small ducts.',
    facts: ['An adult liver weighs about 1.5 kg.', 'It has a remarkable ability to regenerate lost tissue.'],
    related: ['gallbladder', 'common-hepatic-artery', 'inferior-vena-cava', 'diaphragm', 'stomach', 'duodenum'],
    aliases: ['hepatic'],
  },

  gallbladder: {
    anatomicalName: 'Gallbladder',
    summary:
      'The gallbladder is a small pear-shaped sac under the liver. It stores and concentrates bile until it is needed for digestion.',
    location: 'Upper right abdomen, in a shallow groove on the underside of the liver.',
    functions: ['Stores bile made by the liver', 'Concentrates bile by absorbing water', 'Releases bile into the duodenum after meals'],
    components: ['Fundus', 'Body', 'Neck', 'Cystic duct'],
    howItWorks:
      'When fatty food enters the duodenum, the hormone cholecystokinin makes the gallbladder contract, pushing bile through the cystic and common bile ducts into the intestine.',
    facts: ['It holds roughly 30 to 50 mL of bile.', 'People can live without a gallbladder; bile then flows directly from the liver to the intestine.'],
    related: ['liver', 'duodenum', 'common-hepatic-artery', 'pancreatic-duct'],
    aliases: ['gall bladder', 'biliary'],
  },

  pancreas: {
    anatomicalName: 'Pancreas',
    summary:
      'The pancreas is a long gland behind the stomach with two jobs. It makes digestive enzymes and hormones that control blood sugar.',
    location: 'Upper abdomen, behind the stomach, with its head in the curve of the duodenum and its tail near the spleen.',
    functions: [
      'Exocrine: secretes digestive enzymes that break down proteins, fats and carbohydrates',
      'Exocrine: secretes bicarbonate to neutralize stomach acid in the duodenum',
      'Endocrine: releases insulin and glucagon to regulate blood glucose',
    ],
    components: ['Head, neck, body and tail', 'Acinar cells (enzyme-producing)', 'Pancreatic islets (islets of Langerhans)', 'Main pancreatic duct'],
    howItWorks:
      'Acinar cells release enzymes into ducts that drain into the duodenum. Scattered islets release hormones directly into the blood: beta cells make insulin and alpha cells make glucagon.',
    facts: ['The islets make up only a small fraction (about 1 to 2 percent) of the pancreas.'],
    related: ['duodenum', 'pancreatic-duct', 'stomach', 'spleen', 'splenic-artery', 'superior-mesenteric-vein'],
    aliases: ['pancreatic', 'islets of Langerhans'],
  },

  'pancreatic-duct': {
    anatomicalName: 'Pancreatic duct',
    summary:
      'The pancreatic duct carries digestive juice from the pancreas into the small intestine.',
    location: 'Running through the length of the pancreas, from the tail to the head, ending at the duodenum.',
    functions: ['Drains pancreatic enzymes and bicarbonate into the duodenum', 'Shares a common outlet with the bile duct in most people'],
    components: ['Main pancreatic duct', 'Accessory pancreatic duct (in many people)', 'Hepatopancreatic ampulla', 'Sphincter of the ampulla'],
    howItWorks:
      'The main duct usually joins the common bile duct to form the hepatopancreatic ampulla, which opens at the major duodenal papilla; a muscular sphincter controls the flow.',
    facts: ['The main pancreatic duct is also known as the duct of Wirsung.'],
    related: ['pancreas', 'duodenum', 'gallbladder', 'liver'],
    aliases: ['duct of Wirsung', 'main pancreatic duct'],
  },

  // ───────────────────────────── Urinary ─────────────────────────────
  kidney: {
    anatomicalName: 'Kidney',
    summary:
      'The kidneys are two bean-shaped organs that filter the blood. They remove waste and extra water as urine.',
    location: 'Back of the upper abdomen, on either side of the spine (about T12 to L3), behind the peritoneum.',
    functions: [
      'Filter waste products such as urea from the blood',
      'Regulate water, salt and potassium balance',
      'Help control blood pressure (via renin) and acid-base balance',
      'Release erythropoietin, which stimulates red blood cell production',
      'Activate vitamin D',
    ],
    components: ['Renal cortex', 'Renal medulla (pyramids)', 'Nephrons', 'Calyces and renal pelvis', 'Hilum'],
    howItWorks:
      'Each nephron filters blood in a glomerulus, then its tubule reabsorbs useful substances and water. What remains drains as urine into the renal pelvis and ureter.',
    facts: [
      'Each kidney contains roughly a million nephrons.',
      'The right kidney usually sits slightly lower than the left because of the liver above it.',
    ],
    related: ['ureter-left', 'ureter-right', 'renal-artery-left', 'renal-vein-left', 'adrenal-gland-left', 'urinary-bladder'],
    aliases: ['kidneys', 'renal', 'left kidney', 'right kidney'],
  },

  ureter: {
    anatomicalName: 'Ureter',
    summary:
      'The ureters are thin muscular tubes that carry urine from the kidneys to the bladder.',
    location: 'Back of the abdomen and pelvis, from the renal pelvis of each kidney down to the bladder.',
    functions: ['Transport urine from the kidney to the bladder', 'Prevent backflow of urine toward the kidney'],
    components: ['Muscular wall', 'Urothelium (stretchy lining)', 'Ureteric opening into the bladder'],
    howItWorks:
      'Waves of muscle contraction push urine downward. Each ureter passes through the bladder wall at an angle, so filling of the bladder squeezes it closed.',
    facts: ['Each ureter is about 25 to 30 cm long.', 'They have natural narrow points where kidney stones can become lodged.'],
    related: ['kidney-left', 'kidney-right', 'urinary-bladder', 'common-iliac-artery-left'],
    aliases: ['ureters'],
  },

  'urinary-bladder': {
    anatomicalName: 'Urinary bladder',
    commonName: 'Bladder',
    summary:
      'The urinary bladder is a stretchy, muscular bag that stores urine. It empties through the urethra.',
    location: 'Pelvis, behind the pubic bones.',
    functions: ['Stores urine', 'Signals when it is filling', 'Contracts to empty urine through the urethra'],
    components: ['Detrusor muscle', 'Trigone', 'Ureteric openings', 'Internal urethral opening', 'Urothelium'],
    howItWorks:
      'As it fills, stretch receptors send signals to the spinal cord and brain. During urination the detrusor muscle contracts while the urethral sphincters relax.',
    facts: ['An adult bladder typically holds about 400 to 600 mL.'],
    related: ['ureter-left', 'ureter-right', 'urethra', 'prostate', 'rectum', 'hip-bone-left'],
    aliases: ['bladder', 'vesical'],
  },

  urethra: {
    anatomicalName: 'Urethra',
    summary:
      'The urethra is the tube that carries urine from the bladder to the outside of the body. In males it also carries semen.',
    location: 'From the base of the bladder through the pelvic floor to the external urethral opening.',
    functions: ['Carries urine out of the body', 'In males, also carries semen during ejaculation'],
    components: ['Internal and external urethral sphincters', 'Male parts: prostatic, membranous and spongy urethra'],
    howItWorks: 'The external urethral sphincter, which is under voluntary control, keeps the urethra closed until urination.',
    facts: ['The male urethra is about 18 to 20 cm long; the female urethra is about 4 cm.'],
    related: ['urinary-bladder', 'prostate', 'corpus-spongiosum-of-penis', 'glans-penis'],
    aliases: ['urinary tract'],
  },

  // ───────────────────────────── Reproductive ─────────────────────────────
  testis: {
    anatomicalName: 'Testis',
    commonName: 'Testicle',
    summary:
      'The testes are the two male reproductive glands. They produce sperm and the hormone testosterone.',
    location: 'Inside the scrotum, outside the abdominal cavity, below the penis.',
    functions: ['Produce sperm (spermatogenesis)', 'Produce testosterone', 'Produce inhibin, a hormone that helps regulate sperm production'],
    components: ['Seminiferous tubules', 'Sertoli cells', 'Leydig (interstitial) cells', 'Tunica albuginea', 'Rete testis'],
    howItWorks:
      'Sperm develop inside coiled seminiferous tubules, supported by Sertoli cells, while Leydig cells between the tubules make testosterone. Sperm then pass to the epididymis.',
    facts: [
      'Their position in the scrotum keeps them a few degrees cooler than core body temperature, which suits sperm production.',
      'They develop inside the abdomen and normally descend into the scrotum before birth.',
    ],
    related: ['epididymis-left', 'epididymis-right', 'deferent-duct-left', 'pituitary-gland', 'Scrotum'],
    aliases: ['testes', 'testicle', 'testicles', 'gonad'],
  },

  epididymis: {
    anatomicalName: 'Epididymis',
    summary:
      'The epididymis is a tightly coiled tube on the back of each testis. Sperm mature and are stored there.',
    location: 'Along the back of the testis, inside the scrotum.',
    functions: ['Stores sperm', 'Allows sperm to mature and gain the ability to swim', 'Moves sperm into the deferent duct'],
    components: ['Head', 'Body', 'Tail'],
    howItWorks: 'Sperm enter the head from the testis and travel slowly through the coiled duct, maturing on the way, before collecting in the tail.',
    facts: ['If uncoiled, the duct would be several meters long.'],
    related: ['testis-left', 'testis-right', 'deferent-duct-left', 'deferent-duct-right'],
    aliases: ['epididymides'],
  },

  'deferent-duct': {
    anatomicalName: 'Ductus deferens',
    commonName: 'Vas deferens',
    summary:
      'The deferent duct is a muscular tube that carries sperm from the epididymis toward the urethra.',
    location: 'From the scrotum, through the inguinal canal into the pelvis, and behind the bladder to the prostate.',
    functions: ['Transports sperm from the epididymis', 'Propels sperm by muscular contraction during ejaculation'],
    components: ['Thick smooth muscle wall', 'Ampulla (widened end)', 'Spermatic cord (which contains it in the groin)'],
    howItWorks:
      'Behind the bladder it joins the duct of the seminal vesicle to form the ejaculatory duct, which passes through the prostate to open into the urethra.',
    facts: ['It crosses over the ureter on its way to the back of the bladder.'],
    related: ['epididymis-left', 'seminal-vesicle-left', 'prostate', 'urinary-bladder', 'ureter-left'],
    aliases: ['vas deferens', 'ductus deferens', 'sperm duct'],
  },

  'seminal-vesicle': {
    anatomicalName: 'Seminal vesicle',
    summary:
      'The seminal vesicles are a pair of glands behind the bladder. They produce most of the fluid in semen.',
    location: 'Pelvis, behind the bladder and above the prostate.',
    functions: ['Produce a fluid rich in fructose that provides energy for sperm', 'Contribute the majority of semen volume'],
    components: ['Coiled glandular tube', 'Excretory duct'],
    howItWorks: 'Each duct joins the deferent duct to form an ejaculatory duct; its secretions are added during ejaculation.',
    facts: ['Despite the name, they do not store sperm.'],
    related: ['deferent-duct-left', 'prostate', 'urinary-bladder', 'rectum'],
    aliases: ['seminal vesicles', 'seminal gland'],
  },

  prostate: {
    anatomicalName: 'Prostate',
    summary:
      'The prostate is a walnut-sized gland below the bladder. It adds fluid to semen and surrounds the first part of the urethra.',
    location: 'Pelvis, just below the bladder and in front of the rectum, surrounding the prostatic urethra.',
    functions: ['Secretes prostatic fluid that forms part of semen', 'Its muscle helps expel semen during ejaculation'],
    components: ['Peripheral, central and transition zones', 'Prostatic urethra', 'Ejaculatory ducts (passing through it)'],
    howItWorks: 'Its glands release a thin fluid containing enzymes, such as prostate-specific antigen (PSA), into the urethra during ejaculation.',
    facts: ['It commonly enlarges with age.'],
    related: ['urinary-bladder', 'urethra', 'seminal-vesicle-left', 'deferent-duct-left', 'rectum'],
    aliases: ['prostate gland'],
  },

  'corpus-cavernosum-of-penis': {
    anatomicalName: 'Corpora cavernosa of penis',
    summary:
      'The corpora cavernosa are two parallel columns of erectile tissue in the penis. They fill with blood to produce an erection.',
    location: 'Along the upper (dorsal) part of the shaft of the penis; their rear ends (crura) attach to the pubic arch.',
    functions: ['Fill with blood to make the penis rigid during erection', 'Form most of the body (shaft) of the penis'],
    components: ['Left and right corpora', 'Crura', 'Tunica albuginea (tough outer sheath)', 'Deep arteries of the penis'],
    howItWorks:
      'Nerve signals relax smooth muscle in the erectile tissue, so arterial blood fills its spaces. The swelling presses against the surrounding sheath and limits outflow through the veins.',
    related: ['corpus-spongiosum-of-penis', 'glans-penis', 'urethra', 'hip-bone-left'],
    aliases: ['corpus cavernosum', 'penis', 'erectile tissue'],
  },

  'corpus-spongiosum-of-penis': {
    anatomicalName: 'Corpus spongiosum of penis',
    summary:
      'The corpus spongiosum is a single column of erectile tissue that surrounds the urethra in the penis.',
    location: 'Along the underside of the penis, from the bulb in the perineum to the glans at the tip.',
    functions: ['Surrounds and protects the spongy urethra', 'Forms the glans penis at its end'],
    components: ['Bulb of penis', 'Spongy urethra', 'Glans penis'],
    howItWorks: 'It becomes less rigid than the corpora cavernosa during erection, which helps keep the urethra open.',
    related: ['corpus-cavernosum-of-penis', 'glans-penis', 'urethra'],
    aliases: ['corpus spongiosum', 'penis', 'bulb of penis'],
  },

  'glans-penis': {
    anatomicalName: 'Glans penis',
    summary:
      'The glans is the rounded tip of the penis. It contains the opening of the urethra and is highly sensitive.',
    location: 'The distal end of the penis.',
    functions: ['Contains the external urethral opening', 'Provides sensory input'],
    components: ['External urethral orifice', 'Corona of glans', 'Prepuce (foreskin), which covers it unless removed'],
    howItWorks: 'It is the expanded end of the corpus spongiosum and is richly supplied with sensory nerve endings.',
    facts: ['Its raised rim, the corona, marks the boundary between the glans and the shaft.'],
    related: ['corpus-spongiosum-of-penis', 'corpus-cavernosum-of-penis', 'urethra'],
    aliases: ['glans', 'penis', 'tip of penis'],
  },

  // ───────────────────────────── Endocrine ─────────────────────────────
  'adrenal-gland': {
    anatomicalName: 'Adrenal gland',
    summary:
      'The adrenal glands sit on top of the kidneys and release hormones. These hormones manage stress, metabolism and salt balance.',
    location: 'On the upper pole of each kidney, at the back of the upper abdomen.',
    functions: [
      'Release cortisol, which helps regulate metabolism and the stress response',
      'Release aldosterone, which helps control salt, water and blood pressure',
      'Release adrenaline (epinephrine) and noradrenaline for the fight-or-flight response',
      'Produce small amounts of androgens',
    ],
    components: ['Adrenal cortex (outer layer, three zones)', 'Adrenal medulla (inner core)'],
    howItWorks:
      'The cortex makes steroid hormones under control of the pituitary and the kidneys, while the medulla releases adrenaline when stimulated by sympathetic nerves.',
    facts: ['The right gland is roughly pyramid-shaped and the left is more crescent-shaped.'],
    related: ['kidney-left', 'kidney-right', 'pituitary-gland', 'renal-artery-left', 'inferior-vena-cava'],
    aliases: ['adrenal glands', 'suprarenal gland', 'adrenals'],
  },

  'pituitary-gland': {
    anatomicalName: 'Pituitary gland',
    summary:
      'The pituitary gland is a pea-sized gland at the base of the brain. It releases hormones that control many other glands.',
    location: 'In a bony hollow (sella turcica) of the sphenoid bone, attached to the hypothalamus by a stalk.',
    functions: [
      'Releases growth hormone',
      'Controls the thyroid, adrenal glands and gonads (via TSH, ACTH, FSH and LH)',
      'Releases prolactin',
      'Releases oxytocin and antidiuretic hormone (vasopressin) made by the hypothalamus',
    ],
    components: ['Anterior lobe (adenohypophysis)', 'Posterior lobe (neurohypophysis)', 'Pituitary stalk (infundibulum)'],
    howItWorks:
      'The hypothalamus controls the anterior lobe with releasing hormones carried in tiny blood vessels, and sends nerve fibers to the posterior lobe, which releases hormones directly into the blood.',
    facts: ['It is often called the master gland.', 'The optic chiasm lies just above it.'],
    related: ['hypothalamus', 'sphenoid-bone', 'optic-chiasm', 'tuber-cinereum', 'adrenal-gland-left'],
    aliases: ['pituitary', 'hypophysis', 'master gland'],
  },

  'pineal-body': {
    anatomicalName: 'Pineal gland',
    summary:
      'The pineal gland is a tiny pinecone-shaped gland deep in the brain. It makes melatonin, which helps regulate the sleep-wake cycle.',
    location: 'Center of the brain, behind the third ventricle and above the superior colliculi.',
    functions: ['Secretes melatonin, mainly at night', 'Helps align body rhythms with the day-night cycle'],
    howItWorks:
      'Information about light from the eyes reaches the pineal gland through a pathway from the hypothalamus. Darkness increases melatonin release and light suppresses it.',
    facts: ['It is less than a centimeter long.', 'It often develops calcium deposits with age, which can make it visible on imaging.'],
    related: ['habenula', 'superior-colliculi', 'posterior-commissure', 'hypothalamus', 'ventricular-system'],
    aliases: ['pineal gland', 'pineal', 'epiphysis cerebri'],
  },

  // ───────────────────────────── Lymphatic ─────────────────────────────
  spleen: {
    anatomicalName: 'Spleen',
    summary:
      'The spleen is the largest lymphoid organ. It filters the blood and helps the body fight infection.',
    location: 'Upper left abdomen, behind the stomach and under the diaphragm, protected by the 9th to 11th ribs.',
    functions: [
      'Removes old and damaged red blood cells',
      'Filters bacteria and other particles from the blood',
      'Produces immune responses to blood-borne infections',
      'Stores platelets and white blood cells',
    ],
    components: ['Red pulp', 'White pulp', 'Capsule', 'Hilum (where vessels enter and leave)'],
    howItWorks:
      'Blood flows through the red pulp, where worn-out red cells are trapped and broken down, and past the white pulp, where lymphocytes respond to germs.',
    facts: ['People can live without a spleen, though they are more vulnerable to certain infections.'],
    related: ['splenic-artery', 'splenic-vein', 'stomach', 'pancreas', 'kidney-left', 'diaphragm'],
    aliases: ['splenic', 'lien'],
  },

  thymus: {
    anatomicalName: 'Thymus',
    summary:
      'The thymus is a gland in the upper chest where T cells, a type of white blood cell, mature. It is most active in childhood.',
    location: 'Anterior and superior mediastinum, behind the sternum and in front of the heart and great vessels.',
    functions: ['Site of T-cell maturation', 'Helps T cells learn to tolerate the body\'s own tissues', 'Produces hormones such as thymosin'],
    components: ['Two lobes', 'Cortex', 'Medulla', 'Thymic (Hassall) corpuscles'],
    howItWorks:
      'Immature cells from the bone marrow travel to the thymus, where they are tested; those that work properly and do not attack the body are released as T cells.',
    facts: ['After puberty it gradually shrinks and is largely replaced by fat.'],
    related: ['heart', 'manubrium', 'body-of-sternum', 'superior-vena-cava', 'arch-of-aorta', 'brachiocephalic-vein-left'],
    aliases: ['thymus gland'],
  },

  // ───────────────────────────── Integumentary ─────────────────────────────
  skin: {
    anatomicalName: 'Skin',
    summary:
      'The skin is the body\'s largest organ. It forms a protective, waterproof barrier and helps control body temperature.',
    location: 'Covers the entire external surface of the body.',
    functions: [
      'Protects against microbes, chemicals, injury and ultraviolet light',
      'Reduces water loss',
      'Regulates body temperature through sweating and blood flow',
      'Senses touch, pressure, pain and temperature',
      'Makes vitamin D when exposed to sunlight',
    ],
    components: ['Epidermis', 'Dermis', 'Hair follicles', 'Sweat glands', 'Sebaceous glands', 'Nails', 'Hypodermis (underlying fat layer)'],
    howItWorks:
      'The outer epidermis constantly renews itself from below, forming a tough layer of keratin-filled cells. The dermis beneath contains blood vessels, nerves and glands.',
    facts: ['In an adult it covers about 1.5 to 2 square meters.', 'It is thickest on the palms and soles and thinnest on the eyelids.'],
    related: ['scalp-hair', 'eyebrows', 'pubic-hair', 'Epidermis', 'Dermis', 'Hypodermis'],
    aliases: ['integument', 'cutaneous', 'derma'],
  },

  'scalp-hair': {
    anatomicalName: 'Scalp hair',
    commonName: 'Head hair',
    summary:
      'Scalp hair covers the top, back and sides of the head. Each hair grows from a follicle in the skin.',
    location: 'Scalp, over the frontal, parietal, temporal and occipital regions of the skull.',
    functions: ['Protects the scalp from sunlight', 'Helps reduce heat loss from the head', 'Cushions minor impacts', 'Detects light touch'],
    components: ['Hair shaft', 'Hair root and follicle', 'Sebaceous glands', 'Arrector pili muscles'],
    howItWorks:
      'Hair grows in cycles: a long growth phase lasting years, a short transition phase and a resting phase, after which the hair is shed and replaced.',
    facts: ['A typical scalp has around 100,000 hairs.', 'Scalp hair grows roughly 1 cm per month.'],
    related: ['skin', 'aponeurosis-of-epicranius', 'frontal-bone', 'parietal-bone-left', 'occipital-bone'],
    aliases: ['hair', 'head hair'],
  },

  eyebrows: {
    anatomicalName: 'Eyebrows',
    summary:
      'The eyebrows are arches of short, thick hairs above the eyes. They help protect the eyes and play a large role in facial expression.',
    location: 'Over the upper rim of each eye socket (supraorbital margin).',
    functions: ['Divert sweat and rain away from the eyes', 'Help shade the eyes', 'Communicate emotion through facial expression'],
    components: ['Short terminal hairs', 'Skin and underlying muscles of facial expression'],
    howItWorks: 'Muscles such as the frontalis, corrugator supercilii and orbicularis oculi raise, lower and draw the brows together.',
    related: ['frontal-bone', 'frontalis-left', 'corrugator-supercilii-left', 'orbicularis-oculi-left', 'eyeball', 'skin'],
    aliases: ['eyebrow', 'brow', 'supercilium'],
  },

  'pubic-hair': {
    anatomicalName: 'Pubic hair',
    summary:
      'Pubic hair is the coarse hair that grows over the lower front of the pelvis and the external genitals. It appears during puberty.',
    location: 'Over the pubic region and external genitalia.',
    functions: ['Is a secondary sex characteristic that develops at puberty', 'Is thought to help reduce skin friction'],
    components: ['Coarse terminal hairs', 'Hair follicles', 'Associated sweat and sebaceous glands'],
    howItWorks: 'Rising levels of androgens (hormones such as testosterone) at puberty convert fine body hairs in this region into thicker, coarser hairs.',
    related: ['skin', 'hip-bone-left', 'hip-bone-right'],
    aliases: ['pubic region hair'],
  },
};
