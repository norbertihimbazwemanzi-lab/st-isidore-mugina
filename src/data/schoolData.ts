import { AcademicLevel, ClassStreamInfo, EResource, StudentResult, NewsItem, EventItem, StaffMember } from '../types';

export const SCHOOL_INFO = {
  name: 'GS St Isidore Mugina',
  fullName: 'Groupe Scolaire Saint Isidore Mugina',
  motto: 'Ubumenyi, Uburere Ntimatima n\'Umuco',
  mottoEnglish: 'Knowledge, Integrity, Literacy & Rwandan Character',
  foundingYear: '1995',
  status: 'Government-Aided School (Sous-Convention Catholique)',
  churchPartnership: 'Catholic Diocese of Kabgayi / Mugina Catholic Parish',
  governmentPartnership: 'Ministry of Education (MINEDUC) & Rwanda Basic Education Board (REB)',
  district: 'Kamonyi',
  sector: 'Mugina',
  cell: 'Mugina',
  province: 'Southern Province, Rwanda',
  pobox: 'P.O. Box 24 Kamonyi, Rwanda',
  phonePrimary: '0788249507',
  phoneInternational: '+250 788 249 507',
  email: 'gssidoremugina@gmail.com',
  admissionsEmail: 'admissions@gssidoremugina.rw',
  schoolType: 'Inclusive Day School (Pre-Primary, Primary & Ordinary Level Secondary)',
  libraryPartnership: 'National Library Services (Rwanda Cultural Heritage Academy / Inteko y\'Umuco)',
  totalClassStreams: 18,
};

export const CLASS_STREAMS_DATA: ClassStreamInfo[] = [
  // Nursery / Pre-primary
  {
    grade: 'Nursery (Amashuri y\'Inshuke)',
    cycle: 'nursery',
    streams: ['Baby Class', 'Middle Class', 'Top Class'],
    ageGroup: '3 – 5 Years',
    leadTeacher: 'Mme. Nyiraneza Marie Grace',
    subjectsCount: 5,
    totalStudents: 135,
    description: 'Foundational early childhood education fostering social play, basic Kinyarwanda & English vocabulary, phonics, motor skills, and creative arts.'
  },
  // Primary P1 - P6
  {
    grade: 'Primary 1 (P1)',
    cycle: 'primary',
    streams: ['Stream A', 'Stream B', 'Stream C'],
    ageGroup: '6 – 7 Years',
    leadTeacher: 'M. Bizimana Alphonse',
    subjectsCount: 6,
    totalStudents: 152,
    description: 'Early foundational literacy and numeracy under REB CBC, with intensive mother-tongue reading (Kinyarwanda) and introduction to English.'
  },
  {
    grade: 'Primary 2 (P2)',
    cycle: 'primary',
    streams: ['Stream A', 'Stream B'],
    ageGroup: '7 – 8 Years',
    leadTeacher: 'Mme. Mukamana Francoise',
    subjectsCount: 6,
    totalStudents: 104,
    description: 'Expanding mathematical computation, reading comprehension, writing mechanics, and discovery of local physical environment.'
  },
  {
    grade: 'Primary 3 (P3)',
    cycle: 'primary',
    streams: ['Stream A', 'Stream B'],
    ageGroup: '8 – 9 Years',
    leadTeacher: 'M. Gasana Emmanuel',
    subjectsCount: 7,
    totalStudents: 98,
    description: 'Culmination of lower primary cycle with transition readiness into English as the medium of instruction for upper primary.'
  },
  {
    grade: 'Primary 4 (P4)',
    cycle: 'primary',
    streams: ['Stream A', 'Stream B', 'Stream C'],
    ageGroup: '9 – 10 Years',
    leadTeacher: 'Mme. Uwimana Chantal',
    subjectsCount: 8,
    totalStudents: 148,
    description: 'Upper primary transition: Science and Elementary Technology (SET), Social Studies, English fluency, Mathematics, and Creative Arts.'
  },
  {
    grade: 'Primary 5 (P5)',
    cycle: 'primary',
    streams: ['Stream A', 'Stream B'],
    ageGroup: '10 – 11 Years',
    leadTeacher: 'M. Ndayisaba Jean',
    subjectsCount: 8,
    totalStudents: 102,
    description: 'Advanced primary science investigations, Rwandan history, geometry, fractions, and National Library literacy reading clubs.'
  },
  {
    grade: 'Primary 6 (P6) - PLE Candidates',
    cycle: 'primary',
    streams: ['Stream A', 'Stream B'],
    ageGroup: '11 – 12 Years',
    leadTeacher: 'M. Habineza Pierre',
    subjectsCount: 8,
    totalStudents: 110,
    description: 'Comprehensive preparation for the National Primary Leaving Examinations (PLE) administered by NESA, with daily mock revisions.'
  },
  // Secondary / Ordinary Level S1 - S3
  {
    grade: 'Senior 1 (S1)',
    cycle: 'secondary',
    streams: ['Stream A', 'Stream B', 'Stream C'],
    ageGroup: '12 – 14 Years',
    leadTeacher: 'Mme. Mukankusi Vestine',
    subjectsCount: 9,
    totalStudents: 165,
    description: 'Introduction to secondary education: Physics, Chemistry, Biology, Advanced Mathematics, Geography, History, ICT, English, and Kinyarwanda.'
  },
  {
    grade: 'Senior 2 (S2)',
    cycle: 'secondary',
    streams: ['Stream A', 'Stream B', 'Stream C'],
    ageGroup: '13 – 15 Years',
    leadTeacher: 'M. Nkurunziza Theogene',
    subjectsCount: 9,
    totalStudents: 158,
    description: 'Deepening scientific and analytical inquiry, laboratory experiments, civic values, Itorero ry\'Ishuri, and entrepreneurship project work.'
  },
  {
    grade: 'Senior 3 (S3) - National Exam Candidates',
    cycle: 'secondary',
    streams: ['Stream A', 'Stream B'],
    ageGroup: '14 – 16 Years',
    leadTeacher: 'M. Mugabo Jean Damascene',
    subjectsCount: 9,
    totalStudents: 114,
    description: 'Candidate class preparing for the Ordinary Level National Examination (NESA/REB), ensuring strong grades for prestigious A-Level placements.'
  }
];

