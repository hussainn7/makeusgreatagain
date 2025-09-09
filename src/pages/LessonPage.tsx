import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';

type Question = { id: string; prompt: string; choices: string[]; correctIndex: number };

export default function LessonPage() {
  const { slug, lessonSlug } = useParams();
  const { markLessonComplete, isLessonCompleted } = useProgress();
  const [lesson, setLesson] = useState<any>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<{ score: number; total: number; mistakes: number } | null>(null);
  const [error, setError] = useState<string>('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setLesson(null);
    setError('');
    if (!slug || !lessonSlug) return;

    const loadLesson = async () => {
      try {
        const response = await fetch(`/content/${slug}/lessons/${lessonSlug}.json`);
        if (!response.ok) throw new Error(`Failed to load lesson: ${response.status}`);
        const data = await response.json();
        setLesson(data);
        if (data.quiz?.questions) setAnswers(Array(data.quiz.questions.length).fill(-1));
        
        // Check if lesson is already completed
        const isCompleted = isLessonCompleted(slug, lessonSlug);
        setCompleted(isCompleted);
      } catch (e) {
        setError(e.message);
      }
    };

    loadLesson();
  }, [slug, lessonSlug, isLessonCompleted]);

  async function submitQuiz() {
    if (!lesson?.quiz?.questions || !slug || !lessonSlug) {
      // eslint-disable-next-line no-console
      console.error('[LessonPage] Missing required data:', { lesson, slug, lessonSlug });
      return;
    }

    // Get unit order from lesson slug (e.g., "02-comparison-operators" → 2)
    const unitOrder = parseInt(lessonSlug.split('-')[0], 10);
    if (isNaN(unitOrder)) {
      // eslint-disable-next-line no-console
      console.error('[LessonPage] Invalid lesson slug format:', lessonSlug);
      return;
    }

    // eslint-disable-next-line no-console
    console.log('[LessonPage] Submitting quiz...', { answers, unitOrder });

    const qs: Question[] = lesson.quiz.questions;
    let score = 0;
    qs.forEach((q, i) => { if (answers[i] === q.correctIndex) score += 1; });
    const total = qs.length;
    const percentage = (score / total) * 100;

    // eslint-disable-next-line no-console
    console.log('[LessonPage] Quiz results:', { score, total, percentage });

    setResult({ score, total, mistakes: total - score });

    // Mark lesson as complete if score is good enough (e.g., 70% or better)
    if (percentage >= 70) {
      try {
        // eslint-disable-next-line no-console
        console.log('[LessonPage] Quiz passed, marking complete...', {
          slug,
          unitOrder: lesson.unit_order || 1,
          lessonSlug,
          score,
          total,
          percentage
        });

        // Verify we have all required data
        if (!slug || !lessonSlug) {
          throw new Error('Missing required data: ' + JSON.stringify({ slug, lessonSlug }));
        }

        // Try to mark complete
        try {
          await markLessonComplete(slug, unitOrder, lessonSlug, score, total);
          // eslint-disable-next-line no-console
          console.log('[LessonPage] Successfully marked complete');
          setCompleted(true);
        } catch (markError) {
          // eslint-disable-next-line no-console
          console.error('[LessonPage] Database error:', markError);
          throw markError;
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[LessonPage] Failed to mark lesson complete:', err);
        alert('Failed to save progress. Please try again or contact support if the issue persists.');
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('[LessonPage] Score too low to mark complete:', percentage);
    }
  }

  if (error) return <div className="p-6 text-red-300">{error}</div>;
  if (!lesson) return <div className="p-6 text-white/80">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto py-24 px-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
          {lesson.meta?.noCoding && (
            <div className="text-xs px-2 py-1 rounded bg-white/10 border border-white/15 text-white/70 inline-block">
              🚫 No coding yet — just learning!
            </div>
          )}
        </div>
        {completed && (
          <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 border border-green-400/30 rounded-lg">
            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-300 font-medium">Completed</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {lesson.sections?.map((s: any, idx: number) => {
          if (s.type === 'objectives') {
            return (
              <section key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h2 className="text-white font-semibold mb-2">🎯 Objectives</h2>
                <ul className="list-disc list-inside text-white/80 space-y-1">
                  {s.items.map((it: string, i: number) => <li key={i}>{it}</li>)}
                </ul>
              </section>
            );
          }
          if (s.type === 'explanation') {
            return (
              <section key={idx} className="space-y-2">
                <h2 className="text-white font-semibold">{s.heading}</h2>
                {s.paragraphs?.map((p: string, i: number) => <p key={i} className="text-white/80">{p}</p>)}
                {s.bullets && (
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    {s.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </section>
            );
          }
          if (s.type === 'table') {
            return (
              <section key={idx}>
                <h2 className="text-white font-semibold mb-2">{s.heading}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-white/80 border-separate border-spacing-y-1">
                    <thead>
                      <tr>
                        {s.headers.map((h: string) => (
                          <th key={h} className="px-3 py-2 bg-white/10 rounded">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.rows.map((row: string[], i: number) => (
                        <tr key={i}>
                          {row.map((cell: string, j: number) => (
                            <td key={j} className="px-3 py-2 bg-white/5 rounded border border-white/10">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          }
          if (s.type === 'funfact') {
            return (
              <section key={idx} className="p-3 rounded-xl bg-yellow-500/15 border border-yellow-500/30 text-white/90">
                📝 Fun fact: {s.text}
              </section>
            );
          }
          if (s.type === 'summary') {
            return (
              <section key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h2 className="text-white font-semibold mb-2">🧠 Summary</h2>
                <ul className="list-disc list-inside text-white/80 space-y-1">
                  {s.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
                </ul>
                {s.next && (
                  <a href={s.next.href} className="inline-block mt-3 text-blue-200 hover:underline">
                    🔚 Continue → {s.next.label}
                  </a>
                )}
              </section>
            );
          }
          return null;
        })}
      </div>

      {lesson.quiz?.questions && (
        <div className="mt-10 bg-white/5 border border-white/10 rounded-xl p-4">
          <h2 className="text-white font-semibold mb-4">Mini Quiz</h2>
          {lesson.quiz.questions.map((q: Question, i: number) => (
            <div key={q.id} className="mb-4">
              <p className="text-white mb-2">{i + 1}. {q.prompt}</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {q.choices.map((c: string, idx: number) => {
                  const isSubmitted = !!result;
                  const isSelected = answers[i] === idx;
                  const isCorrect = idx === q.correctIndex;
                  const base = 'p-2 rounded border cursor-pointer';
                  const stateClass = isSubmitted
                    ? (isCorrect
                        ? 'border-green-400 bg-green-500/20'
                        : (isSelected ? 'border-red-400 bg-red-500/20' : 'border-white/10 opacity-70'))
                    : (isSelected ? 'border-blue-400 bg-blue-500/20' : 'border-white/15 hover:border-white/30');
                  return (
                    <label key={c} className={`${base} ${stateClass}`}>
                      <input
                        type="radio"
                        name={`q${i}`}
                        className="mr-2"
                        checked={isSelected}
                        disabled={!!result}
                        onChange={() => {
                          if (result) return;
                          const copy = [...answers];
                          copy[i] = idx;
                          setAnswers(copy);
                        }}
                      />
                      <span className="text-white/90">{c}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
          {!result && (
            <button onClick={submitQuiz} className="mt-2 px-4 py-2 rounded bg-blue-600/80 hover:bg-blue-600 text-white">
              Submit
            </button>
          )}
          {result && (
            <div className="mt-4 space-y-3">
              {/* Score Display */}
              <div className={`p-4 rounded-lg border ${
                (result.score / result.total) * 100 >= 70
                  ? "bg-green-500/10 border-green-400/30 text-green-300"
                  : "bg-orange-500/10 border-orange-400/30 text-orange-300"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-lg">
                    Score: {result.score}/{result.total}
                  </div>
                  <div className="text-sm opacity-90">
                    {Math.round((result.score / result.total) * 100)}% Complete
                  </div>
                </div>
                
                {/* Feedback Message */}
                {(result.score / result.total) * 100 >= 70 ? (
                  <p className="text-sm">
                    🎉 Great job! You've passed this lesson's quiz.
                  </p>
                ) : (
                  <p className="text-sm">
                    📚 Almost there! You need 70% to complete this lesson. Review the material and try again.
                  </p>
                )}
              </div>

              {/* Retry Button for Failed Attempts */}
              {(result.score / result.total) * 100 < 70 && (
                <button
                  onClick={() => {
                    setResult(null);
                    setAnswers(Array(lesson.quiz.questions.length).fill(-1));
                  }}
                  className="w-full px-4 py-2 rounded bg-orange-500/20 hover:bg-orange-500/30 text-orange-200 border border-orange-400/30 transition-colors duration-200"
                >
                  Try Again
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}



