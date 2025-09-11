import { Icons } from '@/components/icons';

export const links = [
  {
    name: 'Home',
    hash: '#home',
  },
  {
    name: 'About',
    hash: '#about',
  },
  {
    name: 'Experience',
    hash: '#experience',
  },
  {
    name: 'Principles',
    hash: '#principles',
  },
  {
    name: 'Contact',
    hash: '#contact',
  },
] as const;

export const experiencesData = [
  {
    title: 'Head of Engineering',
    company: 'Expenti, Málaga, Spain',
    description:
      'As Head of Engineering, I led and mentored several development teams, including other engineering managers. My primary focus was driving adoption of best practices to deliver high-quality software. Championing the adoption of AI tools to enhance both efficiency and software quality on the games platform.',
    period: '2024-2025',
    technologies: [
      'Continuous improvement',
      'Lean',
      'Stakeholder alignment',
      'Kubernetes',
    ],
  },
  {
    title: 'Engineering Manager',
    company: 'The Workshop, Málaga, Spain',
    description:
      'For over six years, I bring cross-functional teams through the full development lifecycle for sports betting and casino platforms. Fostering a culture centered on team autonomy, servant leadership, and continuous improvement through lean and agile methodologies.',
    period: '2018 - 2024',
    technologies: [
      'Iterative Development',
      'Servant Leadership',
      'CD/CI',
      'Good Coding Practices',
    ],
  },
  {
    title: 'Frontend Developer',
    company: 'The Workshop, Málaga, Spain',
    description:
      'Architected and developed modern frontend solutions focused on robustness, scalability, and optimized user experience, while advocating for best practices such as automated testing and continuous delivery.',
    period: '2014-2018',
    technologies: ['Typescript', 'Angular', 'NPM', 'TDD'],
  },
  {
    title: 'Java Software Developer',
    company: 'The Workshop, Málaga, Spain',
    description:
      'Designed and implemented backend systems emphasizing high availability, scalability, and real-time data, collaborating effectively within agile cross-functional teams.',
    period: '2014-2018',
    technologies: ['Java', 'Spring', 'Agile', 'TDD'],
  },
  {
    title: 'Senior Programmer / Programmer,',
    company: 'The Workshop, Málaga, Spain',
    description:
      'Delivered enterprise-grade software solutions by integrating diverse technology stacks, ensuring seamless system interoperability and alignment with client business needs.',
    period: '2006-2010',
    technologies: ['Java', 'J2EE', 'Javascript'],
  },
] as const;

export const skillsData = [
  { icon: <Icons.java className="size-12" /> },
  { icon: <Icons.kubernetes className="size-12" /> },
  { icon: <Icons.html className="size-12" /> },
  { icon: <Icons.css className="size-12" /> },
  { icon: <Icons.javascript className="size-12" /> },
  { icon: <Icons.typescript className="size-12" /> },
  { icon: <Icons.docker className="size-12" /> },
  { icon: <Icons.grafana className="size-12" /> },
] as const;
