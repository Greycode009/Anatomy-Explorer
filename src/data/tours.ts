import type { Tour } from '../types';

// Every structureId here must exist in the generated manifest (checked by scripts/check-data.mjs).
export const TOURS: Tour[] = [
  {
    id: 'heart',
    title: 'The heart and great vessels',
    description: 'Follow blood through the heart, its valves and the vessels that connect it to the lungs and body.',
    steps: [
      { system: 'cardiovascular', title: 'The cardiovascular system', text: 'The heart sits in the middle of the chest between the lungs. The faint skeleton is shown for orientation. Drag to rotate the view at any time.' },
      { system: 'cardiovascular', structureId: 'heart', title: 'The heart', text: 'This is the muscular wall of the heart. It contains four chambers: two atria that receive blood and two ventricles that pump it out. In this model the chambers are not separate meshes, so the valves and papillary muscles below show where they meet.' },
      { system: 'cardiovascular', structureId: 'tricuspid-valve', title: 'Tricuspid valve', text: 'Between the right atrium and right ventricle. It lets oxygen-poor blood returning from the body pass into the right ventricle and stops it flowing back.' },
      { system: 'cardiovascular', structureId: 'papillary-muscles', title: 'Papillary muscles', text: 'Small muscles inside the ventricles. Through tendinous cords they keep the tricuspid and mitral valve flaps from turning inside out when the ventricles contract.' },
      { system: 'cardiovascular', structureId: 'pulmonary-artery', title: 'Pulmonary trunk and arteries', text: 'The right ventricle pumps blood through the pulmonary valve into the pulmonary arteries, which carry it to the lungs to pick up oxygen.' },
      { system: 'cardiovascular', structureId: 'pulmonary-vein', title: 'Pulmonary veins', text: 'Oxygen-rich blood returns from the lungs through the pulmonary veins into the left atrium.' },
      { system: 'cardiovascular', structureId: 'mitral-valve', title: 'Mitral valve', text: 'Between the left atrium and left ventricle. The left ventricle has the thickest wall because it pumps blood to the whole body.' },
      { system: 'cardiovascular', structureId: 'arch-of-aorta', title: 'The aorta', text: 'Blood leaves the left ventricle through the aortic valve into the ascending aorta, curves over the arch and runs down as the descending aorta. Branches from the arch supply the head and arms.' },
      { system: 'cardiovascular', structureId: 'superior-vena-cava', title: 'Venae cavae', text: 'The superior and inferior venae cavae return oxygen-poor blood from the body to the right atrium, completing the circuit.' },
      { system: 'cardiovascular', structureId: 'left-coronary-artery', title: 'Coronary arteries', text: 'The heart muscle needs its own blood supply. The left and right coronary arteries branch from the start of the aorta and run over the heart\'s surface.' },
      { system: 'all', structureId: 'lung-left', layers: { skin: false, 'muscles-superficial': false, 'muscles-deep': false, skeleton: false, organs: true, vessels: true, nervous: false }, title: 'Heart and lungs together', text: 'With muscles and bones hidden you can see how the lungs wrap around the heart. The left lung is smaller and has a notch for the heart.' },
    ],
  },
  {
    id: 'digestion',
    title: 'The path of food',
    description: 'From the esophagus to the rectum, with the liver, gallbladder and pancreas along the way.',
    steps: [
      { system: 'digestive', structureId: 'esophagus', title: 'Esophagus', text: 'A muscular tube that carries swallowed food from the throat, behind the trachea and heart, through the diaphragm to the stomach.' },
      { system: 'digestive', structureId: 'stomach', title: 'Stomach', text: 'Food is churned and mixed with acid and enzymes here before passing in small amounts into the duodenum.' },
      { system: 'digestive', structureId: 'duodenum', title: 'Duodenum', text: 'The first part of the small intestine. Bile from the liver and gallbladder and digestive juices from the pancreas enter here.' },
      { system: 'digestive', structureId: 'liver', title: 'Liver', text: 'The largest internal organ. Among many roles, it makes bile, which helps digest fats, and processes nutrients absorbed from the gut.' },
      { system: 'digestive', structureId: 'gallbladder', title: 'Gallbladder', text: 'Stores and concentrates bile and releases it into the duodenum after a meal.' },
      { system: 'digestive', structureId: 'pancreas', title: 'Pancreas', text: 'Releases digestive enzymes into the duodenum and also hormones such as insulin into the blood.' },
      { system: 'digestive', structureId: 'jejunum', title: 'Jejunum and ileum', text: 'Most nutrients are absorbed in the long, folded small intestine.' },
      { system: 'digestive', structureId: 'colon', title: 'Large intestine', text: 'The colon absorbs water and salts and forms feces. The appendix hangs from its first part.' },
      { system: 'digestive', structureId: 'rectum', title: 'Rectum', text: 'The final straight part of the large intestine, which stores feces until they are passed.' },
    ],
  },
  {
    id: 'layers',
    title: 'Peeling back the layers',
    description: 'Go from the skin to superficial and deep muscles, the skeleton and the organs.',
    steps: [
      { system: 'all', layers: { skin: true, 'muscles-superficial': false, 'muscles-deep': false, skeleton: false, organs: false, vessels: false, nervous: false }, structureId: 'skin', title: 'Skin', text: 'The skin covers the whole body. Here it is a single surface mesh; its internal layers are described in search but are not modelled separately.' },
      { system: 'all', layers: { skin: false, 'muscles-superficial': true, 'muscles-deep': false, skeleton: true, organs: false, vessels: false, nervous: false }, structureId: 'deltoid-left', title: 'Superficial muscles', text: 'With the skin removed you see the muscles that lie just beneath it, such as the deltoid, pectoralis major and external oblique.' },
      { system: 'all', layers: { skin: false, 'muscles-superficial': false, 'muscles-deep': true, skeleton: true, organs: false, vessels: false, nervous: false }, structureId: 'transversus-abdominis-left', title: 'Deep muscles', text: 'Removing the superficial layer reveals deeper muscles such as the internal oblique, transversus abdominis and the muscles along the spine.' },
      { system: 'all', layers: { skin: false, 'muscles-superficial': false, 'muscles-deep': false, skeleton: true, organs: false, vessels: false, nervous: false }, structureId: 'first-rib-left', title: 'The skeleton', text: 'The rib cage protects the heart and lungs; the pelvis supports the abdominal organs.' },
      { system: 'all', layers: { skin: false, 'muscles-superficial': false, 'muscles-deep': false, skeleton: false, organs: true, vessels: true, nervous: true }, structureId: 'liver', title: 'Organs', text: 'With the rib cage hidden, the organs of the chest and abdomen are visible together with the brain and major vessels.' },
    ],
  },
];
