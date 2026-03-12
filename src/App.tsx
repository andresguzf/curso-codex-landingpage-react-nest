import { useState } from 'react';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { CatalogSection } from './components/sections/CatalogSection';
import { InstructorSection } from './components/sections/InstructorSection';
import { LatestCoursesPanel } from './components/sections/LatestCoursesPanel';
import { useCourses } from './hooks/useCourses';

function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const {
    courses,
    query,
    activeTag,
    currentSlide,
    latestCourses,
    tags,
    filteredCourses,
    resultsCopy,
    setQuery,
    setActiveTag,
    setCurrentSlide,
  } = useCourses();

  return (
    <div className={`app-shell${isLightTheme ? ' theme-light' : ''}`}>
      <div className="page-shell">
        <Header isLightTheme={isLightTheme} onToggleTheme={() => setIsLightTheme((value) => !value)} />

        <main className="site-main">
          <section className="hero-panel" id="inicio">
            <InstructorSection totalCourses={courses.length} />
            <LatestCoursesPanel courses={latestCourses} currentSlide={currentSlide} onChangeSlide={setCurrentSlide} />
          </section>

          <CatalogSection
            query={query}
            activeTag={activeTag}
            tags={tags}
            resultsCopy={resultsCopy}
            courses={filteredCourses}
            onQueryChange={setQuery}
            onTagChange={setActiveTag}
          />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