export const ACADEMIC_LEVELS: AcademicLevel[] = [
  {
    id: 'nursery-cycle',
    name: 'Pre-Primary / Nursery Education',
    kinyarwandaName: 'Amashuri y\'Inshuke',
    code: 'INSHUKE',
    category: 'nursery',
    grades: 'Baby, Middle & Top Classes',
    streamsSummary: 'Baby Class · Middle Class · Top Class',
    description: 'Nurturing early childhood development in a warm, child-friendly environment. Focuses on sensory discovery, spoken language, socialization, motor skills, and joy of learning through play.',
    admissionRequirements: 'Children aged 3 to 5 years. Birth certificate and parent/guardian contact.',
    keySubjects: [
      'Early Reading & Phonics (Kinyarwanda & English)',
      'Pre-Maths, Shapes & Counting Numbers',
      'Physical Movement & Outdoor Play',
      'Creative Arts, Music & Storytelling',
      'Social Etiquette, Hygiene & Christian Values'
    ],
    literacyFocus: 'Picture books, decodable sound games, and oral storytelling in partnership with Kamonyi early childhood facilitators.',
    certification: 'Pre-Primary Completion Certificate (Entry to P1)',
    curriculumBoard: 'REB',
    icon: 'Sparkles',
  },
  {
    id: 'primary-cycle',
    name: 'Primary Education (P1 to P6)',
    kinyarwandaName: 'Amashuri Abanza',
    code: 'ABANZA',
    category: 'primary',
    grades: 'Primary 1 to Primary 6',
    streamsSummary: 'P1 (A, B, C) · P2 (A, B) · P3 (A, B) · P4 (A, B, C) · P5 (A, B) · P6 (A, B)',
    description: 'Robust 6-year primary school program grounded in Rwanda\'s Competence-Based Curriculum (CBC). Equipping every child with high literacy, mathematical fluency, scientific inquiry, and cultural integrity.',
    admissionRequirements: 'Completion of Nursery (Top Class) or formal transfer transcript from another accredited primary school.',
    keySubjects: [
      'Mathematics & Numeracy',
      'Kinyarwanda (Grammar, Reading & Culture)',
      'English Language & Reading Comprehension',
      'Science & Elementary Technology (SET)',
      'Social & Religious Studies (Social Studies)',
      'Creative Arts, Sports & Rwandan Heritage (Itorero)'
    ],
    literacyFocus: 'Structured reading clubs utilizing rich local storybooks curated from the National Library Services (Rwanda Cultural Heritage Academy).',
    certification: 'Primary Leaving Examination (PLE) Certificate (NESA)',
    curriculumBoard: 'NESA',
    icon: 'BookOpen',
  },
  {
    id: 'secondary-cycle',
    name: 'Secondary Education (Ordinary Level S1 to S3)',
    kinyarwandaName: 'Icyiciro Rusange cy\'Amashuri Yisumbuye',
    code: 'O-LEVEL',
    category: 'secondary',
    grades: 'Senior 1 to Senior 3',
    streamsSummary: 'S1 (A, B, C) · S2 (A, B, C) · S3 (A, B)',
    description: 'Premier Ordinary Level (O-Level) secondary program preparing adolescents for academic excellence in sciences, humanities, languages, and modern computer fundamentals. High candidate placement record in national examinations.',
    admissionRequirements: 'Success in Primary Leaving Examination (PLE) with official NESA placement or district admission approval.',
    keySubjects: [
      'Mathematics & Applied Algebra',
      'Physics & Laboratory Practicals',
      'Chemistry & Environmental Science',
      'Biology & Human Health',
      'Geography & History of Rwanda',
      'Information & Communication Technology (ICT)',
      'English, Kinyarwanda & French Languages',
      'Entrepreneurship & Financial Literacy'
    ],
    literacyFocus: 'Research essays, debating competitions, English novel studies, and digital research in the school smart classroom.',
    certification: 'Rwanda Ordinary Level Certificate of Education (NESA / REB)',
    curriculumBoard: 'NESA',
    icon: 'GraduationCap',
  }
];

