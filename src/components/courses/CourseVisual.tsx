import { useId } from 'react';
import type { Course } from '../../types/course';

type VisualShape =
  | 'spring'
  | 'kafka'
  | 'python'
  | 'react'
  | 'angular'
  | 'microservices'
  | 'docker'
  | 'kubernetes'
  | 'postgres'
  | 'java'
  | 'testing'
  | 'aws'
  | 'node';

type CourseVisualBaseProps = {
  id: string;
  accentA: string;
  accentB: string;
  titleWidth: number;
  bodyWidths: [number, number];
  shape: VisualShape;
  rightX?: number;
};

export function CourseVisual({ course }: { course: Course }) {
  switch (course.visual) {
    case 'spring':
      return <CourseVisualBase id={course.id} accentA="#83d56f" accentB="#2d9b47" titleWidth={90} bodyWidths={[76, 96]} shape="spring" />;
    case 'kafka':
      return <CourseVisualBase id={course.id} accentA="#c08cff" accentB="#68329e" titleWidth={72} bodyWidths={[84, 60]} shape="kafka" />;
    case 'python':
      return <CourseVisualBase id={course.id} accentA="#84c8ff" accentB="#3766a8" titleWidth={78} bodyWidths={[90, 64]} shape="python" />;
    case 'react':
      return <CourseVisualBase id={course.id} accentA="#85e7ff" accentB="#2b6d8f" titleWidth={76} bodyWidths={[88, 68]} shape="react" />;
    case 'angular':
      return <CourseVisualBase id={course.id} accentA="#ff7f8d" accentB="#92344f" titleWidth={70} bodyWidths={[84, 72]} shape="angular" />;
    case 'microservices':
      return <CourseVisualBase id={course.id} accentA="#7bd1ff" accentB="#5478dd" titleWidth={44} bodyWidths={[54, 34]} shape="microservices" rightX={214} />;
    case 'docker':
      return <CourseVisualBase id={course.id} accentA="#79d3ff" accentB="#2d7bcf" titleWidth={58} bodyWidths={[72, 46]} shape="docker" rightX={200} />;
    case 'kubernetes':
      return <CourseVisualBase id={course.id} accentA="#9ac4ff" accentB="#4479d9" titleWidth={66} bodyWidths={[84, 58]} shape="kubernetes" rightX={192} />;
    case 'postgres':
      return <CourseVisualBase id={course.id} accentA="#8ab0ff" accentB="#2f5ea8" titleWidth={70} bodyWidths={[82, 52]} shape="postgres" rightX={194} />;
    case 'java':
      return <CourseVisualBase id={course.id} accentA="#f2b07c" accentB="#b85e37" titleWidth={92} bodyWidths={[76, 104]} shape="java" rightX={154} />;
    case 'testing':
      return <CourseVisualBase id={course.id} accentA="#9fe27a" accentB="#4f9c4b" titleWidth={34} bodyWidths={[44, 28]} shape="testing" rightX={226} />;
    case 'aws':
      return <CourseVisualBase id={course.id} accentA="#ffcb7d" accentB="#ef8b2d" titleWidth={64} bodyWidths={[76, 52]} shape="aws" rightX={196} />;
    case 'node':
      return <CourseVisualBase id={course.id} accentA="#98dd7e" accentB="#4e9846" titleWidth={68} bodyWidths={[80, 60]} shape="node" rightX={192} />;
    default:
      return <CourseVisualBase id={course.id} accentA="#85e7ff" accentB="#2b6d8f" titleWidth={76} bodyWidths={[88, 68]} shape="react" />;
  }
}

