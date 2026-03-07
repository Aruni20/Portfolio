import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Github,
  ExternalLink,
  Cpu,
  LineChart,
  Database,
  BrainCircuit,
  Mail,
  Linkedin,
  Terminal,
  Activity,
  Layers,
  Award,
  Briefcase,
  ChevronDown,
  ChevronUp,
  GraduationCap,
} from 'lucide-react';
import projectsData from './data/projects.json';
import experienceData from './data/experience.json';
import educationData from './data/education.json';

const Marquee = ({ text, direction = "left" }) => {
  return (
    <div className="marquee">
      <motion.div
        className="marquee-track"
        animate={{ x: direction === "left" ? [0, -1000] : [-1000, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </div>
  );
};

const SectionTitle = ({ title, icon }) => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      className="section-title"
    >
      {icon} {title}
    </motion.h2>
  );
};

const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = (cat) => {
    switch (cat) {
      case 'Quant Finance': return <LineChart size={20} />;
      case 'Generative AI': return <BrainCircuit size={20} />;
      case 'Data Science': return <Activity size={20} />;
      case 'Engineering': return <Database size={20} />;
      default: return <Terminal size={20} />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`project-card ${isExpanded ? 'active' : ''}`}
    >
      <div className="project-header">
        <div className="project-icon">{getIcon(project.category)}</div>
        <div className="project-links">
          {project.links?.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-github-link" title="View on GitHub" aria-label="View project on GitHub">
              <Github size={22} />
              <span>GitHub</span>
            </a>
          )}
          {project.links?.live && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="project-live-link" title="View live demo" aria-label="View live demo">
              <ExternalLink size={22} />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>
      <div className="project-info">
        <span className="project-category-tag">{project.category.toUpperCase()}</span>
        <h3 className="project-title-text">{project.title}</h3>
        <p className="project-desc-text">{project.description}</p>
      </div>

      <div className="project-tags">
        {project.techStack?.map(tag => <span key={tag} className="tag">{tag}</span>)}
      </div>

      <button className="explore-button" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? (
          <>Less Details <ChevronUp size={14} /></>
        ) : (
          <>Technical Novelty <ChevronDown size={14} /></>
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="project-expanded-content"
          >
            <div className="detail-section">
              <h4>PROBLEM STATEMENT</h4>
              <p>{project.problem}</p>
            </div>
            <div className="detail-section">
              <h4>APPROACH</h4>
              <p>{project.approach}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function App() {
  const [filter, setFilter] = useState('All');
  const [showMore, setShowMore] = useState(false);
  const categories = ['All', 'Quant Finance', 'Generative AI', 'Data Science', 'Engineering'];

  const handleFilterChange = (cat) => {
    setFilter(cat);
    setShowMore(false);
  };

  const allFiltered = filter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  const displayedProjects = showMore ? allFiltered : allFiltered.slice(0, 6);

  const skills = {
    "Quantitative Finance": [
      "Algorithmic Trading",
      "Multi-Agent Backtesting",
      "PCA & Eigenportfolios",
      "Market Microstructure",
      "Gurobi Optimization",
      "Risk Modeling",
      "Options Pricing (Black–Scholes)",
      "Factor Models",
      "Time-Series Forecasting"
    ],
    "Generative AI": [
      "RAG Systems",
      "LangChain",
      "Fine-Tuned LLMs",
      "Multimodal Agents",
      "Stable Diffusion",
      "Prompt Engineering",
      "LangGraph",
      "Vector Databases (FAISS)",
      "Open-Source LLM Tooling"
    ],
    "Data Science": [
      "Deep Learning (CNN/RNN/GCN)",
      "Bayesian Statistics",
      "Time Series",
      "Feature Engineering",
      "Graph Neural Networks",
      "Clustering & PCA",
      "Recommender Systems",
      "Experiment Design"
    ],
    "Systems & Infrastructure": [
      "System Design",
      "AWS Cloud",
      "MILP Optimization",
      "Kafka",
      "PySpark",
      "CI/CD",
      "Docker & Containers",
      "REST APIs",
      "PostgreSQL"
    ]
  };

  return (
    <div className="app-container">
      <div className="glow-mesh"></div>

      <nav>
        <div className="nav-brand">
          <span className="logo-text">ARUNI SAXENA</span>
          <span className="logo-dot">.</span>
        </div>
        <div className="nav-links">
          <a href="#experience">EXPERIENCE</a>
          <a href="#projects">PROJECTS</a>
          <a href="#education">EDUCATION</a>
          <a href="#achievements">HONORS</a>
          <a href="#skills">SKILLS</a>
          <a href="#contact">CONTACT</a>
        </div>
        <div className="nav-status">
          <span className="status-dot"></span>
          AVAILABLE FOR GLOBAL INITIATIVES
        </div>
      </nav>

      <main>
        {/* Premium Integrated Hero */}
        <section className="hero-branded">
          <div className="hero-grid">
            <motion.div
              className="hero-text-block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="hero-title">
                Markets, Models, & <br />
                <span className="italic-accent">Machine Intelligence</span>.
              </h1>

              <div className="hero-intro-para">
                <div className="progression-intro">
                  <p>Markets don’t reward elegance; they reward structure that survives execution.</p>
                </div>

                <p className="progression-path">
                  Mathematics taught me to recognize <strong>structure</strong>.
                  Machine learning proved it can be <strong>learned</strong>.
                  Applied AI lets me <strong>engineer</strong> it under real constraints.
                </p>

                <p className="identity-stmt">I’m Aruni Saxena, building systems along that progression.</p>
              </div>
            </motion.div>

            <motion.div
              className="hero-image-block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="image-frame">
                <img src={`${import.meta.env.BASE_URL}portfolio-picture.jpg`} alt="Aruni Saxena" className="profile-img" />
                <div className="image-glow"></div>
              </div>
            </motion.div>
          </div>

          <div className="collab-integrated">
            <div className="collab-transition">
              OPEN TO COLLABORATION IN:
            </div>
            <div className="manifesto-pillars-list">
              <motion.div
                className="compact-pillar p-1"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <strong>Quantitative Systems</strong>
                <span>
                  Multi-agent backtesting, execution engines, factor research, volatility surfaces, and risk-first architecture under market-microstructure constraints.
                </span>
              </motion.div>
              <motion.div
                className="compact-pillar p-2"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 15 }} /* Maintain stagger */
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <strong>Machine Learning Research</strong>
                <span>
                  Research spanning NLP, NLU and user-preference modeling, knowledge-graph, data driven recommendation systems, graph neural networks, and reasoning-aware models designed to detect and mitigate hallucinations.
                </span>
              </motion.div>
              <motion.div
                className="compact-pillar p-3"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <strong>Applied Artificial Intelligence</strong>
                <span>
                  Production-grade GenAI: semantic kernels, RAG architectures, LLM Ops, MCP-style tools, and agentic AI pipelines that can be monitored and iterated in real time.
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="marquee-wrapper">
          <Marquee text="MARKETS • MODELS • MACHINE INTELLIGENCE • QUANTITATIVE SYSTEMS • RESEARCH • ENGINEERING • " direction="left" />
        </div>

        {/* Experience Section */}
        <section id="experience">
          <SectionTitle title="Experience" icon={<Briefcase size={24} />} />
          <div className="timeline">
            {experienceData.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="timeline-item"
              >
                <div className="timeline-year">{exp.period}</div>
                <h3 className="timeline-role">{exp.role}</h3>
                <h4 className="timeline-company">@ {exp.company} • {exp.location}</h4>
                {exp.description && (
                  <p className="timeline-desc">{exp.description}</p>
                )}
                {exp.bullets && (
                  <ul className="timeline-bullets">
                    {exp.bullets.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section">
          <SectionTitle title="Contributions" icon={<Layers size={24} />} />

          <div className="filter-bar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleFilterChange(cat)}
                className={`filter-button ${filter === cat ? 'active' : ''}`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <motion.div layout className="projects-grid">
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>

          {allFiltered.length > 6 && !showMore && (
            <div className="show-more-container">
              <button className="cta-button secondary" onClick={() => setShowMore(true)}>
                EXPLORE COMPLETE REPOSITORY
              </button>
            </div>
          )}
        </section>

        {/* Education Section */}
        <section id="education">
          <SectionTitle title="Education" icon={<GraduationCap size={24} />} />
          <div className="education-list">
            {educationData.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="education-item"
              >
                <div className="education-year">{edu.year}</div>
                <div className="education-content">
                  <h3>{edu.program}</h3>
                  <h4>{edu.institution}</h4>
                  <p>{edu.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements">
          <SectionTitle title="Honors" icon={<Award size={24} />} />

          <div className="honors-divider">Impact beyond academics.</div>

          <div className="achievements-list">
            <div className="honors-two-column">
              <div className="honors-column">
                <h3 className="honors-column-title">Academic Work</h3>

                <div className="honors-block honors-card">
                  <h4 className="honors-subtitle">Scholarships</h4>
                  <ul className="honors-list">
                    <li>DAIICT Merit Scholarship (2024–25) — Ranked 1st in Data Science program, DAIICT.</li>
                    <li>Jagdish Sharan Saxena Scholarship (JMC) — Ranked 2nd Mathematics Department, JMC.</li>
                  </ul>
                </div>

                <div className="honors-block honors-card">
                  <h4 className="honors-subtitle">Research</h4>
                  <ul className="honors-list">
                    <li>Physics-Guided Solar PV Loss Estimation model.</li>
                    <li>Solar rooftop decision-support system funded by BSES Delhi.</li>
                  </ul>
                </div>

                <div className="honors-block honors-card">
                  <h4 className="honors-subtitle">Competitions</h4>
                  <ul className="honors-list">
                    <li>1st — Shri Shanti Narayan Mathematical Conclave (Hansraj College, University of Delhi).</li>
                    <li>
                      6× inter-college mathematics-based research paper presentation awards —{' '}
                      <a
                        href="https://www.jmc.ac.in/uploads/staticfiles/iqac/departmentreport/2022-23/Mathematics.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        view more
                      </a>
                      .
                    </li>
                  </ul>
                </div>
              </div>

              <div className="honors-column">
                <h3 className="honors-column-title">Leadership &amp; Impact</h3>

                <div className="honors-block honors-card">
                  <h4 className="honors-subtitle">Leadership &amp; Public Speaking</h4>
                  <ul className="honors-list">
                    <li>Best International Press — LSR MUN.</li>
                    <li>Best Delegate (UNSC) — Khalsa College MUN.</li>
                    <li>Awards across St. Stephen’s, Venky, and Lakshmibai MUNs.</li>
                    <li>Content Head of Mathrena — Bi-Annual Newsletter (Math Dept., JMC).</li>
                  </ul>
                </div>

                <div className="honors-block honors-card">
                  <h4 className="honors-subtitle">Service</h4>
                  <ul className="honors-list">
                    <li>National Service Scheme (2 Years).</li>
                  </ul>
                </div>

                <div className="honors-block honors-card">
                  <h4 className="honors-subtitle">Creative</h4>
                  <ul className="honors-list">
                    <li>Winner — Best Out of Waste (Avani, JDMC).</li>
                    <li>English Creative Writing recognitions — SLC College DU &amp; Delhi University circuit.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills-section">
          <SectionTitle title="Skills" icon={<Cpu size={24} />} />
          <div className="skills-container">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="skill-category">
                <h3 className="skill-category-title">{category}</h3>
                <p className="skill-cluster">{items.join(' · ')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <SectionTitle title="Connection" icon={<Mail size={24} />} />
          <div className="reach-dropbox">
            <h3 className="reach-title">Reach out</h3>
            <p className="reach-subtitle">If you're building systems that demand rigor — let's connect.</p>
            <form
              className="reach-form"
              action="https://formspree.io/f/YOUR_FORM_ID"
              method="POST"
            >
              <input type="hidden" name="_subject" value="Portfolio: New message" />
              <input type="text" name="name" placeholder="Your name" required />
              <input type="email" name="email" placeholder="Your email" required />
              <input type="text" name="subject" placeholder="Subject" required />
              <textarea name="message" placeholder="Your message" rows="4" required></textarea>
              <button type="submit" className="cta-button primary">Send</button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-links">
          <motion.a whileHover={{ y: -3 }} href="https://github.com/Aruni20" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="GitHub"><Github size={28} /></motion.a>
          <motion.a whileHover={{ y: -3 }} href="https://linkedin.com/in/aruni-saxena" target="_blank" rel="noopener noreferrer" className="footer-icon-link" aria-label="LinkedIn"><Linkedin size={28} /></motion.a>
          <motion.a whileHover={{ y: -3 }} href="mailto:202418006@dau.ac.in" className="footer-icon-link" aria-label="Email"><Mail size={28} /></motion.a>
        </div>
        <p className="footer-copy">© {new Date().getFullYear()} ARUNI SAXENA</p>
      </footer>
    </div>
  );
}

export default App;
