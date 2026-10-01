import { Language } from '../types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.streams': 'Classes & Streams',
    'nav.elearning': 'Library & E-Learning',
    'nav.fees': 'Fees & School Lunch',
    'nav.staff': 'Leadership & Staff',
    'nav.admissions': 'Admissions',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.portal': 'Results Portal',
    'nav.apply': 'Apply Online',
    'nav.subtitle': 'Mugina Sector · Kamonyi District',

    // Hero
    'hero.badge': 'Government-Aided Day School · Catholic Diocese of Kabgayi · Kamonyi, Rwanda',
    'hero.title': 'Nurturing Young Minds from Nursery & Primary to Ordinary Level.',
    'hero.description': 'Welcome to GS St Isidore Mugina. Providing inclusive, quality day-school education across 18 classroom streams: Nursery (Baby to Top), Primary (P1 to P6), and Secondary (S1 to S3) in strong partnership with the Catholic Church and MINEDUC.',
    'hero.cta.apply': 'Enroll for 2026/2027',
    'hero.cta.streams': 'Explore 18 Class Streams',
    'hero.cta.library': 'Digital Library & PLE Papers',
    'hero.cta.portal': 'Results Portal',
    'hero.stat.streams': '18 Active Classroom Streams',
    'hero.stat.literacy': 'National Library Literacy Program',
    'hero.stat.lunch': 'Nutritious School Feeding Program',

    // Staff
    'staff.title': 'Teachers, Assigned Classes & Subjects',
    'staff.subtitle': 'Directed by Headteacher Habiyaremye Charles and Bursar Letitia (Comptable). Every teacher is assigned to specific classroom streams and subjects to guarantee high educational discipline.',
    'staff.adminBtn': 'Headteacher Staff Portal',
    'staff.manageBtn': 'Manage Teachers (Headteacher Workspace)',
    'staff.updatePhoto': 'Update Photo',
    'staff.changePhoto': 'Change profile picture',

    // Footer
    'footer.motto': 'Academic Excellence, Christian Values & High Discipline',
  },
  rw: {
    // Navbar
    'nav.home': 'Ahabanza',
    'nav.about': 'Ibyerekeye Ishuri',
    'nav.streams': 'Ibyiciro n\'Amashuri',
    'nav.elearning': 'Isomero & E-Learning',
    'nav.fees': 'Amafaranga & Ifunguro',
    'nav.staff': 'Ubuyobozi & Abarimu',
    'nav.admissions': 'Kwiyandikisha',
    'nav.faq': 'Ibibazo Bikunze Kubazwa',
    'nav.contact': 'Twandikire',
    'nav.portal': 'Amanota y\'Abanyeshuri',
    'nav.apply': 'Iyandikishe Nonaha',
    'nav.subtitle': 'Umurenge wa Mugina · Akarere ka Kamonyi',

    // Hero
    'hero.badge': 'Ishuri ry\'Ubufatanye na Leta · Diyosezi Gatolika ya Kabgayi · Kamonyi, u Rwanda',
    'hero.title': 'Kurerera u Rwanda guhera mu Kiciro cy\'Inshuke, Abanza kugeza mu Cyiciro Rusange cy\'Ayisumbuye.',
    'hero.description': 'Murakaza neza kuri GS Saint Isidore Mugina. Dutanga uburezi bufite ireme mu byiciro 18 by\'amashuri: Inshuke (Baby kugeza Top), Abanza (P1 kugeza P6), n\'Icyiciro Rusange cy\'Ayisumbuye (S1 kugeza S3) ku bufatanye bwa Kiliziya Gatolika na MINEDUC.',
    'hero.cta.apply': 'Iyandikishe 2026/2027',
    'hero.cta.streams': 'Reba Ibyiciro 18 by\'Amashuri',
    'hero.cta.library': 'Isomero & Ibizamini bya Leta',
    'hero.cta.portal': 'Reba Amanota',
    'hero.stat.streams': 'Ibyiciro 18 by\'Amashuri Akora',
    'hero.stat.literacy': 'Gahunda yo Gusoma no Kwandika',
    'hero.stat.lunch': 'Gahunda yo Kugaburira Abana ku Ishuri',

    // Staff
    'staff.title': 'Abarimu, Amashuri n\'Amasomo Bashinzwe',
    'staff.subtitle': 'Biyobowe n\'Umuyobozi w\'Ishuri Habiyaremye Charles n\'Umucungamutungo Letitia (Comptable). Buri mwarimu ashinzwe ishuri n\'amasomo byihariye hagamijwe ikinyabupfura n\'intsinzi.',
    'staff.adminBtn': 'Urubuga rw\'Umuyobozi',
    'staff.manageBtn': 'Gucunga Abarimu (Umuyobozi)',
    'staff.updatePhoto': 'Hindura Ifoto',
    'staff.changePhoto': 'Shyiraho ifoto y\'umwarimu',

    // Footer
    'footer.motto': 'Ubumenyi nyabwo, Indangagaciro za Gikristu n\'Ikinyabupfura',
  },
  fr: {
    // Navbar
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.streams': 'Classes & Filières',
    'nav.elearning': 'Bibliothèque & E-Learning',
    'nav.fees': 'Frais & Cantine',
    'nav.staff': 'Direction & Enseignants',
    'nav.admissions': 'Inscriptions',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.portal': 'Portail Résultats',
    'nav.apply': 'Postuler en Ligne',
    'nav.subtitle': 'Secteur Mugina · District de Kamonyi',

    // Hero
    'hero.badge': 'École Conventionnée Catholique · Diocèse de Kabgayi · District de Kamonyi',
    'hero.title': 'Former les jeunes esprits de la Maternelle et du Primaire jusqu\'au Tronc Commun.',
    'hero.description': 'Bienvenue au GS Saint Isidore Mugina. Offrant un enseignement inclusif de qualité à travers 18 filières : Maternelle, Primaire (P1 à P6) et Secondaire (S1 à S3) en partenariat avec l\'Église Catholique et le MINEDUC.',
    'hero.cta.apply': 'Inscriptions 2026/2027',
    'hero.cta.streams': 'Explorer 18 Filières',
    'hero.cta.library': 'Bibliothèque & Épreuves PLE',
    'hero.cta.portal': 'Portail Résultats',
    'hero.stat.streams': '18 Filières Actives',
    'hero.stat.literacy': 'Partenariat National de Lecture',
    'hero.stat.lunch': 'Programme de Cantine Scolaire Équilibrée',

    // Staff
    'staff.title': 'Enseignants, Classes & Matières Assignées',
    'staff.subtitle': 'Dirigé par le Préfet Habiyaremye Charles et la Comptable Letitia. Chaque enseignant est assigné à des classes et des cours spécifiques pour garantir une discipline exemplaire.',
    'staff.adminBtn': 'Portail Direction',
    'staff.manageBtn': 'Gérer le Personnel (Directeur)',
    'staff.updatePhoto': 'Changer Photo',
    'staff.changePhoto': 'Mettre à jour la photo de profil',

    // Footer
    'footer.motto': 'Excellence Académique, Valeurs Chrétiennes & Haute Discipline',
  },
};
