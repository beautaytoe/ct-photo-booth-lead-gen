#!/usr/bin/env node
/**
 * One-shot script: convert public/assets/hero-bg.jpg -> hero-bg.avif.
 * Run after replacing the source hero JPG. Output committed as a static asset
 * so the CSS image-set() chain can prefer AVIF where supported.
 *
 * quality=55 is visually indistinguishable from JPG q=75 for photographic
 * backgrounds; effort=6 trades encode time (build-time) for better compression.
 */
import sharp from 'sharp';
import { stat } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const INPUT = path.join(ROOT, 'public/assets/hero-bg.jpg');
const OUTPUT = path.join(ROOT, 'public/assets/hero-bg.avif');

const before = (await stat(INPUT)).size;
await sharp(INPUT).avif({ quality: 55, effort: 6 }).toFile(OUTPUT);
const after = (await stat(OUTPUT)).size;
console.log(`JPG:  ${(before / 1024).toFixed(1)} KB`);
console.log(`AVIF: ${(after / 1024).toFixed(1)} KB`);
console.log(`Reduction: ${(100 - (after / before) * 100).toFixed(1)}%`);