export const LEADERSHIP_STAFF: StaffMember[] = [
  {
    id: 'staff-01',
    name: 'Habiyaremye Charles',
    role: 'Headteacher (Umuyobozi w\'Ishuri)',
    department: 'School Directorate & Administration',
    classAssigned: 'General School Oversight & Leadership',
    subjectsTaught: ['School Governance', 'Moral Leadership (Itorero)'],
    qualification: 'B.Ed. Educational Management & Pedagogy',
    phone: '0788249507',
    email: 'headteacher@gssidoremugina.rw',
    bio: 'Dedicated educational leader directing GS St Isidore Mugina with a steadfast focus on academic discipline, child literacy, community collaboration, and teacher professional growth.',
    avatarInitials: 'HC',
    accessPasscode: 'HEAD-MUG-2026',
  },
  {
    id: 'staff-02',
    name: 'Letitia (Comptable)',
    role: 'Chief Bursar & Accountant (Umucungamutungo w\'Ishuri)',
    department: 'Finance, Bursary & Administration',
    classAssigned: 'Administration & School Bursary',
    subjectsTaught: ['Financial Accountability', 'Fee Coordination'],
    qualification: 'B.Sc. Accounting & Public Finance',
    phone: '0788249507',
    email: 'comptable@gssidoremugina.rw',
    bio: 'Oversees transparent financial management, government capitation grants, school feeding subsidies, PTA development funds, and student registration receipts.',
    avatarInitials: 'LM',
    accessPasscode: 'BURSAR-MUG-2026',
  },
  {
    id: 'staff-03',
    name: 'Mugabo Jean Damascene',
    role: 'Dean of Studies - Secondary Section (Directeur des Études - D.O.S)',
    department: 'Secondary Academic Coordination (S1 - S3)',
    classAssigned: 'Senior 3 (Stream B) & Secondary Science',
    subjectsTaught: ['Physics', 'Chemistry', 'Laboratory Practicals'],
    qualification: 'M.Sc. Education & Applied Sciences, PGDE',
    phone: '0788249507',
    email: 'dos.secondary@gssidoremugina.rw',
    bio: 'Coordinates the secondary syllabus, science laboratories, term evaluations, teacher mentoring, and national NESA examination readiness.',
    avatarInitials: 'JD',
    accessPasscode: 'DOS-MUG-2026',
  },
  {
    id: 'staff-04',
    name: 'Mukamurenzi Beatrice',
    role: 'Head of Primary Section (Préfet des Études Primaire)',
    department: 'Primary Academic Coordination (P1 - P6)',
    classAssigned: 'Primary 6 (Stream A - PLE Candidates)',
    subjectsTaught: ['Mathematics', 'Science & Elementary Tech (SET)'],
    qualification: 'Diploma in Primary Education & CBC Master Facilitator',
    phone: '0788249507',
    email: 'primary@gssidoremugina.rw',
    bio: 'Supervises classroom instruction across P1 to P6 streams, early grade reading assessments (EGRA), and PLE candidate preparation.',
    avatarInitials: 'MB',
    accessPasscode: 'PRIM-MUG-2026',
  },
  {
    id: 'staff-05',
    name: 'Nyiraneza Marie Grace',
    role: 'Head of Nursery & Early Childhood (Inshuke Coordinator)',
    department: 'Pre-Primary Section (Baby, Middle, Top)',
    classAssigned: 'Nursery Top Class (P1 Preparation)',
    subjectsTaught: ['Early Reading & Phonics', 'Numbers & Shapes', 'Creative Play'],
    qualification: 'Certificate in Early Childhood Education (ECE)',
    phone: '0788249507',
    email: 'nursery@gssidoremugina.rw',
    bio: 'Passionate early childhood educator coordinating structured play, nutrition monitoring, child welfare, and parent communication for nursery learners.',
    avatarInitials: 'NG',
    accessPasscode: 'NURS-MUG-2026',
  },
  {
    id: 'staff-06',
    name: 'Hakizimana Emmanuel',
    role: 'Dean of Discipline & Student Welfare (Animateur de Discipline)',
    department: 'Student Life, Itorero & Community',
    classAssigned: 'Senior 1 (Stream A)',
    subjectsTaught: ['Social & Civic Studies', 'Itorero ry\'Ishuri & Cultural Arts'],
    qualification: 'B.A. Social Sciences & Psychology',
    phone: '0788249507',
    email: 'discipline@gssidoremugina.rw',
    bio: 'Guiding student character formation, punctual attendance, school feeding order, sports activities, and traditional Rwandan values (Itorero ry\'Ishuri).',
    avatarInitials: 'EH',
    accessPasscode: 'DISC-MUG-2026',
  },
  {
    id: 'staff-07',
    name: 'Bizimana Alphonse',
    role: 'Lead Teacher Lower Primary',
    department: 'Primary Section (P1 - P3)',
    classAssigned: 'Primary 1 (Stream A)',
    subjectsTaught: ['Kinyarwanda Reading', 'Basic Numeracy', 'Writing'],
    qualification: 'A2 Teaching Certificate in Primary Education',
    phone: '0788249507',
    email: 'bizimana.p1@gssidoremugina.rw',
    bio: 'Expert in early grade reading and decodable phonics, leading the classroom literacy sessions with National Library materials.',
    avatarInitials: 'BA',
    accessPasscode: 'LIB-MUG-2026',
  },
  {
    id: 'staff-08',
    name: 'Uwimana Chantal',
    role: 'Upper Primary English & Science Teacher',
    department: 'Primary Section (P4 - P6)',
    classAssigned: 'Primary 4 (Stream C)',
    subjectsTaught: ['English Language', 'Science & Technology (SET)'],
    qualification: 'Diploma in Educational Pedagogy',
    phone: '0788249507',
    email: 'chantal.p4@gssidoremugina.rw',
    bio: 'Supports young learners transitioning to English as a language of instruction, running afternoon reading clubs.',
    avatarInitials: 'UC',
    accessPasscode: 'MATH-MUG-2026',
  }
];

