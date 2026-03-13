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
    isLoading,
    error,
    query,
    activeTag,
    currentSlide,
    latestCourses,
    tags,
    totalCourses,
    isLatestLoading,
    areTagsLoading,
    resultsCopy,
    latestError,
    tagsError,
    countError,
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
            <InstructorSection totalCourses={countError ? courses.length : totalCourses} />
            <LatestCoursesPanel
              courses={latestCourses}
              currentSlide={currentSlide}
              onChangeSlide={setCurrentSlide}
              isLoading={isLatestLoading}
              error={latestError}
            />
          </section>

          <CatalogSection
            query={query}
            activeTag={activeTag}
            tags={tags}
            resultsCopy={resultsCopy}
            courses={courses}
            isLoading={isLoading}
            error={error ?? tagsError}
            areTagsLoading={areTagsLoading}
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
