# TypeScript Quality Improvement - Quick Reference Card
## My Private Tutor Online - Developer Cheat Sheet

**Print this page and keep it visible during the 4-week sprint!**

---

## 📊 Current Stats (Baseline)

```
Total Errors:         1,299
Strict Compliance:    42%
Build Time:           11.0s
Target Errors:        <65
Target Compliance:    95%
Max Build Time:       13.0s
```

---

## 🎯 Weekly Targets

| Week | Target Errors | Compliance | Focus Area |
|------|--------------|------------|------------|
| 1 | 710 | 60% | CMS, unused vars |
| 2 | 323 | 75% | API, null safety |
| 3 | 194 | 85% | Strict flags |
| 4 | <65 | 95% | Polish, docs |

---

## 🚀 Daily Commands

### Essential Commands
```bash
# Check error count
npm run typecheck 2>&1 | grep -E "^src/" | wc -l

# Fix unused variables
npx eslint --fix "src/**/*.{ts,tsx}"

# Run quality checks
npm run quality

# Build production
npm run build

# Run tests
npm run test
```

### Error Analysis
```bash
# Count specific error type
npm run typecheck 2>&1 | grep "error TS6133" | wc -l

# List errors in specific file
npm run typecheck 2>&1 | grep "src/lib/cms/cms-content.ts"

# Export errors to file
npm run typecheck 2>&1 > typescript-errors.log
```

---

## 🔧 Common Fix Patterns

### Pattern 1: Remove Duplicate Export Types
```typescript
// ❌ WRONG (causes TS2484)
export type { AboutContent };
export interface AboutContent { ... }

// ✅ CORRECT
export interface AboutContent { ... }
```

### Pattern 2: Fix Optional Properties (TS2375)
```typescript
// ❌ WRONG
interface User {
  email?: string | undefined;  // TS2375
}

// ✅ CORRECT
interface User {
  email?: string;  // Just optional
}
```

### Pattern 3: Null Safety (TS2532, TS18048)
```typescript
// ❌ WRONG
console.log(obj.property);

// ✅ CORRECT
console.log(obj?.property);

// ✅ BETTER
if (obj?.property) {
  console.log(obj.property);
}
```

### Pattern 4: Index Signature Access (TS4111)
```typescript
// ❌ WRONG
const value = config.apiKey;  // TS4111

// ✅ CORRECT
const value = config['apiKey'];
```

### Pattern 5: Type Unknown (TS18046)
```typescript
// ❌ WRONG
function process(data: unknown) {
  console.log(data.property);  // TS18046
}

// ✅ CORRECT
function process(data: unknown) {
  if (isObject(data) && 'property' in data) {
    console.log((data as { property: unknown }).property);
  }
}
```

### Pattern 6: Async Headers (TS2339)
```typescript
// ❌ WRONG
const auth = (await headers()).get('authorization');

// ✅ CORRECT
const headersList = await headers();
const auth = headersList.get('authorization');
```

### Pattern 7: Unused Variables (TS6133)
```typescript
// ❌ WRONG
function onClick(event: Event) {  // event never used
  doSomething();
}

// ✅ CORRECT
function onClick(_event: Event) {  // Prefix with underscore
  doSomething();
}
```

### Pattern 8: Missing Properties (TS2339)
```typescript
// ❌ WRONG
interface Analytics {
  metric: string;
}
const data: Analytics = { ... };
console.log(data.sessionId);  // TS2339

// ✅ CORRECT
interface Analytics {
  metric: string;
  sessionId: string;  // Add missing property
}
```

---

## 📝 Code Templates

### CMS Validation Template
```typescript
import { z } from 'zod';

const SchemaName = z.object({
  field1: z.string().min(1),
  field2: z.number().positive(),
  field3: z.string().url().optional(),
});

export type TypeName = z.infer<typeof SchemaName>;

export function validateContent(data: unknown): TypeName {
  return SchemaName.parse(data);
}
```