export const E_RESOURCES: EResource[] = [
  {
    id: 'res-ple-math-2025',
    title: 'NESA PLE National Examination Past Paper - Mathematics with Solutions',
    code: 'PLE-MATH-2025',
    level: 'Primary 6 (P6)',
    category: 'past_papers',
    subject: 'Mathematics',
    fileSize: '2.8 MB',
    year: '2025',
    downloads: 2480,
    description: 'Official National Examination paper for Primary Leaving Examination (PLE) with complete step-by-step marking guide and solutions.',
    uploadedBy: 'Headteacher Habiyaremye Charles',
    uploadDate: 'Jan 15, 2026',
    pages: [
      {
        pageNumber: 1,
        heading: 'REPUBLIC OF RWANDA - NESA PLE MATHEMATICS 2025 (SECTION A: 65 MARKS)',
        text: `Instructions: Answer ALL questions in Section A. All working must be clearly shown.\n\nQuestion 1: Evaluate: 48,250 + 13,875 - 9,420.\nSolution: 48,250 + 13,875 = 62,125. Then 62,125 - 9,420 = 52,705. [Answer: 52,705]\n\nQuestion 2: Simplify the fraction: 36/84 to its lowest terms.\nSolution: The Highest Common Factor (HCF) of 36 and 84 is 12.\n36 ÷ 12 = 3; 84 ÷ 12 = 7. [Answer: 3/7]\n\nQuestion 3: A farmer in Mugina harvested 45 bags of beans, each weighing 80 kg. How many total kilograms did the farmer harvest?\nSolution: Total weight = 45 × 80 kg = 3,600 kg. [Answer: 3,600 kg]\n\nQuestion 4: Find the value of x if 3x + 15 = 48.\nSolution: 3x = 48 - 15 => 3x = 33 => x = 11. [Answer: x = 11]`
      },
      {
        pageNumber: 2,
        heading: 'SECTION B: WORD PROBLEMS & GEOMETRY (35 MARKS)',
        text: `Question 5: A rectangular school garden at GS St Isidore Mugina has a length of 24 meters and a perimeter of 76 meters.\n(a) Find the width of the garden.\nFormula: Perimeter = 2 × (Length + Width) => 76 = 2 × (24 + W) => 38 = 24 + W => W = 14 meters. [Answer: 14 m]\n(b) Calculate the total area of the garden.\nArea = Length × Width = 24 m × 14 m = 336 square meters. [Answer: 336 m²]\n\nQuestion 6: At Mugina market, 1 kg of rice costs 1,200 RWF and 1 liter of cooking oil costs 2,500 RWF. If a parent buys 5 kg of rice and 2 liters of oil, how much change will they receive from a 15,000 RWF note?\nSolution:\nCost of rice = 5 × 1,200 RWF = 6,000 RWF.\nCost of oil = 2 × 2,500 RWF = 5,000 RWF.\nTotal cost = 6,000 + 5,000 = 11,000 RWF.\nChange = 15,000 - 11,000 = 4,000 RWF. [Answer: 4,000 RWF]`
      },
      {
        pageNumber: 3,
        heading: 'NATIONAL EXAMINATION MARKING SCHEME & EXAMINER ADVICE',
        text: `General Examiner Feedback for Primary 6 Candidates:\n\n1. Mathematical Notation: Students must write intermediate calculation steps clearly. Marks are awarded for method even if the final arithmetic has a small slip.\n2. Word Problem Translation: When dealing with currency (Rwandan Francs - RWF) or distance (meters/kilometers), always include correct units.\n3. Common Mistakes in 2025: Confusing perimeter with area in composite shapes. Review standard 2D geometric formulas weekly.\n\nEndorsed by: National Examination and School Inspection Authority (NESA) & REB Rwanda.`
      }
    ]
  },
  {
    id: 'res-s3-sci-2025',
    title: 'NESA S3 Ordinary Level National Examination - Physics & Chemistry',
    code: 'S3-SCI-NESA-25',
    level: 'Senior 3 (S3)',
    category: 'past_papers',
    subject: 'Science (Physics & Chemistry)',
    fileSize: '3.6 MB',
    year: '2025',
    downloads: 1950,
    description: 'Complete S3 national examination paper with practical questions, chemical equations, and physics mechanics marking criteria.',
    uploadedBy: 'Dean of Studies Mugabo Jean Damascene',
    uploadDate: 'Feb 2, 2026',
    pages: [
      {
        pageNumber: 1,
        heading: 'PART 1: PHYSICS & APPLIED MECHANICS (50 MARKS)',
        text: `Question 1: Define Velocity and distinguish it from Speed.\nModel Answer: Speed is the rate of change of distance (scalar quantity, magnitude only). Velocity is the rate of change of displacement in a specified direction (vector quantity, magnitude and direction). [Unit: m/s]\n\nQuestion 2: A motorcycle travelling from Mugina to Kamonyi accelerates uniformly from rest to 20 m/s in 8 seconds. Calculate:\n(a) Acceleration: a = (v - u) / t = (20 - 0) / 8 = 2.5 m/s².\n(b) Total distance covered: s = ut + 0.5at² = 0 + 0.5 × 2.5 × 64 = 80 meters.\n\nQuestion 3: State Archimedes' Principle and explain how a ship made of steel floats on Lake Kivu.\nModel Answer: Archimedes' principle states that when a body is completely or partially immersed in a fluid, it experiences an upthrust equal to the weight of the fluid displaced. Steel ships float because their hollow hull displaces a large volume of water whose weight is equal to the ship's weight.`
      },
      {
        pageNumber: 2,
        heading: 'PART 2: CHEMISTRY & ENVIRONMENTAL SCIENCE (50 MARKS)',
        text: `Question 4: Balancing Chemical Equations:\n(a) Balance the reaction between hydrochloric acid and calcium carbonate:\n2HCl(aq) + CaCO3(s) -> CaCl2(aq) + H2O(l) + CO2(g)\n(b) What gas is evolved? State the test to confirm this gas.\nAnswer: Carbon dioxide (CO2). Test: Pass the gas through clear limewater (calcium hydroxide solution); it turns milky/cloudy.\n\nQuestion 5: Periodic Table & Atomic Structure:\nAn element X has atomic number 12 and mass number 24.\n(a) Write the electronic configuration of X: 2.8.2\n(b) State the group and period of X: Group II, Period 3.\n(c) Predict the formula of its oxide: XO (Magnesium Oxide - MgO).`
      }
    ]
  },
  {
    id: 'res-lit-rcaha-01',
    title: 'Rwanda Cultural Heritage Academy (Inteko y\'Umuco) - Ibisigo n\'Imigani Readers',
    code: 'RCHA-LIT-P3P6',
    level: 'P3 - P6 Primary',
    category: 'literacy',
    subject: 'Kinyarwanda & Cultural Literacy',
    fileSize: '4.2 MB',
    year: '2026',
    downloads: 3120,
    description: 'Curated traditional and modern Rwandan stories, proverbs, and poetry developed in partnership with the National Library Services to foster fluent reading.',
    uploadedBy: 'Headteacher Habiyaremye Charles',
    uploadDate: 'Mar 18, 2026',
    pages: [
      {
        pageNumber: 1,
        heading: 'IGIKOMBE CY\'UBUMENYI: UMUGANI W\'IMPYISI N\'INTAMA (P3 - P6)',
        text: `Kera habayeho umunsi mukuru w'inyamaswa ku musozi wa Mugina. Inyamaswa zose zateraniye hamwe mu mwuka w'amahoro n'ubusabane.\n\nIntama yari intungane, yicaye ku kiyaga inywa amazi meza y'isoko. Impyisi iza yiruka ivuga iti: "Kuki wanduza amazi yanjye nywaho?" Intama irasubiza ituje iti: "Nyagasani, amazi atemba ava aho uri aza aho ndi, sinshobora kuyanduza."\n\nImpyisi yabuze icyo isubiza, iravuga iti: "Ariko se umwaka ushize warantutse!" Intama iti: "Umwaka ushize sinari nakavutse, mfite amezi atandatu gusa!"\n\nInyigisho y'uyu mugani: "Ubugome n'uburyarya ntibushobora gutsinda ukuri. Umuntu w'ubupfura aharanira ukuri n'ubutabera igihe cyose."`
      },
      {
        pageNumber: 2,
        heading: 'IBIBAZO BYO GUSUZUMA INYANDIKO N\'AMAGAMBO MASHYA',
        text: `Amagambo mashya:\n1. Ubupfura: Indangagaciro yo kwitwara neza, kubaha abandi no kutarenganya umuntu.\n2. Isoko: Aho amazi meza aturuka mu butaka.\n3. Ubusabane: Umubano mwiza hagati y'abantu mu muryango.\n\nIbibazo byo gusubiza:\n1. Kuki intama itashoboraga kwanduza amazi y'impyisi?\n2. Niyihe ndangagaciro umunyeshuri wa GS St Isidore Mugina akwiye gukuramo?\n3. Andika interuro ebyiri ukoresheje ijambo "ubupfura".\n\nIbi bitabo byateguwe n'Inteko y'Umuco (Rwanda Cultural Heritage Academy) bifatanyije na Serivisi y'Isomero ry'Igihugu (National Library Services).`
      }
    ]
  },
  {
    id: 'res-ple-set-2025',
    title: 'Science and Elementary Technology (SET) Revision Booklet & Diagrams',
    code: 'PLE-SET-REV-26',
    level: 'Primary 5 & 6',
    category: 'notes',
    subject: 'Science & Technology',
    fileSize: '5.1 MB',
    year: '2026',
    downloads: 2840,
    description: 'Illustrated guide covering simple machines, agriculture, electricity, human anatomy, water cycle, and environmental conservation.',
    uploadedBy: 'Mukamurenzi Beatrice (Head of Primary)',
    uploadDate: 'Feb 10, 2026',
    pages: [
      {
        pageNumber: 1,
        heading: 'PRIMARY 5 & 6 SET: SIMPLE MACHINES & AGRICULTURAL TOOLS',
        text: `1. Classes of Levers:\n- First Class Lever: Fulcrum is between Effort and Load (e.g., Crowbar, Scissors, Pliers).\n- Second Class Lever: Load is between Fulcrum and Effort (e.g., Wheelbarrow, Nutcracker).\n- Third Class Lever: Effort is between Fulcrum and Load (e.g., Fishing rod, Tweezers, Broom).\n\n2. Soil Conservation in Rwanda:\n- Terracing (Amaterasi y'indinganire): Cutting steps into steep hills to prevent erosion.\n- Planting anti-erosion grasses (Radier / Pennisetum) along ridges.\n- Mulching (Gusasira) to preserve moisture and enrich topsoil.\n- Agroforestry: Planting nitrogen-fixing trees alongside crops.`
      }
    ]
  },
  {
    id: 'res-s3-math-cbc',
    title: 'S1 - S3 Mathematics CBC Competency Modules & Worksheets',
    code: 'O-MTH-COMP-26',
    level: 'Senior 1 to 3',
    category: 'curriculum',
    subject: 'Mathematics',
    fileSize: '4.7 MB',
    year: '2026',
    downloads: 1670,
    description: 'Comprehensive algebra, geometry, probability, vectors, and trigonometry exercises aligned with REB national syllabus.',
    uploadedBy: 'Dean of Studies Mugabo Jean Damascene',
    uploadDate: 'Jan 28, 2026',
    pages: [
      {
        pageNumber: 1,
        heading: 'S1-S3 ALGEBRA & SIMULTANEOUS LINEAR EQUATIONS',
        text: `Solving by Substitution Method:\nGiven:\n1) 2x + y = 14\n2) 3x - 2y = 7\n\nStep 1: From equation (1), express y in terms of x:\ny = 14 - 2x\n\nStep 2: Substitute into equation (2):\n3x - 2(14 - 2x) = 7\n3x - 28 + 4x = 7\n7x = 35 => x = 5\n\nStep 3: Find y:\ny = 14 - 2(5) = 4\nSolution: (x = 5, y = 4)`
      }
    ]
  },
  {
    id: 'res-lit-early-p1',
    title: 'Lower Primary Decodable Phonics & Reading Cards (Kinyarwanda & English)',
    code: 'LIT-P1P2-PHONICS',
    level: 'P1 - P2 & Nursery',
    category: 'literacy',
    subject: 'Foundational Literacy',
    fileSize: '3.1 MB',
    year: '2026',
    downloads: 3450,
    description: 'Phonics cards, letter sounds, word blends, and leveled picture stories to assist teachers and parents with home reading.',
    uploadedBy: 'Bizimana Alphonse (P1 Lead Teacher)',
    uploadDate: 'Mar 1, 2026',
    pages: [
      {
        pageNumber: 1,
        heading: 'INJYA N\'AMANYARWANDA: IMISOMERE Y\'IBINYAMUGOGO (P1 & INSHUKE)',
        text: `Inyuguti n'amasano yazo:\nA - B - C - D - E - F - G - H - I - J - K - L - M - N - O - P - R - S - T - U - V - W - Y - Z\n\nIbisomwa by'umunsi:\n- Ba - Be - Bi - Bo - Bu\n- Da - De - Di - Do - Du\n- Ka - Ke - Ki - Ko - Ku\n\nInteruro zoroshye zo gusoma:\n1. Dada aragura ikaramu.\n2. Keza asoma igitabo mu isomero.\n3. Ishuri rya Mugina rirasa neza.`
      }
    ]
  }
];

