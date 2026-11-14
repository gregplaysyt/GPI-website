// GPI's downloadable resources, pulled from the "Resources" page of
// gpinigeria.org. Each item links straight to the published PDF on GPI's site.
const U = (file) => `https://www.gpinigeria.org/wp-content/uploads/${file}`;

export const resources = [
  {
    category: 'Reports',
    items: [
      { title: '2013 Annual Report', url: U('2021/03/2013-Annual-Report.pdf') },
      { title: 'SFLHE Impact Assessment Report', url: U('2022/05/GPI_SFLHE-IMPACT-ASSESSMENT-REPORT.pdf') },
      { title: '2016 National Report', url: U('2022/06/GPI_2016_-National-Report.pdf') },
      { title: '2017 National Report', url: U('2022/06/2017-GPI-NATIONAL-REPORT.pdf') },
      { title: '2018 National Report', url: U('2022/06/GPI-National-2018.pdf') },
      { title: '2019 National Report', url: U('2022/06/GPI-National-2019.pdf') },
    ],
  },
  {
    category: 'Publications',
    items: [
      { title: 'GPI@10', url: U('2022/04/GPI@101.pdf') },
      { title: 'Assessing the impact of GPI lessons', url: U('2022/05/Assessing-the-impact-of-GPI-lessons.pdf') },
      { title: 'GPI@5: The Story So Far', url: U('2022/05/GPI@5.pdf') },
      { title: 'GPI Reflection Report at 26 Years', url: U('2022/06/GPI-Reflection-Report-at-26-Years.pdf') },
    ],
  },
  {
    category: 'Human Trafficking',
    items: [
      { title: 'Trafficking in Girls: Report of a Study', url: U('2022/06/Trafficking-in-Girls-Report-of-a-Study-.pdf') },
      { title: 'Students Handbook on Migration and HT', url: U('2022/06/Students-Handbook-on-Migration-and-HT.pdf') },
    ],
  },
  {
    category: 'Sexuality Education',
    items: [
      { title: 'Decision Making: Postponing Sexual Activities', url: U('2022/04/Sexuality-Education-Series-1.pdf') },
      { title: 'Sexually Transmitted Infections', url: U('2022/03/Sexuality-Education-Series-2.pdf') },
      { title: 'My Body, My Responsibility', url: U('2022/04/Sexuality-Education-Series-3.pdf') },
      { title: 'Interpersonal Relationships', url: U('2022/04/Sexuality-Education-Series-4.pdf') },
      { title: 'Questions Adolescents Ask', url: U('2022/04/Sexuality-Education-Serie-5.pdf') },
      { title: 'Foundation of Human Sexuality Education', url: U('2022/04/Sexuality-Education-Series-6.pdf') },
      { title: 'Young People and the Media', url: U('2022/04/Sexuality-Education-Series-7.pdf') },
      { title: 'Adolescent Digest', url: U('2022/04/Sexuality-Education-Series-8.pdf') },
      { title: 'Body Image', url: U('2022/06/Body-Image.pdf') },
      { title: 'Self Esteem', url: U('2022/06/Self-Esteem.pdf') },
      { title: 'Understanding and Knowing Your Body', url: U('2022/06/Understanding-And-Knowing-Your-Body.pdf') },
      { title: 'Assertiveness', url: U('2022/06/Assertiveness-.pdf') },
      { title: 'GPI Training Manual Level 1', url: U('2022/06/training-manual-level1.pdf') },
      { title: 'GPI Training Manual Level 2', url: U('2022/06/Training-Manual-21.pdf') },
      { title: 'GPI Training Manual Level 3', url: U('2022/06/Training-Manual-Level-3.pdf') },
      { title: 'Adolescents and Sexual Health Problems', url: U('2022/06/Adolescents-and-Sexual-Health-Problems.pdf') },
      { title: 'Life Management for Adolescent', url: U('2022/06/Life-Management-for-Adolescent.pdf') },
      { title: "GPI 'Know This' Series: FGM", url: U('2023/02/GPI-Know-This-Series-FGM.pdf') },
    ],
  },
];
