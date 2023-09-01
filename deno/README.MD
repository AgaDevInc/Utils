Deno Aga Util
```typescript
import { makeRange } from "https://deno.land/x/aga_util/mod.ts";
const inRange = makeRange(0, 10)
console.log(inRange(5)) // true
console.log(inRange(11)) // false
```