export const MOCK_STUDENTS: Record<string, StudentResult> = {
  // S3 Candidate
  'MUG-2026-S3B-01': {
    regNumber: 'MUG-2026-S3B-01',
    studentName: 'Keza Divine',
    program: 'Secondary Education (Ordinary Level)',
    level: 'Senior 3',
    stream: 'Stream B (S3: B)',
    academicYear: '2025 - 2026',
    term: 'Term 2',
    overallPercentage: 89.2,
    rank: '1st / 57 Students',
    conduct: 'Distinction (19/20 - Tres Bien)',
    attendanceRate: 99,
    classTeacher: 'M. Mugabo Jean Damascene',
    subjects: [
      { name: 'Mathematics', code: 'MTH301', maxScore: 100, score: 94, grade: 'A', remarks: 'Outstanding analytical skills' },
      { name: 'Physics', code: 'PHY301', maxScore: 100, score: 91, grade: 'A', remarks: 'Superb mechanics and circuits' },
      { name: 'Chemistry', code: 'CHM301', maxScore: 100, score: 88, grade: 'A', remarks: 'Accurate practical lab notes' },
      { name: 'Biology', code: 'BIO301', maxScore: 100, score: 86, grade: 'A', remarks: 'Great grasp of physiology' },
      { name: 'English Language', code: 'ENG301', maxScore: 100, score: 90, grade: 'A', remarks: 'Fluent comprehension & essay' },
      { name: 'Kinyarwanda', code: 'KIN301', maxScore: 100, score: 92, grade: 'A', remarks: 'Imyandikire n\'ubusizi bihebuje' },
      { name: 'Geography & History', code: 'SOC301', maxScore: 100, score: 84, grade: 'B+', remarks: 'Strong essay writing' },
      { name: 'ICT / Computer Skills', code: 'ICT301', maxScore: 100, score: 89, grade: 'A', remarks: 'Mastery of office & coding' },
    ],
    generalComments: 'Divine is exceptionally hardworking and disciplined. Ready for top-grade national NESA exam success.'
  },
  // S1 Student
  'MUG-2026-S1A-14': {
    regNumber: 'MUG-2026-S1A-14',
    studentName: 'Mugisha Jean de Dieu',
    program: 'Secondary Education (Ordinary Level)',
    level: 'Senior 1',
    stream: 'Stream A (S1: A)',
    academicYear: '2025 - 2026',
    term: 'Term 2',
    overallPercentage: 83.5,
    rank: '4th / 55 Students',
    conduct: 'Excellent (18/20)',
    attendanceRate: 96,
    classTeacher: 'Mme. Mukankusi Vestine',
    subjects: [
      { name: 'Mathematics', code: 'MTH101', maxScore: 100, score: 85, grade: 'A', remarks: 'Solid algebraic foundation' },
      { name: 'Physics & Chemistry', code: 'SCI101', maxScore: 100, score: 82, grade: 'B+', remarks: 'Active in science demos' },
      { name: 'Biology', code: 'BIO101', maxScore: 100, score: 81, grade: 'B+', remarks: 'Consistent homework submission' },
      { name: 'English Language', code: 'ENG101', maxScore: 100, score: 84, grade: 'B+', remarks: 'Rapid spoken progress' },
      { name: 'Kinyarwanda', code: 'KIN101', maxScore: 100, score: 89, grade: 'A', remarks: 'Ururimi runoze' },
      { name: 'Social Studies & Itorero', code: 'SST101', maxScore: 100, score: 80, grade: 'B+', remarks: 'Exemplary cultural discipline' },
    ],
    generalComments: 'Jean de Dieu made an excellent transition from Primary to Secondary. He respects school leadership and mentors younger learners.'
  },
  // P6 Candidate
  'MUG-2026-P6A-08': {
    regNumber: 'MUG-2026-P6A-08',
    studentName: 'Uwase Ange Marie',
    program: 'Primary Education (Amashuri Abanza)',
    level: 'Primary 6 (PLE Candidate)',
    stream: 'Stream A (P6: A)',
    academicYear: '2025 - 2026',
    term: 'Term 2',
    overallPercentage: 93.4,
    rank: '1st / 55 Students',
    conduct: 'Distinction (20/20)',
    attendanceRate: 100,
    classTeacher: 'M. Habineza Pierre',
    subjects: [
      { name: 'Mathematics', code: 'PMTH601', maxScore: 100, score: 96, grade: 'A', remarks: 'Flawless calculation and speed' },
      { name: 'Science & Elementary Tech (SET)', code: 'PSET601', maxScore: 100, score: 94, grade: 'A', remarks: 'Exceptional technology concepts' },
      { name: 'Social Studies', code: 'PSST601', maxScore: 100, score: 91, grade: 'A', remarks: 'Thorough Rwandan geography' },
      { name: 'English Language', code: 'PENG601', maxScore: 100, score: 92, grade: 'A', remarks: 'Extensive reading vocabulary' },
      { name: 'Kinyarwanda', code: 'PKIN601', maxScore: 100, score: 95, grade: 'A', remarks: 'Inyandiko n\'imvugo binoze' },
    ],
    generalComments: 'Ange Marie is the top PLE candidate in Kamonyi District. She reads daily in our library and assists her classmates.'
  },
  // P4 Student
  'MUG-2026-P4C-22': {
    regNumber: 'MUG-2026-P4C-22',
    studentName: 'Habimana Patrick',
    program: 'Primary Education (Amashuri Abanza)',
    level: 'Primary 4',
    stream: 'Stream C (P4: C)',
    academicYear: '2025 - 2026',
    term: 'Term 2',
    overallPercentage: 81.6,
    rank: '5th / 49 Students',
    conduct: 'Very Good (17/20)',
    attendanceRate: 95,
    classTeacher: 'Mme. Uwimana Chantal',
    subjects: [
      { name: 'Mathematics', code: 'PMTH401', maxScore: 100, score: 82, grade: 'B+', remarks: 'Good multiplication & fractions' },
      { name: 'Science & Technology', code: 'PSET401', maxScore: 100, score: 84, grade: 'B+', remarks: 'Loves science experiments' },
      { name: 'Social Studies', code: 'PSST401', maxScore: 100, score: 79, grade: 'B', remarks: 'Good knowledge of Kamonyi district' },
      { name: 'English Language', code: 'PENG401', maxScore: 100, score: 80, grade: 'B+', remarks: 'Growing confident reader' },
      { name: 'Kinyarwanda', code: 'PKIN401', maxScore: 100, score: 85, grade: 'A-', remarks: 'Soma neza kandi vuba' },
    ],
    generalComments: 'Patrick shows marked improvement in English reading. Continue attending the afternoon reading club!'
  },
  // Nursery Top Class
  'MUG-2026-NUR-05': {
    regNumber: 'MUG-2026-NUR-05',
    studentName: 'Manzi Kevin',
    program: 'Pre-Primary (Amashuri y\'Inshuke)',
    level: 'Nursery',
    stream: 'Top Class',
    academicYear: '2025 - 2026',
    term: 'Term 2',
    overallPercentage: 90.0,
    rank: 'Graduating to P1',
    conduct: 'Excellent (19/20)',
    attendanceRate: 98,
    classTeacher: 'Mme. Nyiraneza Marie Grace',
    subjects: [
      { name: 'Early Language & Phonics', code: 'NUR01', maxScore: 100, score: 92, grade: 'A', remarks: 'Recognizes letters and sounds' },
      { name: 'Numbers & Shapes', code: 'NUR02', maxScore: 100, score: 90, grade: 'A', remarks: 'Counts 1 to 50 with confidence' },
      { name: 'Discovery & Environmental Play', code: 'NUR03', maxScore: 100, score: 88, grade: 'A', remarks: 'Very inquisitive and polite' },
      { name: 'Creative Arts & Music', code: 'NUR04', maxScore: 100, score: 91, grade: 'A', remarks: 'Loves drawing and singing' },
      { name: 'Motor Skills & Hygiene', code: 'NUR05', maxScore: 100, score: 89, grade: 'A', remarks: 'Independent and helpful' },
    ],
    generalComments: 'Kevin is fully prepared and excited to enter Primary 1 Stream A next academic year. Congratulations!'
  }
};

