import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { CatalogSection } from './components/sections/CatalogSection';
import { InstructorSection } from './components/sections/InstructorSection';
import { LatestCoursesPanel } from './components/sections/LatestCoursesPanel';
import { useAuth } from './hooks/useAuth';
import { useCourses } from './hooks/useCourses';
import { AdminPage } from './pages/AdminPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LoginPage } from './pages/LoginPage';

function LandingPage({ isLightTheme, onToggleTheme }: { isLightTheme: boolean; onToggleTheme: () => void }) {
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
        <Header isLightTheme={isLightTheme} onToggleTheme={onToggleTheme} />

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

function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage isLightTheme={isLightTheme} onToggleTheme={() => setIsLightTheme((value) => !value)} />} />
      <Route
        path="/cursos/:courseId/:slug"
        element={<CourseDetailPage isLightTheme={isLightTheme} onToggleTheme={() => setIsLightTheme((value) => !value)} />}
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/admin" replace />
          ) : (
            <LoginPage isLightTheme={isLightTheme} onToggleTheme={() => setIsLightTheme((value) => !value)} />
          )
        }
      />
      <Route
        path="/admin"
        element={
          isAuthenticated ? (
            <AdminPage isLightTheme={isLightTheme} onToggleTheme={() => setIsLightTheme((value) => !value)} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
