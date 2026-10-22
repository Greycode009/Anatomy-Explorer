import type { ContentEntry } from '../../types';

export const SKELETAL_CONTENT: Record<string, ContentEntry> = {
  atlas: {
    anatomicalName: 'Atlas (first cervical vertebra, C1)',
    summary:
      'The atlas is the topmost vertebra of the spine and holds up the skull. It is a ring of bone with no vertebral body, which makes it unlike any other vertebra.',
    location:
      'At the top of the neck, directly below the skull. Its upper facets articulate with the occipital condyles of the occipital bone, and its lower facets articulate with the axis (C2).',
    functions: [
      'Supports the weight of the head',
      'Forms the atlanto-occipital joint, which allows the nodding ("yes") movement',
      'Forms the atlanto-axial joints with the axis, allowing the head to rotate',
    ],
    components: [
      'Anterior arch with anterior tubercle',
      'Posterior arch with posterior tubercle',
      'Lateral masses with superior and inferior articular facets',
      'Transverse processes with transverse foramina',
    ],
    howItWorks:
      'Instead of a vertebral body, the atlas has two thick lateral masses that carry the skull. The dens of the axis projects up into the front of its ring and is held in place by the transverse ligament, forming a pivot around which the atlas and skull turn.',
    facts: [
      'It is named after Atlas, the Titan of Greek mythology who held up the heavens.',
      'It has no spinous process; a small posterior tubercle is found in its place.',
    ],
    related: ['axis', 'occipital-bone', 'third-cervical-vertebra', 'intervertebral-discs'],
    aliases: ['C1', 'first cervical vertebra', 'C1 vertebra'],
  },

  axis: {
    anatomicalName: 'Axis (second cervical vertebra, C2)',
    summary:
      'The axis is the second vertebra of the neck. Its tooth-like projection, the dens, acts as a pivot that lets the head and atlas turn from side to side.',
    location:
      'In the upper neck, just below the atlas (C1) and above the third cervical vertebra (C3).',
    functions: [
      'Provides the pivot for rotating the head (the "no" movement)',
      'Transfers the weight of the head and atlas to the rest of the spine',
      'Protects the spinal cord',
      'Provides attachment for neck muscles and ligaments',
    ],
    components: [
      'Dens (odontoid process)',
      'Vertebral body',
      'Superior and inferior articular facets',
      'Large, bifid spinous process',
      'Transverse processes with transverse foramina',
    ],
    howItWorks:
      'The dens rises from the body of the axis into the ring of the atlas. The atlas, carrying the skull, rotates around the dens at the atlanto-axial joints.',
    facts: [
      'Roughly half of the rotation of the neck occurs at the joints between the atlas and the axis.',
      'Developmentally, the dens is thought to represent the body of the atlas that has fused to the axis.',
    ],
    related: ['atlas', 'third-cervical-vertebra', 'occipital-bone', 'intervertebral-discs'],
    aliases: ['C2', 'second cervical vertebra', 'C2 vertebra', 'epistropheus'],
  },

  'body-of-sternum': {
    anatomicalName: 'Body of sternum',
    summary:
      'The body is the long, flat middle part of the sternum (breastbone). It forms most of the front of the chest wall between the manubrium and the xiphoid process.',
    location:
      'In the midline of the front of the chest. It joins the manubrium above at the sternal angle and the xiphoid process below, and its side edges articulate with the costal cartilages of ribs 2 to 7.',
    functions: [
      'Forms the central front part of the rib cage',
      'Anchors the costal cartilages of the upper ribs',
      'Helps protect the heart and great vessels',
      'Provides attachment for chest muscles such as pectoralis major',
    ],
    components: [
      'Costal notches for ribs 2 to 7',
      'Sternal angle (joint with the manubrium)',
      'Xiphisternal joint (joint with the xiphoid process)',
    ],
    facts: [
      'It forms from several segments (sternebrae) that fuse during childhood and adolescence.',
      'Like the rest of the sternum, it contains red bone marrow in adults.',
    ],
    related: ['manubrium', 'xiphoid-process', 'costal-cartilages-left', 'heart', 'pectoralis-major-left'],
    aliases: ['sternum', 'breastbone', 'gladiolus', 'mesosternum'],
  },

  'tarsal-bones': {
    anatomicalName: 'Tarsal bones',
    commonName: 'Ankle bones',
    summary:
      'The seven tarsal bones form the back half of the foot, including the heel and ankle. They are strong, block-like bones that carry body weight and help form the arches of the foot.',
    location:
      'Between the bones of the leg (tibia and fibula) and the metatarsals. The talus articulates with the tibia and fibula at the ankle joint; the cuboid and cuneiforms articulate with the metatarsals in front.',
    functions: [
      'Transmit body weight from the leg to the ground',
      'Form the heel and the back part of the foot arches',
      'Allow inversion and eversion of the foot',
      'Provide attachment for tendons and ligaments, such as the calcaneal (Achilles) tendon',
    ],
    components: [
      'Talus',
      'Calcaneus (heel bone)',
      'Navicular',
      'Cuboid',
      'Medial, intermediate and lateral cuneiforms',
    ],
    howItWorks:
      'The talus sits on top, receiving weight from the tibia and passing it backward to the calcaneus and forward through the navicular and cuneiforms. The subtalar joint between the talus and calcaneus lets the sole turn inward and outward.',
    facts: [
      'The calcaneus is the largest bone of the foot.',
      'No muscles attach directly to the talus.',
    ],
    related: ['tibia-left', 'fibula-left', 'first-metatarsal-bone-left', 'calcaneal-tendon-left', 'long-plantar-ligament-left'],
    aliases: ['tarsus', 'ankle bones', 'talus', 'calcaneus', 'heel bone', 'navicular', 'cuboid', 'cuneiform'],
  },

  'carpal-bones': {
    anatomicalName: 'Carpal bones',
    commonName: 'Wrist bones',
    summary:
      'The eight carpal bones are small, irregular bones arranged in two rows that make up the wrist. Together they give the wrist its flexibility and connect the forearm to the hand.',
    location:
      'Between the forearm and the metacarpals. The proximal row articulates with the radius (and with a disc of cartilage below the ulna), and the distal row articulates with the five metacarpals.',
    functions: [
      'Allow the wrist to bend, extend and tilt side to side',
      'Transmit forces between the hand and forearm',
      'Form the floor and walls of the carpal tunnel',
      'Provide attachment for ligaments and hand muscles',
    ],
    components: [
      'Proximal row: scaphoid, lunate, triquetrum, pisiform',
      'Distal row: trapezium, trapezoid, capitate, hamate',
    ],
    howItWorks:
      'Small gliding movements between the many carpal bones add up to a large range of wrist motion. Their front surface forms an arch that the flexor retinaculum spans, creating the carpal tunnel through which flexor tendons and the median nerve pass.',
    facts: [
      'The scaphoid is the most commonly fractured carpal bone.',
      'The pisiform is a sesamoid bone that lies within the tendon of flexor carpi ulnaris.',
      'The capitate is the largest carpal bone.',
    ],
    related: ['radius-left', 'ulna-left', 'first-metacarpal-bone-left', 'flexor-retinaculum-of-wrist-left'],
    aliases: ['carpus', 'wrist', 'scaphoid', 'lunate', 'triquetrum', 'pisiform', 'trapezium', 'trapezoid', 'capitate', 'hamate'],
  },

  clavicle: {
    anatomicalName: 'Clavicle',
    commonName: 'Collarbone',
    summary:
      'The clavicle is a slender, S-shaped bone that runs horizontally across the top of the chest. It acts as a strut holding the shoulder out to the side of the body.',
    location:
      'At the base of the neck, just under the skin. It articulates medially with the manubrium of the sternum (sternoclavicular joint) and laterally with the acromion of the scapula (acromioclavicular joint).',
    functions: [
      'Holds the shoulder away from the trunk so the arm can move freely',
      'Forms the only bony connection between the upper limb and the axial skeleton',
      'Transmits forces from the upper limb to the trunk',
      'Protects nerves and vessels passing to the arm',
    ],
    components: [
      'Sternal (medial) end',
      'Acromial (lateral) end',
      'Shaft',
      'Conoid tubercle and trapezoid line (ligament attachments)',
    ],
    facts: [
      'It is the first bone in the body to begin ossifying, during the fifth to sixth week of embryonic development.',
      'It is one of the most commonly fractured bones.',
    ],
    related: ['scapula-left', 'manubrium', 'sternocleidomastoid-left', 'deltoid-left', 'trapezius-left'],
    aliases: ['collarbone', 'collar bone', 'clavicula'],
  },

  'costal-cartilages': {
    anatomicalName: 'Costal cartilages',
    commonName: 'Rib cartilages',
    summary:
      'Costal cartilages are bars of hyaline cartilage that extend the ribs toward the front of the chest. Their flexibility lets the rib cage expand and recoil during breathing.',
    location:
      'At the front ends of the ribs. The cartilages of ribs 1 to 7 attach directly to the sternum; those of ribs 8 to 10 join the cartilage above, forming the costal margin; ribs 11 and 12 have small cartilage tips that end in the abdominal wall.',
    functions: [
      'Connect the ribs to the sternum or to each other',
      'Give the rib cage elasticity for breathing movements',
      'Form the costal margin (lower edge of the rib cage)',
    ],
    howItWorks:
      'When the ribs are raised during inhalation, the cartilages twist and bend slightly, storing elastic energy that helps the chest wall return during exhalation.',
    facts: [
      'They often become partly calcified with age, which reduces chest wall flexibility.',
    ],
    related: ['sixth-rib-left', 'body-of-sternum', 'manubrium', 'xiphoid-process', 'diaphragm'],
    aliases: ['costal cartilage', 'rib cartilage', 'costal margin'],
  },

  rib: {
    anatomicalName: 'Rib',
    summary:
      'The ribs are 12 pairs of curved, flat bones that form the rib cage. They protect the chest organs and move during breathing.',
    location:
      'Around the chest. Each rib articulates at the back with the thoracic vertebrae; at the front most connect to the sternum through costal cartilages. Ribs 1 to 7 are "true" ribs, 8 to 12 are "false" ribs, and 11 and 12 are "floating" ribs.',
    functions: [
      'Protect the heart, lungs and upper abdominal organs',
      'Move up and out during inhalation to enlarge the chest',
      'Provide attachment for breathing, back and abdominal muscles',
      'Contain red bone marrow that produces blood cells',
    ],
    components: [
      'Head (articulates with vertebral bodies)',
      'Neck',
      'Tubercle (articulates with a transverse process)',
      'Shaft (body)',
      'Costal groove (protects intercostal vessels and nerve)',
    ],
    howItWorks:
      'Intercostal muscles and the diaphragm work together during breathing. As the ribs lift, they swing upward and outward like bucket handles, increasing the volume of the chest so air flows into the lungs.',
    facts: [
      'The first rib is the shortest, broadest and most curved.',
      'Men and women have the same number of ribs: 12 pairs.',
    ],
    related: ['sixth-thoracic-vertebra', 'costal-cartilages-left', 'body-of-sternum', 'external-intercostal-muscle', 'lung-left'],
    aliases: ['ribs', 'rib cage', 'costa', 'true rib', 'false rib', 'floating rib'],
  },

  'thoracic-vertebra': {
    anatomicalName: 'Thoracic vertebra',
    summary:
      'The 12 thoracic vertebrae (T1 to T12) form the middle section of the spine. They are unique in connecting to the ribs.',
    location:
      'In the upper and mid back, between the cervical vertebrae above and the lumbar vertebrae below. Each articulates with neighboring vertebrae through intervertebral discs and facet joints, and with the heads and tubercles of the ribs.',
    functions: [
      'Anchor the ribs to form the back of the rib cage',
      'Support the trunk and transmit weight downward',
      'Protect the spinal cord',
      'Allow rotation of the trunk while limiting forward bending',
    ],
    components: [
      'Heart-shaped vertebral body',
      'Costal facets for the rib heads',
      'Transverse costal facets for the rib tubercles (most levels)',
      'Long, downward-sloping spinous process',
      'Vertebral arch and round vertebral foramen',
    ],
    howItWorks:
      'The facet joints of thoracic vertebrae are angled to favor rotation, while the attached rib cage and overlapping spinous processes restrict bending, making this the most stable region of the spine.',
    facts: [
      'The thoracic spine curves backward (kyphosis), the curve present at birth.',
    ],
    related: ['sixth-rib-left', 'seventh-cervical-vertebra', 'first-lumbar-vertebra', 'intervertebral-discs'],
    aliases: ['thoracic spine', 'dorsal vertebra', 'T1', 'T12', 'thoracic vertebrae'],
  },

  ethmoid: {
    anatomicalName: 'Ethmoid bone',
    summary:
      'The ethmoid is a light, sponge-like bone in the middle of the skull between the eyes. It forms part of the nasal cavity, the eye sockets and the floor of the skull.',
    location:
      'Behind the nose and between the orbits, below the frontal lobes of the brain. It articulates with the frontal and sphenoid bones, the vomer, nasal, lacrimal, palatine bones, maxillae and inferior nasal conchae.',
    functions: [
      'Forms the roof and upper side walls of the nasal cavity',
      'Forms part of the nasal septum and the inner walls of the orbits',
      'Lets the fibers of the olfactory nerve pass from the nose to the brain',
      'Contains air cells that lighten the skull',
    ],
    components: [
      'Cribriform plate',
      'Crista galli',
      'Perpendicular plate',
      'Ethmoidal labyrinths with ethmoidal air cells',
      'Superior and middle nasal conchae',
      'Orbital plates',
    ],
    facts: [
      'Its name comes from the Greek for "sieve," referring to the many small holes in the cribriform plate.',
    ],
    related: ['sphenoid-bone', 'frontal-bone', 'vomer', 'inferior-nasal-concha-left', 'lacrimal-bone-left'],
    aliases: ['ethmoid bone', 'os ethmoidale', 'cribriform plate'],
  },

  femur: {
    anatomicalName: 'Femur',
    commonName: 'Thigh bone',
    summary:
      'The femur is the bone of the thigh and the longest and strongest bone in the body. It carries body weight from the hip to the knee.',
    location:
      'In the thigh. Its head fits into the acetabulum of the hip bone (hip joint), and its lower end articulates with the tibia and patella at the knee.',
    functions: [
      'Supports body weight during standing, walking and running',
      'Acts as a lever for powerful hip and thigh muscles',
      'Forms part of both the hip and knee joints',
      'Contains marrow that produces blood cells',
    ],
    components: [
      'Head',
      'Neck',
      'Greater and lesser trochanters',
      'Shaft with linea aspera',
      'Medial and lateral condyles',
      'Medial and lateral epicondyles',
      'Patellar surface',
    ],
    howItWorks:
      'The angled neck sets the shaft away from the pelvis, giving muscles leverage, while the shaft slants inward so the knees sit under the body. The rounded condyles roll and glide on the tibia during knee bending.',
    facts: [
      'Its length is roughly one quarter of a person\'s height.',
      'The femoral neck is a common site of fracture in older adults.',
    ],
    related: ['hip-bone-left', 'tibia-left', 'patella-left', 'rectus-femoris-left', 'gluteus-maximus-left'],
    aliases: ['thigh bone', 'thighbone', 'femoral bone'],
  },

  fibula: {
    anatomicalName: 'Fibula',
    commonName: 'Calf bone',
    summary:
      'The fibula is the thin outer bone of the lower leg. It carries little body weight but stabilizes the ankle and anchors many muscles.',
    location:
      'On the lateral side of the leg, parallel to the tibia. Its head articulates with the tibia just below the knee, and its lower end (lateral malleolus) forms the outer side of the ankle joint with the talus.',
    functions: [
      'Stabilizes the ankle joint',
      'Provides attachment for leg muscles',
      'Anchors the interosseous membrane of the leg',
    ],
    components: [
      'Head',
      'Neck',
      'Shaft',
      'Lateral malleolus',
    ],
    facts: [
      'The bony bump on the outside of the ankle is the lateral malleolus of the fibula.',
      'The fibula does not take part in the knee joint itself.',
    ],
    related: ['tibia-left', 'interosseous-membrane-of-leg-left', 'talus-left', 'femur-left'],
    aliases: ['calf bone', 'lateral malleolus', 'perone'],
  },

  'cervical-vertebra': {
    anatomicalName: 'Cervical vertebra',
    summary:
      'The seven cervical vertebrae (C1 to C7) form the neck. They are the smallest vertebrae and allow the head a wide range of movement.',
    location:
      'In the neck, between the skull and the first thoracic vertebra. Typical cervical vertebrae (C3 to C6) are joined to their neighbors by intervertebral discs and facet joints; C7 sits at the base of the neck.',
    functions: [
      'Support the head',
      'Allow flexion, extension, side bending and rotation of the neck',
      'Protect the spinal cord',
      'Protect the vertebral arteries as they travel to the brain',
    ],
    components: [
      'Small, wide vertebral body',
      'Transverse foramina in the transverse processes',
      'Large triangular vertebral foramen',
      'Short, often bifid spinous process (C3 to C6)',
      'Uncinate processes on the body',
    ],
    facts: [
      'Holes in their transverse processes (transverse foramina) are a feature found only in cervical vertebrae.',
      'C7 is called the vertebra prominens because its long spinous process is easily felt at the base of the neck.',
    ],
    related: ['atlas', 'axis', 'first-thoracic-vertebra', 'intervertebral-discs'],
    aliases: ['cervical spine', 'neck vertebra', 'C3', 'C4', 'C5', 'C6', 'C7', 'vertebra prominens', 'cervical vertebrae'],
  },

  'lumbar-vertebra': {
    anatomicalName: 'Lumbar vertebra',
    summary:
      'The five lumbar vertebrae (L1 to L5) form the lower back. They are the largest vertebrae because they carry the most body weight.',
    location:
      'In the lower back, between the twelfth thoracic vertebra and the sacrum. L5 articulates with the sacrum at the lumbosacral joint.',
    functions: [
      'Bear the weight of the upper body',
      'Allow forward and backward bending of the trunk',
      'Protect the lower spinal cord and the nerve roots below it',
      'Provide attachment for large back and abdominal muscles',
    ],
    components: [
      'Large, kidney-shaped vertebral body',
      'Short, thick, hatchet-shaped spinous process',
      'Long, slender transverse processes',
      'Mammillary and accessory processes',
      'Triangular vertebral foramen',
    ],
    facts: [
      'In adults the spinal cord usually ends around the level of L1 to L2; below that the canal contains nerve roots (the cauda equina).',
      'The lumbar spine curves forward (lordosis), a curve that develops when a child begins to walk.',
    ],
    related: ['twelfth-thoracic-vertebra', 'sacrum', 'intervertebral-discs', 'hip-bone-left'],
    aliases: ['lumbar spine', 'lower back vertebra', 'L1', 'L2', 'L3', 'L4', 'L5', 'lumbar vertebrae'],
  },

  metacarpals: {
    anatomicalName: 'Metacarpal bones',
    summary:
      'The five metacarpal bones form the palm of the hand. Their rounded heads form the knuckles when the hand makes a fist.',
    location:
      'In the palm, between the carpal bones of the wrist and the proximal phalanges of the fingers and thumb. They are numbered 1 (thumb) to 5 (little finger).',
    functions: [
      'Form the framework of the palm',
      'Allow the hand to cup and grip objects',
      'Provide attachment for hand muscles',
      'Form the knuckle (metacarpophalangeal) joints with the phalanges',
    ],
    components: ['Base', 'Shaft', 'Head'],
    howItWorks:
      'The first metacarpal meets the trapezium at a saddle joint, which gives the thumb its wide range of movement, including opposition. The other metacarpals move less, the fourth and fifth more than the second and third.',
    facts: [
      'The first metacarpal (thumb) is the shortest and thickest.',
    ],
    related: ['scaphoid-left', 'phalanges-hand-left', 'radius-left'],
    aliases: ['metacarpal', 'metacarpus', 'palm bones', 'knuckles'],
  },

  metatarsals: {
    anatomicalName: 'Metatarsal bones',
    summary:
      'The five metatarsal bones form the middle of the foot. Their heads make up the ball of the foot, which bears weight when pushing off during walking.',
    location:
      'In the forefoot, between the tarsal bones (cuneiforms and cuboid) and the proximal phalanges of the toes. They are numbered 1 (big toe) to 5 (little toe).',
    functions: [
      'Help form the arches of the foot',
      'Bear weight and transfer force during push-off',
      'Provide attachment for leg and foot muscles',
    ],
    components: ['Base', 'Shaft', 'Head', 'Tuberosity of the fifth metatarsal'],
    facts: [
      'The first metatarsal is the shortest and thickest; it bears the most weight.',
      'Two small sesamoid bones normally lie beneath the head of the first metatarsal.',
    ],
    related: ['talus-left', 'phalanges-foot-left', 'sesamoid-bone-of-foot-left', 'long-plantar-ligament-left'],
    aliases: ['metatarsal', 'metatarsus', 'ball of the foot'],
  },

  'frontal-bone': {
    anatomicalName: 'Frontal bone',
    commonName: 'Forehead bone',
    summary:
      'The frontal bone forms the forehead and the upper part of the eye sockets. It protects the front of the brain.',
    location:
      'At the front of the skull. It articulates with the parietal bones at the coronal suture and with the sphenoid, ethmoid, nasal, lacrimal, zygomatic bones and maxillae.',
    functions: [
      'Protects the frontal lobes of the brain',
      'Forms the forehead and brow ridges',
      'Forms the roofs of the orbits',
      'Contains the frontal sinuses',
    ],
    components: [
      'Squamous part (forehead)',
      'Orbital parts',
      'Supraorbital margins and supraorbital notches or foramina',
      'Frontal sinuses',
      'Glabella',
    ],
    facts: [
      'At birth it is in two halves joined by the metopic suture, which usually fuses in early childhood.',
    ],
    related: ['parietal-bone-left', 'sphenoid-bone', 'ethmoid', 'nasal-bone-left', 'zygomatic-bone-left'],
    aliases: ['forehead', 'frontal', 'os frontale', 'brow ridge'],
  },

  'hip-bone': {
    anatomicalName: 'Hip bone (os coxae)',
    commonName: 'Pelvic bone',
    summary:
      'Each hip bone is a large, flat, irregular bone formed by three bones fused together. Together with the sacrum and coccyx, the two hip bones form the pelvis.',
    location:
      'At the base of the trunk. It articulates with the sacrum at the sacroiliac joint, with the other hip bone at the pubic symphysis, and with the head of the femur at the acetabulum (hip joint).',
    functions: [
      'Transfers body weight from the spine to the legs',
      'Forms the hip socket (acetabulum)',
      'Protects pelvic organs',
      'Provides attachment for powerful hip, thigh and abdominal muscles',
    ],
    components: [
      'Ilium (with iliac crest and anterior superior iliac spine)',
      'Ischium (with ischial tuberosity)',
      'Pubis',
      'Acetabulum',
      'Obturator foramen',
    ],
    howItWorks:
      'The ilium, ischium and pubis are separate in childhood and fuse at the acetabulum, usually by the late teens. When sitting, weight rests on the ischial tuberosities.',
    facts: [
      'The pelvis of females is typically wider with a rounder inlet, an adaptation for childbirth.',
    ],
    related: ['sacrum', 'femur-left', 'fifth-lumbar-vertebra', 'gluteus-maximus-left', 'inguinal-ligament-left'],
    aliases: ['os coxae', 'innominate bone', 'coxal bone', 'pelvis', 'ilium', 'ischium', 'pubis', 'hip'],
  },

  humerus: {
    anatomicalName: 'Humerus',
    commonName: 'Upper arm bone',
    summary:
      'The humerus is the long bone of the upper arm. It connects the shoulder to the elbow and anchors many arm and shoulder muscles.',
    location:
      'In the upper arm. Its head articulates with the glenoid cavity of the scapula at the shoulder joint, and its lower end articulates with the radius and ulna at the elbow.',
    functions: [
      'Forms part of the shoulder and elbow joints',
      'Acts as a lever for arm movement',
      'Provides attachment for shoulder and arm muscles',
      'Contains marrow',
    ],
    components: [
      'Head',
      'Anatomical and surgical necks',
      'Greater and lesser tubercles',
      'Intertubercular sulcus',
      'Deltoid tuberosity',
      'Medial and lateral epicondyles',
      'Capitulum and trochlea',
    ],
    facts: [
      'The "funny bone" sensation comes from hitting the ulnar nerve where it passes behind the medial epicondyle.',
      'The radial nerve runs in a groove along the back of its shaft.',
    ],
    related: ['scapula-left', 'radius-left', 'ulna-left', 'deltoid-left', 'biceps-brachii-left'],
    aliases: ['upper arm bone', 'arm bone', 'funny bone'],
  },

  'hyoid-bone': {
    anatomicalName: 'Hyoid bone',
    summary:
      'The hyoid is a small U-shaped bone in the front of the neck. It is unusual because it does not form a joint with any other bone.',
    location:
      'In the front of the neck, above the larynx and below the mandible, at about the level of the third cervical vertebra. It is held in place by muscles and ligaments attached to the skull, jaw, larynx and sternum.',
    functions: [
      'Anchors the tongue',
      'Supports the larynx',
      'Provides attachment for muscles used in swallowing and speech',
    ],
    components: ['Body', 'Greater horns (cornua)', 'Lesser horns (cornua)'],
    howItWorks:
      'Muscles above and below the hyoid raise, lower and steady it, which moves the tongue and larynx during swallowing and speaking.',
    facts: [
      'Its name comes from the Greek letter upsilon, because of its U shape.',
    ],
    related: ['mandible', 'thyroid-cartilage', 'temporal-bone-left', 'third-cervical-vertebra'],
    aliases: ['hyoid', 'lingual bone', 'os hyoideum'],
  },

  'inferior-nasal-concha': {
    anatomicalName: 'Inferior nasal concha',
    commonName: 'Inferior turbinate',
    summary:
      'The inferior nasal concha is a thin, curled bone on the side wall of the nasal cavity. Covered by moist lining, it helps condition the air you breathe.',
    location:
      'On the lateral wall of each nasal cavity, below the middle concha of the ethmoid. It articulates with the maxilla, and also with the ethmoid, lacrimal and palatine bones.',
    functions: [
      'Increases the surface area of the nasal cavity',
      'Helps warm, humidify and filter inhaled air',
      'Directs airflow through the nasal passages',
    ],
    components: ['Lacrimal process', 'Maxillary process', 'Ethmoidal process'],
    facts: [
      'It is the largest of the conchae and, unlike the superior and middle conchae, is a separate bone.',
      'The nasolacrimal duct, which drains tears, opens into the space beneath it (the inferior meatus).',
    ],
    related: ['maxilla-left', 'ethmoid', 'lacrimal-bone-left', 'palatine-bone-left'],
    aliases: ['inferior turbinate', 'turbinate', 'nasal concha', 'concha nasalis inferior'],
  },

  'interosseous-membrane-of-forearm': {
    anatomicalName: 'Interosseous membrane of forearm',
    summary:
      'This is a strong sheet of fibrous tissue stretched between the radius and ulna. It holds the two forearm bones together while still allowing them to rotate.',
    location:
      'In the forearm, spanning the gap between the interosseous borders of the radius and ulna, and separating the front and back compartments of the forearm.',
    functions: [
      'Binds the radius and ulna together',
      'Transfers force from the radius to the ulna',
      'Provides a surface for forearm muscles to attach',
      'Separates the anterior and posterior forearm compartments',
    ],
    howItWorks:
      'Most of its fibers run obliquely downward from the radius to the ulna. Forces entering the radius from the wrist are passed through these fibers to the ulna and on to the elbow.',
    related: ['radius-left', 'ulna-left', 'interosseous-membrane-of-leg-left', 'humerus-left'],
    aliases: ['forearm interosseous membrane', 'interosseous ligament of forearm'],
  },

  'interosseous-membrane-of-leg': {
    anatomicalName: 'Interosseous membrane of leg',
    summary:
      'This is a tough fibrous sheet stretched between the tibia and fibula. It ties the two leg bones together and gives muscles a place to attach.',
    location:
      'In the lower leg, spanning the gap between the interosseous borders of the tibia and fibula, and separating the anterior and posterior compartments of the leg.',
    functions: [
      'Binds the tibia and fibula together',
      'Provides attachment for leg muscles',
      'Separates the anterior and posterior compartments of the leg',
    ],
    facts: [
      'An opening near its upper end lets the anterior tibial vessels pass to the front of the leg.',
    ],
    related: ['tibia-left', 'fibula-left', 'tibialis-anterior-left', 'interosseous-membrane-of-forearm-left'],
    aliases: ['crural interosseous membrane', 'interosseous ligament of leg'],
  },

  'intervertebral-discs': {
    anatomicalName: 'Intervertebral discs',
    commonName: 'Spinal discs',
    summary:
      'Intervertebral discs are tough, flexible pads of fibrocartilage between the vertebral bodies. They act as shock absorbers and let the spine bend.',
    location:
      'Between the bodies of adjacent vertebrae, from the space between C2 and C3 down to the space between L5 and the sacrum. There is no disc between the skull and atlas or between the atlas and axis.',
    functions: [
      'Absorb and spread compressive loads on the spine',
      'Allow small movements between vertebrae',
      'Hold vertebrae together',
      'Contribute to the height and curves of the spine',
    ],
    components: [
      'Annulus fibrosus (outer fibrous rings)',
      'Nucleus pulposus (gel-like center)',
      'Cartilaginous end plates',
    ],
    howItWorks:
      'The water-rich nucleus pulposus acts like a cushion under pressure, pushing outward against the layered fibers of the annulus fibrosus, which resist the force and keep the nucleus contained.',
    facts: [
      'There are 23 intervertebral discs in the spine.',
      'Discs lose some water under load during the day, so people are slightly shorter in the evening than in the morning.',
    ],
    related: ['seventh-cervical-vertebra', 'twelfth-thoracic-vertebra', 'first-lumbar-vertebra', 'sacrum'],
    aliases: ['intervertebral disc', 'intervertebral disk', 'spinal disc', 'disc', 'nucleus pulposus', 'annulus fibrosus'],
  },

  'lacrimal-bone': {
    anatomicalName: 'Lacrimal bone',
    summary:
      'The lacrimal bone is a tiny, thin bone in the inner wall of the eye socket. It helps form the channel that drains tears into the nose.',
    location:
      'In the front of the medial wall of the orbit. It articulates with the maxilla, frontal bone, ethmoid and inferior nasal concha.',
    functions: [
      'Forms part of the medial wall of the orbit',
      'Houses the lacrimal sac in the lacrimal fossa',
      'Helps form the nasolacrimal canal for tear drainage',
    ],
    components: ['Posterior lacrimal crest', 'Lacrimal groove (fossa)', 'Lacrimal hamulus'],
    facts: [
      'It is the smallest bone of the face.',
      'Its name comes from the Latin lacrima, meaning "tear."',
    ],
    related: ['maxilla-left', 'ethmoid', 'inferior-nasal-concha-left', 'frontal-bone', 'eyeball'],
    aliases: ['lacrimal', 'tear bone', 'os lacrimale'],
  },

  'long-plantar-ligament': {
    anatomicalName: 'Long plantar ligament',
    summary:
      'The long plantar ligament is a strong band on the sole of the foot. It helps hold up the outer arch of the foot.',
    location:
      'On the underside of the foot. It runs from the plantar surface of the calcaneus forward to the cuboid and the bases of the lateral metatarsals.',
    functions: [
      'Supports the lateral longitudinal arch of the foot',
      'Binds the tarsal bones together',
      'Helps form a tunnel for the tendon of fibularis longus',
    ],
    facts: [
      'It is the longest ligament of the sole of the foot.',
    ],
    related: ['talus-left', 'first-metatarsal-bone-left', 'calcaneus-left', 'cuboid-bone-left'],
    aliases: ['plantar ligament', 'long plantar', 'ligamentum plantare longum'],
  },

  mandible: {
    anatomicalName: 'Mandible',
    commonName: 'Lower jawbone',
    summary:
      'The mandible is the lower jaw, the largest and strongest bone of the face. It is the only skull bone that moves freely, allowing chewing and speech.',
    location:
      'Forming the lower face and chin. Its condyles articulate with the temporal bones at the temporomandibular joints, just in front of the ears.',
    functions: [
      'Holds the lower teeth',
      'Moves for chewing, biting and speaking',
      'Provides attachment for chewing muscles and muscles of the floor of the mouth',
    ],
    components: [
      'Body',
      'Ramus',
      'Angle',
      'Condylar process',
      'Coronoid process',
      'Alveolar part (tooth sockets)',
      'Mental foramen and mandibular foramen',
    ],
    howItWorks:
      'The masseter and temporalis muscles close the jaw. At the temporomandibular joint, the condyle both rotates and slides forward, which allows the mouth to open wide.',
    facts: [
      'It begins as two halves that fuse at the chin during the first year of life.',
    ],
    related: ['temporal-bone-left', 'maxilla-left', 'masseter-left', 'temporalis-left', 'lower-teeth'],
    aliases: ['jaw', 'jawbone', 'lower jaw', 'chin', 'TMJ'],
  },

  manubrium: {
    anatomicalName: 'Manubrium of sternum',
    summary:
      'The manubrium is the broad upper part of the sternum (breastbone). It anchors the collarbones and the first pair of ribs.',
    location:
      'At the top of the front of the chest, below the base of the neck. It articulates with the clavicles, the first costal cartilages, part of the second costal cartilages, and the body of the sternum at the sternal angle.',
    functions: [
      'Connects the upper limbs to the axial skeleton via the clavicles',
      'Anchors the first ribs',
      'Helps protect the great vessels above the heart',
    ],
    components: [
      'Jugular (suprasternal) notch',
      'Clavicular notches',
      'Costal notches',
      'Sternal angle (manubriosternal joint)',
    ],
    facts: [
      'The sternal angle, a ridge where the manubrium meets the body, marks the level of the second rib and is a useful landmark for counting ribs.',
    ],
    related: ['body-of-sternum', 'xiphoid-process', 'clavicle-left', 'first-rib-left', 'sternocleidomastoid-left'],
    aliases: ['manubrium sterni', 'sternum', 'breastbone', 'suprasternal notch', 'jugular notch'],
  },

  maxilla: {
    anatomicalName: 'Maxilla',
    commonName: 'Upper jawbone',
    summary:
      'The two maxillae form the upper jaw and the center of the face. They hold the upper teeth and form much of the roof of the mouth.',
    location:
      'In the middle of the face, below the eyes and beside the nose. The two maxillae meet in the midline and articulate with the frontal, nasal, lacrimal, ethmoid, zygomatic, palatine bones, vomer and inferior nasal conchae.',
    functions: [
      'Holds the upper teeth',
      'Forms most of the hard palate',
      'Forms the floor of the orbit and part of the nasal cavity walls',
      'Contains the maxillary sinus',
    ],
    components: [
      'Body with maxillary sinus',
      'Alveolar process',
      'Palatine process',
      'Frontal process',
      'Zygomatic process',
      'Infraorbital foramen',
    ],
    facts: [
      'The maxillary sinus is the largest of the paranasal sinuses.',
    ],
    related: ['mandible', 'palatine-bone-left', 'zygomatic-bone-left', 'nasal-bone-left', 'upper-teeth'],
    aliases: ['upper jaw', 'maxillae', 'maxillary bone', 'cheek', 'maxillary sinus'],
  },

  'nasal-bone': {
    anatomicalName: 'Nasal bone',
    summary:
      'The two nasal bones are small, oblong bones that form the bridge of the nose. The rest of the nose is shaped by cartilage.',
    location:
      'At the top of the nose, between the eyes. They meet each other in the midline and articulate with the frontal bone above, the maxillae at the sides, and the ethmoid behind.',
    functions: [
      'Form the bony bridge of the nose',
      'Support the nasal cartilages',
    ],
    facts: [
      'They are the most commonly fractured bones of the face.',
    ],
    related: ['frontal-bone', 'maxilla-left', 'ethmoid', 'nasal-cartilages'],
    aliases: ['nose bone', 'bridge of nose', 'nasal bones'],
  },

  'occipital-bone': {
    anatomicalName: 'Occipital bone',
    summary:
      'The occipital bone forms the back and base of the skull. It contains the large opening through which the brain connects to the spinal cord.',
    location:
      'At the back of the head. It articulates with the parietal bones (lambdoid suture), the temporal bones, the sphenoid, and the atlas (C1) below.',
    functions: [
      'Protects the occipital lobes and cerebellum',
      'Lets the brainstem pass to the spinal cord through the foramen magnum',
      'Forms the atlanto-occipital joints with the atlas',
      'Provides attachment for neck muscles and ligaments',
    ],
    components: [
      'Foramen magnum',
      'Occipital condyles',
      'External occipital protuberance',
      'Squamous part',
      'Basilar part',
      'Superior and inferior nuchal lines',
    ],
    facts: [
      'The bump you can feel at the back of the head is the external occipital protuberance.',
    ],
    related: ['atlas', 'parietal-bone-left', 'temporal-bone-left', 'sphenoid-bone', 'cerebellum'],
    aliases: ['occiput', 'back of skull', 'foramen magnum', 'os occipitale'],
  },

  'palatine-bone': {
    anatomicalName: 'Palatine bone',
    summary:
      'The palatine bones are two L-shaped bones at the back of the nasal cavity. They form the back part of the hard palate.',
    location:
      'Behind the maxillae, between the maxilla and the pterygoid process of the sphenoid. They articulate with each other, the maxillae, sphenoid, ethmoid, vomer and inferior nasal conchae.',
    functions: [
      'Form the posterior part of the hard palate',
      'Form part of the floor and side walls of the nasal cavity',
      'Contribute a small part to the floor of the orbit',
    ],
    components: ['Horizontal plate', 'Perpendicular plate', 'Pyramidal process', 'Orbital process', 'Sphenoidal process'],
    related: ['maxilla-left', 'vomer', 'sphenoid-bone', 'inferior-nasal-concha-left'],
    aliases: ['palatine', 'palate bone', 'hard palate', 'os palatinum'],
  },

  'parietal-bone': {
    anatomicalName: 'Parietal bone',
    summary:
      'The two parietal bones form most of the roof and upper sides of the skull. They protect the top of the brain.',
    location:
      'At the top and sides of the head. They meet each other at the sagittal suture and articulate with the frontal bone (coronal suture), the occipital bone (lambdoid suture), the temporal bones and the sphenoid.',
    functions: [
      'Protect the upper brain, including the parietal lobes',
      'Form the roof and side walls of the cranial cavity',
      'Provide attachment for the temporalis muscle',
    ],
    components: ['Parietal eminence', 'Superior and inferior temporal lines', 'Grooves for meningeal vessels'],
    facts: [
      'In infants, the large soft spot (anterior fontanelle) lies where the parietal bones meet the frontal bone.',
    ],
    related: ['frontal-bone', 'occipital-bone', 'temporal-bone-left', 'sphenoid-bone', 'temporalis-left'],
    aliases: ['parietal', 'skull roof', 'os parietale'],
  },

  patella: {
    anatomicalName: 'Patella',
    commonName: 'Kneecap',
    summary:
      'The patella is a small triangular bone at the front of the knee. It sits within the tendon of the quadriceps and improves the muscle\'s leverage.',
    location:
      'In front of the knee joint. Its back surface glides in the groove (patellar surface) at the lower end of the femur. It is held between the quadriceps tendon above and the patellar ligament below.',
    functions: [
      'Increases the leverage of the quadriceps for straightening the knee',
      'Protects the front of the knee joint',
      'Reduces friction on the quadriceps tendon',
    ],
    components: ['Base (upper edge)', 'Apex (lower point)', 'Articular surface with medial and lateral facets'],
    howItWorks:
      'By holding the quadriceps tendon farther from the knee joint\'s axis, the patella lengthens the lever arm, so the muscle can extend the knee with greater force.',
    facts: [
      'It is the largest sesamoid bone in the body.',
      'It is covered by some of the thickest articular cartilage in the body.',
    ],
    related: ['femur-left', 'tibia-left', 'rectus-femoris-left', 'sesamoid-bone-of-foot-left'],
    aliases: ['kneecap', 'knee cap', 'knee bone'],
  },

  'phalanges-foot': {
    anatomicalName: 'Phalanges of the foot',
    commonName: 'Toe bones',
    summary:
      'The phalanges are the bones of the toes. There are 14 in each foot: two in the big toe and three in each of the other toes.',
    location:
      'In the toes, in front of the metatarsals. Proximal phalanges articulate with the metatarsal heads; middle and distal phalanges follow in sequence.',
    functions: [
      'Help balance and push off the ground during walking',
      'Spread weight across the front of the foot',
      'Provide attachment for toe muscles',
    ],
    components: [
      'Proximal phalanges',
      'Middle phalanges (absent in the big toe)',
      'Distal phalanges',
      'Base, shaft and head of each phalanx',
    ],
    facts: [
      'In the little toe the middle and distal phalanges are often fused.',
      'The big toe is called the hallux.',
    ],
    related: ['first-metatarsal-bone-left', 'talus-left', 'phalanges-hand-left'],
    aliases: ['toe bones', 'toes', 'phalanx', 'hallux', 'big toe'],
  },

  'phalanges-hand': {
    anatomicalName: 'Phalanges of the hand',
    commonName: 'Finger bones',
    summary:
      'The phalanges are the bones of the fingers and thumb. Each hand has 14: two in the thumb and three in each finger.',
    location:
      'In the digits, beyond the metacarpals. Proximal phalanges articulate with the metacarpal heads at the knuckles; middle and distal phalanges follow in sequence.',
    functions: [
      'Allow precise gripping and manipulation',
      'Support the fingertips and nails',
      'Provide attachment for finger tendons',
    ],
    components: [
      'Proximal phalanges',
      'Middle phalanges (absent in the thumb)',
      'Distal phalanges',
      'Base, shaft and head of each phalanx',
    ],
    howItWorks:
      'The joints between phalanges are hinge joints, bending and straightening the fingers. Long tendons from forearm muscles pull on the phalanges, aided by small muscles in the hand.',
    facts: [
      'The hand and wrist together contain 27 bones.',
    ],
    related: ['first-metacarpal-bone-left', 'scaphoid-left', 'phalanges-foot-left'],
    aliases: ['finger bones', 'fingers', 'thumb', 'phalanx', 'digits'],
  },

  radius: {
    anatomicalName: 'Radius',
    summary:
      'The radius is one of the two forearm bones, on the thumb side. It rotates around the ulna, letting you turn your palm up and down.',
    location:
      'On the lateral (thumb) side of the forearm. Its head articulates with the capitulum of the humerus and the ulna at the elbow; its wide lower end articulates with the scaphoid and lunate at the wrist and with the ulna.',
    functions: [
      'Allows pronation and supination (turning the palm down and up)',
      'Forms the main forearm part of the wrist joint',
      'Provides attachment for forearm and arm muscles, including biceps brachii',
    ],
    components: ['Head', 'Neck', 'Radial tuberosity', 'Shaft', 'Styloid process', 'Ulnar notch'],
    howItWorks:
      'The disc-shaped head spins within a ring-like ligament at the elbow, while the lower end swings around the head of the ulna, so the radius crosses over the ulna when the palm turns down.',
    facts: [
      'A fracture of its lower end is one of the most common fractures, often from falling on an outstretched hand.',
    ],
    related: ['ulna-left', 'humerus-left', 'scaphoid-left', 'interosseous-membrane-of-forearm-left', 'biceps-brachii-left'],
    aliases: ['radial bone', 'forearm bone'],
  },

  sacrum: {
    anatomicalName: 'Sacrum',
    summary:
      'The sacrum is a large triangular bone at the base of the spine, made of five vertebrae fused together. It forms the back of the pelvis.',
    location:
      'Between the two hip bones at the back of the pelvis. It articulates with the fifth lumbar vertebra above, the coccyx below, and the hip bones at the sacroiliac joints.',
    functions: [
      'Transfers upper body weight to the pelvis and legs',
      'Forms the back wall of the pelvis',
      'Protects the sacral nerve roots in the sacral canal',
    ],
    components: [
      'Sacral promontory',
      'Ala (wings)',
      'Auricular surfaces (for the sacroiliac joints)',
      'Anterior and posterior sacral foramina',
      'Sacral canal and sacral hiatus',
      'Median sacral crest',
    ],
    facts: [
      'Its five vertebrae fuse gradually, typically completing in early adulthood.',
    ],
    related: ['hip-bone-left', 'fifth-lumbar-vertebra', 'intervertebral-discs', 'gluteus-maximus-left'],
    aliases: ['sacral bone', 'os sacrum', 'sacral vertebrae', 'S1', 'tailbone area'],
  },

  scapula: {
    anatomicalName: 'Scapula',
    commonName: 'Shoulder blade',
    summary:
      'The scapula is a flat, triangular bone on the upper back. It forms the socket of the shoulder joint and anchors many shoulder muscles.',
    location:
      'On the back of the chest wall, over ribs 2 to 7. It articulates with the humerus at the glenoid cavity (shoulder joint) and with the clavicle at the acromion.',
    functions: [
      'Forms the socket of the shoulder joint',
      'Provides attachment for the rotator cuff and other shoulder muscles',
      'Glides over the rib cage to increase the range of arm movement',
    ],
    components: [
      'Glenoid cavity',
      'Spine of scapula',
      'Acromion',
      'Coracoid process',
      'Supraspinous, infraspinous and subscapular fossae',
      'Medial and lateral borders, inferior angle',
    ],
    howItWorks:
      'The scapula is held to the trunk only by muscles. As the arm rises, it rotates and slides on the rib cage so the glenoid cavity faces upward, allowing the arm to reach overhead.',
    related: ['humerus-left', 'clavicle-left', 'trapezius-left', 'serratus-anterior-left', 'deltoid-left'],
    aliases: ['shoulder blade', 'shoulderblade', 'acromion', 'glenoid'],
  },

  'sesamoid-bone-of-foot': {
    anatomicalName: 'Sesamoid bones of foot',
    summary:
      'Sesamoid bones are small, pea-shaped bones embedded within tendons. In the foot, two are usually found under the head of the first metatarsal.',
    location:
      'On the sole of the foot under the ball of the big toe, within the tendons of the flexor hallucis brevis muscle, articulating with the head of the first metatarsal.',
    functions: [
      'Protect the tendons of the big toe',
      'Increase leverage of the muscles that flex the big toe',
      'Help bear weight under the ball of the foot',
    ],
    facts: [
      'Their name refers to their resemblance to sesame seeds.',
      'The patella is also a sesamoid bone, the largest in the body.',
    ],
    related: ['first-metatarsal-bone-left', 'phalanges-foot-left', 'patella-left', 'talus-left'],
    aliases: ['sesamoid', 'sesamoids', 'hallux sesamoids'],
  },

  'sphenoid-bone': {
    anatomicalName: 'Sphenoid bone',
    summary:
      'The sphenoid is a butterfly-shaped bone in the middle of the skull base. It links the bones of the cranium together and cradles the pituitary gland.',
    location:
      'At the center of the skull base, behind the eyes and nose. It articulates with all the other cranial bones (frontal, parietal, temporal, occipital and ethmoid) and with several facial bones.',
    functions: [
      'Forms part of the floor of the cranial cavity and the walls of the orbits',
      'Houses the pituitary gland in the sella turcica',
      'Contains openings for cranial nerves and blood vessels',
      'Provides attachment for chewing muscles',
    ],
    components: [
      'Body with sphenoid sinus',
      'Sella turcica',
      'Greater wings',
      'Lesser wings',
      'Pterygoid processes',
      'Optic canals',
    ],
    facts: [
      'Its name means "wedge-shaped" in Greek.',
      'The optic nerves pass from the orbits to the brain through its optic canals.',
    ],
    related: ['pituitary-gland', 'ethmoid', 'temporal-bone-left', 'occipital-bone', 'optic-nerve-left'],
    aliases: ['sphenoid', 'sella turcica', 'os sphenoidale', 'butterfly bone'],
  },

  'temporal-bone': {
    anatomicalName: 'Temporal bone',
    summary:
      'The temporal bones form the lower sides of the skull around the ears. They house the delicate structures for hearing and balance.',
    location:
      'On the sides and base of the skull, below the parietal bones. Each articulates with the parietal, occipital, sphenoid and zygomatic bones, and with the mandible at the temporomandibular joint.',
    functions: [
      'Encloses the middle and inner ear',
      'Forms the jaw socket for the temporomandibular joint',
      'Protects the temporal lobes of the brain',
      'Provides attachment for neck and chewing muscles',
    ],
    components: [
      'Squamous part',
      'Petrous part',
      'Mastoid process',
      'Tympanic part and external acoustic meatus',
      'Zygomatic process',
      'Styloid process',
      'Mandibular fossa',
    ],
    facts: [
      'The petrous part is one of the densest bones in the body.',
      'The mastoid process, the bump behind the ear, contains air cells.',
    ],
    related: ['mandible', 'zygomatic-bone-left', 'parietal-bone-left', 'occipital-bone', 'ear'],
    aliases: ['temporal', 'mastoid', 'temple bone', 'os temporale'],
  },

  tibia: {
    anatomicalName: 'Tibia',
    commonName: 'Shinbone',
    summary:
      'The tibia is the large inner bone of the lower leg and the main weight-bearing bone below the knee. Its front edge forms the shin.',
    location:
      'On the medial side of the leg. Its upper end articulates with the femur at the knee and with the fibula; its lower end articulates with the talus at the ankle and with the fibula.',
    functions: [
      'Transmits body weight from the femur to the foot',
      'Forms part of the knee and ankle joints',
      'Provides attachment for leg muscles and the patellar ligament',
    ],
    components: [
      'Medial and lateral condyles (tibial plateau)',
      'Intercondylar eminence',
      'Tibial tuberosity',
      'Shaft with anterior border (shin)',
      'Medial malleolus',
    ],
    facts: [
      'It is the second longest bone in the body, after the femur.',
      'The bump on the inner side of the ankle is its medial malleolus.',
    ],
    related: ['femur-left', 'fibula-left', 'patella-left', 'talus-left', 'tibialis-anterior-left'],
    aliases: ['shinbone', 'shin bone', 'shin', 'medial malleolus'],
  },

  ulna: {
    anatomicalName: 'Ulna',
    summary:
      'The ulna is the forearm bone on the little-finger side. Its upper end forms the main hinge of the elbow.',
    location:
      'On the medial side of the forearm, parallel to the radius. Its trochlear notch wraps around the trochlea of the humerus at the elbow; its lower end articulates with the radius near the wrist.',
    functions: [
      'Forms the hinge of the elbow joint',
      'Provides a stable axis around which the radius rotates',
      'Provides attachment for forearm muscles',
    ],
    components: [
      'Olecranon',
      'Coronoid process',
      'Trochlear notch',
      'Radial notch',
      'Shaft',
      'Head',
      'Styloid process',
    ],
    facts: [
      'The point of the elbow you lean on is the olecranon of the ulna.',
    ],
    related: ['radius-left', 'humerus-left', 'interosseous-membrane-of-forearm-left', 'scaphoid-left'],
    aliases: ['elbow bone', 'olecranon', 'forearm bone'],
  },

  vomer: {
    anatomicalName: 'Vomer',
    summary:
      'The vomer is a thin, flat bone that forms the lower back part of the nasal septum, the wall dividing the nose into two sides.',
    location:
      'In the midline of the nasal cavity. It articulates with the sphenoid, ethmoid (perpendicular plate), both maxillae and both palatine bones, and joins the septal cartilage in front.',
    functions: [
      'Forms the posterior and inferior part of the nasal septum',
      'Divides the nasal cavity into left and right passages',
    ],
    facts: [
      'Its name comes from the Latin for "plowshare," referring to its shape.',
    ],
    related: ['ethmoid', 'sphenoid-bone', 'palatine-bone-left', 'maxilla-left', 'nasal-cartilages'],
    aliases: ['nasal septum', 'vomer bone'],
  },

  'xiphoid-process': {
    anatomicalName: 'Xiphoid process',
    summary:
      'The xiphoid process is the small, pointed lowest part of the sternum (breastbone). It starts as cartilage and gradually turns to bone with age.',
    location:
      'At the lower end of the sternum, below the body of the sternum, at the top of the epigastric region (the pit of the stomach). It joins the body of the sternum at the xiphisternal joint.',
    functions: [
      'Provides attachment for part of the diaphragm',
      'Provides attachment for abdominal muscles and the linea alba',
    ],
    facts: [
      'It is often cartilaginous in young people and usually ossifies in adulthood.',
      'Its shape varies widely; it may be pointed, broad, bent or split.',
    ],
    related: ['body-of-sternum', 'manubrium', 'diaphragm', 'costal-cartilages-left'],
    aliases: ['xiphoid', 'xiphisternum', 'ensiform process', 'sternum', 'breastbone'],
  },

  'zygomatic-bone': {
    anatomicalName: 'Zygomatic bone',
    commonName: 'Cheekbone',
    summary:
      'The zygomatic bones form the prominent part of the cheeks. They also form the outer wall and floor of each eye socket.',
    location:
      'On each side of the face, below and to the side of the eye. It articulates with the maxilla, frontal, sphenoid and temporal bones; with the zygomatic process of the temporal bone it forms the zygomatic arch.',
    functions: [
      'Shapes the cheek',
      'Forms the lateral wall and part of the floor of the orbit',
      'Provides attachment for the masseter muscle',
    ],
    components: ['Frontal process', 'Temporal process', 'Maxillary process', 'Zygomaticofacial foramen'],
    related: ['maxilla-left', 'temporal-bone-left', 'frontal-bone', 'masseter-left', 'sphenoid-bone'],
    aliases: ['cheekbone', 'cheek bone', 'malar bone', 'zygoma', 'zygomatic arch'],
  },
};
