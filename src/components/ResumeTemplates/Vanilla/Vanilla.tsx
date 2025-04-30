import { FC } from 'react'

import styles from './Vanilla.module.css'
import { DefaultResumeProps } from '../../ResumeGenerator/types'

export interface VanillaProps extends DefaultResumeProps {}

export const Vanilla: FC<VanillaProps> = ({ data, resumeRef }) => (
  <div className={styles.main} ref={resumeRef}>
    <div className={styles.blueBar} />
    <div className={styles.leftColumn}>
      <h1 className={styles.name}>{`${data.name.name} ${data.name.surname} ${data.name.patronymic}`}</h1>
      <h2 className={styles.title}>{data.position}</h2>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>ОПЫТ</h3>
        {data.workplaces?.map((workplace, idx: number) => (
          <div key={idx} className={styles.experienceItem}>
            <h4 className={styles.experienceTitle}>{workplace.position}</h4>
            <p className={styles.company}>{workplace.company}</p>
            <p className={styles.periodLocation}>
              {workplace.endDate
                ? `${workplace.startDate} - ${workplace.endDate}`
                : `${workplace.startDate} - наст. время`}
            </p>
            <p className={styles.description}>{workplace.responsibilities}</p>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>ОБРАЗОВАНИЕ</h3>
        {data.education?.map((edu, idx: number) => (
          <div key={idx} className={styles.educationItem}>
            <h4 className={styles.educationTitle}>{edu.speciality}</h4>
            <p className={styles.school}>{edu.name}</p>
            <p className={styles.periodLocation}>
              {`${edu.startYear} - ${edu.endYear}`}
              {edu.city && ` - ${edu.city}`}
            </p>
          </div>
        ))}
      </section>
    </div>

    <div className={styles.rightColumn}>
      <div className={styles.profilePhotoWrapper}>
        <img src={data.photoUrl ? data.photoUrl : 'user-placeholder.png'} alt="Profile" className={styles.profilePhoto} />
      </div>
      <div className={styles.contactInfo}>
        {data.contacts?.map((contact, idx: number) => (
          <p key={idx}>
            {`${contact.type}: ${contact.value}`}
          </p>
        ))}
      </div>

      <div className={styles.listSection}>
        <h4 className={styles.listTitle}>НАВЫКИ</h4>
        <ul className={styles.list}>
          {data.skills?.mainSkills?.map((skill, idx: number) => (
            <li key={idx} className={styles.listItem}>{skill.label}</li>
          ))}
        </ul>
      </div>
      {
        data.skills?.additionalSkills && (
        <div className={styles.listSection}>
          <h4 className={styles.listTitle}>ДОПОЛНИТЕЛЬНЫЕ НАВЫКИ</h4>
          <ul className={styles.list}>
            {data?.skills.additionalSkills.map((skill, idx: number) => (
              <li key={idx} className={styles.listItem}>{skill.label}</li>
            ))}
          </ul>
        </div>
        )
      }

      {/* <div className={styles.listSection}>
        <h4 className={styles.listTitle}>ЯЗЫКИ</h4>
        <ul className={styles.list}>
          {data.languages.map((item: string, idx: number) => (
            <li key={idx} className={styles.listItem}>{item}</li>
          ))}
        </ul>
      </div> */}

      {/* <div className={styles.listSection}>
        <h4 className={styles.listTitle}>КОНТАКТЫ</h4>
        <ul className={styles.list}>
          {data.socialLinks.map((item: Record<string, string>, idx: number) => (
            <li key={idx} className={styles.listItem}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  </div>
)
