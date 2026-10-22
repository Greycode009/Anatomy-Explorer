import type { ContentEntry } from '../../types';

// Entries for structures that only the female (Human Reference Atlas) body models as separate
// parts. Other female structures reuse the shared entries (e.g. 'liver') or the information-only
// entries that the female body now backs with a model (e.g. 'uterus', 'ovaries', 'left-atrium').
export const FEMALE_CONTENT: Record<string, ContentEntry> = {
  'interventricular-septum': {
    anatomicalName: 'Interventricular septum',
    summary: 'The thick wall that separates the left and right ventricles of the heart.',
    location: 'Inside the heart, between the right and left ventricles, running from the base of the heart toward the apex.',
    functions: [
      'Keeps oxygen-poor blood in the right ventricle separate from oxygen-rich blood in the left ventricle',
      'Contracts with the ventricles and contributes to pumping',
      'Carries the bundle branches of the heart\'s conduction system',
    ],
    components: ['Muscular part (most of the septum)', 'Membranous part (a small thin area near the aortic valve)'],
    howItWorks:
      'Most of the septum is heart muscle that contracts with the left ventricle. The electrical signal that coordinates each beat travels down the septum in the left and right bundle branches before spreading through the ventricle walls.',
    related: ['left-ventricle', 'right-ventricle', 'heart', 'mitral-valve', 'tricuspid-valve'],
    aliases: ['ventricular septum', 'septum of heart'],
  },
  'extraocular-muscles': {
    anatomicalName: 'Extraocular muscles',
    commonName: 'Eye muscles',
    summary: 'Six small muscles attached to each eyeball that move the eye and keep both eyes pointing at the same target.',
    location: 'Inside the orbit (eye socket). The four rectus muscles arise from a tendinous ring at the back of the orbit; the oblique muscles approach the eyeball at an angle.',
    functions: [
      'Turn the eye up, down, inward and outward',
      'Rotate the eye slightly around its front-to-back axis',
      'Coordinate both eyes so that they look at the same point',
    ],
    components: ['Superior rectus', 'Inferior rectus', 'Medial rectus', 'Lateral rectus', 'Superior oblique', 'Inferior oblique'],
    facts: [
      'The lateral rectus is supplied by the abducens nerve (CN VI), the superior oblique by the trochlear nerve (CN IV), and the other four by the oculomotor nerve (CN III).',
    ],
    related: ['eyeball', 'optic-nerve-left'],
    aliases: ['eye muscles', 'ocular muscles', 'rectus muscles of eye', 'oblique muscles of eye'],
  },
  'uterine-ligaments': {
    anatomicalName: 'Ligaments of the uterus and ovaries',
    summary: 'Folds of peritoneum and bands of connective tissue that hold the uterus, ovaries and uterine tubes in position in the pelvis.',
    location: 'In the pelvis, around the uterus: the broad ligament drapes over the uterus and tubes, and the other ligaments run from the uterus or ovaries to the pelvic walls.',
    functions: [
      'Support the uterus and keep it in its normal forward-tilted position',
      'Suspend the ovaries and carry their blood vessels and nerves',
      'Help resist downward displacement of the uterus',
    ],
    components: [
      'Broad ligament (a double fold of peritoneum)',
      'Round ligament of uterus',
      'Cardinal (transverse cervical) ligament',
      'Uterosacral ligament',
      'Ovarian ligament (ovary to uterus)',
      'Suspensory ligament of the ovary (carries the ovarian vessels)',
      'Uterovesical pouch (peritoneal recess between uterus and bladder)',
    ],
    howItWorks:
      'The cardinal and uterosacral ligaments are thought to provide much of the uterus\'s support at the level of the cervix. The round ligament runs through the inguinal canal and helps keep the uterus tilted forward.',
    related: ['uterus', 'ovaries', 'uterine-tubes', 'urinary-bladder'],
    aliases: ['broad ligament', 'round ligament', 'cardinal ligament', 'uterosacral ligament', 'ovarian ligament'],
  },
  'blood-vessels': {
    anatomicalName: 'Blood vessels (organ vasculature)',
    summary: 'Arteries and veins that carry blood to and from an organ. In the female body they are grouped by the organ they supply.',
    location: 'Running into and around the organ named in each group, for example the coronary vessels on the heart or the uterine arteries beside the uterus.',
    functions: [
      'Arteries deliver oxygen-rich blood and nutrients to the organ',
      'Veins carry blood with carbon dioxide and wastes back toward the heart',
      'Branches divide into capillaries, where exchange with the tissue happens',
    ],
    components: ['Arteries', 'Veins', 'Their branches within and around the organ'],
    howItWorks:
      'Each organ receives blood from branches of the aorta and returns it through veins that drain into the venae cavae — except the intestines and spleen, whose veins drain into the hepatic portal vein and pass through the liver first.',
    related: ['heart', 'Hepatic portal vein'],
    aliases: ['vasculature', 'arteries', 'veins', 'blood supply'],
  },
  'knee-joint': {
    anatomicalName: 'Knee joint',
    commonName: 'Knee',
    summary: 'The joint between the thigh bone and the shin bone, with the kneecap in front. It is the largest joint in the body.',
    location: 'Between the lower end of the femur and the upper end of the tibia, with the patella in front and the head of the fibula nearby on the outer side.',
    functions: [
      'Bends and straightens the leg',
      'Allows a small amount of rotation when bent',
      'Carries body weight when standing, walking and running',
    ],
    components: [
      'Lower end of the femur (condyles)',
      'Upper end of the tibia',
      'Patella (kneecap)',
      'Medial and lateral menisci (cartilage pads)',
      'Anterior and posterior cruciate ligaments',
      'Medial (tibial) and lateral (fibular) collateral ligaments',
      'Patellar ligament',
    ],
    howItWorks:
      'The rounded femoral condyles roll and glide on the flatter top of the tibia. The menisci deepen this contact surface and absorb shock; the cruciate ligaments stop the tibia sliding too far forward or backward, and the collateral ligaments resist sideways bending.',
    related: ['femur-left', 'tibia-left', 'patella-left', 'fibula-left', 'rectus-femoris-left'],
    aliases: ['knee', 'menisci', 'cruciate ligaments', 'ACL', 'patellar ligament'],
  },
  'brain-hemisphere': {
    anatomicalName: 'Brain (left and right halves)',
    summary: 'The brain shown as its left and right halves, built from many smaller regions such as cortical areas, deep nuclei and parts of the brainstem.',
    location: 'Inside the skull. The two cerebral hemispheres are separated by a deep groove and joined by the corpus callosum.',
    functions: [
      'Processes sensation and controls voluntary movement, mostly for the opposite side of the body',
      'Supports language, memory, emotion, planning and thought',
      'Regulates many automatic body functions through deeper structures',
    ],
    components: ['Cerebral cortex', 'Deep nuclei such as the caudate, putamen and globus pallidus', 'Thalamus and hypothalamus', 'Hippocampus and amygdala', 'Parts of the brainstem and cerebellum'],
    howItWorks:
      'Nerve pathways cross the midline, so each hemisphere mainly receives sensation from and controls movement of the opposite side of the body. The hemispheres share information through the corpus callosum.',
    facts: ['In most people the left hemisphere is dominant for language.'],
    related: ['corpus-callosum', 'cerebellum', 'thalamus-left', 'optic-chiasm'],
    aliases: ['brain', 'cerebrum', 'cerebral hemisphere'],
  },
};
