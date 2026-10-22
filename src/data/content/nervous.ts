import type { ContentEntry } from '../../types';

export const NERVOUS_CONTENT: Record<string, ContentEntry> = {
  'accessory-short-gyrus': {
    anatomicalName: 'Accessory short gyrus of insula',
    summary:
      'The accessory short gyrus is a small fold of cortex at the front of the insula, a region of the brain hidden deep inside the lateral sulcus.',
    location:
      'In the anterior part of the insula, near its lower front corner, alongside the other short insular gyri. It is covered by the frontal and temporal opercula, so it cannot be seen from the brain surface.',
    functions: [
      'Forms part of the anterior insular cortex',
      'Contributes to the insula\'s role in sensing internal body states and taste',
      'Participates in networks linked to emotional awareness',
    ],
    facts: [
      'The insula usually has three short gyri at the front and two long gyri at the back; the accessory gyrus is a smaller additional fold that is not always clearly distinct.',
    ],
    related: ['insula-left', 'superior-temporal-gyrus-left', 'orbital-gyri-straight-gyrus', 'putamen-left'],
    aliases: ['accessory gyrus of insula', 'insular short gyrus', 'short gyri of insula'],
  },

  amygdala: {
    anatomicalName: 'Amygdala',
    summary:
      'The amygdala is an almond-shaped cluster of nuclei deep in the temporal lobe. It helps the brain detect emotionally important events, especially potential threats.',
    location:
      'In the anterior medial temporal lobe, just in front of the hippocampus and the tip of the temporal horn of the lateral ventricle, beneath the uncus of the parahippocampal gyrus.',
    functions: [
      'Processes emotional significance of sensory information, particularly fear and threat',
      'Strengthens the memory of emotionally charged events',
      'Influences hormonal and autonomic responses through the hypothalamus',
      'Contributes to social and reward-related behavior',
    ],
    components: ['Basolateral nuclear group', 'Centromedial (central and medial) nuclei', 'Cortical nuclei'],
    howItWorks:
      'The amygdala receives input from sensory regions, the thalamus and memory structures. It sends output through the stria terminalis and other pathways to the hypothalamus and brainstem, which trigger bodily responses such as changes in heart rate.',
    facts: [
      'Its name comes from the Greek word for "almond."',
    ],
    related: ['hippocampus-left', 'stria-terminalis-left', 'hypothalamus', 'parahippocampal-gyrus-left', 'caudate-nucleus-left'],
    aliases: ['amygdaloid body', 'amygdaloid nucleus', 'amygdalae'],
  },

  'angular-gyrus': {
    anatomicalName: 'Angular gyrus',
    summary:
      'The angular gyrus is a curved fold of the parietal lobe where information from vision, hearing and body sense comes together. It is involved in language, reading and number processing.',
    location:
      'In the inferior parietal lobule, arching around the upturned end of the superior temporal sulcus. It lies behind the supramarginal gyrus and near the junction of the parietal, temporal and occipital lobes.',
    functions: [
      'Contributes to reading and understanding the meaning of words',
      'Supports arithmetic and number processing',
      'Takes part in spatial attention and memory retrieval networks',
    ],
    facts: [
      'It corresponds largely to Brodmann area 39.',
      'Damage in the language-dominant hemisphere has been linked to difficulties with reading and writing.',
    ],
    related: ['supramarginal-gyrus-left', 'superior-temporal-gyrus-left', 'occipital-lobe-left', 'superior-parietal-lobule-precuneus-left'],
    aliases: ['angular gyrus', 'Brodmann area 39', 'inferior parietal lobule'],
  },

  'anterior-commissure': {
    anatomicalName: 'Anterior commissure',
    summary:
      'The anterior commissure is a small bundle of nerve fibers that crosses the midline of the brain, connecting parts of the two cerebral hemispheres.',
    location:
      'In the midline, embedded in the lamina terminalis at the front wall of the third ventricle, just in front of the columns of the fornix and below the rostrum of the corpus callosum.',
    functions: [
      'Connects the temporal lobes of the two hemispheres',
      'Connects olfactory (smell) structures of both sides',
      'Provides a pathway for communication between hemispheres alongside the corpus callosum',
    ],
    facts: [
      'It is a key landmark in brain imaging: the line between the anterior and posterior commissures is used as a standard reference.',
    ],
    related: ['posterior-commissure', 'corpus-callosum', 'lamina-terminalis', 'fornix-of-forebrain-left', 'ventricular-system'],
    aliases: ['AC', 'commissura anterior'],
  },

  'caudate-nucleus': {
    anatomicalName: 'Caudate nucleus',
    summary:
      'The caudate nucleus is a C-shaped mass of gray matter deep in the brain. It is part of the basal ganglia, which help plan and regulate movement and goal-directed behavior.',
    location:
      'Deep in each cerebral hemisphere, curving along the wall of the lateral ventricle. Its head bulges into the anterior horn of the lateral ventricle, and the internal capsule separates it from the putamen and globus pallidus.',
    functions: [
      'Helps plan and select movements as part of the basal ganglia',
      'Contributes to learning habits and goal-directed actions',
      'Takes part in circuits involved in cognition and motivation',
    ],
    components: ['Head', 'Body', 'Tail'],
    howItWorks:
      'Together with the putamen it forms the striatum, the main input station of the basal ganglia. It receives signals from the cerebral cortex and dopamine from the substantia nigra, and sends output that is relayed through the thalamus back to the cortex.',
    facts: [
      'Its name means "having a tail," describing its curved tail that ends near the amygdala.',
    ],
    related: ['putamen-left', 'globus-pallidus-left', 'internal-capsule-left', 'thalamus-left', 'ventricular-system'],
    aliases: ['caudate', 'striatum', 'basal ganglia', 'neostriatum'],
  },

  cerebellum: {
    anatomicalName: 'Cerebellum',
    commonName: 'Little brain',
    summary:
      'The cerebellum is a large, finely folded structure at the back of the brain. It coordinates movement, balance and posture, and is involved in motor learning.',
    location:
      'In the posterior cranial fossa, below the occipital lobes and behind the pons and medulla. It connects to the brainstem through three pairs of cerebellar peduncles and is separated from the cerebrum by the tentorium cerebelli.',
    functions: [
      'Coordinates the timing and accuracy of movements',
      'Maintains balance and posture',
      'Supports learning of motor skills',
      'Contributes to some cognitive functions',
    ],
    components: [
      'Two cerebellar hemispheres',
      'Vermis',
      'Folia and cerebellar cortex',
      'Deep cerebellar nuclei (including the dentate nucleus)',
      'Superior, middle and inferior cerebellar peduncles',
    ],
    howItWorks:
      'The cerebellum compares the movement the brain intends with sensory feedback about what the body is actually doing, then adjusts signals to the motor systems to make movements smooth and precise.',
    facts: [
      'It makes up about 10% of brain volume but contains more than half of the brain\'s neurons.',
      'Each cerebellar hemisphere mainly influences movement on the same side of the body.',
    ],
    related: ['pons', 'medulla-oblongata', 'midbrain', 'occipital-bone', 'ventricular-system'],
    aliases: ['little brain', 'hindbrain', 'vermis', 'arbor vitae'],
  },

  'choroid-plexus-of-cerebral-hemisphere': {
    anatomicalName: 'Choroid plexus of lateral ventricle',
    summary:
      'The choroid plexus is a network of tiny blood vessels and specialized lining cells inside the brain\'s ventricles. It produces most of the cerebrospinal fluid (CSF).',
    location:
      'Within the lateral ventricles, along the body, the atrium and the temporal horn (it is absent from the anterior and posterior horns). It continues through the interventricular foramina into the roof of the third ventricle; separate choroid plexus also lies in the fourth ventricle.',
    functions: [
      'Produces cerebrospinal fluid',
      'Forms the blood-CSF barrier that controls what enters the fluid',
      'Helps regulate the chemical environment of the brain',
    ],
    howItWorks:
      'Capillaries in the plexus leak plasma into the surrounding tissue. A layer of ependymal cells joined by tight junctions then selectively transports water and solutes to form CSF.',
    facts: [
      'The choroid plexuses produce roughly 500 mL of CSF per day, while only about 150 mL is present at any time.',
    ],
    related: ['ventricular-system', 'fornix-of-forebrain-left', 'thalamus-left', 'caudate-nucleus-left'],
    aliases: ['choroid plexus', 'CSF production', 'plexus choroideus'],
  },

  'cingulate-gyrus': {
    anatomicalName: 'Cingulate gyrus',
    summary:
      'The cingulate gyrus is a long, curved fold on the inner surface of each hemisphere that wraps around the corpus callosum. It is part of the limbic lobe and links emotion, attention and memory.',
    location:
      'On the medial surface of the cerebral hemisphere, directly above the corpus callosum and separated from it by the callosal sulcus. The cingulate sulcus lies above it.',
    functions: [
      'Front portion: involved in emotion, motivation and monitoring of errors or conflict',
      'Contributes to the emotional experience of pain',
      'Back portion: involved in memory and self-related thought',
    ],
    howItWorks:
      'Beneath its cortex runs the cingulum, a bundle of fibers that links the frontal lobe with the parahippocampal gyrus and other limbic areas.',
    facts: [
      'Its name comes from the Latin cingulum, meaning "belt" or "girdle."',
    ],
    related: ['corpus-callosum', 'parahippocampal-gyrus-left', 'superior-frontal-gyrus-left', 'hippocampus-left', 'thalamus-left'],
    aliases: ['cingulate cortex', 'cingulum', 'limbic lobe', 'anterior cingulate'],
  },

  'commissure-of-fornix-of-forebrain': {
    anatomicalName: 'Commissure of fornix',
    summary:
      'The commissure of the fornix is a thin sheet of nerve fibers that crosses the midline, connecting the hippocampal formations of the two hemispheres.',
    location:
      'In the midline, beneath the splenium (back end) of the corpus callosum, stretched between the two crura of the fornix.',
    functions: [
      'Connects the hippocampal formations of the two sides',
      'Allows exchange of memory-related signals between hemispheres',
    ],
    facts: [
      'It is also called the hippocampal commissure or psalterium.',
    ],
    related: ['fornix-of-forebrain-left', 'hippocampus-left', 'corpus-callosum', 'anterior-commissure'],
    aliases: ['hippocampal commissure', 'psalterium', 'fornical commissure'],
  },

  'corpus-callosum': {
    anatomicalName: 'Corpus callosum',
    summary:
      'The corpus callosum is the largest bundle of nerve fibers in the brain. It connects the left and right cerebral hemispheres so they can share information.',
    location:
      'In the midline, deep in the longitudinal fissure between the hemispheres. It forms the roof of the lateral ventricles, with the cingulate gyrus above it and the septum pellucidum and fornix below.',
    functions: [
      'Connects corresponding areas of the two hemispheres',
      'Allows sensory, motor and cognitive information to be shared between sides',
      'Helps coordinate activity of the two hemispheres',
    ],
    components: ['Rostrum', 'Genu', 'Body (trunk)', 'Splenium'],
    facts: [
      'It contains roughly 200 million axons.',
      'The splenium carries many fibers connecting the visual areas of the occipital lobes.',
    ],
    related: ['cingulate-gyrus-left', 'septum-pellucidum', 'fornix-of-forebrain-left', 'anterior-commissure', 'white-matter-structure-of-cerebral-hemisphere'],
    aliases: ['corpus callosum', 'callosal commissure', 'splenium', 'genu'],
  },

  ear: {
    anatomicalName: 'Auricle (external ear)',
    commonName: 'Ear',
    summary:
      'The visible outer ear, or auricle, is a curved flap of cartilage and skin on each side of the head. It collects sound waves and funnels them into the ear canal.',
    location:
      'On the side of the head, around the opening of the external acoustic meatus of the temporal bone. The actual hearing and balance organs (middle and inner ear) lie deeper, inside the temporal bone.',
    functions: [
      'Collects sound and channels it into the ear canal',
      'Helps judge whether sounds come from above, below, in front or behind',
      'Protects the entrance to the ear canal',
    ],
    components: ['Helix', 'Antihelix', 'Tragus', 'Concha', 'Lobule (earlobe)'],
    howItWorks:
      'Sound passes down the ear canal to the eardrum. Three tiny middle ear bones (malleus, incus, stapes) carry the vibrations to the cochlea of the inner ear, where they are converted into nerve signals sent to the brainstem.',
    facts: [
      'The auricle is shaped by elastic cartilage, except for the earlobe, which contains fat and connective tissue.',
      'The stapes in the middle ear is the smallest bone in the body.',
    ],
    related: ['temporal-bone-left', 'inferior-colliculi', 'medial-geniculate-body-left', 'superior-temporal-gyrus-left'],
    aliases: ['ears', 'auricle', 'pinna', 'outer ear', 'external ear', 'earlobe'],
  },

  eyeball: {
    anatomicalName: 'Eyeball (bulbus oculi)',
    commonName: 'Eye',
    summary:
      'The eyeball is the organ of sight. It focuses light onto the retina, which converts it into nerve signals that travel to the brain through the optic nerve.',
    location:
      'In the orbit (eye socket) of the skull, cushioned by fat and moved by six extraocular muscles. The optic nerve leaves its back surface.',
    functions: [
      'Focuses light to form an image on the retina',
      'Converts light into nerve signals',
      'Adjusts to different light levels by changing pupil size',
      'Adjusts focus for near and far objects',
    ],
    components: [
      'Cornea and sclera (outer fibrous layer)',
      'Iris, ciliary body and choroid (middle vascular layer)',
      'Retina (inner neural layer)',
      'Lens',
      'Aqueous humor and vitreous body',
    ],
    howItWorks:
      'Light is bent mainly by the cornea, then fine-tuned by the lens, whose shape is changed by the ciliary muscle. Rods and cones in the retina detect the light, and retinal ganglion cells send the signals out through the optic nerve.',
    facts: [
      'An adult eyeball is about 24 mm in diameter.',
      'The optic disc, where the optic nerve leaves, has no photoreceptors and creates a blind spot.',
    ],
    related: ['optic-nerve-left', 'optic-chiasm', 'lateral-geniculate-body-left', 'occipital-lobe-left', 'lacrimal-bone-left'],
    aliases: ['eye', 'eyes', 'globe', 'bulbus oculi', 'retina', 'cornea', 'lens', 'iris', 'pupil'],
  },

  'fornix-of-forebrain': {
    anatomicalName: 'Fornix',
    summary:
      'The fornix is an arch-shaped bundle of nerve fibers that carries signals out of the hippocampus. It is an important pathway in memory circuits.',
    location:
      'Deep in the brain, arching beneath the corpus callosum. It begins at the hippocampus in the temporal lobe, curves up and forward under the corpus callosum (attached to the septum pellucidum), and descends in front of the third ventricle to the mammillary bodies.',
    functions: [
      'Carries output from the hippocampus to the mammillary bodies and septal area',
      'Links memory-related structures of the limbic system',
    ],
    components: ['Fimbria', 'Crura (posterior pillars)', 'Commissure', 'Body', 'Columns (anterior pillars)'],
    howItWorks:
      'Signals travel from the hippocampus through the fornix to the mammillary bodies, then on to the thalamus and cingulate gyrus, forming part of a loop (the Papez circuit) associated with memory and emotion.',
    facts: [
      'Its name is Latin for "arch."',
    ],
    related: ['hippocampus-left', 'mammillary-body', 'commissure-of-fornix-of-forebrain', 'septum-pellucidum', 'corpus-callosum'],
    aliases: ['fornix', 'fornix cerebri', 'fimbria'],
  },

  'fusiform-gyrus': {
    anatomicalName: 'Fusiform gyrus',
    commonName: 'Lateral occipitotemporal gyrus',
    summary:
      'The fusiform gyrus is a long, spindle-shaped fold on the underside of the temporal and occipital lobes. It is important for recognizing complex visual forms such as faces and written words.',
    location:
      'On the inferior surface of the hemisphere, between the parahippocampal gyrus (medially, across the collateral sulcus) and the inferior temporal gyrus (laterally, across the occipitotemporal sulcus).',
    functions: [
      'Contributes to face recognition',
      'Contributes to recognition of written words and letters',
      'Supports recognition of objects and colors as part of the ventral visual stream',
    ],
    facts: [
      'A region within it, often called the fusiform face area, responds strongly to faces in brain imaging studies.',
      'Its name means "spindle-shaped."',
    ],
    related: ['inferior-temporal-gyrus-left', 'parahippocampal-gyrus-left', 'occipital-lobe-left', 'hippocampus-left'],
    aliases: ['occipitotemporal gyrus', 'fusiform face area', 'FFA', 'visual word form area'],
  },

  'globus-pallidus': {
    anatomicalName: 'Globus pallidus',
    summary:
      'The globus pallidus is a wedge-shaped nucleus deep in the brain and a key part of the basal ganglia. Its inner portion is a main output station that helps regulate movement.',
    location:
      'Deep in each hemisphere, just medial to the putamen and lateral to the internal capsule. Together with the putamen, it forms the lentiform nucleus.',
    functions: [
      'Sends the main inhibitory output of the basal ganglia to the thalamus',
      'Helps regulate the initiation and scaling of movement',
      'Participates in circuits involved in motivation and behavior',
    ],
    components: ['External segment (GPe)', 'Internal segment (GPi)'],
    howItWorks:
      'Neurons of the internal segment continuously inhibit parts of the thalamus. Signals from the striatum adjust this inhibition, allowing wanted movements to proceed and suppressing unwanted ones.',
    facts: [
      'Its name means "pale globe," because its many myelinated fibers make it look paler than the putamen.',
    ],
    related: ['putamen-left', 'caudate-nucleus-left', 'internal-capsule-left', 'thalamus-left', 'peduncle-of-midbrain'],
    aliases: ['pallidum', 'paleostriatum', 'GPi', 'GPe', 'lentiform nucleus', 'basal ganglia'],
  },

  habenula: {
    anatomicalName: 'Habenula',
    summary:
      'The habenulae are a pair of small nuclei at the top back of the thalamus. They link the forebrain with midbrain centers that release dopamine and serotonin.',
    location:
      'In the epithalamus, at the posterior end of the dorsal thalamus near the base of the pineal gland, on either side of the midline. The two sides are connected by the habenular commissure.',
    functions: [
      'Relays signals from the forebrain to the midbrain',
      'Influences the activity of dopamine- and serotonin-releasing neurons',
      'Is involved in processing reward, disappointment and avoidance',
    ],
    howItWorks:
      'It receives input through the stria medullaris of the thalamus and sends output through the fasciculus retroflexus to the interpeduncular nucleus and other midbrain areas.',
    facts: [
      'Its name is Latin for "little rein."',
    ],
    related: ['stria-medullaris-of-thalamus-left', 'pineal-body', 'thalamus-left', 'interpeduncular-fossa', 'posterior-commissure'],
    aliases: ['habenular nuclei', 'habenulae', 'epithalamus', 'habenular trigone'],
  },

  hippocampus: {
    anatomicalName: 'Hippocampus',
    summary:
      'The hippocampus is a curved structure in the temporal lobe that is essential for forming new memories of facts and events. It also helps with spatial navigation.',
    location:
      'In the medial temporal lobe, forming the floor of the temporal horn of the lateral ventricle. It lies behind the amygdala and next to the parahippocampal gyrus.',
    functions: [
      'Forms new long-term memories of events and facts',
      'Supports spatial memory and navigation',
      'Helps place memories in context',
    ],
    components: ['Dentate gyrus', 'Cornu ammonis (CA1 to CA4 fields)', 'Subiculum', 'Fimbria'],
    howItWorks:
      'Information from many cortical areas reaches the hippocampus through the entorhinal cortex of the parahippocampal gyrus. Output leaves through the subiculum and the fornix.',
    facts: [
      'Its name comes from the Greek for "seahorse," because of its curved shape.',
      'Surgical removal of both hippocampi in the patient H.M. in 1953 left him unable to form new long-term memories of events.',
      'It contains "place cells" that fire when an animal is in a particular location.',
    ],
    related: ['parahippocampal-gyrus-left', 'amygdala-left', 'fornix-of-forebrain-left', 'mammillary-body', 'commissure-of-fornix-of-forebrain'],
    aliases: ['hippocampal formation', 'Ammon\'s horn', 'cornu ammonis', 'dentate gyrus', 'memory center'],
  },

  hypothalamus: {
    anatomicalName: 'Hypothalamus',
    summary:
      'The hypothalamus is a small region at the base of the brain that keeps the body\'s internal conditions in balance. It controls the pituitary gland, linking the nervous system to the endocrine system.',
    location:
      'Below the thalamus, forming the floor and lower side walls of the third ventricle. It lies above the pituitary gland, which hangs from it by the infundibulum (pituitary stalk), between the optic chiasm in front and the mammillary bodies behind.',
    functions: [
      'Controls the pituitary gland and thus many hormone systems',
      'Regulates body temperature, hunger and thirst',
      'Coordinates the autonomic nervous system',
      'Helps regulate sleep-wake and daily (circadian) rhythms',
    ],
    components: [
      'Suprachiasmatic nucleus',
      'Supraoptic and paraventricular nuclei',
      'Arcuate nucleus',
      'Tuber cinereum and median eminence',
      'Mammillary bodies',
    ],
    howItWorks:
      'Some hypothalamic neurons release hormones into small portal blood vessels that carry them to the anterior pituitary, controlling its hormone output. Others (in the supraoptic and paraventricular nuclei) make antidiuretic hormone and oxytocin, which travel down their axons to be released from the posterior pituitary.',
    facts: [
      'It weighs only about 4 grams, less than 1% of the brain.',
    ],
    related: ['pituitary-gland', 'tuber-cinereum', 'mammillary-body', 'optic-chiasm', 'thalamus-left'],
    aliases: ['hypothalamic', 'homeostasis center', 'diencephalon'],
  },

  'inferior-colliculi': {
    anatomicalName: 'Inferior colliculi',
    summary:
      'The inferior colliculi are two rounded bumps on the back of the midbrain. They are major relay centers in the hearing pathway.',
    location:
      'On the dorsal surface (tectum) of the midbrain, below the superior colliculi. Each connects to the medial geniculate body of the thalamus through the brachium of the inferior colliculus.',
    functions: [
      'Relay and process ascending auditory signals',
      'Integrate information used to locate sounds',
      'Contribute to reflex responses to sudden sounds',
    ],
    components: ['Inferior colliculus (paired)', 'Brachium of inferior colliculus'],
    howItWorks:
      'Nearly all ascending auditory fibers from lower brainstem nuclei synapse here. Neurons then project through the brachium to the medial geniculate body, which relays signals to the auditory cortex.',
    facts: [
      'The trochlear nerve, the only cranial nerve to leave the back of the brainstem, emerges just below them.',
    ],
    related: ['superior-colliculi', 'medial-geniculate-body-left', 'midbrain', 'superior-temporal-gyrus-left', 'ear'],
    aliases: ['inferior colliculus', 'tectum', 'corpora quadrigemina', 'auditory midbrain'],
  },

  'inferior-temporal-gyrus': {
    anatomicalName: 'Inferior temporal gyrus',
    summary:
      'The inferior temporal gyrus is the lowest fold on the side of the temporal lobe. It is part of the visual pathway that identifies what objects are.',
    location:
      'On the lower lateral surface of the temporal lobe, below the inferior temporal sulcus, extending onto the underside of the brain where it borders the fusiform gyrus.',
    functions: [
      'Contributes to recognition of objects and shapes',
      'Forms part of the ventral ("what") visual stream',
      'Takes part in visual memory',
    ],
    related: ['middle-temporal-gyrus-left', 'fusiform-gyrus-left', 'occipital-lobe-left', 'temporal-bone-left'],
    aliases: ['inferior temporal cortex', 'IT cortex', 'temporal lobe'],
  },

  insula: {
    anatomicalName: 'Insula',
    commonName: 'Insular cortex',
    summary:
      'The insula is a region of cerebral cortex folded deep inside the lateral sulcus. It processes signals about the internal state of the body and contributes to taste and emotional awareness.',
    location:
      'Hidden deep in the lateral (Sylvian) sulcus, covered by the frontal, parietal and temporal opercula. It is outlined by the circular sulcus and lies lateral to the putamen and claustrum.',
    functions: [
      'Processes sensations from internal organs (interoception)',
      'Contains the primary taste (gustatory) cortex',
      'Contributes to pain perception and autonomic control',
      'Participates in emotional and self-awareness networks',
    ],
    components: ['Short gyri (anterior)', 'Long gyri (posterior)', 'Central sulcus of insula', 'Circular sulcus'],
    facts: [
      'It is sometimes called the "island of Reil" after the anatomist Johann Christian Reil.',
      'Its name means "island" in Latin.',
    ],
    related: ['accessory-short-gyrus-left', 'superior-temporal-gyrus-left', 'putamen-left', 'orbital-gyri-straight-gyrus'],
    aliases: ['insular cortex', 'island of Reil', 'insular lobe'],
  },

  'internal-capsule': {
    anatomicalName: 'Internal capsule',
    summary:
      'The internal capsule is a compact band of white matter that carries most of the fibers running between the cerebral cortex and the brainstem, spinal cord and thalamus.',
    location:
      'Deep in each hemisphere, between the caudate nucleus and thalamus on the inner side and the lentiform nucleus (putamen and globus pallidus) on the outer side. In horizontal section it is V-shaped.',
    functions: [
      'Carries motor fibers from the cortex to the brainstem and spinal cord',
      'Carries sensory fibers from the thalamus to the cortex',
      'Contains the visual and auditory radiations in its posterior parts',
    ],
    components: ['Anterior limb', 'Genu', 'Posterior limb', 'Retrolenticular part', 'Sublenticular part'],
    howItWorks:
      'Above, its fibers fan out as the corona radiata; below, the descending motor fibers continue into the cerebral peduncles of the midbrain.',
    facts: [
      'Because so many fibers are packed into it, even a small lesion here can affect movement or sensation over a large part of the opposite side of the body.',
    ],
    related: ['caudate-nucleus-left', 'putamen-left', 'globus-pallidus-left', 'thalamus-left', 'peduncle-of-midbrain'],
    aliases: ['capsula interna', 'corona radiata', 'corticospinal tract'],
  },

  'interpeduncular-fossa': {
    anatomicalName: 'Interpeduncular fossa',
    summary:
      'The interpeduncular fossa is a deep depression on the underside of the midbrain between the two cerebral peduncles. The oculomotor nerves emerge from its sides.',
    location:
      'On the ventral surface of the midbrain, between the cerebral peduncles, behind the mammillary bodies and above the pons.',
    functions: [
      'Marks the exit point of the oculomotor nerves (cranial nerve III)',
      'Allows small arteries to enter the brainstem through its floor',
    ],
    components: ['Posterior perforated substance (floor)'],
    facts: [
      'Its floor is called the posterior perforated substance because it is pierced by many small branches of the posterior cerebral arteries.',
      'It is filled by a pocket of cerebrospinal fluid called the interpeduncular cistern.',
    ],
    related: ['peduncle-of-midbrain', 'midbrain', 'mammillary-body', 'pons', 'habenula'],
    aliases: ['interpeduncular cistern', 'posterior perforated substance'],
  },

  'lamina-terminalis': {
    anatomicalName: 'Lamina terminalis',
    summary:
      'The lamina terminalis is a thin sheet of tissue that forms the front wall of the third ventricle. It marks the original front end of the embryonic neural tube.',
    location:
      'In the midline, extending from the upper surface of the optic chiasm up to the anterior commissure and rostrum of the corpus callosum.',
    functions: [
      'Forms the anterior wall of the third ventricle',
      'Contains a sensory area that monitors the blood and helps regulate thirst and fluid balance',
      'Carries the anterior commissure across the midline',
    ],
    facts: [
      'It contains the organum vasculosum of the lamina terminalis (OVLT), one of the brain\'s circumventricular organs, where the blood-brain barrier is lacking.',
    ],
    related: ['anterior-commissure', 'optic-chiasm', 'hypothalamus', 'ventricular-system', 'corpus-callosum'],
    aliases: ['terminal lamina', 'OVLT'],
  },

  'lateral-geniculate-body': {
    anatomicalName: 'Lateral geniculate body',
    commonName: 'Lateral geniculate nucleus',
    summary:
      'The lateral geniculate body is a small, layered nucleus of the thalamus. It is the main relay station that passes visual information from the eyes to the visual cortex.',
    location:
      'On the posterior underside of the thalamus, beneath the pulvinar, where most fibers of the optic tract end.',
    functions: [
      'Relays visual signals from the retina to the primary visual cortex',
      'Keeps input from the two eyes in separate layers',
      'Allows other brain regions to modulate visual input',
    ],
    components: ['Six cell layers (magnocellular and parvocellular)', 'Koniocellular layers between them'],
    howItWorks:
      'Each lateral geniculate body receives information about the opposite half of the visual field from both eyes, and sends it through the optic radiation to the primary visual cortex in the occipital lobe.',
    related: ['optic-tract-left', 'thalamus-left', 'occipital-lobe-left', 'medial-geniculate-body-left', 'superior-colliculi'],
    aliases: ['LGN', 'lateral geniculate nucleus', 'visual thalamus'],
  },

  'mammillary-body': {
    anatomicalName: 'Mammillary bodies',
    summary:
      'The mammillary bodies are two small, round bumps on the underside of the brain. They are part of the hypothalamus and belong to circuits involved in memory.',
    location:
      'On the inferior surface of the hypothalamus, behind the tuber cinereum and just in front of the interpeduncular fossa of the midbrain.',
    functions: [
      'Receive input from the hippocampus through the fornix',
      'Relay signals to the anterior nucleus of the thalamus',
      'Contribute to the formation of memories',
    ],
    howItWorks:
      'The mammillothalamic tract carries signals from the mammillary bodies to the anterior thalamus, which projects to the cingulate gyrus, forming part of the Papez circuit.',
    facts: [
      'Their name refers to their small, breast-like (mammilla) shape.',
      'They are characteristically damaged in Wernicke-Korsakoff syndrome, a memory disorder caused by thiamine deficiency.',
    ],
    related: ['hypothalamus', 'fornix-of-forebrain-left', 'tuber-cinereum', 'interpeduncular-fossa', 'thalamus-left'],
    aliases: ['mammillary bodies', 'corpora mamillaria', 'mamillary body'],
  },

  'medial-geniculate-body': {
    anatomicalName: 'Medial geniculate body',
    commonName: 'Medial geniculate nucleus',
    summary:
      'The medial geniculate body is a nucleus of the thalamus that serves as the relay station for hearing, passing auditory signals to the cortex.',
    location:
      'On the posterior underside of the thalamus, beneath the pulvinar and medial to the lateral geniculate body. It is connected to the inferior colliculus by the brachium of the inferior colliculus.',
    functions: [
      'Relays auditory signals from the inferior colliculus to the auditory cortex',
      'Helps process sound frequency and timing',
    ],
    howItWorks:
      'Its output travels through the auditory radiation in the internal capsule to the primary auditory cortex on the transverse temporal gyri of the superior temporal gyrus.',
    related: ['inferior-colliculi', 'thalamus-left', 'superior-temporal-gyrus-left', 'lateral-geniculate-body-left', 'ear'],
    aliases: ['MGN', 'medial geniculate nucleus', 'auditory thalamus'],
  },

  'medulla-oblongata': {
    anatomicalName: 'Medulla oblongata',
    summary:
      'The medulla oblongata is the lowest part of the brainstem, connecting the brain to the spinal cord. It contains centers that control vital functions such as breathing and heart rate.',
    location:
      'At the base of the brain, below the pons and in front of the cerebellum. It continues into the spinal cord at the foramen magnum of the occipital bone.',
    functions: [
      'Regulates breathing, heart rate and blood pressure',
      'Controls reflexes such as swallowing, coughing and vomiting',
      'Carries all ascending and descending pathways between brain and spinal cord',
      'Contains nuclei of several cranial nerves (IX to XII)',
    ],
    components: ['Pyramids', 'Decussation of the pyramids', 'Olives', 'Floor of the lower fourth ventricle'],
    facts: [
      'Most motor fibers cross to the opposite side at the decussation of the pyramids, which is why each side of the brain controls the opposite side of the body.',
    ],
    related: ['pons', 'cerebellum', 'occipital-bone', 'ventricular-system', 'Spinal cord'],
    aliases: ['medulla', 'myelencephalon', 'brainstem', 'brain stem'],
  },

  midbrain: {
    anatomicalName: 'Midbrain (mesencephalon)',
    summary:
      'The midbrain is the uppermost part of the brainstem. It contains pathways and nuclei involved in eye movement, visual and auditory reflexes, and motor control.',
    location:
      'Between the diencephalon (thalamus and hypothalamus) above and the pons below. It passes through the opening in the tentorium cerebelli and contains the cerebral aqueduct.',
    functions: [
      'Controls eye movements and pupil responses through the oculomotor and trochlear nerves',
      'Relays visual and auditory reflex signals through the colliculi',
      'Carries motor fibers from the cortex in the cerebral peduncles',
      'Contains the substantia nigra, part of the dopamine system for movement',
    ],
    components: [
      'Tectum (superior and inferior colliculi)',
      'Tegmentum (including the red nucleus)',
      'Substantia nigra',
      'Cerebral peduncles (crura cerebri)',
      'Cerebral aqueduct',
    ],
    related: ['pons', 'superior-colliculi', 'inferior-colliculi', 'peduncle-of-midbrain', 'thalamus-left'],
    aliases: ['mesencephalon', 'brainstem', 'brain stem', 'substantia nigra', 'red nucleus'],
  },

  'middle-frontal-gyrus': {
    anatomicalName: 'Middle frontal gyrus',
    summary:
      'The middle frontal gyrus is a horizontal fold on the outer surface of the frontal lobe. Much of it belongs to the prefrontal cortex, involved in planning and working memory.',
    location:
      'On the lateral surface of the frontal lobe, between the superior frontal sulcus above and the inferior frontal sulcus below, ending at the precentral sulcus behind.',
    functions: [
      'Contributes to working memory and executive control',
      'Takes part in attention networks',
      'Its posterior part helps control voluntary eye movements (frontal eye field)',
    ],
    facts: [
      'It contains much of the dorsolateral prefrontal cortex.',
    ],
    related: ['superior-frontal-gyrus-left', 'precentral-gyrus-left', 'orbital-gyri-straight-gyrus', 'frontal-bone'],
    aliases: ['MFG', 'dorsolateral prefrontal cortex', 'DLPFC', 'frontal eye field', 'frontal lobe'],
  },

  'middle-temporal-gyrus': {
    anatomicalName: 'Middle temporal gyrus',
    summary:
      'The middle temporal gyrus runs along the side of the temporal lobe. It is involved in understanding language meaning and, near its back end, in perceiving visual motion.',
    location:
      'On the lateral surface of the temporal lobe, between the superior temporal sulcus above and the inferior temporal sulcus below.',
    functions: [
      'Contributes to understanding word meaning and language',
      'Participates in recognizing familiar objects and faces',
      'Its posterior region helps process visual motion',
    ],
    facts: [
      'The visual motion area known as MT or V5 lies near the posterior end of this gyrus, close to the occipital lobe.',
    ],
    related: ['superior-temporal-gyrus-left', 'inferior-temporal-gyrus-left', 'angular-gyrus-left', 'occipital-lobe-left'],
    aliases: ['MTG', 'temporal lobe', 'area MT', 'V5'],
  },

  'occipital-lobe': {
    anatomicalName: 'Occipital lobe',
    summary:
      'The occipital lobe is the rearmost lobe of the cerebrum. It contains the primary visual cortex and is the main region for processing vision.',
    location:
      'At the back of each cerebral hemisphere, beneath the occipital bone and above the cerebellum (separated from it by the tentorium cerebelli). On the medial surface, the parieto-occipital sulcus separates it from the parietal lobe.',
    functions: [
      'Receives visual information from the lateral geniculate body',
      'Analyzes basic features such as edges, orientation, color and motion',
      'Sends visual information forward to the parietal and temporal lobes',
    ],
    components: [
      'Primary visual cortex (around the calcarine sulcus)',
      'Visual association areas',
      'Cuneus',
      'Lingual gyrus',
    ],
    howItWorks:
      'The visual cortex of each hemisphere receives input about the opposite half of the visual field. Points in the visual field are mapped in an orderly way onto its surface.',
    facts: [
      'The primary visual cortex is also called the striate cortex because of a visible white stripe (stria of Gennari) within it.',
    ],
    related: ['lateral-geniculate-body-left', 'optic-tract-left', 'fusiform-gyrus-left', 'occipital-bone', 'cerebellum'],
    aliases: ['visual cortex', 'V1', 'striate cortex', 'calcarine sulcus', 'occipital cortex'],
  },

  'optic-chiasm': {
    anatomicalName: 'Optic chiasm',
    summary:
      'The optic chiasm is the X-shaped crossing where the two optic nerves meet. Here, part of each nerve\'s fibers cross to the other side of the brain.',
    location:
      'At the base of the brain, just in front of the hypothalamus and tuber cinereum, and directly above the pituitary gland and sella turcica of the sphenoid bone.',
    functions: [
      'Routes fibers from the inner (nasal) half of each retina to the opposite side',
      'Organizes visual pathways so each side of the brain receives the opposite half of the visual field',
    ],
    howItWorks:
      'Fibers from the nasal half of each retina cross at the chiasm, while fibers from the outer (temporal) half stay on the same side. The two groups combine to form the optic tracts.',
    facts: [
      'Because the pituitary gland lies just below it, an enlarging pituitary tumor can press on the chiasm and cause loss of the outer parts of vision on both sides.',
    ],
    related: ['optic-nerve-left', 'optic-tract-left', 'pituitary-gland', 'hypothalamus', 'sphenoid-bone'],
    aliases: ['chiasm', 'optic chiasma', 'chiasma opticum'],
  },

  'optic-nerve': {
    anatomicalName: 'Optic nerve (cranial nerve II)',
    summary:
      'The optic nerve carries visual information from the retina of the eye to the brain. It is the second cranial nerve.',
    location:
      'It leaves the back of the eyeball, runs through the orbit, and enters the skull through the optic canal of the sphenoid bone to join the other optic nerve at the optic chiasm.',
    functions: [
      'Transmits visual signals from the retina to the brain',
      'Carries the input needed for the pupillary light reflex',
    ],
    components: ['Axons of retinal ganglion cells', 'Optic disc (where it leaves the eye)', 'Meningeal sheaths'],
    howItWorks:
      'Retinal ganglion cells convert the processed light signals into nerve impulses. Their axons gather at the optic disc and leave the eye as the optic nerve.',
    facts: [
      'Each optic nerve contains roughly one million nerve fibers.',
      'It develops as an outgrowth of the brain, so it is wrapped in meninges and its fibers are myelinated by oligodendrocytes like brain white matter.',
    ],
    related: ['eyeball', 'optic-chiasm', 'optic-tract-left', 'sphenoid-bone', 'lateral-geniculate-body-left'],
    aliases: ['CN II', 'cranial nerve II', 'second cranial nerve', 'nervus opticus'],
  },

  'optic-tract': {
    anatomicalName: 'Optic tract',
    summary:
      'The optic tract carries visual signals from the optic chiasm to the thalamus and midbrain. Each tract carries information about the opposite half of the visual field from both eyes.',
    location:
      'It runs backward from the optic chiasm, winding around the cerebral peduncle of the midbrain to reach the lateral geniculate body of the thalamus.',
    functions: [
      'Carries visual information to the lateral geniculate body for conscious vision',
      'Sends fibers to the midbrain for reflexes such as the pupillary light reflex and orienting eye movements',
    ],
    facts: [
      'It contains fibers from the temporal half of the retina on the same side and the nasal half of the retina on the opposite side.',
    ],
    related: ['optic-chiasm', 'lateral-geniculate-body-left', 'superior-colliculi', 'peduncle-of-midbrain', 'optic-nerve-left'],
    aliases: ['tractus opticus', 'visual pathway'],
  },

  'orbital-gyri-straight-gyrus': {
    anatomicalName: 'Orbital gyri and straight gyrus',
    summary:
      'These gyri form the underside of the frontal lobe, resting above the eye sockets. Together they make up most of the orbitofrontal cortex, which helps guide decisions based on reward and emotion.',
    location:
      'On the inferior surface of the frontal lobes, above the roofs of the orbits. The straight gyrus (gyrus rectus) lies along the midline, medial to the olfactory sulcus; the orbital gyri lie lateral to it, divided by an H-shaped orbital sulcus.',
    functions: [
      'Evaluates the value of rewards and outcomes',
      'Contributes to decision-making and adapting behavior',
      'Helps regulate emotion and social behavior',
      'Integrates smell and taste information',
    ],
    components: ['Straight gyrus (gyrus rectus)', 'Medial, lateral, anterior and posterior orbital gyri', 'Olfactory sulcus'],
    facts: [
      'The olfactory bulb and tract lie in the olfactory sulcus, between the straight gyrus and the orbital gyri.',
    ],
    related: ['middle-frontal-gyrus-left', 'superior-frontal-gyrus-left', 'frontal-bone', 'amygdala-left', 'insula-left'],
    aliases: ['orbitofrontal cortex', 'OFC', 'gyrus rectus', 'straight gyrus', 'orbital gyri'],
  },

  'parahippocampal-gyrus': {
    anatomicalName: 'Parahippocampal gyrus',
    summary:
      'The parahippocampal gyrus is a fold on the inner underside of the temporal lobe that surrounds the hippocampus. It is a major gateway for information entering and leaving the hippocampus.',
    location:
      'On the medial inferior surface of the temporal lobe, between the hippocampal sulcus medially and the collateral sulcus laterally. Its front end curls back as the uncus.',
    functions: [
      'Relays information between the cerebral cortex and the hippocampus',
      'Contributes to memory formation',
      'Supports recognition of places and scenes',
    ],
    components: ['Entorhinal cortex (anterior part)', 'Uncus', 'Posterior parahippocampal cortex'],
    facts: [
      'It is part of the limbic lobe, along with the cingulate gyrus.',
    ],
    related: ['hippocampus-left', 'amygdala-left', 'fusiform-gyrus-left', 'cingulate-gyrus-left'],
    aliases: ['entorhinal cortex', 'uncus', 'parahippocampal cortex', 'parahippocampal place area'],
  },

  'peduncle-of-midbrain': {
    anatomicalName: 'Cerebral peduncles',
    summary:
      'The cerebral peduncles are two large stalks on the front of the midbrain. They carry massive bundles of nerve fibers from the cerebral cortex down to the brainstem and spinal cord.',
    location:
      'On the ventral surface of the midbrain, emerging from beneath the cerebral hemispheres and converging on the pons. The interpeduncular fossa lies between them, and the optic tracts wind around them.',
    functions: [
      'Carry motor fibers from the cortex to the spinal cord (corticospinal tract)',
      'Carry fibers to cranial nerve nuclei (corticobulbar tract)',
      'Carry fibers to the pons for relay to the cerebellum (corticopontine fibers)',
    ],
    components: ['Crus cerebri (basis pedunculi)', 'Substantia nigra', 'Tegmentum'],
    facts: [
      'The oculomotor nerve emerges from the medial side of each peduncle.',
    ],
    related: ['midbrain', 'internal-capsule-left', 'interpeduncular-fossa', 'pons', 'optic-tract-left'],
    aliases: ['cerebral peduncle', 'crus cerebri', 'crura cerebri', 'midbrain peduncle'],
  },

  pons: {
    anatomicalName: 'Pons',
    summary:
      'The pons is the bulging middle part of the brainstem. It acts as a bridge, relaying signals between the cerebrum and cerebellum and carrying pathways to and from the spinal cord.',
    location:
      'Between the midbrain above and the medulla oblongata below, in front of the cerebellum. It forms part of the floor of the fourth ventricle and is joined to the cerebellum by the middle cerebellar peduncles.',
    functions: [
      'Relays signals from the cerebral cortex to the cerebellum',
      'Helps regulate breathing rhythm',
      'Contains nuclei for cranial nerves involved in facial sensation, chewing, eye movement and facial expression',
      'Contributes to the regulation of sleep, including REM sleep',
    ],
    components: ['Basilar part (with pontine nuclei)', 'Tegmentum', 'Middle cerebellar peduncles'],
    facts: [
      'Its name is Latin for "bridge."',
      'The trigeminal nerve (cranial nerve V) attaches to its side.',
    ],
    related: ['midbrain', 'medulla-oblongata', 'cerebellum', 'peduncle-of-midbrain', 'ventricular-system'],
    aliases: ['pons Varolii', 'brainstem', 'brain stem', 'metencephalon'],
  },

  'postcentral-gyrus': {
    anatomicalName: 'Postcentral gyrus',
    commonName: 'Primary somatosensory cortex',
    summary:
      'The postcentral gyrus is the primary somatosensory cortex, the first cortical area to receive information about touch, pressure, temperature, pain and body position.',
    location:
      'In the parietal lobe, directly behind the central sulcus and in front of the postcentral sulcus. On the medial surface it continues into the paracentral lobule.',
    functions: [
      'Receives touch, pressure and vibration signals from the opposite side of the body',
      'Receives information about body and limb position (proprioception)',
      'Receives pain and temperature information',
    ],
    howItWorks:
      'Sensory signals reach it from the ventral posterior nuclei of the thalamus. The body is mapped in order along the gyrus, with the leg near the top and medial surface and the face near the bottom, forming the sensory homunculus.',
    facts: [
      'Areas with fine sensation, such as the lips and fingertips, occupy a disproportionately large part of the map.',
      'It corresponds to Brodmann areas 3, 1 and 2.',
    ],
    related: ['precentral-gyrus-left', 'thalamus-left', 'supramarginal-gyrus-left', 'superior-parietal-lobule-precuneus-left', 'parietal-bone-left'],
    aliases: ['primary somatosensory cortex', 'S1', 'somatosensory cortex', 'sensory homunculus', 'sensory cortex'],
  },

  'posterior-commissure': {
    anatomicalName: 'Posterior commissure',
    summary:
      'The posterior commissure is a small bundle of fibers that crosses the midline at the junction of the midbrain and the third ventricle. It plays a role in the pupillary light reflex.',
    location:
      'In the midline, at the upper end of the cerebral aqueduct, just below the base of the pineal gland and in front of the superior colliculi.',
    functions: [
      'Connects pretectal nuclei of the two sides',
      'Allows both pupils to constrict when light is shone in one eye (consensual light reflex)',
      'Carries fibers related to vertical eye movements',
    ],
    facts: [
      'Together with the anterior commissure, it defines a standard reference line used in brain imaging.',
    ],
    related: ['anterior-commissure', 'superior-colliculi', 'pineal-body', 'habenula', 'midbrain'],
    aliases: ['PC', 'epithalamic commissure', 'commissura posterior'],
  },

  'precentral-gyrus': {
    anatomicalName: 'Precentral gyrus',
    commonName: 'Primary motor cortex',
    summary:
      'The precentral gyrus contains the primary motor cortex, a key area for producing voluntary movements. It sends signals that control muscles on the opposite side of the body.',
    location:
      'At the back of the frontal lobe, directly in front of the central sulcus and behind the precentral sulcus. On the medial surface it continues into the paracentral lobule.',
    functions: [
      'Generates signals for voluntary movement',
      'Controls fine, skilled movements such as those of the fingers and face',
      'Is a major source of fibers in the corticospinal and corticobulbar tracts',
    ],
    howItWorks:
      'Body parts are represented in order along the gyrus (the motor homunculus), with the leg near the top and medial surface and the face near the bottom. It works with premotor areas, the basal ganglia and the cerebellum to plan and refine movement.',
    facts: [
      'It contains giant pyramidal neurons called Betz cells.',
      'It corresponds to Brodmann area 4.',
    ],
    related: ['postcentral-gyrus-left', 'internal-capsule-left', 'peduncle-of-midbrain', 'superior-frontal-gyrus-left', 'middle-frontal-gyrus-left'],
    aliases: ['primary motor cortex', 'M1', 'motor cortex', 'motor strip', 'motor homunculus'],
  },

  putamen: {
    anatomicalName: 'Putamen',
    summary:
      'The putamen is a rounded mass of gray matter deep in the brain and part of the basal ganglia. It is especially involved in regulating movement and learning motor routines.',
    location:
      'Deep in each hemisphere, lateral to the globus pallidus and the internal capsule, and medial to the external capsule, claustrum and insula.',
    functions: [
      'Receives input from motor and sensory areas of the cortex',
      'Helps regulate and smooth voluntary movements',
      'Contributes to learning habits and motor skills',
    ],
    howItWorks:
      'Together with the caudate nucleus, it forms the striatum. It receives dopamine from the substantia nigra and sends its output to the globus pallidus.',
    facts: [
      'Its name means "shell" in Latin.',
      'Together with the globus pallidus it forms the lentiform nucleus.',
    ],
    related: ['globus-pallidus-left', 'caudate-nucleus-left', 'internal-capsule-left', 'insula-left', 'thalamus-left'],
    aliases: ['striatum', 'lentiform nucleus', 'basal ganglia', 'neostriatum'],
  },

  'septum-pellucidum': {
    anatomicalName: 'Septum pellucidum',
    summary:
      'The septum pellucidum is a thin, nearly transparent membrane in the midline that separates the front parts of the two lateral ventricles.',
    location:
      'In the midline, stretched between the underside of the corpus callosum above and the fornix below, forming the medial wall of the anterior horns and bodies of the lateral ventricles.',
    functions: [
      'Separates the left and right lateral ventricles',
      'Connects the corpus callosum to the fornix',
      'Carries some fibers linking the hippocampal system with septal nuclei',
    ],
    components: ['Two thin laminae', 'Sometimes a small cavity between them (cavum septi pellucidi)'],
    facts: [
      'Its name means "translucent wall."',
      'The space between its two layers is normal in newborns and usually closes in infancy.',
    ],
    related: ['corpus-callosum', 'fornix-of-forebrain-left', 'ventricular-system', 'caudate-nucleus-left'],
    aliases: ['septum lucidum', 'cavum septum pellucidum', 'septum'],
  },

  'stria-medullaris-of-thalamus': {
    anatomicalName: 'Stria medullaris of thalamus',
    summary:
      'The stria medullaris is a thin band of nerve fibers along the upper inner edge of the thalamus. It carries signals from the forebrain to the habenula.',
    location:
      'Along the dorsomedial border of each thalamus, at the line where the roof of the third ventricle attaches, running backward to the habenula.',
    functions: [
      'Carries input from the septal area, hypothalamus and other forebrain regions to the habenula',
      'Forms part of a pathway linking the limbic forebrain with the midbrain',
    ],
    facts: [
      'Some of its fibers cross to the opposite habenula through the habenular commissure.',
    ],
    related: ['habenula', 'thalamus-left', 'stria-terminalis-left', 'ventricular-system'],
    aliases: ['stria medullaris thalami', 'medullary stria'],
  },

  'stria-terminalis': {
    anatomicalName: 'Stria terminalis',
    summary:
      'The stria terminalis is a slender, curved bundle of nerve fibers that carries output from the amygdala. It follows the C-shaped curve of the lateral ventricle.',
    location:
      'In the floor of the lateral ventricle, in the groove between the caudate nucleus and the thalamus, together with the thalamostriate vein. It arches from the amygdala in the temporal lobe forward to the region near the anterior commissure.',
    functions: [
      'Carries signals from the amygdala to the hypothalamus and septal area',
      'Contributes to stress, emotional and hormonal responses',
    ],
    facts: [
      'A group of neurons along its course, the bed nucleus of the stria terminalis, is involved in sustained anxiety-like responses.',
    ],
    related: ['amygdala-left', 'caudate-nucleus-left', 'thalamus-left', 'hypothalamus', 'anterior-commissure'],
    aliases: ['stria terminalis', 'BNST', 'bed nucleus of the stria terminalis'],
  },

  'superior-colliculi': {
    anatomicalName: 'Superior colliculi',
    summary:
      'The superior colliculi are two rounded bumps on the back of the midbrain. They help direct the eyes and head toward things that catch our attention.',
    location:
      'On the dorsal surface (tectum) of the midbrain, above the inferior colliculi and just below the pineal gland. Each is linked to the optic tract and lateral geniculate body by the brachium of the superior colliculus.',
    functions: [
      'Coordinates rapid eye movements (saccades) toward targets',
      'Orients the head and eyes toward visual, sound and touch stimuli',
      'Integrates information from several senses',
    ],
    components: ['Superior colliculus (paired)', 'Brachium of superior colliculus'],
    howItWorks:
      'Its upper layers receive visual input directly from the retina and from the visual cortex. Its deeper layers combine sensory maps and send commands to brainstem centers that move the eyes and head.',
    related: ['inferior-colliculi', 'midbrain', 'optic-tract-left', 'lateral-geniculate-body-left', 'pineal-body'],
    aliases: ['superior colliculus', 'tectum', 'optic tectum', 'corpora quadrigemina'],
  },

  'superior-frontal-gyrus': {
    anatomicalName: 'Superior frontal gyrus',
    summary:
      'The superior frontal gyrus is the uppermost fold of the frontal lobe. It takes part in higher cognitive functions and, toward the back, in planning movements.',
    location:
      'Along the top of the frontal lobe, above the superior frontal sulcus, extending over the edge onto the medial surface of the hemisphere above the cingulate gyrus.',
    functions: [
      'Contributes to working memory and higher cognitive control',
      'Its posterior medial part (supplementary motor area) helps plan and sequence movements',
      'Participates in self-awareness and attention networks',
    ],
    related: ['middle-frontal-gyrus-left', 'precentral-gyrus-left', 'cingulate-gyrus-left', 'frontal-bone'],
    aliases: ['SFG', 'supplementary motor area', 'SMA', 'frontal lobe', 'superior frontal'],
  },

  'superior-parietal-lobule-precuneus': {
    anatomicalName: 'Superior parietal lobule and precuneus',
    summary:
      'The superior parietal lobule and its medial continuation, the precuneus, are regions of the parietal lobe that combine sensory information to build a sense of space and of where the body is.',
    location:
      'The superior parietal lobule lies on the upper lateral surface of the parietal lobe, above the intraparietal sulcus and behind the postcentral gyrus. The precuneus is on the medial surface, between the paracentral lobule and the parieto-occipital sulcus.',
    functions: [
      'Integrates visual and body-position information for spatial awareness',
      'Guides reaching and grasping movements',
      'Precuneus: involved in mental imagery, memory retrieval and self-related thought',
    ],
    components: ['Superior parietal lobule', 'Precuneus'],
    facts: [
      'The precuneus is a key part of the default mode network, which is active during rest and inward-focused thought.',
    ],
    related: ['postcentral-gyrus-left', 'supramarginal-gyrus-left', 'angular-gyrus-left', 'occipital-lobe-left', 'parietal-bone-left'],
    aliases: ['superior parietal lobule', 'precuneus', 'parietal lobe', 'SPL'],
  },

  'superior-temporal-gyrus': {
    anatomicalName: 'Superior temporal gyrus',
    summary:
      'The superior temporal gyrus is the uppermost fold of the temporal lobe. It contains the primary auditory cortex and areas important for understanding speech.',
    location:
      'On the lateral surface of the temporal lobe, just below the lateral sulcus and above the superior temporal sulcus. Its upper surface, hidden within the lateral sulcus, carries the transverse temporal gyri.',
    functions: [
      'Contains the primary auditory cortex for hearing',
      'Processes speech sounds and other complex sounds',
      'In the language-dominant hemisphere (usually the left), its posterior part (Wernicke\'s area) supports language comprehension',
    ],
    components: [
      'Transverse temporal gyri (Heschl\'s gyri)',
      'Planum temporale',
      'Anterior and posterior parts',
    ],
    howItWorks:
      'Auditory signals relayed by the medial geniculate body arrive at the transverse temporal gyri, then spread to surrounding auditory association areas for more complex analysis.',
    related: ['medial-geniculate-body-left', 'middle-temporal-gyrus-left', 'supramarginal-gyrus-left', 'insula-left', 'ear'],
    aliases: ['STG', 'auditory cortex', 'Wernicke\'s area', 'Heschl\'s gyrus', 'temporal lobe'],
  },

  'supramarginal-gyrus': {
    anatomicalName: 'Supramarginal gyrus',
    summary:
      'The supramarginal gyrus is a curved fold in the parietal lobe that wraps around the end of the lateral sulcus. It is involved in language, body awareness and planning skilled movements.',
    location:
      'In the inferior parietal lobule, arching around the upturned posterior end of the lateral sulcus, behind the postcentral gyrus and in front of the angular gyrus.',
    functions: [
      'Contributes to processing speech sounds (phonological processing)',
      'Integrates touch and body-position information',
      'Takes part in planning skilled and learned movements',
    ],
    facts: [
      'It corresponds largely to Brodmann area 40.',
    ],
    related: ['angular-gyrus-left', 'postcentral-gyrus-left', 'superior-temporal-gyrus-left', 'superior-parietal-lobule-precuneus-left'],
    aliases: ['SMG', 'Brodmann area 40', 'inferior parietal lobule'],
  },

  thalamus: {
    anatomicalName: 'Thalamus',
    summary:
      'The thalamus is a large, egg-shaped mass of gray matter deep in the brain. It is the main relay and processing hub for information traveling to the cerebral cortex.',
    location:
      'In the diencephalon at the center of the brain, forming the side walls of the third ventricle. It lies above the hypothalamus and medial to the internal capsule. The two thalami are often joined by a small bridge, the interthalamic adhesion.',
    functions: [
      'Relays sensory information (except smell) to the cortex',
      'Relays motor signals from the cerebellum and basal ganglia to the cortex',
      'Contributes to alertness, attention and consciousness',
      'Takes part in memory and emotion circuits',
    ],
    components: [
      'Anterior, medial and lateral nuclear groups',
      'Ventral posterior nuclei (body sensation)',
      'Pulvinar',
      'Lateral and medial geniculate bodies',
      'Internal medullary lamina',
    ],
    howItWorks:
      'Each thalamic nucleus has two-way connections with specific cortical areas. Rather than simply passing signals on, the thalamus filters and modulates them, influencing what reaches the cortex.',
    related: ['hypothalamus', 'internal-capsule-left', 'lateral-geniculate-body-left', 'medial-geniculate-body-left', 'caudate-nucleus-left'],
    aliases: ['thalami', 'diencephalon', 'dorsal thalamus', 'pulvinar'],
  },

  'tuber-cinereum': {
    anatomicalName: 'Tuber cinereum',
    summary:
      'The tuber cinereum is a small swelling of gray matter on the underside of the hypothalamus. The stalk of the pituitary gland arises from it.',
    location:
      'On the inferior surface of the hypothalamus, between the optic chiasm in front and the mammillary bodies behind.',
    functions: [
      'Gives rise to the infundibulum (pituitary stalk)',
      'Contains the median eminence, where hypothalamic hormones enter blood vessels leading to the anterior pituitary',
      'Contains hypothalamic nuclei involved in hormone control and appetite',
    ],
    components: ['Median eminence', 'Infundibulum (pituitary stalk)'],
    facts: [
      'Its name is Latin for "gray swelling."',
    ],
    related: ['hypothalamus', 'pituitary-gland', 'mammillary-body', 'optic-chiasm'],
    aliases: ['median eminence', 'infundibulum', 'pituitary stalk'],
  },

  'ventricular-system': {
    anatomicalName: 'Ventricular system',
    commonName: 'Brain ventricles',
    summary:
      'The ventricular system is a set of connected fluid-filled cavities inside the brain. Cerebrospinal fluid (CSF) is produced here and flows through it to surround the brain and spinal cord.',
    location:
      'Throughout the brain: a lateral ventricle in each cerebral hemisphere, the third ventricle between the two thalami, and the fourth ventricle between the brainstem and cerebellum. It continues into the central canal of the spinal cord.',
    functions: [
      'Produces and circulates cerebrospinal fluid',
      'Cushions the brain and helps it float, reducing its effective weight',
      'Helps maintain a stable chemical environment and remove waste',
    ],
    components: [
      'Lateral ventricles',
      'Interventricular foramina',
      'Third ventricle',
      'Cerebral aqueduct',
      'Fourth ventricle',
      'Central canal',
      'Choroid plexus',
    ],
    howItWorks:
      'CSF made mainly by the choroid plexus flows from the lateral ventricles through the interventricular foramina into the third ventricle, then down the cerebral aqueduct to the fourth ventricle. It exits through openings in the fourth ventricle into the subarachnoid space and is reabsorbed into the venous sinuses.',
    facts: [
      'About 150 mL of CSF surrounds and fills the brain and spinal cord at any time.',
    ],
    related: ['choroid-plexus-of-cerebral-hemisphere-left', 'septum-pellucidum', 'thalamus-left', 'midbrain', 'cerebellum'],
    aliases: ['ventricles', 'lateral ventricle', 'third ventricle', 'fourth ventricle', 'cerebral aqueduct', 'foramen of Monro', 'CSF', 'cerebrospinal fluid'],
  },

  'white-matter-structure-of-cerebral-hemisphere': {
    anatomicalName: 'White matter of cerebral hemisphere',
    summary:
      'The white matter of the cerebrum is made of bundles of nerve fibers (axons) wrapped in fatty myelin. It connects areas of the cortex with each other and with deeper brain structures.',
    location:
      'Beneath the gray matter of the cerebral cortex, filling much of the interior of each hemisphere around the basal ganglia, thalamus and lateral ventricles.',
    functions: [
      'Connects regions within the same hemisphere (association fibers)',
      'Connects the two hemispheres (commissural fibers such as the corpus callosum)',
      'Connects the cortex with the thalamus, brainstem and spinal cord (projection fibers)',
    ],
    components: ['Association fibers', 'Commissural fibers', 'Projection fibers (corona radiata, internal capsule)', 'Centrum semiovale'],
    howItWorks:
      'Myelin insulates axons and allows nerve impulses to travel much faster, which lets distant brain regions work together in a coordinated way.',
    facts: [
      'Its pale color comes from the lipid-rich myelin that surrounds the axons.',
    ],
    related: ['corpus-callosum', 'internal-capsule-left', 'anterior-commissure', 'thalamus-left'],
    aliases: ['cerebral white matter', 'white matter', 'centrum semiovale', 'corona radiata', 'myelin'],
  },
};
