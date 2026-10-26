
import { useEffect, useRef, useState } from 'react'
import {
  SiReact,
  SiHtml5,
  SiJavascript,
  SiJson,
  SiTypescript,
  SiCss,
  SiMarkdown,
  SiGithub,
  SiGmail,
  SiLeetcode,
} from 'react-icons/si'
import profileImage from './assets/profile.png'
import { FaLinkedin } from 'react-icons/fa'
import { VscFilePdf, VscFiles, VscSearch, VscSourceControl, VscExtensions, VscSettingsGear, VscClose, VscSparkle, VscSend } from 'react-icons/vsc'
import './App.css'
import './assistant-redesign.css'

const FileIcon = ({ name, size = 16 }) => {
  const common = { size, 'aria-hidden': true }
  switch (name) {
    case 'home.jsx': return <SiReact {...common} color="#61dafb" />
    case 'about.html': return <SiHtml5 {...common} color="#e34f26" />
    case 'projects.js': return <SiJavascript {...common} color="#f7df1e" />
    case 'skills.json': return <SiJson {...common} color="#b5bd68" />
    case 'experience.ts': return <SiTypescript {...common} color="#3178c6" />
    case 'contact.css': return <SiCss {...common} color="#1572b6" />
    case 'README.md': return <SiMarkdown {...common} color="#8b949e" />
    case 'resume.pdf': return <VscFilePdf {...common} color="#e05252" />
    case 'github.json': return <SiGithub {...common} color="#d4d4d4" />
    case 'certificates.json': return <VscFilePdf {...common} color="#d6b66a" />
    case 'query.sql': return <VscFiles {...common} color="#5799e8" />
    default: return <VscFiles {...common} />
  }
}

const files = [
  { name: 'home.jsx', icon: '⚛', color: '#20b2a6' },
  { name: 'about.html', icon: '▣', color: '#e87952' },
  { name: 'projects.js', icon: 'JS', color: '#e5c454' },
  { name: 'github.json', icon: 'GH', color: '#d4d4d4' },
  { name: 'resume.pdf', icon: 'PDF', color: '#e05252' },
  { name: 'certificates.json', icon: '{}', color: '#d6b66a' },
  { name: 'query.sql', icon: 'SQL', color: '#5799e8' },
  { name: 'skills.json', icon: '{}', color: '#b5bd68' },
  { name: 'experience.ts', icon: 'TS', color: '#5799e8' },
  { name: 'contact.css', icon: '▣', color: '#5799e8' },
  { name: 'README.md', icon: 'MD', color: '#75b879' },
]

const portfolioExtensions = [
  { id: 'react', name: 'React', publisher: 'Meta', icon: '⚛', color: '#61dafb', category: 'Frontend', description: 'Build interactive user interfaces with reusable components.' },
  { id: 'vite', name: 'Vite', publisher: 'Vite Team', icon: 'V', color: '#bd9cff', category: 'Tooling', description: 'Fast development server and modern frontend build tooling.' },
  { id: 'tailwind', name: 'Tailwind CSS', publisher: 'Tailwind Labs', icon: '≋', color: '#38bdf8', category: 'Styling', description: 'Utility-first CSS for rapidly building custom interfaces.' },
  { id: 'javascript', name: 'JavaScript', publisher: 'Language Support', icon: 'JS', color: '#e5c454', category: 'Language', description: 'Core language for interactive web experiences.' },
  { id: 'git', name: 'Git', publisher: 'Open Source', icon: '⑂', color: '#f07855', category: 'Developer Tools', description: 'Track code changes and collaborate with version control.' },
  { id: 'github', name: 'GitHub', publisher: 'GitHub', icon: '◉', color: '#d4d4d4', category: 'Developer Tools', description: 'Host repositories and collaborate on software projects.' },
  { id: 'sql', name: 'SQL', publisher: 'Database Skills', icon: 'DB', color: '#5799e8', category: 'Database', description: 'Query, filter, and analyze relational database data.' },
  { id: 'java', name: 'Java', publisher: 'Language Support', icon: '☕', color: '#e87952', category: 'Language', description: 'Object-oriented programming for application development.' },
  { id: 'powerbi', name: 'Power BI', publisher: 'Data Analytics', icon: '▥', color: '#e5c454', category: 'Data', description: 'Turn datasets into interactive reports and dashboards.' },
  { id: 'cybersecurity', name: 'Cybersecurity', publisher: 'Security Learning', icon: '◇', color: '#20b2a6', category: 'Security', description: 'Explore security fundamentals, analysis, and defensive practices.' },
]

const pageContent = {
  'home.jsx': {
    label: 'home.jsx',
    greeting: '// hello world !! welcome to my portfolio',
    heading: ['Aditya', 'Thube'],
    roles: ['CSE Student', 'Web Developer', 'Cybersecurity Enthusiast'],
    tagline: 'Building projects and learning new technologies',
    description: (
      <>
        I am a Computer Science Engineering student exploring{' '}
        <strong>web development</strong>, <strong>databases</strong>, and{' '}
        <strong>cybersecurity</strong>. I enjoy learning by building projects
        and solving problems.
      </>
    ),
  },
  'about.html': {
    label: 'about.html',
    greeting: '<!-- a little about me -->',
    heading: ['About', 'Me'],
    roles: ['Computer Science', 'Problem Solver', 'Always Learning'],
    tagline: 'Curious mind. Practical projects.',
    description:
      'I am developing my skills in programming, databases, web technologies, and cybersecurity through hands-on learning.',
  },
  'projects.js': {
    label: 'projects.js',
    greeting: '// things I have built',
    heading: ['My', 'Projects'],
    roles: ['React', 'JavaScript', 'Cybersecurity'],
    tagline: 'Learning by building real projects',
    description:
      'Explore my Honeypot Management System and follow my progress as I build more projects.',
  },
  'github.json': {
    label: 'github.json',
    greeting: '// live public GitHub repositories and activity',
    heading: ['GitHub', 'Activity'],
    roles: ['Public Repositories', 'Recent Activity', 'Live API'],
    tagline: 'A live view of my public development work',
    description: 'Repository information is loaded from the public GitHub API. Availability depends on GitHub API limits and network access.',
  },
  'resume.pdf': {
    label: 'resume.pdf',
    greeting: '% resume and career documents',
    heading: ['Resume', '& Certificates'],
    roles: ['Resume', 'Internship', 'Activities'],
    tagline: 'Documents and verified achievements',
    description: 'Open my resume and explore certificates or participation records. Only published links are shown.',
  },
  'certificates.json': {
    label: 'certificates.json',
    greeting: '{ "certificates": "selected achievements" }',
    heading: ['Certificates', '& Achievements'],
    roles: ['Internship', 'Hackathons', 'Learning'],
    tagline: 'A record of learning and participation',
    description: 'Explore available certificate links and activities. Additional public links can be added as they become available.',
  },
  'query.sql': {
    label: 'query.sql',
    greeting: '-- safe SQL playground · predefined demo queries',
    heading: ['SQL', 'Playground'],
    roles: ['SELECT', 'WHERE', 'GROUP BY'],
    tagline: 'Explore SQL against a small demo dataset',
    description: 'Choose a predefined query and inspect its results. This demo does not execute arbitrary SQL or connect to a live database.',
  },
  'skills.json': {
    label: 'skills.json',
    greeting: '{ "developer": "in progress",',
    heading: ['My', 'Skills'],
    roles: ['SQL', 'React', 'Java', 'Power BI'],
    tagline: 'Tools I am learning and using',
    description:
      'JavaScript, HTML, React, Tailwind CSS, Vite, SQL, Java, Git, GitHub, Power BI, and Computer Networks.',
  },
  'experience.ts': {
    label: 'experience.ts',
    greeting: '// my learning journey',
    heading: ['My', 'Journey'],
    roles: ['Student', 'Hackathons', 'Hands-on Learning'],
    tagline: 'Every project teaches me something new',
    description:
      'I continue to build my technical foundation through coursework, practical projects, and participation in activities such as NASA Space Apps Challenge.',
  },
  'contact.css': {
    label: 'contact.css',
    greeting: '/* let us connect */',
    heading: ['Contact', 'Me'],
    roles: ['GitHub', 'Collaboration', 'Learning'],
    tagline: 'Have an idea? Let us build something.',
    description:
      'Visit my GitHub profile to explore my work and connect with me about projects and collaboration.',
  },
  'README.md': {
    label: 'README.md',
    greeting: '# portfolio overview',
    heading: ['Aditya', 'Thube'],
    roles: ['CSE Student', 'Developer', 'Always Learning'],
    tagline: 'A little about me, my stack, and how to connect.',
    description: 'Explore my technical interests, projects, and learning journey.',
  },
}


