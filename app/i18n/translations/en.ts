import { Translation } from './pt';

export const en: Translation = {
  // Navigation
  nav: {
    aboutUs: 'ABOUT US',
    services: 'Services',
    contactUs: 'Contact Us',
    clients: 'CLIENTS',
    partners: 'PARTNERS',
    gallery: 'GALLERY',
  },
  
  // Hero
  hero: {
    title: 'Atlântico',
    subtitle: 'Underwater Technical Services',
    logoAlt: 'Atlântico Logo',
  },
  
  // Services
  services: {
    title: 'Our Services',
    categories: {
      structural: 'Structural Recovery',
      ships: 'Ships and Platforms',
      survey: 'Survey and Recording',
      hydroelectric: 'Hydroelectric Plants and Dams',
      inspection: 'Inspection and Survey',
      dredging: 'Dredging and Sounding',
      rescue: 'Rescue and Salvage',
      diving: 'Specialized Diving',
      pipelines: 'Underwater Pipelines and Cables',
      water: 'Water Treatment',
    },
    learnMore: 'LEARN MORE',
  },
  
  // About Us
  about: {
    title: 'About Us',
    paragraph1: 'Since 2008, Atlântico Underwater Technical Services has turned knowledge and experience into solutions for underwater operations. What began in a small office has grown over more than 18 years through the dedication of a specialized team.',
    paragraph2: 'We work in ports, hydroelectric plants, dams, bridges, vessels, sanitation and industrial infrastructure, supporting projects in different Brazilian states.',
    paragraph3: 'Planning, qualified professionals, technology and a focus on safety guide every operation. We are committed to responsive, responsible service that respects our clients, people and the environment.',
  },
  institutional: {
    history: {
      title: 'Our history and experience',
      subtitle: 'Technical expertise built in the field since 2008.',
      paragraphs: [
        'Over nearly two decades, Atlântico has expanded its work and built experience in underwater technical services for different infrastructure sectors.',
        'Our team works in port, maritime, river and industrial environments, supporting clients with inspections, maintenance, structural recovery, dredging, surveys and special operations.',
        'Each project is prepared with planning, trained professionals and resources suited to the operation, with a focus on responsiveness, safety, quality and environmental responsibility.'
      ],
      experience: '18+ years of experience'
    },
    principles: {
      title: 'Mission, vision and values',
      cards: [
        {
          title: 'Mission',
          description: 'Create value for our clients through knowledge, process innovation and the application of technology.'
        },
        {
          title: 'Vision',
          description: 'Be a leading company through agile, technically differentiated services.'
        },
        {
          title: 'Values',
          description: 'Maintain transparent relationships, honor commitments, respect and value people, and preserve and sustain the environment.'
        }
      ]
    },
    certifications: {
      title: 'Certifications and qualifications',
      subtitle: 'Credentials that reinforce Atlântico’s commitment to its clients and operations.',
      jvcTitle: 'JVC certification',
      jvcDescription: 'JVC certification is highlighted among Atlântico’s institutional credentials.',
      fcemTitle: 'FCEM qualification',
      fcemDescription: 'The company is qualified by FCEM to provide underwater technical services.'
    },
    structure: {
      title: 'Operational structure',
      subtitle: 'Vehicles, equipment and tools supporting underwater operations.',
      cards: [
        {
          title: 'Support vehicles',
          description: 'Support fleet for team travel, mobilization and material transport.',
          items: ['Support trucks', 'Vans and utility vehicles', 'Logistics for different work sites']
        },
        {
          title: 'Diving equipment',
          description: 'Systems supporting and controlling professional diving operations.',
          items: ['Air compressors and cylinders', 'Decompression chambers', 'Control and communication panels']
        },
        {
          title: 'Tools and inspection',
          description: 'Resources for inspecting, maintaining and intervening in submerged structures.',
          items: ['Underwater cameras and lighting', 'Pneumatic and hydraulic tools', 'Underwater cutting and welding equipment']
        }
      ]
    },
    coverage: {
      title: 'Where we work',
      subtitle: 'Headquartered in Santos, serving projects throughout Brazil.',
      regionsTitle: 'Regions served',
      regions: ['North', 'Northeast', 'Central-West', 'Southeast', 'South'],
      citiesTitle: 'Offices and project locations',
      cities: ['Santos/SP — headquarters', 'Casa Branca/SP — branch', 'Florianópolis/SC', 'Belém/PA', 'Rondonópolis/MT', 'Porto Ferreira/SP'],
      mapAlt: 'Map of Brazil showing Atlântico project locations across all regions.',
      locationTitle: 'Head office',
      locationAddress: 'Rua Bittencourt, 25 — Vila Nova, Santos/SP, Brazil',
      mapLink: 'Open location in Google Maps'
    }
  },
  
  // Clients
  clients: {
    title: 'Our Clients',
    list: {
      '4s': { name: '4S ENGENHARIA', desc: 'Root pile monitoring and structural inspection' },
      'ageo': { name: 'AGEO', desc: 'Water intake system inspection at port terminal' },
      'alianca': { name: 'ALIANÇA ENERGIA', desc: 'Hydroelectric plant maintenance and repairs' },
      'aratu': { name: 'ARATU ENERGIA', desc: 'Support for underwater maintenance and repairs' },
      'att': { name: 'AT&T ENERGIA', desc: 'Hydroelectric plant maintenance' },
      'auren': { name: 'AUREN', desc: 'Specialized energy services' },
      'axxo': { name: 'AXXO', desc: 'Santos Brasil Terminal expansion' },
      'bracell': { name: 'BRACELL', desc: 'Water control gate installation' },
      'brk': { name: 'BRK AMBIENTAL', desc: 'Multiple sanitation projects' },
      'btp': { name: 'BTP', desc: 'Santos port terminal inspections' },
      'camargo': { name: 'CAMARGO CORRÊA', desc: 'Bridge structural inspection' },
      'cemig': { name: 'CEMIG', desc: 'Power plant maintenance in Minas Gerais' },
      'cgh-cascata': { name: 'CGH CASCATA', desc: 'Grid cleaning and inspection' },
      'cgh-sardoa': { name: 'CGH SARDOÁ', desc: 'Power plant bathymetric survey' },
      'chip': { name: 'CHIP BELÉM', desc: 'Collapsed bridge rescue' },
      'cli': { name: 'CLI', desc: 'Topobathymetry and underwater cutting' },
      'clube': { name: 'CLUBE INT. REGATAS', desc: 'Nautical berths dredging Guarujá' },
      'cma': { name: 'CMA CGM', desc: 'Technical vessel lifting' },
      'codesp': { name: 'CODESP', desc: 'Sunken vessel rescue' },
      'cofco': { name: 'COFCO', desc: 'Complete port terminal inspection' },
      'swiss': { name: 'SWISS PARK', desc: 'Gate system inspection' },
      'consorcio': { name: 'CONSÓRCIO PAULITEC', desc: 'Barreiros Bridge recovery' },
      'ctg': { name: 'CTG BRASIL', desc: '14 hydroelectric plants - Contract 2024/2025' },
      'cutrale': { name: 'CUTRALE', desc: 'Juice terminal - Cathodic protection' },
      'dae': { name: 'DAE', desc: 'Sanitation services' },
      'copersucar': { name: 'COPERSUCAR', desc: 'Atlântico client for underwater technical services' },
      'dow': { name: 'DOW QUÍMICA', desc: 'Atlântico client for underwater technical services' },
      'finger-sommer': { name: 'FINGER & SOMMER', desc: 'Atlântico client for underwater technical services' },
      'guanhaes': { name: 'GUANHÃES ENERGIA', desc: 'Atlântico client for underwater technical services' },
      'intenge': { name: 'INTENGE', desc: 'Atlântico client for underwater technical services' },
      'natura': { name: 'NATURA', desc: 'Atlântico client for underwater technical services' },
      'aps': { name: 'APS', desc: 'Atlântico client for underwater technical services' },
      'petrobras': { name: 'PETROBRAS', desc: 'Atlântico client for underwater technical services' },
      'piatec': { name: 'PIATEC', desc: 'Atlântico client for underwater technical services' },
      'porto-acu': { name: 'PORTO DO AÇU', desc: 'Atlântico client for underwater technical services' },
      'retrofit': { name: 'RETROFIT', desc: 'Atlântico client for underwater technical services' },
      'sabesp': { name: 'SABESP', desc: 'Atlântico client for underwater technical services' },
      'santos-brasil': { name: 'SANTOS BRASIL', desc: 'Atlântico client for underwater technical services' },
      'transpetro': { name: 'TRANSPETRO', desc: 'Atlântico client for underwater technical services' },
      'vopak': { name: 'VOPAK', desc: 'Atlântico client for underwater technical services' },
      'yara': { name: 'YARA', desc: 'Atlântico client for underwater technical services' }
    }
  },
  
  // Partners
  partners: {
    title: 'Partners',
  },
  
  // Gallery
  gallery: {
    title: 'Gallery',
  },
  
  // Contact
  contact: {
    title: 'Contact Us',
    form: {
      companyName: 'COMPANY NAME',
      yourName: 'YOUR NAME',
      companySite: 'COMPANY WEBSITE',
      yourEmail: 'YOUR EMAIL',
      state: 'STATE',
      states: {
        sp: 'São Paulo',
        rj: 'Rio de Janeiro',
        es: 'Espírito Santo',
        pr: 'Paraná',
        sc: 'Santa Catarina',
        others: 'Others',
      },
      phone: 'YOUR PHONE',
      city: 'CITY',
      serviceType: 'SERVICE TYPE',
      others: 'Others',
      submit: 'SUBMIT',
    },
  },
  
  // Footer
  footer: {
    address: 'Bittencourt Street, 25',
    addressLine2: 'Vila Nova - Santos/SP',
    administrativeHours: 'Service Hours: Monday to Friday, 8:00 AM to 6:00 PM.',
    copyright: '© 2026 Atlântico Underwater Technical Services. All rights reserved.',
  },
};
