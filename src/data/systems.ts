import type { SystemId, SystemInfo } from '../types';

export const SYSTEMS: SystemInfo[] = [
  {
    id: 'skeletal',
    name: 'Skeletal system',
    shortName: 'Skeletal',
    color: '#e9dcc0',
    overview:
      'The skeleton is the body\'s internal framework of bones, cartilage and ligaments. An adult skeleton usually has about 206 bones, divided into the axial skeleton (skull, vertebral column, ribs, sternum) and the appendicular skeleton (limbs and the girdles that attach them).',
    functions: [
      'Supports the body and gives it shape',
      'Protects organs such as the brain, heart and lungs',
      'Acts as levers that muscles pull on to produce movement',
      'Produces blood cells in red bone marrow',
      'Stores minerals, especially calcium and phosphate',
    ],
    coverage:
      'Modelled from BodyParts3D: skull bones, mandible, hyoid, vertebrae C1–L5, sacrum, ribs, costal cartilages, sternum, clavicles, scapulae, pelvis and all limb bones including carpals, tarsals and phalanges. Not modelled as separate meshes: coccyx, auditory ossicles, most ligaments and joint capsules.',
    coverageFemale:
      'Female body (Human Reference Atlas): pelvis (sacrum, coccyx, left and right ilium, ischium and pubis), vertebrae C1–C7, T1–T12 and six lumbar vertebrae as segmented in the source, and both legs (femur, tibia, fibula and patella with the knee ligaments and menisci). Not modelled: skull, ribs, sternum, shoulder girdle, arms and feet.',
    focus: 'femur-left',
  },
  {
    id: 'muscular',
    name: 'Muscular system',
    shortName: 'Muscular',
    color: '#d0574f',
    overview:
      'Skeletal muscles attach to bones by tendons and contract to move the body, hold posture and generate heat. There are more than 600 named skeletal muscles. (Smooth muscle in organ walls and cardiac muscle in the heart belong to other systems.)',
    functions: [
      'Produces movement by pulling on bones',
      'Maintains posture and stabilizes joints',
      'Generates heat',
      'Helps breathing (diaphragm, intercostal muscles)',
    ],
    coverage:
      'Modelled: about 175 muscles and muscle groups per side of the head, neck, trunk, limbs, hands, feet and pelvic floor, plus major tendons and fasciae (calcaneal tendon, iliotibial tract, linea alba). Not modelled: tongue and extra-ocular muscles, perineal muscles other than the levator ani group and external anal sphincter, and several small neck muscles.',
    coverageFemale:
      'Female body: only the extraocular muscles of each eye and the lower part of rectus femoris at each knee are modelled. The rest of the female muscular system is not part of the source dataset; switch to the male body to explore muscles.',
    focus: 'pectoralis-major-left',
  },
  {
    id: 'nervous',
    name: 'Nervous system',
    shortName: 'Nervous',
    color: '#f2d38a',
    overview:
      'The nervous system detects, processes and responds to information. The central nervous system is the brain and spinal cord; the peripheral nervous system is the network of nerves that connects them to the rest of the body.',
    functions: [
      'Receives sensory information from the body and environment',
      'Integrates information and makes decisions',
      'Controls muscles and glands',
      'Supports memory, language, emotion and thought',
    ],
    coverage:
      'Modelled: brain only — cerebral gyri and lobes, deep nuclei (thalamus, caudate, putamen, globus pallidus), limbic structures, corpus callosum, ventricles, brainstem, cerebellum, optic nerves and tracts, plus the eyeball and ear meshes. Not modelled: the spinal cord itself (only its central canal is present) and all peripheral nerves. These are listed in search as information-only entries.',
    coverageFemale:
      'Female body: left and right halves of the brain (built from Allen Human Brain Atlas regions), optic nerves and chiasm, the spinal cord (C1–S4 segments) and both eyes. Not modelled: cranial and peripheral nerves.',
    focus: 'cerebellum',
  },
  {
    id: 'cardiovascular',
    name: 'Cardiovascular system',
    shortName: 'Cardiovascular',
    color: '#e04a5a',
    overview:
      'The heart pumps blood through two circuits: the pulmonary circulation to the lungs and back, and the systemic circulation to the rest of the body. Arteries carry blood away from the heart, veins return it, and capillaries are where exchange with tissues happens.',
    functions: [
      'Transports oxygen, nutrients and hormones to tissues',
      'Removes carbon dioxide and other wastes',
      'Helps regulate body temperature',
      'Carries immune cells and clotting factors',
    ],
    coverage:
      'Modelled: heart wall, tricuspid, mitral and pulmonary valves, papillary muscles, coronary arteries and cardiac veins, aorta, venae cavae, pulmonary artery and veins, and the major trunk vessels (carotid, subclavian, brachiocephalic, renal, mesenteric, iliac). The four chambers are not separate meshes, the aortic valve is not modelled, and limb and head vessels beyond the trunk are not included.',
    coverageFemale:
      'Female body: the heart with separately selectable left and right atria and ventricles, interventricular septum, all four valves (aortic, pulmonary, mitral, tricuspid) and papillary muscles, plus blood vessels grouped by organ (heart, liver, kidneys, spleen, gallbladder, large intestine, uterus, eyes). Not modelled: the aorta, venae cavae and limb vessels as separate structures.',
    focus: 'heart',
  },
  {
    id: 'respiratory',
    name: 'Respiratory system',
    shortName: 'Respiratory',
    color: '#7fc4e8',
    overview:
      'The respiratory system moves air in and out of the lungs and exchanges oxygen and carbon dioxide between air and blood across the thin walls of the alveoli.',
    functions: [
      'Brings oxygen into the blood',
      'Removes carbon dioxide',
      'Helps regulate blood pH',
      'Enables speech by moving air past the vocal folds',
    ],
    coverage:
      'Modelled: lungs (by lobe), trachea, bronchi, thyroid cartilage of the larynx, nasal cartilages and the diaphragm. Not modelled: nasal cavity, pharynx, the rest of the larynx (epiglottis, cricoid, vocal folds) and pleura.',
    coverageFemale:
      'Female body: left and right lungs (with bronchopulmonary segments as parts), trachea, left and right bronchial trees and laryngeal cartilages. Not modelled: nasal cavity, pharynx and diaphragm.',
    focus: 'lung-right',
  },
  {
    id: 'digestive',
    name: 'Digestive system',
    shortName: 'Digestive',
    color: '#e3a35b',
    overview:
      'The digestive system is a continuous tube from mouth to anus plus accessory organs (teeth, salivary glands, liver, gallbladder, pancreas). It breaks food down into molecules small enough to be absorbed into the blood.',
    functions: [
      'Mechanical and chemical breakdown of food',
      'Absorption of nutrients and water',
      'Elimination of undigested material',
      'Metabolic and storage functions (liver)',
    ],
    coverage:
      'Modelled: teeth, gums, lips, esophagus, stomach, duodenum, jejunum, ileum, appendix, colon with taeniae, rectum, liver, gallbladder, pancreas and pancreatic duct. Not modelled: tongue, salivary glands, pharynx, bile ducts and anal canal.',
    coverageFemale:
      'Female body: palatine tonsils, duodenum, jejunum, ileum, cecum, appendix, colon by segment, rectum, liver, gallbladder, biliary tree and pancreas. Not modelled: mouth, teeth, esophagus and stomach.',
    focus: 'stomach',
  },
  {
    id: 'urinary',
    name: 'Urinary system',
    shortName: 'Urinary',
    color: '#e8c547',
    overview:
      'The kidneys filter blood to make urine, which flows through the ureters to the bladder for storage and leaves the body through the urethra.',
    functions: [
      'Removes metabolic wastes from blood',
      'Regulates water, salt and acid–base balance',
      'Helps control blood pressure',
      'Produces hormones such as erythropoietin and activates vitamin D',
    ],
    coverage: 'Modelled: both kidneys, both ureters, urinary bladder and urethra (male anatomy).',
    coverageFemale:
      'Female body: both kidneys, renal pelvis and ureter on each side, and the urinary bladder. Not modelled: urethra.',
    focus: 'kidney-left',
  },
  {
    id: 'reproductive',
    name: 'Reproductive system',
    shortName: 'Reproductive',
    color: '#c58ad8',
    overview:
      'The reproductive system produces gametes (sperm or eggs) and sex hormones. Use the Male/Female switch to see each body: the male body shows the testes, ducts, glands and penis; the female body shows the uterus, ovaries, fallopian tubes, vagina and mammary glands.',
    functions: [
      'Produces gametes',
      'Produces sex hormones',
      'Enables fertilization (and, in females, supports pregnancy)',
    ],
    coverage:
      'Modelled (male only): testes, epididymides, deferent ducts, seminal vesicles, prostate and penis (corpora cavernosa, corpus spongiosum, glans). Not modelled in this body: the scrotum. Female reproductive organs are modelled in the female body (use the Male/Female switch).',
    coverageFemale:
      'Female body: uterus (including cervix), ovaries, fallopian tubes, vagina, the uterine and ovarian ligaments and the mammary glands. The placenta in the source set is left out because it belongs to pregnancy and this reference body is not pregnant.',
    focus: 'prostate',
  },
  {
    id: 'endocrine',
    name: 'Endocrine system',
    shortName: 'Endocrine',
    color: '#5fd0b5',
    overview:
      'Endocrine glands release hormones into the blood. Hormones act on distant target cells to regulate growth, metabolism, reproduction, the stress response and the balance of water and salts.',
    functions: [
      'Regulates metabolism and energy use',
      'Controls growth and development',
      'Coordinates the stress response',
      'Regulates reproduction and blood glucose',
    ],
    coverage:
      'Modelled: pituitary gland, pineal body, adrenal glands, plus structures shown here from other systems that have endocrine roles (hypothalamus, pancreas, thymus, testes). Not modelled: thyroid gland and parathyroid glands (information-only entries).',
    coverageFemale:
      'Female body: ovaries, pancreas and thymus (shown from their own systems). Not modelled: pituitary, pineal, thyroid, parathyroid and adrenal glands.',
    focus: 'pituitary-gland',
  },
  {
    id: 'lymphatic',
    name: 'Lymphatic and immune system',
    shortName: 'Lymphatic',
    color: '#9ad36a',
    overview:
      'The lymphatic system returns excess tissue fluid to the blood and is a major site of immune defence. Lymphoid organs include the spleen, thymus, lymph nodes, tonsils and patches of lymphoid tissue in the gut wall.',
    functions: [
      'Returns tissue fluid (lymph) to the bloodstream',
      'Filters lymph and blood',
      'Houses and trains immune cells',
      'Absorbs dietary fats from the intestine',
    ],
    coverage:
      'Modelled: spleen and thymus (plus splenic vessels in the cardiovascular system). Not modelled: lymph nodes, lymphatic vessels, thoracic duct and tonsils (information-only entries).',
    coverageFemale:
      'Female body: spleen, thymus, palatine tonsils and one representative lymph node. Not modelled: the lymph node chains and lymphatic vessels.',
    focus: 'spleen',
  },
  {
    id: 'integumentary',
    name: 'Integumentary system',
    shortName: 'Integumentary',
    color: '#d9a88c',
    overview:
      'The integumentary system is the skin and its appendages — hair, nails and glands. It is the body\'s largest organ and its first barrier against the outside world.',
    functions: [
      'Protects against injury, microbes and water loss',
      'Regulates temperature through sweat and blood flow',
      'Senses touch, pressure, temperature and pain',
      'Makes vitamin D when exposed to sunlight',
    ],
    coverage:
      'Modelled: the body surface (skin) as a single surface mesh, scalp hair, eyebrows and pubic hair. Not modelled: the separate skin layers (epidermis, dermis, hypodermis), hair follicles, glands and nails. These are explained as information-only entries; the skin mesh cannot be dissected into layers.',
    coverageFemale:
      'Female body: skin as one surface mesh and both mammary glands (lobes, ducts, nipple, areola, fat and suspensory ligaments as parts). Not modelled: hair, nails and the separate skin layers.',
    focus: 'skin',
  },
];

export const SYSTEM_BY_ID = Object.fromEntries(SYSTEMS.map((s) => [s.id, s])) as Record<SystemId, SystemInfo>;