function CourseVisualBase({
  id,
  accentA,
  accentB,
  titleWidth,
  bodyWidths,
  shape,
  rightX = 186,
}: CourseVisualBaseProps) {
  const gradientId = useId().replace(/:/g, '') + id;

  return (
    <svg viewBox="0 0 320 190" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accentA} />
          <stop offset="100%" stopColor={accentB} />
        </linearGradient>
      </defs>
      <rect x="22" y="22" width="276" height="146" rx="24" fill="rgba(12,7,18,0.78)" stroke="rgba(255,255,255,0.08)" />
      <VisualShapeNode gradientId={gradientId} accentB={accentB} shape={shape} />
      <rect x={rightX} y="68" width={titleWidth} height="10" rx="5" fill="rgba(255,255,255,0.82)" />
      <rect x={rightX} y="90" width={bodyWidths[0]} height="10" rx="5" fill="rgba(255,255,255,0.5)" />
      <rect x={rightX} y="112" width={bodyWidths[1]} height="10" rx="5" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
}

function VisualShapeNode({ gradientId, accentB, shape }: { gradientId: string; accentB: string; shape: VisualShape }) {
  switch (shape) {
    case 'spring':
      return (
        <>
          <circle cx="92" cy="95" r="38" fill={`url(#${gradientId})`} opacity="0.18" />
          <path d="M82 120c27-8 43-26 46-57-25 3-45 17-57 41 8-1 15-4 21-9-4 11-10 18-19 25z" fill={`url(#${gradientId})`} />
          <path d="M84 103c17 2 30-5 42-20" fill="none" stroke="#f7f1ff" strokeWidth="4.2" strokeLinecap="round" />
          <circle cx="96" cy="93" r="4.5" fill="#f7f1ff" />
        </>
      );
    case 'kafka':
      return (
        <>
          <circle cx="84" cy="96" r="10" fill={`url(#${gradientId})`} />
          <circle cx="120" cy="66" r="10" fill={`url(#${gradientId})`} />
          <circle cx="120" cy="126" r="10" fill={`url(#${gradientId})`} />
          <circle cx="158" cy="96" r="10" fill={`url(#${gradientId})`} />
          <path d="M94 96h54m-28-22l18 16m-18 28l18-16" fill="none" stroke="#f7f1ff" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="84" cy="96" r="22" fill="none" stroke="rgba(192,140,255,0.28)" strokeWidth="2.5" />
        </>
      );
    case 'python':
      return (
        <>
          <rect x="58" y="58" width="56" height="56" rx="20" fill={`url(#${gradientId})`} />
          <rect x="102" y="78" width="56" height="56" rx="20" fill="#f3b27a" />
          <circle cx="82" cy="86" r="4.5" fill="#f7f1ff" />
          <circle cx="134" cy="108" r="4.5" fill="#1a1020" />
        </>
      );
    case 'react':
      return (
        <>
          <circle cx="110" cy="95" r="10" fill="#f7f1ff" />
          <ellipse cx="110" cy="95" rx="48" ry="18" fill="none" stroke={`url(#${gradientId})`} strokeWidth="5" />
          <ellipse cx="110" cy="95" rx="48" ry="18" transform="rotate(60 110 95)" fill="none" stroke={`url(#${gradientId})`} strokeWidth="5" />
          <ellipse cx="110" cy="95" rx="48" ry="18" transform="rotate(-60 110 95)" fill="none" stroke={`url(#${gradientId})`} strokeWidth="5" />
        </>
      );
    case 'angular':
      return (
        <>
          <path d="M110 54l42 14-6 56-36 20-36-20-6-56z" fill={`url(#${gradientId})`} />
          <path d="M110 74l18 44h-12l-3-8h-18l-3 8H80l18-44zm-6 27h12l-6-16z" fill="#f7f1ff" />
        </>
      );
    case 'microservices':
      return (
        <>
          <path d="M76 118h100c14 0 24-8 24-20 0-10-8-18-19-19-2-20-17-33-36-33-17 0-31 10-35 26-4-3-9-5-15-5-13 0-24 10-24 23 0 16 12 28 29 28z" fill={`url(#${gradientId})`} />
          <circle cx="92" cy="96" r="9" fill="#f7f1ff" />
          <circle cx="126" cy="96" r="9" fill="#f7f1ff" opacity="0.9" />
          <circle cx="160" cy="96" r="9" fill="#f7f1ff" opacity="0.8" />
          <path d="M101 96h16m18 0h16" stroke={accentB} strokeWidth="4" strokeLinecap="round" />
        </>
      );
    case 'docker':
      return (
        <>
          <rect x="72" y="84" width="20" height="16" rx="4" fill={`url(#${gradientId})`} />
          <rect x="96" y="84" width="20" height="16" rx="4" fill={`url(#${gradientId})`} />
          <rect x="120" y="84" width="20" height="16" rx="4" fill={`url(#${gradientId})`} />
          <rect x="96" y="64" width="20" height="16" rx="4" fill={`url(#${gradientId})`} />
          <path d="M68 106h82c0 14-12 24-27 24H90c-13 0-22-10-22-24z" fill={`url(#${gradientId})`} />
          <path d="M156 89c7-8 15-10 24-6-3 7-9 11-18 12" fill="none" stroke="#f7f1ff" strokeWidth="4" strokeLinecap="round" />
        </>
      );
    case 'kubernetes':
      return (
        <>
          <path d="M110 56l34 20v38l-34 20-34-20V76z" fill={`url(#${gradientId})`} />
          <circle cx="110" cy="95" r="12" fill="#f7f1ff" />
          <path d="M110 67v16m0 24v16m28-28h-16m-24 0H82m20-20l8 8m16 16l8 8m0-48l-8 8m-16 16l-8 8" stroke={accentB} strokeWidth="4" strokeLinecap="round" />
        </>
      );
    case 'postgres':
      return (
        <>
          <ellipse cx="106" cy="68" rx="34" ry="14" fill={`url(#${gradientId})`} />
          <path d="M72 68v42c0 8 15 14 34 14s34-6 34-14V68" fill={`url(#${gradientId})`} opacity="0.95" />
          <ellipse cx="106" cy="110" rx="34" ry="14" fill="rgba(255,255,255,0.15)" />
          <path d="M144 82c13-8 24-9 34-5-8 3-14 8-19 16" fill="none" stroke="#f7f1ff" strokeWidth="4" strokeLinecap="round" />
        </>
      );
    case 'java':
      return (
        <>
          <circle cx="92" cy="94" r="34" fill={`url(#${gradientId})`} opacity="0.95" />
          <path d="M84 103c9-5 17-5 25 0m-21-22c7 4 15 4 22 0m-11-18c10 10 10 22 0 32" fill="none" stroke="#f7f1ff" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M74 118h36" stroke="#f7f1ff" strokeWidth="4" strokeLinecap="round" />
        </>
      );
    case 'testing':
      return (
        <>
          <rect x="72" y="68" width="84" height="54" rx="14" fill={`url(#${gradientId})`} />
          <path d="M94 94l10 10 24-26" fill="none" stroke="#f7f1ff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="188" cy="78" r="10" fill="#f3b27a" />
          <circle cx="214" cy="96" r="10" fill="#f3b27a" opacity="0.8" />
          <circle cx="188" cy="114" r="10" fill="#f3b27a" opacity="0.6" />
        </>
      );
    case 'aws':
      return (
        <>
          <path d="M80 118h66c15 0 26-9 26-21 0-11-9-19-21-20-3-18-17-30-34-30-18 0-31 10-35 26-4-3-8-4-14-4-12 0-22 9-22 22 0 15 13 27 34 27z" fill={`url(#${gradientId})`} />
          <path d="M78 136c26 10 53 11 82 0" fill="none" stroke="#f7f1ff" strokeWidth="4" strokeLinecap="round" />
          <path d="M154 132l10 8" fill="none" stroke="#f7f1ff" strokeWidth="3.5" strokeLinecap="round" />
        </>
      );
    case 'node':
      return (
        <>
          <path d="M110 54l40 22v38l-40 22-40-22V76z" fill={`url(#${gradientId})`} />
          <path d="M110 67l26 14v28l-26 14-26-14V81z" fill="none" stroke="#f7f1ff" strokeWidth="4" />
          <path d="M110 80v30m-12-22l24 14" stroke="#f7f1ff" strokeWidth="4" strokeLinecap="round" />
        </>
      );
  }
}