function AboutSection() {
  return (
    <section className="about-content">
      <p className="about-comment">
        {'<!-- about.html - A little about me -->'}
      </p>

      <h1 className="about-title">About Me</h1>
      <p className="about-subtitle">
        // who I am · what I do · where I'm heading
      </p>

      <div className="about-card">
        <p>
          Hi! I'm <strong>Aditya Thube</strong>, a Computer Science
          Engineering student interested in software development,
          databases, and cybersecurity.
        </p>
        <p>
          I enjoy learning by building practical projects, exploring
          new technologies, and strengthening my programming
          fundamentals one step at a time.
        </p>
      </div>

      <div className="focus-card">
        <h2>CURRENT FOCUS</h2>
        <div className="focus-grid">
          <p>🛠️ Building projects with React and JavaScript</p>
          <p>🗄️ Practising SQL and database concepts</p>
          <p>🔐 Exploring cybersecurity</p>
          <p>📊 Learning data analysis with Power BI</p>
          <p>🌱 Improving programming fundamentals</p>
          <p>✨ Learning, building, and improving every day</p>
        </div>
      </div>

     
     
<h2 className="section-label">EDUCATION</h2>

<div className="education-card">
  <div className="education-heading">
    <strong>🎓 Amrutvahini College of Engineering - AVCOE</strong>
    <span>2023 – 2026</span>
  </div>

  <p>Diploma in Computer Engineering</p>
  <p className="education-grade">Grade: 88.12</p>
</div>

<div className="education-card">
  <div className="education-heading">
    <strong>🎓 Sanjivani University</strong>
    <span>Aug 2026 – Present</span>
  </div>

  <p>Bachelor of Technology in Computer Science</p>
</div>

    </section>
  )
}