### Unified API Response Template
```typescript
import { createSuccessResponse, createErrorResponse, validateRequestBody } from '@/lib/api/unified-response';
import { RequestSchema } from '@/lib/validation/schemas';

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  try {
    const data = await validateRequestBody(request, RequestSchema);
    const result = await processData(data);
    return createSuccessResponse(result, requestId, startTime);
  } catch (error: unknown) {
    return createErrorResponse(error, requestId, startTime);
  }
}
```

### Type Guard Template
```typescript
export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function hasProperty<K extends string>(
  obj: unknown,
  key: K
): obj is Record<K, unknown> {
  return isObject(obj) && key in obj;
}

// Usage
if (hasProperty(data, 'email')) {
  console.log(data.email);  // Type-safe
}
```

### TSDoc Comment Template
```typescript
/**
 * Brief one-line description of function/type.
 *
 * Detailed explanation with context and usage notes.
 * Multiple paragraphs if needed.
 *
 * @template T - Description of generic parameter
 * @param param1 - Description of parameter
 * @param param2 - Description of parameter
 * @returns Description of return value
 * @throws {ErrorType} When this error occurs
 *
 * @example
 * ```typescript
 * const result = functionName(arg1, arg2);
 * console.log(result);
 * ```
 *
 * @see https://docs-url - Additional context
 */
```

---

## 🎨 Best Practices

### DO ✅
- ✅ Use Zod for runtime validation
- ✅ Add TSDoc comments to public APIs
- ✅ Use type guards for unknown types
- ✅ Prefix unused parameters with `_`
- ✅ Use optional chaining `?.` liberally
- ✅ Test after every change
- ✅ Commit frequently with clear messages
- ✅ Run `npm run typecheck` before committing

### DON'T ❌
- ❌ Use `any` type (use `unknown` + type guards)
- ❌ Skip testing after changes
- ❌ Commit without running type check
- ❌ Fix too many files at once
- ❌ Ignore build time increases
- ❌ Use `as any` type assertions
- ❌ Add `@ts-ignore` comments
- ❌ Skip documentation

---

## 🐛 Error Code Quick Reference

| Code | Meaning | Common Fix |
|------|---------|------------|
| TS6133 | Unused variable | Remove or prefix with `_` |
| TS2322 | Type mismatch | Fix type definition |
| TS2339 | Property missing | Add to interface |
| TS2484 | Export conflict | Remove duplicate export |
| TS2345 | Argument mismatch | Fix function parameter type |
| TS2375 | Optional property | Remove `\| undefined` |
| TS2304 | Name not found | Add import |
| TS18048 | Possibly undefined | Add null check |
| TS18046 | Type unknown | Add type guard |
| TS4111 | Index signature | Use bracket notation |

---

## 📋 Daily Checklist

### Morning Routine
- [ ] Pull latest changes: `git pull origin feature/typescript-quality-improvement`
- [ ] Check current error count: `npm run typecheck 2>&1 | grep -E "^src/" | wc -l`
- [ ] Review daily tasks in action checklist
- [ ] Set error count target for today