export const NEWS_ANNOUNCEMENTS: NewsItem[] = [
  {
    id: 'news-lit-visit',
    title: 'GS St Isidore Mugina Delegation Visits National Library Services',
    date: 'March 20, 2026',
    category: 'Literacy & Cultural Heritage',
    summary: 'School leadership led by Headteacher Habiyaremye Charles visited the National Library Services under the Rwanda Cultural Heritage Academy to expand children’s books and reading resources.',
    content: 'In line with our priority to cultivate deep literacy across all Nursery, Primary (P1-P6), and Secondary (S1-S3) streams, the administration and Parent-Teacher Committee of GS St Isidore Mugina conducted an institutional study visit to the National Library Services in Kigali. The collaboration will supply our campus library with hundreds of new decodable reading titles in Kinyarwanda and English, enriching our daily school reading periods.',
    author: 'Habiyaremye Charles (Headteacher)'
  },
  {
    id: 'news-admissions-open',
    title: 'Admissions Open for 2026/2027: Nursery, Primary (P1-P6) & Secondary (S1-S3)',
    date: 'March 14, 2026',
    category: 'Admissions',
    summary: 'Registration is open for Day Scholars across all 18 streams: Nursery (Baby, Middle, Top), Primary P1 to P6 (A, B, C), and Secondary S1 to S3 (A, B, C).',
    content: 'Parents seeking enrollment in our inclusive day school for their children are invited to submit applications either online or directly with Bursar Letitia at the school office in Mugina. Government capitation grant subsidies apply, ensuring affordable education for all families.',
    author: 'Letitia (Comptable / Bursary)'
  },
  {
    id: 'news-ple-success',
    title: 'Outstanding Performance in National Examinations: 98.4% Pass Rate',
    date: 'February 10, 2026',
    category: 'Academic Excellence',
    summary: 'P6 PLE candidates and S3 National Examination candidates recorded top marks in Kamonyi District with over 70% in Division 1 & 2.',
    content: 'We applaud our dedicated teachers across Primary and Secondary for their tireless pedagogical devotion. All candidates qualified for continued secondary education, with our top students receiving merit certificates from Kamonyi District Education Office.',
    author: 'Office of Studies (D.O.S & Primary)'
  }
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 'evt-01',
    title: 'Parent-Teacher Association (PTA) General Assembly & School Feeding Review',
    date: 'Saturday, April 18, 2026',
    time: '08:30 AM - 12:30 PM',
    location: 'Main Assembly Hall, Mugina Campus',
    category: 'Community',
    description: 'Discussion with parents regarding children’s reading progress, school feeding program (Gahunda yo kugaburira abana ku ishuri), and classroom infrastructure.'
  },
  {
    id: 'evt-02',
    title: 'Inter-Stream Literacy & Public Speaking Championship',
    date: 'Friday, May 15, 2026',
    time: '01:30 PM - 04:30 PM',
    location: 'Mugina School Library & Central Courtyard',
    category: 'Literacy',
    description: 'Reading, storytelling, and spelling competitions across Nursery, Lower Primary (P1-P3), Upper Primary (P4-P6), and S1-S3 debates.'
  },
  {
    id: 'evt-03',
    title: 'Kamonyi District Inter-School Primary & Secondary Sports Games',
    date: 'Saturday, June 6, 2026',
    time: '09:00 AM - 04:00 PM',
    location: 'GS St Isidore Mugina Sports Grounds',
    category: 'Sports',
    description: 'Volleyball, football, and traditional dance (Itorero ry\'Ishuri) friendly matches with neighboring schools in Mugina sector.'
  }
];

