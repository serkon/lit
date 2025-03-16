import { Employee } from '@/stores/employee.store';

// Dummy veri oluşturmak için yardımcı fonksiyonlar
function getRandomDate(startYear: number, endYear: number): string {
  const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0'); // Güvenli gün sayısı
  return `${day}/${month}/${year}`;
}

function getRandomPhone(): string {
  const part1 = Math.floor(Math.random() * 900) + 100;
  const part2 = Math.floor(Math.random() * 900) + 100;
  const part3 = Math.floor(Math.random() * 9000) + 1000;
  return `+1 ${part1} ${part2} ${part3}`;
}

function getRandomEmail(firstName: string, lastName: string): string {
  const domains = ['example.com', 'mail.com', 'test.com', 'inghub.com'];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomDomain}`;
}

function getRandomDepartment(): string {
  return departments[Math.floor(Math.random() * departments.length)];
}

function getRandomPosition(department: string): string {
  const departmentPositions = positions[department as keyof typeof positions];
  return departmentPositions[Math.floor(Math.random() * departmentPositions.length)];
}

export const departments = ['Engineering', 'Marketing', 'Finance', 'HR', 'Sales', 'IT', 'Operations'];

export const positions = {
  Engineering: ['Software Developer', 'DevOps Engineer', 'QA Engineer'],
  Marketing: ['Marketing Manager', 'Content Creator', 'SEO Specialist'],
  Finance: ['Accountant', 'Financial Analyst', 'Auditor'],
  HR: ['HR Manager', 'Recruiter', 'Training Specialist'],
  Sales: ['Sales Representative', 'Account Executive', 'Sales Manager'],
  IT: ['System Administrator', 'Network Engineer', 'Support Specialist'],
  Operations: ['Operations Manager', 'Logistics Coordinator', 'Supply Chain Analyst'],
};

const firstNames = [
  'Emma',
  'Liam',
  'Olivia',
  'Noah',
  'Ava',
  'James',
  'Isabella',
  'Oliver',
  'Sophia',
  'Lucas',
  'Mia',
  'Ethan',
  'Amelia',
  'Alexander',
  'Harper',
  'Benjamin',
  'Evelyn',
  'Henry',
  'Abigail',
  'Michael',
];

const lastNames = [
  'Smith',
  'Johnson',
  'Williams',
  'Brown',
  'Jones',
  'Garcia',
  'Miller',
  'Davis',
  'Rodriguez',
  'Martinez',
  'Hernandez',
  'Lopez',
  'Gonzalez',
  'Wilson',
  'Anderson',
  'Thomas',
  'Taylor',
  'Moore',
  'Jackson',
  'Martin',
];

const getSessionStorage = () => {
  return sessionStorage.getItem('employees');
};

const generate = () => {
  const employees = [];

  for (let i = 1; i <= 500; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const department = getRandomDepartment();
    const position = getRandomPosition(department);

    employees.push({
      id: i,
      firstName,
      lastName,
      dateOfEmployment: getRandomDate(2010, 2023),
      dateOfBirth: getRandomDate(1970, 2000),
      phone: getRandomPhone(),
      email: getRandomEmail(firstName, lastName),
      department,
      position,
    });
  }

  sessionStorage.setItem('employees', JSON.stringify(employees));

  return employees;
};

export const employees: Employee[] = getSessionStorage() ? JSON.parse(getSessionStorage() || '') : generate();

// Örnek çıktı
console.log(employees.slice(0, 5)); // İlk 5 çalışanı göster