### During Work
- [ ] Fix errors incrementally (don't tackle too many at once)
- [ ] Run `npm run typecheck` after each logical change
- [ ] Test modified functionality manually
- [ ] Commit after each completed task
- [ ] Take breaks every 2 hours

### End of Day
- [ ] Run full type check: `npm run typecheck`
- [ ] Run tests: `npm run test`
- [ ] Record today's error count
- [ ] Calculate errors fixed today
- [ ] Commit all changes with descriptive message
- [ ] Push to remote: `git push origin feature/typescript-quality-improvement`
- [ ] Update standup notes for tomorrow

---

## 🔥 Emergency Procedures

### Build Time Exceeds 13.0s
```bash
# 1. Check what's slow
npm run typecheck:trace

# 2. Verify skipLibCheck is enabled
grep "skipLibCheck" tsconfig.json

# 3. Clear cache and rebuild
npm run clean && npm run build
```

### Too Many Errors Introduced
```bash
# 1. Don't panic - rollback
git status  # See what changed
git checkout -- path/to/file.ts  # Revert specific file

# 2. Or revert entire commit
git log --oneline -5  # Find commit hash
git revert COMMIT_HASH

# 3. Start smaller
# Fix one file at a time, test thoroughly
```

### Tests Failing
```bash
# 1. Identify failing tests
npm run test

# 2. Run specific test file
npm run test -- path/to/test.spec.ts

# 3. If type-related, update test types
# If logic-related, review changes carefully
```

### Can't Find Solution
1. **Search**: Check `TYPESCRIPT_QUALITY_ASSESSMENT_REPORT.md`
2. **Ask**: Reach out to tech lead
3. **Document**: Add `// TODO:` comment with context
4. **Move On**: Don't get stuck, come back later

---

## 📞 Support Contacts

| Issue | Contact | Response Time |
|-------|---------|---------------|
| Urgent blocker | Tech Lead | <1 hour |
| Architecture question | Tech Lead | <4 hours |
| Type pattern question | Tech Lead | <4 hours |
| Build issue | DevOps | <2 hours |
| Testing issue | QA Lead | <4 hours |

---

## 📈 Progress Tracking

### Week 1 Progress
```
Day 1: _____ errors (Target: 1,212)
Day 2: _____ errors (Target: 1,181)
Day 3: _____ errors (Target: 1,050)
Day 4: _____ errors (Target: 850)
Day 5: _____ errors (Target: 710)
```

### Week 2 Progress
```
Day 6:  _____ errors (Target: 617)
Day 7:  _____ errors (Target: 521)
Day 8:  _____ errors (Target: 430)
Day 9:  _____ errors (Target: 327)
Day 10: _____ errors (Target: 323)
```

### Week 3 Progress
```
Day 11: _____ errors (Target: 277)
Day 12: _____ errors (Target: 239)
Day 13: _____ errors (Target: 198)
Day 14: _____ errors (Target: 198)
Day 15: _____ errors (Target: 194)
```

### Week 4 Progress
```
Day 16: _____ errors (Target: 100)
Day 17: _____ errors (Target: 85)
Day 18: _____ errors (Target: 70)
Day 19: _____ errors (Target: 65)
Day 20: _____ errors (Target: <65)
```

---

## 🎓 Learning Resources

### Quick Reads (5-10 minutes)
- TypeScript Strict Mode: https://www.typescriptlang.org/tsconfig#strict
- Zod Basics: https://zod.dev/?id=basic-usage
- Type Guards: https://www.typescriptlang.org/docs/handbook/2/narrowing.html

### In-Depth (30+ minutes)
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- Advanced Types: https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
- Utility Types: https://www.typescriptlang.org/docs/handbook/utility-types.html

---

## 💡 Pro Tips

1. **Start Small**: Fix one file completely before moving to next
2. **Test Often**: Run `npm run typecheck` every 15 minutes
3. **Commit Early**: Don't wait until end of day
4. **Use IDE**: VS Code will show most errors inline
5. **Pattern Matching**: If you fix one, similar issues are nearby
6. **Take Breaks**: Fresh eyes catch more errors
7. **Ask Questions**: Don't waste time being stuck
8. **Document Learnings**: Add comments for tricky fixes

---

## 🏆 Success Celebration Milestones

- ✨ **First 100 errors fixed** - You're on a roll!
- ✨ **500 errors fixed** - Halfway there!
- ✨ **1,000 errors fixed** - You're crushing it!
- ✨ **Under 100 errors remaining** - Final stretch!
- ✨ **95% compliance achieved** - MISSION ACCOMPLISHED! 🎉

---

## 📱 Mobile-Friendly Quick Commands

Save this on your phone for standup updates:

```bash
# Check progress
npm run typecheck 2>&1 | grep -E "^src/" | wc -l

# Today's errors fixed
echo "Yesterday: [X], Today: [Y], Fixed: $((X-Y))"
```

---

**Version**: 1.0
**Updated**: 2025-11-04
**Developer**: _______________

---

**Keep this card visible at all times during the sprint!**

**Remember**: Progress over perfection. We're aiming for 95%, not 100%.

---

**END OF QUICK REFERENCE**