function ProjectsSection() {
  const projects = [
    {
      number: '01',
      name: 'Honeypot Management System',
      status: 'GITHUB REPOSITORY',
      domain: 'CYBERSECURITY',
      description: 'A cybersecurity project focused on honeypot management. The repository contains the implementation and project documentation.',
      stack: ['Cybersecurity', 'Honeypot', 'Security Monitoring'],
      link: 'https://github.com/Adityathube/honeypot-management-system',
      details: [
        ['Problem space', 'Explore honeypot management and defensive security concepts.'],
        ['My work', 'Review the source code and documentation in the linked repository for the implemented features.'],
        ['Next improvement', 'Add a setup guide, architecture diagram, screenshots, and a clear explanation of the testing environment.'],
      ],
    },
    
    {
      number: '02',
      name: 'Developer Portfolio',
      status: 'IN PROGRESS',
      domain: 'FRONTEND + AI',
      description: 'A VS Code-inspired portfolio built with React and Vite, with an Express-backed Portfolio Assistant.',
      stack: ['React', 'Vite', 'JavaScript', 'CSS', 'Express', 'OpenRouter'],
      details: [
        ['Interface', 'Editor tabs, Explorer-style navigation, a custom cursor, and a charcoal-and-teal theme.'],
        ['Assistant', 'The frontend sends chat requests to the local Express API endpoint.'],
        ['Next improvement', 'Deploy the frontend and backend securely, and keep API keys on the server.'],
      ],
    },
  ]

  return (
    <section className="projects-content enhanced-projects">
      <p className="projects-comment">{'// projects.js - selected case studies'}</p>
      <div className="feature-heading-row">
        <div>
          <h1 className="projects-title">Project <span>Case Studies</span></h1>
          <p className="projects-subtitle">// problem · approach · technology · next steps</p>
        </div>
        <span className="feature-code-label">2 PROJECTS</span>
      </div>

      <div className="case-study-list">
        {projects.map((project) => (
          <article className="project-card case-study-card" key={project.name}>
            <div className="project-card-heading">
              <div>
                <span className="project-file-icon">{project.number}</span>
                <h2>{project.name}</h2>
              </div>
              <span className={`project-status ${project.status === 'IN PROGRESS' ? 'in-progress' : ''}`}>
                {project.status}
              </span>
            </div>
            <p className="case-study-domain">{project.domain}</p>
            <p className="project-description">{project.description}</p>
            <div className="project-tags">
              {project.stack.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <details className="case-study-details">
              <summary><span className="summary-chevron">›</span> Open case study <span className="summary-hint">README.md</span></summary>
              <div className="case-study-body">
                {project.details.map(([label, detail]) => (
                  <div className="case-study-detail-row" key={label}>
                    <strong>{label}</strong>
                    <p>{detail}</p>
                  </div>
                ))}
              </div>
            </details>
            <div className="project-card-footer">
              <span>{project.number} / {project.status === 'IN PROGRESS' ? 'Current build' : 'Project'}</span>
              {project.link ? (
                <a href={project.link} target="_blank" rel="noreferrer">View repository ↗</a>
              ) : (
                <span className="coming-soon">Report link can be added when public</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}


function GitHubActivitySection() {
  const [repositories, setRepositories] = useState([])
  const [events, setEvents] = useState([])
  const [contributions, setContributions] = useState([])
  const [contributionTotal, setContributionTotal] = useState(null)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(true)
  const [calendarLoading, setCalendarLoading] = useState(true)
  const [error, setError] = useState('')
  const [calendarError, setCalendarError] = useState('')

  const profileUrl = 'https://github.com/Adityathube'

  useEffect(() => {
    const controller = new AbortController()

    async function loadGitHub() {
      setLoading(true)
      setError('')

      try {
        const [repoResponse, eventResponse] = await Promise.all([
          fetch(
            'https://api.github.com/users/Adityathube/repos?sort=updated&per_page=100',
            { signal: controller.signal }
          ),
          fetch(
            'https://api.github.com/users/Adityathube/events/public?per_page=100',
            { signal: controller.signal }
          ),
        ])

        if (!repoResponse.ok) {
          throw new Error(`Repositories request failed (${repoResponse.status})`)
        }

        const repoData = await repoResponse.json()
        const eventData = eventResponse.ok ? await eventResponse.json() : []

        if (!controller.signal.aborted) {
          setRepositories(Array.isArray(repoData) ? repoData : [])
          setEvents(Array.isArray(eventData) ? eventData : [])
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'GitHub data could not be loaded.')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadGitHub()
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadContributions() {
      setCalendarLoading(true)
      setCalendarError('')
      setContributions([])
      setContributionTotal(null)

      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/Adityathube?y=${selectedYear}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error('Contribution calendar is temporarily unavailable.')
        }

        const data = await response.json()
        const days = Array.isArray(data.contributions) ? data.contributions : []
        const total = data.total?.[String(selectedYear)]

        if (!controller.signal.aborted) {
          setContributions(days)
          setContributionTotal(
            typeof total === 'number'
              ? total
              : days.reduce((sum, day) => sum + (day.count || 0), 0)
          )
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setCalendarError('Contribution graph could not be loaded. Open GitHub to view your full activity.')
        }
      } finally {
        if (!controller.signal.aborted) setCalendarLoading(false)
      }
    }

    loadContributions()
    return () => controller.abort()
  }, [selectedYear])

  const contributionMap = Object.fromEntries(
    contributions.map((day) => [day.date, day])
  )

  // Build a Sunday-to-Saturday calendar for the selected year.
  const firstDay = new Date(Date.UTC(selectedYear, 0, 1))
  const lastDay = new Date(Date.UTC(selectedYear, 11, 31))
  const calendarStart = new Date(firstDay)
  calendarStart.setUTCDate(calendarStart.getUTCDate() - calendarStart.getUTCDay())

  const calendarEnd = new Date(lastDay)
  calendarEnd.setUTCDate(calendarEnd.getUTCDate() + (6 - calendarEnd.getUTCDay()))

  const calendarWeeks = []
  let week = []

  for (
    let date = new Date(calendarStart);
    date <= calendarEnd;
    date.setUTCDate(date.getUTCDate() + 1)
  ) {
    const dateKey = date.toISOString().slice(0, 10)
    const isSelectedYear = date.getUTCFullYear() === selectedYear

    week.push({
      date: dateKey,
      inYear: isSelectedYear,
      ...(contributionMap[dateKey] || { count: 0, level: 0 }),
    })

    if (week.length === 7) {
      calendarWeeks.push(week)
      week = []
    }
  }

  
const monthLabels = calendarWeeks.map((days, index) => {
  const currentDay = days.find((day) => day.inYear)

  if (!currentDay) return ''

  const currentMonth = new Date(
    `${currentDay.date}T00:00:00Z`
  ).getUTCMonth()

  const previousDay = index > 0
    ? [...calendarWeeks[index - 1]]
        .reverse()
        .find((day) => day.inYear)
    : null

  const previousMonth = previousDay
    ? new Date(
        `${previousDay.date}T00:00:00Z`
      ).getUTCMonth()
    : -1

  if (index === 0 || currentMonth !== previousMonth) {
    return new Date(
      `${currentDay.date}T00:00:00Z`
    ).toLocaleDateString('en-US', {
      month: 'short',
      timeZone: 'UTC',
    })
  }

  return ''
})


  const eventSummary = (event) => {
    const repo = event.repo?.name || 'a repository'

    switch (event.type) {
      case 'PushEvent': {
        const count = event.payload?.commits?.length || 1
        return {
          title: `Pushed ${count} commit${count === 1 ? '' : 's'}`,
          repo,
          kind: 'commit',
        }
      }
      case 'PullRequestEvent':
        return { title: 'Updated a pull request', repo, kind: 'pull request' }
      case 'IssuesEvent':
        return { title: 'Worked on an issue', repo, kind: 'issue' }
      case 'IssueCommentEvent':
        return { title: 'Commented on an issue', repo, kind: 'issue' }
      case 'PullRequestReviewEvent':
        return { title: 'Reviewed a pull request', repo, kind: 'review' }
      case 'CreateEvent':
        return { title: 'Created a branch or repository', repo, kind: 'create' }
      case 'WatchEvent':
        return { title: 'Starred a repository', repo, kind: 'star' }
      case 'ForkEvent':
        return { title: 'Forked a repository', repo, kind: 'fork' }
      default:
        return {
          title: event.type?.replace('Event', '') || 'Activity',
          repo,
          kind: 'other',
        }
    }
  }

  
  const summaries = events.map((event) => ({
    ...eventSummary(event),
    id: event.id,
    createdAt: event.created_at,
  }))
  
  const contributedRepos = [
    ...new Set(
      summaries
        .filter((event) =>
          ['commit', 'pull request', 'issue', 'review'].includes(event.kind)
        )
        .map((event) => event.repo)
    ),
  ].slice(0, 4)

  const overviewRepos = contributedRepos.length
    ? contributedRepos
    : repositories.slice(0, 4).map((repo) => repo.full_name)


  const activityCounts = [
    { label: 'Commits', count: summaries.filter((event) => event.kind === 'commit').length },
    { label: 'Pull requests', count: summaries.filter((event) => event.kind === 'pull request').length },
    { label: 'Issues', count: summaries.filter((event) => event.kind === 'issue').length },
    { label: 'Code reviews', count: summaries.filter((event) => event.kind === 'review').length },
  ]

  const activityTotal = activityCounts.reduce((sum, item) => sum + item.count, 0)
  const percent = (count) =>
    activityTotal ? Math.round((count / activityTotal) * 100) : 0

  const formatRepoName = (fullName) => fullName.split('/').pop()

  return (
    <section className="feature-page github-page github-dashboard">
      <p className="feature-comment">// github.json — public contribution dashboard</p>

      <div className="feature-title-row github-heading">
        <div>
          <h1 className="feature-title">
            GitHub <span>Activity</span>
          </h1>
          <p className="feature-subtitle">
            // contributions · repositories · activity overview
          </p>
        </div>
        <a className="feature-outline-link" href={profileUrl} target="_blank" rel="noreferrer">
          <SiGithub aria-hidden="true" /> Open profile ↗
        </a>
      </div>

      {error && (
        <div className="feature-message feature-error" role="status">
          {error}{' '}
          <a href={profileUrl} target="_blank" rel="noreferrer">Open GitHub ↗</a>
        </div>
      )}

      <div className="github-year-row">
        <div>
          <strong>
            {calendarLoading
              ? `Loading contributions in ${selectedYear}…`
              : `${contributionTotal ?? '—'} contributions in ${selectedYear}`}
          </strong>
          <span className="github-muted">Public contribution calendar</span>
        </div>
        <div className="github-year-switcher" aria-label="Contribution year">
          {[new Date().getFullYear(), new Date().getFullYear() - 1].map((year) => (
            <button
              type="button"
              key={year}
              className={selectedYear === year ? 'active' : ''}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="github-dashboard-panel">
        <div className="github-calendar-wrap">
          {calendarError ? (
            <p className="feature-empty">
              {calendarError}{' '}
              <a href={profileUrl} target="_blank" rel="noreferrer">View GitHub ↗</a>
            </p>
          ) : (
            <>
              <div className="github-month-labels" style={{ gridTemplateColumns: `repeat(${calendarWeeks.length}, 11px)` }}>
                {monthLabels.map((month, index) => (
                  <span key={`${month}-${index}`}>{month}</span>
                ))}
              </div>

              <div className="github-calendar-main">
                <div className="github-weekday-labels">
                  <span></span>
                  <span>Mon</span>
                  <span></span>
                  <span>Wed</span>
                  <span></span>
                  <span>Fri</span>
                  <span></span>
                </div>

                <div
                  className="github-calendar-grid"
                  style={{ gridTemplateColumns: `repeat(${calendarWeeks.length}, 11px)` }}
                  aria-label={`GitHub contributions for ${selectedYear}`}
                >
                  {calendarWeeks.map((days, weekIndex) => (
                    <div className="github-calendar-week" key={weekIndex}>
                      {days.map((day) => (
                        <span
                          key={day.date}
                          className={`github-day level-${day.inYear ? Math.min(4, day.level || 0) : 0} ${day.inYear ? '' : 'outside-year'}`}
                          title={
                            day.inYear
                              ? `${day.count || 0} contributions on ${day.date}`
                              : ''
                          }
                          aria-label={
                            day.inYear
                              ? `${day.count || 0} contributions on ${day.date}`
                              : undefined
                          }
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="github-calendar-footer">
                <a href={`${profileUrl}?tab=overview`} target="_blank" rel="noreferrer">
                  Learn how GitHub counts contributions ↗
                </a>
                <div className="github-legend">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map((level) => (
                    <span key={level} className={`github-day level-${level}`} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="github-overview">
          <div className="github-overview-repos">
            <h2>Activity overview</h2>
            <p className="github-overview-label">▣ &nbsp; Contributed to</p>

            {loading ? (
              <p className="github-muted">Loading repositories…</p>
            ) : overviewRepos.length ? (
              <ul>
                {overviewRepos.map((repo) => (
                  <li key={repo}>
                    <a href={`https://github.com/${repo}`} target="_blank" rel="noreferrer">
                      {repo}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="github-muted">
                No recent contribution events were returned by GitHub.
              </p>
            )}

            <p className="github-muted github-small-note">
              Based on recent public events, not your complete private activity.
            </p>
          </div>

          
<div className="github-overview-breakdown">
  <h2>Recent activity breakdown</h2>

  {activityTotal > 0 ? (
    <>
      <div className="github-breakdown-chart">
        <span className="breakdown-top">
          Code review
        </span>

        <div className="breakdown-y-axis"></div>
        <div className="breakdown-x-axis"></div>

        <span className="breakdown-left">
          <b>{percent(activityCounts[0].count)}%</b>
          Commits
        </span>

        <span className="breakdown-right">
          <b>{percent(activityCounts[2].count)}%</b>
          Issues
        </span>

        <span className="breakdown-bottom">
          <b>{percent(activityCounts[1].count)}%</b>
          Pull requests
        </span>

        <span
          className="breakdown-center"
          aria-hidden="true"
        ></span>
      </div>

      <p className="github-muted github-small-note">
        Based on recent public events returned by GitHub.
      </p>
    </>
  ) : (
    <div className="github-activity-unavailable">
      <span className="github-muted">
        Activity breakdown unavailable
      </span>

      <p className="github-muted github-small-note">
        GitHub returned no recent public events to calculate
        these percentages. Your contribution calendar is
        displayed separately.
      </p>

      <a
        href={`${profileUrl}?tab=overview`}
        target="_blank"
        rel="noreferrer"
      >
        View GitHub activity ↗
      </a>
    </div>
  )}
</div>

        </div>
      </div>

      <div className="github-activity-heading">
        <h2>Contribution activity</h2>
        <span>{summaries.length} recent public events</span>
      </div>

      {loading ? (
        <div className="feature-message">
          <span className="loading-dot" /> Loading recent public activity…
        </div>
      ) : summaries.length ? (
        <div className="github-timeline">
          {summaries.slice(0, 12).map((event) => (
            <article className="github-timeline-item" key={event.id}>
              <span className="github-timeline-icon">
                <SiGithub aria-hidden="true" />
              </span>
              <div className="github-timeline-content">
                <p>{event.title} in <a href={`https://github.com/${event.repo}`} target="_blank" rel="noreferrer">{formatRepoName(event.repo)}</a></p>
                <small>
                  {new Date(event.createdAt).toLocaleDateString(undefined, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </small>
              </div>
              <a
                className="github-timeline-link"
                href={`https://github.com/${event.repo}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${event.repo}`}
              >
                ↗
              </a>
            </article>
          ))}
        </div>
      ) : (
        <p className="feature-empty">
          No recent public events were returned. Your public profile and repositories remain available.
        </p>
      )}

      <a className="github-show-more" href={profileUrl} target="_blank" rel="noreferrer">
        Show more activity ↗
      </a>

      <p className="feature-footnote">
        Contribution calendar data is provided by a public third-party service. Repository and event details
        come from GitHub's public API; results can be delayed or limited. Private contributions are not shown.
      </p>
    </section>
  )
}


function ResumeCertificatesSection() {
  const certificates = [
    {
      title: 'Cybersecurity CTF Certification',
      issuer: 'Capture The Flag (CTF)',
      detail: 'Cybersecurity challenge certificate.',
      href: 'https://drive.google.com/file/d/1Ot_hjH0Uhu4rtrkLVS8rWcnocVIpwyOr/view?usp=sharing',
    },
    {
      title: 'DataQuest',
      issuer: 'Participation / activity',
      detail: 'Add the verified certificate link when available.',
      href: 'https://drive.google.com/file/d/1S0STMJeKCeEvb-ef72tlVZwXdUwC1PD9/view?usp=sharing'
    },
  ]

  return (
    <section className="feature-page resume-page">
      <p className="feature-comment">// resume.pdf + certificates.json - career documents</p>
      <h1 className="feature-title">Resume <span>& Certificates</span></h1>
      <p className="feature-subtitle">// recruiter-ready documents · participation · learning</p>

      <article className="resume-panel">
        <div className="resume-file-icon"><VscFilePdf size={32} /></div>
        <div className="resume-panel-copy">
          <span className="timeline-type">RESUME DOCUMENT</span>
          <h2>Aditya Thube · Resume.pdf</h2>
          <p>Place your latest PDF resume at <code>public/resume.pdf</code>. Once added, these links will open and download the file.</p>
          <div className="resume-actions">
            <a className="feature-primary-link" href="/resume.pdf" target="_blank" rel="noreferrer">View resume ↗</a>
            <a className="feature-outline-link" href="/resume.pdf" download="Aditya-Thube-Resume.pdf">Download PDF ↓</a>
          </div>
        </div>
      </article>

      <div className="feature-section-heading"><span>▾</span> CERTIFICATES & PARTICIPATION <small>{certificates.length} records</small></div>
      <div className="certificate-list">
        {certificates.map((certificate) => (
          <article className="certificate-card" key={certificate.title}>
            <div className="certificate-icon"><VscFilePdf size={21} /></div>
            <div className="certificate-copy">
              <h2>{certificate.title}</h2>
              <p>{certificate.issuer}</p>
              <small>{certificate.detail}</small>
            </div>
            {certificate.href ? (
              <a href={certificate.href} target="_blank" rel="noreferrer">Open ↗</a>
            ) : <span className="certificate-pending">LINK NEEDED</span>}
          </article>
        ))}
      </div>
    </section>
  )
}

const sqlDemoProjects = [
  { id: 1, name: 'Honeypot Management System', domain: 'Cybersecurity', status: 'Repository available', stack: 'Security, GitHub' },
  { id: 2, name: 'Cricket Analytics Dashboard', domain: 'Data Analytics', status: 'Dashboard created', stack: 'Power BI' },
  { id: 3, name: 'Developer Portfolio', domain: 'Web Development', status: 'In progress', stack: 'React, Vite, Express' },
]

const sqlDemoQueries = {
  all: {
    label: 'SELECT all projects',
    code: 'SELECT id, name, domain, status\\nFROM projects\\nORDER BY id;',
    run: (rows) => rows,
  },
  cybersecurity: {
    label: 'Filter cybersecurity projects',
    code: "SELECT name, domain, status\\nFROM projects\\nWHERE domain = 'Cybersecurity';",
    run: (rows) => rows.filter((row) => row.domain === 'Cybersecurity').map(({ name, domain, status }) => ({ name, domain, status })),
  },
  count: {
    label: 'Count projects by domain',
    code: 'SELECT domain, COUNT(*) AS project_count\\nFROM projects\\nGROUP BY domain\\nORDER BY project_count DESC;',
    run: (rows) => Object.entries(rows.reduce((acc, row) => ({ ...acc, [row.domain]: (acc[row.domain] || 0) + 1 }), {}))
      .map(([domain, project_count]) => ({ domain, project_count }))
      .sort((a, b) => b.project_count - a.project_count),
  },
  web: {
    label: 'Find web development projects',
    code: "SELECT name, stack, status\\nFROM projects\\nWHERE domain = 'Web Development';",
    run: (rows) => rows.filter((row) => row.domain === 'Web Development').map(({ name, stack, status }) => ({ name, stack, status })),
  },
}

function SQLPlaygroundSection() {
  const [selectedQuery, setSelectedQuery] = useState('all')
  const [result, setResult] = useState(() => sqlDemoQueries.all.run(sqlDemoProjects))
  const [ranQuery, setRanQuery] = useState('all')
  const query = sqlDemoQueries[selectedQuery]

  const runQuery = () => {
    setResult(sqlDemoQueries[selectedQuery].run(sqlDemoProjects))
    setRanQuery(selectedQuery)
  }

  const columns = result.length ? Object.keys(result[0]) : []

  return (
    <section className="feature-page sql-page">
      <p className="feature-comment">{'-- query.sql - interactive SQL practice'}</p>
      <h1 className="feature-title">SQL <span>Playground</span></h1>
      <p className="feature-subtitle">// select a sample query · run · inspect results</p>

      <div className="sql-safety-note"><strong>ⓘ Safe demo:</strong> choose from predefined read-only queries. Arbitrary SQL is not executed and no database connection is used.</div>
      <div className="sql-toolbar">
        <label htmlFor="sql-query-select">QUERY</label>
        <select id="sql-query-select" value={selectedQuery} onChange={(event) => setSelectedQuery(event.target.value)}>
          {Object.entries(sqlDemoQueries).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}
        </select>
        <button type="button" onClick={runQuery}>▶ Run Query</button>
      </div>
      <div className="sql-editor">
        <div className="sql-editor-tab"><span>▦</span> query.sql <small>SQL</small></div>
        <pre><code>{query.code.replace(/\\n/g, '\n')}</code></pre>
      </div>
      <div className="sql-results-heading"><span>▾</span> RESULTS <small>{ranQuery === selectedQuery ? `${result.length} row${result.length === 1 ? '' : 's'}` : 'Run the selected query to update results'}</small></div>
      <div className="sql-results-wrap">
        {result.length ? (
          <table className="sql-results-table">
            <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
            <tbody>{result.map((row, index) => <tr key={index}>{columns.map((column) => <td key={column}>{String(row[column])}</td>)}</tr>)}</tbody>
          </table>
        ) : <p className="feature-empty">Query returned 0 rows.</p>}
      </div>
      <p className="feature-footnote">The sample rows describe portfolio projects. This is a learning simulation, not a full SQL engine.</p>
    </section>
  )
}

function SkillsSection() {
  const skillGroups = [
    {
      title: 'PROGRAMMING',
      skills: [
        { name: 'Java', percent: 40 },
        { name: 'JavaScript', percent: 20 },
        { name: 'SQL', percent: 60 },
        { name: 'HTML', percent: 55 },
      ],
    },
    {
      title: 'FRONTEND DEVELOPMENT',
      skills: [
        { name: 'React', percent: 20 },
        { name: 'Tailwind CSS', percent: 30 },
        { name: 'Vite', percent: 40 },
      ],
    },
    {
      title: 'CORE COMPUTER SCIENCE',
      skills: [
        { name: 'DBMS', percent: 65 },
        { name: 'Computer Networks', percent: 60 },
      ],
    },
    {
      title: 'DEVELOPMENT TOOLS',
      skills: [
        { name: 'Git', percent: 60 },
        { name: 'GitHub', percent: 85 },
      ],
    },
    {
      title: 'CYBERSECURITY',
      skills: [
        { name: 'Cybersecurity', percent: 25 },
      ],
    },
    {
      title: 'DATA ANALYTICS',
      skills: [
        { name: 'Power BI', percent: 35 },
      ],
    },
  ]

  const familiarWith = [
    'SQL Practice',
    'Git Workflow',
    'Linux Mint',
    'Responsive Design',
    'Project Building',
  ]

  const colors = ['teal', 'blue', 'orange', 'purple']

  return (
    <section className="skills-dashboard">
      <p className="skills-comment">
        {'// skills.json - my technical toolkit'}
      </p>

      <h1 className="skills-title">
        My <span>Skills</span>
      </h1>

      <p className="skills-subtitle">
        {'{ status: "always_learning", passion: "building_projects" }'}
      </p>

      <div className="skills-dashboard-grid">
        {skillGroups.map((group, groupIndex) => (
          <section className="skill-group" key={group.title}>
            <h2>{group.title}</h2>
            <div className="skill-divider" />

            {group.skills.map((skill, skillIndex) => (
              <div className="skill-row" key={skill.name}>
                <span className="skill-name">{skill.name}</span>

                <div className="skill-track">
                  <div
                    className={`skill-fill skill-fill-${colors[(groupIndex + skillIndex) % colors.length]}`}
                    style={{ width: `${skill.percent}%` }}
                  />
                </div>

                <span className="skill-percentage">
                  {skill.percent}%
                </span>
              </div>
            ))}
          </section>
        ))}
      </div>

      <section className="familiar-section">
        <h2>ALSO FAMILIAR WITH</h2>
        <div className="skill-divider" />

        <div className="familiar-tags">
          {familiarWith.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <p className="skills-footer-note">
        <span>✦</span>
        Always learning, building, and improving.
      </p>
    </section>
  )
}


function ExperienceSection() {
  const timeline = [
    {
      date: 'Completed',
      type: 'EDUCATION',
      title: 'Diploma in Computer Technology',
      organization: 'Amrutvahini Polytechnic,Sangamner',
      description: 'Completed a Diploma in Education, building a foundation in educational theory and teaching practices.',
      skills: ['Java', 'DBMS', 'Computer Networks', 'SQL'],
    },
    {
      date: 'Jun 2025 – Aug 2025',
      type: 'INTERNSHIP',
      title: 'AI/ML & Data Science Intern',
      organization: 'Sumago Infotech Pvt. Ltd.',
      description: 'Training and hands-on learning in Python, data analysis, machine-learning fundamentals, and data visualization.',
      skills: ['Python', 'Pandas', 'NumPy', 'Data Visualization'],
      link: 'https://drive.google.com/file/d/1XgSf2R8SzVYR9nKJeMoeLa1hQA8dZQ1J/view?usp=sharing',
      linkLabel: 'View internship certificate',
    },
    {
      date: 'Project milestone',
      type: 'CYBERSECURITY PROJECT',
      title: 'Honeypot Management System',
      organization: 'Project work',
      description: 'Built a honeypot management project and made its repository available on GitHub.',
      skills: ['Cybersecurity', 'GitHub', 'Documentation'],
      link: 'https://github.com/Adityathube/honeypot-management-system',
      linkLabel: 'View project repository',
    },
    
    {
      date: 'Ongoing',
      type: 'LEARNING',
      title: 'B.Tech in Computer Science',
      organization: 'Sanjivani University',
      description: 'Building a foundation in computer science, programming, databases, and networking while continuing hands-on projects.',
      skills: ['Java', 'DBMS', 'Computer Networks', 'SQL'],
    },
    {
      date: 'Hackathon',
      type: 'CYBERSECURITY',
      title: 'Cybersecurity CTF Challenges',
      organization: 'Team activity',
      description: 'Participated in Capture The Flag (CTF) challenges to practice cybersecurity concepts, problem-solving, and security analysis.',
      skills: ['Cybersecurity', 'CTF', 'Problem Solving'],
      link: 'https://drive.google.com/file/d/1Ot_hjH0Uhu4rtrkLVS8rWcnocVIpwyOr/view?usp=sharing',
      linkLabel: 'View certificate'
    },
  ]

  return (
    <section className="experience-content timeline-content">
      <p className="feature-comment">// experience.ts - learning, projects, and milestones</p>
      <h1 className="feature-title">Learning <span>Timeline</span></h1>
      <p className="feature-subtitle">// progress over time · projects · participation · education</p>
      <div className="learning-timeline">
        {timeline.map((item, index) => (
          <article className="timeline-item" key={`${item.title}-${index}`}>
            <div className="timeline-rail">
              <span className="timeline-node">{String(index + 1).padStart(2, '0')}</span>
              {index !== timeline.length - 1 && <span className="timeline-line" />}
            </div>
            <div className="timeline-card">
              <div className="timeline-card-top">
                <span className="timeline-type">{item.type}</span>
                <span className="timeline-date">{item.date}</span>
              </div>
              <h2>{item.title}</h2>
              <p className="timeline-organization">{item.organization}</p>
              <p className="timeline-description">{item.description}</p>
              <div className="project-tags">
                {item.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
              {item.link && (
                <a className="timeline-link" href={item.link} target="_blank" rel="noreferrer">
                  {item.linkLabel} ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
      <p className="project-note"><span>✦</span> New milestone get add through my learning journey , soon.</p>
    </section>
  )
}

function ContactSection() {
  const contacts = [
    {
      label: 'EMAIL',
      value: 'adityathube1901@gmail.com',
      href: 'mailto:adityathube1901@gmail.com',
      icon:  SiGmail,
      color: 'red',
    },
    {
      label: 'GITHUB',
      value: 'github.com/Adityathube',
      href: 'https://github.com/Adityathube',
      icon:  SiGithub,
      color: 'white',
    },
    {
      label: 'LINKEDIN',
      value: 'Connect with me professionally',
      href: 'https://www.linkedin.com/in/aditya-thube-23115b350/',
      icon:  FaLinkedin,
      color: 'blue',
    },
    {

      label: 'LEETCODE',
      value: 'Leetcode Contributor',
      href: 'https://leetcode.com/u/Cf0rqVFGXl/',
      icon:  SiLeetcode,
      color: '#FFA116',
    },
  ]

  function handleSubmit(event) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    const name = data.get('name')
    const email = data.get('email')
    const subject = data.get('subject') || 'Portfolio contact'
    const message = data.get('message')

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`
    const mailto = `mailto:adityathube1901@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
  }

  return (
    <section className="contact-content">
      <p className="contact-comment">
        {'/* contact.css - let’s build something */'}
      </p>

      <h1 className="contact-title">
        Get in <span>Touch</span>
      </h1>

      <p className="contact-subtitle">
        // open to opportunities, collaboration & good conversations
      </p>

      <div className="contact-grid">
        <div className="contact-links-column">
          <h2 className="contact-section-heading">FIND ME ON</h2>

          <div className="contact-links">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                className="contact-link-card"
                href={contact.href || undefined}
                target={contact.href ? '_blank' : undefined}
                rel={contact.href ? 'noreferrer' : undefined}
                onClick={!contact.href ? (event) => event.preventDefault() : undefined}
              >
                <span className={`contact-icon icon-${contact.color}`}>
                  {(() => {
                    const Icon = contact.icon
                    return (
                      <Icon
                        size={22}
                        color={contact.color}
                        aria-hidden="true"
                      />
                    )
                  })()}
                </span>

                <span className="contact-link-text">
                  <strong>{contact.label}</strong>
                  <span>{contact.value}</span>
                </span>

                <span className="contact-arrow">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="contact-form-column">
          <h2 className="contact-section-heading">SEND A MESSAGE</h2>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name">// YOUR_NAME *</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Your name"
              required
            />

            <label htmlFor="contact-email">// YOUR_EMAIL *</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />

            <label htmlFor="contact-subject">// SUBJECT</label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              placeholder="What would you like to discuss?"
            />

            <label htmlFor="contact-message">// MESSAGE *</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Write your message..."
              rows="5"
              required
            />

            <button type="submit" className="contact-submit">
              ↗ Send Message()
            </button>

            <p className="contact-form-note">
              // Opens your email app to send the message.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}


function ReadmeSection() {
  const stack = [
    { category: 'Languages', skills: ['Java', 'JavaScript', 'SQL', 'HTML'] },
    { category: 'Frontend', skills: ['React', 'Tailwind CSS', 'Vite'] },
    { category: 'Databases & CS', skills: ['DBMS', 'Computer Networks'] },
    { category: 'Tools', skills: ['Git', 'GitHub', 'Power BI'] },
    { category: 'Security', skills: ['Cybersecurity'] },
  ]

  return (
    <section className="readme-content">
      <h1 className="readme-name">Aditya Thube</h1>

      <div className="readme-rule" />

      <p className="readme-role">
        Computer Science Engineering Student · India 🇮🇳
      </p>

      <div className="readme-badges">
        <span>Java</span>
        <span>JavaScript</span>
        <span>React</span>
        <span>SQL</span>
        <span>Cybersecurity</span>
      </div>

      <h2>💜 About</h2>
      <p className="readme-about">
        Hi, I'm a Computer Science Engineering student interested in software
        development, databases, and cybersecurity. I enjoy learning by building
        projects, exploring new technologies, and strengthening my programming
        fundamentals one step at a time.
      </p>

      <ul className="readme-highlights">
        <li>Building projects with React and JavaScript</li>
        <li>Practising SQL and database concepts</li>
        <li>Exploring cybersecurity and computer networks</li>
        <li>Learning data analysis with Power BI</li>
        <li>Always learning, building, and improving</li>
      </ul>

      <h2>Stack</h2>
      <div className="readme-stack">
        {stack.map((group) => (
          <div className="readme-stack-row" key={group.category}>
            <span className="readme-stack-label">{group.category}:</span>
            <div className="readme-stack-tags">
              {group.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2>Connect</h2>
      <div className="readme-connect">
        <p>
          <span>Email:</span>{' '}
          <a href="mailto:adityathube1901@gmail.com">
            adityathube1901@gmail.com
          </a>
        </p>
        <p>
          <span>GitHub:</span>{' '}
          <a
            href="https://github.com/Adityathube"
            target="_blank"
            rel="noreferrer"
          >
            github.com/Adityathube
          </a>
        </p>
        <p>
          <span>LinkedIn:</span>{''}
          <a
            href='https://www.linkedin.com/in/aditya-thube-23115b350/'
          >
            Connect with me professionally 
          </a>
        </p>
      </div>

      
      <div className="readme-license">
        <h3>© Copyright & Usage</h3>

        <p>
          This portfolio, including its original code, written content,
          and custom design elements, was created by Aditya Thube.
          All rights reserved, except as otherwise stated.
        </p>

        <p>
          You are welcome to explore this portfolio for inspiration.
          However, please do not copy, redistribute, or present my
          original work as your own without permission.
        </p>

        <p>
          If this portfolio inspires you, build something original
          that reflects your own skills, projects, and personality.
          Please provide appropriate credit when referencing or
          reusing my work with permission.
        </p>
      </div>

      <footer className="readme-footer">
        <span>© 2026 Aditya Thube · All rights reserved</span>
        <span>Built with React, Vite & Tailwind CSS</span>
      </footer>

    </section>
  )
}


function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!cursor || !finePointer) return;

    const previousBodyCursor = document.body.style.cursor;
    document.body.classList.add('custom-cursor-enabled');

    const moveCursor = (event) => {
      const target = event.target;
      const hovering = target instanceof Element &&
        Boolean(target.closest('a, button, [role="button"], input[type="submit"]'));

      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.style.display = 'flex';
      cursor.style.width = hovering ? '48px' : '40px';
      cursor.style.height = hovering ? '48px' : '40px';
      cursor.style.borderColor = hovering ? '#20b2a6' : 'rgba(220, 230, 240, 0.8)';

      const dot = cursor.firstElementChild;
      if (dot) {
        dot.style.background = hovering ? '#20b2a6' : '#e6f1ff';
        dot.style.boxShadow = hovering
          ? '0 0 10px rgba(32, 178, 166, 0.95)'
          : '0 0 8px rgba(230, 241, 255, 0.9)';
      }
    };

    const hideCursor = () => {
      cursor.style.display = 'none';
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', hideCursor);
      document.body.classList.remove('custom-cursor-enabled');
      document.body.style.cursor = previousBodyCursor;
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        border: '1px solid rgba(220, 230, 240, 0.8)',
        background: 'rgba(255, 255, 255, 0.02)',
        pointerEvents: 'none',
        zIndex: 2147483647,
        transform: 'translate(-50%, -50%)',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        transition: 'width 150ms ease, height 150ms ease, border-color 150ms ease',
      }}
    >
      <div
        className="custom-cursor-dot"
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: '#e6f1ff',
          boxShadow: '0 0 8px rgba(230, 241, 255, 0.9)',
        }}
      />
    </div>
  );
}

function App() {
  const [activeFile, setActiveFile] = useState('home.jsx')
  const [assistantOpen, setAssistantOpen] = useState(true)
  const [activeSidebar, setActiveSidebar] = useState('explorer')
  const [repoExpanded, setRepoExpanded] = useState(false)

const [expandedFolders, setExpandedFolders] = useState({
  portfolio: true,
  src: true,
  assets: true,
  public: false,
  server: false,
})

const toggleFolder = (folder) => {
  setExpandedFolders((current) => ({
    ...current,
    [folder]: !current[folder],
  }))
}

  const [searchQuery, setSearchQuery] = useState('')
  const [extensionQuery, setExtensionQuery] = useState('')
  const [enabledExtensions, setEnabledExtensions] = useState(['react', 'vite', 'tailwind', 'javascript', 'git', 'github'])
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const [chatError, setChatError] = useState('')


  const searchResults = files.filter((file) => {
    const content = pageContent[file.name]
    const searchableText = [
      file.name,
      content.greeting,
      ...(content.heading || []),
      ...(content.roles || []),
      content.tagline,
      typeof content.description === 'string' ? content.description : '',
    ].join(' ').toLowerCase()
    return searchableText.includes(searchQuery.trim().toLowerCase())
  })

  const page = pageContent[activeFile]
  const filteredExtensions = portfolioExtensions.filter((extension) =>
    `${extension.name} ${extension.publisher} ${extension.category} ${extension.description}`.toLowerCase().includes(extensionQuery.trim().toLowerCase())
  )

  const toggleExtension = (extensionId) => {
    setEnabledExtensions((current) => current.includes(extensionId)
      ? current.filter((id) => id !== extensionId)
      : [...current, extensionId])
  }

  const sendMessage = async (messageOverride) => {
    const message = (typeof messageOverride === 'string' ? messageOverride : chatInput).trim()
    if (!message || chatLoading) return

    setChatMessages((current) => [...current, { role: 'user', content: message }])
    setChatInput('')
    setChatError('')
    setChatLoading(true)

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.error || `Request failed (${response.status})`)
      }
      if (typeof data.reply !== 'string' || !data.reply.trim()) {
        throw new Error('The AI returned an empty response. Please try again.')
      }

      setChatMessages((current) => [...current, { role: 'assistant', content: data.reply.trim() }])
    } catch (error) {
      setChatError(error.message || 'Could not reach the AI service. Check that the backend is running.')
    } finally {
      setChatLoading(false)
    }
  }

  const handleChatSubmit = (event) => {
    event.preventDefault()
    sendMessage()
  }

  return (
    <div className="ide">
      <CustomCursor/>
      {/* Application title bar */}
      <header className="app-titlebar">
        <div className="window-dots">
          <span className="window-dot red" />
          <span className="window-dot yellow" />
          <span className="window-dot green" />
        </div>

        <div className="command-search">
          <span>⌕</span> aditya-thube : portfolio
        </div>

        <button
          className="assistant-toggle"
          onClick={() => setAssistantOpen(!assistantOpen)}
          title="Toggle assistant panel"
        >
          {assistantOpen ? 'Hide Assistant' : 'Show Assistant'}
        </button>
      </header>

      {/* VS Code menu */}
      <nav className="menu-bar">
        <div className="menu-items">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Go</span>
          <span>Run</span>
          <span>Terminal</span>
          <span>Help</span>
        </div>
        <span className="copilot-label">✦ Portfolio Assistant</span>
      </nav>

      <div className="ide-workspace">
        {/* Activity bar */}
        <aside className="activity-bar">
          <button
            className={`activity-icon ${activeSidebar === 'explorer' ? 'selected' : ''}`}
            title="Explorer"
            aria-label="Open Explorer"
            onClick={() => setActiveSidebar('explorer')}
          ><VscFiles size={21} /></button>
          <button
            className={`activity-icon ${activeSidebar === 'search' ? 'selected' : ''}`}
            title="Search"
            aria-label="Search portfolio"
            onClick={() => setActiveSidebar('search')}
          ><VscSearch size={21} /></button>
          <button
            className={`activity-icon ${activeSidebar === 'source-control' ? 'selected' : ''}`}
            title="Source Control"
            aria-label="Open Source Control"
            onClick={() => setActiveSidebar('source-control')}
          ><VscSourceControl size={21} /></button>
          <button
            className={`activity-icon ${activeSidebar === 'extensions' ? 'selected' : ''}`}
            title="Extensions"
            aria-label="Open Extensions"
            onClick={() => setActiveSidebar('extensions')}
          ><VscExtensions size={21} /></button>
          <div className="activity-bottom">
            <button className="activity-icon" title="Settings" aria-label="Settings"><VscSettingsGear size={20} /></button>
          </div>
        </aside>

        {/* Sidebar: Explorer or Source Control */}
        {activeSidebar === 'source-control' ? (
          <aside className="explorer source-control-panel">
            <div className="explorer-heading">SOURCE CONTROL</div>
            <button
              type="button"
              className="source-control-repo-toggle"
              onClick={() => setRepoExpanded(!repoExpanded)}
              aria-expanded={repoExpanded}
            >
              <span className="source-control-chevron">{repoExpanded ? '⌄' : '›'}</span>
              <span className="source-control-git-icon">⑂</span>
              <span className="source-control-repo-name">honeypot-management-system</span>
            </button>
            {repoExpanded && (
              <div className="source-control-repo-details">
                <a
                  className="source-control-primary-link"
                  href="https://github.com/Adityathube/honeypot-management-system"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>↗</span> Open repository on GitHub
                </a>
                <div className="source-control-section-title source-control-links-heading">
                  <span>⌄</span> REPOSITORY LINKS
                </div>
                <a className="source-control-link" href="https://github.com/Adityathube/honeypot-management-system/commits/" target="_blank" rel="noreferrer">
                  <span className="source-control-link-icon">◷</span>
                  <span><strong>Commit history</strong><small>View actual commits on GitHub</small></span>
                  <span className="source-control-external">↗</span>
                </a>
                <a className="source-control-link" href="https://github.com/Adityathube/honeypot-management-system/issues" target="_blank" rel="noreferrer">
                  <span className="source-control-link-icon">◎</span>
                  <span><strong>Issues</strong><small>Repository issues</small></span>
                  <span className="source-control-external">↗</span>
                </a>
                <a className="source-control-link" href="https://github.com/Adityathube/honeypot-management-system/pulls" target="_blank" rel="noreferrer">
                  <span className="source-control-link-icon">⑂</span>
                  <span><strong>Pull requests</strong><small>Review proposed changes</small></span>
                  <span className="source-control-external">↗</span>
                </a>
                <a className="source-control-link" href="https://github.com/Adityathube/honeypot-management-system/blob/main/README.md" target="_blank" rel="noreferrer">
                  <span className="source-control-link-icon">MD</span>
                  <span><strong>README.md</strong><small>Project documentation</small></span>
                  <span className="source-control-external">↗</span>
                </a>
                <div className="source-control-note">
                  <span>ⓘ</span> Repository activity opens on GitHub; this panel does not display invented history.
                </div>
              </div>
            )}
          </aside>
        ) : activeSidebar === 'explorer' ? (
          <aside className="explorer">
            <div className="explorer-heading">EXPLORER</div>
            
<div className="explorer-tree">
  <button
    type="button"
    className="tree-folder tree-root"
    onClick={() => toggleFolder('portfolio')}
    aria-expanded={expandedFolders.portfolio}
  >
    <span>{expandedFolders.portfolio ? '⌄' : '›'}</span>
    <span>▰</span>
    <strong>PORTFOLIO</strong>
  </button>

  {expandedFolders.portfolio && (
    <div className="tree-children">
      <button
        type="button"
        className="tree-folder"
        onClick={() => toggleFolder('public')}
        aria-expanded={expandedFolders.public}
      >
        <span>{expandedFolders.public ? '⌄' : '›'}</span>
        <span>📁</span>
        <span>public</span>
      </button>

      {expandedFolders.public && (
        <div className="tree-children">
          <button
            type="button"
            className={`tree-file ${activeFile === 'resume.pdf' ? 'tree-file-active' : ''}`}
            onClick={() => setActiveFile('resume.pdf')}
          >
            <span className="tree-file-icon"><FileIcon name="resume.pdf" /></span>
            <span>resume.pdf</span>
          </button>
        </div>
      )}

      <button
        type="button"
        className="tree-folder"
        onClick={() => toggleFolder('src')}
        aria-expanded={expandedFolders.src}
      >
        <span>{expandedFolders.src ? '⌄' : '›'}</span>
        <span>📁</span>
        <span>src</span>
      </button>

      {expandedFolders.src && (
        <div className="tree-children">
          <button
            type="button"
            className="tree-folder"
            onClick={() => toggleFolder('assets')}
            aria-expanded={expandedFolders.assets}
          >
            <span>{expandedFolders.assets ? '⌄' : '›'}</span>
            <span>📁</span>
            <span>assets</span>
          </button>

          {expandedFolders.assets && (
            <div className="tree-children">
              <div className="tree-file tree-static-file">
                <span className="tree-file-icon image-icon">▧</span>
                <span>profile.png</span>
              </div>
            </div>
          )}

          {files.filter((file) => file.name !== 'resume.pdf').map((file) => (
            <button
              type="button"
              key={file.name}
              className={`tree-file ${
                activeFile === file.name ? 'tree-file-active' : ''
              }`}
              onClick={() => setActiveFile(file.name)}
            >
              <span className="tree-file-icon">
                <FileIcon name={file.name} />
              </span>
              <span>{file.name}</span>
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        className="tree-folder"
        onClick={() => toggleFolder('server')}
        aria-expanded={expandedFolders.server}
          >
            <span>{expandedFolders.server ? '⌄' : '›'}</span>
            <span>📁</span>
            <span>server</span>
          </button>

          {expandedFolders.server && (
            <div className="tree-children">
              <div className="tree-placeholder">
                Express API · AI assistant
              </div>
            </div>
          )}
        </div>
      )}
    </div>


            <div className="explorer-bottom">
              <span>⌄ &nbsp; OUTLINE</span>
              <span>› &nbsp; TIMELINE</span>
            </div>
          </aside>
        ) : activeSidebar === 'search' ? (
          <aside className="explorer source-control-panel portfolio-search-panel">
            <div className="explorer-heading">SEARCH</div>
            <label className="portfolio-search-label" htmlFor="portfolio-search-input">Search files and portfolio content</label>
            <div className="portfolio-search-input-wrap">
              <span aria-hidden="true">⌕</span>
              <input
                id="portfolio-search-input"
                className="portfolio-search-input"
                type="search"
                placeholder="Search portfolio..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                autoComplete="off"
              />
              {searchQuery && (
                <button className="portfolio-search-clear" type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">×</button>
              )}
            </div>
            <div className="portfolio-search-results-heading">{searchQuery.trim() ? `${searchResults.length} RESULT${searchResults.length === 1 ? '' : 'S'}` : 'FILES'}</div>
            <div className="portfolio-search-results" aria-live="polite">
              {!searchQuery.trim() ? (
                <p className="portfolio-search-hint">Type to search file names, skills, projects, and portfolio text.</p>
              ) : searchResults.length ? (
                searchResults.map((file) => (
                  <button
                    key={file.name}
                    type="button"
                    className={`portfolio-search-result ${activeFile === file.name ? 'is-active' : ''}`}
                    onClick={() => setActiveFile(file.name)}
                  >
                    <span className="file-icon file-icon-svg"><FileIcon name={file.name} /></span>
                    <span className="portfolio-search-result-text">
                      <strong>{file.name}</strong>
                      <small>{pageContent[file.name].tagline}</small>
                    </span>
                    <span className="portfolio-search-open">↗</span>
                  </button>
                ))
              ) : (
                <p className="portfolio-search-hint">No results found. Try another word.</p>
              )}
            </div>
            <button className="source-control-primary-link source-control-return" onClick={() => setActiveSidebar('explorer')}>← Back to Explorer</button>
          </aside>
        ) : (
          <aside className="explorer source-control-panel portfolio-extensions-panel">
            <div className="explorer-heading">EXTENSIONS</div>
            <div className="extensions-search-wrap">
              <span aria-hidden="true">⌕</span>
              <input
                className="extensions-search-input"
                type="search"
                placeholder="Search extensions..."
                aria-label="Search portfolio technologies"
                value={extensionQuery}
                onChange={(event) => setExtensionQuery(event.target.value)}
              />
              {extensionQuery && <button type="button" className="extensions-search-clear" onClick={() => setExtensionQuery('')} aria-label="Clear extension search">×</button>}
            </div>
            <div className="extensions-summary">
              <span>PORTFOLIO TOOLKIT</span>
              <small>{enabledExtensions.length} enabled · {portfolioExtensions.length} available</small>
            </div>
            <div className="extensions-list" aria-live="polite">
              {filteredExtensions.length ? filteredExtensions.map((extension) => {
                const isEnabled = enabledExtensions.includes(extension.id)
                return (
                  <article className="extension-card" key={extension.id}>
                    <div className="extension-card-top">
                      <span className="extension-logo" style={{ color: extension.color }}>{extension.icon}</span>
                      <div className="extension-card-heading">
                        <strong>{extension.name}</strong>
                        <small>{extension.publisher}</small>
                      </div>
                    </div>
                    <p>{extension.description}</p>
                    <div className="extension-card-bottom">
                      <span className="extension-category">{extension.category}</span>
                      <button
                        type="button"
                        className={`extension-toggle ${isEnabled ? 'is-enabled' : ''}`}
                        onClick={() => toggleExtension(extension.id)}
                        aria-pressed={isEnabled}
                      >{isEnabled ? '✓ Enabled' : '＋ Enable'}</button>
                    </div>
                  </article>
                )
              }) : <p className="portfolio-search-hint">No matching technologies. Try React, SQL, Git, or Java.</p>}
            </div>
            <div className="extensions-disclaimer">These are interactive portfolio toolkit cards, not actual VS Code Marketplace installations.</div>
            <button className="source-control-primary-link source-control-return" onClick={() => setActiveSidebar('explorer')}>← Back to Explorer</button>
          </aside>
        )}

        {/* Main editor */}
        <main className="editor-area">
          <div className="editor-tabs">
            {files.map((file) => (
              <button
                key={file.name}
                className={`editor-tab ${
                  activeFile === file.name ? 'tab-active' : ''
                }`}
                onClick={() => setActiveFile(file.name)}
              >
                <span className="editor-tab-file-icon"><FileIcon name={file.name} size={14} /></span>
                {file.name}
                {activeFile === file.name && (
                  <span className="tab-close">×</span>
                )}
              </button>
            ))}
          </div>

          <div className="breadcrumbs">
            aditya-thube &nbsp; › &nbsp; src &nbsp; › &nbsp; {page.label}
          </div>

          

{activeFile === 'about.html' ? (
            <AboutSection />
          ) : activeFile === 'projects.js' ? (
            <ProjectsSection />
          ) : activeFile === 'github.json' ? (
            <GitHubActivitySection />
          ) : activeFile === 'resume.pdf' || activeFile === 'certificates.json' ? (
            <ResumeCertificatesSection />
          ) : activeFile === 'query.sql' ? (
            <SQLPlaygroundSection />
          ) : activeFile === 'skills.json' ? (
            <SkillsSection />
          ) : activeFile === 'experience.ts' ? (
            <ExperienceSection />
          ) : activeFile === 'contact.css' ? (
            <ContactSection />
          ) : activeFile === 'README.md' ? (
            <ReadmeSection />
          ) : (
            <>
              <div className="hero-main">
                <section className="hero-content">
                  <p className="hero-comment">{page.greeting}</p>

                  <h1 className="hero-name">
                    <span>{page.heading[0]}</span>
                    <span className="name-accent">{page.heading[1]}</span>
                  </h1>

                  <div className="role-badges">
                    {page.roles.map((role, index) => (
                      <span className="role-badge" key={role}>
                        <i className={`badge-dot badge-${index % 3}`} />
                        {role}
                      </span>
                    ))}
                  </div>

                  <p className="hero-tagline">
                    {page.tagline}
                    <span className="cursor">▍</span>
                  </p>

                  <p className="hero-description">{page.description}</p>

                  <div className="hero-actions">
                    <button
                      className="action-button primary-button"
                      onClick={() => setActiveFile('projects.js')}
                    >
                      ▰ Projects
                    </button>

                    <button
                      className="action-button"
                      onClick={() => setActiveFile('about.html')}
                    >
                      ♟ About Me
                    </button>

                    <button
                      className="action-button"
                      onClick={() => setActiveFile('contact.css')}
                    >
                      ✉ Contact
                    </button>
                  </div>
                </section>

                <div className="hero-portrait">
                  <img
                    src={profileImage}
                    alt="Aditya Thube"
                    className="profile-image"
                  />
                </div>
              </div>

              <div className="stats-panel">
                <div className="stat">
                  <strong>01</strong>
                  <span>FEATURED PROJECT</span>
                </div>
                <div className="stat">
                  <strong>12+</strong>
                  <span>TECHNOLOGIES</span>
                </div>
                <div className="stat">
                  <strong>∞</strong>
                  <span>CURIOSITY</span>
                </div>
                <div className="stat">
                  <strong>↑</strong>
                  <span>ALWAYS LEARNING</span>
                </div>
              </div>

              <div className="social-links">
                <a
                  href="https://github.com/Adityathube/honeypot-management-system"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SiGithub aria-hidden="true" /> GitHub Projects
                </a>

                <a href="mailto:adityathube1901@gmail.com">
                  <SiGmail aria-hidden="true" /> Email
                </a>

                <a
                  href="https://www.linkedin.com/in/aditya-thube-23115b350/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin aria-hidden="true" /> LinkedIn
                </a>

                <a
                  href="https://leetcode.com/u/Cf0rqVFGXl/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SiLeetcode aria-hidden="true" /> LeetCode
                </a>
              </div>
            </>
          )}


          <div className="editor-bottom">
            <span>◈ {page.label}</span>
            <span>React · JavaScript</span>
          </div>
        </main>

        {/* Right assistant panel */}
        {assistantOpen && (
          <aside className="assistant-panel">
            <div className="assistant-heading">
              <span className="assistant-heading-icon"><VscSparkle size={17} /></span>
              <span className="assistant-heading-title">Portfolio Assistant</span>
              <button
                onClick={() => setAssistantOpen(false)}
                aria-label="Close assistant"
              >
                <VscClose size={16} />
              </button>
            </div>

            <div className="assistant-workspace">
              <span className="workspace-label">WORKSPACE</span>
              <span className="workspace-chip">● portfolio · aditya</span>
            </div>

            <div className="assistant-welcome">
              <div className="assistant-avatar"><VscSparkle size={25} /></div>
              <h3>Hi! Welcome 👋</h3>
              <p>Explore my projects, skills, and learning journey.</p>
            </div>

            {chatMessages.length === 0 && (
            <div className="assistant-prompts">
              {[
                ['Tell me about', 'the developer'],
                ['What projects', 'have been built?'],
                ['Which skills', 'are listed?'],
                ['How can I', 'get in touch?'],
              ].map(([line1, line2]) => (
                <button
                  key={line1}
                  onClick={() => {
                    const question = line1.includes('projects')
                      ? 'What projects has Aditya built?'
                      : line1.includes('skills')
                        ? 'Which skills and technologies does Aditya know?'
                        : line1.includes('touch')
                          ? 'How can visitors contact Aditya?'
                          : 'Tell me about Aditya Thube.'
                    sendMessage(question)
                  }}
                >
                  <span>✦</span> {line1} {line2}
                </button>
              ))}
            </div>
            )}

            <div
              className="assistant-chat-messages"
              aria-live="polite"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '12px 14px',
                overflowY: 'auto',
                flex: '1 1 auto',
                minHeight: '100px',
                maxHeight: '38vh',
              }}
            >
              {chatMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`assistant-message ${message.role === 'user' ? 'assistant-message-user' : 'assistant-message-ai'}`}
                  style={{
                    alignSelf: message.role === 'user' ? 'flex-end' : 'stretch',
                    maxWidth: message.role === 'user' ? '90%' : '100%',
                    padding: '9px 11px',
                    borderRadius: '8px',
                    background: message.role === 'user' ? 'rgba(32, 178, 166, 0.14)' : 'rgba(255,255,255,0.035)',
                    border: message.role === 'user' ? '1px solid rgba(32,178,166,0.28)' : '1px solid rgba(255,255,255,0.07)',
                    color: '#d7e0e8',
                    fontSize: '12px',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                    overflowWrap: 'anywhere',
                  }}
                >
                  <div className="assistant-message-label">
                    {message.role === 'user' ? 'You' : <><VscSparkle size={12} /> Portfolio Assistant</>}
                  </div>
                  {message.content}
                </div>
              ))}
              {chatLoading && (
                <div style={{ color: '#9ba9b8', fontSize: '12px', padding: '6px 2px' }}>
                  <span style={{ color: '#20b2a6' }}>●</span> Thinking...
                </div>
              )}
              {chatError && (
                <div role="alert" style={{ color: '#f0a09a', fontSize: '11px', lineHeight: 1.5, padding: '8px', border: '1px solid rgba(240,160,154,0.25)', borderRadius: '6px' }}>
                  {chatError}
                </div>
              )}
            </div>

            <div className="assistant-disclaimer">
              AI responses may be inaccurate. Do not share private information.
            </div>

            <form className="assistant-input" onSubmit={handleChatSubmit}>
              <input
                type="text"
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                placeholder="Ask about Aditya's portfolio..."
                aria-label="Message the Portfolio Assistant"
                autoComplete="off"
                disabled={chatLoading}
                style={{ flex: 1, minWidth: 0, width: '100%', color: '#d7e0e8', background: 'transparent', border: 0, outline: 'none', font: 'inherit' }}
              />
              <button
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                aria-label="Send message"
                title="Send message"
              >
                {chatLoading ? '…' : <VscSend size={17} />}
              </button>
            </form>
          </aside>
        )}
      </div>

      {/* Status bar */}
      <footer className="status-bar">
        <span>⑂ main</span>
        <span>✓ Ready</span>
        <div className="status-right">
          <span>React</span>
          <span>JavaScript JSX</span>
          <span>UTF-8</span>
          <span>Charcoal + Teal</span>
        </div>
      </footer>
    </div>
  )
}

export default App
