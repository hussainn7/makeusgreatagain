import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Layers, PlayCircle, ListOrdered, CheckCircle2 } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

// Utility: format plural labels
const pluralize = (n: number, s: string) => `${n} ${s}${n === 1 ? '' : 's'}`;

export default function CoursePage() {
  const { slug } = useParams();
  const { isLessonCompleted } = useProgress();
  const [course, setCourse] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState<{ completed: number; total: number; percentage: number }>({ completed: 0, total: 0, percentage: 0 });

  useEffect(() => {
    setCourse(null);
    setError('');
    if (!slug) return;

    fetch(`/content/${slug}/index.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load course: ${r.status}`);
        return r.json();
      })
      .then(async (data) => {
        setCourse(data);

        const total = data.units.reduce((sum: number, u: any) => sum + (u.lessons?.length || 0), 0);

        let completed = 0;
        data.units.forEach((unit: any) => {
          unit.lessons?.forEach((lesson: any) => {
            if (isLessonCompleted(slug, lesson.slug)) completed++;
          });
        });

        setProgress({
          completed,
          total,
          percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
        });
      })
      .catch((e) => setError(e.message));
  }, [slug, isLessonCompleted]);

  const totals = useMemo(() => {
    const totalUnits = course?.units?.length || 0;
    const totalLessons = (course?.units || []).reduce((sum: number, u: any) => sum + (u.lessons?.length || 0), 0);
    return { totalUnits, totalLessons };
  }, [course]);

  // Background gradient + subtle grid
  const Background = () => (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '22px 22px',
      }} />
      <div className="absolute -top-24 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/40 via-cyan-400/30 to-emerald-400/30 blur-3xl" />
    </div>
  );

  if (error) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-6">
        <Background />
        <Card className="max-w-xl w-full bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-rose-200">Something went wrong</CardTitle>
            <CardDescription className="text-white/70">{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Link to="/tutorials">Back to courses</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-[60vh] grid place-items-center px-6">
        <Background />
        <div className="w-full max-w-3xl space-y-6">
          {/* Skeleton shimmer */}
          <div className="h-8 w-64 rounded-lg bg-white/10 animate-pulse" />
          <div className="h-4 w-full rounded-lg bg-white/10 animate-pulse" />
          <div className="h-4 w-5/6 rounded-lg bg-white/10 animate-pulse" />
          <div className="h-2 w-full rounded bg-white/10 animate-pulse" />
          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Background />

      {/* Header */}
      <header className="mx-auto max-w-5xl pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
        >
          <div className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl text-white font-semibold tracking-tight flex items-center gap-3">
                  <span className="inline-grid place-items-center rounded-2xl bg-white/10 border border-white/10 p-2">
                    <BookOpen className="w-6 h-6 text-cyan-300" />
                  </span>
                  {course.title}
                </h1>
                <p className="mt-2 text-white/70 leading-relaxed max-w-2xl">{course.description}</p>

                {/* Stats pills */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-white/80">
                    <Layers className="w-4 h-4 text-white/60" /> {pluralize(totals.totalUnits, 'Unit')}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-white/80">
                    <ListOrdered className="w-4 h-4 text-white/60" /> {pluralize(totals.totalLessons, 'Lesson')}
                  </span>
                </div>
              </div>

              {/* Progress card */}
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-inner max-w-sm w-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-base">Course Progress</CardTitle>
                  <CardDescription className="text-white/70">
                    {progress.completed} / {progress.total} lessons completed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={progress.percentage} className="h-2 bg-white/10" indicatorClassName="bg-emerald-400" />
                  <div className="mt-2 text-right text-sm text-white/70">{progress.percentage}%</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Units */}
      <main className="mx-auto max-w-5xl px-4 py-10">
        <Accordion type="single" collapsible className="space-y-4">
          {course.units.map((u: any) => {
            const hasLessons = (u.lessons?.length || 0) > 0;
            const firstLesson = hasLessons ? u.lessons[0] : null;

            // Per-unit completed count
            const unitCompleted = (u.lessons || []).filter((l: any) => isLessonCompleted(course.slug, l.slug)).length;
            const unitTotal = u.lessons?.length || 0;
            const unitPct = unitTotal > 0 ? Math.round((unitCompleted / unitTotal) * 100) : 0;

            return (
              <AccordionItem
                key={u.order}
                value={`unit-${u.order}`}
                className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              >
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="w-full flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-left">
                      <div className="text-white font-medium">Unit {u.order}: {u.title}</div>
                      <div className="text-white/60 text-xs">
                        {hasLessons ? `${pluralize(u.lessons.length, 'lesson')}` : 'Lessons coming soon'}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {hasLessons && (
                        <div className="hidden sm:flex flex-col items-end">
                          <div className="text-xs text-white/70">{unitCompleted}/{unitTotal}</div>
                          <div className="h-1 w-28 rounded bg-white/10 overflow-hidden">
                            <div className="h-full bg-cyan-400" style={{ width: `${unitPct}%` }} />
                          </div>
                        </div>
                      )}
                      <Badge className={
                        hasLessons
                          ? 'bg-cyan-500/20 text-cyan-100 border-cyan-400/30'
                          : 'bg-white/10 text-white/80 border-white/20'
                      }>
                        {hasLessons ? 'Open' : 'Soon'}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <Card className="bg-transparent border-0 shadow-none">
                    <CardHeader className="pt-0">
                      <CardTitle className="text-white text-lg">Lessons</CardTitle>
                      <CardDescription className="text-white/60">
                        {hasLessons ? 'Choose a lesson to begin' : 'This unit will be available soon.'}
                      </CardDescription>
                    </CardHeader>

                    {hasLessons && (
                      <CardContent>
                        <ul className="space-y-3">
                          <AnimatePresence initial={false}>
                            {u.lessons.map((l: any, idx: number) => {
                              const completed = isLessonCompleted(course.slug, l.slug);
                              return (
                                <motion.li
                                  key={l.slug}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -8 }}
                                  transition={{ duration: 0.2, delay: idx * 0.02 }}
                                  className="group flex items-center justify-between gap-3 rounded-xl p-3 border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:border-white/20 hover:bg-white/[0.06] transition"
                                >
                                  <div className="text-white/90 flex items-center min-w-0">
                                    <span className="text-white/60 mr-3 tabular-nums w-6 text-right">{idx + 1}.</span>
                                    <Link className="truncate text-cyan-200 hover:underline" to={`/tutorials/${course.slug}/lesson/${l.slug}`}>
                                      {l.title}
                                    </Link>
                                    {completed && <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-2 shrink-0" />}
                                  </div>
                                  <Link to={`/tutorials/${course.slug}/lesson/${l.slug}`} className="shrink-0">
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      className={completed
                                        ? 'bg-emerald-500/15 text-emerald-100 border border-emerald-400/30 hover:bg-emerald-500/25'
                                        : 'bg-cyan-500/15 text-cyan-100 border border-cyan-400/30 hover:bg-cyan-500/25'}
                                    >
                                      {completed ? 'Review' : 'Open'}
                                    </Button>
                                  </Link>
                                </motion.li>
                              );
                            })}
                          </AnimatePresence>
                        </ul>

                        {firstLesson && (
                          <div className="mt-6">
                            <Button asChild className="gap-2 bg-cyan-600/80 hover:bg-cyan-600 text-white shadow">
                              <Link to={`/tutorials/${course.slug}/lesson/${firstLesson.slug}`}>
                                <PlayCircle className="w-4 h-4" /> Start Unit
                              </Link>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    )}
                  </Card>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </main>
    </div>
  );
}