export const FEE_STRUCTURE_DATA = {
  academicYear: '2026',
  currency: 'RWF',
  schoolType: 'Inclusive Day School (Government-Aided / Sous convention Catholique)',
  subsidyNote: 'Tuition is heavily subsidized by the Government of Rwanda through REB/MINEDUC Capitation Grants.',
  cycles: {
    nursery: {
      name: 'Pre-Primary / Nursery (Baby, Middle, Top)',
      tuition: 0, // Government-subsidized
      schoolFeedingLunch: 18000,
      learningMaterialsAndPlay: 7000,
      ptaDevelopmentFund: 5000,
      totalPerTerm: 30000,
    },
    primary: {
      name: 'Primary Education (P1 to P6)',
      tuition: 0, // Government-subsidized
      schoolFeedingLunch: 22000, // Gahunda yo kugaburira abana ku ishuri
      examAndLiteracyFund: 5000,
      ptaDevelopmentFund: 5000,
      totalPerTerm: 32000,
    },
    secondary: {
      name: 'Secondary Education (Ordinary Level S1 to S3)',
      tuition: 0, // Government-subsidized
      schoolFeedingLunch: 28000,
      laboratoryAndICTFund: 7000,
      ptaDevelopmentFund: 5000,
      totalPerTerm: 40000,
    }
  },
  newStudentStarterPack: {
    registrationFee: 2000,
    schoolUniformSets: 14000,
    sportsAndItoreroTshirt: 6000,
    studentIdCardAndBadge: 2000,
    totalOneTime: 24000,
  }
};
