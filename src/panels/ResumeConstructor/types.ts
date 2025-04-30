export type EducationPlace = {
  name: string,
  speciality?: string,
  city?: string,
  startYear: string,
  endYear: string,
}

export type Skills = {
  mainSkills: Array<Skill> | undefined,
  additionalSkills: Array<Skill> | undefined,
}

export type WorkPlace = {
  company: string;
  position?: string;
  responsibilities: string;
  startDate: string;
  endDate?: string;
};

export type Contacts = {
  type: string,
  value: string
}

export type Skill = {
  value: string,
  label: string
}

export type FormValues = {
  name: {
    name: string,
    surname: string,
    patronymic?: string,
  },
  position: string | undefined,
  city: string | undefined,
  contacts: Array<Contacts>,
  education: Array<EducationPlace> | undefined,
  workplaces: Array<WorkPlace> | undefined,
  skills: Skills | undefined,
}
