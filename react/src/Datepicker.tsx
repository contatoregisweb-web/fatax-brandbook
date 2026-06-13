import { useState } from 'react';

// ════════════════════════════════════════════════════════════════════
// @fatax/design-system-react · Datepicker
// Single-date, formato BR (DD/MM/AAAA). Calendar 7-col, navegação por
// mês. Sem range, sem time — escopo intencionalmente apertado.
// ════════════════════════════════════════════════════════════════════

const MONTHS_PT = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
const WEEKDAYS_PT = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export interface DatepickerProps {
  /** Data selecionada (controlled). */
  value?: Date | null;
  /** Callback ao escolher dia. */
  onChange: (date: Date) => void;
  /** Mês inicial mostrado quando não há value. Default: hoje. */
  defaultMonth?: Date;
  /** Mínima permitida (dias antes ficam disabled). */
  min?: Date;
  /** Máxima permitida. */
  max?: Date;
  className?: string;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate();
}

function buildCalendar(year: number, month: number): { date: Date; outside: boolean }[] {
  const first = new Date(year, month, 1);
  const startDayOfWeek = first.getDay(); // 0 = domingo
  const cells: { date: Date; outside: boolean }[] = [];

  // dias do mês anterior pra completar a primeira semana
  for (let i = startDayOfWeek; i > 0; i--) {
    cells.push({ date: new Date(year, month, 1 - i), outside: true });
  }
  // dias deste mês
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), outside: false });
  }
  // dias do próximo mês para completar a última semana (6 semanas = 42 cells)
  while (cells.length % 7 !== 0 || cells.length < 42) {
    const next = new Date(cells[cells.length - 1].date);
    next.setDate(next.getDate() + 1);
    cells.push({ date: next, outside: true });
    if (cells.length >= 42) break;
  }
  return cells;
}

export function Datepicker({
  value,
  onChange,
  defaultMonth,
  min,
  max,
  className,
}: DatepickerProps) {
  const initial = value ?? defaultMonth ?? new Date();
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const cells = buildCalendar(viewYear, viewMonth);
  const today = new Date();

  const isDisabled = (d: Date) => {
    if (min && d < new Date(min.getFullYear(), min.getMonth(), min.getDate())) return true;
    if (max && d > new Date(max.getFullYear(), max.getMonth(), max.getDate())) return true;
    return false;
  };

  const goPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };
  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const cls = ['datepicker', className].filter(Boolean).join(' ');

  return (
    <div className={cls} role="application" aria-label="Calendário">
      <div className="datepicker-head">
        <button
          type="button"
          className="datepicker-nav"
          aria-label="Mês anterior"
          onClick={goPrevMonth}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <span className="datepicker-month">
          {MONTHS_PT[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          className="datepicker-nav"
          aria-label="Próximo mês"
          onClick={goNextMonth}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="datepicker-grid">
        {WEEKDAYS_PT.map((wd, i) => (
          <span key={`wd-${i}`} className="datepicker-wd">{wd}</span>
        ))}
        {cells.map(({ date, outside }, i) => {
          const selected = value && isSameDay(date, value);
          const todayFlag = isSameDay(date, today);
          const disabled = isDisabled(date);
          return (
            <button
              key={i}
              type="button"
              className="datepicker-day"
              data-outside={outside}
              data-today={todayFlag}
              data-selected={!!selected}
              disabled={disabled}
              aria-label={date.toLocaleDateString('pt-BR')}
              onClick={() => onChange(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Formata Date no padrão BR (DD/MM/AAAA). */
export function formatDateBR(d: Date | null | undefined): string {
  if (!d) return '';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}
